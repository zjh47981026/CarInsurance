$(document).ready(function() {
    let authorities = JSON.parse(localStorage.getItem("authorities"));
    let existAdmin = authorities.some((authority) => authority === "ROLE_ADMIN");
    let authToken = localStorage.getItem('authToken');
    let userid = localStorage.getItem('username');
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
                $("td").pro
            })
        },
        error: function (err) {

        }
    });

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
                $("#claimReviewDescriptionText").val(result.description);
                $("#claimReviewDescriptionText").prop("disabled", true);
            },
            error: function (err) {

            }
        });

    })

    $("#claim-review-table").on("click", ".claimDocumentsBtn", function() {
        $("#claimReviewDocumentContainer").empty();
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
                $("#claimUpdateModal").modal("toggle");
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


});