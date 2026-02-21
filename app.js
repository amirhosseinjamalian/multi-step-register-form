const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");

const alertName = document.getElementById("alertName");
const alertAge = document.getElementById("alertAge");
const alertAddress = document.getElementById("alertAddress");
const alertCity = document.getElementById("alertCity");

function showStep(step) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step) => (step.style.display = "none"));
  document.getElementById("step" + step).style.display = "block";
}

showStep(1);

function nextStep(step) {
  if (step === 2) {
    sessionStorage.setItem("name", nameInput.value);
    sessionStorage.setItem("age", ageInput.value);
  } else if (step === 3) {
    sessionStorage.setItem("address", addressInput.value);
    sessionStorage.setItem("city", cityInput.value);
    updateInfo();
  }
  showStep(step);
}

function updateInfo() {
  document.getElementById("confirmName").textContent =
    sessionStorage.getItem("name");
  document.getElementById("confirmAge").textContent =
    sessionStorage.getItem("age");
  document.getElementById("confirmAddress").textContent =
    sessionStorage.getItem("address");
  document.getElementById("confirmCity").textContent =
    sessionStorage.getItem("city");
}

function errorBorder(input) {
  input.classList.add("error_border");
  input.classList.remove("success_border");
}

function successBorder(input) {
  input.classList.remove("error_border");
  input.classList.add("success_border");
}

let nameScore = false;
let ageScore = false;
let addressScore = false;
let cityScore = false;

function checkName() {
  if (nameInput.value.length === 0) {
    alertName.textContent = "مقدار نمی تواند خالی باشد";
    errorBorder(nameInput);
    nameScore = false;
  } else {
    if (nameInput.value.length >= 3) {
      alertName.innerHTML = "&nbsp";
      successBorder(nameInput);
      nameScore = true;
    } else {
      alertName.textContent = "تعداد حروف باید بیشتر از 3 کارکتر باشد";
      errorBorder(nameInput);
      nameScore = false;
    }
  }
}

function checkAge() {
  if (ageInput.value > 0 && ageInput.value < 130) {
    alertAge.innerHTML = "&nbsp";
    successBorder(ageInput);
    ageScore = true;
  } else {
    alertAge.textContent = "مقدار وارد شده نامعتبر است";
    errorBorder(ageInput);
    ageScore = false;
  }
}

function checkAddress() {
  if (addressInput.value.length >= 3) {
    alertAddress.innerHTML = "&nbsp";
    successBorder(addressInput);
    addressScore = true;
  } else {
    alertAddress.textContent = "مقدار وارد شده نامعتبر است";
    errorBorder(addressInput);
    addressScore = false;
  }
}

function checkCity() {
  if (cityInput.value.length >= 3) {
    alertCity.innerHTML = "&nbsp";
    successBorder(cityInput);
    cityScore = true;
  } else {
    alertCity.textContent = "مقدار وارد شده نامعتبر است";
    errorBorder(cityInput);
    cityScore = false;
  }
}

// ----------input-typing--------------

nameInput.addEventListener("input", checkName);

ageInput.addEventListener("input", checkAge);

addressInput.addEventListener("input", checkAddress);

cityInput.addEventListener("input", checkCity);

// -------buttons-----------

document.getElementById("step2Btn").addEventListener("click", () => {
  if (nameScore && ageScore) {
    nextStep(2);
  } else {
    if (!nameScore) errorBorder(nameInput);
    if (!ageScore) errorBorder(ageInput);
  }
});

document.getElementById("step3Btn").addEventListener("click", () => {
  if (addressScore && cityScore) {
    nextStep(3);
  } else {
    if (!addressScore) errorBorder(addressInput);
    if (!cityScore) errorBorder(cityInput);
  }
});

window.addEventListener("load", () => {
  if (sessionStorage.getItem("name")) {
    nameInput.value = sessionStorage.getItem("name");
    checkName();
  }
  if (sessionStorage.getItem("age")) {
    ageInput.value = sessionStorage.getItem("age");
    checkAge();
  }
  if (sessionStorage.getItem("address")) {
    addressInput.value = sessionStorage.getItem("address");
    checkAddress();
  }
  if (sessionStorage.getItem("city")) {
    cityInput.value = sessionStorage.getItem("city");
    checkCity();
  }
});

submitBtn.addEventListener("click", () => {
  if (confirm("آیا اطلاعات خود را تایید می کنید؟")) {
    sessionStorage.clear();
    showStep(1);
    alert("ثبت نام شما با موفقیت انجام شد");
    location.reload();
  } else {
    alert("ثبت نام ناموفق مجددا تلاش کنید یا با پشتیبانی تماس حاصل فرمایید");
  }
});
