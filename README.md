## Prasad Hiwarkhede — Terminal Portfolio (Next.js)

Minimal, full-screen terminal-style portfolio built with Next.js App Router. Type commands like a shell to explore profile, skills, and projects fetched live from GitHub.

### Demo (local)
- Visit http://localhost:3000 after starting the dev server.

### Features
- Full-page terminal UI with keyboard input
- Commands: `help`, `about`, `skills`, `projects`, `links`, `clear`/`cls`
- Extra: `projects all` or `sudo projects all` to list more repositories
- Live GitHub repo feed via `/api/projects`
- Minimal CSS, no UI frameworks (simple, clean)

### Commands
```
help                   Show this help
about                  About Prasad
skills                 Key skills
projects               Recent GitHub projects
projects all           Show more repositories
links                  External links
clear | cls            Clear the terminal

# Extras
sudo projects all      Show more repositories (alias of projects all)
```

### Skills shown
- Full-Stack: MERN (MongoDB, Express.js, React.js, Node.js)
- APIs: RESTful APIs
- Backend: Node.js, Express.js
- Frontend: HTML, CSS, JavaScript, Tailwind CSS, Material UI, React, Next.js
- Databases: MongoDB, Firebase, MySQL
- Tools: Git, GitHub

### Tech Stack
- Next.js 15 (App Router)
- React 19
- Node.js runtime

### Getting Started
```bash
npm install
npm run dev
# open http://localhost:3000
```

### API
- `GET /api/projects?limit=6` — returns top repositories by stars (default limit 6)
- Query: `limit` (1–50)

Response shape:
```json
[
  { "name": "repo-name", "stars": 10, "url": "https://github.com/user/repo-name" }
]
```

### Customization
- Commands and output: `src/app/page.js`
- Global styles (terminal look): `src/app/globals.css`
- GitHub fetch route: `src/app/api/projects/route.js`
- Change GitHub username in `route.js` if needed.

### Deployment
- Any Next.js-compatible platform (Vercel, Netlify, etc.)
```bash
npm run build
npm start
```

### Credits
- GitHub profile used for data: https://github.com/HiwarkhedePrasad
