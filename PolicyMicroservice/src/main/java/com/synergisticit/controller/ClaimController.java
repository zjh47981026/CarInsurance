package com.synergisticit.controller;
import com.synergisticit.domain.Claim;
import com.synergisticit.domain.Document;
import com.synergisticit.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClaimController {

    @Autowired
    ClaimService claimService;

    @GetMapping("/getClaims/{username}")
    public List<Claim> getAllClaimsByUsername(@PathVariable String username) {
        return claimService.getClaims(username);
    }

    @PostMapping("/saveClaim")
    public Claim saveClaim(@RequestBody Claim claim) {
        return claimService.saveClaim(claim);
    }

    @GetMapping("/getClaimById/{claimId}")
    public Claim getClaimById(@PathVariable Long claimId) {
        return claimService.getClaimById(claimId);
    }

    @PostMapping("/updateClaimDescription/{claimId}")
    public Claim updateClaimDescription(@PathVariable Long claimId, @RequestBody Claim claim) {
        return claimService.updateClaimById(claimId, claim);
    }

    @GetMapping("/deleteClaimById/{claimId}")
    public void deleteClaimById(@PathVariable Long claimId) {
        claimService.deleteClaimById(claimId);
    }

    @PostMapping("/uploadClaimDocuments/{claimId}")
    public Claim uploadClaimDocuments(@PathVariable Long claimId, @RequestBody List<Document> documents) {
        return claimService.uploadClaimDocument(claimId, documents);
    }

    @PostMapping("/updateClaimByAdmin/{claimId}")
    public Claim uploadClaimByAdmin(@PathVariable Long claimId, @RequestBody Claim claim) {
        return claimService.updateClaimByAdmin(claimId, claim);
    }

}
