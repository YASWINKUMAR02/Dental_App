package com.dental.backend.controller;

import com.dental.backend.model.Appointment;
import com.dental.backend.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Book a new appointment
    @PostMapping
    public ResponseEntity<?> bookAppointment(@Valid @RequestBody Appointment appointment) {
        try {
            Appointment saved = appointmentService.bookAppointment(appointment);
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "success", true,
                    "message", "Appointment booked successfully! We will confirm shortly.",
                    "data", saved
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "message", "Failed to book appointment: " + e.getMessage()
            ));
        }
    }

    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    // Get appointments by patient email
    @GetMapping("/patient/{email}")
    public ResponseEntity<List<Appointment>> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(appointmentService.getAppointmentsByEmail(email));
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update appointment status
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id,
                                           @RequestBody Map<String, String> body) {
        try {
            Appointment.AppointmentStatus status =
                    Appointment.AppointmentStatus.valueOf(body.get("status").toUpperCase());
            Appointment updated = appointmentService.updateStatus(id, status);
            return ResponseEntity.ok(Map.of("success", true, "data", updated));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Delete appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok(Map.of("success", true, "message", "Appointment deleted successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}
