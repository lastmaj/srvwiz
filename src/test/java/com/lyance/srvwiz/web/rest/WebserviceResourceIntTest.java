package com.lyance.srvwiz.web.rest;

import com.lyance.srvwiz.SrvwizApp;

import com.lyance.srvwiz.domain.Webservice;
import com.lyance.srvwiz.repository.WebserviceRepository;
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
 * Test class for the WebserviceResource REST controller.
 *
 * @see WebserviceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SrvwizApp.class)
public class WebserviceResourceIntTest {

    private static final String DEFAULT_WEBSERVICE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_WEBSERVICE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private WebserviceRepository webserviceRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWebserviceMockMvc;

    private Webservice webservice;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WebserviceResource webserviceResource = new WebserviceResource(webserviceRepository);
        this.restWebserviceMockMvc = MockMvcBuilders.standaloneSetup(webserviceResource)
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
    public static Webservice createEntity(EntityManager em) {
        Webservice webservice = new Webservice()
            .webserviceName(DEFAULT_WEBSERVICE_NAME)
            .description(DEFAULT_DESCRIPTION);
        return webservice;
    }

    @Before
    public void initTest() {
        webservice = createEntity(em);
    }

    @Test
    @Transactional
    public void createWebservice() throws Exception {
        int databaseSizeBeforeCreate = webserviceRepository.findAll().size();

        // Create the Webservice
        restWebserviceMockMvc.perform(post("/api/webservices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webservice)))
            .andExpect(status().isCreated());

        // Validate the Webservice in the database
        List<Webservice> webserviceList = webserviceRepository.findAll();
        assertThat(webserviceList).hasSize(databaseSizeBeforeCreate + 1);
        Webservice testWebservice = webserviceList.get(webserviceList.size() - 1);
        assertThat(testWebservice.getWebserviceName()).isEqualTo(DEFAULT_WEBSERVICE_NAME);
        assertThat(testWebservice.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createWebserviceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = webserviceRepository.findAll().size();

        // Create the Webservice with an existing ID
        webservice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWebserviceMockMvc.perform(post("/api/webservices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webservice)))
            .andExpect(status().isBadRequest());

        // Validate the Webservice in the database
        List<Webservice> webserviceList = webserviceRepository.findAll();
        assertThat(webserviceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWebservices() throws Exception {
        // Initialize the database
        webserviceRepository.saveAndFlush(webservice);

        // Get all the webserviceList
        restWebserviceMockMvc.perform(get("/api/webservices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(webservice.getId().intValue())))
            .andExpect(jsonPath("$.[*].webserviceName").value(hasItem(DEFAULT_WEBSERVICE_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    

    @Test
    @Transactional
    public void getWebservice() throws Exception {
        // Initialize the database
        webserviceRepository.saveAndFlush(webservice);

        // Get the webservice
        restWebserviceMockMvc.perform(get("/api/webservices/{id}", webservice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(webservice.getId().intValue()))
            .andExpect(jsonPath("$.webserviceName").value(DEFAULT_WEBSERVICE_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWebservice() throws Exception {
        // Get the webservice
        restWebserviceMockMvc.perform(get("/api/webservices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWebservice() throws Exception {
        // Initialize the database
        webserviceRepository.saveAndFlush(webservice);

        int databaseSizeBeforeUpdate = webserviceRepository.findAll().size();

        // Update the webservice
        Webservice updatedWebservice = webserviceRepository.findById(webservice.getId()).get();
        // Disconnect from session so that the updates on updatedWebservice are not directly saved in db
        em.detach(updatedWebservice);
        updatedWebservice
            .webserviceName(UPDATED_WEBSERVICE_NAME)
            .description(UPDATED_DESCRIPTION);

        restWebserviceMockMvc.perform(put("/api/webservices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedWebservice)))
            .andExpect(status().isOk());

        // Validate the Webservice in the database
        List<Webservice> webserviceList = webserviceRepository.findAll();
        assertThat(webserviceList).hasSize(databaseSizeBeforeUpdate);
        Webservice testWebservice = webserviceList.get(webserviceList.size() - 1);
        assertThat(testWebservice.getWebserviceName()).isEqualTo(UPDATED_WEBSERVICE_NAME);
        assertThat(testWebservice.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingWebservice() throws Exception {
        int databaseSizeBeforeUpdate = webserviceRepository.findAll().size();

        // Create the Webservice

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWebserviceMockMvc.perform(put("/api/webservices")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(webservice)))
            .andExpect(status().isBadRequest());

        // Validate the Webservice in the database
        List<Webservice> webserviceList = webserviceRepository.findAll();
        assertThat(webserviceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteWebservice() throws Exception {
        // Initialize the database
        webserviceRepository.saveAndFlush(webservice);

        int databaseSizeBeforeDelete = webserviceRepository.findAll().size();

        // Get the webservice
        restWebserviceMockMvc.perform(delete("/api/webservices/{id}", webservice.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Webservice> webserviceList = webserviceRepository.findAll();
        assertThat(webserviceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Webservice.class);
        Webservice webservice1 = new Webservice();
        webservice1.setId(1L);
        Webservice webservice2 = new Webservice();
        webservice2.setId(webservice1.getId());
        assertThat(webservice1).isEqualTo(webservice2);
        webservice2.setId(2L);
        assertThat(webservice1).isNotEqualTo(webservice2);
        webservice1.setId(null);
        assertThat(webservice1).isNotEqualTo(webservice2);
    }
}
