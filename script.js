const certificates = [
  {
    id: "cert-1",
    title: "Full Stack Web Development",
    issuer: "Coursera",
    year: 2025,
    desc: "Completed project-based Full Stack Web Development course.",
    image: "images/cert1.jpg",
  },
  {
    id: "cert-2",
    title: "All India Developers Challenge",
    issuer: "Samrat Ashok Technological Institute (SATI), Vidisha",
    year: 2025,
    desc: "Me with my team had a lot of hands of experience in the All India Developers Hackathon. We build a web application for collaborative coding and we enjoyed every bit of it, it also gave us a opportunity to learn a lot of new things for which we are extreamly grateful.",
    image: "images/cert2.png",
  },
  {
    id: "cert-3",
    title: "Introduction to Artificial Intelligence",
    issuer: "Great Learning",
    year: 2024,
    desc: "This is the place where I tryly got my first taste of AI, got the first exposer to AI so it's kind of special to me.",
    image: "images/cert3.png",
  },
  {
    id: "cert-4",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training and Certification",
    year: 2025,
    desc: "This is where I got my first exposure to cloud computing.",
    image: "images/cert4.png",    
  },
  {
    id: "cert-5",
    title: "Introduction to Modern AI",
    issuer: "cisco Networking Academy",
    year: 2025,
    desc: "",
    image: "images/cert5.png",    
  },
  {
    id: "cert-6",
    title: "Introduction to IOT and Digital Transformation",
    issuer: "cisco Networking Academy",
    year: 2025,
    desc: "",
    image: "images/cert6.png",    
  },
  {
    id: "cert-7",
    title: "Intoduction to Data Science",
    issuer: "cisco Networking Academy",
    year: 2025,
    desc: "",
    image: "images/cert7.png",    
  },
  {
    id: "cert-8",
    title: "Intoduction to Cybersecurity",
    issuer: "cisco Networking Academy",
    year: 2025,
    desc: "",
    image: "images/cert8.png",    
  },
    {
    id: "cert-9",
    title: "Exploring Careers in Web3",
    issuer: "Apex Institute of Technology, Chandigarh University",
    year: 2025,
    desc: "",
    image: "images/cert9.jpg",    
  },
  {
    id: "cert-10",
    title: "Build Smarter ML with Cloud",
    issuer: "Saras AI Institute",
    year: 2025,
    desc: "",
    image: "images/cert10.png",    
  },
  {
    id: "cert-11",
    title: "Craft Your Career: Self Development and Clarity",
    issuer: "NEXASOUL",
    year: 2025,
    desc: "",
    image: "images/cert11.png",    
  },
  {
    id: "cert-12",
    title: "Full Stack Web Development Bootcamp",
    issuer: "Google Developers Group",
    year: 2025,
    desc: "",
    image: "images/cert12.png",    
  },
  {
    id: "cert-13",
    title: "Full Stack Web Development Seminar",
    issuer: "Google Developers Group",
    year: 2025,
    desc: "",
    image: "images/cert13.png",    
  },
];

const grid = document.getElementById("grid");
const q = document.getElementById("q");
const sort = document.getElementById("sort");

function render(list) {
  grid.innerHTML = "";
  list.forEach((c) => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.innerHTML = `
          <div class="thumb"><img alt="${c.title}" src="${c.image}" onerror="this.style.opacity=.12;this.style.background='#081218'"/></div>
          <div class="meta">
            <h3 class="title">${c.title}</h3>
            <div class="sub">${c.issuer} • ${c.year}</div>
          </div>`;
    card.addEventListener("click", () => openCert(c.id));
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") openCert(c.id);
    });
    grid.appendChild(card);
  });
}

function openCert(id) {
  const cert = certificates.find((x) => x.id === id);
  if (!cert) return;
  const area = document.getElementById("cert-area");
  area.innerHTML = `<img alt="${cert.title}" src="${cert.image}" />`;
  document.getElementById("cert-title").textContent = cert.title;
  document.getElementById("cert-issuer").innerHTML =
    cert.issuer + ' — <span id="cert-year">' + cert.year + "</span>";
  document.getElementById("cert-desc").textContent = cert.desc;
  document.getElementById("openRaw").href = cert.image;
  document.getElementById("downloadBtn").onclick = () => {
    const a = document.createElement("a");
    a.href = cert.image;
    a.download = cert.title.replace(/\s+/g, "_") + ".png";
    a.click();
  };
  const shareHash = "#" + cert.id;
  document.getElementById("shareLink").textContent =
    location.origin + location.pathname + shareHash;
  history.replaceState(null, "", shareHash);
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeCert() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  history.replaceState(null, "", location.pathname);
}

render(certificates.slice().sort((a, b) => b.year - a.year));

q.addEventListener("input", () => applyFilters());
sort.addEventListener("change", () => applyFilters());

function applyFilters() {
  const term = q.value.trim().toLowerCase();
  let list = certificates.filter((c) =>
    (c.title + c.issuer + c.year + c.desc).toLowerCase().includes(term)
  );
  if (sort.value === "new") list.sort((a, b) => b.year - a.year);
  if (sort.value === "old") list.sort((a, b) => a.year - b.year);
  if (sort.value === "issuer")
    list.sort((a, b) => a.issuer.localeCompare(b.issuer));
  render(list);
}

const overlay = document.getElementById("overlay");
document.getElementById("closeBtn").addEventListener("click", closeCert);
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeCert();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCert();
});

window.addEventListener("load", () => {
  const h = location.hash.replace("#", "");
  if (h) {
    const exists = certificates.find((c) => c.id === h);
    if (exists) openCert(h);
  }
});
