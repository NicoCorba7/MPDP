import { PERSONAL_CONFIG, PROJECTS, TECHNOLOGIES } from "./data.js";

/**
 * ============================================================================
 * LÓGICA PRINCIPAL DE LA APLICACIÓN
 * ============================================================================
 * Controla:
 * 1. Inicialización de datos de marca y contacto.
 * 2. Renderizado de proyectos (formato estudio de caso) y tecnologías.
 * 3. Menú de navegación accesible.
 * 4. Validación honesta del formulario de contacto.
 */

document.addEventListener("DOMContentLoaded", () => {
  initBrandAndContact();
  renderProjects();
  renderTechnologies();
  initMobileNavigation();
  initContactForm();
});

/**
 * Inyecta los datos de marca personal y enlaces de contacto
 */
function initBrandAndContact() {
  // Marca personal en logo y encabezados
  const brandNameElements = document.querySelectorAll(".brand-name-text");
  brandNameElements.forEach(el => {
    el.textContent = PERSONAL_CONFIG.name;
  });

  // Estado estático de disponibilidad
  const statusElement = document.getElementById("availabilityStatus");
  if (statusElement) {
    statusElement.textContent = PERSONAL_CONFIG.status;
  }

  // Enlaces de contacto
  const emailLink = document.getElementById("emailChannelLink");
  if (emailLink) {
    emailLink.href = `mailto:${PERSONAL_CONFIG.contact.email}`;
    const textEl = emailLink.querySelector(".channel-text");
    if (textEl) textEl.textContent = PERSONAL_CONFIG.contact.email;
  }

  const githubLink = document.getElementById("githubChannelLink");
  if (githubLink) {
    githubLink.href = PERSONAL_CONFIG.contact.githubUrl;
    const textEl = githubLink.querySelector(".channel-text");
    if (textEl) textEl.textContent = `github.com/${PERSONAL_CONFIG.contact.githubUsername}`;
  }

  const whatsappLink = document.getElementById("whatsappChannelLink");
  if (whatsappLink) {
    if (PERSONAL_CONFIG.contact.whatsappUrl) {
      whatsappLink.href = PERSONAL_CONFIG.contact.whatsappUrl;
      const textEl = whatsappLink.querySelector(".channel-text");
      if (textEl) textEl.textContent = "Iniciar conversación en WhatsApp";
    } else {
      // Estado visible cuando aún no se ha provisto el número
      whatsappLink.href = "#contacto";
      const textEl = whatsappLink.querySelector(".channel-text");
      if (textEl) textEl.textContent = "Mensaje directo (enlace a configurar)";
    }
  }
}

/**
 * Renderiza los proyectos como presentaciones profesionales completas.
 */
function renderProjects() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;

  container.innerHTML = PROJECTS.map(project => `
    <article class="project-card" id="${escapeHtml(project.id)}">
      <div class="project-media">
        <img 
          src="${escapeHtml(project.image)}" 
          alt="${escapeHtml(project.alt)}" 
          class="project-image"
          loading="lazy"
          width="800"
          height="500"
        >
      </div>

      <div class="project-content">
        <span class="project-category">${escapeHtml(project.category)}</span>
        <h3 class="project-title">${escapeHtml(project.name)}</h3>
        <p class="project-context">${escapeHtml(project.context)}</p>

        <div class="project-details">
          <div class="detail-block">
            <h4 class="detail-label">Problema o necesidad:</h4>
            <p class="detail-text">${escapeHtml(project.problem)}</p>
          </div>

          <div class="detail-block">
            <h4 class="detail-label">Solución aplicada:</h4>
            <p class="detail-text">${escapeHtml(project.solution)}</p>
          </div>
        </div>

        <div class="project-tech-list" aria-label="Tecnologías utilizadas">
          ${project.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("")}
        </div>

        <div class="project-actions">
          <a href="${escapeHtml(project.demoUrl)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
            Ver proyecto
            <svg class="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
          <a href="${escapeHtml(project.repoUrl)}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            Código en GitHub
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

/**
 * Renderiza la sección de tecnologías de manera compacta y sobria.
 */
function renderTechnologies() {
  const container = document.getElementById("techGrid");
  if (!container) return;

  container.innerHTML = TECHNOLOGIES.map(tech => `
    <article class="tech-item">
      <div class="tech-item-header">
        <h3 class="tech-item-name">${escapeHtml(tech.name)}</h3>
        <span class="tech-item-role">${escapeHtml(tech.role)}</span>
      </div>
      <p class="tech-item-desc">${escapeHtml(tech.description)}</p>
    </article>
  `).join("");
}

/**
 * Menú de navegación accesible para móviles y tablets.
 */
function initMobileNavigation() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-locked", open);
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("is-open")) {
        setOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/**
 * Validación honesta del formulario de contacto.
 * No finge envíos: valida los datos y explica con claridad el estado del formulario.
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusBox = document.getElementById("formFeedback");

  if (!form || !statusBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Limpiar errores previos
    clearErrors(form);

    let hasError = false;

    if (!name) {
      showError(form.name, "Por favor, ingresá tu nombre o el de tu proyecto.");
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      showError(form.email, "Por favor, ingresá una dirección de correo válida.");
      hasError = true;
    }

    if (!message) {
      showError(form.message, "Por favor, contame brevemente qué tenés en mente.");
      hasError = true;
    }

    if (hasError) {
      statusBox.className = "form-feedback error";
      statusBox.textContent = "Por favor, revisá los campos marcados arriba para continuar.";
      return;
    }

    /**
     * CONEXIÓN REAL FUTURA:
     * Cuando configures Formspree o un backend, reemplaza este bloque con el fetch correspondiente:
     * 
     * await fetch("https://formspree.io/f/TU_CODIGO", {
     *   method: "POST",
     *   headers: { "Content-Type": "application/json", "Accept": "application/json" },
     *   body: JSON.stringify({ name, email, projectType: form.projectType.value, message })
     * });
     */

    // Respuesta honesta en lugar de simular un envío ficticio:
    statusBox.className = "form-feedback verified";
    statusBox.innerHTML = `
      <strong>Validación correcta.</strong> Los datos ingresados son válidos. 
      Actualmente este formulario está listo para conectarse a un servicio de recepción de correos. 
      Para comunicarte hoy, podés escribirme directamente a <a href="mailto:${escapeHtml(PERSONAL_CONFIG.contact.email)}" class="feedback-link">${escapeHtml(PERSONAL_CONFIG.contact.email)}</a>.
    `;
    form.reset();
  });

  // Limpiar error al escribir
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const parent = input.closest(".form-field");
      if (parent) {
        parent.classList.remove("has-error");
        const msg = parent.querySelector(".field-error-msg");
        if (msg) msg.textContent = "";
      }
    });
  });
}

function showError(input, message) {
  const parent = input.closest(".form-field");
  if (!parent) return;
  parent.classList.add("has-error");
  const msg = parent.querySelector(".field-error-msg");
  if (msg) msg.textContent = message;
}

function clearErrors(form) {
  const fields = form.querySelectorAll(".form-field");
  fields.forEach(f => {
    f.classList.remove("has-error");
    const msg = f.querySelector(".field-error-msg");
    if (msg) msg.textContent = "";
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, match => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[match]));
}
