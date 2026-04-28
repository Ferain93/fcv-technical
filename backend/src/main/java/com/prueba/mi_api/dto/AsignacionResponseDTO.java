package com.prueba.mi_api.dto;

import java.time.LocalDate;

public record AsignacionResponseDTO(
    Long id,
    Long pacienteId,
    String pacienteNombreCompleto,
    Long medicamentoId,
    String medicamentoNombre,
    String dosis,
    String frecuencia,
    LocalDate fechaInicio
) {}
