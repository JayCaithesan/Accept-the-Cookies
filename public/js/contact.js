$(document).ready(function(){
    
})
function saveRecord(){
    let validEmail = /^\w*(@)[a-zA-Z]*((\.)[a-zA-Z]{2,3})+$/;
    let validPhone = /^\([0-9]{3}\)\-[0-9]{3}\-[0-9]{4}$/;
    let email = $("#emailInput").val();
    let phone = $("#phoneNumberInput").val();
    let name = $("#nameInput").val();
    let message = $("#messageInput").val();
    let purpose = $("#purposeSelect").val();

    if(!email.match(validEmail)){
        console.log("Not a valid email");
        $("#emailTitle").append("<div class=\"warning\" style=\"display:inline\"> Make sure your input is in the correct format</div>");
        $("#emailTitle").css("background-color", "red");
    }
    
        if(!phone.match(validPhone)){
            console.log("Not a valid phone number");
            $("#phoneNumberTitle").append("<div class=\"warning\" style=\"display:inline\"> Make sure your input is in the correct format</div>");
            $("#phoneNumberTitle").css("background-color", "red");
        }
    else{
        console.log("Valid phone number");
        $("#emailTitle").css("background-color", "#FFE6D6");
        $("#phoneNumberTitle").css("background-color", "#FFE6D6");
        $(".warning").html("");
        let request = {"name":name, "email":email, "phoneNumber":phone, "purpose":purpose, "message":message};
        let jsonString = JSON.stringify(request);
        console.log(jsonString);
        let userData = "text/json;charset=UTF-8," + encodeURIComponent(jsonString);
        let jsonDownloadLink = $('<a href="data:' + userData + '" download="userEntry.json">download JSON</a>');
        let jsonDownload = $("#jsonDownload");
        jsonDownload.append(jsonDownloadLink);
    }
}


