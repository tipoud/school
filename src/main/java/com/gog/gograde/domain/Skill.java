package com.gog.gograde.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Skill.
 */
@Entity
@Table(name = "skill")
public class Skill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @Column(name = "level_1")
    private String level1;

    @Column(name = "level_2")
    private String level2;

    @Column(name = "level_3")
    private String level3;

    @Column(name = "level_4")
    private String level4;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @ManyToOne(optional = false)
    @NotNull
    private Area area;

    @ManyToMany(mappedBy = "skills")
    @JsonIgnore
    private Set<Subject> subjects = new HashSet<>();

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

    public Skill wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public String getLevel1() {
        return level1;
    }

    public Skill level1(String level1) {
        this.level1 = level1;
        return this;
    }

    public void setLevel1(String level1) {
        this.level1 = level1;
    }

    public String getLevel2() {
        return level2;
    }

    public Skill level2(String level2) {
        this.level2 = level2;
        return this;
    }

    public void setLevel2(String level2) {
        this.level2 = level2;
    }

    public String getLevel3() {
        return level3;
    }

    public Skill level3(String level3) {
        this.level3 = level3;
        return this;
    }

    public void setLevel3(String level3) {
        this.level3 = level3;
    }

    public String getLevel4() {
        return level4;
    }

    public Skill level4(String level4) {
        this.level4 = level4;
        return this;
    }

    public void setLevel4(String level4) {
        this.level4 = level4;
    }

    public Boolean isActive() {
        return active;
    }

    public Skill active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Area getArea() {
        return area;
    }

    public Skill area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Skill subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Skill addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.getSkills().add(this);
        return this;
    }

    public Skill removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.getSkills().remove(this);
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
        Skill skill = (Skill) o;
        if (skill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), skill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Skill{" +
            "id=" + getId() +
            ", wording='" + getWording() + "'" +
            ", level1='" + getLevel1() + "'" +
            ", level2='" + getLevel2() + "'" +
            ", level3='" + getLevel3() + "'" +
            ", level4='" + getLevel4() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
