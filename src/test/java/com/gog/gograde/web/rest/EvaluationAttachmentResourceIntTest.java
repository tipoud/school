package com.gog.gograde.web.rest;

import com.gog.gograde.GogradeApp;

import com.gog.gograde.domain.EvaluationAttachment;
import com.gog.gograde.domain.Evaluation;
import com.gog.gograde.repository.EvaluationAttachmentRepository;
import com.gog.gograde.service.EvaluationAttachmentService;
import com.gog.gograde.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EvaluationAttachmentResource REST controller.
 *
 * @see EvaluationAttachmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GogradeApp.class)
public class EvaluationAttachmentResourceIntTest {

    private static final String DEFAULT_WORDING = "AAAAAAAAAA";
    private static final String UPDATED_WORDING = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    @Autowired
    private EvaluationAttachmentRepository evaluationAttachmentRepository;

    @Autowired
    private EvaluationAttachmentService evaluationAttachmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEvaluationAttachmentMockMvc;

    private EvaluationAttachment evaluationAttachment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvaluationAttachmentResource evaluationAttachmentResource = new EvaluationAttachmentResource(evaluationAttachmentService);
        this.restEvaluationAttachmentMockMvc = MockMvcBuilders.standaloneSetup(evaluationAttachmentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EvaluationAttachment createEntity(EntityManager em) {
        EvaluationAttachment evaluationAttachment = new EvaluationAttachment()
            .wording(DEFAULT_WORDING)
            .type(DEFAULT_TYPE)
            .date(DEFAULT_DATE)
            .path(DEFAULT_PATH);
        // Add required entity
        Evaluation evalution = EvaluationResourceIntTest.createEntity(em);
        em.persist(evalution);
        em.flush();
        evaluationAttachment.setEvalution(evalution);
        return evaluationAttachment;
    }

    @Before
    public void initTest() {
        evaluationAttachment = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvaluationAttachment() throws Exception {
        int databaseSizeBeforeCreate = evaluationAttachmentRepository.findAll().size();

        // Create the EvaluationAttachment
        restEvaluationAttachmentMockMvc.perform(post("/api/evaluation-attachments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluationAttachment)))
            .andExpect(status().isCreated());

        // Validate the EvaluationAttachment in the database
        List<EvaluationAttachment> evaluationAttachmentList = evaluationAttachmentRepository.findAll();
        assertThat(evaluationAttachmentList).hasSize(databaseSizeBeforeCreate + 1);
        EvaluationAttachment testEvaluationAttachment = evaluationAttachmentList.get(evaluationAttachmentList.size() - 1);
        assertThat(testEvaluationAttachment.getWording()).isEqualTo(DEFAULT_WORDING);
        assertThat(testEvaluationAttachment.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testEvaluationAttachment.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testEvaluationAttachment.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    @Transactional
    public void createEvaluationAttachmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evaluationAttachmentRepository.findAll().size();

        // Create the EvaluationAttachment with an existing ID
        evaluationAttachment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvaluationAttachmentMockMvc.perform(post("/api/evaluation-attachments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluationAttachment)))
            .andExpect(status().isBadRequest());

        // Validate the EvaluationAttachment in the database
        List<EvaluationAttachment> evaluationAttachmentList = evaluationAttachmentRepository.findAll();
        assertThat(evaluationAttachmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEvaluationAttachments() throws Exception {
        // Initialize the database
        evaluationAttachmentRepository.saveAndFlush(evaluationAttachment);

        // Get all the evaluationAttachmentList
        restEvaluationAttachmentMockMvc.perform(get("/api/evaluation-attachments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evaluationAttachment.getId().intValue())))
            .andExpect(jsonPath("$.[*].wording").value(hasItem(DEFAULT_WORDING.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].path").value(hasItem(DEFAULT_PATH.toString())));
    }

    @Test
    @Transactional
    public void getEvaluationAttachment() throws Exception {
        // Initialize the database
        evaluationAttachmentRepository.saveAndFlush(evaluationAttachment);

        // Get the evaluationAttachment
        restEvaluationAttachmentMockMvc.perform(get("/api/evaluation-attachments/{id}", evaluationAttachment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evaluationAttachment.getId().intValue()))
            .andExpect(jsonPath("$.wording").value(DEFAULT_WORDING.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.path").value(DEFAULT_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvaluationAttachment() throws Exception {
        // Get the evaluationAttachment
        restEvaluationAttachmentMockMvc.perform(get("/api/evaluation-attachments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvaluationAttachment() throws Exception {
        // Initialize the database
        evaluationAttachmentService.save(evaluationAttachment);

        int databaseSizeBeforeUpdate = evaluationAttachmentRepository.findAll().size();

        // Update the evaluationAttachment
        EvaluationAttachment updatedEvaluationAttachment = evaluationAttachmentRepository.findOne(evaluationAttachment.getId());
        updatedEvaluationAttachment
            .wording(UPDATED_WORDING)
            .type(UPDATED_TYPE)
            .date(UPDATED_DATE)
            .path(UPDATED_PATH);

        restEvaluationAttachmentMockMvc.perform(put("/api/evaluation-attachments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvaluationAttachment)))
            .andExpect(status().isOk());

        // Validate the EvaluationAttachment in the database
        List<EvaluationAttachment> evaluationAttachmentList = evaluationAttachmentRepository.findAll();
        assertThat(evaluationAttachmentList).hasSize(databaseSizeBeforeUpdate);
        EvaluationAttachment testEvaluationAttachment = evaluationAttachmentList.get(evaluationAttachmentList.size() - 1);
        assertThat(testEvaluationAttachment.getWording()).isEqualTo(UPDATED_WORDING);
        assertThat(testEvaluationAttachment.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testEvaluationAttachment.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testEvaluationAttachment.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingEvaluationAttachment() throws Exception {
        int databaseSizeBeforeUpdate = evaluationAttachmentRepository.findAll().size();

        // Create the EvaluationAttachment

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEvaluationAttachmentMockMvc.perform(put("/api/evaluation-attachments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evaluationAttachment)))
            .andExpect(status().isCreated());

        // Validate the EvaluationAttachment in the database
        List<EvaluationAttachment> evaluationAttachmentList = evaluationAttachmentRepository.findAll();
        assertThat(evaluationAttachmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEvaluationAttachment() throws Exception {
        // Initialize the database
        evaluationAttachmentService.save(evaluationAttachment);

        int databaseSizeBeforeDelete = evaluationAttachmentRepository.findAll().size();

        // Get the evaluationAttachment
        restEvaluationAttachmentMockMvc.perform(delete("/api/evaluation-attachments/{id}", evaluationAttachment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EvaluationAttachment> evaluationAttachmentList = evaluationAttachmentRepository.findAll();
        assertThat(evaluationAttachmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EvaluationAttachment.class);
        EvaluationAttachment evaluationAttachment1 = new EvaluationAttachment();
        evaluationAttachment1.setId(1L);
        EvaluationAttachment evaluationAttachment2 = new EvaluationAttachment();
        evaluationAttachment2.setId(evaluationAttachment1.getId());
        assertThat(evaluationAttachment1).isEqualTo(evaluationAttachment2);
        evaluationAttachment2.setId(2L);
        assertThat(evaluationAttachment1).isNotEqualTo(evaluationAttachment2);
        evaluationAttachment1.setId(null);
        assertThat(evaluationAttachment1).isNotEqualTo(evaluationAttachment2);
    }
}
