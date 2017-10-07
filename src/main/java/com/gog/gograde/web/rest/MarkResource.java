package com.gog.gograde.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gog.gograde.domain.Mark;
import com.gog.gograde.service.MarkService;
import com.gog.gograde.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mark.
 */
@RestController
@RequestMapping("/api")
public class MarkResource {

    private final Logger log = LoggerFactory.getLogger(MarkResource.class);

    private static final String ENTITY_NAME = "mark";

    private final MarkService markService;

    public MarkResource(MarkService markService) {
        this.markService = markService;
    }

    /**
     * POST  /marks : Create a new mark.
     *
     * @param mark the mark to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mark, or with status 400 (Bad Request) if the mark has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/marks")
    @Timed
    public ResponseEntity<Mark> createMark(@Valid @RequestBody Mark mark) throws URISyntaxException {
        log.debug("REST request to save Mark : {}", mark);
        if (mark.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mark cannot already have an ID")).body(null);
        }
        Mark result = markService.save(mark);
        return ResponseEntity.created(new URI("/api/marks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /marks : Updates an existing mark.
     *
     * @param mark the mark to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mark,
     * or with status 400 (Bad Request) if the mark is not valid,
     * or with status 500 (Internal Server Error) if the mark couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/marks")
    @Timed
    public ResponseEntity<Mark> updateMark(@Valid @RequestBody Mark mark) throws URISyntaxException {
        log.debug("REST request to update Mark : {}", mark);
        if (mark.getId() == null) {
            return createMark(mark);
        }
        Mark result = markService.save(mark);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mark.getId().toString()))
            .body(result);
    }

    /**
     * GET  /marks : get all the marks.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of marks in body
     */
    @GetMapping("/marks")
    @Timed
    public List<Mark> getAllMarks() {
        log.debug("REST request to get all Marks");
        return markService.findAll();
        }

    /**
     * GET  /marks/:id : get the "id" mark.
     *
     * @param id the id of the mark to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mark, or with status 404 (Not Found)
     */
    @GetMapping("/marks/{id}")
    @Timed
    public ResponseEntity<Mark> getMark(@PathVariable Long id) {
        log.debug("REST request to get Mark : {}", id);
        Mark mark = markService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mark));
    }

    /**
     * DELETE  /marks/:id : delete the "id" mark.
     *
     * @param id the id of the mark to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/marks/{id}")
    @Timed
    public ResponseEntity<Void> deleteMark(@PathVariable Long id) {
        log.debug("REST request to delete Mark : {}", id);
        markService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
