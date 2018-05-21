package com.gog.gograde.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @JsonIgnore
    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User user;

    @ManyToMany
    @JoinTable(name = "teacher_classes",
               joinColumns = @JoinColumn(name="teachers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="classes_id", referencedColumnName="id"))
    private Set<Classe> classes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "teacher_subject",
               joinColumns = @JoinColumn(name="teachers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="subjects_id", referencedColumnName="id"))
    private Set<Subject> subjects = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public Teacher lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public Teacher firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public User getUser() {
        return user;
    }

    public Teacher user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Classe> getClasses() {
        return classes;
    }

    public Teacher classes(Set<Classe> classes) {
        this.classes = classes;
        return this;
    }

    public Teacher addClasses(Classe classe) {
        this.classes.add(classe);
        classe.getTeachers().add(this);
        return this;
    }

    public Teacher removeClasses(Classe classe) {
        this.classes.remove(classe);
        classe.getTeachers().remove(this);
        return this;
    }

    public void setClasses(Set<Classe> classes) {
        this.classes = classes;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Teacher subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Teacher addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.getTeachers().add(this);
        return this;
    }

    public Teacher removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.getTeachers().remove(this);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
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
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", lastName='" + getLastName() + "'" +
            ", firstName='" + getFirstName() + "'" +
            "}";
    }
}
