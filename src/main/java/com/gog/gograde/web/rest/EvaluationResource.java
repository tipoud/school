package com.gog.gograde.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gog.gograde.domain.Evaluation;
import com.gog.gograde.service.EvaluationService;
import com.gog.gograde.web.rest.util.HeaderUtil;
import com.gog.gograde.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Evaluation.
 */
@RestController
@RequestMapping("/api")
public class EvaluationResource {

    private final Logger log = LoggerFactory.getLogger(EvaluationResource.class);

    private static final String ENTITY_NAME = "evaluation";

    private final EvaluationService evaluationService;

    public EvaluationResource(EvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    /**
     * POST  /evaluations : Create a new evaluation.
     *
     * @param evaluation the evaluation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluation, or with status 400 (Bad Request) if the evaluation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluations")
    @Timed
    public ResponseEntity<Evaluation> createEvaluation(@Valid @RequestBody Evaluation evaluation) throws URISyntaxException {
        log.debug("REST request to save Evaluation : {}", evaluation);
        if (evaluation.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new evaluation cannot already have an ID")).body(null);
        }
        Evaluation result = evaluationService.save(evaluation);
        return ResponseEntity.created(new URI("/api/evaluations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluations : Updates an existing evaluation.
     *
     * @param evaluation the evaluation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluation,
     * or with status 400 (Bad Request) if the evaluation is not valid,
     * or with status 500 (Internal Server Error) if the evaluation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluations")
    @Timed
    public ResponseEntity<Evaluation> updateEvaluation(@Valid @RequestBody Evaluation evaluation) throws URISyntaxException {
        log.debug("REST request to update Evaluation : {}", evaluation);
        if (evaluation.getId() == null) {
            return createEvaluation(evaluation);
        }
        Evaluation result = evaluationService.save(evaluation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluations : get all the evaluations.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of evaluations in body
     */
    @GetMapping("/evaluations")
    @Timed
    public ResponseEntity<List<Evaluation>> getAllEvaluations(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Evaluations");
        Page<Evaluation> page = evaluationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/evaluations");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /evaluations/:id : get the "id" evaluation.
     *
     * @param id the id of the evaluation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluation, or with status 404 (Not Found)
     */
    @GetMapping("/evaluations/{id}")
    @Timed
    public ResponseEntity<Evaluation> getEvaluation(@PathVariable Long id) {
        log.debug("REST request to get Evaluation : {}", id);
        Evaluation evaluation = evaluationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(evaluation));
    }

    /**
     * DELETE  /evaluations/:id : delete the "id" evaluation.
     *
     * @param id the id of the evaluation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluations/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluation(@PathVariable Long id) {
        log.debug("REST request to delete Evaluation : {}", id);
        evaluationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
