# Personal Portfolio Website

A modern, responsive personal portfolio website built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies beyond a few CDN-loaded libraries. Projects are loaded dynamically from the GitHub API, so keeping the portfolio up to date is as simple as tagging a repo with a topic on GitHub.

## Live Features

- **Dynamic project cards** — Fetches repos tagged with the `portfolio` topic from GitHub and renders them automatically; rich overrides (custom title, description, image) configurable in `projects.js`
- **Tech-stack filter** — Filter buttons generated at runtime from the actual tags on each repo, letting visitors explore projects by language or tool
- **Animated skill bars** — Progress bars animate into view when scrolled into the viewport
- **Responsive timeline** — Zig-zag timeline layout for experience and education entries, collapses to single-column on mobile
- **Contact form** — Powered by [Formspree](https://formspree.io) — no backend needed
- **Mobile navigation** — Hamburger menu for small screens; smooth-scroll between sections
- **Zero JS frameworks** — Pure ES6 with no bundler or build step required

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, flexbox, media queries) |
| Logic | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 5 |
| Fonts | Google Fonts — Roboto |
| Projects API | GitHub REST API v3 |
| Contact form | Formspree |

## Project Structure

```
portfolio-website/
├── index.html          # Single-page layout (all sections)
├── css/
│   └── style.css       # All styles — variables, layout, components, responsive
├── js/
│   ├── projects.js     # GitHub API fetch, project overrides, render logic
│   └── script.js       # Nav, skill animation, contact form handler
└── image/
    ├── bg-img.jpg      # Header background
    ├── favicon.ico
    └── ...             # Project preview images
```

## How the Project Cards Work

Any GitHub repo tagged with the **`portfolio`** topic will appear automatically on the Projects section. Additional tags on the repo (e.g. `python`, `react`, `machine-learning`) become the tech-stack chips shown on the card and also populate the filter buttons.

To add richer metadata (custom title, description, or preview image) for a specific repo, add an entry to the `projectOverrides` object in [js/projects.js](js/projects.js):

```js
const projectOverrides = {
  'my-repo-name': {
    title: 'Human-readable title',
    description: 'A richer description than what GitHub shows.',
    image: 'image/my-preview.png',   // optional local or remote image
  },
};
```

## Setup & Customisation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/Portfolio-Website.git
cd Portfolio-Website
```

### 2. Set your GitHub username
In [js/projects.js](js/projects.js), update line 1:
```js
const GITHUB_USERNAME = 'yourusername';
```

### 3. Set up the contact form
1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the form ID
3. In [js/script.js](js/script.js), update the endpoint:
```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

### 4. Update personal details in `index.html`
Replace the placeholder text with your own:
- Name, about paragraph
- LinkedIn / GitHub / email links in the header and contact section
- Experience and education entries (company names, dates, descriptions)
- Profile photo (`image/my_image.jpg`)

### 5. Open locally
No build step needed — just open `index.html` in a browser, or serve it with any static file server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

### 6. Deploy
The site is entirely static — deploy to **GitHub Pages**, **Netlify**, **Vercel**, or any static host.

**GitHub Pages (quickest):**
1. Push the repo to GitHub
2. Go to **Settings → Pages → Source → Deploy from branch → `main` / `root`**
3. Your site will be live at `https://yourusername.github.io/Portfolio-Website`

## Screenshots

> Add screenshots of your portfolio here once you have your personal details filled in.

## License

This project is open source and available under the [MIT License](LICENSE).
