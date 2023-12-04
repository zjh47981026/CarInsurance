package com.synergisticit.domain;

public class PaymentResponse {
    private String paymentMethodId;
    private String type;
    private String brand;
    private String last4;
    private String status;
    private String message;
    private Long amount;

    public PaymentResponse(String paymentMethodId, String type, String brand, String last4, String status,  Long amount
            ,String message) {
        this.paymentMethodId =paymentMethodId;
        this.type = type;
        this.brand = brand;
        this.last4 = last4;
        this.status = status;
        this.amount = amount;
        this.message = message;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getLast4() {
        return last4;
    }

    public void setLast4(String last4) {
        this.last4 = last4;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
