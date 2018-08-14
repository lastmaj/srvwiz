package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Access;
import com.lyance.srvwiz.domain.Role;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the Access entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccessRepository extends JpaRepository<Access, Long> {
    List<Access> findByRole(Role role);
}
