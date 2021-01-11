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
@Table(name = "basements")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Basements.findAll", query = "SELECT b FROM Basements b")
    , @NamedQuery(name = "Basements.findByPlaceId", query = "SELECT b FROM Basements b WHERE b.placeId = :placeId")
    , @NamedQuery(name = "Basements.findByLatitude", query = "SELECT b FROM Basements b WHERE b.latitude = :latitude")
    , @NamedQuery(name = "Basements.findByLongitude", query = "SELECT b FROM Basements b WHERE b.longitude = :longitude")
    , @NamedQuery(name = "Basements.findByPrice", query = "SELECT b FROM Basements b WHERE b.price = :price")
    , @NamedQuery(name = "Basements.findByIsSharing", query = "SELECT b FROM Basements b WHERE b.isSharing = :isSharing")
    , @NamedQuery(name = "Basements.findByDescription", query = "SELECT b FROM Basements b WHERE b.description = :description")
    , @NamedQuery(name = "Basements.findByCountry", query = "SELECT b FROM Basements b WHERE b.country = :country")
    , @NamedQuery(name = "Basements.findByState", query = "SELECT b FROM Basements b WHERE b.state = :state")
    , @NamedQuery(name = "Basements.findByCity", query = "SELECT b FROM Basements b WHERE b.city = :city")})
public class Basements implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "placeId")
    private String placeId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "latitude")
    private String latitude;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "longitude")
    private String longitude;
    @Basic(optional = false)
    @NotNull
    @Column(name = "price")
    private double price;
    @Basic(optional = false)
    @NotNull
    @Column(name = "isSharing")
    private boolean isSharing;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 500)
    @Column(name = "description")
    private String description;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 20)
    @Column(name = "country")
    private String country;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 60)
    @Column(name = "state")
    private String state;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 100)
    @Column(name = "city")
    private String city;
    @JoinColumn(name = "Username", referencedColumnName = "Username")
    @ManyToOne(optional = false)
    private Users username;

    public Basements() {
    }

    public Basements(String placeId) {
        this.placeId = placeId;
    }

    public Basements(String placeId, String latitude, String longitude, double price, boolean isSharing, String description, String country, String state, String city) {
        this.placeId = placeId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.price = price;
        this.isSharing = isSharing;
        this.description = description;
        this.country = country;
        this.state = state;
        this.city = city;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean getIsSharing() {
        return isSharing;
    }

    public void setIsSharing(boolean isSharing) {
        this.isSharing = isSharing;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Users getUsername() {
        return username;
    }

    public void setUsername(Users username) {
        this.username = username;
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
        if (!(object instanceof Basements)) {
            return false;
        }
        Basements other = (Basements) object;
        if ((this.placeId == null && other.placeId != null) || (this.placeId != null && !this.placeId.equals(other.placeId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Basements[ placeId=" + placeId + " ]";
    }
    
}
