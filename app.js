const root = document.documentElement;
const hueInput = document.getElementById("hue-inp");
const saturationInput = document.getElementById("saturation-inp");
const hueOutput = document.getElementById("hue-output");
const saturationOutput = document.getElementById("saturation-output");
const createPresetButton = document.getElementById("create-preset-container");
const showCode = document.querySelectorAll(".show-code");
const showCodeContainer = document.getElementById("show-code-container");
const showCodeDialog = document.getElementById("show-code-dialog");
const hueText = document.querySelectorAll(".hue");
const saturationText = document.querySelectorAll(".saturation");
const closer = document.querySelector("#closer");
const presetHandler = document.getElementById("preset-handler");
const deletePreset = document.querySelectorAll(".delete-preset");
const lightModeButton = document.getElementById("light-mode");
const primarySaturationText = document.querySelectorAll(".primary-saturation");
const secondaryHueText = document.querySelectorAll(".secondary-hue");

let presetNumber = 0;

let hueHandler = [];
let saturationHandler = [];

function colorChanger() {
  root.style.setProperty("--hue", hueInput.value);
  hueOutput.textContent = hueInput.value;
  root.style.setProperty("--saturation", saturationInput.value + "%");
  saturationOutput.textContent = saturationInput.value;
  const primarySaturationValue = saturationInput.valueAsNumber + 30;
  root.style.setProperty("--primary-saturation", primarySaturationValue + "%");
  if (hueInput.valueAsNumber > 180) {
    const secondaryHueValue = hueInput.valueAsNumber - 180;
    root.style.setProperty("--secondary-hue", secondaryHueValue);
  } else {
    const secondaryHueValue = hueInput.valueAsNumber + 180;
    root.style.setProperty("--secondary-hue", secondaryHueValue);
  }
}

function codeShower(event) {
  showCodeContainer.style.display = "block";
  showCodeContainer.style.backgroundColor = "hsla(0, 0%, 0%, 0.5)";
  const n = Array.from(presetHandler.children);
  const targetElement = event.target.parentElement.parentElement;
  for (let i of hueText) {
    i.textContent = hueHandler[n.indexOf(targetElement)];
  }
  for (let i of saturationText) {
    i.textContent = saturationHandler[n.indexOf(targetElement)] + "%";
  }
  for (let i of primarySaturationText) {
    const primarySaturationNumber =
      parseInt(saturationHandler[n.indexOf(targetElement)]) + 30 + "%";
    i.textContent = primarySaturationNumber;
  }
  if (parseInt(hueHandler[n.indexOf(targetElement)]) > 180) {
    for (let i of secondaryHueText) {
      const secondaryHueNumber =
        parseInt(hueHandler[n.indexOf(targetElement)]) - 180;
      i.textContent = secondaryHueNumber;
    }
  } else {
    for (let i of secondaryHueText) {
      const secondaryHueNumber =
        parseInt(hueHandler[n.indexOf(targetElement)]) + 180;
      i.textContent = secondaryHueNumber;
    }
  }
}

function codeCloser() {
  showCodeContainer.style.display = "none";
}

function presetCreator() {
  if (presetHandler.children.length < 7) {
    presetNumber++;
    const presetContainer = document.createElement("li");
    presetContainer.innerHTML =
      "<h3>Preset " +
      presetNumber +
      "</h3>" +
      '<div class="button-container">' +
      '<button class="show-code">Show code</button>' +
      '<button class="delete-preset">Delete preset</button>' +
      "</div>";
    presetContainer.classList.add("preset-container");
    presetHandler.appendChild(presetContainer);
    presetContainer.children[1].children[0].addEventListener(
      "click",
      codeShower
    );
    presetContainer.children[1].children[1].addEventListener(
      "click",
      presetDeleter
    );
    hueHandler.push(hueInput.value);
    saturationHandler.push(saturationInput.value);
  } else {
    alert("imposible to create a preset, please delete any");
  }
}

function presetDeleter(event) {
  const targetElement = event.target.parentElement.parentElement;
  const i = Array.from(presetHandler.children);
  const index = i.indexOf(targetElement);
  hueHandler.splice(index, 1);
  saturationHandler.splice(index, 1);
  presetNumber--;
  event.target.parentElement.parentElement.remove();
}

function lightModeChanger() {
  if (root.classList.contains("light")) {
    root.classList.remove("light");
  } else {
    root.classList.add("light");
  }
}

colorChanger();

hueInput.addEventListener("input", colorChanger);
saturationInput.addEventListener("input", colorChanger);

for (i of showCode) {
  i.addEventListener("click", codeShower);
}
for (i of deletePreset) {
  i.addEventListener("click", presetDeleter);
}
closer.addEventListener("click", codeCloser);
createPresetButton.addEventListener("click", presetCreator);
lightModeButton.addEventListener("click", lightModeChanger);
