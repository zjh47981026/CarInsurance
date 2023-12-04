$(document).ready(function() {
    let authToken = localStorage.getItem('authToken');
    let userid = localStorage.getItem('username');
    let formData = new FormData();
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
        let description = $("#descriptionText").val();
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
            type: "POST",
            url: "http://localhost:8282/upload/" + userid,
            headers: {
                'Authorization': 'Bearer ' + authToken
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (result) {
                let filekeys = result;
                let documents = [];
                $.each(filekeys, function (key, value) {
                    let url = "https://test-4798.s3.us-east-1.amazonaws.com/" + value;
                    let document = {"userId": userid, "url": url, "name": value};
                    documents.push(document);
                });

                let claim = {
                    "policyId": policyId,
                    "userId": userid,
                    "dateOfIncident": dateOfAccident,
                    "description": description,
                    "estimatedClaimAmount": estimatedClaimAmount,
                    "claimStatus": "UNDER_REVIEW",
                    "documents": documents
                };

                ///////
                $.ajax({
                    type: "POST",
                    contentType: "application/json",
                    url: "http://localhost:8282/saveClaim",
                    headers: {
                        'Authorization': 'Bearer ' + authToken
                    },
                    data: JSON.stringify(claim),
                    dataType: "json",
                    success: function (result) {
                        $("#claimModal").modal("toggle");
                        alert("Claim submitted!!");
                        console.log(result);
                    },
                    error: function (e) {

                    }
                });

                //////
            },
            error: function (e) {

            }
        });

    });

    $("#claimLoginBtn").click(function() {
        window.location.href="/login";
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