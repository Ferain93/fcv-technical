package com.prueba.mi_api.dto;

import java.time.LocalDate;
import java.util.List;

public record PacienteResponseDTO(
    Long id,
    String nombre,
    String apellido,
    LocalDate fechaNacimiento,
    String genero,
    String diagnosticoPrincipal,
    List<String> alergias
) {}
