package com.gog.gograde.service;

import com.gog.gograde.domain.Mark;
import com.gog.gograde.repository.MarkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing Mark.
 */
@Service
@Transactional
public class MarkService {

    private final Logger log = LoggerFactory.getLogger(MarkService.class);

    private final MarkRepository markRepository;

    public MarkService(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    /**
     * Save a mark.
     *
     * @param mark the entity to save
     * @return the persisted entity
     */
    public Mark save(Mark mark) {
        log.debug("Request to save Mark : {}", mark);
        return markRepository.save(mark);
    }

    /**
     *  Get all the marks.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Mark> findAll() {
        log.debug("Request to get all Marks");
        return markRepository.findAll();
    }

    /**
     *  Get one mark by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Mark findOne(Long id) {
        log.debug("Request to get Mark : {}", id);
        return markRepository.findOne(id);
    }

    /**
     *  Delete the  mark by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Mark : {}", id);
        markRepository.delete(id);
    }
}
