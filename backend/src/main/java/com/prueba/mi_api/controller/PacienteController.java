package com.prueba.mi_api.controller;

import com.prueba.mi_api.dto.PacienteRequestDTO;
import com.prueba.mi_api.dto.PacienteResponseDTO;
import com.prueba.mi_api.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    private final PacienteService service;

    public PacienteController(PacienteService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PacienteResponseDTO> crear(@Valid @RequestBody PacienteRequestDTO dto) {
        PacienteResponseDTO creado = service.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<PacienteResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<PacienteResponseDTO>> buscarPorDiagnostico(
            @RequestParam String diagnostico) {
        return ResponseEntity.ok(service.buscarPorDiagnostico(diagnostico));
    }
}
