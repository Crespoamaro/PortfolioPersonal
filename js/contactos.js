export function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validación básica
    if (!name || !email || !message) {
      feedback.textContent = 'Por favor, rellena todos los campos.';
      feedback.style.color = '#f97316'; 
      return;
    }

    // Preparar mailto
    const subject = encodeURIComponent(`Contacto desde portfolio: ${name}`);
    const body = encodeURIComponent(`${message}\n\n--\n${name}\n${email}`);
    const mailto = `mailto:david.crespo.amaro@gmail.com?subject=${subject}&body=${body}`;

    // Mostrar feedback inicial
    feedback.textContent = 'Preparando correo...';
    feedback.style.color = 'lightgreen';

    // Abrir cliente de correo
    window.location.href = mailto;

    // Esperar un poco antes de limpiar
    setTimeout(() => {
      feedback.textContent = 'El mensaje ha sido abierto en tu cliente de correo. Para envío automático, configura un endpoint en el servidor.';
      feedback.style.color = '#22c55e';
    }, 800);

    // Limpiar formulario después de un pequeño retraso para evitar borrar datos antes de abrir el correo
    setTimeout(() => {
      form.reset();
    }, 500);
  });
}
