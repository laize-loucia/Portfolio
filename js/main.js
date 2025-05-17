// Initialisation AOS
AOS.init({
    duration: 1000,
    //once: true
  });
  
  // Gestion de la bio
  const toggle = document.getElementById("toggleBio");
  const bio = document.getElementById("bio");
  
  toggle.addEventListener("click", () => {
    bio.classList.toggle("show");
  });
  
  // Navigation fluide
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        if (bio.classList.contains('show')) {
          bio.classList.remove('show');
        }
      }
    });
  });
  
  // Gestion de la langue
  let currentLang = 'fr';
  let translations = {};
  
  async function loadTranslations() {
    const response = await fetch('main.json');
    translations = await response.json();
  }
  
  function updateContent(lang) {
    const langData = translations[lang] || translations['fr'];
  
    // Met à jour le titre et meta
    document.title = langData.meta.title;
    document.querySelector('meta[name="description"]').setAttribute('content', langData.meta.description);
  
    // Navigation
    document.getElementById('nav-about').textContent = langData.nav.about;
    document.getElementById('nav-works').textContent = langData.nav.projects;
    document.getElementById('nav-skills').textContent = langData.nav.skills;
    document.getElementById('nav-contact').textContent = langData.nav.contact;
  
    // Bio
    document.querySelector('.presentation p').innerHTML = langData.bio.content;
  
    // Section À propos
    document.querySelector('.about-bio h2').innerHTML = langData.about.title;
    document.querySelector('.about-bio p').innerHTML = langData.about.content;
    document.querySelector('.about-bio h3').textContent = langData.about.skills_title;
  
    // Compétences principales
    const carouselItems = document.querySelectorAll('.carousel-item');
    langData.about.skills.forEach((skill, index) => {
      if (carouselItems[index]) {
        carouselItems[index].innerHTML = skill;
      }
    });
  
    // Projets
    document.querySelector('.projects-section .section-title').textContent = langData.projects.title;
    const projectTitles = document.querySelectorAll('.project-title');
    const projectDescriptions = document.querySelectorAll('.project-description');
    langData.projects.items.forEach((project, index) => {
      if (projectTitles[index]) {
        projectTitles[index].textContent = project.title;
      }
      if (projectDescriptions[index]) {
        projectDescriptions[index].textContent = project.description;
      }
    });
  
    // Compétences
    document.querySelector('.skills-section .section-title').innerHTML = langData.skills.title;
  
    // Footer
    document.querySelector('.site-footer p').innerHTML = langData.footer.copyright;
  
    // Boutons de langue
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
      }
    });
  
    // Sauvegarde
    localStorage.setItem('selectedLang', lang);
  }
  
  // Gestion bouton de bascule (toggle)
  const langToggleBtn = document.getElementById('langToggleBtn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'fr' ? 'en' : 'fr';
      updateContent(currentLang);
      langToggleBtn.textContent = currentLang.toUpperCase();
    });
  }
  
  // Détection changement de langue via les boutons (ex: EN | FR)
  document.addEventListener('DOMContentLoaded', () => {
    loadTranslations().then(() => {
      const savedLang = localStorage.getItem('selectedLang');
      currentLang = savedLang || 'fr';
      updateContent(currentLang);
    });
  
    document.querySelector('.language-switcher')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('lang-btn')) {
        currentLang = e.target.dataset.lang;
        updateContent(currentLang);
      }
    });
  });
  