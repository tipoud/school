package com.gog.gograde.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Mark.
 */
@Entity
@Table(name = "mark")
public class Mark implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_value", nullable = false)
    private Integer value;

    @ManyToOne(optional = false)
    @NotNull
    private Evaluation evaluation;

    @ManyToOne(optional = false)
    @NotNull
    private Skill skills;

    @ManyToOne(optional = false)
    @NotNull
    private Student student;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getValue() {
        return value;
    }

    public Mark value(Integer value) {
        this.value = value;
        return this;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Evaluation getEvaluation() {
        return evaluation;
    }

    public Mark evaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
        return this;
    }

    public void setEvaluation(Evaluation evaluation) {
        this.evaluation = evaluation;
    }

    public Skill getSkills() {
        return skills;
    }

    public Mark skills(Skill skill) {
        this.skills = skill;
        return this;
    }

    public void setSkills(Skill skill) {
        this.skills = skill;
    }

    public Student getStudent() {
        return student;
    }

    public Mark student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Mark mark = (Mark) o;
        if (mark.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mark.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mark{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            "}";
    }
}
