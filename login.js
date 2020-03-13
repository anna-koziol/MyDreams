var nickGlobal;
var doneTab = [];

document.addEventListener("DOMContentLoaded", function (event) {

    var registration = document.getElementById("registration")
    var login = document.getElementById("login");
    var firstTime = document.getElementById("firstTime");
    var moreTime = document.getElementById("moreTime");
    //////////////////////
    var nickF = document.getElementById("nickF");
    var mailF = document.getElementById("mailF");
    var passwdF = document.getElementById("passwdF");
    var nickM = document.getElementById("nickM");
    var passwdM = document.getElementById("passwdM");
    //////////////////////
    var loging = document.getElementById("loging");
    var alerts = document.getElementById("alerts");


    registration.addEventListener("click", changeView);
    login.addEventListener("click", changeView);


    function changeView() {
        if (this.id == "registration") {
            firstTime.style.display = "flex"
            moreTime.style.display = "none"
        }
        else {
            firstTime.style.display = "none"
            moreTime.style.display = "flex"
        }
    }

});


function addAccount() {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "index.php", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "Added") {
                var page = document.getElementById("content");
                var name = document.getElementById("name");
                loging.style.display = "none";
                page.style.display = "flex";
                name.innerHTML = "WITAJ " + nickF.value;
                nickGlobal = nickF.value;
            }
            else {
                alerts.innerHTML = this.responseText;
            }
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("todo=addAccount&nick=" + nickF.value + "&mail=" + mailF.value + "&password=" + passwdF.value);

    show()
}

function login() {

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "index.php", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (this.responseText == "Bad") {
                alerts.innerHTML = "Błędne hasło lub nick";
            }
            else {
                nickGlobal = nickM.value;

                loging.style.display = "none";
                var page = document.getElementById("content");
                page.style.display = "flex";
                var name = document.getElementById("name");
                name.innerHTML = "WITAJ " + nickGlobal;

                var object = JSON.parse(this.responseText);
                if (object.length > 0) {
                    for (var i = 0; i < object.length; i++) {
                        addTable(object[i].text)
                    }
                }

            }

        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("todo=login&nick=" + nickM.value + "&password=" + passwdM.value);
    
    ///////POBRANIE JUŻ WYKONANYCH RZECZY

    getDone()

    show()
}

function getDone() {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "index.php", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            doneTab = data;
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("todo=getDone&nick=" + nickM.value);
}