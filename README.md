# Portfolio — Segoju Pavanputra Chary

A production-ready, single-page portfolio website built with pure HTML, CSS, and JavaScript.

## Features

- **Dark minimal aesthetic** with electric accent
- Fully responsive (320px → 1440px+)
- Sticky navbar with hamburger menu
- Smooth scroll navigation with progress indicator
- Scroll reveal animations (IntersectionObserver)
- Contact form with EmailJS integration
- GitHub stats integration
- SEO meta tags and Open Graph support
- Semantic HTML5 with ARIA labels

## Tech Stack

| Layer   | Technology                           |
|---------|--------------------------------------|
| Markup  | HTML5                                |
| Styling | Vanilla CSS (custom properties)      |
| Logic   | Vanilla JavaScript (ES5+ compatible) |
| Fonts   | Google Fonts — Inter                 |
| Icons   | Font Awesome 6                       |
| Email   | EmailJS SDK                          |

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/pavanputhra/portfolio.git
   cd portfolio
   ```

2. Open `index.html` in your browser — no build step required.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g., `main`) and set the folder to `/ (root)`.
4. Click **Save**. Your site will be live at:

   ```
   https://<username>.github.io/portfolio/
   ```

## Configuring EmailJS

1. Create an account at [emailjs.com](https://www.emailjs.com/).
2. Create a new **Email Service** and an **Email Template**.
3. Replace the placeholder values in `assets/js/script.js`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`

## License

© 2026 Segoju Pavanputra Chary. All rights reserved.
