
import "./style.css";

const app = document.querySelector("#app");

if (!app) {
  throw new Error("VENOM CLOUD requires <div id='app'></div> in index.html.");
}

const services = [
  { id: "compute", icon: "▦", name: "COMPUTE", description: "Virtual machines, containers, processing workloads", status: "PLANNED", color: "cyan" },
  { id: "storage", icon: "▤", name: "STORAGE", description: "Object storage, files, databases and backups", status: "PLANNED", color: "violet" },
  { id: "network", icon: "⌘", name: "NETWORK", description: "Connectivity, routing, gateways and traffic", status: "PLANNED", color: "blue" },
  { id: "security", icon: "⬡", name: "SECURITY", description: "Identity, access control, secrets and audit", status: "PLANNED", color: "green" },
  { id: "deployment", icon: "↗", name: "DEPLOYMENT", description: "Application environments and release workflows", status: "PLANNED", color: "orange" },
  { id: "monitoring", icon: "⌁", name: "OBSERVABILITY", description: "Logs, metrics, health checks and alerts", status: "PLANNED", color: "cyan" },
];

const integrations = [
  ["VENOM CODE", "Software source and build artifacts"],
  ["VURRA", "Refinery workflow and project specifications"],
  ["VEG", "Genesis lifecycle and stage coordination"],
  ["ZEUS", "Workflow orchestration interface"],
  ["ELEANOR", "Intelligence interface"],
  ["VCON", "Enterprise communication and coordination"],
];

let activePage = "overview";
let selectedService = "compute";
let provisioned = [];
let deployments = [];
let activity = [
  { time: "SYSTEM", message: "VENOM CLOUD prototype initialized.", type: "good" },
  { time: "SYSTEM", message: "Infrastructure map loaded.", type: "good" },
  { time: "SYSTEM", message: "No external cloud provider connected.", type: "warning" },
];

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function timestamp() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function log(message, type = "info") {
  activity.unshift({ time: timestamp(), message, type });
  activity = activity.slice(0, 14);
}

function serviceCard(service) {
  const count = provisioned.filter((item) => item.service === service.id).length;
  return `
    <button class="service-card ${selectedService === service.id ? "selected" : ""}" data-service="${service.id}">
      <div class="service-top">
        <span class="service-icon ${service.color}">${service.icon}</span>
        <span class="service-status">${count ? "DEMO ACTIVE" : service.status}</span>
      </div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <div class="service-bottom"><span>${count} DEMO RESOURCE${count === 1 ? "" : "S"}</span><b>↗</b></div>
    </button>
  `;
}

function renderStats() {
  return `
    <section class="stats">
      <div class="stat"><span>REGISTERED RESOURCES</span><b>${String(provisioned.length).padStart(2, "0")}</b><small>Local demo records</small></div>
      <div class="stat"><span>DEPLOYMENT RECORDS</span><b>${String(deployments.length).padStart(2, "0")}</b><small>Local release simulations</small></div>
      <div class="stat"><span>CLOUD SERVICE DOMAINS</span><b>06</b><small>Defined infrastructure areas</small></div>
      <div class="stat"><span>PROVIDER CONNECTIONS</span><b>00</b><small>No provider credentials connected</small></div>
    </section>
  `;
}

function renderArchitecture() {
  const selected = services.find((item) => item.id === selectedService) || services[0];
  return `
    <div class="architecture">
      <div class="architecture-node enterprise-node">
        <span>01 / ENTERPRISE CONTROL</span>
        <b>SHELBY PREDATOR ENTERPRISE</b>
        <small>Governance · Ownership · Approval</small>
      </div>
      <div class="connector">↓</div>
      <div class="architecture-node cloud-node">
        <span>02 / SHARED INFRASTRUCTURE</span>
        <b>VENOM CLOUD CONTROL PLANE</b>
        <small>Resource registry · Policies · Operations</small>
      </div>
      <div class="connector">↓</div>
      <div class="architecture-services">
        ${services.map((service) => `
          <button class="architecture-service ${selectedService === service.id ? "chosen" : ""}" data-service="${service.id}">
            <b>${service.icon} ${service.name}</b>
            <small>${service.status}</small>
          </button>
        `).join("")}
      </div>
      <div class="connector">↓</div>
      <div class="architecture-node factory-node">
        <span>03 / CONNECTED APPLICATIONS</span>
        <b>VENOM ENTERPRISE FACTORIES</b>
        <small>CODE · VURRA · VEG · VEME · RE:CORE · VTSE</small>
      </div>
    </div>
    <div class="service-inspector">
      <div class="inspector-symbol">${selected.icon}</div>
      <div>
        <span class="eyebrow">INFRASTRUCTURE DOMAIN / ${selected.id.toUpperCase()}</span>
        <h3>${selected.name}</h3>
        <p>${selected.description}. This domain is defined in the prototype; its provider-backed services are not yet connected.</p>
      </div>
      <button class="outline-button" data-page="resources">VIEW RESOURCES ↗</button>
    </div>
  `;
}

function renderResourceRows() {
  if (!provisioned.length) {
    return `<div class="empty-state">NO RESOURCES REGISTERED. Use the resource console to create a local demonstration record.</div>`;
  }
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>RESOURCE ID</th><th>RESOURCE NAME</th><th>DOMAIN</th><th>REGION</th><th>STATUS</th></tr></thead>
        <tbody>
          ${provisioned.map((resource) => `
            <tr>
              <td class="resource-id">${resource.id}</td>
              <td>${escapeHTML(resource.name)}</td>
              <td>${escapeHTML(resource.serviceName)}</td>
              <td>${escapeHTML(resource.region)}</td>
              <td><span class="demo-state">${resource.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderActivity() {
  return `
    <div class="activity-list">
      ${activity.map((entry) => `
        <div class="activity-row ${entry.type}">
          <span>${escapeHTML(entry.time)}</span>
          <i></i>
          <p>${escapeHTML(entry.message)}</p>
        </div>
      `).join("")}
    </div>
  `;
}

function renderOverview() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow"><i></i> VENOM ENTERPRISE / INFRASTRUCTURE COMMAND</div>
        <h1>VENOM<br/><em>CLOUD.</em></h1>
        <h2>THE INFRASTRUCTURE BEHIND THE FACTORY.</h2>
        <p>A proposed shared cloud platform for computing, storage, networking, security, deployment and observability across the Shelby Predator Enterprise.</p>
        <div class="hero-actions">
          <button class="primary" data-page="architecture">EXPLORE ARCHITECTURE ↗</button>
          <button class="secondary" data-page="resources">RESOURCE REGISTRY</button>
        </div>
      </div>
      <div class="cloud-visual">
        <div class="cloud-ring ring-one"></div>
        <div class="cloud-ring ring-two"></div>
        <div class="cloud-ring ring-three"></div>
        <div class="cloud-core"><span>V</span><b>VENOM CLOUD</b><small>INFRASTRUCTURE CONTROL</small></div>
        <div class="cloud-label label-one">COMPUTE</div>
        <div class="cloud-label label-two">NETWORK</div>
        <div class="cloud-label label-three">STORAGE</div>
        <div class="cloud-label label-four">SECURITY</div>
      </div>
    </section>

    <div class="notice"><b>PROTOTYPE STATUS</b><span>All resource counts and operations are local simulations. No cloud provider, server, database, network, security service, or deployment target is connected.</span></div>

    ${renderStats()}

    <section class="section">
      <div class="section-heading"><div><span class="eyebrow">INFRASTRUCTURE DOMAINS</span><h2>THE SIX CLOUD SYSTEMS</h2></div><button class="text-link" data-page="architecture">FULL ARCHITECTURE ↗</button></div>
      <div class="service-grid">${services.map(serviceCard).join("")}</div>
    </section>

    <section class="section">
      <div class="section-heading"><div><span class="eyebrow">PLATFORM TOPOLOGY</span><h2>ENTERPRISE CLOUD MAP</h2></div><span class="section-tag">PROPOSED DESIGN</span></div>
      ${renderArchitecture()}
    </section>

    <section class="section">
      <div class="section-heading"><div><span class="eyebrow">CLOUD OPERATIONS</span><h2>RESOURCE REGISTRY</h2></div><button class="text-link" data-page="resources">OPEN REGISTRY ↗</button></div>
      ${renderResourceRows()}
    </section>

    <section class="section">
      <div class="section-heading"><div><span class="eyebrow">SYSTEM EVENT STREAM</span><h2>CLOUD ACTIVITY</h2></div><span class="section-tag">LOCAL DEMO LOG</span></div>
      ${renderActivity()}
    </section>
  `;
}

function renderArchitecturePage() {
  return `
    <section class="page-intro">
      <span class="eyebrow">VENOM CLOUD / SYSTEM TOPOLOGY</span>
      <h1>CLOUD <em>ARCHITECTURE.</em></h1>
      <p>The proposed infrastructure control plane and six shared service domains.</p>
    </section>
    ${renderArchitecture()}
    <section class="section">
      <div class="section-heading"><div><span class="eyebrow">PLATFORM INTERFACES</span><h2>CONNECTED SYSTEMS</h2></div><span class="section-tag">PROPOSED / NOT CONNECTED</span></div>
      <div class="integration-grid">
        ${integrations.map(([name, description]) => `
          <div class="integration-card"><span class="integration-dot"></span><div><b>${name}</b><small>${description}</small></div><label>PLANNED</label></div>
        `).join("")}
      </div>
    </section>
    <div class="human-gate"><b>CONTROL PRINCIPLE</b><p>Infrastructure provisioning, access changes, data handling, and production releases require authorized approval, security review, and auditable records.</p></div>
  `;
}

function renderResourcesPage() {
  return `
    <section class="page-intro">
      <span class="eyebrow">VENOM CLOUD / RESOURCE MANAGEMENT</span>
      <h1>RESOURCE <em>REGISTRY.</em></h1>
      <p>Register conceptual cloud resources and inspect their local demonstration records.</p>
    </section>
    <div class="resource-layout">
      <form class="resource-form" id="resource-form">
        <div class="form-heading">NEW RESOURCE <span>VCLOUD / 01</span></div>
        <label>RESOURCE NAME<input name="name" maxlength="60" placeholder="e.g. Shelby application server" required/></label>
        <label>INFRASTRUCTURE DOMAIN
          <select name="service" required>
            ${services.map((service) => `<option value="${service.id}">${service.name}</option>`).join("")}
          </select>
        </label>
        <label>REGION
          <select name="region">
            <option>US-WEST / DEMO</option>
            <option>US-EAST / DEMO</option>
            <option>EUROPE / DEMO</option>
            <option>ASIA-PACIFIC / DEMO</option>
          </select>
        </label>
        <div class="form-note">Creates a local record only. It does not provision a real cloud resource or incur provider charges.</div>
        <button type="submit" class="primary">＋ REGISTER DEMO RESOURCE</button>
      </form>
      <div class="resource-summary">
        <span class="eyebrow">RESOURCE CONTROL</span>
        <b>${String(provisioned.length).padStart(2, "0")}</b>
        <h3>REGISTERED<br/>RESOURCES</h3>
        <p>Local records created in this browser session.</p>
        <button class="outline-button" data-page="overview">RETURN TO OVERVIEW</button>
      </div>
    </div>
    <div class="section">
      <div class="section-heading"><div><span class="eyebrow">RESOURCE INVENTORY</span><h2>REGISTERED ASSETS</h2></div><span class="section-tag">LOCAL DEMO DATA</span></div>
      ${renderResourceRows()}
    </div>
  `;
}

function renderSecurityPage() {
  const controls = [
    ["Identity and access management", "Define users, roles and permissions"],
    ["Secrets management", "Protect application keys and credentials"],
    ["Encryption policy", "Define data protection requirements"],
    ["Audit logging", "Record privileged actions and changes"],
    ["Backup and recovery", "Establish recovery and retention plans"],
    ["Network isolation", "Define segmentation and access boundaries"],
  ];
  return `
    <section class="page-intro">
      <span class="eyebrow">VENOM CLOUD / TRUST BOUNDARY</span>
      <h1>CLOUD <em>SECURITY.</em></h1>
      <p>Security architecture and governance requirements for the proposed cloud platform.</p>
    </section>
    <div class="security-banner"><div class="security-shield">⬡</div><div><b>SECURITY FRAMEWORK DEFINED</b><p>No live security controls or cloud identity provider are currently connected. These are architecture requirements, not a security certification.</p></div></div>
    <div class="security-grid">
      ${controls.map(([name, description], index) => `
        <div class="security-card"><span>CONTROL / 0${index + 1}</span><h3>${name}</h3><p>${description}</p><label>DESIGN REQUIREMENT</label></div>
      `).join("")}
    </div>
    <div class="human-gate"><b>SECURITY IS NOT A DECORATION</b><p>Before real deployment, implement least-privilege access, secure secret storage, encryption, logging, backups, vulnerability management, and independent security testing.</p></div>
  `;
}

function renderDeploymentsPage() {
  return `
    <section class="page-intro">
      <span class="eyebrow">VENOM CLOUD / RELEASE CONTROL</span>
      <h1>DEPLOYMENT <em>COMMAND.</em></h1>
      <p>Track proposed application releases and target environments.</p>
    </section>
    <div class="deployment-banner"><b>DEPLOYMENT SIMULATOR</b><span>Creates a local release record. No application is uploaded or deployed.</span></div>
    <form id="deployment-form" class="deployment-form">
      <label>APPLICATION NAME<input name="application" placeholder="e.g. VENOM CODE" maxlength="60" required/></label>
      <label>TARGET ENVIRONMENT<select name="environment"><option>DEVELOPMENT</option><option>STAGING</option><option>PRODUCTION / APPROVAL REQUIRED</option></select></label>
      <button class="primary" type="submit">CREATE DEMO RELEASE RECORD ↗</button>
    </form>
    <div class="section">
      <div class="section-heading"><div><span class="eyebrow">RELEASE REGISTER</span><h2>DEPLOYMENT HISTORY</h2></div><span class="section-tag">LOCAL DEMO RECORDS</span></div>
      ${deployments.length ? `
        <div class="deployment-list">
          ${deployments.map((item) => `
            <div class="deployment-row"><span>${item.id}</span><div><b>${escapeHTML(item.application)}</b><small>${escapeHTML(item.environment)} · ${item.time}</small></div><label>SIMULATED</label></div>
          `).join("")}
        </div>
      ` : `<div class="empty-state">NO RELEASE RECORDS CREATED.</div>`}
    </div>
  `;
}

function renderPage() {
  if (activePage === "architecture") return renderArchitecturePage();
  if (activePage === "resources") return renderResourcesPage();
  if (activePage === "security") return renderSecurityPage();
  if (activePage === "deployments") return renderDeploymentsPage();
  return renderOverview();
}

function render() {
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand"><div class="brand-mark">V</div><div><b>VENOM</b><small>CLOUD SYSTEMS</small></div></div>
        <div class="nav-label">INFRASTRUCTURE CONTROL</div>
        <button class="nav ${activePage === "overview" ? "active" : ""}" data-page="overview"><span>⌂</span> Cloud Overview</button>
        <button class="nav ${activePage === "architecture" ? "active" : ""}" data-page="architecture"><span>⌘</span> Architecture Map</button>
        <button class="nav ${activePage === "resources" ? "active" : ""}" data-page="resources"><span>▤</span> Resource Registry</button>
        <button class="nav ${activePage === "security" ? "active" : ""}" data-page="security"><span>⬡</span> Security Center</button>
        <button class="nav ${activePage === "deployments" ? "active" : ""}" data-page="deployments"><span>↗</span> Deployment Control</button>
        <div class="sidebar-bottom"><i></i> INTERFACE ONLINE<small>VENOM CLOUD / V0.1.0<br/>PROTOTYPE ENVIRONMENT</small></div>
      </aside>
      <main class="main">
        <header class="topbar"><div>SHELBY PREDATOR <span>/</span> VENOM ENTERPRISE <span>/</span> <b>VENOM CLOUD</b></div><strong>VC <i>02</i></strong></header>
        <div class="content">${renderPage()}</div>
        <footer><b>VENOM CLOUD <span>/</span> ENTERPRISE INFRASTRUCTURE</b><small>THE SHELBY PREDATOR ENTERPRISE · THE COBRA WAY</small><small>CONCEPT PROTOTYPE · 2026</small></footer>
      </main>
    </div>
  `;

  app.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => {
      activePage = button.dataset.page;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  app.querySelectorAll("[data-service]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedService = button.dataset.service;
      if (activePage === "overview") {
        render();
      } else {
        activePage = "architecture";
        render();
      }
    });
  });

  app.querySelector("#resource-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const serviceId = String(form.get("service"));
    const region = String(form.get("region"));
    const service = services.find((item) => item.id === serviceId);
    if (!name || !service) return;

    provisioned.unshift({
      id: `VCR-${String(provisioned.length + 1).padStart(3, "0")}`,
      name,
      service: service.id,
      serviceName: service.name,
      region,
      status: "DEMO ONLY",
    });
    log(`Local demo resource record created: ${name}.`, "good");
    render();
  });

  app.querySelector("#deployment-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const application = String(form.get("application") || "").trim();
    const environment = String(form.get("environment") || "");
    if (!application) return;

    const record = {
      id: `REL-${String(deployments.length + 1).padStart(3, "0")}`,
      application,
      environment,
      time: timestamp(),
    };
    deployments.unshift(record);
    log(`Simulated release record created for ${application}. No deployment performed.`, "warning");
    render();
  });
}

render();

