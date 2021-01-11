
package services;

import dataaccess.LocationDB;
import exceptions.EmptyFieldException;
import exceptions.InvalidCoordinatesException;
import exceptions.InvalidRadiusException;
import java.util.ArrayList;
import java.util.List;
import models.Basements;
import org.apache.commons.lang3.StringEscapeUtils;

public class LocationServices {
    private LocationDB db = new LocationDB();
    
    public List<Object[]> searchByQuery(String query){
        if(isEmpty(query))
            return null;
        
        query = StringEscapeUtils.escapeJava(query.toLowerCase());
        return db.getBasementByQuery(query);
    }
    
    public List<Basements> searchByCity(String city, String country, String radius, String isSharing, String minPrice, String maxPrice){
        if(isEmpty(city))
            return null;
        if(isEmpty(radius))
            radius = "10";
        if(isEmpty(isSharing))
            isSharing = "false";
        if(isEmpty(minPrice))
            minPrice = "0";
        if(isEmpty(maxPrice))
            maxPrice = "5000";
        
        double rad = Double.parseDouble(radius);
        boolean isSh = isSharing.intern() == "false" ? false : true;
        double min = Double.parseDouble(minPrice);
        double max = Double.parseDouble(maxPrice);
        city = StringEscapeUtils.escapeJava(city.toLowerCase());
        country =  StringEscapeUtils.escapeJava(country.toLowerCase());
        List<Basements> basements = db.getBasementByCity(city, country,isSh, min, max);
        
        return basements;
    }
    
    public List<Basements> search(String latitude, String longitude, String radius,String isSharing, String minPrice, String maxPrice) throws InvalidCoordinatesException, NumberFormatException, InvalidRadiusException, EmptyFieldException{
        if(isEmpty(latitude) || isEmpty(longitude))
            throw new EmptyFieldException("All coordinates required");
        if(isEmpty(radius))
            radius = "10";
        if(isEmpty(isSharing))
            isSharing = "false";
        if(isEmpty(minPrice))
            minPrice = "0";
        if(isEmpty(maxPrice))
            maxPrice = "5000";
 
        double lat = Double.parseDouble(latitude);
        double lon = Double.parseDouble(longitude);
        double rad = Double.parseDouble(radius);
        boolean isSh = isSharing.intern() == "false" ? false : true;
        double min = Double.parseDouble(minPrice);
        double max = Double.parseDouble(maxPrice);
        System.out.println("lat = "+lat+" long = "+lon+" isSharing = "+isSh+" min = "+min+" max = "+max);
        if(rad <= 0)
            throw new InvalidRadiusException("Radius cannot be negative or zero");
        
        List<Basements> basements = db.getFilteredBasements(isSh, min, max);
        System.out.println("results  = "+basements.size());
        List<Basements> result = new ArrayList<>();
        basements.stream().filter((b)->getDistanceFromLatLonInKm(Double.parseDouble(b.getLatitude()), Double.parseDouble(b.getLongitude()), lat, lon) <= rad).forEach((b)->{
            result.add(b);
        });
        return result;
    }
    
    private double getDistanceFromLatLonInKm(double lat1,double lon1,double lat2,double lon2) {
        int R = 6371; // Radius of the earth in km
        double dLat = deg2rad(lat2-lat1);  // deg2rad below
        double dLon = deg2rad(lon2-lon1); 
        double a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        double d = R * c; // Distance in km  
        return d;
      }

          private double deg2rad(double deg) {
        return deg * (Math.PI/180);
      }
          
      private boolean isEmpty(String str){
          if(str == null || str.trim().length() == 0)
              return true;
          else
              return false;
      }
}
