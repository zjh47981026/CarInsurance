package com.synergisticit.repository;

import com.synergisticit.domain.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
