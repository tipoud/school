package com.gog.gograde.service;

import com.gog.gograde.domain.EvaluationAttachment;
import com.gog.gograde.repository.EvaluationAttachmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing EvaluationAttachment.
 */
@Service
@Transactional
public class EvaluationAttachmentService {

    private final Logger log = LoggerFactory.getLogger(EvaluationAttachmentService.class);

    private final EvaluationAttachmentRepository evaluationAttachmentRepository;

    public EvaluationAttachmentService(EvaluationAttachmentRepository evaluationAttachmentRepository) {
        this.evaluationAttachmentRepository = evaluationAttachmentRepository;
    }

    /**
     * Save a evaluationAttachment.
     *
     * @param evaluationAttachment the entity to save
     * @return the persisted entity
     */
    public EvaluationAttachment save(EvaluationAttachment evaluationAttachment) {
        log.debug("Request to save EvaluationAttachment : {}", evaluationAttachment);
        return evaluationAttachmentRepository.save(evaluationAttachment);
    }

    /**
     *  Get all the evaluationAttachments.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<EvaluationAttachment> findAll(Pageable pageable) {
        log.debug("Request to get all EvaluationAttachments");
        return evaluationAttachmentRepository.findAll(pageable);
    }


    /**
     *  get all the evaluationAttachments where Evalution is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<EvaluationAttachment> findAllWhereEvalutionIsNull() {
        log.debug("Request to get all evaluationAttachments where Evalution is null");
        return StreamSupport
            .stream(evaluationAttachmentRepository.findAll().spliterator(), false)
            .filter(evaluationAttachment -> evaluationAttachment.getEvalution() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get one evaluationAttachment by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public EvaluationAttachment findOne(Long id) {
        log.debug("Request to get EvaluationAttachment : {}", id);
        return evaluationAttachmentRepository.findOne(id);
    }

    /**
     *  Delete the  evaluationAttachment by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete EvaluationAttachment : {}", id);
        evaluationAttachmentRepository.delete(id);
    }
}
