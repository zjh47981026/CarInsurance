package com.synergisticit.controller;

import com.stripe.exception.StripeException;
import com.synergisticit.domain.PaymentRequest;
import com.synergisticit.domain.PaymentResponse;
import com.synergisticit.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/payment")
    public ResponseEntity<PaymentResponse> chargeCard(@RequestBody PaymentRequest paymentRequest) {
        try {
            PaymentResponse paymentResponse = stripeService.chargeCreditCard(paymentRequest);
            paymentResponse.setStatus("success");
            return new ResponseEntity<>(paymentResponse, HttpStatus.OK);
        } catch (StripeException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }
}
