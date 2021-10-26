var catArr = new Array(); //to store category object
var anmlArr = new Array(); //to store animal objects
var meArr = new Array(); //to store personal info as object

//to store personal info
var fName; 
var lName;
var id; 
var user;  
var program;  
var hCountry;

//to build category objects, and store in catArr
class Categories {
  constructor(catType, logo) {
  this.catType = catType;
  this.logo = logo;
  }
} //Categories ends here

//to build animal objects, and store in anmlArr
class Animal {
  constructor(animal, category, scientific, colors, photoDepiction) {
    this.animal = animal;
    this.category = category;
    this.scientific = scientific;
    this.colors = colors;
    this.photoDepiction = photoDepiction;
  }
} //CourseCode ends here

//to store my personal info, and store in meArr
class Me {
  constructor(fName, lName, id, user, program, hCountry) {
    this.fName = fName;
    this.lName = lName;
    this.id = id;
    this.user = user;
    this.program = program;
    this.hCountry = hCountry;
  }
}//me ends here


//-------------------- //jQuery doc ready starts here -------------------
$(document).ready(function() { 
  //ajax call to load JSON
  $.ajax({
    type: "GET", url: "data/A2-JSON.json",
    dataType: "json", success: loadData
  }); //end of ajax
}); // end of doc ready

//load variables, push var into arrays for storage, and load page content
function loadData(data) { 
  //set and store personal details for easy access
  fName = data.A2Personal.FirstName;
  lName = data.A2Personal.LastName;
  id = data.A2Personal.StudentID;
  user = data.A2Personal.UserName;
  program = data.A2Personal.Program;
  hCountry = data.A2Personal.HomeCountry;

  //store personal details as new object in array for easy access and transfer
  meArr.push(new Me(fName, lName, id, user, program, hCountry));
  
  //store category type and logo
  for (let x of data.Categories) {
    catArr.push(new Categories(x.cattype, x.logo));
  };
  
  //store animal name, category, scientific info, colors, and photo
  for (let x of data.AnimalDetails) {
    anmlArr.push(new Animal(x.animal, x.category, x.scientific, 
      x.colors, x.photoDepiction));
  }
  
  //call functions to build header, body, footer
  buildHeader();
  buildBody();
  buildFooter();

}; //end of loadData


function buildHeader() {
  $("#header").html(
    `
    A2 / ${fName} ${lName} / ${id} / ${user}<hr>
    `
  );
   $("#header").addClass("top");
};

//build page body
function buildBody() {
  $("#contentHeader").html(//body header
    `
      <h4>Pick a category for more information</h4>
    `
  );

  $("#contentHeader").addClass("cHeader"); //add class for css to header

  //building body buttons
  for (x=0; x < catArr.length; x++) {
		$("#btns").append(
			`
      <li id='${x}'>
        <a href='pages/next.html' >
						${catArr[x].catType}
        </a>
      </li> 
			`
		); 
	}
 
  $("#btns").addClass("buttons"); //add class for css to btns

  //build body images
  for (let x of catArr) {
    $("#imgs").append(
      `
        <img src='images/${x.logo}' width='100px' height='30px'><br>
      `
    )};
    $("#imgs").addClass("imgs"); //add clas for css to imgs
};

//build footer
function buildFooter() {
  $("#footer").html(
    `
    <hr>
    My Sheridan Program: <em>${program}</em> <br>
    My Home Country: <em>${hCountry}</em>
    `
  );
  $("#footer").addClass("bottom");
};

// Save data to local storage
$(document).on("click", "#btns> li", function() { //get closest <li> clicked
	localStorage.setItem(
		"rowID",
		$(this).closest("li").attr("id")
		);
    //storing personal details in array as object for easy access
  localStorage.setItem("meArr", JSON.stringify(meArr)); //to store personal details
  localStorage.setItem("catArr", JSON.stringify(catArr)); //to store categories
  localStorage.setItem("anmlArr", JSON.stringify(anmlArr)); //to store animal details
});

 

 
  
  
