package com.prueba.mi_api.model;

import lombok.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "pacientes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser anterior a la fecha actual")
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @NotBlank(message = "El género es obligatorio")
    private String genero;

    @Column(name = "diagnostico_principal")
    private String diagnosticoPrincipal;

    @ElementCollection
    @CollectionTable(name = "paciente_alergias", joinColumns = @JoinColumn(name = "paciente_id"))
    @Column(name = "alergia")
    private List<String> alergias;
}
