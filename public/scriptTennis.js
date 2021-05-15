var requiredFields = [
 "fullname", "mail", "date", "time", "favplayer", "competition" 
]

var tennisForm = {
  "project" : "Tennis",
  "owner" : "Belinda Galstyan",
  "fullname" : "",
  "mail" : "",
  "date" : "",
  "time" : "",
  "frequency" : "",
  "otherfrequencyvalue" : "",
  "colour" : "",
  "favplayer" : "",
  "competition" : "",
  "yes" : ""
}

function HandleFullnameChange() {
  tennisForm.fullname = document.getElementById("fullname").value
}

function HandleMailChange() {
  tennisForm.mail = document.getElementById("mail").value
}

function HandleDobChange() {
  tennisForm.date = document.getElementById("date").value
}

function HandleTimeChange() {
  tennisForm.time = document.getElementById("time").value
}

function HandleFrequencychange(e) {
  tennisForm.frequency=e.target.value;
  if (tennisForm.frequency!="other") {
    tennisForm.otherfrequencyvalue="";
    document.getElementById("otherfrequency").style.display="none";
  }
  else{
    document.getElementById("otherfrequency").style.display="block";
  }
}

function HandleOtherFrequencychange() {
  if (tennisForm.frequency == "other") {
    tennisForm.otherfrequencyvalue = document.getElementById("otherfrequency").value;
    document.getElementById("otherfrequency").style.display="block";
  }
}

function HandleColorChange() {
  tennisForm.colour = document.getElementById("colour").value
}

function HandleFavChange() {
  tennisForm.favplayer = document.getElementById("favplayer").value
}

function HandleCompetitionchange() {
  tennisForm.competition = document.getElementById("competition").value
}

function HandleYesChange() {
  tennisForm.yes = document.getElementById("yes").value
}

function validateFormData() {
  var isFormValid = true;
  var keys = Object.keys(tennisForm);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && tennisForm[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}

function ShowTheData(e) {
  if(validateFormData() == false) {
    return;
  } else {
console.log(tennisForm);

  $.ajax({
    type: 'POST',
    url: "/data",
    data: tennisForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.location="https://cse120-2021-api-belinda.herokuapp.com/tennis/thankyou.html";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}
}

function complete () {
  console.log("Complete");  
}

function loadExistingData() {
	var existingData = [];
  $.ajax({
    type: 'GET',
    url: "/data",
    data: tennisForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success", data);
      existingData = data;
      displayData(existingData.data);
    },
    error: function (data) {
      console.error("Error in post");
    }
  });
}

function displayData(existingData) {
  document.getElementById("existingData").innerHTML = "<ul>";
  for (var i = 0; i < existingData.length; i++) {
    currentBook = existingData[i];
    document.getElementById("existingData").innerHTML += "<li><i>" + currentBook.fullname + "</li> : <b>" + currentBook.title + "</b></li>";
  }
}