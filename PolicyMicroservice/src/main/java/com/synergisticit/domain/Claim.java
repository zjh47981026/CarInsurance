package com.synergisticit.domain;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name="claim")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long claimId;

    private long policyId;

    private String userId;

    private LocalDate dateOfIncident;

    private String description;

    private BigDecimal estimatedClaimAmount;

    private BigDecimal approvedClaimAmount;

    private BigDecimal finalClaimAmount;

    private ClaimStatus claimStatus;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Document> documents;

    public BigDecimal getEstimatedClaimAmount() {
        return estimatedClaimAmount;
    }

    public void setEstimatedClaimAmount(BigDecimal estimatedClaimAmount) {
        this.estimatedClaimAmount = estimatedClaimAmount;
    }

    public BigDecimal getApprovedClaimAmount() {
        return approvedClaimAmount;
    }

    public void setApprovedClaimAmount(BigDecimal approvedClaimAmount) {
        this.approvedClaimAmount = approvedClaimAmount;
    }

    public BigDecimal getFinalClaimAmount() {
        return finalClaimAmount;
    }

    public void setFinalClaimAmount(BigDecimal finalClaimAmount) {
        this.finalClaimAmount = finalClaimAmount;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    public long getClaimId() {
        return claimId;
    }

    public void setClaimId(long claimId) {
        this.claimId = claimId;
    }

    public long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(long policyId) {
        this.policyId = policyId;
    }

    public LocalDate getDateOfIncident() {
        return dateOfIncident;
    }

    public void setDateOfIncident(LocalDate dateOfIncident) {
        this.dateOfIncident = dateOfIncident;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public ClaimStatus getClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(ClaimStatus claimStatus) {
        this.claimStatus = claimStatus;
    }
}
