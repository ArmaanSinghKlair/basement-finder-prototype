/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import exceptions.EmptyFieldException;
import exceptions.InvalidCoordinatesException;
import exceptions.InvalidRadiusException;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import models.Basementimages;
import models.Basements;
import models.Users;
import services.LocationServices;
import org.apache.commons.lang3.StringEscapeUtils;
import services.AccountService;
public class SearchServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        LocationServices service = new LocationServices();
        StringBuffer json = new StringBuffer();
        switch(action){
            case "searchByCoords":
                String latitude = request.getParameter("latitude");
                String longitude = request.getParameter("longitude");
                String radius = request.getParameter("radius");
                String isSharing = request.getParameter("isSharing");
                String minPrice = request.getParameter("minPrice");
                String maxPrice = request.getParameter("maxPrice");
                
               
                try{
                    List<Basements> basements= service.search(latitude, longitude, radius, isSharing, minPrice, maxPrice);
                    if(basements.size()==0)
                        return;
                    json.append("[");
                    basements.stream().forEach((Basements b)->{
                        json.append("{"
                                +"\"placeId\":\""+StringEscapeUtils.escapeJava(b.getPlaceId())+"\","
                                +"\"latitude\":\""+StringEscapeUtils.escapeJava(b.getLatitude())+"\","
                                +"\"longitude\":\""+StringEscapeUtils.escapeJava(b.getLongitude())+"\","
                                +"\"state\":\""+StringEscapeUtils.escapeJava(b.getState())+"\","
                                + "\"country\":\""+StringEscapeUtils.escapeJava(b.getCountry())+"\","
                                + "\"city\":\""+StringEscapeUtils.escapeJava(b.getCity())+"\","
                                + "\"price\":\""+StringEscapeUtils.escapeJava(""+b.getPrice())+"\","
                                + "\"username\":\""+StringEscapeUtils.escapeJava(""+b.getUsername().getUsername())+"\","
                                + "\"description\":\""+StringEscapeUtils.escapeJava(""+b.getDescription())+"\""  
                                + "},");
                    });
                    
                    json.deleteCharAt(json.length()-1);
                    json.append("]");
                    response.setContentType("application/json");
                    response.getOutputStream().println(json.toString());
                } catch(InvalidCoordinatesException | NumberFormatException  | InvalidRadiusException | EmptyFieldException e){
                    response.getOutputStream().println("Error:"+e.getMessage());
                }
                break;
            case "searchByQuery":
                String query = request.getParameter("query"); 
                     List<Object[]> basements= service.searchByQuery(query);
                    if(basements.size()==0)
                        return;
                    json.append("[");
                    String city, country;
                    for(Object[] o : basements){
                        city = (String) o[0];
                        country = (String) o[1];
                        json.append("{"
                                + "\"country\":\""+StringEscapeUtils.escapeJava(country)+"\","
                                + "\"city\":\""+StringEscapeUtils.escapeJava(city)+"\""                                
                                + "},");
                    }
                    json.deleteCharAt(json.length()-1);
                    json.append("]");
             
                    response.setContentType("application/json");
                    response.getOutputStream().println(json.toString());
                break;
            case "searchByCity":
                city = request.getParameter("city"); 
                country = request.getParameter("country");
                radius = request.getParameter("radius");
                isSharing = request.getParameter("isSharing");
                minPrice = request.getParameter("minPrice");
                maxPrice = request.getParameter("maxPrice");                 
                List<Basements> basementsByCity= service.searchByCity(city, country, radius, isSharing, minPrice, maxPrice);
                    if(basementsByCity.size()==0)
                        return;
                    json.append("[");
                    basementsByCity.stream().forEach((Basements b)->{
                        json.append("{"
                                +"\"placeId\":\""+StringEscapeUtils.escapeJava(b.getPlaceId())+"\","
                                +"\"latitude\":\""+StringEscapeUtils.escapeJava(b.getLatitude())+"\","
                                +"\"longitude\":\""+StringEscapeUtils.escapeJava(b.getLongitude())+"\","                                
                                +"\"state\":\""+StringEscapeUtils.escapeJava(b.getState())+"\","
                                + "\"country\":\""+StringEscapeUtils.escapeJava(b.getCountry())+"\","
                                + "\"city\":\""+StringEscapeUtils.escapeJava(b.getCity())+"\","
                                + "\"price\":\""+StringEscapeUtils.escapeJava(""+b.getPrice())+"\","
                                + "\"username\":\""+StringEscapeUtils.escapeJava(""+b.getUsername())+"\","  
                                + "\"description\":\""+StringEscapeUtils.escapeJava(""+b.getDescription())+"\""  
                                + "},");
                    });
                    
                    json.deleteCharAt(json.length()-1);
                    json.append("]");
             
                    response.setContentType("application/json");
                    response.getOutputStream().println(json.toString());
                break;
                case "getImagesByPlaceId":
                    List<Basementimages> bi = new AccountService().getImagesByPlaceId(request.getParameter("placeId"));
                    if(bi == null){
                        response.setContentType("application/json");
                        response.getWriter().println("{\"searchResult\":false}");
                    } else {
                        response.setContentType("application/json");
                        StringBuffer sb = new StringBuffer("[");
                        for(Basementimages b: bi){
                            sb.append("{\"code\":\"data:"+b.getImageType()+";base64,"+StringEscapeUtils.escapeJava(Base64.getEncoder().encodeToString(b.getImage()))+"\"},");
                        }
                        if(bi.size() > 0)
                            sb.deleteCharAt(sb.length()-1);
                        sb.append("]");
                        response.getWriter().println(sb.toString());
                    }
                    break;
                    
                case "getUserByPlaceId":
                    Users userByPlaceId = new AccountService().getUserByPlaceId(request.getParameter("placeId"));
                    if(userByPlaceId != null){
                        response.setContentType("application/json");
                        StringBuilder jsonByPlaceId = new StringBuilder("{"
                            + "\"username\":\""+userByPlaceId.getUsername()+"\","
                            + "\"email\":\""+userByPlaceId.getEmail()+"\","
                            + "\"firstName\":\""+userByPlaceId.getFirstName()+"\","
                            + "\"lastName\":\""+userByPlaceId.getLastName()+"\", \"userFound\":true}");
                          
                        response.getOutputStream().println(jsonByPlaceId.toString());
                    } else{
                        response.setContentType("application/json");
                        response.getWriter().println("{\"userFound\":false}");
                    }
                    break;

        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

}
