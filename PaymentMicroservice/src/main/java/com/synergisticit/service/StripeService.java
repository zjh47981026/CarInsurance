package com.synergisticit.service;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.param.PaymentIntentCreateParams;
import com.synergisticit.domain.Payment;
import com.synergisticit.domain.PaymentRequest;
import com.synergisticit.domain.PaymentResponse;
import com.synergisticit.repository.PaymentRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @Autowired
    PaymentRepository paymentRepository;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public PaymentResponse chargeCreditCard(PaymentRequest paymentRequest) throws StripeException {

        try {
            PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                    .setAmount((long) (paymentRequest.getAmount() * 100)) // amount in cents
                    .setCurrency("usd")
                    .setConfirmationMethod(PaymentIntentCreateParams.ConfirmationMethod.AUTOMATIC)
                    .setReturnUrl("http://localhost:8282/home")
                    .setReceiptEmail(paymentRequest.getEmail())
                    .setDescription(paymentRequest.getDescription())
                    .setPaymentMethod(paymentRequest.getPaymentMethodId())
                    .setConfirm(true)
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            if ("succeeded".equals(paymentIntent.getStatus())) {
                PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentIntent.getPaymentMethod());
                String type = paymentMethod.getType();
                PaymentMethod.Card card = paymentMethod.getCard();
                String brand = card.getBrand();
                String last4 = card.getLast4();
                Long amountInDollars = paymentIntent.getAmount() / 100;
                Payment payment = new Payment(paymentIntent.getId(), paymentRequest.getName(),paymentRequest.getEmail(),
                        type, brand, last4, amountInDollars);
                paymentRepository.save(payment);
                return new PaymentResponse(paymentIntent.getId(), type, brand, last4, "success", amountInDollars, null);
            } else {
                String failureMessage = paymentIntent.getLastPaymentError() != null ? paymentIntent.getLastPaymentError().getMessage() : "Payment failed with unknown reason";
                return new PaymentResponse(null, null, null, null, "failed", 0l, failureMessage);
            }
        } catch (StripeException e) {
            return new PaymentResponse(null, null, null, null, "failed", 0l,e.getMessage());
        }
    }
}
