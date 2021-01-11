/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import services.AccountService;
import util.JSONObject;

/**
 *
 * @author 839645
 */
public class LoginServlet extends HttpServlet {

    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String url="/WEB-INF/login.jsp";
        
        
        String action = request.getParameter("action");
        if(action != null && !action.trim().equals("")){
        switch(action){
            case "logout":
                HttpSession sess = request.getSession();
                sess.invalidate();
                break;
            
        }
        
        }


        this.getServletContext().getRequestDispatcher(url).forward(request, response);
    }

    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Converting JSON request body to JSON    --START--
        BufferedReader br = request.getReader();
        String jsonString;
        jsonString = br.readLine();
        br.close();
       
        //                                          --END--
        JSONObject json = new JSONObject(jsonString);
        String action = json.get("action");

        if(action != null && !action.equals("")){
        AccountService service = new AccountService();
        response.setContentType("application/json");
        HttpSession sess = request.getSession();
        switch(action){
            case "login":
                String loginResult = service.authenticate(json.get("username"), json.get("password"));
                if(loginResult.toLowerCase().startsWith("error")){
                    response.getOutputStream().println("{\"error\":\""+loginResult.substring(6)+"\",\"loginSuccessfull\":false}");
                } else{
                    sess.setAttribute("loggedIn", true);
                    sess.setAttribute("accessLevel", loginResult);
                    sess.setAttribute("username",json.get("username"));
                    response.getOutputStream().println("{\"loginSuccessfull\":true,\"accessLevel\":\""+loginResult+"\"}");
                }
        }
        }
    }

}
