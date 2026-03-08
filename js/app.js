const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

const spinner = document.getElementById("spinner");

/* ------------------ Spinner ------------------ */

function showSpinner() {
  spinner.classList.remove("hidden");
}

function hideSpinner() {
  spinner.classList.add("hidden");
}

/* ------------------ Load Issues ------------------ */

async function loadIssues() {
  showSpinner();

  const res = await fetch(API);
  const data = await res.json();

  allIssues = data.data;

  displayIssues(allIssues);

  hideSpinner();
}

/* ------------------ Filter Issues ------------------ */

function filterIssues(status, btn) {
  showSpinner();

  document
    .querySelectorAll(".tabs button")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");

  setTimeout(() => {
    if (status === "all") {
      displayIssues(allIssues);
    } else {
      const filtered = allIssues.filter((issue) => issue.status === status);
      displayIssues(filtered);
    }

    hideSpinner();
  }, 300);
}
