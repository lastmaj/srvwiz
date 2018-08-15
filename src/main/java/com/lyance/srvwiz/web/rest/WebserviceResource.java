package com.lyance.srvwiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyance.srvwiz.domain.Webservice;
import com.lyance.srvwiz.repository.WebserviceRepository;
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
 * REST controller for managing Webservice.
 */
@RestController
@RequestMapping("/api")
public class WebserviceResource {

    private final Logger log = LoggerFactory.getLogger(WebserviceResource.class);

    private static final String ENTITY_NAME = "webservice";

    private final WebserviceRepository webserviceRepository;

    public WebserviceResource(WebserviceRepository webserviceRepository) {
        this.webserviceRepository = webserviceRepository;
    }

    /**
     * POST  /webservices : Create a new webservice.
     *
     * @param webservice the webservice to create
     * @return the ResponseEntity with status 201 (Created) and with body the new webservice, or with status 400 (Bad Request) if the webservice has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/webservices")
    @Timed
    public ResponseEntity<Webservice> createWebservice(@RequestBody Webservice webservice) throws URISyntaxException {
        log.debug("REST request to save Webservice : {}", webservice);
        if (webservice.getId() != null) {
            throw new BadRequestAlertException("A new webservice cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Webservice result = webserviceRepository.save(webservice);
        return ResponseEntity.created(new URI("/api/webservices/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /webservices : Updates an existing webservice.
     *
     * @param webservice the webservice to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated webservice,
     * or with status 400 (Bad Request) if the webservice is not valid,
     * or with status 500 (Internal Server Error) if the webservice couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/webservices")
    @Timed
    public ResponseEntity<Webservice> updateWebservice(@RequestBody Webservice webservice) throws URISyntaxException {
        log.debug("REST request to update Webservice : {}", webservice);
        if (webservice.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Webservice result = webserviceRepository.save(webservice);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, webservice.getId().toString()))
            .body(result);
    }

    /**
     * GET  /webservices : get all the webservices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of webservices in body
     */
    @GetMapping("/webservices")
    @Timed
    public List<Webservice> getAllWebservices() {
        log.debug("REST request to get all Webservices");
        return webserviceRepository.findByUserIsCurrentUser();
    }

    /**
     * GET  /webservices/:id : get the "id" webservice.
     *
     * @param id the id of the webservice to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the webservice, or with status 404 (Not Found)
     */
    @GetMapping("/webservices/{id}")
    @Timed
    public ResponseEntity<Webservice> getWebservice(@PathVariable Long id) {
        log.debug("REST request to get Webservice : {}", id);
        Optional<Webservice> webservice = webserviceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(webservice);
    }

    /**
     * DELETE  /webservices/:id : delete the "id" webservice.
     *
     * @param id the id of the webservice to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/webservices/{id}")
    @Timed
    public ResponseEntity<Void> deleteWebservice(@PathVariable Long id) {
        log.debug("REST request to delete Webservice : {}", id);

        webserviceRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
