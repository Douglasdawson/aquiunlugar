/* ============================================
   AQUÍ UN LUGAR — WIZARD DE RESERVAS
   ============================================ */

/* #14 — Support lazy-loading: run immediately if DOM already ready */
(function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
    return;
  }
  const wizard = document.getElementById('wizard');
  if (!wizard) return;

  const modal = wizard.querySelector('.wizard-modal');
  const closeBtn = wizard.querySelector('.wizard-close');
  const panels = wizard.querySelectorAll('.wizard-panel');
  const dots = wizard.querySelectorAll('.wizard-step-dot');
  const activityContainer = wizard.querySelector('[data-name="activity"]');
  const form = document.getElementById('wizard-form');
  const dateInput = document.getElementById('wizard-date');

  let currentStep = 1;
  let selectedType = '';
  let selectedActivity = '';
  let triggerElement = null;

  // Activity options per type
  const activities = {
    taller: [
      { value: 'Macramé', icon: '#icon-macrame' },
      { value: 'Pintura', icon: '#icon-pintura' },
      { value: 'Bordado', icon: '#icon-bordado' },
      { value: 'Mosaiquismo', icon: '#icon-mosaico' },
      { value: 'Customizar ropa', icon: '#icon-ropa' },
      { value: 'Decoupage', icon: '#icon-decoupage' }
    ],
    experiencia: [
      { value: 'Amigas', icon: '#icon-amigas' },
      { value: 'Team building', icon: '#icon-team' },
      { value: 'Cumpleaños', icon: '#icon-cumple' },
      { value: 'Familias', icon: '#icon-familias' }
    ],
    kit: [
      { value: 'Kit Macramé', icon: '#icon-macrame' },
      { value: 'Kit Bordado', icon: '#icon-bordado' },
      { value: 'Kit Pintura', icon: '#icon-pintura' }
    ]
  };

  // Type labels for the WhatsApp message
  const typeLabels = {
    taller: 'Taller individual',
    experiencia: 'Experiencia en grupo',
    kit: 'Kit para casa'
  };

  // --- Helpers ---

  function setMinDate() {
    if (dateInput) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }
  }

  function goToStep(step) {
    currentStep = step;
    panels.forEach(p => p.classList.toggle('active', parseInt(p.dataset.panel) === step));
    dots.forEach(d => {
      const s = parseInt(d.dataset.step);
      d.classList.toggle('active', s === step);
      d.classList.toggle('done', s < step);
    });
  }

  function populateActivities(type) {
    if (!activityContainer) return;
    const list = activities[type] || [];
    activityContainer.innerHTML = list.map(a => `
      <button type="button" class="wizard-option" data-value="${a.value}">
        <svg class="icon" aria-hidden="true"><use href="${a.icon}"/></svg>
        <span>${a.value}</span>
      </button>
    `).join('');

    // Bind click events on new buttons
    activityContainer.querySelectorAll('.wizard-option').forEach(btn => {
      btn.addEventListener('click', () => {
        activityContainer.querySelectorAll('.wizard-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedActivity = btn.dataset.value;
        goToStep(3);
      });
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
  }

  function buildWhatsAppMessage() {
    const name = document.getElementById('wizard-name').value.trim();
    const people = document.getElementById('wizard-people').value;
    const date = document.getElementById('wizard-date').value;
    const comment = document.getElementById('wizard-comment').value.trim();

    let msg = `¡Hola! Me gustaría reservar:\n`;
    msg += `- Tipo: ${typeLabels[selectedType] || selectedType}\n`;
    msg += `- Actividad: ${selectedActivity}\n`;
    msg += `- Personas: ${people}\n`;
    if (date) msg += `- Fecha preferida: ${formatDate(date)}\n`;
    msg += `- Nombre: ${name}\n`;
    if (comment) msg += `- Comentario: ${comment}\n`;

    return msg;
  }

  function openWhatsApp(message) {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/34676807577?text=${encoded}`, '_blank');
  }

  // --- Open / Close ---

  function open(type, activity) {
    triggerElement = document.activeElement;
    setMinDate();

    if (type && activity) {
      // Direct open (e.g., from kit button) — skip to step 3
      selectedType = type;
      selectedActivity = activity;
      goToStep(3);
    } else {
      // Reset
      selectedType = '';
      selectedActivity = '';
      wizard.querySelectorAll('.wizard-option').forEach(b => b.classList.remove('selected'));
      if (form) form.reset();
      goToStep(1);
    }

    wizard.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    wizard.classList.remove('active');
    document.body.style.overflow = '';
    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  }

  // --- Event Listeners ---

  // Open triggers
  document.querySelectorAll('[data-open-wizard]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const type = el.dataset.wizardType || '';
      const activity = el.dataset.wizardActivity || '';
      open(type, activity);
    });
  });

  // Close
  closeBtn.addEventListener('click', close);
  wizard.addEventListener('click', (e) => {
    if (e.target === wizard) close();
  });

  // Step 1: Type selection
  wizard.querySelectorAll('[data-name="type"] .wizard-option').forEach(btn => {
    btn.addEventListener('click', () => {
      wizard.querySelectorAll('[data-name="type"] .wizard-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedType = btn.dataset.value;
      populateActivities(selectedType);
      goToStep(2);
    });
  });

  // Back buttons
  wizard.querySelectorAll('.wizard-back').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) goToStep(currentStep - 1);
    });
  });

  // Form submit
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wizard-name').value.trim();
      if (!name) {
        document.getElementById('wizard-name').focus();
        return;
      }
      const message = buildWhatsAppMessage();
      openWhatsApp(message);
      close();
    });
  }

  // Keyboard: Escape to close, focus trap
  document.addEventListener('keydown', (e) => {
    if (!wizard.classList.contains('active')) return;
    if (e.key === 'Escape') {
      close();
      return;
    }
    // Focus trap
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  });
})();
