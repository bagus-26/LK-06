// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.querySelector('.theme-icon');
  const htmlElement = document.documentElement;

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    let theme;

    if (savedTheme) {
      theme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = prefersDark ? 'dark' : 'light';
    }

    setTheme(theme);
  };

  // Set theme and update DOM
  const setTheme = (theme) => {
    if (theme === 'dark') {
      htmlElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Add animation
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.style.transform = 'rotate(0deg)';
    }, 300);
  };

  // Event listeners
  themeToggle.addEventListener('click', toggleTheme);

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Initialize on page load
  initializeTheme();
});
