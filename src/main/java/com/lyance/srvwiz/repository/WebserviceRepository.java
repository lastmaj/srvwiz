package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Webservice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Webservice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WebserviceRepository extends JpaRepository<Webservice, Long> {

}
