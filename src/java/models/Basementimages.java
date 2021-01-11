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
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name = "basementimages")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Basementimages.findAll", query = "SELECT b FROM Basementimages b")
    , @NamedQuery(name = "Basementimages.findByImageId", query = "SELECT b FROM Basementimages b WHERE b.imageId = :imageId")
    , @NamedQuery(name = "Basementimages.findByPlaceId", query = "SELECT b FROM Basementimages b WHERE b.placeId = :placeId")
    , @NamedQuery(name = "Basementimages.findByImageType", query = "SELECT b FROM Basementimages b WHERE b.imageType = :imageType")})
public class Basementimages implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "imageId")
    private Integer imageId;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "placeId")
    private String placeId;
    @Basic(optional = false)
    @NotNull
    @Lob
    @Column(name = "image")
    private byte[] image;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "imageType")
    private String imageType;

    public Basementimages() {
    }

    public Basementimages(Integer imageId) {
        this.imageId = imageId;
    }

    public Basementimages(Integer imageId, String placeId, byte[] image, String imageType) {
        this.imageId = imageId;
        this.placeId = placeId;
        this.image = image;
        this.imageType = imageType;
    }
    
    public Basementimages(String placeId, byte[] image, String imageType) {
        this.placeId = placeId;
        this.image = image;
        this.imageType = imageType;
    }

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (imageId != null ? imageId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Basementimages)) {
            return false;
        }
        Basementimages other = (Basementimages) object;
        if ((this.imageId == null && other.imageId != null) || (this.imageId != null && !this.imageId.equals(other.imageId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Basementimages[ imageId=" + imageId + " ]";
    }
    
}
