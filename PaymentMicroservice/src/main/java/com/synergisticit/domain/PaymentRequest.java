package com.synergisticit.domain;

public class PaymentRequest {
    private String paymentMethodId;
    private double amount;
    private String name;
    private String email;
    private String phone;
    private String description;


    public PaymentRequest() {
    }


    public PaymentRequest(String paymentMethodId, String name, String email, double amount, String phone,String description) {
        this.paymentMethodId = paymentMethodId;
        this.amount = amount;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.description = description;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
