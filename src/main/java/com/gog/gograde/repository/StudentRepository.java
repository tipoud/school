package com.gog.gograde.repository;

import com.gog.gograde.domain.Student;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findAllByClasseId(Long id);

}
