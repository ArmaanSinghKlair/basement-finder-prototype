/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.awt.Image;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Base64;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;
import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import models.Basementimages;
import models.Basements;
import models.Users;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.tomcat.util.http.fileupload.FileItemIterator;
import org.apache.tomcat.util.http.fileupload.FileItemStream;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;
import org.apache.tomcat.util.http.fileupload.util.Streams;
import services.AccountService;
import util.JSONObject;

/**
 *
 * @author 839645
 */
public class DashboardServlet extends HttpServlet {


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url="/WEB-INF/dashboard.jsp";
        String action= request.getParameter("action");
        if(action != null && action.trim().length() != 0){
            response.setContentType("application/json");
            HttpSession sess = request.getSession();
            AccountService service = new AccountService();
            switch(action){
                case "getUserInfo":
                    Users user = service.getUserInfo((String)sess.getAttribute("username"));
                    StringBuilder jsonString = new StringBuilder("{"
                            + "\"username\":\""+user.getUsername()+"\","
                            + "\"accessLevel\":\""+sess.getAttribute("accessLevel")+"\","
                            + "\"email\":\""+user.getEmail()+"\","
                            + "\"firstName\":\""+user.getFirstName()+"\","
                            + "\"lastName\":\""+user.getLastName()+"\","
                            + "\"activated\":\""+user.getActive()+"\","
                            + "\"base64Image\":\""+user.getBase64Image()+"\","
                            + "\"basements\":[");
                    for(Basements b: user.getBasementsList()) {
                        jsonString.append("{\"placeId\":\""+b.getPlaceId()+"\",\"description\":\""+b.getDescription()+"\",\"city\":\""+b.getCity()+"\",\"state\":\""+b.getState()+"\",\"country\":\""+b.getCountry()+"\",\"price\":\""+b.getPrice()+"\",\"sharing\":\""+b.getIsSharing()+"\"},");
            }
                    if(user.getBasementsList().size() > 0)
                        jsonString.deleteCharAt(jsonString.length()-1);
                    jsonString.append("]}");
                    response.getWriter().println(jsonString.toString());
                  
                    break;
                case "getSingleImageByPlaceId":
                    Basementimages basement = service.getSingleImageByPlaceId(request.getParameter("placeId"));
                    if(basement == null){
                        response.setContentType("application/json");
                        response.getWriter().println("{\"searchResult\":false}");
                    } else{
                        response.setContentType("application/json");
                        String base64Image = Base64.getEncoder().encodeToString(basement.getImage());
                        response.getWriter().println("{\"searchResult\":true,\"code\":\"data:"+basement.getImageType()+";base64,"+StringEscapeUtils.escapeJava(base64Image)+"\"}");
                    }
                    break;
                case "getImagesByPlaceId":
                    List<Basementimages> bi = service.getImagesByPlaceId(request.getParameter("placeId"));
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
                    Users userByPlaceId = service.getUserByPlaceId(request.getParameter("placeId"));
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


            }

            return;
        }
        this.getServletContext().getRequestDispatcher(url).forward(request, response);
        }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String action = request.getParameter("action");
        JSONObject json = null;
        if(action == null){
            // Converting JSON request body to JSON    --START--
            BufferedReader br = request.getReader();
            String jsonString;
            jsonString = br.readLine();
            br.close();
            //                                          --END--

            json = new JSONObject(jsonString);
            action = json.get("action");
        }

        if(action != null && !action.equals("")){
        AccountService service = new AccountService();
        response.setContentType("application/json");
        HttpSession sess = request.getSession();

        switch(action){
            case "dlBs":
                    String status = service.deleteBasementByPlaceId(json.get("placeId"), (String)sess.getAttribute("username"));
                    if(status.toLowerCase().startsWith("error")){
                        response.setContentType("application/json");
                        response.getWriter().println("{\"deletionSuccessfull\":false,\"errMsg\":\""+status.substring(6)+"\"}");
                    }else{
                        response.setContentType("application/json");
                        response.getWriter().println("{\"deletionSuccessfull\":true}");
                    }

                    break;
            case "addBasement":
                String basementStatus = service.addBasement((String) sess.getAttribute("username"),json.get("placeId"),json.get("latitude"), json.get("longitude"), json.get("price"),json.get("isSharing"), json.get("description"),json.get("country"), json.get("state"), json.get("city"));
                if(basementStatus.toLowerCase().startsWith("error")){
                    response.setContentType("application/json");
                    response.getWriter().println("{\"basementAdditionSuccessfull\":false,\"errMsg\":\""+basementStatus.substring(6)+"\"}");
                }else{
                    response.setContentType("application/json");
                    response.getWriter().println("{\"basementAdditionSuccessfull\":true}");
                }
                break;

            case "uploadBasementImages":
                String placeId = request.getParameter("placeId");
               
                boolean isMultipartData = ServletFileUpload.isMultipartContent(request);
                ServletFileUpload upload = new ServletFileUpload();

                FileItemIterator iter;
                try {
                    iter = upload.getItemIterator(request);
                    
                    while(iter.hasNext()){
                    FileItemStream fis = iter.next();
                    String name = fis.getFieldName();
                    InputStream is = fis.openStream();
                    
                    if(!fis.isFormField()){
                        String fileType = fis.getContentType();
                        if(Pattern.matches("[iI][mM][aA][gG][eE]/\\w*", fileType)){
                            // Scales image from InputStream, Converts to byte[] and encodes it
                            Image m = ImageIO.read(is);
                            m = m.getScaledInstance(250, 200, Image.SCALE_SMOOTH);
                            ByteArrayOutputStream bos = new ByteArrayOutputStream();
                            ImageIO.write(service.toBufferedImage(m), fileType.substring(6), bos);
                            System.out.println(name);
                            String uploadStatus = service.uploadBasementImages(placeId, bos.toByteArray(),fileType);
                            if(uploadStatus.toLowerCase().startsWith("error")){
                                response.setContentType("application/json");
                                response.getWriter().println("{\"imageUpdationSuccessfull\":false,\"errMsg\":\""+uploadStatus.substring(6)+"\"}");
                            } 
                        } else{
                                response.setContentType("application/json");
                                response.getWriter().println("{\"imageUpdationSuccessfull\":false,\"errMsg\":\"Only images allowed\"}");                        }
                    }
                    
                    }
                     response.setContentType("application/json");
                     response.getWriter().println("{\"imageUpdationSuccessfull\":true}");
                } catch (FileUploadException ex) {
                    Logger.getLogger(DashboardServlet.class.getName()).log(Level.SEVERE, null, ex);
                }

        }
    }




}
}
