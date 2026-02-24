const GITHUB_USERNAME = 'yourusername';

// Optional overrides per repo name (key = exact GitHub repo name)
// Use this to provide a richer title, image, or description than what GitHub shows.
// Any repo tagged with the "portfolio" topic on GitHub will appear automatically.
const projectOverrides = {
  'Gemini-Powered-RAG-System': {
    title: 'Gemini Powered RAG System',
    description: 'Production-ready RAG application that enables intelligent Q&A over PDF documents using Google Gemini. Features semantic search, source attribution, conversation memory, and enterprise-grade security including PII detection, injection prevention, and real-time monitoring.',
  },
  'Responsible-AI': {
    title: 'Responsible AI',
    description: 'Empirical study comparing process-based vs. outcome-based LLM supervision on GSM8K — evaluating accuracy, interpretability, and legal/regulatory compliance implications (GDPR, EU AI Act).',
  },
  'Revenue-Dashboard': {
    title: 'Sales Dashboard',
    description: 'Built a sales dashboard using React, Redux Toolkit, Node.js, Express, and MongoDB with JWT authentication and role-based access control. Designed and integrated RESTful APIs to fetch, filter, and visualize sales data via Recharts and Tailwind CSS, supporting real-time analytics, responsive layout, and complete CRUD operations.',
  },
  'Realtime-Multiplayer-Chess-Game': {
    title: 'Real-Time Multiplayer Chess Game',
    image: 'image/chess_img.jpg',
    description: 'Built a real-time multiplayer chess application using Next.js, Socket.IO, and chess.js. Features include spectator mode, in-game chat with typing indicators, sound alerts, and dynamic FEN-based move navigation. Implemented interactive features like clickable move history, king-in-check highlighting, and URL-based dynamic game sessions.',
  },
  'Snake_Game': {
    title: 'Snake Game',
    image: 'image/snake_game.jpg',
    description: 'Developed an interactive Snake Game in Java using Swing and AWT. Features include multi-state UI (Menu, Gameplay, Game Over), custom-designed graphics, smooth keyboard controls, and real-time collision detection. Implemented snake growth logic, adjustable speed, and a replay feature to enhance experience.',
  },
  'Student-Performance-Indicator': {
    title: 'Student Performance Prediction',
    image: 'image/prediction.png',
    description: 'Developed a machine learning pipeline for student performance prediction. Implemented Ridge Regression and CatBoost models, optimizing RMSE through feature engineering and hyperparameter tuning. Designed and deployed a robust preprocessing pipeline and performed exploratory data analysis on student datasets.',
  },
};

// ---------------------------------------------------------------------------
// Demo projects — rendered when GITHUB_USERNAME is still the placeholder or
// when the GitHub API returns no repos tagged with the "portfolio" topic.
// Replace this array (or configure the API path above) with your real projects.
// ---------------------------------------------------------------------------
const demoProjects = [
  {
    id: 'rag-system',
    title: 'Gemini Powered RAG System',
    image: 'https://placehold.co/300x250/0366d6/ffffff?text=RAG+System',
    description: 'Production-ready RAG application that enables intelligent Q&A over PDF documents using Google Gemini. Features semantic search, source attribution, conversation memory, and enterprise-grade security including PII detection, injection prevention, and real-time monitoring.',
    techStack: ['Python', 'LangChain', 'Google Gemini', 'FastAPI', 'machine-learning'],
    date: 'Jan 2025',
    link: '#',
  },
  {
    id: 'chess-game',
    title: 'Real-Time Multiplayer Chess Game',
    image: 'image/chess_img.jpg',
    description: 'Built a real-time multiplayer chess application using Next.js, Socket.IO, and chess.js. Features include spectator mode, in-game chat with typing indicators, sound alerts, and dynamic FEN-based move navigation. Implemented interactive features like clickable move history, king-in-check highlighting, and URL-based dynamic game sessions.',
    techStack: ['Next.js', 'Socket.IO', 'JavaScript', 'CSS'],
    date: 'Nov 2024',
    link: '#',
  },
  {
    id: 'sales-dashboard',
    title: 'Sales Dashboard',
    image: 'https://placehold.co/300x250/d73a49/ffffff?text=Sales+Dashboard',
    description: 'Built a sales dashboard using React, Redux Toolkit, Node.js, Express, and MongoDB with JWT authentication and role-based access control. Designed and integrated RESTful APIs to fetch, filter, and visualize sales data via Recharts and Tailwind CSS, supporting real-time analytics, responsive layout, and complete CRUD operations.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    date: 'Sep 2024',
    link: '#',
  },
  {
    id: 'student-performance',
    title: 'Student Performance Prediction',
    image: 'image/prediction.png',
    description: 'Developed a machine learning pipeline for student performance prediction. Implemented Ridge Regression and CatBoost models, optimizing RMSE through feature engineering and hyperparameter tuning. Designed and deployed a robust preprocessing pipeline and performed exploratory data analysis on student datasets.',
    techStack: ['Python', 'scikit-learn', 'CatBoost', 'machine-learning', 'pandas'],
    date: 'Jul 2024',
    link: '#',
  },
  {
    id: 'snake-game',
    title: 'Snake Game',
    image: 'image/snake_game.jpg',
    description: 'Developed an interactive Snake Game in Java using Swing and AWT. Features include multi-state UI (Menu, Gameplay, Game Over), custom-designed graphics, smooth keyboard controls, and real-time collision detection. Implemented snake growth logic, adjustable speed, and a replay feature to enhance experience.',
    techStack: ['Java', 'Swing', 'AWT'],
    date: 'Apr 2024',
    link: '#',
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI Research',
    image: 'https://placehold.co/300x250/0b8176/ffffff?text=Responsible+AI',
    description: 'Empirical study comparing process-based vs. outcome-based LLM supervision on GSM8K — evaluating accuracy, interpretability, and legal/regulatory compliance implications (GDPR, EU AI Act).',
    techStack: ['Python', 'machine-learning', 'NLP', 'research'],
    date: 'Feb 2025',
    link: '#',
  },
];

function formatRepoName(name) {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

async function fetchAndRenderProjects() {
  const container = document.getElementById('portfolio-container');
  container.innerHTML = '<p style="text-align:center;color:#586069;padding:2rem;">Loading projects...</p>';

  // Use demo projects when the username hasn't been configured yet
  if (GITHUB_USERNAME === 'yourusername') {
    renderProjects(demoProjects);
    initProjectFilters(demoProjects);
    return;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`
    );
    if (!res.ok) throw new Error('GitHub API error');
    const repos = await res.json();

    // Only show repos tagged with the "portfolio" topic on GitHub
    const portfolioRepos = repos
      .filter(r => r.topics && r.topics.includes('portfolio'))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Fall back to demo projects if no portfolio-tagged repos found
    if (portfolioRepos.length === 0) {
      renderProjects(demoProjects);
      initProjectFilters(demoProjects);
      return;
    }

    const projects = portfolioRepos.map(repo => {
      const override = projectOverrides[repo.name] || {};
      const techStack = repo.topics.filter(t => t !== 'portfolio');
      if (repo.language && !techStack.map(t => t.toLowerCase()).includes(repo.language.toLowerCase())) {
        techStack.push(repo.language);
      }
      return {
        id: repo.name,
        title: override.title || formatRepoName(repo.name),
        image: override.image || `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/main/preview.png`,
        description: override.description || repo.description || 'No description provided.',
        techStack,
        date: formatDate(repo.created_at),
        link: repo.html_url,
      };
    });

    renderProjects(projects);
    initProjectFilters(projects);
  } catch (e) {
    // Fall back to demo projects on API error
    renderProjects(demoProjects);
    initProjectFilters(demoProjects);
  }
}

function renderProjects(projects) {
  const container = document.getElementById('portfolio-container');
  container.innerHTML = '';
  projects.forEach(project => {
    const el = document.createElement('div');
    el.className = 'portfolio-item';
    el.setAttribute('data-id', project.id);
    el.innerHTML = `
      <div class="portfolio-image-container">
        <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/300x250?text=${encodeURIComponent(project.title)}'">
      </div>
      <div class="portfolio-description">
        <h3>${project.title}</h3>
        <p class="experience-description text-justify">${project.description}</p>
        <div class="portfolio-meta">
          <span class="portfolio-date">${project.date}</span>
          ${project.link && project.link !== '#' ? `<a href="${project.link}" target="_blank" class="portfolio-link">View Project</a>` : ''}
        </div>
        <div class="portfolio-tech-stack">
          ${project.techStack.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProjects);
