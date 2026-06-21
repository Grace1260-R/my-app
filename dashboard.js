let token = Cookies.get("jwt_token");
let logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function(){

    console.log("Logout clicked");

    Cookies.remove("jwt_token");

    console.log(Cookies.get("jwt_token"));

    window.location.href = "login.html";

});

console.log(token);

if (!token) {
    window.location.href = "login.html";
}

let url =
"https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals";

let options = {
    method: "GET",

    headers: {
        Authorization: `Bearer ${token}`
    }
};

fetch(url, options)
    .then(function(response){
        return response.json();
    })
    .then(function(data){

    console.log(data.data);

    let overview =
    document.getElementById("overview");

    data.data.metrics.forEach(function(metric){

        let card =
        document.createElement("div");

        let label =
        document.createElement("h4");

        label.textContent =
        metric.label;

        let value =
        document.createElement("p");

        value.textContent =
        metric.value;

        card.appendChild(label);
        card.appendChild(value);

        overview.appendChild(card);

    });

   

    let serviceDiv =
    document.getElementById("serviceSummary");

    let summary =
    data.data.serviceSummary;

    serviceDiv.innerHTML = `
    <p><b>Service:</b> ${summary.service}</p>

    <p><b>Your Referrals:</b>
    ${summary.yourReferrals}</p>

    <p><b>Active Referrals:</b>
    ${summary.activeReferrals}</p>

    <p><b>Total Ref. Earnings:</b>
    ${summary.totalRefEarnings}</p>
    `;

   
})
    .catch(function(error){

        console.log(error);

    });