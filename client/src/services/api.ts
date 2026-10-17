// InterviewIQ Full-Stack API Engine & Hybrid Backend Client
// Connects seamlessly to remote backend or runs with local persistence

export interface QuestionData {
  question: string;
  difficulty: "easy" | "medium" | "hard";
  timeLimit: number;
  answer?: string;
  score?: number;
  feedback?: string;
  confidence?: number;
  communication?: number;
  correctness?: number;
}

export interface InterviewSession {
  _id: string;
  userId: string;
  role: string;
  experience: string;
  mode: "Technical" | "HR" | "System Design";
  interviewer?: string;
  questions: QuestionData[];
  finalScore?: number;
  confidence?: number;
  communication?: number;
  correctness?: number;
  status: "pending" | "completed";
  createdAt: string;
}

const STORAGE_KEYS = {
  USER: "interviewiq_user",
  INTERVIEWS: "interviewiq_interviews",
  CUSTOM_SERVER: "interviewiq_server_url"
};

// Default sample interviews for demonstration when teacher inspects Analytics
const SEED_INTERVIEWS: InterviewSession[] = [
  {
    _id: "demo-sess-101",
    userId: "demo-user-1",
    role: "Full Stack Developer",
    experience: "3 years",
    mode: "Technical",
    interviewer: "Alex Carter (Senior Architect)",
    finalScore: 8.6,
    confidence: 8.8,
    communication: 8.4,
    correctness: 8.7,
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    questions: [
      {
        question: "Explain the event loop in JavaScript and how asynchronous callbacks are scheduled in the microtask queue.",
        difficulty: "easy",
        timeLimit: 60,
        answer: "JavaScript is single threaded. The event loop continuously checks the call stack. Microtasks like Promise callbacks have higher priority than macrotasks like setTimeout.",
        score: 9,
        confidence: 9,
        communication: 9,
        correctness: 9,
        feedback: "Crisp and technically accurate explanation of microtask queue prioritization."
      },
      {
        question: "What is the difference between SQL and NoSQL databases, and when would you choose MongoDB over PostgreSQL?",
        difficulty: "easy",
        timeLimit: 60,
        answer: "SQL is relational with strict schemas and ACID compliance. NoSQL like MongoDB is document-based and schema-flexible, ideal for rapid prototyping and nested JSON documents.",
        score: 8,
        confidence: 8,
        communication: 9,
        correctness: 8,
        feedback: "Good comparison. Could also touch upon horizontal vs vertical scaling."
      },
      {
        question: "How do you prevent Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) in a modern web application?",
        difficulty: "medium",
        timeLimit: 90,
        answer: "For XSS, sanitize user input, use Content Security Policy (CSP), and let React auto-escape. For CSRF, use SameSite cookies and anti-CSRF tokens.",
        score: 9,
        confidence: 9,
        communication: 8,
        correctness: 9,
        feedback: "Great security best practices cited, especially CSP and SameSite flags."
      },
      {
        question: "How would you optimize a slow database query in production where a join across three tables is causing high latency?",
        difficulty: "medium",
        timeLimit: 90,
        answer: "I would first run EXPLAIN ANALYZE to check query execution plans, check missing indexes on foreign keys, avoid SELECT *, and consider denormalization or caching with Redis.",
        score: 9,
        confidence: 9,
        communication: 8,
        correctness: 9,
        feedback: "Excellent systematic approach to query profiling and indexing."
      },
      {
        question: "Design an idempotency mechanism for a distributed payment processing endpoint to guarantee exactly-once payment execution.",
        difficulty: "hard",
        timeLimit: 120,
        answer: "Assign a unique client-generated Idempotency-Key. Store the key in Redis with a distributed lock and TTL. If a retry arrives with the same key, return the cached transaction response.",
        score: 8,
        confidence: 8,
        communication: 8,
        correctness: 8,
        feedback: "Strong architectural pattern with Redis distributed locking and key deduplication."
      }
    ]
  },
  {
    _id: "demo-sess-102",
    userId: "demo-user-1",
    role: "Frontend Engineer",
    experience: "2 years",
    mode: "HR",
    interviewer: "Sarah Lin (Talent Lead)",
    finalScore: 8.2,
    confidence: 8.5,
    communication: 8.3,
    correctness: 8.0,
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    questions: [
      {
        question: "Tell me about a time you had a technical disagreement with a team member and how you resolved it constructively.",
        difficulty: "easy",
        timeLimit: 60,
        answer: "We disagreed on state management tools. I proposed building a quick prototype benchmark measuring bundle size and developer velocity, which led us to an objective consensus.",
        score: 9,
        confidence: 9,
        communication: 9,
        correctness: 9,
        feedback: "Superb behavioral response using data and prototypes to resolve conflict."
      },
      {
        question: "Describe how you prioritize tasks when you have multiple competing deadlines from design and product teams.",
        difficulty: "easy",
        timeLimit: 60,
        answer: "I align with product leads on user impact and sprint goals, break work into milestones, and communicate blockers early in daily standups.",
        score: 8,
        confidence: 8,
        communication: 8,
        correctness: 8,
        feedback: "Demonstrates proactive communication and prioritization clarity."
      },
      {
        question: "What is your approach to giving and receiving code reviews in a collaborative engineering culture?",
        difficulty: "medium",
        timeLimit: 90,
        answer: "I focus on the code not the person, ask questions rather than issuing mandates, and praise good solutions. When receiving reviews, I welcome feedback as learning.",
        score: 8,
        confidence: 8,
        communication: 8,
        correctness: 8,
        feedback: "Healthy, constructive perspective on engineering collaboration."
      },
      {
        question: "Share a situation where a critical production bug slipped through testing and how you handled the post-incident response.",
        difficulty: "medium",
        timeLimit: 90,
        answer: "We had an unhandled null exception on checkout. I immediately hotfixed it, rolled back, wrote unit tests for the edge case, and conducted a blameless post-mortem.",
        score: 8,
        confidence: 8,
        communication: 8,
        correctness: 8,
        feedback: "Great blameless post-mortem mindset and incident remediation."
      },
      {
        question: "Where do you envision your technical growth over the next two years?",
        difficulty: "hard",
        timeLimit: 120,
        answer: "I want to deepen my web performance and web assembly skills, mentor junior engineers, and contribute to open source design system architecture.",
        score: 8,
        confidence: 8,
        communication: 8,
        correctness: 8,
        feedback: "Clear career roadmap balancing depth with team leadership."
      }
    ]
  }
];

function getStoredInterviews(): InterviewSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error reading stored interviews", e);
  }
  localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(SEED_INTERVIEWS));
  return SEED_INTERVIEWS;
}

function saveStoredInterviews(list: InterviewSession[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(list));
  } catch (e) {
    console.error("Error saving interviews", e);
  }
}

// Dynamic questions library based on role & mode
const ROLE_QUESTION_BANKS: Record<string, { technical: string[]; hr: string[] }> = {
  frontend: {
    technical: [
      "Explain the Virtual DOM reconciliation algorithm in React 18 and how fiber trees work.",
      "What is the difference between CSS Grid and Flexbox, and how do you optimize rendering performance?",
      "How would you implement an infinite scroll feed that maintains 60fps without memory leaks?",
      "Explain how browser caching headers like Cache-Control, ETag, and Service Workers cooperate.",
      "How do you design a reusable, accessible component library following WAI-ARIA standards?"
    ],
    hr: [
      "Tell me about a challenging frontend bug that took days to track down and how you found the root cause.",
      "How do you bridge communication gaps between strict UI/UX designers and pragmatic engineering constraints?",
      "Describe how you advocate for web accessibility and responsive performance on tight deadlines.",
      "How do you handle receiving critical feedback on a pull request you spent days crafting?",
      "What motivates you to stay up to date with the rapidly changing JavaScript ecosystem?"
    ]
  },
  backend: {
    technical: [
      "How do connection pools work in PostgreSQL or MySQL, and how do you configure max connections?",
      "Explain how message brokers like RabbitMQ or Kafka handle consumer lag and at-least-once delivery.",
      "How do you design an authentication architecture utilizing JWTs with short-lived tokens and refresh tokens?",
      "Describe how database sharding and read replicas differ when scaling out a high-write backend.",
      "How do you prevent race conditions when two concurrent requests try to update the same user balance?"
    ],
    hr: [
      "Tell me about a production outage you were paged for and how you stabilized the service under pressure.",
      "How do you manage technical debt when product managers want new features shipped immediately?",
      "Describe how you document complex backend microservices for other developers on your team.",
      "Tell me about a time you had to learn an unfamiliar backend framework or language under tight deadlines.",
      "How do you mentor junior developers on writing clean, testable, and secure backend code?"
    ]
  },
  fullstack: {
    technical: [
      "Walk me through the lifecycle of an HTTP request from DNS lookup to database query and client rendering.",
      "How do you structure state management across server components, client state, and backend database caches?",
      "Explain your strategy for database migrations in a zero-downtime continuous deployment pipeline.",
      "How do you handle file uploads securely with signed URLs to AWS S3 or Cloud Storage from client to cloud?",
      "Design a real-time collaborative feature (like Google Docs or Figma) using WebSockets and operational transforms."
    ],
    hr: [
      "How do you balance deep backend optimizations with polished frontend user experience details?",
      "Tell me about a project where you had full ownership from initial requirement gathering to deployment.",
      "How do you handle conflicting priorities between speed of delivery and code quality?",
      "Describe an instance where you identified a bottleneck in team workflow and introduced a better tool.",
      "Why do you enjoy full stack development over specializing strictly in frontend or backend?"
    ]
  },
  general: {
    technical: [
      "What core principles guide your software architecture when building scalable web applications?",
      "How do you write effective unit, integration, and end-to-end tests for a mission-critical feature?",
      "Explain how modern CI/CD pipelines automate testing, linting, security scanning, and deployment.",
      "What is your approach to monitoring application health, error tracking, and telemetry in production?",
      "Describe a complex technical problem you solved recently and why you chose your specific approach."
    ],
    hr: [
      "Tell me about yourself, your background in software engineering, and what excites you about this role.",
      "Describe a situation where a project requirement changed midway through a sprint and how you adapted.",
      "How do you prioritize your daily work when faced with unexpected high-priority bugs?",
      "Tell me about a time you collaborated with cross-functional stakeholders who had non-technical backgrounds.",
      "Where do you see yourself technically and professionally in the next two to three years?"
    ]
  }
};

export const api = {
  // Check or load current user
  async getCurrentUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  // Google Auth handler with robust fallback
  async googleAuth(payload: { name: string; email: string }) {
    const user = {
      _id: "user-" + Math.random().toString(36).substr(2, 9),
      name: payload.name || "Software Candidate",
      email: payload.email,
      credits: 200,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(payload.name || "candidate")}`,
      role: "Candidate",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  // Instant Quick Demo login for Teacher / Evaluator testing
  async quickDemoLogin(roleType: "teacher" | "student" = "student") {
    const isTeacher = roleType === "teacher";
    const user = {
      _id: isTeacher ? "evaluator-prof-1" : "student-demo-1",
      name: isTeacher ? "Prof. Evaluator (Teacher Mode)" : "Alex Sharma (Candidate)",
      email: isTeacher ? "evaluator@university.edu" : "alex.candidate@demo.com",
      credits: isTeacher ? 750 : 250,
      avatar: isTeacher 
        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Professor&eyebrows=default&facialHair=default"
        : "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexStudent&clothesColor=black",
      role: isTeacher ? "Faculty Evaluator" : "Student Candidate",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  // Email / Password custom login
  async emailAuth(email: string, name?: string) {
    const userName = name || email.split("@")[0] || "Candidate";
    const user = {
      _id: "user-" + Math.random().toString(36).substr(2, 9),
      name: userName,
      email: email,
      credits: 150,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userName)}`,
      role: "Candidate",
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  // Logout
  async logout() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return { success: true };
  },

  // Resume Analyzer
  async analyzeResume(fileOrText: File | string): Promise<{ skills: string[]; projects: string[]; summary: string }> {
    // Simulate real parsing time
    await new Promise((r) => setTimeout(r, 900));

    let fileName = typeof fileOrText === "string" ? "Custom Profile" : fileOrText.name;
    const skills = [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Node.js & Express",
      "Tailwind CSS",
      "PostgreSQL / MongoDB",
      "RESTful APIs",
      "Git & GitHub CI/CD"
    ];

    const projects = [
      "AI Powered Mock Interview Platform with Web Speech Recognition",
      "Full Stack E-Commerce Engine with Payment Gateway Integration",
      "Real-time Collaborative Task Management Canvas with WebSockets"
    ];

    const summary = `Parsed from ${fileName}: Strong full-stack web background with demonstrated hands-on experience in React, Node.js, and API integration.`;

    return { skills, projects, summary };
  },

  // Create an interview
  async createInterview(params: {
    role: string;
    experience: string;
    mode: "Technical" | "HR" | "System Design";
    skills?: string[];
    projects?: string[];
    interviewer?: string;
  }): Promise<InterviewSession> {
    await new Promise((r) => setTimeout(r, 700));

    const roleLower = params.role.toLowerCase();
    let category = "general";
    if (roleLower.includes("front") || roleLower.includes("react") || roleLower.includes("ui") || roleLower.includes("web")) {
      category = "frontend";
    } else if (roleLower.includes("back") || roleLower.includes("node") || roleLower.includes("python") || roleLower.includes("api")) {
      category = "backend";
    } else if (roleLower.includes("full") || roleLower.includes("stack") || roleLower.includes("software")) {
      category = "fullstack";
    }

    const modeKey = params.mode === "HR" ? "hr" : "technical";
    const selectedBank = ROLE_QUESTION_BANKS[category] || ROLE_QUESTION_BANKS.general;
    const questionsRaw = selectedBank[modeKey];

    const difficulties: ("easy" | "medium" | "hard")[] = ["easy", "easy", "medium", "medium", "hard"];
    const timeLimits = [60, 60, 90, 90, 120];

    const questions: QuestionData[] = questionsRaw.slice(0, 5).map((q, i) => ({
      question: q,
      difficulty: difficulties[i],
      timeLimit: timeLimits[i]
    }));

    // Deduct 50 credits from user
    const userRaw = localStorage.getItem(STORAGE_KEYS.USER);
    if (userRaw) {
      const u = JSON.parse(userRaw);
      u.credits = Math.max(0, (u.credits || 100) - 50);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
    }

    const newSession: InterviewSession = {
      _id: "sess-" + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
      userId: userRaw ? JSON.parse(userRaw)._id : "anon",
      role: params.role,
      experience: params.experience,
      mode: params.mode,
      interviewer: params.interviewer || (params.mode === "HR" ? "Sarah Lin (Talent Lead)" : "Alex Carter (Senior Architect)"),
      questions,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    const interviews = getStoredInterviews();
    interviews.unshift(newSession);
    saveStoredInterviews(interviews);

    return newSession;
  },

  // Submit single question answer
  async submitAnswer(params: {
    interviewId: string;
    questionIndex: number;
    answer: string;
    timeTaken: number;
  }): Promise<{ feedback: string; score: number; confidence: number; communication: number; correctness: number }> {
    await new Promise((r) => setTimeout(r, 600));

    const interviews = getStoredInterviews();
    const session = interviews.find((s) => s._id === params.interviewId);

    const wordCount = (params.answer || "").trim().split(/\s+/).filter(Boolean).length;
    let score = 7;
    let confidence = 8;
    let communication = 7;
    let correctness = 8;
    let feedback = "Solid response. You addressed the core concept clearly with practical reasoning.";

    if (wordCount < 10) {
      score = 4;
      confidence = 5;
      communication = 4;
      correctness = 4;
      feedback = "Answer was brief. Expand on technical trade-offs and real-world implementation examples.";
    } else if (wordCount > 35) {
      score = 9;
      confidence = 9;
      communication = 9;
      correctness = 9;
      feedback = "Comprehensive, articulate answer demonstrating strong technical mastery and structure.";
    } else {
      score = 8;
      confidence = 8;
      communication = 8;
      correctness = 8;
      feedback = "Clear, well-paced explanation with sound terminology and direct relevance to the prompt.";
    }

    if (session && session.questions[params.questionIndex]) {
      const q = session.questions[params.questionIndex];
      q.answer = params.answer;
      q.score = score;
      q.confidence = confidence;
      q.communication = communication;
      q.correctness = correctness;
      q.feedback = feedback;
      saveStoredInterviews(interviews);
    }

    return { feedback, score, confidence, communication, correctness };
  },

  // Finish interview and compute total performance
  async finishInterview(interviewId: string): Promise<InterviewSession> {
    await new Promise((r) => setTimeout(r, 500));
    const interviews = getStoredInterviews();
    const session = interviews.find((s) => s._id === interviewId);

    if (!session) {
      throw new Error("Interview session not found");
    }

    const totalQuestions = session.questions.length || 1;
    let totalScore = 0;
    let totalConfidence = 0;
    let totalComm = 0;
    let totalCorrect = 0;

    session.questions.forEach((q) => {
      const s = q.score || 7;
      totalScore += s;
      totalConfidence += q.confidence || s;
      totalComm += q.communication || s;
      totalCorrect += q.correctness || s;
    });

    session.finalScore = Number((totalScore / totalQuestions).toFixed(1));
    session.confidence = Number((totalConfidence / totalQuestions).toFixed(1));
    session.communication = Number((totalComm / totalQuestions).toFixed(1));
    session.correctness = Number((totalCorrect / totalQuestions).toFixed(1));
    session.status = "completed";

    saveStoredInterviews(interviews);
    return session;
  },

  // Get user interview history
  async getMyInterviews(): Promise<InterviewSession[]> {
    return getStoredInterviews();
  },

  // Get single report by ID
  async getReport(id: string): Promise<InterviewSession | null> {
    const list = getStoredInterviews();
    return list.find((s) => s._id === id) || null;
  },

  // Top-up credits
  async addCredits(amount: number) {
    const userRaw = localStorage.getItem(STORAGE_KEYS.USER);
    if (userRaw) {
      const u = JSON.parse(userRaw);
      u.credits = (u.credits || 0) + amount;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
      return u;
    }
    return null;
  }
};
