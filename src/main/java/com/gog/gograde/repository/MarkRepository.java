package com.gog.gograde.repository;

import com.gog.gograde.domain.Mark;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mark entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MarkRepository extends JpaRepository<Mark, Long> {

}
