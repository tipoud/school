package com.gog.gograde.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @Column(name = "jhi_comment")
    private String comment;

    @NotNull
    @Column(name = "status", nullable = false)
    private Integer status;

    @OneToOne
    @JoinColumn(unique = true)
    private EvaluationAttachment file;

    @ManyToOne(optional = false)
    @NotNull
    private Classe classe;

    @ManyToOne(optional = false)
    @NotNull
    private Teacher teacher;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWording() {
        return wording;
    }

    public Evaluation wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public LocalDate getDate() {
        return date;
    }

    public Evaluation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getComment() {
        return comment;
    }

    public Evaluation comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getStatus() {
        return status;
    }

    public Evaluation status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public EvaluationAttachment getFile() {
        return file;
    }

    public Evaluation file(EvaluationAttachment evaluationAttachment) {
        this.file = evaluationAttachment;
        return this;
    }

    public void setFile(EvaluationAttachment evaluationAttachment) {
        this.file = evaluationAttachment;
    }

    public Classe getClasse() {
        return classe;
    }

    public Evaluation classe(Classe classe) {
        this.classe = classe;
        return this;
    }

    public void setClasse(Classe classe) {
        this.classe = classe;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Evaluation teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
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
        Evaluation evaluation = (Evaluation) o;
        if (evaluation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", date='" + getDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
