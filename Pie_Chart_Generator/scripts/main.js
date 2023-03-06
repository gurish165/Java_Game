// This is the main JavaScript file for the app

function sayHello() {
    console.log("Hello, world!");
  }
  
var colors = [];
let sections = [];

function createPieChart() {
  sections = [];

  // loop through each field div
  const fieldList = document.getElementById("field-list");
  const fields = fieldList.children;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const color = field.querySelector(".pieColor").style.backgroundColor;
    const text = field.querySelector(".pieText").innerText;
    const percentage = field.querySelector(".piePercentage").innerText.replace("%", "");
    sections.push({ color, text, percentage: parseInt(percentage) });
  }

  drawPieChart(sections);
}

function drawPieChart() {
  const canvas = document.getElementById("pie-chart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;

  ctx.clearRect(0, 0, width, height);

  let startAngle = 0;
  let endAngle = 0;

  sections.forEach((section) => {
    const sectionAngle = (section.percentage / 100) * 2 * Math.PI;
    endAngle = startAngle + sectionAngle;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = section.color;
    ctx.fill();

    startAngle = endAngle;
  });
}

let totalPercentage = 0;

function addField() {
  const color = document.getElementById("color-field").value;
  const name = document.getElementById("text-field").value;
  const percentage = document.getElementById("percentage-field").value;

  // check if input is valid
  if (color === "" || name === "" || percentage === "") {
    alert("Please fill in all fields.");
    return;
  }

  const percentageInt = parseInt(percentage);

  // check if percentage is valid
  if (isNaN(percentageInt) || percentageInt <= 0 || percentageInt + totalPercentage > 100) {
    alert("Please enter a valid percentage.");
    return;
  }
  if (percentageInt + totalPercentage > 100){
    alert("Pie chart segments must be less than 100");
    return;
  }

  const pieChart = document.getElementById("pie-chart");

  // create new section div
  const section = document.createElement("div");
  section.className = "section";
  section.style.backgroundColor = color;
  section.style.backgroundImage = `conic-gradient(${color} 0% ${percentageInt}%, rgba(0,0,0,0) ${percentageInt}% 100%)`;

  // add new section to pie chart
  pieChart.appendChild(section);

  // create new field div
  const field = document.createElement("div");
  field.className = "field";
  
  // create field content
  const fieldName = document.createElement("p");
  fieldName.className = "pieText"
  fieldName.innerText = name;
  field.appendChild(fieldName);

  const fieldPercentage = document.createElement("p");
  fieldPercentage.className = "piePercentage"
  fieldPercentage.innerText = percentage + "%";
  field.appendChild(fieldPercentage);

  const pieColor = document.createElement("div");
  pieColor.className = "pieColor";
  pieColor.style.backgroundColor = color;
  pieColor.style.height = "50px";
  pieColor.style.width = "50px";
  field.appendChild(pieColor);

  // create delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "x";
  deleteButton.addEventListener("click", () => {
    pieChart.removeChild(section);
    field.parentNode.removeChild(field);
    totalPercentage -= percentageInt;
  });
  field.appendChild(deleteButton);

  // add new field to list
  const fieldList = document.getElementById("field-list");
  fieldList.appendChild(field);

  // update total percentage and clear input fields
  totalPercentage += percentageInt;
  document.getElementById("color-field").value = "#000000";
  document.getElementById("text-field").value = "";
  document.getElementById("percentage-field").value = "";

  // update pie chart
  createPieChart();
}


sayHello();