/**
 * ============================================================================
 * DATOS DEL SITIO (Configuración personal, Proyectos y Tecnologías)
 * ============================================================================
 * 
 * Este archivo centraliza la información editable para que puedas personalizar
 * tus datos o agregar proyectos reales sin necesidad de modificar el HTML.
 * No contiene información inventada: los campos pendientes tienen placeholders claros.
 */

export const PERSONAL_CONFIG = {
  // Marca personal: Reemplaza con tu nombre y apellido
  name: "Corbalán Nicolás",
  title: "Desarrollador Web",
  status: "Disponible para nuevos proyectos",
  
  // Canales de contacto directos
  contact: {
    email: "corbalan.nicolas921@gmail.com",       // Reemplazar con tu email real
    githubUsername: "NicoCorba7",         // Reemplazar con tu usuario de GitHub
    githubUrl: "https://github.com/NicoCorba7",
    whatsappUrl: ""                       // Dejar vacío o poner https://wa.me/numero
  }
};

/**
 * PROYECTOS:
 * Inicialmente incluye proyectos propios de desarrollo y práctica web,
 * sin inventar clientes ficticios. Cada uno explica el problema y la solución.
 */
export const PROJECTS = [
  {
    id: "proyecto-1",
    name: "Sitio Web de Servicios Profesionales",
    category: "Proyecto de desarrollo web",
    context: "Desarrollo enfocado en presentar servicios de forma directa, ágil y sin sobrecarga visual.",
    problem: "Muchos sitios de servicios utilizan plantillas pesadas y complejas que tardan en cargar y confunden al visitante al momento de consultar.",
    solution: "Estructura semántica limpia, carga inmediata y un flujo de navegación que guía al usuario directamente hacia los canales de contacto.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    image: "assets/projects/project-1.svg",
    alt: "Vista previa del sitio web con estructura limpia para presentación de servicios",
    demoUrl: "#", // Reemplazar con enlace real cuando esté publicado
    repoUrl: "https://github.com/tu-usuario/sitio-servicios" // Reemplazar con tu repo en GitHub
  },
  {
    id: "proyecto-2",
    name: "Interfaz Web con Adaptación Móvil Integral",
    category: "Proyecto de maquetación y experiencia de usuario",
    context: "Exploración de maquetación avanzada con CSS Grid y Flexbox pensada desde la pantalla del teléfono celular.",
    problem: "La mayoría de las webs se adaptan al móvil achicando elementos a la fuerza, lo que dificulta la lectura y la interacción táctil.",
    solution: "Diseño concebido desde mobile-first con tamaños táctiles cómodos (mínimo 48px), textos fluidos con clamp() y navegación con teclado accesible.",
    technologies: ["HTML5", "CSS Grid", "Flexbox", "JavaScript"],
    image: "assets/projects/project-2.svg",
    alt: "Vista previa de la interfaz adaptada para computadora de escritorio y smartphone",
    demoUrl: "#", // Reemplazar con enlace real cuando esté publicado
    repoUrl: "https://github.com/tu-usuario/interfaz-responsive" // Reemplazar con tu repo en GitHub
  }
];

/**
 * TECNOLOGÍAS Y HERRAMIENTAS REALES:
 * Únicamente las herramientas que manejas actualmente, con su rol en el flujo de trabajo.
 */
export const TECHNOLOGIES = [
  {
    name: "HTML5",
    role: "Estructura & Semántica",
    description: "Marcado accesible, arquitectura lógica de contenidos y base para buen posicionamiento."
  },
  {
    name: "CSS3",
    role: "Diseño & Adaptabilidad",
    description: "Maquetación fluida con Flexbox y CSS Grid, variables nativas y diseño responsive real."
  },
  {
    name: "JavaScript",
    role: "Interactividad & Lógica",
    description: "Manipulación eficiente del DOM, manejo de eventos y validación de interfaces en el cliente."
  },
  {
    name: "Git",
    role: "Control de versiones",
    description: "Gestión ordenada del historial de desarrollo y control de cambios en el código."
  },
  {
    name: "GitHub",
    role: "Publicación & Colaboración",
    description: "Alojamiento de código fuente, despliegue de proyectos y documentación."
  },
  {
    name: "VS Code",
    role: "Entorno de desarrollo",
    description: "Configuración ágil de edición, validación de sintaxis y buenas prácticas de desarrollo."
  }
];
