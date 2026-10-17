<div align="center">

# 🎯 InterviewIQ — AI Mock Interview Hub

### 🚀 Practise smarter. Speak confidently. Crack your next interview.

An AI-powered mock interview platform built to help candidates practise technical and HR interviews, improve communication, and review structured feedback.

<p>
  <a href="https://mock-interview-hub-client.onrender.com/"><strong>🌐 Live Demo</strong></a>
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

</div>

---

## ✨ About the Project

**InterviewIQ** is an end-to-end mock interview platform designed to simulate interview practice with AI-assisted question generation, speech capabilities, and structured performance evaluation.

The goal is to give candidates a convenient place to practise answering questions, experience a more interactive interview flow, and identify areas for improvement before a real interview.

🔗 **Try it here:** [InterviewIQ — Live Application](https://mock-interview-hub-client.onrender.com/)

## 🌟 Key Features

- 🤖 **AI Interview Experience** — Interactive interviewer experience, including a talking-avatar visualisation where configured.
- 🎙️ **Speech-to-Text** — Answer questions using browser speech recognition where supported.
- 🔊 **Text-to-Speech** — Hear interviewer prompts using speech synthesis.
- 🧠 **Adaptive Question Difficulty** — A progressive five-question journey from Easy → Medium → Hard, where configured.
- 📊 **Structured Evaluation** — Feedback organised around confidence, communication, and correctness.
- 📄 **PDF Report Export** — Downloadable scorecards with evaluation metrics and improvement advice, where supported.
- 🔐 **Google Authentication** — Firebase Authentication with Google OAuth integration.
- 📑 **Resume Parsing** — Extract candidate skills and project details where configured.
- ⚡ **Responsive UI** — Modern interface with animations and transitions.
- 💾 **State Persistence** — Redux Toolkit and browser local storage for selected client-side state.

> ℹ️ Some features depend on API configuration, environment variables, browser permissions, and the current deployed build.

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ React 19
- ⚡ Vite 8
- 🎨 Tailwind CSS v4
- 🎞️ Motion for animations
- 🔄 Redux Toolkit for state management
- 🗣️ Web Speech API for speech recognition and synthesis
- 📄 jsPDF and autoTable for PDF generation

### ⚙️ Backend & Services
- 🟢 Node.js
- 🚏 Express-compatible API routes and controllers
- 🔥 Firebase Authentication
- 🔑 Google OAuth integration
- 🤖 Configurable AI provider/API integration
- ☁️ Render deployment

## 🧩 How It Works

1. 🔑 **Sign in** using the configured authentication flow.
2. 🎯 **Start practising** with the available interview flow.
3. 💬 **Answer questions** by typing or using speech features supported by your browser.
4. 🧠 **Review feedback** across the evaluation categories available in the application.
5. 📄 **Export your report** when PDF reporting is enabled.

## 🖥️ Run Locally

### 📋 Prerequisites

Make sure you have:
- [Node.js](https://nodejs.org/) installed
- npm installed
- Git installed
- Firebase configuration and any required AI/API credentials for the features you want to run

### 📥 1. Clone the repository

```bash
git clone https://github.com/madhav-kohli/mock-interview-hub.git

```

Replace the placeholders with your actual GitHub repository URL and folder name.

### 📦 2. Install dependencies

If your repository has separate `client` and `server` folders:

```bash
cd client
npm install
```

In a second terminal:

```bash
cd server
npm install
```

If the frontend is located at the repository root, run the install command in that directory instead. Check each `package.json` for the actual scripts.

### 🔐 3. Configure environment variables

Create `.env` files in the directories that need them. Use the exact variable names referenced by your source code.

Example backend configuration (`server/.env`):

```env
PORT=5000
# Add only variables used by your backend:
# MONGO_URI=your_database_connection_string
# JWT_SECRET=your_long_random_secret
# OPENROUTER_API_KEY=your_openrouter_api_key
```

Example frontend configuration (`client/.env`):

```env
# Examples only — use the names required by your code:
# VITE_API_BASE_URL=https://your-backend-service.onrender.com
# VITE_FIREBASE_API_KEY=your_firebase_web_api_key
# VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# VITE_FIREBASE_PROJECT_ID=your-project-id
```

⚠️ **Never commit real API keys, database credentials, JWT secrets, or `.env` files.** Do not expose private AI-provider keys through frontend variables prefixed with `VITE_`.

### ▶️ 4. Start the application

Start the frontend using the script defined in its `package.json` (a typical Vite project uses):

```bash
npm run dev
```

Start the backend in its own terminal using the script defined in `server/package.json`, for example:

```bash
npm start
```

If the backend has no start script and its entry file is `index.js`, you may use:

```bash
node index.js
```

## ☁️ Deployment on Render

### Backend — Web Service

For a backend whose `package.json` is inside `server/`, a typical configuration is:

| Setting | Value |
|---|---|
| Service Type | **Web Service** |
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `node index.js` — only if this is the actual entry file |
| Environment Variables | Add the variables required by the backend |

If your backend defines a valid `start` script, you can use `npm start` instead. Make sure the server listens on `process.env.PORT`.

### Frontend

The live application link above is the currently provided Render URL. If the frontend is deployed separately, use the build command and output directory specified by the project; a typical Vite setup uses `npm run build` and `dist`.

## 🔒 Security & Configuration

- 🔑 Store secret API keys on the server.
- 🛡️ Validate inputs and enforce access control in backend routes.
- 🔐 Configure Firebase authorised domains for the deployed site.
- 🚫 Keep demo/evaluator bypasses disabled or properly protected in production.
- 💸 Check third-party API usage limits and potential costs.

## 🧯 Troubleshooting

**PowerShell blocks `npm.ps1` on Windows**

Try:

```powershell
npm.cmd install
```

**Render deployment fails**

- Check that the Root Directory contains the backend `package.json`.
- Verify the build and start commands against your actual project files.
- Review Render deployment logs and required environment variables.
- Confirm the server uses `process.env.PORT`.

**Speech recognition does not work**

- Allow microphone access.
- Test in a supported browser over HTTPS.
- Use text input if the browser does not support the required speech API.

## 🤝 Contributing

Contributions and suggestions are welcome!

1. 🍴 Fork the repository.
2. 🌱 Create a feature branch.
3. 🧪 Test your changes.
4. 📬 Open a pull request describing your improvements.

## 📜 License

No license has been specified in this README. Add a `LICENSE` file if you intend to distribute the project under an open-source license.

---

<div align="center">

### 💙 If you find InterviewIQ useful, consider giving the repository a ⭐

**🌐 [Open InterviewIQ](https://mock-interview-hub-client.onrender.com/)**

*Built to make interview practice more accessible, interactive, and effective.*

</div>
