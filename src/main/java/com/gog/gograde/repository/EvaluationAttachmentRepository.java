package com.gog.gograde.repository;

import com.gog.gograde.domain.EvaluationAttachment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EvaluationAttachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EvaluationAttachmentRepository extends JpaRepository<EvaluationAttachment, Long> {

}
