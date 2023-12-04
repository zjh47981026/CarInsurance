package com.synergisticit.domain;


import jakarta.persistence.*;

@Entity
@Table(name="payment")
public class Payment {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long paymentId;
    private String paymentMethodId;
    private String name;
    private String email;
    private String type;
    private String brand;
    private String last4;
    private Long amount;

    public Payment () {

    }

    public Payment(String paymentMethodId, String name, String email, String type, String brand, String last4, Long amount) {
        this.paymentMethodId = paymentMethodId;
        this.name = name;
        this.email = email;
        this.type = type;
        this.brand = brand;
        this.last4 = last4;
        this.amount = amount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(long paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
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

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
