/* Aevix Labs - Interactive Engine & Multi-Palette Switcher */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher System
  const savedTheme = localStorage.getItem('aevix-theme') || 'cobalt';
  setTheme(savedTheme);

  const paletteButtons = document.querySelectorAll('.palette-btn');
  paletteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aevix-theme', theme);

    // Update active state on buttons
    document.querySelectorAll('.palette-btn').forEach(b => {
      if (b.getAttribute('data-theme') === theme) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Dynamically adjust SVG logo colors to match active theme
    const logoAccents = document.querySelectorAll('.logo-dynamic-accent');
    const colorMap = {
      'cobalt': '#0284c7',
      'titanium': '#ffffff',
      'gold': '#f59e0b',
      'emerald': '#10b981'
    };
    const activeColor = colorMap[theme] || '#0284c7';
    logoAccents.forEach(el => {
      el.setAttribute('fill', activeColor);
      el.setAttribute('stroke', activeColor);
    });
  }

  // 2. Interactive ROI Calculator
  const caseValInput = document.getElementById('caseValue');
  const visitorsInput = document.getElementById('visitorsValue');
  const caseValDisplay = document.getElementById('caseValDisplay');
  const visitorsDisplay = document.getElementById('visitorsDisplay');
  const monthlyRevenueGain = document.getElementById('monthlyGain');

  function updateCalculator() {
    if (!caseValInput || !visitorsInput || !monthlyRevenueGain) return;
    const caseValue = parseInt(caseValInput.value, 10);
    const visitors = parseInt(visitorsInput.value, 10);
    
    caseValDisplay.textContent = '€' + caseValue.toLocaleString();
    visitorsDisplay.textContent = visitors.toLocaleString() + ' /mo';

    const additionalAppointments = Math.round(visitors * 0.009);
    const totalGain = Math.max(additionalAppointments, 2) * caseValue;
    monthlyRevenueGain.textContent = '+€' + totalGain.toLocaleString();
  }

  if (caseValInput && visitorsInput) {
    caseValInput.addEventListener('input', updateCalculator);
    visitorsInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 3. Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
