

document.getElementById("submit")
    .addEventListener("click",() =>{

    console.log("button clicked");
    var xhttp = new XMLHttpRequest();

    xhttp.open("POST", '/code', true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var script = document.getElementById("code").value;
    var code = JSON.stringify({
        "script": script
    });
    xhttp.send(code);
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
