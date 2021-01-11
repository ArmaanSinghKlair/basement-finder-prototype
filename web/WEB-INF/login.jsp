<%-- 
    Document   : login
    Created on : Jan 1, 2021, 1:09:47 AM
    Author     : 839645
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <link rel="stylesheet" type="text/css" href="css/base.css" />
        <link rel="stylesheet" href="css/layout.css" type="text/css"/>
        <link rel="stylesheet" href="css/module.css" type="text/css"/>
        <link rel="stylesheet" href="css/theme.css" type="text/css"/>
        <link rel="stylesheet" href="css/state.css" type="text/css"/>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body>
        <div id="container"></div>
        <script defer src="https://unpkg.com/axios/dist/axios.min.js"></script>
         <!-- Load React. -->
         <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
         <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

        <script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
        <!-- Load our React component. -->
        <script  src="scripts/Login.js" type="module"></script>
    </body>
</html>
