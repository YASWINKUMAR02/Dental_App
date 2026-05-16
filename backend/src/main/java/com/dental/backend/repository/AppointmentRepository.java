package com.dental.backend.repository;

import com.dental.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByEmailOrderByCreatedAtDesc(String email);
    List<Appointment> findAllByOrderByCreatedAtDesc();
}
