// Bind button events

document.addEventListener('DOMContentLoaded', function() {
  // User events
  var element = document.getElementById('getusers-btn');
  element.addEventListener('click', function() {
    getData('users');
  });
  element = document.getElementById('createuser-btn');
  element.addEventListener('click', function() {
    createUser();
  });
  element = document.getElementById('updateuser-btn');
  element.addEventListener('click', function() {
    updateUser();
  });
  element = document.getElementById('deleteuser-btn');
  element.addEventListener('click', function() {
    deleteUser();
  });

  // Controller events
  element = document.getElementById('getcontrollers-btn');
  element.addEventListener('click', function() {
    getData('controllers');
  });
  element = document.getElementById('createcontroller-btn');
  element.addEventListener('click', function() {
    createController();
  });
  element = document.getElementById('updatecontroller-btn');
  element.addEventListener('click', function() {
    updateController();
  });
  element = document.getElementById('deletecontroller-btn');
  element.addEventListener('click', function() {
    deleteController();
  });

  // Device events
  element = document.getElementById('getdevices-btn');
  element.addEventListener('click', function() {
    getData('devices');
  });
  element = document.getElementById('createdevice-btn');
  element.addEventListener('click', function() {
    createDevice();
  });
  element = document.getElementById('updatedevice-btn');
  element.addEventListener('click', function() {
    updateDevice();
  });
  element = document.getElementById('deletedevice-btn');
  element.addEventListener('click', function() {
    deleteDevice();
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
  };
  xmlhttp.open("GET", "/" + url, true);
  xmlhttp.send();
}

// Populates the form
function listItems(response, path) {
  var obj = JSON.parse(response);
  var i;
  var out = "<table>";
  for (i = 0; i < obj.length; i++) {
    out += "<tr>";

    if (path === "users") {
      out += "<th onclick=\"getUserById(this)\" data=\"" + obj[i]._id + "\">Item " + (i + 1) + ":</th></tr>";
    } else if (path === "controllers") {
      out += "<th onclick=\"getControllerById(this)\" data=\"" + obj[i]._id + "\">Item " + (i + 1) + ":</th></tr>";
    } else if (path === "devices") {
      out += "<th onclick=\"getDeviceById(this)\" data=\"" + obj[i]._id + "\">Item " + (i + 1) + ":</th></tr>";
    }

    for (var key in obj[i]) {
      if (key === "__v" || key === "created") {
        continue;
      }
      out += "<tr><td>" + key + "</td><td>" + obj[i][key] + "</td></tr>";
    }
  }
  out += "</table>";
  document.getElementById("results-container-" + path).innerHTML = out;
}

/*==================================
=            User logic            =
==================================*/

// Retrieves user with given ID
function getUserById(element) {
  var id = element.getAttribute('data');
  var xmlhttp = new XMLHttpRequest();
  var url = 'users/' + id;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      populateUserForm(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", "/" + url, true);
  xmlhttp.send();
}

// Parses a response object into the form
function populateUserForm(response) {
  var obj = JSON.parse(response);
  if (obj === null) return;

  // Clear all fields first
  clearUserForm();

  // Populate the fields unless undefined
  if (obj.firstName || '') {
    document.getElementsByName('firstName')[0].value = obj.firstName;
  }
  if (obj.lastName || '') {
    document.getElementsByName('lastName')[0].value = obj.lastName;
  }
  if (obj.email || '') {
    document.getElementsByName('email')[0].value = obj.email;
  }
  if (obj.password || '') {
    document.getElementsByName('password')[0].value = obj.password;
  }
  if (obj.phone || '') {
    document.getElementsByName('phone')[0].value = obj.phone;
  }

  // Save the ID for future operations
  document.getElementById('users-block').setAttribute('data', obj._id);
}

// Clears the input boxes
function clearUserForm() {
  document.getElementsByName('firstName')[0].value = '';
  document.getElementsByName('lastName')[0].value = '';
  document.getElementsByName('phone')[0].value = '';
  document.getElementsByName('email')[0].value = '';
  document.getElementsByName('password')[0].value = '';
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
  if (document.getElementsByName('firstName')[0].value.trim() !== "" && document.getElementsByName('lastName')[0].value.trim() !== "" && document.getElementsByName('phone')[0].value.trim() !== "" && document.getElementsByName('email')[0].value.trim() !== "" && document.getElementsByName('password')[0].value.trim() !== "") {
    params += 'firstName=' + document.getElementsByName('firstName')[0].value.trim() + '&';
    params += 'lastName=' + document.getElementsByName('lastName')[0].value.trim() + '&';
    params += 'phone=' + document.getElementsByName('phone')[0].value.trim() + '&';
    params += 'email=' + document.getElementsByName('email')[0].value.trim() + '&';
    params += 'password=' + document.getElementsByName('password')[0].value.trim();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", '/users/', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    alert('User created!');
    clearUserForm();
    clearUserResults();
  } else {
    alert('All fields are mandatory!');
  }
}

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
  params += 'email=' + document.getElementsByName('email')[0].value.trim() + '&';
  params += 'password=' + document.getElementsByName('password')[0].value.trim();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT", '/users/' + id, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
  alert('User updated!');
  clearUserResults();
}

function deleteUser() {
  var id = document.getElementById('users-block').getAttribute('data');
  if (!id) {
    alert('Select a user');
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", '/users/' + id, true);
  xmlhttp.send();
  alert('User deleted!');
  clearUserForm();
  clearUserResults();
}

/*=====  End of User logic  ======*/

/*========================================
=            Controller logic            =
========================================*/

// Retrieves controller with given ID
function getControllerById(element) {
  var id = element.getAttribute('data');
  var xmlhttp = new XMLHttpRequest();
  var url = 'controllers/' + id;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      populateControllerForm(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", "/" + url, true);
  xmlhttp.send();
}

// Parses a response object into the form
function populateControllerForm(response) {
  var obj = JSON.parse(response);
  if (obj === null) return;

  // Clear all fields first
  clearControllerForm();

  // Populate the fields unless undefined
  if (obj.make || '') {
    document.getElementsByName('make')[0].value = obj.make;
  }
  if (obj.model || '') {
    document.getElementsByName('model')[0].value = obj.model;
  }
  if (obj.version || '') {
    document.getElementsByName('version')[0].value = obj.version;
  }

  // Save the ID for future operations
  document.getElementById('controllers-block').setAttribute('data', obj._id);
}

// Clears the input boxes
function clearControllerForm() {
  document.getElementsByName('make')[0].value = '';
  document.getElementsByName('model')[0].value = '';
  document.getElementsByName('version')[0].value = '';
  document.getElementById('controllers-block').setAttribute('data', '');
}

// Removes all results from the results element
function clearControllerResults() {
  var element = document.getElementById('results-container-controllers');
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

function createController() {
  var params = "";
  // All fields are required
  if (document.getElementsByName('make')[0].value.trim() !== "" && document.getElementsByName('model')[0].value.trim() !== "" && document.getElementsByName('version')[0].value.trim() !== "") {
    params += 'make=' + document.getElementsByName('make')[0].value.trim() + '&';
    params += 'model=' + document.getElementsByName('model')[0].value.trim() + '&';
    params += 'version=' + document.getElementsByName('version')[0].value.trim();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", '/controllers/', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    alert('Controller created!');
    clearControllerForm();
    clearControllerResults();
  } else {
    alert('All fields are mandatory!');
  }
}

function updateController() {
  var id = document.getElementById('controllers-block').getAttribute('data');
  if (!id) {
    alert('Select a controller');
    return;
  }
  var params = "";
  params += 'make=' + document.getElementsByName('make')[0].value.trim() + '&';
  params += 'model=' + document.getElementsByName('model')[0].value.trim() + '&';
  params += 'version=' + document.getElementsByName('version')[0].value.trim();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT", '/controllers/' + id, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
  alert('Controller updated!');
  clearControllerResults();
}

function deleteController() {
  var id = document.getElementById('controllers-block').getAttribute('data');
  if (!id) {
    alert('Select a controller');
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", '/controllers/' + id, true);
  xmlhttp.send();
  alert('Controller deleted!');
  clearControllerForm();
  clearControllerResults();
}

/*=====  End of Controller logic  ======*/

/*========================================
=            Device logic            =
========================================*/

// Retrieves device with given ID
function getDeviceById(element) {
  var id = element.getAttribute('data');
  var xmlhttp = new XMLHttpRequest();
  var url = 'devices/' + id;
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      populateDeviceForm(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", "/" + url, true);
  xmlhttp.send();
}

// Parses a response object into the form
function populateDeviceForm(response) {
  var obj = JSON.parse(response);
  if (obj === null) return;

  // Clear all fields first
  clearDeviceForm();

  // Populate the fields unless undefined
  if (obj.name || '') {
    document.getElementsByName('name')[0].value = obj.name;
  }
  if (obj.description || '') {
    document.getElementsByName('description')[0].value = obj.description;
  }
  if (obj.location || '') {
    document.getElementsByName('location')[0].value = obj.location;
  }
  if (obj.type || '') {
    document.getElementsByName('type')[0].value = obj.type;
  }

  // Save the ID for future operations
  document.getElementById('devices-block').setAttribute('data', obj._id);
}

// Clears the input boxes
function clearDeviceForm() {
  document.getElementsByName('name')[0].value = '';
  document.getElementsByName('description')[0].value = '';
  document.getElementsByName('location')[0].value = '';
  document.getElementsByName('type')[0].value = '';
  document.getElementById('devices-block').setAttribute('data', '');
}

// Removes all results from the results element
function clearDeviceResults() {
  var element = document.getElementById('results-container-devices');
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}

function createDevice() {
  var params = "";
  // All fields are required
  if (document.getElementsByName('name')[0].value.trim() !== "" && document.getElementsByName('description')[0].value.trim() !== "" && document.getElementsByName('location')[0].value.trim() !== "" && document.getElementsByName('type')[0].value.trim() !== "") {
    params += 'name=' + document.getElementsByName('name')[0].value.trim() + '&';
    params += 'description=' + document.getElementsByName('description')[0].value.trim() + '&';
    params += 'location=' + document.getElementsByName('location')[0].value.trim() + '&';
    params += 'type=' + document.getElementsByName('type')[0].value.trim();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", '/devices/', true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(params);
    alert('Device created!');
    clearDeviceForm();
    clearDeviceResults();
  } else {
    alert('All fields are mandatory!');
  }
}

function updateDevice() {
  var id = document.getElementById('devices-block').getAttribute('data');
  if (!id) {
    alert('Select a device');
    return;
  }
  var params = "";
  params += 'name=' + document.getElementsByName('name')[0].value.trim() + '&';
  params += 'description=' + document.getElementsByName('description')[0].value.trim() + '&';
  params += 'location=' + document.getElementsByName('location')[0].value.trim() + '&';
  params += 'type=' + document.getElementsByName('type')[0].value.trim();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("PUT", '/devices/' + id, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
  alert('Device updated!');
  clearDeviceResults();
}

function deleteDevice() {
  var id = document.getElementById('devices-block').getAttribute('data');
  if (!id) {
    alert('Select a device');
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("DELETE", '/devices/' + id, true);
  xmlhttp.send();
  alert('Device deleted!');
  clearDeviceForm();
  clearDeviceResults();
}

/*=====  End of Device logic  ======*/
