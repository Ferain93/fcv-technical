package com.prueba.mi_api.dto;

import java.time.LocalDate;

public record MedicamentoResponseDTO(
    Long id,
    String nombre,
    String fabricante,
    LocalDate fechaCaducidad,
    Integer stock,
    String indicaciones
) {}
