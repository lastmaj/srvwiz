package com.lyance.srvwiz.web.rest;

import com.lyance.srvwiz.SrvwizApp;

import com.lyance.srvwiz.domain.DataSource;
import com.lyance.srvwiz.repository.DataSourceRepository;
import com.lyance.srvwiz.service.UserService;
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

import com.lyance.srvwiz.domain.enumeration.DataType;
import com.lyance.srvwiz.domain.enumeration.FileType;
import com.lyance.srvwiz.domain.enumeration.DatabaseType;
import com.lyance.srvwiz.domain.enumeration.SqlProduct;
/**
 * Test class for the DataSourceResource REST controller.
 *
 * @see DataSourceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SrvwizApp.class)
public class DataSourceResourceIntTest {

    private static final String DEFAULT_DATA_SOURCE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DATA_SOURCE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final DataType DEFAULT_DATATYPE = DataType.FILE;
    private static final DataType UPDATED_DATATYPE = DataType.DATABASE;

    private static final FileType DEFAULT_FILE_TYPE = FileType.CSV;
    private static final FileType UPDATED_FILE_TYPE = FileType.EXCEL;

    private static final DatabaseType DEFAULT_DATABASE_TYPE = DatabaseType.SQL;
    private static final DatabaseType UPDATED_DATABASE_TYPE = DatabaseType.MONGODB;

    private static final SqlProduct DEFAULT_DATABASE_PRODUCT = SqlProduct.MYSQL;
    private static final SqlProduct UPDATED_DATABASE_PRODUCT = SqlProduct.POSTGRESQL;

    private static final String DEFAULT_DATABASE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_DATABASE_PATH = "BBBBBBBBBB";

    private static final String DEFAULT_DB_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_DB_USERNAME = "BBBBBBBBBB";

    private static final String DEFAULT_DB_PASS = "AAAAAAAAAA";
    private static final String UPDATED_DB_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_FILE_PATH = "BBBBBBBBBB";

    @Autowired
    private DataSourceRepository dataSourceRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataSourceMockMvc;

    private DataSource dataSource;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataSourceResource dataSourceResource = new DataSourceResource(userService, dataSourceRepository);
        this.restDataSourceMockMvc = MockMvcBuilders.standaloneSetup(dataSourceResource)
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
    public static DataSource createEntity(EntityManager em) {
        DataSource dataSource = new DataSource()
            .dataSourceName(DEFAULT_DATA_SOURCE_NAME)
            .description(DEFAULT_DESCRIPTION)
            .datatype(DEFAULT_DATATYPE)
            .fileType(DEFAULT_FILE_TYPE)
            .databaseType(DEFAULT_DATABASE_TYPE)
            .databaseProduct(DEFAULT_DATABASE_PRODUCT)
            .databasePath(DEFAULT_DATABASE_PATH)
            .dbUsername(DEFAULT_DB_USERNAME)
            .dbPass(DEFAULT_DB_PASS)
            .filePath(DEFAULT_FILE_PATH);
        return dataSource;
    }

    @Before
    public void initTest() {
        dataSource = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataSource() throws Exception {
        int databaseSizeBeforeCreate = dataSourceRepository.findAll().size();

        // Create the DataSource
        restDataSourceMockMvc.perform(post("/api/data-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSource)))
            .andExpect(status().isCreated());

        // Validate the DataSource in the database
        List<DataSource> dataSourceList = dataSourceRepository.findAll();
        assertThat(dataSourceList).hasSize(databaseSizeBeforeCreate + 1);
        DataSource testDataSource = dataSourceList.get(dataSourceList.size() - 1);
        assertThat(testDataSource.getDataSourceName()).isEqualTo(DEFAULT_DATA_SOURCE_NAME);
        assertThat(testDataSource.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testDataSource.getDatatype()).isEqualTo(DEFAULT_DATATYPE);
        assertThat(testDataSource.getFileType()).isEqualTo(DEFAULT_FILE_TYPE);
        assertThat(testDataSource.getDatabaseType()).isEqualTo(DEFAULT_DATABASE_TYPE);
        assertThat(testDataSource.getDatabaseProduct()).isEqualTo(DEFAULT_DATABASE_PRODUCT);
        assertThat(testDataSource.getDatabasePath()).isEqualTo(DEFAULT_DATABASE_PATH);
        assertThat(testDataSource.getDbUsername()).isEqualTo(DEFAULT_DB_USERNAME);
        assertThat(testDataSource.getDbPass()).isEqualTo(DEFAULT_DB_PASS);
        assertThat(testDataSource.getFilePath()).isEqualTo(DEFAULT_FILE_PATH);
    }

    @Test
    @Transactional
    public void createDataSourceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataSourceRepository.findAll().size();

        // Create the DataSource with an existing ID
        dataSource.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataSourceMockMvc.perform(post("/api/data-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSource)))
            .andExpect(status().isBadRequest());

        // Validate the DataSource in the database
        List<DataSource> dataSourceList = dataSourceRepository.findAll();
        assertThat(dataSourceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataSources() throws Exception {
        // Initialize the database
        dataSourceRepository.saveAndFlush(dataSource);

        // Get all the dataSourceList
        restDataSourceMockMvc.perform(get("/api/data-sources?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataSource.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataSourceName").value(hasItem(DEFAULT_DATA_SOURCE_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].datatype").value(hasItem(DEFAULT_DATATYPE.toString())))
            .andExpect(jsonPath("$.[*].fileType").value(hasItem(DEFAULT_FILE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].databaseType").value(hasItem(DEFAULT_DATABASE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].databaseProduct").value(hasItem(DEFAULT_DATABASE_PRODUCT.toString())))
            .andExpect(jsonPath("$.[*].databasePath").value(hasItem(DEFAULT_DATABASE_PATH.toString())))
            .andExpect(jsonPath("$.[*].dbUsername").value(hasItem(DEFAULT_DB_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].dbPass").value(hasItem(DEFAULT_DB_PASS.toString())))
            .andExpect(jsonPath("$.[*].filePath").value(hasItem(DEFAULT_FILE_PATH.toString())));
    }


    @Test
    @Transactional
    public void getDataSource() throws Exception {
        // Initialize the database
        dataSourceRepository.saveAndFlush(dataSource);

        // Get the dataSource
        restDataSourceMockMvc.perform(get("/api/data-sources/{id}", dataSource.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataSource.getId().intValue()))
            .andExpect(jsonPath("$.dataSourceName").value(DEFAULT_DATA_SOURCE_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.datatype").value(DEFAULT_DATATYPE.toString()))
            .andExpect(jsonPath("$.fileType").value(DEFAULT_FILE_TYPE.toString()))
            .andExpect(jsonPath("$.databaseType").value(DEFAULT_DATABASE_TYPE.toString()))
            .andExpect(jsonPath("$.databaseProduct").value(DEFAULT_DATABASE_PRODUCT.toString()))
            .andExpect(jsonPath("$.databasePath").value(DEFAULT_DATABASE_PATH.toString()))
            .andExpect(jsonPath("$.dbUsername").value(DEFAULT_DB_USERNAME.toString()))
            .andExpect(jsonPath("$.dbPass").value(DEFAULT_DB_PASS.toString()))
            .andExpect(jsonPath("$.filePath").value(DEFAULT_FILE_PATH.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDataSource() throws Exception {
        // Get the dataSource
        restDataSourceMockMvc.perform(get("/api/data-sources/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataSource() throws Exception {
        // Initialize the database
        dataSourceRepository.saveAndFlush(dataSource);

        int databaseSizeBeforeUpdate = dataSourceRepository.findAll().size();

        // Update the dataSource
        DataSource updatedDataSource = dataSourceRepository.findById(dataSource.getId()).get();
        // Disconnect from session so that the updates on updatedDataSource are not directly saved in db
        em.detach(updatedDataSource);
        updatedDataSource
            .dataSourceName(UPDATED_DATA_SOURCE_NAME)
            .description(UPDATED_DESCRIPTION)
            .datatype(UPDATED_DATATYPE)
            .fileType(UPDATED_FILE_TYPE)
            .databaseType(UPDATED_DATABASE_TYPE)
            .databaseProduct(UPDATED_DATABASE_PRODUCT)
            .databasePath(UPDATED_DATABASE_PATH)
            .dbUsername(UPDATED_DB_USERNAME)
            .dbPass(UPDATED_DB_PASS)
            .filePath(UPDATED_FILE_PATH);

        restDataSourceMockMvc.perform(put("/api/data-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataSource)))
            .andExpect(status().isOk());

        // Validate the DataSource in the database
        List<DataSource> dataSourceList = dataSourceRepository.findAll();
        assertThat(dataSourceList).hasSize(databaseSizeBeforeUpdate);
        DataSource testDataSource = dataSourceList.get(dataSourceList.size() - 1);
        assertThat(testDataSource.getDataSourceName()).isEqualTo(UPDATED_DATA_SOURCE_NAME);
        assertThat(testDataSource.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testDataSource.getDatatype()).isEqualTo(UPDATED_DATATYPE);
        assertThat(testDataSource.getFileType()).isEqualTo(UPDATED_FILE_TYPE);
        assertThat(testDataSource.getDatabaseType()).isEqualTo(UPDATED_DATABASE_TYPE);
        assertThat(testDataSource.getDatabaseProduct()).isEqualTo(UPDATED_DATABASE_PRODUCT);
        assertThat(testDataSource.getDatabasePath()).isEqualTo(UPDATED_DATABASE_PATH);
        assertThat(testDataSource.getDbUsername()).isEqualTo(UPDATED_DB_USERNAME);
        assertThat(testDataSource.getDbPass()).isEqualTo(UPDATED_DB_PASS);
        assertThat(testDataSource.getFilePath()).isEqualTo(UPDATED_FILE_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingDataSource() throws Exception {
        int databaseSizeBeforeUpdate = dataSourceRepository.findAll().size();

        // Create the DataSource

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataSourceMockMvc.perform(put("/api/data-sources")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataSource)))
            .andExpect(status().isBadRequest());

        // Validate the DataSource in the database
        List<DataSource> dataSourceList = dataSourceRepository.findAll();
        assertThat(dataSourceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDataSource() throws Exception {
        // Initialize the database
        dataSourceRepository.saveAndFlush(dataSource);

        int databaseSizeBeforeDelete = dataSourceRepository.findAll().size();

        // Get the dataSource
        restDataSourceMockMvc.perform(delete("/api/data-sources/{id}", dataSource.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataSource> dataSourceList = dataSourceRepository.findAll();
        assertThat(dataSourceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataSource.class);
        DataSource dataSource1 = new DataSource();
        dataSource1.setId(1L);
        DataSource dataSource2 = new DataSource();
        dataSource2.setId(dataSource1.getId());
        assertThat(dataSource1).isEqualTo(dataSource2);
        dataSource2.setId(2L);
        assertThat(dataSource1).isNotEqualTo(dataSource2);
        dataSource1.setId(null);
        assertThat(dataSource1).isNotEqualTo(dataSource2);
    }
}
