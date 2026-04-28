package com.prueba.mi_api.controller;

import com.prueba.mi_api.dto.AsignacionRequestDTO;
import com.prueba.mi_api.dto.AsignacionResponseDTO;
import com.prueba.mi_api.service.AsignacionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asignaciones")
public class AsignacionController {

    private final AsignacionService service;

    public AsignacionController(AsignacionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<AsignacionResponseDTO> asignar(@Valid @RequestBody AsignacionRequestDTO dto) {
        AsignacionResponseDTO resultado = service.asignar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(resultado);
    }

    @GetMapping("/paciente/{pacienteId}")
    public ResponseEntity<List<AsignacionResponseDTO>> obtenerPorPaciente(@PathVariable Long pacienteId) {
        return ResponseEntity.ok(service.obtenerPorPaciente(pacienteId));
    }
}
