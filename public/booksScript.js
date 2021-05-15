var requiredFields = [
 "fullname", "title", "author", "nofpages", "publisher", "date", "genre", 
]

var bookForm = {
  "project" : "Books",
  "owner" : "Belinda Galstyan",
  "fullname" : "",
  "title" : "",
  "author" : "",
  "colour" : "",
  "covertype" : "",
  "othercovervalue" : "",
  "nofpages" : "",
  "price" : "",
  "currency" : "",
  "language" : "",
  "otherlanguagevalue" : "",
  "orglanguage" : "",
  "otherorglanguagevalue" : "",
  "edition" : "",
  "dimensions" : "",
  "publisher" : "",
  "date" : "",
  "orgdate" : "",
  "genre" : "",
  "agerestr" : ""
}

function HandleFullnameChange() {
  bookForm.fullname = document.getElementById("fullname").value
}

function HandleTitleChange() {
  bookForm.title = document.getElementById("title").value
}

function HandleAuthorChange() {
  bookForm.author = document.getElementById("author").value
}

function HandleColourchange() {
  bookForm.colour = document.getElementById("colour").value
}

function HandleCovertypechange(e) {
  bookForm.covertype=e.target.value;
  if (bookForm.covertype!="other") {
    bookForm.othercovervalue="";
    document.getElementById("othercovertype").style.display="none";
  }
  else{
    document.getElementById("othercovertype").style.display="block";
  }
}

function HandleCovermaterialchange() {
  if (bookForm.covertype == "other") {
    bookForm.othercovervalue = document.getElementById("othercovertype").value;
    document.getElementById("othercovertype").style.display="block";
  }
}

function HandleNofpageschange() {
  bookForm.nofpages = document.getElementById("nofpages").value
}

function HandlePricechange() {
  bookForm.price = document.getElementById("price").value
}

function HandleCurrencyChange() {
  bookForm.currency = document.getElementById("currency").value
}

function Handlelanguagechange(e) {
  bookForm.language=e.target.value;
  if (bookForm.language!="other") {
    bookForm.otherlanguagevalue="";
    document.getElementById("otherlanguage").style.display="none";
  }
  else{
    document.getElementById("otherlanguage").style.display="block";
  }
}

function Handleotherlanguagechange() {
  if (bookForm.language == "other") {
    bookForm.otherlanguagevalue = document.getElementById("otherlanguage").value;
    document.getElementById("otherlanguage").style.display="block";
  }
}

function HandleOrglanguagechange(e) {
  bookForm.orglanguage=e.target.value;
  if (bookForm.orglanguage!="other") {
    bookForm.otherorglanguagevalue="";
    document.getElementById("otherorglanguage").style.display="none";
  }
  else{
    document.getElementById("otherorglanguage").style.display="block";
  }
}

function HandleOrglanguagetextchange() {
  if (bookForm.orglanguage == "other") {
    bookForm.otherorglanguagevalue = document.getElementById("otherorglanguage").value;
    document.getElementById("otherorglanguage").style.display="block";
  }
}

function HandleEditionChange() {
  bookForm.edition = document.getElementById("edition").value
}

function HandleDimensionsChange() {
  bookForm.dimensions = document.getElementById("dimensions").value
}

function HandlePublisherChange() {
  bookForm.publisher = document.getElementById("publisher").value
}

function HandleDatechange() {
  bookForm.date = document.getElementById("date").value
}

function HandleOrgdatechange() {
  bookForm.orgdate = document.getElementById("orgdate").value
}

function HandleGenreChange() {
  bookForm.genre = document.getElementById("genre").value
}

function HandleAgerestrchange() {
  bookForm.agerestr = document.getElementById("agerestr").value
}

function validateBookFormData() {
  var isFormValid = true;
  var keys = Object.keys(bookForm);
  keys.forEach(key => {
      if (requiredFields.indexOf(key) > -1 && bookForm[key] == "") { console.log(key, " is a required field, please add a value") 
      if(document.getElementById(key)) {
        document.getElementById(key).style.backgroundColor = "red"; 
        isFormValid = false;
      }
    }   
  })
  return isFormValid;
}

function SaveData(e) {
  console.log(bookForm);

  $.ajax({
    type: 'POST',
    url: "https://cse120-2021-api-belinda.herokuapp.com/data",
    data: bookForm,
    cache: false,
    dataType : 'json',
    success: function (data) {
      console.log("success");
      document.location="/thankyou";
    },
    error: function (xhr) {
      console.error("Error in post", xhr);
    },
    complete: function () {
      console.log("Complete");  
    }
  });
}


function complete () {
  console.log("Complete");  
}

function loadExistingData() {
  var existingData = [];
  $.ajax({
    type: 'GET',
    url: "https://cse120-2021-api-belinda.herokuapp.com/data",
    data: bookForm,
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