package com.prueba.mi_api.controller;

import com.prueba.mi_api.dto.MedicamentoRequestDTO;
import com.prueba.mi_api.dto.MedicamentoResponseDTO;
import com.prueba.mi_api.service.MedicamentoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentoController {

    private final MedicamentoService service;

    public MedicamentoController(MedicamentoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<MedicamentoResponseDTO> crear(@Valid @RequestBody MedicamentoRequestDTO dto) {
        MedicamentoResponseDTO creado = service.crear(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<MedicamentoResponseDTO>> listarTodos() {
        return ResponseEntity.ok(service.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicamentoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.obtenerPorId(id));
    }
}
