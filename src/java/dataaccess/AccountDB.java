/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dataaccess;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import models.Basementimages;
import models.Basements;
import models.Users;
import util.DBUtil;
import util.PasswordUtil;
/**
 *
 * @author 839645
 */
public class AccountDB {
    public boolean doesUsernameExists(String username){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        try{
        TypedQuery<Users> q = em.createQuery("select u from Users u where u.username = :username", Users.class);
        q.setParameter("username", username);
        return q.getResultList().size() > 0;
        } finally{
           em.close(); 
        }
    }
    
    public String authenticate(String username, String password){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        
        try{
            Users user = em.find(Users.class, username);
            if(user == null)
                return "Error:Invalid Username";
            try {
                String hash = PasswordUtil.hashPassword(password+user.getPasswordSalt());
                if(hash.equals(user.getPassword())){
                    if(user.getIsAdmin())
                        return "admin";
                    else 
                        return "regular";
                }                 
                else
                    return "Error:Invalid Password";
            } catch (NoSuchAlgorithmException ex) {
                Logger.getLogger(AccountDB.class.getName()).log(Level.SEVERE, null, ex);
            }
            
        } finally{
            em.close();
        }
        return "";
       
    }
    
    public Users getUserInfo(String username){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        
        try{
            if(username != null && username.trim().length() != 0)
                return em.find(Users.class, username);
            else 
                return null;
        } finally{
            em.close();
        }
    }
    
    public Basementimages getSingleImageByPlaceId(String placeId){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        
        try{
            TypedQuery<Basementimages> q = em.createQuery("SELECT b FROM Basementimages b WHERE b.placeId = :placeId", Basementimages.class);
            q.setParameter("placeId", placeId);
            q.setMaxResults(1);
            return q.getSingleResult();
           
        } catch(NoResultException e){
            return null;
        }finally{
            em.close();
        }
    }
    
    public List<Basementimages> getImagesByPlaceId(String placeId){
        EntityManager em = DBUtil.getEmFactory().createEntityManager();
        
        try{
            TypedQuery<Basementimages> q = em.createQuery("SELECT b FROM Basementimages b WHERE b.placeId = :placeId", Basementimages.class);
            q.setParameter("placeId", placeId);
            return q.getResultList();
           
        } catch(NoResultException e){
            return null;
        }finally{
            em.close();
        }
    }
    
        public String deleteBasementByPlaceId(String placeId,String username){
            EntityManager em = DBUtil.getEmFactory().createEntityManager();
            EntityTransaction trans = em.getTransaction();

            try{
            Basements b = em.find(Basements.class, placeId);
            Users u = em.find(Users.class, username);
            List<Basementimages> bi = em.createQuery("SELECT b from Basementimages b where b.placeId = :placeId").setParameter("placeId",placeId).getResultList();
            trans.begin();
            u.getBasementsList().remove(b);
            em.remove(b);
            bi.forEach((image) -> {
                em.remove(image);
                });
            trans.commit();
            return "Success";
            } catch(Exception e){
                System.out.println(e.getMessage());
                return "Error:Unknown error occured. Please try again later";

            }finally{
                em.close();
            }
        }
    public String addBasement(String username, String placeId, String latitude, String longitude, double price, boolean isSharing, String description, String country, String state, String city){
            EntityManager em = DBUtil.getEmFactory().createEntityManager();
            EntityTransaction trans = em.getTransaction();

            try{
                Users u = em.find(Users.class, username);
                Basements b = new Basements(placeId, latitude, longitude, price, isSharing, description, country, state, city);
                long count = (long) em.createQuery("select count(bi) from Basements bi where bi.placeId = :placeId").setParameter("placeId", placeId).getSingleResult();
                if(count > 0)
                    return "Error:Basement already exists";
                
                trans.begin();
                u.getBasementsList().add(b);
                b.setUsername(u);
                em.persist(b);
                trans.commit();
                return "Success";
             
            }catch(Exception e){
                return "Error:"+e.getMessage();
            }finally{
                em.close();
            }    
    }
    
    public String uploadBasementImages(String placeId, byte[] image, String fileType){
         EntityManager em = DBUtil.getEmFactory().createEntityManager();
         EntityTransaction trans = em.getTransaction();

            try{
                Basementimages bi = new Basementimages(placeId, image, fileType);
                trans.begin();
                em.persist(bi);
                trans.commit();
                return "Success";
             
            }catch(Exception e){
                return "Error:"+e.getMessage();
            }finally{
                em.close();
            }    
    }
    
        public Users getUserByPlaceId(String placeId){
            EntityManager em = DBUtil.getEmFactory().createEntityManager();
            try{
                Basements b = em.find(Basements.class, placeId);
                Users u = em.find(Users.class, b.getUsername().getUsername());
                return u;
            } catch(Exception e){
                return null;
            } finally{
                em.close();
            }
        }


}
