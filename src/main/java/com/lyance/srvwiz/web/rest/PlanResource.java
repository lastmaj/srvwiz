package com.lyance.srvwiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lyance.srvwiz.domain.Plan;
import com.lyance.srvwiz.repository.PlanRepository;
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
 * REST controller for managing Plan.
 */
@RestController
@RequestMapping("/api")
public class PlanResource {

    private final Logger log = LoggerFactory.getLogger(PlanResource.class);

    private static final String ENTITY_NAME = "plan";

    private final PlanRepository planRepository;

    public PlanResource(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    /**
     * POST  /plans : Create a new plan.
     *
     * @param plan the plan to create
     * @return the ResponseEntity with status 201 (Created) and with body the new plan, or with status 400 (Bad Request) if the plan has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/plans")
    @Timed
    public ResponseEntity<Plan> createPlan(@RequestBody Plan plan) throws URISyntaxException {
        log.debug("REST request to save Plan : {}", plan);
        if (plan.getId() != null) {
            throw new BadRequestAlertException("A new plan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Plan result = planRepository.save(plan);
        return ResponseEntity.created(new URI("/api/plans/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /plans : Updates an existing plan.
     *
     * @param plan the plan to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated plan,
     * or with status 400 (Bad Request) if the plan is not valid,
     * or with status 500 (Internal Server Error) if the plan couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/plans")
    @Timed
    public ResponseEntity<Plan> updatePlan(@RequestBody Plan plan) throws URISyntaxException {
        log.debug("REST request to update Plan : {}", plan);
        if (plan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Plan result = planRepository.save(plan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, plan.getId().toString()))
            .body(result);
    }

    /**
     * GET  /plans : get all the plans.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of plans in body
     */
    @GetMapping("/plans")
    @Timed
    public List<Plan> getAllPlans() {
        log.debug("REST request to get all Plans");
        return planRepository.findAll();
    }

    /**
     * GET  /plans/:id : get the "id" plan.
     *
     * @param id the id of the plan to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the plan, or with status 404 (Not Found)
     */
    @GetMapping("/plans/{id}")
    @Timed
    public ResponseEntity<Plan> getPlan(@PathVariable Long id) {
        log.debug("REST request to get Plan : {}", id);
        Optional<Plan> plan = planRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(plan);
    }

    /**
     * DELETE  /plans/:id : delete the "id" plan.
     *
     * @param id the id of the plan to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/plans/{id}")
    @Timed
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        log.debug("REST request to delete Plan : {}", id);

        planRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
