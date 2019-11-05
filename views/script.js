var socket = io.connect('http://localhost:8081/');

var code = document.getElementById("code");

code.addEventListener("keypress", () =>{
    socket.emit('typing',code.value);
    console.log(code.value);
});

socket.on('typing',(data) =>{
    console.log(data);
});

document.getElementById("submit")
    .addEventListener("click",() =>{

    console.log("button clicked");
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", '/code', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    var code_text = JSON.stringify({
        "script": code.value
    });
    xhttp.send(code_text);
    xhttp.onreadystatechange = function() {
        console.log(xhttp.status);
        if(xhttp.status === 200){
            
               var json = xhttp.responseText;
               if(json != ""){
               var res = JSON.parse(json);
               console.log(res.output);
               document.getElementById("output").value =  res.output;
                console.log("success");
               }
        }else{
            console.log("Failed");
            document.getElementsByClassName("output").innerHTML = "Failed";
            console.log(xhttp);
        }
    }
});
