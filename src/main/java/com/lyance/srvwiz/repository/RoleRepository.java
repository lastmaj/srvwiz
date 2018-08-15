package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.Role;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("select role from Role role where role.user.login = ?#{principal.username}")
    List<Role> findByUserIsCurrentUser();

}
