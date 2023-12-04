$(document).ready(function() {
    let stripe = Stripe('pk_test_51O4lt0D9YfGMmANJR7IaY8Wa30yDg0KekkrT9dQ6NKOQ5SySfOvHMTNjeqd3VYTTr7jAP2mwlPN5zhMa0p2d1IN500xkL4VceX',{
        locale: 'en'  // Set locale to English
    });
    let elements = stripe.elements();
    let card = elements.create('card');

    let userid = localStorage.getItem('username');
    let authToken = localStorage.getItem('authToken');

    $('.next-step').click(function() {
        var currentStep = $(this).closest('.form-step');
        currentStep.removeClass('active');
        currentStep.next('.form-step').addClass('active');
    });

    $('.prev-step').click(function() {
        var currentStep = $(this).closest('.form-step');
        currentStep.removeClass('active');
        currentStep.prev('.form-step').addClass('active');
    });

    $("#addDriver").click(function() {
        numDriver = 2;
        $(this).prop("disabled", true);
        $(this).css({"background-color" : "grey"});
        $("#driver2").css({"display" : "block"});
    })

    $("#cancelDriverBtn").click(function() {
        numDriver = 1;
        $("#addDriver").prop("disabled", false);
        $("#addDriver").css({"background-color" : "white"});
        $("#driver2").css({"display" : "none"});
    })


    $("#make").change(function() {
        $("#model").find("option").not('.defaultModel').remove();
        let value = $(this).val();
        if (value ==="Acura") {
            $("#model").append("<option>Integra</option><option>MDX</option><option>" +
                "RDX</option><option>TLX</option>")
        } else if (value ==="Audi") {
            $("#model").append("<option>A3</option><option>A4</option><option>A5</option>" +
                "<option>A6</option><option>A7</option><option>Q3</option><option>Q5</option>" +
                "<option>Q7</option><option>Q8</option>")
        } else if (value==="BMW") {
            $("#model").append("<option>330i</option><option>M340i</option><option>238i</option>" +
                "<option>330i xDrive</option><option>428i</option><option>430i</option>" +
                "<option>430i xDrive</option><option>530i</option>");
        }
    })


    $("#step3 select").change(function() {
        let id = $(this).attr('id');
        let val = $(this).val();
        if (id === "liabilitySelect") {
            if (val === "$15k/$30k/$5k") {
                $("#liabilityCost").text("$300");
            } else if (val === "$15k/$30k/$10k") {
                $("#liabilityCost").text("$315");
            } else if (val === "$15k/$30k/$15k") {
                $("#liabilityCost").text("$330");
            } else if (val === "$15k/$30k/$25k") {
                $("#liabilityCost").text("$335");
            }
        } else if (id === "uninsuredSelect") {
            $("#uninsuredCost").text("$5");
        } else if (id === "medicalSelect") {
            if (val === "$5,000 first party benefits") {
                $("#medicalCost").text("$30");
            } else if (val === "$10,000 first party benefits") {
                $("#medicalCost").text("$32");
            } else if (val === "$25,000 first party benefits") {
                $("#medicalCost").text("$50");
            } else if (val === "$50,000 first party benefits") {
                $("#medicalCost").text("$60");
            } else if (val === "$100,000 first party benefits") {
                $("#medicalCost").text("$70");
            }
        } else if (id === "comprehensiveSelect") {
            if (val === "No Coverage") {
                $("#comprehensiveCost").text("$0");
            } else if (val === "$100 deductible") {
                $("#comprehensiveCost").text("$250");
            } else if (val === "$250 deductible") {
                $("#comprehensiveCost").text("$200");
            } else if (val === "$500 deductible") {
                $("#comprehensiveCost").text("$150");
            } else if (val === "$750 deductible") {
                $("#comprehensiveCost").text("$145");
            } else if (val === "$1,000 deductible") {
                $("#comprehensiveCost").text("$125");
            } else if (val === "$1,500 deductible") {
                $("#comprehensiveCost").text("$115");
            }
        } else if (id === "collisionSelect") {
            if (val === "No Coverage") {
                $("#collisionCost").text("$0");
            } else if (val === "$100 deductible") {
                $("#collisionCost").text("$800");
            } else if (val === "$250 deductible") {
                $("#collisionCost").text("$600");
            } else if (val === "$500 deductible") {
                $("#collisionCost").text("$550");
            } else if (val === "$1,000 deductible") {
                $("#collisionCost").text("$470");
            } else if (val === "$1,500 deductible") {
                $("#collisionCost").text("$400");
            } else if (val === "$2,000 deductible") {
                $("#collisionCost").text("$380");
            }
        }
        let total = 0;
        $.each($("#step3 span").not("#totalPremium"), function(key, value) {
            let curCost = parseInt($(this).text().substring(1));
            console.log("current cost: " + curCost)
            total += curCost;
        });
        $("#totalPremium").text("$" + total);
    })


    $("#quoteSubmit").click(function() {
        let amount = parseFloat($("#totalPremium").text().substring(1))
        $("#paymentAmount").text('$ ' + amount.toFixed(2));
        $("#paymentModal").modal("toggle");
        card.mount('#card-element');
        card.on('change', function(event) {
            let displayError = $('#card-errors');
            if (event.error) {
                displayError.text(event.error.message);
            } else {
                displayError.text('');
            }
        });
    });


    $("#submit-button").click(function() {
        $(this).prop('disabled', true);
        stripe.createPaymentMethod({
            type: 'card',
            card: card,
            billing_details: {
                name: $("#customerName").val(),
                email : $("#customerEmail").val(),
                phone : $("#customerPhone").val(),
                address: {
                    line1 : $("#address_line1").val(),
                    line2 : $("#address_line2").val(),
                    city : $("#address_city").val(),
                    state : $("#address_city").val(),
                    postal_code : $("#address_zip").val(),
                    country : $("#address_country").val()
                }
            },
        }).then(function (result) {
            if (result.error) {
                $('#card-errors').text(result.error.message);
                $("#submit-button").prop('disabled', false);
            } else {
                stripePaymentMethodHandler(result.paymentMethod.id);
            }
        });

        function stripePaymentMethodHandler(paymentMethodId) {
            let amount = parseFloat($("#totalPremium").text().substring(1));
            let description = "Payment for policy!";
            let email = localStorage.getItem("email");
            let customerName = $("#customerName").val();
            let phone = $("#customerPhone").val();

            $.ajax({
                url: 'http://localhost:8282/payment',
                method: 'POST',
                data: {
                    paymentMethodId: paymentMethodId,
                    amount: amount,
                    name: customerName,
                    email: email,
                    phone: phone,
                    description: description
                },
                success: function (response) {
                    console.log('Payment successful', response);
                    $('#payment-result')
                        .removeClass('alert-danger')
                        .addClass('alert-success')
                        .text('Payment successful!')
                        .show();

                    savePolicyFunc();
                },
                error: function (xhr, status, error) {
                    console.error('Payment failed', error);
                    $('#payment-result')
                        .removeClass('alert-success')
                        .addClass('alert-danger')
                        .text('Payment failed. Please try again.')
                        .show();

                    $('#card-errors').text('');
                }
            });
        }


        function savePolicyFunc() {
            numDriver = 1;
            console.log("minimumPremium=======================");
            let minimumPremium = parseFloat($("#totalPremium").text().substring(1));
            console.log($("#totalPremium").text());
            console.log("========================================")
            let maximumCoverage = 100000.0;
            let vehicleMake = $("#make").val();
            let vehicleModel = $("#model").val();
            let vehicleYear = $("#year").val();
            let vehicleMileage = $("#mileage").val();
            let vehicleVIN = $("#vin").val();
            let vehicle = {"userId" : userid, "make" : vehicleMake, "model" : vehicleModel,
                "year" : vehicleYear, "mileage" : vehicleMileage, "vin" : vehicleVIN};
            console.log("vehicle:============");
            console.log(vehicle);
            console.log("====================");
            let driverName1;
            let driverLicense1;
            let driverAge1;
            let driverAddress1;
            let driverAccidents1;
            $.each($("#driver1 input"), function(key, value) {
                if ($(value).hasClass("name")) {
                    driverName1 = $(this).val();
                } else if ($(value).hasClass("licenseNum")) {
                    driverLicense1 = $(this).val();
                } else if ($(value).hasClass("age")) {
                    driverAge1 = $(this).val();
                } else if($(value).hasClass("address")) {
                    driverAddress1 = $(this).val();
                } else if ($(value).hasClass("accidents")) {
                    driverAccidents1 = $(this).val();
                }
            })

            let driver1 = {"name" : driverName1, "driverLicenseNum" : driverLicense1,
                "age" : driverAge1, "address" : driverAddress1, "numOfAccidents" : driverAccidents1};
            let driverName2;
            let driverLicense2;
            let driverAge2;
            let driverAddress2;
            let driverAccidents2;
            let driver2 = null;
            if (numDriver === 2) {
                $.each($("#driver2 input"), function(key, value) {
                    if ($(value).hasClass("name")) {
                        driverName2 = $(this).val();
                    } else if ($(value).hasClass("licenseNum")) {
                        driverLicense2 = $(this).val();
                    } else if ($(value).hasClass("age")) {
                        driverAge2 = $(this).val();
                    } else if($(value).hasClass("address")) {
                        driverAddress2 = $(this).val();
                    } else if ($(value).hasClass("accidents")) {
                        driverAccidents2 = $(this).val();
                    }
                });
            }

            let drivers = [];
            drivers.push(driver1);
            if (driver2 != null) {
                drivers.push(driver2);
            }

            let liabilityName = $("#liabilitySelect").val();
            let uninsuredName = $("#uninsuredSelect").val();
            let medicalName = $("#medicalSelect").val();
            let comprehensiveName = $("#comprehensiveSelect").val();
            let collisionName = $("#collisionSelect").val();
            let plans = [{"category" : "liability", "name" : liabilityName}, {"category" : "uninsured/underinsured motorist", "name" : uninsuredName},
                {"category" : "medical payments", "name" : medicalName}, {"category" : "comprehensive", "name" : comprehensiveName},
                {"category" : "collision", "name" : collisionName}];
            formData = new FormData();
            let files = $("#file")[0].files;
            if (files.length === 0) {
                formData.append("files", "");
            } else {
                for (let i = 0; i < files.length; i++) {
                    formData.append("files", files[i]);
                }
            }


            $.ajax({
                type : "POST",
                url : "http://localhost:8282/upload/" + userid,
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
                data : formData,
                cache: false,
                contentType: false,
                processData: false,
                success : function(result) {
                    let filekeys = result;
                    let documents = [];
                    $.each(filekeys, function(key, value){
                        let url = "https://test-4798.s3.us-east-1.amazonaws.com/" + value;
                        let document = {"userId" : userid, "url" :url, "name" : value};
                        documents.push(document);
                    })
                    $.ajax({
                        type : "POST",
                        contentType : "application/json",
                        url : "http://localhost:8282/getPlans",
                        headers: {
                            'Authorization': 'Bearer ' + authToken
                        },
                        data : JSON.stringify(plans),
                        dataType : "json",
                        success : function(result) {
                            let plansToPolicy = result;
                            let currentDate = new Date();
                            let formattedStartDate = `${currentDate.getFullYear()}-${String(currentDate.
                            getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

                            currentDate.setMonth(currentDate.getMonth() + 6);
                            let formattedEndDate = `${currentDate.getFullYear()}-${String(currentDate.
                            getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

                            let policy = {"userId" : userid, "userEmail" : localStorage.getItem('email'), "drivers" : drivers, "documents" : documents, "vehicle" : vehicle,"startDate" : formattedStartDate,
                                "endDate" : formattedEndDate, "maximumCoverage" : maximumCoverage, "minimumPremium" : minimumPremium, "plans" : plansToPolicy};
                            console.log("policy to be stored========")
                            console.log(policy);
                            console.log("====================")
                            $.ajax({
                                type : "POST",
                                contentType : "application/json",
                                url : "http://localhost:8282/savePolicy",
                                headers: {
                                    'Authorization': 'Bearer ' + authToken
                                },
                                data : JSON.stringify(policy),
                                dataType : "json",
                                success : function(result) {
                                    console.log(result);
                                },
                                error  : function (e) {

                                }
                            });

                        },
                        error  : function (e) {

                        }
                    });

                },
                error  : function (e) {

                }
            });

        }

    })


});