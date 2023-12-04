package com.synergisticit.repository;

import com.synergisticit.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    @Transactional
    @Query("SELECT p FROM Plan p WHERE p.category=?1 AND p.name=?2")
    public Plan findPlanByCategoryAndAndName(String category, String name);
}
