/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author 839645
 */
@Entity
@Table(name = "basementfeatures")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Basementfeatures.findAll", query = "SELECT b FROM Basementfeatures b")
    , @NamedQuery(name = "Basementfeatures.findByPlaceId", query = "SELECT b FROM Basementfeatures b WHERE b.placeId = :placeId")
    , @NamedQuery(name = "Basementfeatures.findByFeatureValue", query = "SELECT b FROM Basementfeatures b WHERE b.featureValue = :featureValue")})
public class Basementfeatures implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "placeId")
    private String placeId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "featureValue")
    private String featureValue;
    @JoinColumn(name = "featureName", referencedColumnName = "featureName")
    @ManyToOne(optional = false)
    private Features featureName;

    public Basementfeatures() {
    }

    public Basementfeatures(String placeId) {
        this.placeId = placeId;
    }

    public Basementfeatures(String placeId, String featureValue) {
        this.placeId = placeId;
        this.featureValue = featureValue;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public String getFeatureValue() {
        return featureValue;
    }

    public void setFeatureValue(String featureValue) {
        this.featureValue = featureValue;
    }

    public Features getFeatureName() {
        return featureName;
    }

    public void setFeatureName(Features featureName) {
        this.featureName = featureName;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (placeId != null ? placeId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Basementfeatures)) {
            return false;
        }
        Basementfeatures other = (Basementfeatures) object;
        if ((this.placeId == null && other.placeId != null) || (this.placeId != null && !this.placeId.equals(other.placeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Basementfeatures[ placeId=" + placeId + " ]";
    }
    
}
