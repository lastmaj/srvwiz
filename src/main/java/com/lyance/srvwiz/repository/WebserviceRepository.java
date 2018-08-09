package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Webservice;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Webservice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WebserviceRepository extends JpaRepository<Webservice, Long> {
    @Query("select ws from Webservice ws where ws.datasource.user.login = ?#{principal.username}")
    List<Webservice> findByUserIsCurrentUser();
}
