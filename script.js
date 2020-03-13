var licznik = 1;

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");

    var done = document.getElementById("done");
    var listDone = document.getElementById("listDone");


    var bakset = document.getElementById("basketAll");
    bakset.addEventListener("click", function () {
        console.log("Pokaż koszyk")
        done.style.display = "block"

        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "index.php", true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText)
                listDone.innerHTML = " "
                console.log("data - ", data)
                for (var i = 0; i < data.length; i++) {
                    var li = document.createElement("li");
                    li.innerHTML = data[i].task;
                    listDone.appendChild(li);
                }
            }
        }

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("todo=basket&nick=" + nickGlobal);
    })


    var cross = document.getElementById("cross");
    cross.addEventListener("click", function () {
        done.style.display = "none"
    })

});


function addDream() {
    console.log("Dodaj do bazy")
    var text = document.getElementById("search");

    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "index.php", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            addTable(text.value)
            text.value = ' ';
            text.placeholder = ' ';
        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("todo=add&text=" + text.value + "&nick=" + nickGlobal);

}


function addTable(text) {
    var th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerHTML = licznik++;

    var td1 = document.createElement("td");
    td1.innerHTML = text;

    var td2 = document.createElement("td");
    var button = document.createElement("button");
    //console.log(doneTab)

    for (var j = 0; j < doneTab.length; j++) {
        if (text == doneTab[j].task) {
            button.innerHTML = "WYKONANE";
            button.style.backgroundColor = "#3E7BF9"
            break;
        }
        else {
            button.innerHTML = "Nie wykonane";
        }
    }

    button.id = text;
    button.className = "doneButton";
    button.addEventListener("click", doneButton);
    td2.appendChild(button);


    var tr = document.createElement("tr");
    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);

    tbody.appendChild(tr)
}


function doneButton() {
    var text = this.id;

    if (this.innerHTML == "Nie wykonane") {
        this.innerHTML = "Wykonane";
        this.style.backgroundColor = "#3E7BF9"

        xhttp = new XMLHttpRequest();
        xhttp.open("POST", "index.php", true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('Wykonano')
            }
        }

        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("todo=done&text=" + text + "&nick=" + nickGlobal);
    }

}


function show() {
    xhttp = new XMLHttpRequest();
    xhttp.open("POST", "index.php", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var object = JSON.parse(this.responseText);

            for (var j = 21; j < object.length; j++) {
                if (object[j][0] != undefined) {
                    addTable(object[j][0])
                }

            }

        }
    }

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("todo=show");
}