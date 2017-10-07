package com.gog.gograde.web.rest;

import com.gog.gograde.GogradeApp;

import com.gog.gograde.domain.Skill;
import com.gog.gograde.domain.Area;
import com.gog.gograde.repository.SkillRepository;
import com.gog.gograde.service.SkillService;
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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SkillResource REST controller.
 *
 * @see SkillResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GogradeApp.class)
public class SkillResourceIntTest {

    private static final String DEFAULT_WORDING = "AAAAAAAAAA";
    private static final String UPDATED_WORDING = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL_1 = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_1 = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL_2 = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_2 = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL_3 = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_3 = "BBBBBBBBBB";

    private static final String DEFAULT_LEVEL_4 = "AAAAAAAAAA";
    private static final String UPDATED_LEVEL_4 = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private SkillService skillService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSkillMockMvc;

    private Skill skill;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SkillResource skillResource = new SkillResource(skillService);
        this.restSkillMockMvc = MockMvcBuilders.standaloneSetup(skillResource)
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
    public static Skill createEntity(EntityManager em) {
        Skill skill = new Skill()
            .wording(DEFAULT_WORDING)
            .level1(DEFAULT_LEVEL_1)
            .level2(DEFAULT_LEVEL_2)
            .level3(DEFAULT_LEVEL_3)
            .level4(DEFAULT_LEVEL_4)
            .active(DEFAULT_ACTIVE);
        // Add required entity
        Area area = AreaResourceIntTest.createEntity(em);
        em.persist(area);
        em.flush();
        skill.setArea(area);
        return skill;
    }

    @Before
    public void initTest() {
        skill = createEntity(em);
    }

    @Test
    @Transactional
    public void createSkill() throws Exception {
        int databaseSizeBeforeCreate = skillRepository.findAll().size();

        // Create the Skill
        restSkillMockMvc.perform(post("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(skill)))
            .andExpect(status().isCreated());

        // Validate the Skill in the database
        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeCreate + 1);
        Skill testSkill = skillList.get(skillList.size() - 1);
        assertThat(testSkill.getWording()).isEqualTo(DEFAULT_WORDING);
        assertThat(testSkill.getLevel1()).isEqualTo(DEFAULT_LEVEL_1);
        assertThat(testSkill.getLevel2()).isEqualTo(DEFAULT_LEVEL_2);
        assertThat(testSkill.getLevel3()).isEqualTo(DEFAULT_LEVEL_3);
        assertThat(testSkill.getLevel4()).isEqualTo(DEFAULT_LEVEL_4);
        assertThat(testSkill.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createSkillWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = skillRepository.findAll().size();

        // Create the Skill with an existing ID
        skill.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSkillMockMvc.perform(post("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(skill)))
            .andExpect(status().isBadRequest());

        // Validate the Skill in the database
        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkWordingIsRequired() throws Exception {
        int databaseSizeBeforeTest = skillRepository.findAll().size();
        // set the field null
        skill.setWording(null);

        // Create the Skill, which fails.

        restSkillMockMvc.perform(post("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(skill)))
            .andExpect(status().isBadRequest());

        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = skillRepository.findAll().size();
        // set the field null
        skill.setActive(null);

        // Create the Skill, which fails.

        restSkillMockMvc.perform(post("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(skill)))
            .andExpect(status().isBadRequest());

        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSkills() throws Exception {
        // Initialize the database
        skillRepository.saveAndFlush(skill);

        // Get all the skillList
        restSkillMockMvc.perform(get("/api/skills?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(skill.getId().intValue())))
            .andExpect(jsonPath("$.[*].wording").value(hasItem(DEFAULT_WORDING.toString())))
            .andExpect(jsonPath("$.[*].level1").value(hasItem(DEFAULT_LEVEL_1.toString())))
            .andExpect(jsonPath("$.[*].level2").value(hasItem(DEFAULT_LEVEL_2.toString())))
            .andExpect(jsonPath("$.[*].level3").value(hasItem(DEFAULT_LEVEL_3.toString())))
            .andExpect(jsonPath("$.[*].level4").value(hasItem(DEFAULT_LEVEL_4.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getSkill() throws Exception {
        // Initialize the database
        skillRepository.saveAndFlush(skill);

        // Get the skill
        restSkillMockMvc.perform(get("/api/skills/{id}", skill.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(skill.getId().intValue()))
            .andExpect(jsonPath("$.wording").value(DEFAULT_WORDING.toString()))
            .andExpect(jsonPath("$.level1").value(DEFAULT_LEVEL_1.toString()))
            .andExpect(jsonPath("$.level2").value(DEFAULT_LEVEL_2.toString()))
            .andExpect(jsonPath("$.level3").value(DEFAULT_LEVEL_3.toString()))
            .andExpect(jsonPath("$.level4").value(DEFAULT_LEVEL_4.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSkill() throws Exception {
        // Get the skill
        restSkillMockMvc.perform(get("/api/skills/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSkill() throws Exception {
        // Initialize the database
        skillService.save(skill);

        int databaseSizeBeforeUpdate = skillRepository.findAll().size();

        // Update the skill
        Skill updatedSkill = skillRepository.findOne(skill.getId());
        updatedSkill
            .wording(UPDATED_WORDING)
            .level1(UPDATED_LEVEL_1)
            .level2(UPDATED_LEVEL_2)
            .level3(UPDATED_LEVEL_3)
            .level4(UPDATED_LEVEL_4)
            .active(UPDATED_ACTIVE);

        restSkillMockMvc.perform(put("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSkill)))
            .andExpect(status().isOk());

        // Validate the Skill in the database
        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeUpdate);
        Skill testSkill = skillList.get(skillList.size() - 1);
        assertThat(testSkill.getWording()).isEqualTo(UPDATED_WORDING);
        assertThat(testSkill.getLevel1()).isEqualTo(UPDATED_LEVEL_1);
        assertThat(testSkill.getLevel2()).isEqualTo(UPDATED_LEVEL_2);
        assertThat(testSkill.getLevel3()).isEqualTo(UPDATED_LEVEL_3);
        assertThat(testSkill.getLevel4()).isEqualTo(UPDATED_LEVEL_4);
        assertThat(testSkill.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingSkill() throws Exception {
        int databaseSizeBeforeUpdate = skillRepository.findAll().size();

        // Create the Skill

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSkillMockMvc.perform(put("/api/skills")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(skill)))
            .andExpect(status().isCreated());

        // Validate the Skill in the database
        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSkill() throws Exception {
        // Initialize the database
        skillService.save(skill);

        int databaseSizeBeforeDelete = skillRepository.findAll().size();

        // Get the skill
        restSkillMockMvc.perform(delete("/api/skills/{id}", skill.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Skill> skillList = skillRepository.findAll();
        assertThat(skillList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Skill.class);
        Skill skill1 = new Skill();
        skill1.setId(1L);
        Skill skill2 = new Skill();
        skill2.setId(skill1.getId());
        assertThat(skill1).isEqualTo(skill2);
        skill2.setId(2L);
        assertThat(skill1).isNotEqualTo(skill2);
        skill1.setId(null);
        assertThat(skill1).isNotEqualTo(skill2);
    }
}
