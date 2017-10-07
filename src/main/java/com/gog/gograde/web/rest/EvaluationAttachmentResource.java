package com.gog.gograde.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gog.gograde.domain.EvaluationAttachment;
import com.gog.gograde.service.EvaluationAttachmentService;
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
import java.util.stream.StreamSupport;

/**
 * REST controller for managing EvaluationAttachment.
 */
@RestController
@RequestMapping("/api")
public class EvaluationAttachmentResource {

    private final Logger log = LoggerFactory.getLogger(EvaluationAttachmentResource.class);

    private static final String ENTITY_NAME = "evaluationAttachment";

    private final EvaluationAttachmentService evaluationAttachmentService;

    public EvaluationAttachmentResource(EvaluationAttachmentService evaluationAttachmentService) {
        this.evaluationAttachmentService = evaluationAttachmentService;
    }

    /**
     * POST  /evaluation-attachments : Create a new evaluationAttachment.
     *
     * @param evaluationAttachment the evaluationAttachment to create
     * @return the ResponseEntity with status 201 (Created) and with body the new evaluationAttachment, or with status 400 (Bad Request) if the evaluationAttachment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/evaluation-attachments")
    @Timed
    public ResponseEntity<EvaluationAttachment> createEvaluationAttachment(@Valid @RequestBody EvaluationAttachment evaluationAttachment) throws URISyntaxException {
        log.debug("REST request to save EvaluationAttachment : {}", evaluationAttachment);
        if (evaluationAttachment.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new evaluationAttachment cannot already have an ID")).body(null);
        }
        EvaluationAttachment result = evaluationAttachmentService.save(evaluationAttachment);
        return ResponseEntity.created(new URI("/api/evaluation-attachments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /evaluation-attachments : Updates an existing evaluationAttachment.
     *
     * @param evaluationAttachment the evaluationAttachment to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated evaluationAttachment,
     * or with status 400 (Bad Request) if the evaluationAttachment is not valid,
     * or with status 500 (Internal Server Error) if the evaluationAttachment couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/evaluation-attachments")
    @Timed
    public ResponseEntity<EvaluationAttachment> updateEvaluationAttachment(@Valid @RequestBody EvaluationAttachment evaluationAttachment) throws URISyntaxException {
        log.debug("REST request to update EvaluationAttachment : {}", evaluationAttachment);
        if (evaluationAttachment.getId() == null) {
            return createEvaluationAttachment(evaluationAttachment);
        }
        EvaluationAttachment result = evaluationAttachmentService.save(evaluationAttachment);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, evaluationAttachment.getId().toString()))
            .body(result);
    }

    /**
     * GET  /evaluation-attachments : get all the evaluationAttachments.
     *
     * @param pageable the pagination information
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of evaluationAttachments in body
     */
    @GetMapping("/evaluation-attachments")
    @Timed
    public ResponseEntity<List<EvaluationAttachment>> getAllEvaluationAttachments(@ApiParam Pageable pageable, @RequestParam(required = false) String filter) {
        if ("evalution-is-null".equals(filter)) {
            log.debug("REST request to get all EvaluationAttachments where evalution is null");
            return new ResponseEntity<>(evaluationAttachmentService.findAllWhereEvalutionIsNull(),
                    HttpStatus.OK);
        }
        log.debug("REST request to get a page of EvaluationAttachments");
        Page<EvaluationAttachment> page = evaluationAttachmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/evaluation-attachments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /evaluation-attachments/:id : get the "id" evaluationAttachment.
     *
     * @param id the id of the evaluationAttachment to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the evaluationAttachment, or with status 404 (Not Found)
     */
    @GetMapping("/evaluation-attachments/{id}")
    @Timed
    public ResponseEntity<EvaluationAttachment> getEvaluationAttachment(@PathVariable Long id) {
        log.debug("REST request to get EvaluationAttachment : {}", id);
        EvaluationAttachment evaluationAttachment = evaluationAttachmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(evaluationAttachment));
    }

    /**
     * DELETE  /evaluation-attachments/:id : delete the "id" evaluationAttachment.
     *
     * @param id the id of the evaluationAttachment to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/evaluation-attachments/{id}")
    @Timed
    public ResponseEntity<Void> deleteEvaluationAttachment(@PathVariable Long id) {
        log.debug("REST request to delete EvaluationAttachment : {}", id);
        evaluationAttachmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
