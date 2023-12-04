package com.synergisticit.service;

import com.synergisticit.domain.Claim;
import com.synergisticit.domain.Document;
import com.synergisticit.repository.ClaimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ClaimService {

    @Autowired
    ClaimRepository claimRepository;

    public List<Claim> getClaims(String username) {
        return claimRepository.findAllByUserId(username);
    }

    public Claim saveClaim(Claim claim) {
        return claimRepository.save(claim);
    }

    public Claim getClaimById(Long id) {
        Optional<Claim> optional = claimRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }

    public Claim updateClaimById(Long claimId, Claim claim) {
        Optional<Claim> optional = claimRepository.findById(claimId);
        if (optional.isPresent()) {
            Claim oldClaim = optional.get();
            oldClaim.setDescription(claim.getDescription());
            claimRepository.save(oldClaim);
        }
        return null;
    }

    public void deleteClaimById(Long claimId) {
        claimRepository.deleteById(claimId);
    }

    public Claim uploadClaimDocument(Long claimId, List<Document> documents) {
        Optional<Claim> optional = claimRepository.findById(claimId);
        if (optional.isPresent()) {
            Claim oldClaim = optional.get();
            Set<Document> oldDocuments = oldClaim.getDocuments();
            oldDocuments.addAll(documents);
            claimRepository.save(oldClaim);
        }
        return null;
    }

    public Claim updateClaimByAdmin(Long claimId, Claim claim) {
        Optional<Claim> optional = claimRepository.findById(claimId);
        if (optional.isPresent()) {
            Claim oldClaim = optional.get();
            oldClaim.setClaimStatus(claim.getClaimStatus());
            if (claim.getApprovedClaimAmount() != null) {
                oldClaim.setApprovedClaimAmount(claim.getApprovedClaimAmount());
            }
            if (claim.getFinalClaimAmount() != null) {
                oldClaim.setFinalClaimAmount(claim.getFinalClaimAmount());
            }
            return claimRepository.save(oldClaim);
        }
        return null;
    }
}
