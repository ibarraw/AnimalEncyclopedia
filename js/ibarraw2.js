var catArr = new Array(); //to get category objects
var anmlArr = new Array(); //to get animal objects
var meArr = new Array(); //to get personal info as object

var rowID; //to store row ID of closest <li>


//Categories: catType, logo
//Animal: animal, category, scientific, colors, photoDepiction
//Me: fName, lName, id, user, program, hCountry
$(document).ready(function() { 
  rowID = localStorage.getItem("rowID"); //get row ID of closest <li>
  catArr = JSON.parse(localStorage.getItem("catArr")); //change back into object
  anmlArr = JSON.parse(localStorage.getItem("anmlArr")); //change back into object
  meArr = JSON.parse(localStorage.getItem("meArr")); //change page into object

  //calls to build page header, body, footer
  buildHeader();
  buildBody();
  buildFooter();
}); // end of doc ready

//build page header
function buildHeader() {
  $("#header").html(
    `
    A2 / ${meArr[0].fName} ${meArr[0].lName} / ${meArr[0].id} / ${meArr[0].user}
    <hr>
    `
  );
    $("#header").addClass("header");
}; //buildHeader ends
  

//build page body
function buildBody() {
  
  $("#list").html(  //build button and category header
    `
    <br>
    <a href='../index.html'>
      <button id="button1"><img src='../images/back.png' width=20px'>
        </img>Go Back!
      </button>
      </a>
      <h4><em>Animals from the ${catArr[rowID].catType} category</em></h4>
      
    `
  );

  $("#list").addClass("list"); //add #list to class 'list'

//display animal name, scientific info, colors, and photo
  for (let i = 0; i < anmlArr.length; i++) {
    if (anmlArr[i].category == catArr[rowID].catType) {
      $("#list").append(
        `
        <p>
        <strong>Name: ${anmlArr[i].animal}</strong> with scientific name of
       <em>${anmlArr[i].scientific}</em> and colors of: <em>${anmlArr[i].colors}</em><br>
        <img src='${anmlArr[i].photoDepiction}' width='100px' height='70px'></img><br>
        </p>
        
        `
          );
    };
  };

}; //buildBody ends
  
//build page footer
function buildFooter() {
  $("#footer").html(
    `
    <hr>
    My Sheridan Program: <em>${meArr[0].program}</em><br>
    My Home Country: <em>${meArr[0].hCountry}</em>
    `
  );
  $("#footer").addClass("bottom");
}; //buildFooter ends

 

