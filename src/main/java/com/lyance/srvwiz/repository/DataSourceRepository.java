package com.lyance.srvwiz.repository;

import com.lyance.srvwiz.domain.DataSource;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the DataSource entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DataSourceRepository extends JpaRepository<DataSource, Long> {

    @Query("select data_source from DataSource data_source where data_source.user.login = ?#{principal.username}")
    List<DataSource> findByUserIsCurrentUser();

}
