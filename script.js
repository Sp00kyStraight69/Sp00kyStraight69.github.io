(function() {
  'use strict';
  
  const ua = navigator.userAgent;
  const isDesktop = /Windows NT 10.0|Windows NT 6.[2-9]/i.test(ua) && 
                   !/Touch|Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
  
  const warningScreen = document.getElementById('warning-screen');
  if (!isDesktop) {
    warningScreen.style.display = 'flex';
    document.querySelector('.title-area').style.display = 'none';
    document.querySelector('.button-area').style.display = 'none';
    document.body.style.overflow = 'hidden';
    return;
  }

  let loadTimeout;
  window.addEventListener('load', () => {
    clearTimeout(loadTimeout);
    loadTimeout = setTimeout(() => {
      document.body.classList.add('loaded');
    }, 50);
  });

  const anchors = document.querySelectorAll('a[href]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', e => {
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
    });
  });

  const creditsBtn = document.getElementById('credits-btn');
  const creditsSection = document.getElementById('credits-section');
  let creditsVisible = false;

  creditsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (creditsVisible) {
      creditsSection.classList.add('fade-out');
      setTimeout(() => {
        creditsSection.classList.remove('active', 'fade-out');
        document.body.classList.remove('credits-active');
        creditsBtn.setAttribute('aria-pressed', 'false');
        creditsSection.setAttribute('aria-hidden', 'true');
        creditsVisible = false;
      }, 400);
    } else {
      creditsSection.classList.add('active');
      document.body.classList.add('credits-active');
      creditsBtn.setAttribute('aria-pressed', 'true');
      creditsSection.setAttribute('aria-hidden', 'false');
      creditsVisible = true;
    }
  });

  document.addEventListener('keydown', e => {
    const disabledKeys = [
      'F12',
      'F11'
    ];
    const ctrlShiftKeys = ['I', 'J', 'C'];
    const ctrlKeys = ['U', 'S'];
    
    if (disabledKeys.includes(e.key) ||
        (e.ctrlKey && e.shiftKey && ctrlShiftKeys.includes(e.key.toUpperCase())) ||
        (e.ctrlKey && ctrlKeys.includes(e.key.toUpperCase())) ||
        (e.metaKey && ctrlKeys.includes(e.key.toUpperCase()))) {
      e.preventDefault();
      e.stopPropagation();
      alert("Developer tools access is disabled.");
      return false;
    }
  }, true); 

  window.addEventListener('contextmenu', e => {
    e.preventDefault();
    return false;
  }, true);

  document.addEventListener('selectstart', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  let rafId;
  const smoothScroll = () => {
    rafId = requestAnimationFrame(smoothScroll);
  };
  smoothScroll();
})();
