
/* ─── VALIDATION ──────────────────────────────────────────── */
function clearErrors(form = document) {
  form.querySelectorAll('.form-group input, .form-group select')
      .forEach(el => el.classList.remove('error'));
  form.querySelectorAll('.field-error')
      .forEach(el => el.remove());
}

function markError(el, message) {
  if (!el) return;
  el.classList.add('error');

  const msg = document.createElement('span');
  msg.className = 'field-error';
  msg.textContent = message;
  msg.style.cssText = 'display:block; font-size:0.75rem; color:#E53E3E; margin-top:4px; font-family:"DM Sans",sans-serif;';
  el.parentNode.appendChild(msg);

  el.style.animation = 'none';
  requestAnimationFrame(() => { el.style.animation = 'shake 0.35s ease'; });
}

function validateForm(form) {
  clearErrors(form);
  let valid = true;

  const nameEl = form.querySelector('[name="name"]');
  const phoneEl = form.querySelector('[name="phone"]');
  const locationEl = form.querySelector('[name="location"]');
  const courseEl = form.querySelector('[name="course"]');

  if (!nameEl || !nameEl.value.trim()) {
    markError(nameEl, 'Please enter your full name.');
    valid = false;
  }

  const rawPhone = (phoneEl?.value || '').replace(/^\+91[\s-]?/, '').replace(/\s|-/g, '');
  if (!phoneEl || !/^[6-9]\d{9}$/.test(rawPhone)) {
    markError(phoneEl, 'Enter a valid 10-digit Indian mobile number.');
    valid = false;
  }

  if (!locationEl || !locationEl.value.trim()) {
    markError(locationEl, 'Please enter your city or location.');
    valid = false;
  }

  if (!courseEl || !courseEl.value) {
    markError(courseEl, 'Please select a course.');
    valid = false;
  }

  return valid;
}

function getFormData(form) {
  return {
    name: form.querySelector('[name="name"]')?.value.trim() || '',
    phone: form.querySelector('[name="phone"]')?.value.trim() || '',
    location: form.querySelector('[name="location"]')?.value.trim() || '',
    course: form.querySelector('[name="course"]')?.value || '',
    form_type: form.querySelector('[name="form_type"]')?.value || '',
  };
}
// test
// const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzfRNGeVp0B4WvKGyb1w4QKUJUWL-VZ66H4OpcPJnEv6T8s5y6Z1jgkU8vyJMy8S7op9Q/exec";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-yujT3J2u9TNSndl-FIG22eqGNNUlEgC0GCHzBHfP8w3p1CdDg6L9SZGCxBQYzS8XZQ/exec";

async function handleFormSubmit(form, submitBtnId) {
  if (!validateForm(form)) {
    alert('Enter your details correctly.');
    return;
  }

  const formData = getFormData(form);
  const btn = document.getElementById(submitBtnId);

  btn.classList.add('loading');
  btn.disabled = true;

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(formData),
    });

    if (formData.form_type === 'download_full_syllabus') {
      window.location.href = 'https://drive.google.com/file/d/1JFvXNAM3T8_E93zvoJdo1PqwXur_ad76/view?usp=sharing';
    } else {
      window.location.href = './thank-you.html';
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('Something went wrong. Please try again.');
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

const inlineForm = document.getElementById('enroll-form');
if (inlineForm) {
  inlineForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(inlineForm, 'submit-btn');
  });
}

const popupForm = document.getElementById('enroll-form-popup');
if (popupForm) {
  popupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmit(popupForm, 'submit-btn-popup');
  });
}

const FORM_CONFIG = {
  grab_offer: {
    badge: '🔥 Limited Time Offer',
    title: 'Start Your IT Career in 90 Days',
    submitLabel: 'Grab My Offer →',
  },
  want_demo_class: {
    badge: '🎓 Free Career Counselling',
    title: 'Get a High-Paying IT Job in 90 Days',
    submitLabel: 'Get FREE Demo Class →',
  },
  download_full_syllabus: {
    badge: '📥 Download Syllabus',
    title: 'Get the Full Course Syllabus — Free!',
    submitLabel: 'Send Me the Syllabus →',
  },
};

/* ─── OPEN POPUP ──────────────────────────────────────────── */
function openPopup(formType) {
  const cfg = FORM_CONFIG[formType] || FORM_CONFIG.want_demo_class;
  const course = document.getElementById('course_field');
  course.style.display = 'block';

  document.getElementById('popup-card').setAttribute('data-badge', cfg.badge);
  document.getElementById('popup-title').textContent = cfg.title;
  document.getElementById('submit-label-popup').textContent = cfg.submitLabel;
  document.getElementById('form_type_popup').value = formType;

  document.getElementById('popup-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';

  setTimeout(() => document.getElementById('popup-f-name')?.focus(), 280);

  if (formType === 'download_full_syllabus') {
    course.style.display = 'none';
  }
}

/* ─── CLOSE POPUP ─────────────────────────────────────────── */
function closePopup() {
  document.getElementById('popup-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// Close on backdrop click
const popupOverlay = document.getElementById('popup-overlay');
if (popupOverlay) {
  popupOverlay.addEventListener('click', function(e) {
    if (e.target === this) closePopup();
  });
}

// Close on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePopup();
});

