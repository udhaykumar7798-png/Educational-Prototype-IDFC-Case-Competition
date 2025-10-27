function showSection(id) {
  document.querySelectorAll('section').forEach(i => {
    i.classList.add('hidden'); i.classList.remove('active');
  });
  document.getElementById(id).classList.remove('hidden');
  document.getElementById(id).classList.add('active');
}

// Persona greeting and local language support
document.getElementById('fetchProfile').onclick = function() {
  let user = document.getElementById('mobile').value;
  let lang = document.getElementById('localLang').value;
  let message = (lang === 'hi')
    ? `सुनिता जी, आपका आवेदन प्रारंभ हुआ`
    : `Welcome, Sunita! Starting your loan application.`;
  document.getElementById('welcomeMsg').innerText = message;
}

// Step transition
document.getElementById('nextStep').onclick = function() {
  let valid = document.getElementById('consentCheck').checked;
  if (!valid) { alert("Please provide consent to continue."); return; }
  showSection('valuation');
}

// Simple valuation logic (can extend with API)
const circleRates = {
  'Pune-Baner': 12500,
  'Indore-Vijay Nagar': 8500,
  'Nashik-College Road': 6800
};

document.getElementById('calculateValueBtn').onclick = function() {
  let loc = document.getElementById('location').value;
  let size = Number(document.getElementById('propertySize').value);
  let type = document.getElementById('propertyType').value;
  let base = circleRates[loc] * size;
  let estimate = type === 'Agricultural' ? base * 0.7 : base;
  document.getElementById('valuationDisplay').innerText =
    `Estimated Value: ₹${estimate.toLocaleString()} (AVM, AI-Checked)`;
}

// Add dashboard functionality, animation, or localization as needed

