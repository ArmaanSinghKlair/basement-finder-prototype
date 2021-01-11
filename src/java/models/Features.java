/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author 839645
 */
@Entity
@Table(name = "features")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Features.findAll", query = "SELECT f FROM Features f")
    , @NamedQuery(name = "Features.findByFeatureName", query = "SELECT f FROM Features f WHERE f.featureName = :featureName")})
public class Features implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "featureName")
    private String featureName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "featureName")
    private List<Basementfeatures> basementfeaturesList;

    public Features() {
    }

    public Features(String featureName) {
        this.featureName = featureName;
    }

    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    @XmlTransient
    public List<Basementfeatures> getBasementfeaturesList() {
        return basementfeaturesList;
    }

    public void setBasementfeaturesList(List<Basementfeatures> basementfeaturesList) {
        this.basementfeaturesList = basementfeaturesList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (featureName != null ? featureName.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Features)) {
            return false;
        }
        Features other = (Features) object;
        if ((this.featureName == null && other.featureName != null) || (this.featureName != null && !this.featureName.equals(other.featureName))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Features[ featureName=" + featureName + " ]";
    }
    
}
