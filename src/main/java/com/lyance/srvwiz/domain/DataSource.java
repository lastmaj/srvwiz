package com.lyance.srvwiz.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.lyance.srvwiz.domain.enumeration.DataType;

import com.lyance.srvwiz.domain.enumeration.FileType;

import com.lyance.srvwiz.domain.enumeration.DatabaseType;

import com.lyance.srvwiz.domain.enumeration.SqlProduct;

/**
 * A DataSource.
 */
@Entity
@Table(name = "data_source")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DataSource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data_source_name")
    private String dataSourceName;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "datatype")
    private DataType datatype;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_type")
    private FileType fileType;

    @Enumerated(EnumType.STRING)
    @Column(name = "database_type")
    private DatabaseType databaseType;

    @Enumerated(EnumType.STRING)
    @Column(name = "database_product")
    private SqlProduct databaseProduct;

    @Column(name = "database_path")
    private String databasePath;

    @Column(name = "db_username")
    private String dbUsername;

    @Column(name = "db_pass")
    private String dbPass;

    @Column(name = "file_path")
    private String filePath;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDataSourceName() {
        return dataSourceName;
    }

    public DataSource dataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
        return this;
    }

    public void setDataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
    }

    public String getDescription() {
        return description;
    }

    public DataSource description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public DataType getDatatype() {
        return datatype;
    }

    public DataSource datatype(DataType datatype) {
        this.datatype = datatype;
        return this;
    }

    public void setDatatype(DataType datatype) {
        this.datatype = datatype;
    }

    public FileType getFileType() {
        return fileType;
    }

    public DataSource fileType(FileType fileType) {
        this.fileType = fileType;
        return this;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }

    public DatabaseType getDatabaseType() {
        return databaseType;
    }

    public DataSource databaseType(DatabaseType databaseType) {
        this.databaseType = databaseType;
        return this;
    }

    public void setDatabaseType(DatabaseType databaseType) {
        this.databaseType = databaseType;
    }

    public SqlProduct getDatabaseProduct() {
        return databaseProduct;
    }

    public DataSource databaseProduct(SqlProduct databaseProduct) {
        this.databaseProduct = databaseProduct;
        return this;
    }

    public void setDatabaseProduct(SqlProduct databaseProduct) {
        this.databaseProduct = databaseProduct;
    }

    public String getDatabasePath() {
        return databasePath;
    }

    public DataSource databasePath(String databasePath) {
        this.databasePath = databasePath;
        return this;
    }

    public void setDatabasePath(String databasePath) {
        this.databasePath = databasePath;
    }

    public String getDbUsername() {
        return dbUsername;
    }

    public DataSource dbUsername(String dbUsername) {
        this.dbUsername = dbUsername;
        return this;
    }

    public void setDbUsername(String dbUsername) {
        this.dbUsername = dbUsername;
    }

    public String getDbPass() {
        return dbPass;
    }

    public DataSource dbPass(String dbPass) {
        this.dbPass = dbPass;
        return this;
    }

    public void setDbPass(String dbPass) {
        this.dbPass = dbPass;
    }

    public String getFilePath() {
        return filePath;
    }

    public DataSource filePath(String filePath) {
        this.filePath = filePath;
        return this;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public User getUser() {
        return user;
    }

    public DataSource user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        DataSource dataSource = (DataSource) o;
        if (dataSource.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dataSource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DataSource{" +
            "id=" + getId() +
            ", dataSourceName='" + getDataSourceName() + "'" +
            ", description='" + getDescription() + "'" +
            ", datatype='" + getDatatype() + "'" +
            ", fileType='" + getFileType() + "'" +
            ", databaseType='" + getDatabaseType() + "'" +
            ", databaseProduct='" + getDatabaseProduct() + "'" +
            ", databasePath='" + getDatabasePath() + "'" +
            ", dbUsername='" + getDbUsername() + "'" +
            ", dbPass='" + getDbPass() + "'" +
            ", filePath='" + getFilePath() + "'" +
            "}";
    }
}
