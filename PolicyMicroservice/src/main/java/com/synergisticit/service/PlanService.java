package com.synergisticit.service;

import com.synergisticit.domain.Plan;
import com.synergisticit.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanService {

    @Autowired
    PlanRepository planRepository;

    public Plan findPlanByCategoryAndName(String category, String name) {
        return planRepository.findPlanByCategoryAndAndName(category, name);
    }
}
