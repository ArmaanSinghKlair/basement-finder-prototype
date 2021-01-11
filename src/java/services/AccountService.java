/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package services;

import dataaccess.AccountDB;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.util.List;
import models.Basementimages;
import models.Users;
import org.apache.commons.lang3.StringEscapeUtils;

/**
 *
 * @author 839645
 */
public class AccountService {
    AccountDB acdb = new AccountDB();
    public boolean doesUsernameExist(String username){
        if(isEmpty(username))
            return false;
        return acdb.doesUsernameExists(StringEscapeUtils.escapeJava(username));
        
    }
    
    public String authenticate(String username, String password){
        if(isEmpty(username))
            return "Error: Username required";
        if(isEmpty(password))
            return "Error: Password required";
        
        return acdb.authenticate(StringEscapeUtils.escapeJava(username), StringEscapeUtils.escapeJava(password));
    }
    
    public Users getUserInfo(String username){
        return acdb.getUserInfo(username);
    }
    
    public Basementimages getSingleImageByPlaceId(String placeId){
        if(isEmpty(placeId))
            return null;
        return acdb.getSingleImageByPlaceId(placeId);
    }
    
    public List<Basementimages> getImagesByPlaceId(String placeId){
        if(isEmpty(placeId))
            return null;
        return acdb.getImagesByPlaceId(placeId);
    }
    
    public String deleteBasementByPlaceId(String placeId,String username){
        if(isEmpty(placeId))
            return "Error:Unexpected error occured. Please refresh and try again";
        if(isEmpty(username))
            return "Error:Unexpected error occured. Please login again and try again";
        return acdb.deleteBasementByPlaceId(placeId, username);
    }
    
    public String addBasement(String username, String placeId, String latitude, String longitude, String price, String isSharing, String description, String country, String state, String city){
        if(isEmpty(placeId) || isEmpty(latitude) || isEmpty(longitude) || isEmpty(country) || isEmpty(state) || isEmpty(city))
            return "Error:Location required";
        if(isEmpty(price))
            return "Error:Price required";
        if(isEmpty(description))
            return "Error:Description required";
        boolean isSh = isSharing.trim().equals("true");
        double pri = Double.parseDouble(price);
        
        return acdb.addBasement(username, placeId, latitude, longitude, pri, isSh, description, country, state, city);
    }
    
    public BufferedImage toBufferedImage(Image im)
    {
       BufferedImage bi = new BufferedImage(im.getWidth(null),im.getHeight(null),BufferedImage.TYPE_INT_RGB);
        Graphics bg = bi.getGraphics();
        bg.drawImage(im, 0, 0, null);
        bg.dispose();
        return bi;
    }
    
    public String uploadBasementImages(String placeId, byte[] image, String fileType){
        if(isEmpty(placeId) || isEmpty(fileType))
            return "Error:Error occured. Please try again.";
        return acdb.uploadBasementImages(placeId, image, fileType);
    }
    
    public Users getUserByPlaceId(String placeId){
        if(isEmpty(placeId))
            return null;
        return acdb.getUserByPlaceId(placeId);
    }
    private boolean isEmpty(String str){
          if(str == null || str.trim().length() == 0)
              return true;
          else
              return false;
      }
}
