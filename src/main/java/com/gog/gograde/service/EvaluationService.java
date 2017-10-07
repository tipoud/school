package com.gog.gograde.service;

import com.gog.gograde.domain.Evaluation;
import com.gog.gograde.repository.EvaluationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Evaluation.
 */
@Service
@Transactional
public class EvaluationService {

    private final Logger log = LoggerFactory.getLogger(EvaluationService.class);

    private final EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    /**
     * Save a evaluation.
     *
     * @param evaluation the entity to save
     * @return the persisted entity
     */
    public Evaluation save(Evaluation evaluation) {
        log.debug("Request to save Evaluation : {}", evaluation);
        return evaluationRepository.save(evaluation);
    }

    /**
     *  Get all the evaluations.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Evaluation> findAll(Pageable pageable) {
        log.debug("Request to get all Evaluations");
        return evaluationRepository.findAll(pageable);
    }

    /**
     *  Get one evaluation by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Evaluation findOne(Long id) {
        log.debug("Request to get Evaluation : {}", id);
        return evaluationRepository.findOne(id);
    }

    /**
     *  Delete the  evaluation by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Evaluation : {}", id);
        evaluationRepository.delete(id);
    }
}
