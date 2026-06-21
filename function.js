let email=document.getElementById("email");
let pswd=document.getElementById("pswd");
let btn=document.getElementById("loginBtn");
let error=document.getElementById("error");

btn.addEventListener("click",function(){
    let emailNew=email.value;
    let pswdNew=pswd.value;

    let userInfo={
        email:emailNew,
        password:pswdNew
    }
    
    console.log(userInfo);

    let url="https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(userInfo)
    };
    
    fetch(url, options)
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        
        console.log(data);

        let token = data.data.token;

        console.log("TOKEN =", token);

        Cookies.set("jwt_token", token);

        console.log(
            "COOKIE =",
            Cookies.get("jwt_token")
        );

       

        Cookies.set("jwt_token", token);

        window.location.href = "dashboard.html";
    })
    .catch(function(error){
        console.log(error);
    });
    

});
