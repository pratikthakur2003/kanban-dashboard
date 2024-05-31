// All Initializations

const mode = document.getElementById("toggle");
const modeText = document.getElementById("toggle-text");
const modeLogo = document.getElementById("mode-logo");

const overlay = document.getElementById("overlay");

const summaryOption = document.getElementById("summary");
const summaryModal = document.getElementById("summary-modal");
const summaryClose = document.getElementById("summary-close");

const servingsOption = document.getElementById("servings");
const servingsModal = document.getElementById("servings-modal");
const servingsClose = document.getElementById("servings-close");
const currentServings = document.getElementById("current-servings");
const newServings = document.getElementById("new-servings");
const updateServings = document.getElementById("update-servings");
const saveServings = document.getElementById("save-servings");

const timerOption = document.getElementById("timer");
const timerModal = document.getElementById("timer-modal");
const timerClose = document.getElementById("timer-close");
const hrsInput = document.getElementById("set-hours");
const minsInput = document.getElementById("set-mins");
const secsInput = document.getElementById("set-secs");
const hrs = document.getElementById("hrs");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const setBtn = document.getElementById("set-btn");
const startStopBtn = document.getElementById("start-stop-btn");
const clearBtn = document.getElementById("clear-btn");

const tipsOption = document.getElementById("tips");
const tipsModal = document.getElementById("tips-modal");
const tipsClose = document.getElementById("tips-close");

const logoutOption = document.getElementById("logout");
const logoutModal = document.getElementById("logout-modal");
const logoutClose = document.getElementById("go-back");

const sidebarBtn = document.getElementById("menuButton");
const sidebar = document.querySelector(".utility-section");
const sidebarCloseBtn = document.getElementById("close-btn");
const modals = document.querySelectorAll(".modal");

const allArrow = document.querySelectorAll(
  ".main-headings .material-icons-sharp"
);
const toDoArrow = document.getElementById("to-do-arrow");
const inProgressArrow = document.getElementById("in-progress-arrow");
const completedArrow = document.getElementById("completed-arrow");
const toDoSteps = document.querySelector(".to-do-steps");
const toDoContainer = document.querySelector(".to-do");
const inProgressSteps = document.querySelector(".in-progress-steps");
const inProgressContainer = document.querySelector(".in-progress");
const completedSteps = document.querySelector(".completed-steps");
const completedContainer = document.querySelector(".completed");

// Handling Resize of container with different Widths

function handleResize() {
  if (window.innerWidth > 775) {
    toDoSteps.style.display = "block";
    toDoContainer.style.maxHeight = "84vh";
    inProgressSteps.style.display = "block";
    inProgressContainer.style.maxHeight = "84vh";
    completedSteps.style.display = "block";
    completedContainer.style.maxHeight = "84vh";
  }
  if (window.innerWidth > 1024) {
    sidebar.style.display = "block";
  }
}

handleResize();

// API Calls

const API_KEY = "813e516c27d74126839ef7c0cba66482";
const query = "tomato";
let toDoList = [];
let inProgressList = [];
let completedList = [];

window.addEventListener("load", () => {
  getRecipe(query);
});

async function getRecipe(query) {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=20&addRecipeInformation=true`
  );
  const data = await res.json();
  const recipeName = document.querySelector(".recipe-name");
  if(data.status === "failure") alert("API Daily Limit Exceeded !!!");
  else {
    console.log("JSON RECIEVED");
    recipeName.innerHTML = `KANBAN DASHBOARD : <i>${data.results[0].title}</i>`;
    data.results[0].analyzedInstructions[0].steps.forEach((item) => {
      toDoList.push(item.step);
    });
    bindDataToDo(toDoList);
    setSummary(data.results[0]);
  }
  
}

toDoSteps.addEventListener("change", function (event) {
  const target = event.target;
  if (target.classList.contains("to-do-checkbox") && target.checked) {
    const text = target.nextElementSibling.textContent;
    const index = toDoList.indexOf(text);
    if (index !== -1) {
      toDoList.splice(index, 1);
      console.log(`Removed : ${text}`);
      console.log(toDoList);
      inProgressList.push(text);
      bindDataToDo(toDoList);
      bindDataInProgress(inProgressList);
    }
  }
});

inProgressSteps.addEventListener("change", function (event) {
  const target = event.target;
  if (target.classList.contains("in-progress-checkbox") && target.checked) {
    const text = target.nextElementSibling.textContent;
    const index = inProgressList.indexOf(text);
    if (index !== -1) {
      inProgressList.splice(index, 1);
      console.log(`Removed : ${text}`);
      console.log(inProgressList);
      completedList.push(text);
      bindDataInProgress(inProgressList);
      bindDataCompleted(completedList);
    }
  }
});

function bindDataToDo(toDoList) {
  const toDoTemplate = document.getElementById("template-to-do");
  toDoSteps.innerHTML = "";

  for (let i = 0; i < toDoList.length; i++) {
    const toDoClone = toDoTemplate.content.cloneNode(true);
    fillData(toDoClone, toDoList[i]);
    toDoSteps.appendChild(toDoClone);
  }
}

function bindDataInProgress(inProgressList) {
  const inProgressTemplate = document.getElementById("template-in-progress");
  inProgressSteps.innerHTML = "";

  for (let i = 0; i < inProgressList.length; i++) {
    const inProgressClone = inProgressTemplate.content.cloneNode(true);
    fillData(inProgressClone, inProgressList[i]);
    inProgressSteps.appendChild(inProgressClone);
  }
}

function bindDataCompleted(completedList) {
  const completedTemplate = document.getElementById("template-completed");
  completedSteps.innerHTML = "";

  for (let i = 0; i < completedList.length; i++) {
    const completedClone = completedTemplate.content.cloneNode(true);
    fillData(completedClone, completedList[i]);
    completedSteps.appendChild(completedClone);
  }
}

function fillData(toDoClone, str) {
  const itemStep = toDoClone.querySelector(".dynamic-heading");
  itemStep.innerHTML = str;
}

// Light & Dark Mode

mode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode-variables");

  if (document.body.classList.contains("dark-mode-variables")) {
    modeText.innerHTML = "Light Mode";
    modeLogo.innerHTML = "light_mode";
  } else {
    modeText.innerHTML = "Dark Mode";
    modeLogo.innerHTML = "dark_mode";
  }
});

// Overlay

function overlayOn() {
  overlay.style.opacity = 1;
  overlay.style.pointerEvents = "all";
}
function overlayOff() {
  overlay.style.opacity = 0;
  overlay.style.pointerEvents = "none";
}

// Options - Sumamry

summaryOption.addEventListener("click", () => {
  overlayOn();
  summaryModal.style.scale = 1;
});

summaryClose.addEventListener("click", () => {
  summaryModal.style.scale = 0;
  overlayOff();
});

function setSummary(data) {
  document.getElementById("recipe-name").innerHTML = data.title;
  let recipeType = '<ul style="list-style: none;">';
  for(let i=0; i < data.dishTypes.length; i++) {
    recipeType += `<li>${data.dishTypes[i]}</li>`
  }
  document.getElementById("recipe-type").innerHTML = recipeType;
  document.getElementById("recipe-time").innerHTML = `Approx. ${data.readyInMinutes} minutes`;
  document.getElementById("recipe-serve").innerHTML = data.servings;
  document.getElementById("recipe-price").innerHTML = `Rs. ${data.pricePerServing}`;
  document.getElementById("recipe-description").innerHTML = data.summary.trim();

}

// Options - Servings

servingsOption.addEventListener("click", () => {
  overlayOn();
  servingsModal.style.scale = 1;
});

servingsClose.addEventListener("click", () => {
  servingsModal.style.scale = 0;
  updateServings.style.scale = 0;
  updateServings.value = "";
  newServings.value = "";
  overlayOff();
});

saveServings.addEventListener("click", () => {
  const value = newServings.value;
  updateServings.style.scale = 1;
  if (value !== "") {
    if (value > 0) {
      currentServings.innerHTML = value;
      updateServings.innerHTML = "Value Updated";
      updateServings.style.backgroundColor = "rgb(109, 255, 109)";
    } else {
      updateServings.innerHTML = "Value must be greater than 0";
      updateServings.style.backgroundColor = "orange";
    }
  } else {
    updateServings.innerHTML = "Please Enter a value..!!!";
    updateServings.style.backgroundColor = "red";
  }
  newServings.value = "";
});

// Options - Timer

let interval = null;
let remainingSeconds = 0;

setBtn.addEventListener("click", () => {
  const HI = hrsInput.value === "" ? 0 : hrsInput.value;
  const MI = minsInput.value === "" ? 0 : minsInput.value;
  const SI = secsInput.value === "" ? 0 : secsInput.value;

  if (HI >= 0 && MI >= 0 && SI >= 0) {
    remainingSeconds = parseInt(HI) * 3600 + parseInt(MI) * 60 + parseInt(SI);  
    updateInterface();
  }
  hrsInput.value = "";
  minsInput.value = "";
  secsInput.value = "";
});

function updateControl() {
  if (interval === null) {
    startStopBtn.innerHTML = "START";
    startStopBtn.style.backgroundColor = "#21c6a8";
  } else {
    startStopBtn.innerHTML = "PAUSE";
    startStopBtn.style.backgroundColor = "#f4af47";
  }
}

function updateInterface() {
  const hour = Math.floor(remainingSeconds / 3600);
  const minute = Math.floor((remainingSeconds - hour * 3600) / 60);
  const second = remainingSeconds % 60;

  hrs.innerHTML = hour.toString().padStart(2, "0");
  mins.innerHTML = minute.toString().padStart(2, "0");
  secs.innerHTML = second.toString().padStart(2, "0");
}

function start() {
  if (remainingSeconds === 0) return;
  interval = setInterval(() => {
    remainingSeconds--;
    updateInterface();
    if (remainingSeconds === 0) {
      stop();
    }
  }, 1000);
  updateControl();
}

function stop() {
  clearInterval(interval);
  interval = null;
  updateControl();
}

startStopBtn.addEventListener("click", () => {
  if (interval === null) {
    start();
  } else {
    stop();
  }
});

clearBtn.addEventListener("click", () => {
  stop();
  remainingSeconds = 0;
  updateInterface();
});

timerOption.addEventListener("click", () => {
  overlayOn();
  timerModal.style.scale = 1;
});

timerClose.addEventListener("click", () => {
  timerModal.style.scale = 0;
  overlayOff();
  stop();
  remainingSeconds = 0;
  updateInterface();
});

// Options - Tips

tipsOption.addEventListener("click", () => {
  overlayOn();
  tipsModal.style.scale = 1;
});

tipsClose.addEventListener("click", () => {
  tipsModal.style.scale = 0;
  overlayOff();
});

// Options - Logout

logoutOption.addEventListener("click", () => {
  overlayOn();
  logoutModal.style.scale = 1;
});

logoutClose.addEventListener("click", () => {
  logoutModal.style.scale = 0;
  overlayOff();
});

// Sidebar Menu

sidebarBtn.addEventListener("click", () => {
  sidebar.style.display = "block";
  sidebar.style.zIndex = "2";
  overlay.style.zIndex = "3";
  modals.forEach((modal) => {
    modal.style.zIndex = "4";
  });
});

sidebarCloseBtn.addEventListener("click", () => {
  sidebar.style.display = "none";
});

window.addEventListener("resize", handleResize);

// Mobile View

toDoArrow.addEventListener("click", () => {
  if (window.getComputedStyle(toDoSteps).display === "block") {
    toDoContainer.style.maxHeight = "11vh";
    toDoSteps.style.display = "none";
  } else {
    toDoSteps.style.display = "block";
    toDoContainer.style.maxHeight = "84vh";
  }
});

inProgressArrow.addEventListener("click", () => {
  if (window.getComputedStyle(inProgressSteps).display === "block") {
    inProgressSteps.style.display = "none";
    inProgressContainer.style.maxHeight = "11vh";
  } else {
    inProgressSteps.style.display = "block";
    inProgressContainer.style.maxHeight = "84vh";
  }
});

completedArrow.addEventListener("click", () => {
  if (window.getComputedStyle(completedSteps).display === "block") {
    completedSteps.style.display = "none";
    completedContainer.style.maxHeight = "11vh";
  } else {
    completedSteps.style.display = "block";
    completedContainer.style.maxHeight = "84vh";
  }
});

