package com.gog.gograde.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Classe.
 */
@Entity
@Table(name = "classe")
public class Classe implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_level", nullable = false)
    private Integer level;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @NotNull
    @Column(name = "jhi_year", nullable = false)
    private Integer year;

    @OneToMany(mappedBy = "classe")
    @JsonIgnore
    private Set<Student> students = new HashSet<>();

    @ManyToMany(mappedBy = "classes")
    @JsonIgnore
    private Set<Teacher> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLevel() {
        return level;
    }

    public Classe level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getWording() {
        return wording;
    }

    public Classe wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public Boolean isActive() {
        return active;
    }

    public Classe active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Integer getYear() {
        return year;
    }

    public Classe year(Integer year) {
        this.year = year;
        return this;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Classe students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Classe addStudents(Student student) {
        this.students.add(student);
        student.setClasse(this);
        return this;
    }

    public Classe removeStudents(Student student) {
        this.students.remove(student);
        student.setClasse(null);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Classe teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Classe addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getClasses().add(this);
        return this;
    }

    public Classe removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getClasses().remove(this);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
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
        Classe classe = (Classe) o;
        if (classe.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classe.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Classe{" +
            "id=" + getId() +
            ", level='" + getLevel() + "'" +
            ", wording='" + getWording() + "'" +
            ", active='" + isActive() + "'" +
            ", year='" + getYear() + "'" +
            "}";
    }
}
