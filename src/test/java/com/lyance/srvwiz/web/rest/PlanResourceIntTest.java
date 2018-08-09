package com.lyance.srvwiz.web.rest;

import com.lyance.srvwiz.SrvwizApp;

import com.lyance.srvwiz.domain.Plan;
import com.lyance.srvwiz.repository.PlanRepository;
import com.lyance.srvwiz.web.rest.errors.ExceptionTranslator;

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


import static com.lyance.srvwiz.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PlanResource REST controller.
 *
 * @see PlanResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SrvwizApp.class)
public class PlanResourceIntTest {

    private static final String DEFAULT_PLAN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PLAN_NAME = "BBBBBBBBBB";

    private static final Long DEFAULT_REQEST_LIMIT = 1L;
    private static final Long UPDATED_REQEST_LIMIT = 2L;

    private static final Long DEFAULT_DATASOURCE_LIMIT = 1L;
    private static final Long UPDATED_DATASOURCE_LIMIT = 2L;

    private static final Long DEFAULT_WS_LIMIT = 1L;
    private static final Long UPDATED_WS_LIMIT = 2L;

    private static final Long DEFAULT_ROLE_LIMIT = 1L;
    private static final Long UPDATED_ROLE_LIMIT = 2L;

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    @Autowired
    private PlanRepository planRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPlanMockMvc;

    private Plan plan;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanResource planResource = new PlanResource(planRepository);
        this.restPlanMockMvc = MockMvcBuilders.standaloneSetup(planResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Plan createEntity(EntityManager em) {
        Plan plan = new Plan()
            .planName(DEFAULT_PLAN_NAME)
            .reqestLimit(DEFAULT_REQEST_LIMIT)
            .datasourceLimit(DEFAULT_DATASOURCE_LIMIT)
            .wsLimit(DEFAULT_WS_LIMIT)
            .roleLimit(DEFAULT_ROLE_LIMIT)
            .price(DEFAULT_PRICE);
        return plan;
    }

    @Before
    public void initTest() {
        plan = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlan() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();

        // Create the Plan
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isCreated());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate + 1);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getPlanName()).isEqualTo(DEFAULT_PLAN_NAME);
        assertThat(testPlan.getReqestLimit()).isEqualTo(DEFAULT_REQEST_LIMIT);
        assertThat(testPlan.getDatasourceLimit()).isEqualTo(DEFAULT_DATASOURCE_LIMIT);
        assertThat(testPlan.getWsLimit()).isEqualTo(DEFAULT_WS_LIMIT);
        assertThat(testPlan.getRoleLimit()).isEqualTo(DEFAULT_ROLE_LIMIT);
        assertThat(testPlan.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createPlanWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planRepository.findAll().size();

        // Create the Plan with an existing ID
        plan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanMockMvc.perform(post("/api/plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPlans() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get all the planList
        restPlanMockMvc.perform(get("/api/plans?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(plan.getId().intValue())))
            .andExpect(jsonPath("$.[*].planName").value(hasItem(DEFAULT_PLAN_NAME.toString())))
            .andExpect(jsonPath("$.[*].reqestLimit").value(hasItem(DEFAULT_REQEST_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].datasourceLimit").value(hasItem(DEFAULT_DATASOURCE_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].wsLimit").value(hasItem(DEFAULT_WS_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].roleLimit").value(hasItem(DEFAULT_ROLE_LIMIT.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    

    @Test
    @Transactional
    public void getPlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", plan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(plan.getId().intValue()))
            .andExpect(jsonPath("$.planName").value(DEFAULT_PLAN_NAME.toString()))
            .andExpect(jsonPath("$.reqestLimit").value(DEFAULT_REQEST_LIMIT.intValue()))
            .andExpect(jsonPath("$.datasourceLimit").value(DEFAULT_DATASOURCE_LIMIT.intValue()))
            .andExpect(jsonPath("$.wsLimit").value(DEFAULT_WS_LIMIT.intValue()))
            .andExpect(jsonPath("$.roleLimit").value(DEFAULT_ROLE_LIMIT.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPlan() throws Exception {
        // Get the plan
        restPlanMockMvc.perform(get("/api/plans/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // Update the plan
        Plan updatedPlan = planRepository.findById(plan.getId()).get();
        // Disconnect from session so that the updates on updatedPlan are not directly saved in db
        em.detach(updatedPlan);
        updatedPlan
            .planName(UPDATED_PLAN_NAME)
            .reqestLimit(UPDATED_REQEST_LIMIT)
            .datasourceLimit(UPDATED_DATASOURCE_LIMIT)
            .wsLimit(UPDATED_WS_LIMIT)
            .roleLimit(UPDATED_ROLE_LIMIT)
            .price(UPDATED_PRICE);

        restPlanMockMvc.perform(put("/api/plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlan)))
            .andExpect(status().isOk());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
        Plan testPlan = planList.get(planList.size() - 1);
        assertThat(testPlan.getPlanName()).isEqualTo(UPDATED_PLAN_NAME);
        assertThat(testPlan.getReqestLimit()).isEqualTo(UPDATED_REQEST_LIMIT);
        assertThat(testPlan.getDatasourceLimit()).isEqualTo(UPDATED_DATASOURCE_LIMIT);
        assertThat(testPlan.getWsLimit()).isEqualTo(UPDATED_WS_LIMIT);
        assertThat(testPlan.getRoleLimit()).isEqualTo(UPDATED_ROLE_LIMIT);
        assertThat(testPlan.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlan() throws Exception {
        int databaseSizeBeforeUpdate = planRepository.findAll().size();

        // Create the Plan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPlanMockMvc.perform(put("/api/plans")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(plan)))
            .andExpect(status().isBadRequest());

        // Validate the Plan in the database
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlan() throws Exception {
        // Initialize the database
        planRepository.saveAndFlush(plan);

        int databaseSizeBeforeDelete = planRepository.findAll().size();

        // Get the plan
        restPlanMockMvc.perform(delete("/api/plans/{id}", plan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Plan> planList = planRepository.findAll();
        assertThat(planList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Plan.class);
        Plan plan1 = new Plan();
        plan1.setId(1L);
        Plan plan2 = new Plan();
        plan2.setId(plan1.getId());
        assertThat(plan1).isEqualTo(plan2);
        plan2.setId(2L);
        assertThat(plan1).isNotEqualTo(plan2);
        plan1.setId(null);
        assertThat(plan1).isNotEqualTo(plan2);
    }
}
