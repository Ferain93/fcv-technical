package com.prueba.mi_api.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record MedicamentoRequestDTO(
    @NotBlank(message = "El nombre es obligatorio")
    String nombre,

    @NotBlank(message = "El fabricante es obligatorio")
    String fabricante,

    @NotNull(message = "La fecha de caducidad es obligatoria")
    LocalDate fechaCaducidad,

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    Integer stock,

    @NotBlank(message = "Las indicaciones son obligatorias")
    String indicaciones
) {}
