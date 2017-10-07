package com.gog.gograde.service;

import com.gog.gograde.domain.Skill;
import com.gog.gograde.repository.SkillRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Skill.
 */
@Service
@Transactional
public class SkillService {

    private final Logger log = LoggerFactory.getLogger(SkillService.class);

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    /**
     * Save a skill.
     *
     * @param skill the entity to save
     * @return the persisted entity
     */
    public Skill save(Skill skill) {
        log.debug("Request to save Skill : {}", skill);
        return skillRepository.save(skill);
    }

    /**
     *  Get all the skills.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Skill> findAll(Pageable pageable) {
        log.debug("Request to get all Skills");
        return skillRepository.findAll(pageable);
    }

    /**
     *  Get one skill by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Skill findOne(Long id) {
        log.debug("Request to get Skill : {}", id);
        return skillRepository.findOne(id);
    }

    /**
     *  Delete the  skill by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Skill : {}", id);
        skillRepository.delete(id);
    }
}
