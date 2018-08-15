package com.lyance.srvwiz.web.rest;

import com.lyance.srvwiz.SrvwizApp;

import com.lyance.srvwiz.domain.Access;
import com.lyance.srvwiz.repository.AccessRepository;
import com.lyance.srvwiz.repository.RoleRepository;
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

import com.lyance.srvwiz.domain.enumeration.AccessType;
/**
 * Test class for the AccessResource REST controller.
 *
 * @see AccessResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SrvwizApp.class)
public class AccessResourceIntTest {

    private static final String DEFAULT_TABLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TABLE_NAME = "BBBBBBBBBB";

    private static final AccessType DEFAULT_ACCESS_TYPE = AccessType.GET;
    private static final AccessType UPDATED_ACCESS_TYPE = AccessType.POST;

    @Autowired
    private AccessRepository accessRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccessMockMvc;

    private Access access;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccessResource accessResource = new AccessResource(accessRepository, roleRepository);
        this.restAccessMockMvc = MockMvcBuilders.standaloneSetup(accessResource)
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
    public static Access createEntity(EntityManager em) {
        Access access = new Access()
            .tableName(DEFAULT_TABLE_NAME)
            .accessType(DEFAULT_ACCESS_TYPE);
        return access;
    }

    @Before
    public void initTest() {
        access = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccess() throws Exception {
        int databaseSizeBeforeCreate = accessRepository.findAll().size();

        // Create the Access
        restAccessMockMvc.perform(post("/api/accesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(access)))
            .andExpect(status().isCreated());

        // Validate the Access in the database
        List<Access> accessList = accessRepository.findAll();
        assertThat(accessList).hasSize(databaseSizeBeforeCreate + 1);
        Access testAccess = accessList.get(accessList.size() - 1);
        assertThat(testAccess.getTableName()).isEqualTo(DEFAULT_TABLE_NAME);
        assertThat(testAccess.getAccessType()).isEqualTo(DEFAULT_ACCESS_TYPE);
    }

    @Test
    @Transactional
    public void createAccessWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accessRepository.findAll().size();

        // Create the Access with an existing ID
        access.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccessMockMvc.perform(post("/api/accesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(access)))
            .andExpect(status().isBadRequest());

        // Validate the Access in the database
        List<Access> accessList = accessRepository.findAll();
        assertThat(accessList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccesses() throws Exception {
        // Initialize the database
        accessRepository.saveAndFlush(access);

        // Get all the accessList
        restAccessMockMvc.perform(get("/api/accesses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(access.getId().intValue())))
            .andExpect(jsonPath("$.[*].tableName").value(hasItem(DEFAULT_TABLE_NAME.toString())))
            .andExpect(jsonPath("$.[*].accessType").value(hasItem(DEFAULT_ACCESS_TYPE.toString())));
    }
    

    @Test
    @Transactional
    public void getAccess() throws Exception {
        // Initialize the database
        accessRepository.saveAndFlush(access);

        // Get the access
        restAccessMockMvc.perform(get("/api/accesses/{id}", access.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(access.getId().intValue()))
            .andExpect(jsonPath("$.tableName").value(DEFAULT_TABLE_NAME.toString()))
            .andExpect(jsonPath("$.accessType").value(DEFAULT_ACCESS_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAccess() throws Exception {
        // Get the access
        restAccessMockMvc.perform(get("/api/accesses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccess() throws Exception {
        // Initialize the database
        accessRepository.saveAndFlush(access);

        int databaseSizeBeforeUpdate = accessRepository.findAll().size();

        // Update the access
        Access updatedAccess = accessRepository.findById(access.getId()).get();
        // Disconnect from session so that the updates on updatedAccess are not directly saved in db
        em.detach(updatedAccess);
        updatedAccess
            .tableName(UPDATED_TABLE_NAME)
            .accessType(UPDATED_ACCESS_TYPE);

        restAccessMockMvc.perform(put("/api/accesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccess)))
            .andExpect(status().isOk());

        // Validate the Access in the database
        List<Access> accessList = accessRepository.findAll();
        assertThat(accessList).hasSize(databaseSizeBeforeUpdate);
        Access testAccess = accessList.get(accessList.size() - 1);
        assertThat(testAccess.getTableName()).isEqualTo(UPDATED_TABLE_NAME);
        assertThat(testAccess.getAccessType()).isEqualTo(UPDATED_ACCESS_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingAccess() throws Exception {
        int databaseSizeBeforeUpdate = accessRepository.findAll().size();

        // Create the Access

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAccessMockMvc.perform(put("/api/accesses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(access)))
            .andExpect(status().isBadRequest());

        // Validate the Access in the database
        List<Access> accessList = accessRepository.findAll();
        assertThat(accessList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccess() throws Exception {
        // Initialize the database
        accessRepository.saveAndFlush(access);

        int databaseSizeBeforeDelete = accessRepository.findAll().size();

        // Get the access
        restAccessMockMvc.perform(delete("/api/accesses/{id}", access.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Access> accessList = accessRepository.findAll();
        assertThat(accessList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Access.class);
        Access access1 = new Access();
        access1.setId(1L);
        Access access2 = new Access();
        access2.setId(access1.getId());
        assertThat(access1).isEqualTo(access2);
        access2.setId(2L);
        assertThat(access1).isNotEqualTo(access2);
        access1.setId(null);
        assertThat(access1).isNotEqualTo(access2);
    }
}
