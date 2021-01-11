/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataaccess;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import models.Basements;
import util.DBUtil;

/**
 *
 * @author 839645
 */
public class LocationDB {
    public List<Basements> getAllBasements(){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        try{
        TypedQuery<Basements> q = em.createNamedQuery("Basements.findAll", Basements.class);
        return q.getResultList();
        } finally{
           em.close(); 
        }
    }
    
    public List<Basements> getFilteredBasements(boolean isSharing, double min, double max){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        try{
        TypedQuery<Basements> q = em.createQuery("select b from Basements b where b.isSharing = :isSharing and b.price >= :minPrice and b.price <= :maxPrice", Basements.class);
        q.setParameter("isSharing", isSharing);
        q.setParameter("minPrice", min);
        q.setParameter("maxPrice", max);
        return q.getResultList();
        } finally{
           em.close(); 
        }
    }
    
    public List<Object[]> getBasementByQuery(String query){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        try{
            Query q = em.createQuery("SELECT distinct b.city, b.country FROM Basements b WHERE LOWER(b.city) LIKE :city");
            q.setParameter("city", "%"+query+"%");

            return q.getResultList();
        } finally{
            em.close();
        }
    }
    
    public List<Basements> getBasementByCity(String city, String country, boolean isSharing, double min, double max){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        try{
            TypedQuery<Basements> q = em.createQuery("SELECT b FROM Basements b WHERE LOWER(b.city) = :city AND LOWER(b.country) = :country AND b.isSharing = :isSharing and b.price >= :minPrice and b.price <= :maxPrice", Basements.class);
            q.setParameter("city", city);
            q.setParameter("country", country);
            q.setParameter("isSharing", isSharing);
            q.setParameter("minPrice", min);
            q.setParameter("maxPrice", max);
            return q.getResultList();
        } finally{
            em.close();
        }
    }
}
