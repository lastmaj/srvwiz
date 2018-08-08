package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Access;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Access entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccessRepository extends JpaRepository<Access, Long> {

}
