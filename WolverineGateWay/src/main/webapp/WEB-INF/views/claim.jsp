<!DOCTYPE html>
<html lang="en">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<head>
    <title>Claim</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/claim.css">
    <script src="../js/claim.js"></script>
</head>
<body>
<div class="container" id="content">
    <div class = "row">
        <div class="col-md-12 text-center">
            <h2>Report a new claim or view the status of an existing claim</h2>
        </div>
    </div>
    <div class ="row">
        <div class="col-md-12 text-center" id="claimBtnContainer">
            <h4><b>Login to report or view status of a claim</b></h4>
            <input class="claimBtn" type="button" id="claimLoginBtn" value="Log In"/>
        </div>
    </div>
    <hr/>
    <div class="row">
        <div class="col-md-12">
            <h4><b>Claims process for car accidents or vehicle damage</b></h4>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h4>01 / <b>Submit your claim</b></h4>
            <p>You can easily file a claim by logging in to your policy online, through the mobile app, or by calling our
                claims center.  We just need
                some basic info from you to get started.
                We connect you with the right experts at the right time to make sure everything goes smoothly. You can
                contact a claims rep if you have questions, and you’ll likely work with an estimator who will inspect your
                car and write an estimate describing the cost of repairs.
            </p>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-md-12">
            <h4>02 / <b>Inspection and repair options</b></h4>
            <p>
                A rep asks if you want to get your repairs completed or receive payment. The choice is yours! If you’re
                not sure, you can get an estimate first to see how much repairs cost or what your payment is for the
                repairs. If you finance or lease your car, your lender may require you to get the repairs.

                If you're getting repairs, you can choose one of our convenient network shop locations. Or your rep can
                schedule time for an estimator to inspect your vehicle (if they haven't done so already) at your shop
                of choice, or at our drive-in location (where available).
            </p>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-md-12">
            <h4>03 / <b>Schedule your repairs</b></h4>
            <p>
                Your rep schedules repairs through a network repair shop or any other shop you’d like. We help you
                through the process to make sure all repairs are being handled properly.
            </p>
        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col-md-12">
            <h4>04 / <b>Your car is repaired</b></h4>
            <p>
                No matter which shop you choose, we manage the repairs from start to finish. Then, when everything is
                complete, just pick up your newly repaired car and go. If you used a shop in our approved network, your
                repairs are guaranteed for as long as you own or lease your vehicle.
            </p>
        </div>
    </div>
</div>

<div class="modal fade" id="claimModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Report a claim</h4>
            </div>
            <div class="modal-body">
                <div class="form-container">
                <form>
                    <div class="form-group row">
                        <label for="policyIdSelect" class="col-sm-4 col-form-label">Policy ID:</label>
                        <div class="col-sm-8">
                            <select id="policyIdSelect" class="form-control">

                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="dateInput" class="col-sm-4 col-form-label">Date of Accident:</label>
                        <div class="col-sm-8">
                            <input type="date" id="dateInput" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="descriptionText" class="col-sm-4 col-form-label">Description:</label>
                        <div class="col-sm-8">
                            <textarea id="descriptionText" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="estimatedClaimAmountInput" class="col-sm-4 col-form-label">Estimated Claim Amount:</label>
                        <div class="col-sm-8">
                            <input type="number" id="estimatedClaimAmountInput" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="claimFilesInput" class="col-sm-4 col-form-label">Documents:</label>
                        <div class="col-sm-8">
                            <input type="file" id="claimFilesInput" name="documents[]" accept=".jpg, .png, .pdf" multiple class="form-control-file"/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <button class="btn btn-primary" id="claimSubmitBtn">Submit</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>


</body>
</html>