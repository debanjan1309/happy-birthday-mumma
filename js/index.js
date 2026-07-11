"use strict";

/* ===========================
   DOM Elements
=========================== */

const happyContainer = document.querySelector(".happy__content");
const countdownContainer = document.querySelector(".countdown__content");
const settingIcon = document.querySelector(".setting-icon");
const modalBox = document.querySelector(".content-modalbox");

const birthdayInput = document.querySelector(".birthday__input");
const submitBtn = document.querySelector(".submit-btn__input--style");

const subline = document.querySelector(".subline h2");

const dayEl = document.querySelector(".days");
const hourEl = document.querySelector(".hours");
const minuteEl = document.querySelector(".minutes");
const secondEl = document.querySelector(".seconds");

/* ===========================
   Variables
=========================== */

const MONTHS = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];

let birthday = "";
let distanceOfTime = 0;

/* Default Birthday */
setBirthday("17", "July");

/* ===========================
   Event Listeners
=========================== */

settingIcon.addEventListener("click", () => {
    modalBox.style.display =
        getComputedStyle(modalBox).display === "none"
            ? "flex"
            : "none";

    birthdayInput.focus();
});

submitBtn.addEventListener("click", submitDate);

birthdayInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        submitDate();
    }
});

/* ===========================
   Countdown
=========================== */

setInterval(updateCountdown, 1000);
updateCountdown();

/* ===========================
   Functions
=========================== */

function submitDate() {

    const value = birthdayInput.value.trim();

    if (value === "") {
        alert("Please enter your birthday.");
        return;
    }

    const parts = value.split(" ");

    if (parts.length < 2) {
        alert("Use format: 13 July 2003");
        return;
    }

    const day = Number(parts[0]);
    const month = parts[1];

    if (isNaN(day) || day < 1 || day > 31) {
        alert("Invalid day.");
        return;
    }

    if (!MONTHS.includes(month.toLowerCase())) {
        alert("Invalid month.");
        return;
    }

    setBirthday(day, month);

    modalBox.style.display = "none";
}

function setBirthday(day, month) {

    const today = new Date();

    let year = today.getFullYear();

    const birthdayThisYear = new Date(`${day} ${month} ${year}`);

    if (birthdayThisYear < today) {
        year++;
    }

    birthday = `${day} ${month} ${year} 00:00:00`;

    subline.textContent = `From this day until ${day} ${month} ${year}`;
}

function updateCountdown() {

    const target = new Date(birthday).getTime();
    const now = Date.now();

    distanceOfTime = target - now;

    if (distanceOfTime <= 0) {

        countdownContainer.style.display = "none";
        happyContainer.style.display = "block";

        return;
    }

    countdownContainer.style.display = "block";
    happyContainer.style.display = "none";

    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;

    dayEl.textContent = Math.floor(distanceOfTime / days);

    hourEl.textContent = Math.floor(
        (distanceOfTime % days) / hours
    );

    minuteEl.textContent = Math.floor(
        (distanceOfTime % hours) / minutes
    );

    secondEl.textContent = Math.floor(
        (distanceOfTime % minutes) / seconds
    );
}
