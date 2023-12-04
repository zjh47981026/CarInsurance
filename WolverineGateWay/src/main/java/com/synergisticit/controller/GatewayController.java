package com.synergisticit.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.synergisticit.component.PaymentComponent;
import com.synergisticit.component.PolicyComponent;
import com.synergisticit.domain.User;
import com.synergisticit.domain.UserRole;
import com.synergisticit.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
public class GatewayController {
    @Autowired
    RegisterService registerService;

    @Autowired
    PolicyComponent policyComponent;

    @Autowired
    PaymentComponent paymentComponent;

    @PostMapping("/register/admin")
    public void addAdmin(@RequestBody User user) {
        registerService.add(user, UserRole.ROLE_ADMIN);
    }

    @PostMapping("/register/user")
    public void addUser(@RequestBody User user) {
        registerService.add(user, UserRole.ROLE_USER);
    }

    @PostMapping("/getPlans")
    public JsonNode getPlans(@RequestBody JsonNode plans){
        return policyComponent.getPlans(plans);
    }

    @PostMapping("/savePolicy")
    public JsonNode savePolicy(@RequestBody JsonNode policy){
        return policyComponent.savePolicy(policy);
    }

    @GetMapping("/getPolicies/{username}")
    public JsonNode getPolicies(@PathVariable String username){
        return policyComponent.getPolicies(username);
    }

    @RequestMapping(value = "/getPolicyById/{policyId}", method = RequestMethod.GET)
    public JsonNode findPolicyById(@PathVariable Long policyId) {
        return policyComponent.getPolicyById(policyId);
    }

    @RequestMapping(value = "/updatePolicyDocuments/{policyId}", method = RequestMethod.POST)
    public JsonNode updatePolicyDocuments(@PathVariable Long policyId, @RequestBody JsonNode documents) {
        return policyComponent.updatePolicyDocuments(policyId, documents);
    }

    @RequestMapping(value = "/payment", method = RequestMethod.POST)
    public JsonNode makePayment(@RequestParam String paymentMethodId, @RequestParam double amount,
                                @RequestParam String name,
                                @RequestParam String phone,
                                @RequestParam String email,
                                @RequestParam String description) {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.createObjectNode();
        System.out.println("paymentMethodId: " + paymentMethodId);
        System.out.println("amount: " + amount);
        System.out.println("name: " + name);
        System.out.println("email: " + email);
        System.out.println("phone: " + phone);
        System.out.println("description: " + description);
        ((ObjectNode) node).put("paymentMethodId", paymentMethodId);
        ((ObjectNode) node).put("amount", amount);
        ((ObjectNode) node).put("name", name);
        ((ObjectNode) node).put("phone", phone);
        ((ObjectNode) node).put("email", email);
        ((ObjectNode) node).put("description", description);
        return paymentComponent.makePayment(node);
    }

    @GetMapping("/getClaims/{username}")
    public JsonNode getAllClaimsByUsername(@PathVariable String username) {
        return policyComponent.getClaims(username);
    }

    @PostMapping("/saveClaim")
    public JsonNode saveClaim(@RequestBody JsonNode claim) {
        return policyComponent.saveClaim(claim);
    }


    @GetMapping("/getClaimById/{claimId}")
    public JsonNode getClaimById(@PathVariable Long claimId) {
        return policyComponent.getClaimById(claimId);
    }

    @PostMapping("/updateClaimDescription/{claimId}")
    public JsonNode updateClaimDescription(@PathVariable Long claimId, @RequestBody JsonNode claim) {
        return policyComponent.updateClaimDescription(claimId, claim);
    }

    @PostMapping("/uploadClaimDocuments/{claimId}")
    public JsonNode uploadClaimDocuments(@PathVariable Long claimId, @RequestBody JsonNode documents) {
        return policyComponent.uploadClaimDocuments(claimId, documents);
    }

    @PostMapping("/updateClaimByAdmin/{claimId}")
    public JsonNode updateClaimByAdmin(@PathVariable Long claimId, @RequestBody JsonNode claim) {
        return policyComponent.updateClaimByAdmin(claimId, claim);
    }

}
