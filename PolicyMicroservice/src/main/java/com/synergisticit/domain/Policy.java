package com.synergisticit.domain;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "policy")
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long policyId;

    private String userId;

    private String userEmail;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Driver> drivers;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents;

    @OneToOne(cascade = CascadeType.ALL)
    private Vehicle vehicle;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double maximumCoverage;

    private Double minimumPremium;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Plan> plans;

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Double getMaximumCoverage() {
        return maximumCoverage;
    }

    public void setMaximumCoverage(Double maximumCoverage) {
        this.maximumCoverage = maximumCoverage;
    }

    public Double getMinimumPremium() {
        return minimumPremium;
    }

    public void setMinimumPremium(Double minimumPremium) {
        this.minimumPremium = minimumPremium;
    }

    public Set<Driver> getDrivers() {
        return drivers;
    }

    public void setDrivers(Set<Driver> drivers) {
        this.drivers = drivers;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }

    public long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(long policyId) {
        this.policyId = policyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

}
