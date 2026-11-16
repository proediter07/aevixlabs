/* Aevix Labs - Interactive Engine */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive ROI Calculator
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

    // Conservative clinical conversion calculation:
    // With instant thumb-zone booking & 100/100 speed, +0.8% to +1.2% additional appointment requests
    const additionalAppointments = Math.round(visitors * 0.009);
    const totalGain = Math.max(additionalAppointments, 2) * caseValue;
    monthlyRevenueGain.textContent = '+€' + totalGain.toLocaleString();
  }

  if (caseValInput && visitorsInput) {
    caseValInput.addEventListener('input', updateCalculator);
    visitorsInput.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 2. Smooth Scroll for Anchor Links
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
