$(document).ready(function() {
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


})