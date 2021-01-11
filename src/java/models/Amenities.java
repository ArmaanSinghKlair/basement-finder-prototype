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
@Table(name = "amenities")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Amenities.findAll", query = "SELECT a FROM Amenities a")
    , @NamedQuery(name = "Amenities.findByAmenity", query = "SELECT a FROM Amenities a WHERE a.amenity = :amenity")})
public class Amenities implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 40)
    @Column(name = "amenity")
    private String amenity;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "amenity")
    private List<Basementamenities> basementamenitiesList;

    public Amenities() {
    }

    public Amenities(String amenity) {
        this.amenity = amenity;
    }

    public String getAmenity() {
        return amenity;
    }

    public void setAmenity(String amenity) {
        this.amenity = amenity;
    }

    @XmlTransient
    public List<Basementamenities> getBasementamenitiesList() {
        return basementamenitiesList;
    }

    public void setBasementamenitiesList(List<Basementamenities> basementamenitiesList) {
        this.basementamenitiesList = basementamenitiesList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (amenity != null ? amenity.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Amenities)) {
            return false;
        }
        Amenities other = (Amenities) object;
        if ((this.amenity == null && other.amenity != null) || (this.amenity != null && !this.amenity.equals(other.amenity))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Amenities[ amenity=" + amenity + " ]";
    }
    
}
