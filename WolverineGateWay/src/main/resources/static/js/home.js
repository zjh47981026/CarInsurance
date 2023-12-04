
$(document).ready(function() {
    let authToken = localStorage.getItem('authToken');
    let userid = localStorage.getItem('username');
    let email = localStorage.getItem('email');

    let numDriver = 1;
    let formData = new FormData();
    if (authToken) {
        // User is authenticated
        $("#homeLoginBtn").html(`
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span class="caret"></span></a>
                <ul class="dropdown-menu">
                    <li>ID: ${userid}</li>
                    <li class="divider"></li>
                    <li><a href="# id="updateLink">Update Information</a></li>
                    <li><a href="#" id="policyLink">Policies</a></li>
                    <li><a href="#" id="claimReviewLink">Claims</a></li>
                    <li><a href="#" id="logoutBtn">Log Out</a></li>
                </ul>
            </li>
        `);

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getAuthorities/' + userid,
            success: function (result) {
                let authorities = [];
                $.each(result, function(key, value) {
                    authorities.push(value.authority);
                });
                localStorage.setItem("authorities", JSON.stringify(authorities));
            },
            error: function (err) {

            }
        });


    } else {
        // User is not authenticated
        $("#homeLoginBtn").html('<li><a href="/login"><span class="glyphicon glyphicon-user"></span> Log In</a></li>');
    }


    $("#navLinks a").not("#homeLink, #navQuote, #claimLink").click(function (evt){
        evt.preventDefault();
        let url = $(this).attr("href");
        $("#homeContainer").load(url);
    });

    $("#homeLink").click(function(evt) {
        evt.preventDefault();
        location.reload(true);
    });

    $("#navQuote").click(function(evt) {
        evt.preventDefault();

        if (!localStorage.getItem('authToken')) {
            alert("Please log in to access this page!");
            window.location.href="/login";
            return;
        } else {
            $("#homeContainer").load("quote");
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: 'http://localhost:8282/user/' + userid,
                success: function (result) {
                    localStorage.setItem("email", result);
                },
                error: function (err) {

                }
            });
        }
    })


    $("#claimLink").click(function(evt) {
        evt.preventDefault();
        $("#homeContainer").load("claim", function() {
            if (localStorage.getItem('authToken')) {
                $("#claimBtnContainer *").remove();
                $("#claimBtnContainer").append(`
                <input class="claimBtn" type="button" id="claimReportBtn" value="Report a claim"/>
            `);
            }
        });
    });


    /*
    $("#claimReportBtn").click(function() {
        $("#policyIdSelect *").remove();
        $("#claimModal").modal("toggle");
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getPolicies/' + userid,
            success: function (result) {
                $.each(result, function(key, value) {
                    $("#policyIdSelect").append(`<option>${value.policyId}</option>`);
                })
            },
            error: function (err) {

            }
        });

    });

    $("#claimSubmitBtn").click(function(evt) {
        evt.preventDefault();
        let policyId = parseInt($("#policyIdSelect").val());
        let dateOfAccident = $("#dateInput").val();
        let description = $("descriptionText").val();
        let estimatedClaimAmount = parseFloat($("#estimatedClaimAmountInput").val());
        formData = new FormData();
        let files = $("#claimFilesInput")[0].files;
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
                });

                let claim = {"policyId" : policyId, "userId" : userid, "dateOfIncident" : dateOfAccident, "description" : description,
                "estimatedClaimAmount" : estimatedClaimAmount, "claimStatus" : "UNDER_REVIEW", "documents" : documents};

                ///////
                $.ajax({
                    type : "POST",
                    contentType : "application/json",
                    url : "http://localhost:8282/saveClaim",
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data : JSON.stringify(claim),
                    dataType : "json",
                    success : function(result) {
                        //$("#claimModal").modal("toggle");
                        alert("Claim submitted!!");
                        console.log(result);
                    },
                    error  : function (e) {

                    }
                });

                //////
            },
            error  : function (e) {

            }
        });

    })

     */

    $("#claimReviewLink").click(function() {
        $("#homeContainer").load('claimReview');
        /*
        let authorities = JSON.parse(localStorage.getItem("authorities"));
        let existAdmin = authorities.some((authority) => authority === "ROLE_ADMIN");

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getClaims/' + userid,
            success: function (result) {
                $.each(result, function(key, value) {
                    if (existAdmin) {
                        $("#claim-show-table").append(`
                           <tr>
                           <td>${value.claimId}</td>
                           <td>${value.policyId}</td>
                           <td>${value.dateOfIncident}</td>
                           <td>${value.estimatedClaimAmount}</td>
                           <td>${value.approvedClaimAmount}</td>
                           <td>${value.finalClaimAmount}</td>
                           <td>${value.claimStatus}</td>
                           <td><input type="button" class="claimDescriptionBtn" data-claim-id="${value.claimId}" value="View Description"/></td>
                           <td><input type="button" class="claimDocumentsBtn" data-claim-id="${value.claimId}" value="View Documents"/></td>
                           <td><input type="button" class="claimUpdateBtn"  data-claim-id="${value.claimId}" value="Update"/></td>
                           </tr>
                        `)
                    } else {
                        $("#claim-show-table").append(`
                           <tr>
                           <td>${value.claimId}</td>
                           <td>${value.policyId}</td>
                           <td>${value.dateOfIncident}</td>
                           <td>${value.estimatedClaimAmount}</td>
                           <td>${value.approvedClaimAmount}</td>
                           <td>${value.finalClaimAmount}</td>
                           <td>${value.claimStatus}</td>
                           <td><input type="button" class="claimDescriptionBtn" data-claim-id="${value.claimId}" value="View Description"/></td>
                           <td><input type="button" class="claimDocumentsBtn" data-claim-id="${value.claimId}" value="View Documents"/></td>
                           </tr>
                        `)
                    }
                })
            },
            error: function (err) {

            }
        });   */

    })

    /*
    $("#claim-review-table").on("click", ".claimDescriptionBtn", function() {
        $("#updateDescriptionBtn").val("Update Description");
        $("#claimReviewDescriptionText").val("");
        $("#claimDescriptionModal").modal('toggle');
        let claimId = $(this).data("claim-id");
        $("#updateDescriptionBtn").data('claim-id', claimId);
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getClaimById/' + claimId,
            success: function (result) {
                $("#claimReviewDescriptionText").prop("disabled", true);
                $("#claimReviewDescriptionText").val(result.description);
            },
            error: function (err) {

            }
        });

    })

    $("#claim-review-table").on("click", ".claimDocumentsBtn", function() {
        let claimId = $(this).data('claim-id');
        $("#claimReviewUploadDocumentBtn").data("claim-id", claimId);
        $("#claimViewDocumentsModal").modal("toggle");

        /////////get Documents//////////

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getClaimById/' + claimId,
            success: function (result) {
                let urls = [];
                $.each(result.documents, function(key, value) {
                    urls.push(value.url);
                });
                let imageExtensions = ['jpg', 'jpeg', 'png'];
                let pdfExtension = ['pdf'];
                $.each(urls, function(key, value) {
                    console.log("url==============");
                    console.log(value);
                    console.log("================")
                    let fileExtension = value.split(".").pop().toLowerCase();
                    if (imageExtensions.includes(fileExtension)){
                        $("#claimReviewDocumentContainer").append(`<img src="${value}" alt="${value}" width="100%" height="600px"><br/><br/>`);
                    } else if (pdfExtension.includes(fileExtension)){
                        $("#claimReviewDocumentContainer").append(`<embed src="${value}" width="100%" height="600px" type="application/pdf"><br/><br/>`);
                    } else {
                        $("#claimReviewDocumentContainer").append(`<h4>Unsupported file type</h4>`);
                    }
                });
            },
            error: function (err) {

            }
        });
    });


    $("#claim-review-table").on("click", ".claimUpdateBtn", function() {
        let claimId = $(this).data("claim-id");
        $("#claimUpdateConfirm").data("claim-id", claimId);
        $("#claimUpdateModal").modal("toggle");
    });

    $("#claimUpdateConfirm").click(function() {
        let claimId = $(this).data('claim-id');
        let status = $("#claimUpdateStatus").val();
        let approvedClaimAmount = $("#claimUpdateApprovedAmount").val();
        let finalClaimAmount = $("#claimUpdateFinalAmount").val();
        let claim = {"claimStatus" : status, "approvedClaimAmount" : approvedClaimAmount, "finalClaimAmount" : finalClaimAmount};

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8282/updateClaimByAdmin/" + claimId,
            headers: {
                'Authorization': 'Bearer ' + authToken
            },
            data : JSON.stringify(claim),
            dataType : "json",
            success : function(result) {
                console.log(result);
                alert("Claim updated!");
            },
            error  : function (e) {

            }
        });

    })

    ///////////////
    $("#claimReviewUploadDocumentBtn").click(function() {
        let claimId = $(this).data('claim-id');

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
                //////

                $.ajax({
                    type : "POST",
                    contentType : "application/json",
                    url : "http://localhost:8282/uploadClaimDocuments/" + claimId,
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data : JSON.stringify(documents),
                    dataType : "json",
                    success : function(result) {
                        console.log(result);
                        $("#claimViewDocumentsModal").modal("toggle");
                        alert("Files uploaded!!");
                    },
                    error  : function (e) {

                    }
                });
                //////////
            },
            error  : function (e) {

            }
        });

    })

    ///////////////
    $("#updateDescriptionBtn").click(function() {
        let val = $(this).val();
        if (val === "Update Description") {
            $("#claimReviewDescriptionText").prop("disabled", false);
            $(this).val("Submit");
        } else {
            let claimId = $(this).data("claim-id");
            let description = $("#claimReviewDescriptionText").val();
            let claim={"description" : description};
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : "http://localhost:8282/updateClaimDescription/" + claimId,
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
                data : JSON.stringify(claim),
                dataType : "json",
                success : function(result) {
                    //$("#claimModal").modal("toggle");
                    alert("Description Updated!");
                    console.log(result);
                },
                error  : function (e) {

                }
            });

        }

    })

    */

/*
    $("#claimLoginBtn").click(function() {
        window.location.href="/login";
    })  */

/*
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

*/
    $('.submit').click(function() {
        alert('Form submitted!');
    });
/*
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
*/
/*
    $("#loginBtn").click(function() {
        let username = $("#username").val();
        let password = $("#pwd").val();
        let role = $("#role").val()  === "ADMIN" ? "admin" : "user";
        let user = {"userName" : username, "password" : password};

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "http://localhost:8282/authenticate/" + role,
            data : JSON.stringify(user),
            dataType : "json",
            success : function(result) {
                if (result.token) {
                    localStorage.setItem('authToken', result.token);
                    localStorage.setItem('username', username);


                    window.location.href = '/home';
                } else {
                    console.error('Token not received');
                    alert("Failed to log In!!!");
                }
            },
            error  : function (e) {

            }
        });
    })

*/
    $("#logoutBtn").click(function(evt) {
        evt.preventDefault();
        userid = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        location.reload();
    });
    /*
    $("#quoteSubmit").click(function(evt) {
        evt.preventDefault();
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


    }); */


    $("#file, #fileUpdate, #claimFilesInput, #claimReviewDocumentsUploadInput").change(function() {
        formData = new FormData();
        let files = $(this)[0].files;
        if (files.length === 0) {
            formData.append("files", "");
        } else {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }
    })

    $("#policyLink").click(function() {
     /*   $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getPolicies/' + userid,
            success: function (result) {
                $.each(result, function (key, value) {
                    let plansTable = `
                  <table class="table">
                     <thead>
                       <tr>
                         <th>Category</th>
                         <th>Coverage</th>
                         <th>Cost</th>
                       </tr>
                     </thead>
                     <tbody>`;
                    $.each(value.plans, function (key1, value1) {
                        plansTable += `
                         <tr>
                            <td>${value1.category}</td>
                            <td>${value1.name}</td>
                            <td>${value1.totalPrice}</td>
                         </tr>`;
                    })
                    plansTable += `
                     </tbody>
                    </table>`;

                    const policyContent = `
                        <div class="row">
                            <h4><strong>Policy ID: ${value.policyId}</strong></h4>
                            <span>${value.startDate} --- ${value.endDate}</span>
                            <span>${value.vehicle.year} ${value.vehicle.make} ${value.vehicle.model}</span>
                            ${plansTable}
                            <h4><strong>Total Premium: $${value.minimumPremium}</strong></h4>
                            <h4>
                            <button class="documentBtn policy-btn" data-policy-id="${value.policyId}">View Documents</button>
                            <button class="updateDocumentBtn policy-btn" data-policy-id="${value.policyId}">Update Documents</button>
                            <button class="driversBtn policy-btn" data-policy-id="${value.policyId}">View Drivers</button>
                            </h4>
                        </div>`;

                    $("#policyContent").append(policyContent);

                })
            },
            error: function (err) {

            }
        });  */
        $("#homeContainer").load('policy');
    })

    //dynamically added content
    /*
    $("#policyContent").on("click", ".documentBtn", function() {
        $("#documentContainer").empty();
        $("#myModal").modal('toggle');
        const policyId = $(this).data("policy-id");
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getPolicyById/' + policyId,
            success: function (result) {
                let urls = [];
                $.each(result.documents, function(key, value) {
                    urls.push(value.url);
                });
                let imageExtensions = ['jpg', 'jpeg', 'png'];
                let pdfExtension = ['pdf'];
                $.each(urls, function(key, value) {
                    console.log("url==============");
                    console.log(value);
                    console.log("================")
                    let fileExtension = value.split(".").pop().toLowerCase();
                    if (imageExtensions.includes(fileExtension)){
                        $("#documentContainer").append(`<img src="${value}" alt="${value}" width="100%" height="600px"><br/><br/>`);
                    } else if (pdfExtension.includes(fileExtension)){
                        $("#documentContainer").append(`<embed src="${value}" width="100%" height="600px" type="application/pdf"><br/><br/>`);
                    } else {
                        $("#documentContainer").append(`<h4>Unsupported file type</h4>`);
                    }
                });
            },
            error: function (err) {

            }
        });

    }); */

/*
    $("#policyContent").on("click", ".driversBtn", function() {
        $("#driverModalBody").empty();
        const policyId = $(this).data("policy-id");
        $("#driverModal").modal("toggle");
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: 'http://localhost:8282/getPolicyById/' + policyId,
            success: function (result) {
                let counter = 1;
                $.each(result.drivers, function(key, value) {
                    $("#driverModalBody").append(
                        `<div class="row"> 
                            <b>Driver ${" " + counter}</b> <br/>
                            <b>Name: </b><span>${" "+value.name}</span> <br/>
                            <b>License Number: </b><span>${" "+value.driverLicenseNum}</span> <br/>
                            <b>Address: </b><span>${" "+value.address}</span> <br/>
                            <b>Age: </b><span>${" "+value.age}</span> <br/>
                            <b>Number Of Accidents: </b><span>${" "+value.numOfAccidents}</span>
                        </div>
                        `)
                    counter++;
                });

            },
            error: function (err) {

            }
        });
    })

    $("#policyContent").on("click", ".updateDocumentBtn", function() {
        const policyId = $(this).data('policy-id');
        $("#updateDocumentConfirmBtn").data("policy-id", policyId);
        $("#updateDocumentModal").modal("toggle");
    });
*/



    /*
    $("#fileUpdate").change(function() {
        formData = new FormData();
        let files = $("#fileUpdate")[0].files;
        if (files.length === 0) {
            formData.append("files", "");
        } else {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }
        }
    });  */
/*
    $("#updateDocumentConfirmBtn").click(function() {
        const policyId = $(this).data('policy-id');

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
                //////

                $.ajax({
                    type : "POST",
                    contentType : "application/json",
                    url : "http://localhost:8282/updatePolicyDocuments/" + policyId,
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data : JSON.stringify(documents),
                    dataType : "json",
                    success : function(result) {
                        console.log(result);
                        $("#updateDocumentModal").modal("toggle");
                        alert("Files updated!!!!");
                    },
                    error  : function (e) {

                    }
                });
                //////////
            },
            error  : function (e) {

            }
        });
    })  */

    //////////////////
    /*
    let stripe1 = Stripe('pk_test_51O4lt0D9YfGMmANJR7IaY8Wa30yDg0KekkrT9dQ6NKOQ5SySfOvHMTNjeqd3VYTTr7jAP2mwlPN5zhMa0p2d1IN500xkL4VceX',{
        locale: 'en'  // Set locale to English
    }); // Replace with your Publishable Key
    let elements = stripe1.elements();
    let card = elements.create('card');

    ///////////////////
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
        stripe1.createToken(card).then(function(result) {
            if (result.error) {
                $('#card-errors').text(result.error.message);
                $("#submit-button").prop('disabled', false);
            } else {
                stripeTokenHandler(result.token);
            }
        });

        function stripeTokenHandler(token) {
            let amount = parseFloat($("#totalPremium").text().substring(1))
            let description = "Payment for policy!";

            $.ajax({
                url: 'http://localhost:8282/payment',
                method: 'POST',
                data: {
                    token: token.id,
                    amount: amount,
                    description: description
                },
                success: function (response) {
                    console.log('Payment successful', response);
                    // Update the UI accordingly, e.g., display a success message
                    $('#payment-result')
                        .removeClass('alert-danger') // Remove any previous error classes
                        .addClass('alert-success')    // Add success class for styling
                        .text('Payment successful!')
                        .show();

                    savePolicyFunc();
                },
                error: function (xhr, status, error) {
                    console.error('Payment failed', error);
                    $('#payment-result')
                        .removeClass('alert-success') // Remove any previous success classes
                        .addClass('alert-danger')     // Add error class for styling
                        .text('Payment failed. Please try again.')
                        .show();
                    // Update the UI accordingly, e.g., display an error message
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

    })    */

})