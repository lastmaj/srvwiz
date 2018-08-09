package com.lyance.srvwiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyance.srvwiz.domain.DataSource;
import com.lyance.srvwiz.repository.DataSourceRepository;
import com.lyance.srvwiz.service.UserService;
import com.lyance.srvwiz.web.rest.errors.BadRequestAlertException;
import com.lyance.srvwiz.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing DataSource.
 */
@RestController
@RequestMapping("/api")
public class DataSourceResource {

    private final UserService userService;

    private final Logger log = LoggerFactory.getLogger(DataSourceResource.class);

    private static final String ENTITY_NAME = "dataSource";

    private final DataSourceRepository dataSourceRepository;

    public DataSourceResource(UserService userService, DataSourceRepository dataSourceRepository) {
        this.userService = userService;
        this.dataSourceRepository = dataSourceRepository;
    }

    /**
     * POST  /data-sources : Create a new dataSource.
     *
     * @param dataSource the dataSource to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dataSource, or with status 400 (Bad Request) if the dataSource has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/data-sources")
    @Timed
    public ResponseEntity<DataSource> createDataSource(@RequestBody DataSource dataSource) throws URISyntaxException {
        log.debug("REST request to save DataSource : {}", dataSource);
        if (dataSource.getId() != null) {
            throw new BadRequestAlertException("A new dataSource cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DataSource result = dataSourceRepository.save(dataSource.user(userService.getUserWithAuthorities().get()));
        return ResponseEntity.created(new URI("/api/data-sources/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /data-sources : Updates an existing dataSource.
     *
     * @param dataSource the dataSource to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dataSource,
     * or with status 400 (Bad Request) if the dataSource is not valid,
     * or with status 500 (Internal Server Error) if the dataSource couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/data-sources")
    @Timed
    public ResponseEntity<DataSource> updateDataSource(@RequestBody DataSource dataSource) throws URISyntaxException {
        log.debug("REST request to update DataSource : {}", dataSource);
        if (dataSource.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DataSource result = dataSourceRepository.save(dataSource);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dataSource.getId().toString()))
            .body(result);
    }

    /**
     * GET  /data-sources : get all the dataSources.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of dataSources in body
     */
    @GetMapping("/data-sources")
    @Timed
    public List<DataSource> getAllDataSources() {
        log.debug("REST request to get all DataSources");
        return dataSourceRepository.findByUserIsCurrentUser();
    }

    /**
     * GET  /data-sources/:id : get the "id" dataSource.
     *
     * @param id the id of the dataSource to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dataSource, or with status 404 (Not Found)
     */
    @GetMapping("/data-sources/{id}")
    @Timed
    public ResponseEntity<DataSource> getDataSource(@PathVariable Long id) {
        log.debug("REST request to get DataSource : {}", id);
        Optional<DataSource> dataSource = dataSourceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dataSource);
    }

    /**
     * DELETE  /data-sources/:id : delete the "id" dataSource.
     *
     * @param id the id of the dataSource to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/data-sources/{id}")
    @Timed
    public ResponseEntity<Void> deleteDataSource(@PathVariable Long id) {
        log.debug("REST request to delete DataSource : {}", id);

        dataSourceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
