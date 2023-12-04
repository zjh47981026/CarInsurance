package com.synergisticit.controller;

import com.synergisticit.domain.Plan;
import com.synergisticit.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PlanController {
    @Autowired
    PlanService planService;

    @RequestMapping(value = "/getPlans", method = RequestMethod.POST)
    public List<Plan> findPlanByCategoryAndName(@RequestBody List<Plan> plans) {
        List<Plan> result = new ArrayList<>();
        for (Plan p : plans) {
            Plan plan = planService.findPlanByCategoryAndName(p.getCategory(), p.getName());
            if (plan != null) {
                result.add(plan);
            }
        }
        return result;
    }
}
