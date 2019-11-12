var socket = io.connect('http://192.168.137.1:8081/');

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

    // var loader = document.getElementsByClassName("loader");
    // loader.style.display = "inline-block";

    xhttp.open("POST", '/code', true);
    xhttp.setRequestHeader("Content-type", "application/json");

    var input = document.getElementById("input");
    var lang = document.getElementById("lang-list").value;
    var language = lang.substring(0,lang.length-1);
    var vi = lang[lang.length-1];

    var code_text = JSON.stringify({
        "script": code.value,
        "stdin": input.value,
        "language": language,
        "vi": vi
    });

    xhttp.send(code_text);
    xhttp.onreadystatechange = function() {
        console.log(xhttp.status);
        if(xhttp.status === 200){
            
               var json = xhttp.responseText;
               if(json != ""){
               var res = JSON.parse(json);
               console.log(res.output);
               //loader.style.display = "none";
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
