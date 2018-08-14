package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Access;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Access entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccessRepository extends JpaRepository<Access, Long> {
    List<Access> findByRoleAccessLists(Long roleId);
}
