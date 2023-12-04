<!DOCTYPE html>
<html lang="en">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<head>
    <title>Wolverine</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://js.stripe.com/v3/"></script>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"
            integrity="sha256-2Pmvv0kuTBOenSvLm6bvfBSSHrUJ+3A7x6P5Ebd07/g=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/home.css">
</head>
<body>
<nav class="navbar navbar-default">
    <div class="container-fluid" id="navContainer">
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav" id="navLinks">
                <li><a href="#" id="homeLink">Home</a></li>
                <li><a href="coverage" id="headerCoverage">Coverages</a></li>
                <li><a href="quote" id="navQuote">Get a quote</a></li>
                <li><a href="claim" id="claimLink">Claims</a></li>
                <li><a href="contact">Contact</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right" id="homeLoginBtn">
                <li><a href="/login"><span class="glyphicon glyphicon-user"></span> Log In</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="jumbotron text-center">
    <h1>Wolverine Auto Insurance</h1>
    <p>Insure Today, Secure Tomorrow</p>

    <form>
        <div class="input-group">
            <input type="text" class="form-control" size="10" placeholder="Search" required>
            <div class="input-group-btn">
                <button type="button" class="btn btn-danger">Search</button>
            </div>
        </div>
    </form>
</div>
<div class ="container"  id="homeContainer">
<img src="https://magnuminsurance.com/wp-content/uploads/2021/11/banner-auto-insurance.jpg" alt="Family with Car" class="img-responsive" style="width:100%; margin-top:20px;">
</div>
<script src="../js/home.js"></script>
</body>
</html>