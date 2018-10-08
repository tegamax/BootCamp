// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $searchBtn1 = document.querySelector("#search1");
var $searchBtn2 = document.querySelector("#search2");
var $searchBtn3 = document.querySelector("#search3");
var $searchBtn4 = document.querySelector("#search4");


// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);
$searchBtn1.addEventListener("click", handleSearchButtonClick1);
$searchBtn2.addEventListener("click", handleSearchButtonClick2);
$searchBtn3.addEventListener("click", handleSearchButtonClick3);
$searchBtn4.addEventListener("click", handleSearchButtonClick4);


// Set filteredUFO to dataSet initially
var filteredUFO= dataSet; 

// renderTable renders the filteredUFO to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredUFO.length; i++) {
    // Get get the current UFO object and its fields
    var ufo = filteredUFO[i];
    var observations = Object.keys(ufo);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < observations.length; j++) {
      // For every observations in the ufo object, create a new cell at set its inner text to be the current value at the current     ufo'sobservation
      var observation = observations[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = ufo[observation];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDate = $dateInput.value.trim();  
  // Set filteredUFOs to an array of all ufos whose "date" matches the filter
  filteredUFO = dataSet.filter(function(ufo) {
    var ufoDate = ufo.datetime.toLowerCase();

    // If true, add the date to the filteredUFO, otherwise don't add it to filteredUFO
    return ufoDate === filterDate;
  });

  $(document).ready(function () {
    var firstRecord = 0;
    var rowSize = 50;
    var tableRows=$("#pagetable tbody tr");
    $("a.pagination").click(function(e){
      e.preventDefault();
      if ($(this).attr("id") == "next"){
            if (firstRecord + rowSize <= tableRows.length){ 
                firstRecord += rowSize;}
            } else {
            if (firstRecord!= 0)
             { firstRecord  -= rowSize;}
            }
         paginate(firstRecord, rowSize);
       });
      
     var paginate =function(startAt, rowSize){
       var endAt=startAt + rowSize - 1;
         $(tableRows).each(function(index){
           if (index >= startAt && index <= endAt){
             $(this).show();
           } else{
             $(this).hide();
           }
         });
     }
     paginate(firstRecord, rowSize);
  });

  renderTable();


}

function handleSearchButtonClick1() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
 
  var filterCity = $cityInput.value.trim().toLowerCase();

  // Set filteredUFOs to an array of all ufos whose "city" matches the filter
  filteredUFO = dataSet.filter(function(ufo) {
    var ufoCity = ufo.city.toLowerCase();

    // If true, add the city to the filteredUFO, otherwise don't add it to filteredUFO
    return ufoCity === filterCity;
  });

  $(document).ready(function () {
    var firstRecord = 0;
    var rowSize = 50;
    var tableRows=$("#pagetable tbody tr");
    $("a.pagination").click(function(e){
      e.preventDefault();
      if ($(this).attr("id") == "next"){
            if (firstRecord + rowSize <= tableRows.length){ 
                firstRecord += rowSize;}
            } else {
            if (firstRecord!= 0)
             { firstRecord  -= rowSize;}
            }
         paginate(firstRecord, rowSize);
       });
      
     var paginate =function(startAt, rowSize){
       var endAt=startAt + rowSize - 1;
         $(tableRows).each(function(index){
           if (index >= startAt && index <= endAt){
             $(this).show();
           } else{
             $(this).hide();
           }
         });
     }
     paginate(firstRecord, rowSize);
  });

  
  renderTable();
}

function handleSearchButtonClick2() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
 
  var filterState = $stateInput.value.trim().toLowerCase();

  // Set filteredUFOs to an array of all ufos whose "state" matches the filter
  filteredUFO = dataSet.filter(function(ufo) {
    var ufoState = ufo.state.toLowerCase();

    // If true, add the state to the filteredUFO, otherwise don't add it to filteredUFO
    return ufoState === filterState;
  });

  $(document).ready(function () {
    var firstRecord = 0;
    var rowSize = 50;
    var tableRows=$("#pagetable tbody tr");
    $("a.pagination").click(function(e){
      e.preventDefault();
      if ($(this).attr("id") == "next"){
            if (firstRecord + rowSize <= tableRows.length){ 
                firstRecord += rowSize;}
            } else {
            if (firstRecord!= 0)
             { firstRecord  -= rowSize;}
            }
         paginate(firstRecord, rowSize);
       });
      
     var paginate =function(startAt, rowSize){
       var endAt=startAt + rowSize - 1;
         $(tableRows).each(function(index){
           if (index >= startAt && index <= endAt){
             $(this).show();
           } else{
             $(this).hide();
           }
         });
     }
     paginate(firstRecord, rowSize);
  });

  renderTable();
}

function handleSearchButtonClick3() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
 
  var filterCountry = $countryInput.value.trim().toLowerCase();

  // Set filteredUFOs to an array of all ufos whose "country" matches the filter
  filteredUFO = dataSet.filter(function(ufo) {
    var ufoCountry = ufo.country.toLowerCase();

    // If true, add the country to the filteredUFO, otherwise don't add it to filteredUFO
    return ufoCountry === filterCountry;
  });

  $(document).ready(function () {
    var firstRecord = 0;
    var rowSize = 50;
    var tableRows=$("#pagetable tbody tr");
    $("a.pagination").click(function(e){
      e.preventDefault();
      if ($(this).attr("id") == "next"){
            if (firstRecord + rowSize <= tableRows.length){ 
                firstRecord += rowSize;}
            } else {
            if (firstRecord!= 0)
             { firstRecord  -= rowSize;}
            }
         paginate(firstRecord, rowSize);
       });
      
     var paginate =function(startAt, rowSize){
       var endAt=startAt + rowSize - 1;
         $(tableRows).each(function(index){
           if (index >= startAt && index <= endAt){
             $(this).show();
           } else{
             $(this).hide();
           }
         });
     }
     paginate(firstRecord, rowSize);
  });

  renderTable();
}

function handleSearchButtonClick4() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
 
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredUFOs to an array of all ufos whose "shape" matches the filter
  filteredUFO = dataSet.filter(function(ufo) {
    var ufoShape = ufo.shape.toLowerCase();

    // If true, add the shape to the filteredUFO, otherwise don't add it to filteredUFO
    return ufoShape === filterShape;
  });

  $(document).ready(function () {
    var firstRecord = 0;
    var rowSize = 50;
    var tableRows=$("#pagetable tbody tr");
    $("a.pagination").click(function(e){
      e.preventDefault();
      if ($(this).attr("id") == "next"){
            if (firstRecord + rowSize <= tableRows.length){ 
                firstRecord += rowSize;}
            } else {
            if (firstRecord!= 0)
             { firstRecord  -= rowSize;}
            }
         paginate(firstRecord, rowSize);
       });
      
     var paginate =function(startAt, rowSize){
       var endAt=startAt + rowSize - 1;
         $(tableRows).each(function(index){
           if (index >= startAt && index <= endAt){
             $(this).show();
           } else{
             $(this).hide();
           }
         });
     }
     paginate(firstRecord, rowSize);
  });

  renderTable();
}

// Render the table for the first time on page load
renderTable();
