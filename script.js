const page = document.getElementById('page');

const buttons = document.querySelectorAll('.animated-btn');
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    button.classList.add('clicked');
    const url = button.getAttribute('data-link');
    setTimeout(() => {
      window.location.href = url;
    }, 200);
  });
});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
  if ((e.ctrlKey && ['c','s','u','a'].includes(e.key.toLowerCase())) ||
      (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') ||
      e.key === 'F12') {
    e.preventDefault();
  }
});

let devtoolsOpen = false;
const detectDevTools = () => {
  const start = new Date();
  debugger;
  const end = new Date();
  if (end - start > 100) {
    devtoolsOpen = true;
  } else {
    devtoolsOpen = false;
  }

  if (devtoolsOpen) {
    page.classList.add('hidden');
    window.open("https://www.google.com/search?q=Developer+mode+is+not+allowed", "_blank");
  } else {
    page.classList.remove('hidden');
  }
};

setInterval(detectDevTools, 1000);
