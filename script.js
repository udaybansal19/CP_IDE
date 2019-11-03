
document.getElementById("submit").addEventListener("click",postCode());

function postCode(){

    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", "http://localhost:8081/code", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var script = document.getElementById("code").value;
    var code = {
        "script": script
    }
    xhttp.send(code);
    xhttp.onreadystatechange = function() {
        if(this.)
    }
}
