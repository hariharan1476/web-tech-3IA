const admin = "URK22AI1023";
const password = "16062005";

function login() {
    const ui = document.getElementById("u").value;
    const pi = document.getElementById("p").value;
    
    if ((ui === admin && pi === password)) {
        window.location.href = "home.html";
    } else {
        document.getElementById("p").classList.add("shake-password");
        setTimeout(function () {
            document.getElementById("p").classList.remove("shake-password");
        }, 500);
        document.querySelector('label[for="p"]').style.color = "red";

        document.getElementById("u").value = "";
        document.getElementById("p").value = "";
        alert("Incorrect username or password. Please try again.");
    }
}
