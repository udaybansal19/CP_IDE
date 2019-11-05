var socket = io.connect('http://localhost:8081/');

var code = document.getElementById("code");

code.addEventListener("keyup", () =>{
    socket.emit('typing',code.value);
});

socket.on('code', function(data){
    code.value = data;
});

document.getElementById("submit")
    .addEventListener("click",() =>{

    console.log("button clicked");
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", '/code', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    var input = document.getElementById("input");

    var code_text = JSON.stringify({
        "script": code.value,
        "stdin": input.value
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
