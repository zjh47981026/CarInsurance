<!DOCTYPE html>
<html lang="en">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
         pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c" %>
<head>
    <title>ClaimReview</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="../css/claimReview.css">
    <script src="../js/claimReview.js"></script>
</head>
<body>
<div class="claims-body">
    <div class="d-flex justify-content-center" >
        <div id= "claim-review-table" class=" mt-3">
            <table class='w-75 table table-striped' style=" border:1px solid grey;">
                <thead >
                <tr style="background-color:#caddfa; " class="text-secondary" id="claimTableHeader">
                    <th>Claim Id</th>
                    <th class="d-none">Policy Id</th>
                    <th>Date of Accident</th>
                    <th>Estimated Amount</th>
                    <th>Approved Amount</th>
                    <th>Final Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Documents</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id = "claim-show-table">

                </tbody>
            </table>
        </div>
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="claimViewDocumentsModal" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">View/Upload Documents</h4>
            </div>
            <div class="modal-body" id="claimDocumentModalBody">
                <div class="row" id="claimReviewDocumentContainer">

                </div>
                <div class="row">
                    <label>Documents: </label>
                    <input type="file" id="claimReviewDocumentsUploadInput" name="documents[]" accept=".jpg, .png, .pdf" multiple/>
                    <br/>
                    <button class="btn btn-primary" id="claimReviewUploadDocumentBtn">Upload Documents</button>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="claimDescriptionModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Description</h4>
            </div>
            <div class="modal-body" id="claimDescriptionModalBody">
                <div class="row">
                    <label>Description: </label>
                    <br/>
                    <textarea id="claimReviewDescriptionText" ></textarea>
                    <br/>
                    <input type="button" id="updateDescriptionBtn" value="Update Description" />
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="claimUpdateModal" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Update Claim</h4>
            </div>
            <div class="modal-body" id="claimUpdateModalBody">
                <div class="row">
                    <label>Status: </label>
                    <select id="claimUpdateStatus">
                        <option>APPROVED</option>
                        <option>REJECTED</option>
                        <option>CLOSED</option>
                    </select>
                    <br/>
                    <label>Approved Claim Amount: </label>
                    <input type="number" id="claimUpdateApprovedAmount" />
                    <br/>
                    <label>Final Claim Amount:</label>
                    <input type="number" id="claimUpdateFinalAmount" />
                    <br/>
                    <input type="button" id="claimUpdateConfirm" value="Submit" />
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