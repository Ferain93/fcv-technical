package com.prueba.mi_api.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record AsignacionRequestDTO(
    @NotNull(message = "El ID del paciente es obligatorio")
    Long pacienteId,

    @NotNull(message = "El ID del medicamento es obligatorio")
    Long medicamentoId,

    @NotBlank(message = "La dosis es obligatoria")
    String dosis,

    @NotBlank(message = "La frecuencia es obligatoria")
    String frecuencia,

    @NotNull(message = "La fecha de inicio es obligatoria")
    LocalDate fechaInicio
) {}
