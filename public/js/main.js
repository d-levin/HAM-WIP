// Bind button events
document.addEventListener('DOMContentLoaded', function() {
    var element = document.getElementById('getusers-btn');
    element.addEventListener('click', function() {
        getData('users');
    });

    element = document.getElementById('createuser-btn');
    element.addEventListener('click', function() {
        createUser()
    });

    element = document.getElementById('updateuser-btn');
    element.addEventListener('click', function() {
        updateUser()
    });

    element = document.getElementById('deleteuser-btn');
    element.addEventListener('click', function() {
        deleteUser()
    });
});

// Get and list all items
function getData(path) {
    var xmlhttp = new XMLHttpRequest();
    var url = path;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            listItems(xmlhttp.responseText, path);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

// Populates the form
function listItems(response, path) {
    var obj = JSON.parse(response);
    var i;
    var out = "<table>";
    for (i = 0; i < obj.length; i++) {
        out += "<tr><th onclick=\"getUserById(this)\" data=\"" + obj[i]['_id'] + "\">Item " + (i + 1) + ":</th></tr>";
        for (var key in obj[i]) {
            if (key === "__v" || key === "_id" || key === "created") {
                continue;
            }
            out += "<tr><td>" + key + "</td><td>" + obj[i][key] + "</td></tr>";
        }
    }
    out += "</table>";
    document.getElementById("results-container-" + path).innerHTML = out;
};

// Retrieves user with given ID
function getUserById(element) {
    var id = element.getAttribute('data');
    var xmlhttp = new XMLHttpRequest();
    var url = 'users/' + id;
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            populateUserForm(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

// Parses a response object into the form
function populateUserForm(response) {
    var obj = JSON.parse(response);
    if (obj == null) return;

    // Clear all fields first
    clearUserForm();

    // Populate the fields unless undefined
    if (obj['firstName'] || '') {
        document.getElementsByName('firstName')[0].value = obj['firstName'];
    }
    if (obj['lastName'] || '') {
        document.getElementsByName('lastName')[0].value = obj['lastName'];
    }
    if (obj['email'] || '') {
        document.getElementsByName('email')[0].value = obj['email'];
    }
    if (obj['phone'] || '') {
        document.getElementsByName('phone')[0].value = obj['phone'];
    }

    // Save the ID for future operations
    document.getElementById('users-block').setAttribute('data', obj['_id']);
};

// Clears the input boxes
function clearUserForm() {
    document.getElementsByName('firstName')[0].value = '';
    document.getElementsByName('lastName')[0].value = '';
    document.getElementsByName('phone')[0].value = '';
    document.getElementsByName('email')[0].value = '';
    document.getElementById('users-block').setAttribute('data', '');
}

// Removes all results from the results element
function clearUserResults() {
    var element = document.getElementById('results-container-users');
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
}

function createUser() {
    var params = "";
    // All fields are required
    if (document.getElementsByName('firstName')[0].value.trim() !== "" && document.getElementsByName('lastName')[0].value.trim() !== "" && document.getElementsByName('phone')[0].value.trim() !== "" && document.getElementsByName('email')[0].value.trim() !== "") {
        params += 'firstName=' + document.getElementsByName('firstName')[0].value.trim() + '&';
        params += 'lastName=' + document.getElementsByName('lastName')[0].value.trim() + '&';
        params += 'phone=' + document.getElementsByName('phone')[0].value.trim() + '&';
        params += 'email=' + document.getElementsByName('email')[0].value.trim();

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", 'users/', true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(params);
        alert('User created!');
        clearUserForm();
        clearUserResults();
    } else {
        alert('All fields are mandatory!');
    }
};

function updateUser() {
    var id = document.getElementById('users-block').getAttribute('data');
    if (!id) {
        alert('Select a user');
        return;
    }
    var params = "";
    params += 'firstName=' + document.getElementsByName('firstName')[0].value.trim() + '&';
    params += 'lastName=' + document.getElementsByName('lastName')[0].value.trim() + '&';
    params += 'phone=' + document.getElementsByName('phone')[0].value.trim() + '&';
    params += 'email=' + document.getElementsByName('email')[0].value.trim();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("PUT", 'users/' + id, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    alert('User updated!');
    clearUserResults();
};

function deleteUser() {
    var id = document.getElementById('users-block').getAttribute('data');
    if (!id) {
        alert('Select a user');
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("DELETE", 'users/' + id, true);
    xmlhttp.send();
    alert('User deleted!');
    clearUserForm();
    clearUserResults();
};
