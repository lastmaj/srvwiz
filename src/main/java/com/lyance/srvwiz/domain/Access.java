package com.lyance.srvwiz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.lyance.srvwiz.domain.enumeration.AccessType;

/**
 * A Access.
 */
@Entity
@Table(name = "access")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Access implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "table_name")
    private String tableName;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_type")
    private AccessType accessType;

    @ManyToOne
    @JsonIgnoreProperties("accessLists")
    private Role role;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Webservice webservice;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public Access tableName(String tableName) {
        this.tableName = tableName;
        return this;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public AccessType getAccessType() {
        return accessType;
    }

    public Access accessType(AccessType accessType) {
        this.accessType = accessType;
        return this;
    }

    public void setAccessType(AccessType accessType) {
        this.accessType = accessType;
    }

    public Role getRole() {
        return role;
    }

    public Access role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Webservice getWebservice() {
        return webservice;
    }

    public Access webservice(Webservice webservice) {
        this.webservice = webservice;
        return this;
    }

    public void setWebservice(Webservice webservice) {
        this.webservice = webservice;
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
        Access access = (Access) o;
        if (access.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), access.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Access{" +
            "id=" + getId() +
            ", tableName='" + getTableName() + "'" +
            ", accessType='" + getAccessType() + "'" +
            "}";
    }
}
