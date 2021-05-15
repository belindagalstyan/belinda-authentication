var loadedData = [];

function loadEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("titleForm").value = editItem["title"];
    document.getElementById("fullNameForm").value = editItem["fullname"];   
    document.getElementById("authorForm").value = editItem["author"];
    document.getElementById("colourForm").value = editItem["colour"];
    document.getElementById("coverTypeForm").value = editItem["covertype"];
    document.getElementById("otherCoverValueForm").value = editItem["othercovervalue"];      
    document.getElementById("nOfPagesForm").value = editItem["nofpages"];
    document.getElementById("priceForm").value = editItem["price"];
    document.getElementById("currencyForm").value = editItem["currency"];
    document.getElementById("languageForm").value = editItem["language"];
    document.getElementById("otherLanguageValueForm").value = editItem["otherlanguagevalue"];
    document.getElementById("orgLanguageForm").value = editItem["orglanguage"];
    document.getElementById("otherOrgLanguageValueForm").value = editItem["otherorglanguagevalue"];
    document.getElementById("editionForm").value = editItem["edition"];
    document.getElementById("dimensionsForm").value = editItem["dimensions"];
    document.getElementById("publisherForm").value = editItem["publisher"];
    document.getElementById("dateForm").value = editItem["date"];
    document.getElementById("orgDateForm").value = editItem["orgdate"];
    document.getElementById("genreForm").value = editItem["genre"];
    document.getElementById("ageRestrForm").value = editItem["agerestr"];
}

function loadTennisEditItem() {
    localStorage = window.localStorage;
    editItem = JSON.parse(localStorage.getItem("editItem"));
    console.log(editItem);
    document.getElementById("_id").value = editItem["_id"];
    document.getElementById("fullNameForm").value = editItem["fullname"];
    document.getElementById("mailForm").value = editItem["mail"]; 
    document.getElementById("dateForm").value = editItem["date"];
    document.getElementById("timeForm").value = editItem["time"];
    document.getElementById("frequencyForm").value = editItem["frequency"];
    document.getElementById("otherFrequencyValueForm").value = editItem["otherfrequencyvalue"];      
    document.getElementById("colourForm").value = editItem["colour"];
    document.getElementById("favPlayerForm").value = editItem["favplayer"];
    document.getElementById("competitionForm").value = editItem["competition"];
    document.getElementById("yesForm").value = editItem["yes"];
}

function editData(id) {
    var tmp = id.split("edit_");
    var item_id = tmp[1];

    loadedData.forEach(item => {
        if ( item._id == item_id) {
            console.log(item); 
            localStorage = window.localStorage;
            localStorage.setItem('editItem', JSON.stringify(item));
            if (item["project"] == "Tennis") {
            document.location  = "editTennisForm.html"; 
            } else {
            document.location  = "editForm.html"; 
            }
        }
    })
}

function deleteData(id) {

    var r = confirm("Are you sure you want to delete the item with the following ID? " + id);
    if (r == false) {
        return;
    }

    var tmp = {
        "id": id
    }

    $.ajax({
        type: 'POST',
        url: "https://cse120-2021-api-belinda.herokuapp.com/data/delete",
        data: tmp,
        cache: false,
        dataType : 'json',
        success: function (data) {
            console.log("success");
            document.getElementById("div" + id).style.display = "none";
        },
        error: function (xhr) {
            console.error("Error in post", xhr);
        },
        complete: function () {
            console.log("Complete");  
        }
    });
}

function saveData() {
  var tmp = {
    "test": "Data"
  }

  $.ajax({
      type: 'POST',
      url: "https://cse120-2021-api-belinda.herokuapp.com/data",
      data: tmp,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
      },
      error: function (xhr) {
          console.error("Error in post", xhr);
      },
      complete: function () {
          console.log("Complete");  
      }
  });
}

function loadExistingData() {
  myTennisData = [];
  myBookData = [];
  $.ajax({
      type : "GET",
      url : "https://cse120-2021-api-belinda.herokuapp.com/data",
      dataType : "json",
      success : function(data) {
        loadedData = data.data;
        data.data.forEach(elem => {
          if (elem["owner"] == "Belinda Galstyan") {
            if (elem["project"] == "Tennis") {
              myTennisData.push(elem);
            } else {
              myBookData.push(elem);
            }
          }
        })
        displayData(myTennisData, "tennisDataContainer");
        displayData(myBookData, "bookDataContainer");
      },
      error : function(data) {
          console.log("Error")
      }
  });
}

function displayData(data, containerDivName) {
  document.getElementById(containerDivName).innerHTML = "";
  data.forEach(elem => {
    var item = document.createElement("div");
    item.id = "div" + elem["_id"];
    item.className = "item";
    if (Object.keys(elem).length == 1) {
      var span = document.createElement("span");
      span.innerHTML = "<i>Empty Element with autogenerated ID: </i>" + elem["_id"];
      item.appendChild(span);
    }
    Object.keys(elem).forEach(key => {
      if (key != "_id") {
        var span = document.createElement("span");

        var b = document.createElement("b");
        b.innerHTML = key + ": ";
        span.appendChild(b);
        
        span.className = "item";
        if (elem[key]) {
            span.innerHTML += elem[key];
        } else {
            var span1 = document.createElement("span");
            span1.className = "undefined";
            span1.innerHTML = "N/A";
            span.appendChild(span1)
        }
        item.appendChild(span);

        var br = document.createElement("br");
        item.appendChild(br);
      }
    })
    var edit_button = document.createElement("button");
    edit_button.innerHTML = "Edit";
    edit_button.id = "edit_" + elem["_id"];
    edit_button.className = "edit";
    edit_button.addEventListener("click", function(e){
        editData(e.target.id);
    }, false);
    item.appendChild(edit_button);

    var button = document.createElement("button");
    button.innerHTML = "Delete";
    button.id = elem["_id"];
    button.addEventListener("click", function(e){
        deleteData(e.target.id);
    }, false);
    item.appendChild(button);
    document.getElementById(containerDivName).appendChild(item);
  })

}


function toggleTennisData() {
  var tennisData = document.getElementById("tennisDataContainer");
  if (tennisData.style.display == "block") {
    tennisData.style.display = "none";
  } else {
    tennisData.style.display = "block";
  }
}

function toggleBookData() {
  var bookData = document.getElementById("bookDataContainer");
  if (bookData.style.display == "block") {
    bookData.style.display = "none";
  } else {
    bookData.style.display = "block";
  }
}

function UpdateData(e) {
  e.preventDefault();
  var updatedBook = {};
  updatedBook.id = document.getElementById("_id").value;
  updatedBook.fullname = document.getElementById("fullNameForm").value;
  updatedBook.title = document.getElementById("titleForm").value;
  updatedBook.author = document.getElementById("authorForm").value;
  updatedBook.colour = document.getElementById("colourForm").value;
  updatedBook.covertype = document.getElementById("coverTypeForm").value;
  updatedBook.othercovervalue = document.getElementById("otherCoverValueForm").value;
  updatedBook.nofpages = document.getElementById("nOfPagesForm").value;
  updatedBook.price = document.getElementById("priceForm").value;
  updatedBook.currency = document.getElementById("currencyForm").value;
  updatedBook.language = document.getElementById("languageForm").value; 
  updatedBook.otherlanguagevalue = document.getElementById("otherLanguageValueForm").value; 
  updatedBook.orglanguage = document.getElementById("orgLanguageForm").value; 
  updatedBook.otherorglanguagevalue = document.getElementById("otherOrgLanguageValueForm").value; 
  updatedBook.edition = document.getElementById("editionForm").value; 
  updatedBook.dimensions = document.getElementById("dimensionsForm").value; 
  updatedBook.publisher = document.getElementById("publisherForm").value; 
  updatedBook.date = document.getElementById("dateForm").value; 
  updatedBook.orgdate = document.getElementById("orgDateForm").value; 
  updatedBook.genre = document.getElementById("genreForm").value; 
  updatedBook.agerestr = document.getElementById("ageRestrForm").value; 
  
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedBook,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
  window.location.href="/index";
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");
      }
    });
}


function UpdateTennisData(e) {
  e.preventDefault();
  var updatedTennis = {};
  updatedTennis.id = document.getElementById("_id").value;
  updatedTennis.fullname = document.getElementById("fullNameForm").value;
  updatedTennis.mail = document.getElementById("mailForm").value;
  updatedTennis.date = document.getElementById("dateForm").value;
  updatedTennis.time = document.getElementById("timeForm").value;
  updatedTennis.frequency = document.getElementById("frequencyForm").value;
  updatedTennis.otherfrequencyvalue = document.getElementById("otherFrequencyValueForm").value;
  updatedTennis.colour = document.getElementById("colourForm").value;
  updatedTennis.favplayer = document.getElementById("favPlayerForm").value;
  updatedTennis.competition = document.getElementById("competitionForm").value;
  updatedTennis.yes = document.getElementById("yesForm").value;
  
      $.ajax({
      type: 'POST',
      url: "/data/update",
      data: updatedTennis,
      cache: false,
      dataType : 'json',
      success: function (data) {
        console.log("success");
  window.location.href=/index";
      },
      error: function (xhr) {
        console.error("Error in post", xhr);
      },
      complete: function () {
        console.log("Complete");  
      }
    });
}