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
/* ------------------ Display Issues ------------------ */

function displayIssues(issues) {
  const container = document.getElementById("issuesContainer");
  container.innerHTML = "";

  document.getElementById("issueCount").innerText = issues.length;

  issues.forEach((issue) => {
    const card = document.createElement("div");
    card.classList.add("issue-card", issue.status);

    /* ---------- Dynamic Labels ---------- */

    let labelsHTML = issue.labels
      .map((label) => {
        const className = label.replace(/\s+/g, "-");

        return `<span class="label ${className}">
              ${label.toUpperCase()}
            </span>`;

        /* ---------- Card HTML ---------- */
      })
      .join("");
    card.innerHTML = `
  
    <div class="top">

    <img class="status-icon" src="${
      issue.status === "open"
        ? "./assets/Open-Status.png"
        : "./assets/Closed- Status .png"
    }">
  
    <div class="priority ${issue.priority}">
      ${issue.priority.toUpperCase()}
    </div>
  
  </div>
  
  <h4 class='issue-title'>${issue.title}</h4>
  
  <p class='issue-description'>${issue.description.slice(0, 70)}...</p>
  
  <div class="labels">
  
    ${labelsHTML}
  
  </div>
  
  <div class="footer">
  
    <span># by ${issue.author}</span>
  
    <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
  
  </div>
  
  `;

    card.onclick = () => openModal(issue.id);

    container.appendChild(card);
  });
}
/* ------------------ Search Issue ------------------ */

async function searchIssue() {
  showSpinner();

  const text = document.getElementById("searchInput").value;

  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );

  const data = await res.json();

  displayIssues(data.data);

  hideSpinner();
}
/* ------------------ Modal ------------------ */

async function openModal(id) {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );

  const data = await res.json();
  const issue = data.data;

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("status-dyn").innerHTML = `
<img class="status-icon" src="${
    issue.status === "open"
      ? "./assets/Open-Status.png"
      : "./assets/Closed- Status .png"
  }">
`;

  document.getElementById("modalDesc").innerText = issue.description;

  document.getElementById("modalAuthor").innerText =
    " •  Opened by " + issue.author;

  document.getElementById("modalDate").innerText =
    " • " + new Date(issue.createdAt).toLocaleDateString();

  document.getElementById("modalPriority").innerHTML =
    // issue.priority.toUpperCase();
    `<div class="priority ${issue.priority}">
    ${issue.priority.toUpperCase()}
  </div>`;

  document.getElementById("modalAssignee").innerText = issue.author;

  /* ---------- Dynamic Labels ---------- */

  let labelsHTML = issue.labels
    .map((label) => {
      const className = label.replace(/\s+/g, "-");

      return `<span class="label ${className}">
                  ${label.toUpperCase()}
                </span>`;
    })
    .join("");

  document.getElementById("modalLabels").innerHTML = labelsHTML;

  document.getElementById("modal").classList.remove("hidden");
}

/* ------------------ Close Modal ------------------ */

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

/* ------------------ Start ------------------ */

loadIssues();
