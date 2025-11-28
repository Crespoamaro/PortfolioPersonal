import { fetchConocimientos } from './conocimientos.js';
import { proyectos } from './proyectos.js';
import { initContactForm } from './contactos.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Cargar y renderizar conocimientos
  const skillsContainer = document.getElementById('skills');
  const datos = await fetchConocimientos();
  if (!datos || datos.length === 0) {
    skillsContainer.innerHTML = '<p class="muted">No se han podido cargar los conocimientos. Asegúrate de que <code>data/conocimientos.json</code> existe y es accesible.</p>';
  } else {
    skillsContainer.innerHTML = datos.map(renderCategoria).join('');
    // mejorar accesibilidad: ajustar imágenes rotas
    document.querySelectorAll('.skill img').forEach(img => {
      img.addEventListener('error', () => {
        // si falla la carga del logo remoto, sustituir por un placeholder ligero
        img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="100%" height="100%" fill="%23222"/><text x="50%" y="55%" font-size="10" fill="%23fff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">N/A</text></svg>';
        img.style.opacity = '0.85';
      });
    });
  }

  // Renderizar proyectos
  const projectsContainer = document.getElementById('projects');
  projectsContainer.innerHTML = proyectos.map(renderProyecto).join('');

  // Inicializar formulario de contacto
  initContactForm();

  document.querySelectorAll('.nav a, .hero-cta a').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

function renderCategoria(cat) {
  const items = cat.items.map(item => {
    // añado onerror directo en la imagen como extra (por compatibilidad con HTML generado)
    return `
      <div class="skill" title="${escapeHtml(item.nombre)}">
        <img src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.nombre)} logo" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;40&quot; height=&quot;40&quot;><rect width=&quot;100%&quot; height=&quot;100%&quot; fill=&quot;%23222&quot;/><text x=&quot;50%&quot; y=&quot;55%&quot; font-size=&quot;10&quot; fill=&quot;%23fff&quot; text-anchor=&quot;middle&quot; font-family=&quot;Arial, Helvetica, sans-serif&quot;>N/A</text></svg>'" />
        <div class="skill-name">${escapeHtml(item.nombre)}</div>
      </div>
    `;
  }).join('');
  return `
    <div class="skill-card" role="region" aria-label="Conocimientos ${escapeHtml(cat.categoria)}">
      <div class="skill-category">
        <h3>${escapeHtml(cat.categoria)}</h3>
        <span class="muted">${cat.items.length} items</span>
      </div>
      <div class="skill-items">${items}</div>
    </div>
  `;
}

function renderProyecto(p) {
  const techs = (p.tecnologias || []).map(t => `<small class="muted">${escapeHtml(t)}</small>`).join(' ');
  return `
    <article class="project-card" id="project-${escapeHtml(p.id)}">
      <h4>${escapeHtml(p.titulo)}</h4>
      <div class="project-meta">${escapeHtml(p.fecha)} • ${techs}</div>
      <p>${escapeHtml(p.descripcion)}</p>
      <p><a class="btn" href="${escapeHtml(p.enlace)}" target="_blank" rel="noopener">Ver proyecto</a></p>
    </article>
  `;
}

function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}