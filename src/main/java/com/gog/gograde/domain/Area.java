package com.gog.gograde.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Area.
 */
@Entity
@Table(name = "area")
public class Area implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_number", nullable = false)
    private Integer number;

    @NotNull
    @Column(name = "wording", nullable = false)
    private String wording;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToMany(mappedBy = "area")
    @JsonIgnore
    private Set<Skill> skills = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public Area number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public String getWording() {
        return wording;
    }

    public Area wording(String wording) {
        this.wording = wording;
        return this;
    }

    public void setWording(String wording) {
        this.wording = wording;
    }

    public Boolean isActive() {
        return active;
    }

    public Area active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public Area skills(Set<Skill> skills) {
        this.skills = skills;
        return this;
    }

    public Area addSkill(Skill skill) {
        this.skills.add(skill);
        skill.setArea(this);
        return this;
    }

    public Area removeSkill(Skill skill) {
        this.skills.remove(skill);
        skill.setArea(null);
        return this;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
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
        Area area = (Area) o;
        if (area.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), area.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            ", wording='" + getWording() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
