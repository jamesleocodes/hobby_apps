# Daily Vibes

A simple, modern web app for tracking your daily mood with emojis and notes. Built with React and Vite, supporting multiple users and persistent mood history.

## Features
- Select your mood from a list of emojis
- Optionally write a short note about your day
- Choose your user (Shin, Zaw, Cho)
- View a history of all mood entries, including date, note, and user
- Mood history is saved in your browser (localStorage)
- Responsive, clean, and light UI

## Live Demo
Once deployed, your app will be available at:
```
https://daily-vibes-817f41.gitlab.io/
```

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm

### Installation
1. Clone the repository:
   ```sh
   git clone https://gitlab.com/zaw30/daily-vibes.git
   cd daily-vibes
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Select your user from the dropdown at the top.
- Click an emoji to select your mood.
- Optionally, write a note about your day.
- Click "Save Mood" to add your entry to the history.
- Your mood history will appear below, showing the date, mood, note, and user.
- All data is saved in your browser and will persist after refresh.

## Deployment (GitLab Pages)
1. Ensure your `vite.config.ts` has:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/',
   })
   ```
2. Ensure your `.gitlab-ci.yml` includes:
   ```yaml
   image: node:18

   pages:
     script:
       - npm ci
       - npm run build
       - touch dist/.nojekyll
       - mv dist public
     artifacts:
       paths:
         - public
     only:
       - main
   ```
3. Commit and push your changes:
   ```sh
   git add .
   git commit -m "Deploy to GitLab Pages"
   git push
   ```
4. Wait for the pipeline to finish, then visit [https://daily-vibes-817f41.gitlab.io/](https://daily-vibes-817f41.gitlab.io/)

## Contributing
Pull requests and suggestions are welcome!

## License
MIT
