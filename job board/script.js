/* ===================================================
   HIRENEST JOB PORTAL
   Part 1 - Job Database & Local Storage
=================================================== */

// -----------------------------
// Default Job Data
// -----------------------------

const defaultJobs = [

{
id:1,

title:"Frontend Developer",

company:"GreenPixel Studio",

logo:"G",

location:"Bengaluru",

category:"Technology",

type:"Full-Time",

experience:"Mid",

salary:1200000,

salaryText:"₹12 LPA",

posted:"2 Days Ago",

description:"Build responsive web applications using HTML, CSS, JavaScript and React. Work closely with UI/UX designers to create engaging user experiences.",

requirements:[
"2+ Years Experience",
"HTML CSS JavaScript",
"React",
"Git",
"Responsive Design"
]

},

{
id:2,

title:"UI/UX Designer",

company:"CreativeCloud",

logo:"C",

location:"Remote",

category:"Design",

type:"Remote",

experience:"Mid",

salary:900000,

salaryText:"₹9 LPA",

posted:"1 Day Ago",

description:"Design modern interfaces for mobile and web applications. Collaborate with developers and product teams.",

requirements:[
"Figma",
"Adobe XD",
"Wireframing",
"Prototyping",
"Portfolio Required"
]

},

{
id:3,

title:"Digital Marketing Manager",

company:"MarketHive",

logo:"M",

location:"Chennai",

category:"Marketing",

type:"Full-Time",

experience:"Senior",

salary:1100000,

salaryText:"₹11 LPA",

posted:"Today",

description:"Lead SEO, SEM, social media campaigns and email marketing strategies.",

requirements:[
"SEO",
"Google Analytics",
"Meta Ads",
"Leadership"
]

},

{
id:4,

title:"Software Engineer",

company:"TechNova",

logo:"T",

location:"Hyderabad",

category:"Technology",

type:"Full-Time",

experience:"Entry",

salary:700000,

salaryText:"₹7 LPA",

posted:"5 Days Ago",

description:"Develop scalable software solutions using Java and Spring Boot.",

requirements:[
"Java",
"Spring Boot",
"MySQL",
"Git"
]

},

{
id:5,

title:"Graphic Designer",

company:"PixelWorks",

logo:"P",

location:"Coimbatore",

category:"Design",

type:"Part-Time",

experience:"Entry",

salary:450000,

salaryText:"₹4.5 LPA",

posted:"3 Days Ago",

description:"Create marketing graphics, social media creatives and branding materials.",

requirements:[
"Photoshop",
"Illustrator",
"Creativity"
]

},

{
id:6,

title:"HR Executive",

company:"PeopleFirst",

logo:"H",

location:"Coimbatore",

category:"Human Resources",

type:"Full-Time",

experience:"Entry",

salary:500000,

salaryText:"₹5 LPA",

posted:"4 Days Ago",

description:"Handle recruitment, onboarding and employee engagement activities.",

requirements:[
"Communication",
"Recruitment",
"MS Office"
]

},

{
id:7,

title:"Data Analyst",

company:"Insight Labs",

logo:"I",

location:"Pune",

category:"Technology",

type:"Remote",

experience:"Mid",

salary:1000000,

salaryText:"₹10 LPA",

posted:"Today",

description:"Analyze business data and create dashboards using Power BI.",

requirements:[
"SQL",
"Excel",
"Power BI",
"Python"
]

},

{
id:8,

title:"Nursing Officer",

company:"CityCare Hospital",

logo:"N",

location:"Coimbatore",

category:"Healthcare",

type:"Full-Time",

experience:"Mid",

salary:650000,

salaryText:"₹6.5 LPA",

posted:"6 Days Ago",

description:"Provide quality patient care in hospital departments.",

requirements:[
"B.Sc Nursing",
"Registration",
"2 Years Experience"
]

},

{
id:9,

title:"Financial Analyst",

company:"FinEdge",

logo:"F",

location:"Mumbai",

category:"Finance",

type:"Full-Time",

experience:"Senior",

salary:1500000,

salaryText:"₹15 LPA",

posted:"Yesterday",

description:"Prepare financial reports, budgeting and forecasting.",

requirements:[
"Excel",
"Financial Modeling",
"Accounting"
]

},

{
id:10,

title:"Backend Developer",

company:"CloudStack",

logo:"B",

location:"Remote",

category:"Technology",

type:"Remote",

experience:"Senior",

salary:1800000,

salaryText:"₹18 LPA",

posted:"Today",

description:"Develop REST APIs using Node.js and MongoDB.",

requirements:[
"Node.js",
"Express",
"MongoDB",
"REST API"
]

}

];

// --------------------------------
// Local Storage
// --------------------------------

let jobs =
JSON.parse(localStorage.getItem("jobs")) || defaultJobs;

// Save Jobs

function saveJobs(){

localStorage.setItem(
"jobs",
JSON.stringify(jobs)
);

}

// ------------------------------
// Bookmarks
// ------------------------------

let bookmarks =
JSON.parse(localStorage.getItem("bookmarks")) || [];

// Save Bookmarks

function saveBookmarks(){

localStorage.setItem(
"bookmarks",
JSON.stringify(bookmarks)
);

}

/* ===================================================
   Part 2 - Display Jobs
=================================================== */

const jobsGrid = document.getElementById("jobsGrid");
const jobCount = document.getElementById("jobCount");

/* -------------------------------
   Render Jobs
--------------------------------*/

function displayJobs(jobList = jobs) {

    if (!jobsGrid) return;

    jobsGrid.innerHTML = "";

    jobCount.textContent = `${jobList.length} Jobs`;

    jobList.forEach(job => {

        const isBookmarked = bookmarks.includes(job.id);

        const card = document.createElement("div");

        card.className = "job-item";

        card.innerHTML = `

            <div class="company-info">

                <div class="company-logo">
                    ${job.logo}
                </div>

                <div class="company-details">

                    <h3>${job.company}</h3>

                    <p>${job.posted}</p>

                </div>

            </div>

            <h2 class="job-title">
                ${job.title}
            </h2>

            <p class="job-location">

                <i class="fa-solid fa-location-dot"></i>

                ${job.location}

            </p>

            <div class="salary">

                ${job.salaryText}

            </div>

            <div class="job-tags">

                <span>${job.category}</span>

                <span>${job.type}</span>

                <span>${job.experience}</span>

            </div>

            <div class="card-buttons">

                <button
                    class="view-btn"
                    onclick="openJob(${job.id})">

                    View Details

                </button>

                <button
                    class="bookmark ${isBookmarked ? "active" : ""}"
                    onclick="toggleBookmark(${job.id})">

                    <i class="fa-solid fa-heart"></i>

                </button>

            </div>

        `;

        jobsGrid.appendChild(card);

    });

}

/* -------------------------------
   Initial Render
--------------------------------*/

displayJobs();

/* ===================================================
   Part 3 - Search, Filters & Sorting
=================================================== */

// -----------------------------
// Get Elements
// -----------------------------

const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");

const categoryFilter = document.getElementById("categoryFilter");
const typeFilter = document.getElementById("typeFilter");
const experienceFilter = document.getElementById("experienceFilter");
const sortJobs = document.getElementById("sortJobs");

// -----------------------------
// Filter Function
// -----------------------------

function filterJobs() {

    let filteredJobs = [...jobs];

    // Search by Job Title
    const keyword = searchInput.value.toLowerCase().trim();

    if (keyword !== "") {

        filteredJobs = filteredJobs.filter(job =>

            job.title.toLowerCase().includes(keyword)

        );

    }

    // Search by Location
    const location = locationInput.value.toLowerCase().trim();

    if (location !== "") {

        filteredJobs = filteredJobs.filter(job =>

            job.location.toLowerCase().includes(location)

        );

    }

    // Category Filter

    if (categoryFilter.value !== "all") {

        filteredJobs = filteredJobs.filter(job =>

            job.category === categoryFilter.value

        );

    }

    // Job Type Filter

    if (typeFilter.value !== "all") {

        filteredJobs = filteredJobs.filter(job =>

            job.type === typeFilter.value

        );

    }

    // Experience Filter

    if (experienceFilter.value !== "all") {

        filteredJobs = filteredJobs.filter(job =>

            job.experience === experienceFilter.value

        );

    }

    // Sorting

    if (sortJobs.value === "salary") {

        filteredJobs.sort((a, b) => b.salary - a.salary);

    }

    else {

        filteredJobs.sort((a, b) => b.id - a.id);

    }

    displayJobs(filteredJobs);

}

// -----------------------------
// Event Listeners
// -----------------------------

searchInput.addEventListener("keyup", filterJobs);

locationInput.addEventListener("keyup", filterJobs);

categoryFilter.addEventListener("change", filterJobs);

typeFilter.addEventListener("change", filterJobs);

experienceFilter.addEventListener("change", filterJobs);

sortJobs.addEventListener("change", filterJobs);

// Search Button

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", filterJobs);

/* ===================================================
   Part 4 - Bookmark Jobs
=================================================== */

// Toggle Bookmark

function toggleBookmark(jobId) {

    // Check if already bookmarked
    const index = bookmarks.indexOf(jobId);

    if (index === -1) {

        // Add bookmark
        bookmarks.push(jobId);

    } else {

        // Remove bookmark
        bookmarks.splice(index, 1);

    }

    // Save to localStorage
    saveBookmarks();

    // Refresh job cards
    filterJobs();

}

/* ===================================================
   Get All Bookmarked Jobs
=================================================== */

function getBookmarkedJobs() {

    return jobs.filter(job => bookmarks.includes(job.id));

}

/* ===================================================
   Clear All Bookmarks (Optional)
=================================================== */

function clearBookmarks() {

    bookmarks = [];

    saveBookmarks();

    filterJobs();

}

/* ===================================================
   Bookmark Count
=================================================== */

function getBookmarkCount() {

    return bookmarks.length;

}

/* ===================================================
   Part 5 - Job Details Modal
=================================================== */

const jobModal = document.getElementById("jobModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

/* ---------------------------------
   Open Job Details
----------------------------------*/

function openJob(jobId) {

    const job = jobs.find(item => item.id === jobId);

    if (!job) return;

    modalBody.innerHTML = `

        <h2>${job.title}</h2>

        <h3>${job.company}</h3>

        <p>
            <strong>📍 Location:</strong>
            ${job.location}
        </p>

        <p>
            <strong>💼 Job Type:</strong>
            ${job.type}
        </p>

        <p>
            <strong>🎓 Experience:</strong>
            ${job.experience}
        </p>

        <p>
            <strong>💰 Salary:</strong>
            ${job.salaryText}
        </p>

        <hr>

        <h4>Job Description</h4>

        <p>

            ${job.description}

        </p>

        <h4>Requirements</h4>

        <ul>

            ${job.requirements
                .map(req => `<li>${req}</li>`)
                .join("")}

        </ul>

        <button
            class="apply-btn"
            onclick="applyJob('${job.title}')">

            Apply Now

        </button>

    `;

    jobModal.style.display = "flex";

}

/* ---------------------------------
   Close Modal
----------------------------------*/

closeModal.addEventListener("click", () => {

    jobModal.style.display = "none";

});

/* ---------------------------------
   Close When Clicking Outside
----------------------------------*/

window.addEventListener("click", function (e) {

    if (e.target === jobModal) {

        jobModal.style.display = "none";

    }

});

/* ---------------------------------
   Apply Job
----------------------------------*/

function applyJob(jobTitle) {

    alert(
        `🎉 Application submitted successfully!\n\nYou have applied for:\n${jobTitle}\n\nOur recruitment team will contact you soon.`
    );

    jobModal.style.display = "none";

}

/* ===================================================
   Part 6 - Post Job & Initialization
=================================================== */

// ---------------------------------
// Post Job Form
// ---------------------------------

const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newJob = {

            id: jobs.length
                ? Math.max(...jobs.map(job => job.id)) + 1
                : 1,

            title: document.getElementById("jobTitle").value,

            company: document.getElementById("companyName").value,

            logo: document
                .getElementById("companyName")
                .value
                .charAt(0)
                .toUpperCase(),

            location: document.getElementById("location").value,

            category: document.getElementById("category").value,

            type: document.getElementById("jobType").value,

            experience: document.getElementById("experience").value,

            salary: parseInt(document.getElementById("salary").value),

            salaryText:
                "₹" +
                document.getElementById("salary").value +
                " LPA",

            posted: "Today",

            description:
                document.getElementById("description").value,

            requirements:
                document
                    .getElementById("requirements")
                    .value
                    .split(",")
                    .map(item => item.trim())

        };

        jobs.unshift(newJob);

        saveJobs();

        alert("🎉 Job posted successfully!");

        jobForm.reset();

        window.location.href = "jobs.html";

    });

}

/* ===================================================
   Initialize Jobs Page
=================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("jobsGrid")) {

        displayJobs();

    }

});

/* ===================================================
   Newsletter Button
=================================================== */

const newsletterBtn = document.querySelector(
    ".footer-container button"
);

if (newsletterBtn) {

    newsletterBtn.addEventListener("click", () => {

        alert(
            "🎉 Thank you for subscribing to the HireNest newsletter!"
        );

    });

}

/* ===================================================
   Console Message
=================================================== */

console.log(
    "%cHireNest Job Portal Loaded Successfully 🚀",
    "color:green;font-size:18px;font-weight:bold;"
);
const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, .job-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.style.transform =
            "translate(-50%, -50%) scale(1.8)";
    });

    el.addEventListener("mouseleave", () => {
        cursor.style.transform =
            "translate(-50%, -50%) scale(1)";
    });
});
async function loadJobs() {
    const response = await fetch("http://localhost:5000/api/jobs");
    const jobs = await response.json();

    const container = document.getElementById("jobs-container");

    container.innerHTML = jobs.map(job => `
        <div class="job-card">
            <h3>${job.title}</h3>
            <p>${job.company}</p>
            <p>${job.location}</p>
        </div>
    `).join("");
}

loadJobs();