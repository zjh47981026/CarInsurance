$(document).ready(function() {
    let authToken = localStorage.getItem('authToken');
    let userid = localStorage.getItem('username');
    $.ajax({
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
    });


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

    });



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
    })


});