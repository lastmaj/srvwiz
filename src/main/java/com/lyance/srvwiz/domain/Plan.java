package com.lyance.srvwiz.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Plan.
 */
@Entity
@Table(name = "plan")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Plan implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "plan_name")
    private String planName;

    @Column(name = "reqest_limit")
    private Long reqestLimit;

    @Column(name = "datasource_limit")
    private Long datasourceLimit;

    @Column(name = "ws_limit")
    private Long wsLimit;

    @Column(name = "role_limit")
    private Long roleLimit;

    @Column(name = "price")
    private Long price;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlanName() {
        return planName;
    }

    public Plan planName(String planName) {
        this.planName = planName;
        return this;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Long getReqestLimit() {
        return reqestLimit;
    }

    public Plan reqestLimit(Long reqestLimit) {
        this.reqestLimit = reqestLimit;
        return this;
    }

    public void setReqestLimit(Long reqestLimit) {
        this.reqestLimit = reqestLimit;
    }

    public Long getDatasourceLimit() {
        return datasourceLimit;
    }

    public Plan datasourceLimit(Long datasourceLimit) {
        this.datasourceLimit = datasourceLimit;
        return this;
    }

    public void setDatasourceLimit(Long datasourceLimit) {
        this.datasourceLimit = datasourceLimit;
    }

    public Long getWsLimit() {
        return wsLimit;
    }

    public Plan wsLimit(Long wsLimit) {
        this.wsLimit = wsLimit;
        return this;
    }

    public void setWsLimit(Long wsLimit) {
        this.wsLimit = wsLimit;
    }

    public Long getRoleLimit() {
        return roleLimit;
    }

    public Plan roleLimit(Long roleLimit) {
        this.roleLimit = roleLimit;
        return this;
    }

    public void setRoleLimit(Long roleLimit) {
        this.roleLimit = roleLimit;
    }

    public Long getPrice() {
        return price;
    }

    public Plan price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
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
        Plan plan = (Plan) o;
        if (plan.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), plan.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Plan{" +
            "id=" + getId() +
            ", planName='" + getPlanName() + "'" +
            ", reqestLimit=" + getReqestLimit() +
            ", datasourceLimit=" + getDatasourceLimit() +
            ", wsLimit=" + getWsLimit() +
            ", roleLimit=" + getRoleLimit() +
            ", price=" + getPrice() +
            "}";
    }
}
