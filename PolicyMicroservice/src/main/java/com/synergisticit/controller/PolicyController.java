package com.synergisticit.controller;

import com.synergisticit.domain.Document;
import com.synergisticit.domain.Policy;
import com.synergisticit.service.EmailService;
import com.synergisticit.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
public class PolicyController {
    @Autowired
    PolicyService policyService;

    @Autowired
    EmailService emailService;

    @RequestMapping(value = "/savePolicy", method = RequestMethod.POST)
    public ResponseEntity<Policy> savePolicy(@RequestBody Policy policy) {
        try {
            Policy policySaved = policyService.savePolicy(policy);
            emailService.sendEmail(policySaved);  // This will now run asynchronously
            return new ResponseEntity<>(policySaved, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value = "/getPolicies/{username}", method = RequestMethod.GET)
    public List<Policy> getPolicies(@PathVariable String username) {
        return policyService.getPolicies(username);
    }

    @RequestMapping(value = "/getPolicyById/{policyId}", method = RequestMethod.GET)
    public Policy findPolicyById(@PathVariable Long policyId) {
        return policyService.findPolicyById(policyId);
    }

    @RequestMapping(value = "/deletePolicyById/{policyId}", method = RequestMethod.GET)
    public void deletePolicyById(@PathVariable Long policyId) {
        policyService.deletePolicyById(policyId);
    }

    @RequestMapping(value = "/updatePolicyDocuments/{policyId}", method = RequestMethod.POST)
    public CompletableFuture<ResponseEntity<Policy>> updateDocuments(@PathVariable Long policyId, @RequestBody List<Document> documents) {
        return policyService.updateDocuments(policyId, documents)
                .thenApply(ResponseEntity::ok)
                .exceptionally(ex -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
}
