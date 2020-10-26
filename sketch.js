//Create variables here
var welcometext;
var email;
var password;
var underline;
var submitButton;

var dataCount = 0;
var dataCountRef;

var database;
function preload() {
  //load images here
}

function setup() {
  database = firebase.database();
  console.log(database);
  noCanvas();

  welcometext = createElement("h1");
  welcometext.html("Log In With Swayam");
  welcometext.position(width / 2 + 450, height / 2);
  welcometext.style("font-size", "40px");
  welcometext.style("font-family", "helvetica");
  welcometext.style("color", "white");

  email = createInput("email pls!", "email");
  email.position(width / 2 + 450, height / 2 + 100);
  email.style("font-size", "18px");
  email.style("text-font", "helvetica");
  email.style("border-radius", "20px");
  email.style("background-color", "transparent");
  email.style("color", "white");
  email.style("border-color", "purple");
  email.size(300, 20);
  email.style("outline", "none");
  email.style("padding", "10px");

  password = createInput("password", "password");
  password.position(width / 2 + 450, height / 2 + 170);
  password.style("font-size", "18px");
  password.style("text-font", "helvetica");
  password.style("border-radius", "20px");
  password.style("background-color", "transparent");
  password.style("color", "white");
  password.style("border-color", "purple");
  password.size(300, 20);
  password.style("outline", "none");
  password.style("padding", "10px");

  submitButton = createButton("Submit");
  submitButton.position(width / 2 + 450, height / 2 + 250);
  submitButton.size(120, 40);
  submitButton.style("text-align", "center");
  submitButton.style("text-font", "helvetica");
  submitButton.style("background-color", "transparent");
  submitButton.style("border-radius", "15px");
  submitButton.style("border-color", "cyan");
  submitButton.style("color", "white");
  submitButton.style("font-size", "20px");
  submitButton.style("outline", "none");
  submitButton.mouseOver(onTop).mouseOut(outSide);

  dataCountRef = database.ref("dataCount");
  dataCountRef.on("value", (data) => {
    dataCount = data.val();
  });

  submitButton.mousePressed(() => {
    UpdateUserData();
    dataCount++;
    database.ref("/").update({
      dataCount: dataCount,
    });
  });
}

function draw() {
  drawSprites();
  //add styles here
}

function onTop() {
  submitButton.style("background-color", "cyan");
  submitButton.style("color", "black");
}
function outSide() {
  submitButton.style("background-color", "transparent");
  submitButton.style("color", "white");
}

function UpdateUserData() {
  var userIndex = "accounts/data";
  var playerIndexRef = database.ref(userIndex);

  var userData = {
    email: email.value(),
    password: password.value(),
  };

  playerIndexRef.push(userData);
  console.log(userData);
}
