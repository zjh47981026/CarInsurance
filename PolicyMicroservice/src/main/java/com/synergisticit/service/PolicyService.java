package com.synergisticit.service;

import com.synergisticit.domain.Document;
import com.synergisticit.domain.Policy;
import com.synergisticit.repository.PolicyRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.print.Doc;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
public class PolicyService {
    @Autowired
    PolicyRepository policyRepository;

    @Autowired
    S3Service service;

    public Policy savePolicy (Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Policy> getPolicies(String username) {
        return policyRepository.findAllByUserId(username);
    }

    public Policy findPolicyById(Long id) {
        Optional<Policy> optional = policyRepository.findById(id);
        if (optional.isPresent()) {
            return optional.get();
        }
        return null;
    }


    public void deletePolicyById(Long id) {
        policyRepository.deleteById(id);
    }

    @Transactional
    public CompletableFuture<Policy> updateDocuments(Long id, List<Document> documents) {
        return policyRepository.findById(id)
                .map(oldPolicy -> {
                    List<String> fileKeys = oldPolicy.getDocuments().stream()
                            .map(Document::getName)
                            .collect(Collectors.toList());

                    CompletableFuture<Void> deletionFuture = service.deleteMultipleFiles(fileKeys);

                    return deletionFuture.thenApply(ignored -> {
                        oldPolicy.setDocuments(documents);
                        return policyRepository.save(oldPolicy);
                    });
                })
                .orElseThrow(() -> new EntityNotFoundException("Policy not found with id: " + id));
    }

}
