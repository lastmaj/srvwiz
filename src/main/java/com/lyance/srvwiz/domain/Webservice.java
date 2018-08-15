package com.lyance.srvwiz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Webservice.
 */
@Entity
@Table(name = "webservice")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Webservice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "webservice_name")
    private String webserviceName;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("")
    private DataSource datasource;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWebserviceName() {
        return webserviceName;
    }

    public Webservice webserviceName(String webserviceName) {
        this.webserviceName = webserviceName;
        return this;
    }

    public void setWebserviceName(String webserviceName) {
        this.webserviceName = webserviceName;
    }

    public String getDescription() {
        return description;
    }

    public Webservice description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DataSource getDatasource() {
        return datasource;
    }

    public Webservice datasource(DataSource dataSource) {
        this.datasource = dataSource;
        return this;
    }

    public void setDatasource(DataSource dataSource) {
        this.datasource = dataSource;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Webservice webservice = (Webservice) o;
        if (webservice.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), webservice.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Webservice{" +
            "id=" + getId() +
            ", webserviceName='" + getWebserviceName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
