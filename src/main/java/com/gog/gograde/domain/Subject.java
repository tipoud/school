package com.gog.gograde.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @NotNull
    @Size(max = 4)
    @Column(name = "abreviation", length = 4, nullable = false)
    private String abreviation;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @ManyToMany
    @JoinTable(name = "subject_skills",
               joinColumns = @JoinColumn(name="subjects_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="skills_id", referencedColumnName="id"))
    private Set<Skill> skills = new HashSet<>();

    @ManyToMany(mappedBy = "subjects")
    @JsonIgnore
    private Set<Teacher> teachers = new HashSet<>();

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

    public Subject wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getAbreviation() {
        return abreviation;
    }

    public Subject abreviation(String abreviation) {
        this.abreviation = abreviation;
        return this;
    }

    public void setAbreviation(String abreviation) {
        this.abreviation = abreviation;
    }

    public Boolean isActive() {
        return active;
    }

    public Subject active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Subject skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Subject addSkills(Skill skill) {
        this.skills.add(skill);
        skill.getSubjects().add(this);
        return this;
    }

    public Subject removeSkills(Skill skill) {
        this.skills.remove(skill);
        skill.getSubjects().remove(this);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Subject teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Subject addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        teacher.getSubjects().add(this);
        return this;
    }

    public Subject removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        teacher.getSubjects().remove(this);
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
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", abreviation='" + getAbreviation() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
