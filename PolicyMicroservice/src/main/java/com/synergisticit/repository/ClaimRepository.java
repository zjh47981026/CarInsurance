package com.synergisticit.repository;

import com.synergisticit.domain.Claim;
import com.synergisticit.domain.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    @Transactional
    @Query("SELECT c FROM Claim c WHERE c.userId = ?1")
    public List<Claim> findAllByUserId(String username);
}
