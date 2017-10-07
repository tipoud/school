package com.gog.gograde.service;

import com.gog.gograde.domain.Classe;
import com.gog.gograde.repository.ClasseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing Classe.
 */
@Service
@Transactional
public class ClasseService {

    private final Logger log = LoggerFactory.getLogger(ClasseService.class);

    private final ClasseRepository classeRepository;

    public ClasseService(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    /**
     * Save a classe.
     *
     * @param classe the entity to save
     * @return the persisted entity
     */
    public Classe save(Classe classe) {
        log.debug("Request to save Classe : {}", classe);
        return classeRepository.save(classe);
    }

    /**
     *  Get all the classes.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Classe> findAll(Pageable pageable) {
        log.debug("Request to get all Classes");
        return classeRepository.findAll(pageable);
    }

    /**
     *  Get one classe by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Classe findOne(Long id) {
        log.debug("Request to get Classe : {}", id);
        return classeRepository.findOne(id);
    }

    /**
     *  Delete the  classe by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Classe : {}", id);
        classeRepository.delete(id);
    }
}
