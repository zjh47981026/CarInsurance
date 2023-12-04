<!DOCTYPE html>
<html lang="en">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<head>
    <title>Quote</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://js.stripe.com/v3/"></script>
    <link rel="stylesheet" type="text/css" href="../css/quote.css">
    <script src="../js/quote.js"></script>
</head>
<body>
<div class="container mt-5 d-flex flex-column justify-content-center vh-100" id="content">
    <div class="multi-step-form">
        <!-- Step 1 -->
        <div class="form-step active" id="step1">
            <h4>Tell us about your vehicle(s)...</h4>
            <label>Make: </label>
            <select class="select" id="make">
                <option>Any Make</option>
                <option>Acura</option>
                <option>Audi</option>
                <option>BMW</option>
            </select>
            <br/><br/>
            <label for="model">Model:</label>
            <select class ="select" id="model">
                <option class="defaultModel"></option>
            </select>
            <br/><br/>
            <label for="year">Year:</label>
            <select class ="select" id="year">
                <option></option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
                <option>2020</option>
            </select>
            <br/><br/>
            <label for="mileage">Mileage:</label>
            <input type="number" id="mileage"/>
            <br/><br/>
            <label for="vin">VIN:</label>
            <input type="text" id="vin"/>
            <br/><br/>
            <button class="btn btn-primary next-step mt-3">Next</button>
        </div>

        <!-- Step 2 -->
        <div class="form-step" id="step2">
            <h4>Driver information: </h4>
            <div class="row driver" id="driver1">
                <label><b>Driver 1:</b></label>
                <br/>
                <label>Name: </label>
                <input type="text" class="name"/>
                <br/><br/>
                <label>License Number:</label>
                <input type="text" class="licenseNum"/>
                <br/><br/>
                <label>Age: </label>
                <input type="number" class="age"/>
                <br/><br/>
                <label>Address: </label>
                <input type="text" class="address"/>
                <br/><br/>
                <label>Number of Accidents: </label>
                <input type="number" class="accidents"/>
                <br/><br/>
                <button clss="btn btn-secondary" id="addDriver"><i class="fa fa-plus" aria-hidden="true"></i>Add another driver</button>
                <br/><br/>
            </div>
            <div class="row driver" id="driver2">
                <label><b>Driver 2:</b></label>
                <br/>
                <label>Name: </label>
                <input type="text" class="name"/>
                <br/><br/>
                <label>License Number:</label>
                <input type="text" class="licenseNum"/>
                <br/><br/>
                <label>Age: </label>
                <input type="number" class="age"/>
                <br/><br/>
                <label>Address: </label>
                <input type="text" class="address"/>
                <br/><br/>
                <label>Number of Accidents: </label>
                <input type="number" class="accidents"/>
                <br/>
                <button class="btn btn-secondary" id="cancelDriverBtn">Cancel</button>
                <br/><br/>
            </div>
            <div class = "row">
                <button class="btn btn-secondary prev-step mt-3">Previous</button>
                <button class="btn btn-primary next-step mt-3">Next</button>
            </div>
        </div>

        <!-- Step 3 -->
        <div class="form-step" id="step3">
            <h4>Choose your plans: </h4>
            <label>Liability: </label>
            <select class="select" id="liabilitySelect">
                <option>$15k/$30k/$5k</option>
                <option>$15k/$30k/$10k</option>
                <option>$15k/$30k/$15k</option>
                <option>$15k/$30k/$25k</option>
            </select>
            <label>Cost: </label>
            <span id="liabilityCost">$300</span>
            <br/><br/>
            <label>Uninsured/underinsured motorist: </label>
            <select class="select" id="uninsuredSelect">
                <option>No Coverage</option>
                <option>$15k/$30k</option>
            </select>
            <label>Cost: </label>
            <span id="uninsuredCost">$0</span>
            <br/><br/>
            <label>Medical payments: </label>
            <select class="select" id="medicalSelect">
                <option>$5,000 first party benefits</option>
                <option>$10,000 first party benefits</option>
                <option>$25,000 first party benefits</option>
                <option>$50,000 first party benefits</option>
                <option>$100,000 first party benefits</option>
            </select>
            <label>Cost: </label>
            <span id="medicalCost">$30</span>
            <br/><br/>
            <label>Comphrehensive: </label>
            <select class="select" id="comprehensiveSelect">
                <option>No Coverage</option>
                <option>$100 deductible</option>
                <option>$250 deductible</option>
                <option>$500 deductible</option>
                <option>$750 deductible</option>
                <option>$1,000 deductible</option>
                <option>$1,500 deductible</option>
            </select>
            <label>Cost: </label>
            <span id="comprehensiveCost">$0</span>
            <br/><br/>

            <label>Collision: </label>
            <select class="select" id="collisionSelect">
                <option>No Coverage</option>
                <option>$100 deductible</option>
                <option>$250 deductible</option>
                <option>$500 deductible</option>
                <option>$1,000 deductible</option>
                <option>$1,500 deductible</option>
                <option>$2,000 deductible</option>
            </select>
            <label>Cost: </label>
            <span id="collisionCost">$0</span>
            <br/><br/>
            <label>Documents: </label>
            <input type="file" id="file" name="documents[]" accept=".jpg, .png, .pdf" multiple/>
            <br/><br/>
            <label><b>Total Premium: </b></label>
            <span id="totalPremium">$330</span>
            <br/><br/>
            <button class="btn btn-secondary prev-step mt-3">Previous</button>
            <button class="btn btn-primary" id="quoteSubmit">Make payment</button>
        </div>
    </div>
</div>

<div class="modal fade" id="paymentModal" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Payment</h4>
            </div>
            <div class="modal-body" id="paymentModalBody">
                <div class="row">
                    <form id="payment-form">
                        <div id="card-element">
                            <!-- Elements will create input elements here -->
                        </div>
                        <input type="text" name="name" id="customerName" placeholder="Cardholder Name" required />
                        <input type="email" name="email" id="customerEmail" placeholder="Email Address" required />
                        <input type="tel" name="phone" id="customerPhone" placeholder="Phone Number" required />
                        <input type="text" name="address_line1"  id="address_line1" placeholder="Address Line 1" required />
                        <input type="text" name="address_line2" id="address_line2" placeholder="Address Line 2" />
                        <input type="text" name="address_city" id="address_city" placeholder="City" required />
                        <input type="text" name="address_state" id="address_state" placeholder="State" required />
                        <input type="text" name="address_zip" id = "address_zip" placeholder="Postal Code" required />
                        <input type="text" name="address_country" id="address_country" placeholder="Country" required />
                        <br/>
                        <label>Amount: </label>
                        <span id="paymentAmount"></span>
                        <!-- We'll put the error messages in this element -->
                        <div id="card-errors" role="alert"></div>

                        <button id="submit-button" class="btn btn-primary">Submit Payment</button>
                    </form>
                    <div id="payment-result" class="alert" style="display:none;"></div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>

    </div>
</div>
</body>
</html>