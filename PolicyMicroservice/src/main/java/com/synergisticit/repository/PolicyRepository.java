package com.synergisticit.repository;

import com.synergisticit.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {

    @Transactional
    @Query("SELECT p FROM Policy p WHERE p.userId = ?1")
    public List<Policy> findAllByUserId(String username);
}

