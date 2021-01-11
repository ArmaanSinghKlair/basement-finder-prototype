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
@Table(name = "basementamenities")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Basementamenities.findAll", query = "SELECT b FROM Basementamenities b")
    , @NamedQuery(name = "Basementamenities.findByPlaceId", query = "SELECT b FROM Basementamenities b WHERE b.placeId = :placeId")})
public class Basementamenities implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "placeId")
    private String placeId;
    @JoinColumn(name = "amenity", referencedColumnName = "amenity")
    @ManyToOne(optional = false)
    private Amenities amenity;

    public Basementamenities() {
    }

    public Basementamenities(String placeId) {
        this.placeId = placeId;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public Amenities getAmenity() {
        return amenity;
    }

    public void setAmenity(Amenities amenity) {
        this.amenity = amenity;
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
        if (!(object instanceof Basementamenities)) {
            return false;
        }
        Basementamenities other = (Basementamenities) object;
        if ((this.placeId == null && other.placeId != null) || (this.placeId != null && !this.placeId.equals(other.placeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Basementamenities[ placeId=" + placeId + " ]";
    }
    
}
