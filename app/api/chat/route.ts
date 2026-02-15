import { NextResponse } from "next/server";

// Enhanced portfolio data with more structure
const portfolioData = {
  personal: {
    name: "Neer Mehta",
    role: "Full Stack Developer",
    title: "Creative Full Stack Developer & 3D Web Enthusiast",
    shortBio: "Passionate about building immersive web experiences with clean code and modern design",
    location: "India",
    timezone: "IST (UTC+5:30)",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Open to freelance opportunities and interesting collaborations",
    yearsOfExperience: 1.5,
    education: "Self-taught developer with focus on modern web technologies",
    hobbies: ["Coding", "3D Design", "Problem Solving", "Open Source", "Tech Blogging"],
    interests: ["Web3", "AI/ML", "Creative Coding", "UX Design"],
    achievements: [
      "Built 10+ production-ready applications",
      "Specialized in 3D web experiences",
      "Active open source contributor"
    ]
  },
  
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Material-UI", "Three.js", "Framer Motion", "Redux", "Zustand"],
    backend: ["Node.js", "Express", "Python", "FastAPI", "GraphQL", "REST APIs"],
    database: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma"],
    devops: ["Docker", "AWS", "Vercel", "Netlify", "CI/CD", "GitHub Actions"],
    tools: ["Stripe", "Chart.js", "Socket.io", "Jest", "Webpack", "Figma"],
    softSkills: ["Problem Solving", "Team Collaboration", "Project Management", "Client Communication", "Agile Methodology"]
  },

  projects: [
    {
      name: "Resume Builder SaaS",
      description: "AI-powered resume builder with multiple templates",
      longDescription: "A full-featured SaaS platform that helps users create professional resumes using AI. Features include multiple templates, real-time preview, PDF export, and AI-powered content suggestions. Built with Next.js, MongoDB, and OpenAI API.",
      technologies: ["Next.js", "MongoDB", "OpenAI", "Tailwind CSS", "Stripe"],
      features: ["AI content generation", "Multiple templates", "PDF export", "User authentication", "Payment integration"],
      year: "2024",
      link: "/projects/resume-builder"
    },
    {
      name: "Visitor Analytics Dashboard",
      description: "Real-time visitor tracking with charts and insights",
      longDescription: "A comprehensive analytics dashboard that tracks visitor behavior in real-time. Features interactive charts, geographic distribution maps, device analytics, and custom reporting. Built with Chart.js, Material-UI, and WebSocket for real-time updates.",
      technologies: ["React", "Chart.js", "Material-UI", "WebSocket", "Express"],
      features: ["Real-time tracking", "Geographic mapping", "Device analytics", "Custom reports", "Data export"],
      year: "2024",
      link: "/projects/analytics"
    },
    {
      name: "E-commerce Platform",
      description: "Full-featured online store with payment integration",
      longDescription: "A modern e-commerce platform with product management, shopping cart, order tracking, and secure payment processing. Includes admin dashboard, inventory management, and customer analytics.",
      technologies: ["Next.js", "Stripe", "MongoDB", "Redis", "Tailwind CSS"],
      features: ["Product management", "Shopping cart", "Payment processing", "Order tracking", "Admin dashboard"],
      year: "2023",
      link: "/projects/ecommerce"
    },
    {
      name: "CRM for Small Business",
      description: "Customer relationship management system",
      longDescription: "A lightweight CRM designed for small businesses to manage customer relationships, track interactions, and automate follow-ups. Features include contact management, task tracking, email integration, and sales pipeline visualization.",
      technologies: ["React", "Node.js", "PostgreSQL", "Express", "Material-UI"],
      features: ["Contact management", "Task tracking", "Email integration", "Sales pipeline", "Analytics"],
      year: "2023",
      link: "/projects/crm"
    },
    {
      name: "3D Interactive Portfolio",
      description: "Solar system themed portfolio with Three.js",
      longDescription: "An immersive 3D portfolio featuring a solar system theme where planets represent different skills and technologies. Includes interactive orbits, particle effects, and smooth camera controls. Built with Three.js and React Three Fiber.",
      technologies: ["Three.js", "React Three Fiber", "WebGL", "Framer Motion", "TypeScript"],
      features: ["3D solar system", "Interactive planets", "Particle effects", "Smooth animations", "Responsive design"],
      year: "2024",
      link: "/projects/3d-portfolio"
    }
  ],

  experience: [
    {
      role: "Full Stack Developer",
      company: "Freelance",
      period: "2023 - Present",
      description: "Building custom web applications for clients worldwide. Specializing in SaaS platforms, analytics dashboards, and interactive 3D experiences.",
      achievements: [
        "Delivered 10+ successful projects",
        "Maintained 100% client satisfaction",
        "Reduced load times by 40% through optimization"
      ]
    },
    {
      role: "Frontend Developer",
      company: "Tech Startup",
      period: "2022 - 2023",
      description: "Developed responsive web applications and component libraries. Collaborated with design team to implement pixel-perfect UIs.",
      achievements: [
        "Built reusable component library",
        "Improved site performance by 50%",
        "Mentored junior developers"
      ]
    }
  ],

  contact: {
    email: "mehtaneer143@gmail.com",
    linkedin: "https://www.linkedin.com/in/neer-mehta-94a23b339",
    github: "https://github.com/Neer2304",
    instagram: "https://www.instagram.com/neer_mehta23",
    twitter: "https://twitter.com/neer_mehta",
    portfolio: "https://neer-portfolio.vercel.app"
  },

  social: {
    github: {
      username: "Neer2304",
      repos: 15,
      contributions: "500+",
      topProjects: ["resume-builder", "analytics-dashboard", "3d-portfolio"]
    },
    linkedin: {
      connections: "500+",
      recommendations: 5
    }
  }
};

// Advanced intent detection with scoring
function detectIntent(message: string) {
  const msg = message.toLowerCase();
  
  // Define intents with keywords and weights
  const intents = {
    greeting: {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "howdy", "greetings"],
      weight: 1
    },
    name: {
      keywords: ["your name", "who are you", "tell me about yourself", "introduce yourself", "about you"],
      weight: 1
    },
    skills: {
      keywords: ["skills", "technologies", "tech stack", "what do you use", "programming languages", "frameworks", "tools", "expertise", "proficient", "tech"],
      weight: 1
    },
    frontend: {
      keywords: ["frontend", "front-end", "ui", "user interface", "design", "css", "styling"],
      weight: 0.8
    },
    backend: {
      keywords: ["backend", "back-end", "server", "api", "database", "db"],
      weight: 0.8
    },
    experience: {
      keywords: ["experience", "years", "background", "work history", "career", "professional", "journey"],
      weight: 1
    },
    education: {
      keywords: ["education", "study", "learn", "qualification", "degree", "college", "university", "school"],
      weight: 1
    },
    projects: {
      keywords: ["projects", "work", "portfolio", "built", "created", "made", "developed", "applications", "apps"],
      weight: 1
    },
    project_details: {
      keywords: ["tell me more about", "details about", "explain", "more information", "deep dive", "specifics", "features of"],
      weight: 1.2
    },
    resume_builder: {
      keywords: ["resume", "builder", "cv", "saas resume"],
      weight: 1.1
    },
    analytics: {
      keywords: ["analytics", "dashboard", "visitor", "tracking", "statistics", "charts"],
      weight: 1.1
    },
    ecommerce: {
      keywords: ["ecommerce", "e-commerce", "shop", "store", "payment", "stripe"],
      weight: 1.1
    },
    crm: {
      keywords: ["crm", "customer", "relationship", "management"],
      weight: 1.1
    },
    threeD: {
      keywords: ["3d", "three.js", "portfolio 3d", "solar system", "interactive", "animation"],
      weight: 1.1
    },
    contact: {
      keywords: ["contact", "email", "linkedin", "github", "reach", "message", "get in touch", "instagram", "connect", "social"],
      weight: 1
    },
    location: {
      keywords: ["location", "where", "based", "country", "city", "live", "timezone", "remote"],
      weight: 1
    },
    availability: {
      keywords: ["available", "freelance", "hire", "job", "work together", "collaborate", "opportunity", "open to"],
      weight: 1
    },
    hobbies: {
      keywords: ["hobby", "interest", "passion", "free time", "like to do", "enjoy"],
      weight: 1
    },
    help: {
      keywords: ["help", "can you do", "what can you", "capabilities", "features", "function"],
      weight: 1
    },
    thanks: {
      keywords: ["thank", "thanks", "appreciate", "grateful", "thank you"],
      weight: 1
    },
    goodbye: {
      keywords: ["bye", "goodbye", "see you", "later", "farewell"],
      weight: 1
    },
    pricing: {
      keywords: ["cost", "price", "rate", "charge", "budget", "how much"],
      weight: 1
    },
    timeline: {
      keywords: ["timeline", "duration", "how long", "deadline", "delivery"],
      weight: 1
    }
  };

  // Calculate scores for each intent
  const scores: Record<string, number> = {};
  
  for (const [intent, config] of Object.entries(intents)) {
    const matches = config.keywords.filter(keyword => msg.includes(keyword)).length;
    if (matches > 0) {
      scores[intent] = (matches / config.keywords.length) * config.weight;
    }
  }

  // Find the intent with highest score
  let bestIntent = "unknown";
  let highestScore = 0;

  for (const [intent, score] of Object.entries(scores)) {
    if (score > highestScore) {
      highestScore = score;
      bestIntent = intent;
    }
  }

  return bestIntent;
}

function formatProjectDetails(project: typeof portfolioData.projects[0]) {
  return `**${project.name}**\n\n` +
    `${project.longDescription}\n\n` +
    `**Technologies:** ${project.technologies.join(', ')}\n` +
    `**Key Features:** ${project.features.join(', ')}\n` +
    `**Year:** ${project.year}\n\n` +
    `[View Project](${project.link})`;
}

function generateResponse(intent: string, message?: string) {
  const msg = message?.toLowerCase() || "";
  
  // Handle project-specific intents
  if (intent === "resume_builder") {
    return formatProjectDetails(portfolioData.projects[0]);
  }
  if (intent === "analytics") {
    return formatProjectDetails(portfolioData.projects[1]);
  }
  if (intent === "ecommerce") {
    return formatProjectDetails(portfolioData.projects[2]);
  }
  if (intent === "crm") {
    return formatProjectDetails(portfolioData.projects[3]);
  }
  if (intent === "threeD") {
    return formatProjectDetails(portfolioData.projects[4]);
  }

  switch (intent) {
    case "greeting":
      const hour = new Date().getHours();
      let timeGreeting = "Hello";
      if (hour < 12) timeGreeting = "Good morning";
      else if (hour < 17) timeGreeting = "Good afternoon";
      else timeGreeting = "Good evening";
      
      return `${timeGreeting}! 👋 I'm Neer's virtual assistant. I'm here to help you learn more about his work, skills, and experience. What would you like to know?`;

    case "name":
      return `I'm the AI assistant for **${portfolioData.personal.name}**, a ${portfolioData.personal.role} with ${portfolioData.personal.yearsOfExperience}+ years of experience. ${portfolioData.personal.shortBio}. How can I help you today?`;

    case "skills":
      return `**${portfolioData.personal.name}'s Tech Stack**\n\n` +
        `🎨 **Frontend Development**\n${portfolioData.skills.frontend.map(s => `  • ${s}`).join('\n')}\n\n` +
        `⚙️ **Backend Development**\n${portfolioData.skills.backend.map(s => `  • ${s}`).join('\n')}\n\n` +
        `🗄️ **Database & ORM**\n${portfolioData.skills.database.map(s => `  • ${s}`).join('\n')}\n\n` +
        `🚀 **DevOps & Cloud**\n${portfolioData.skills.devops.map(s => `  • ${s}`).join('\n')}\n\n` +
        `🛠️ **Tools & Technologies**\n${portfolioData.skills.tools.map(s => `  • ${s}`).join('\n')}\n\n` +
        `💪 **Soft Skills**\n${portfolioData.skills.softSkills.map(s => `  • ${s}`).join('\n')}`;

    case "frontend":
      return `**Frontend Expertise**\n\n` +
        `${portfolioData.personal.name} specializes in:\n` +
        `${portfolioData.skills.frontend.map(s => `• ${s}`).join('\n')}\n\n` +
        `He creates responsive, performant, and visually appealing user interfaces with modern frameworks and libraries.`;

    case "backend":
      return `**Backend Expertise**\n\n` +
        `Technologies:\n${portfolioData.skills.backend.map(s => `• ${s}`).join('\n')}\n\n` +
        `Databases:\n${portfolioData.skills.database.map(s => `• ${s}`).join('\n')}\n\n` +
        `He builds scalable APIs and server-side applications with clean architecture and best practices.`;

    case "experience":
      return `**Professional Experience**\n\n` +
        portfolioData.experience.map(exp => 
          `**${exp.role}** at ${exp.company} (${exp.period})\n` +
          `${exp.description}\n` +
          `Achievements:\n${exp.achievements.map(a => `  • ${a}`).join('\n')}`
        ).join('\n\n') +
        `\n\nOverall, he has ${portfolioData.personal.yearsOfExperience}+ years of experience in full-stack development.`;

    case "education":
      return `**Education & Learning**\n\n` +
        `${portfolioData.personal.education}\n\n` +
        `He's continuously learning and staying updated with the latest technologies. Currently exploring Web3 and AI/ML.`;

    case "projects":
      return `**Key Projects**\n\n` +
        portfolioData.projects.map(p => 
          `**${p.name}**\n` +
          `${p.description}\n` +
          `🛠️ ${p.technologies.join(' · ')}\n` +
          `✨ Features: ${p.features.join(', ')}\n`
        ).join('\n') +
        `\n\nAsk me about any project for more details!`;

    case "project_details":
      return "I can tell you more about any specific project! Which one interests you?\n\n" +
        portfolioData.projects.map(p => `• **${p.name}**`).join('\n');

    case "contact":
      return `**Connect with ${portfolioData.personal.name}**\n\n` +
        `📧 **Email:** ${portfolioData.contact.email}\n` +
        `💼 **LinkedIn:** ${portfolioData.contact.linkedin}\n` +
        `💻 **GitHub:** ${portfolioData.contact.github}\n` +
        `📸 **Instagram:** ${portfolioData.contact.instagram}\n` +
        `🐦 **Twitter:** ${portfolioData.contact.twitter}\n` +
        `🌐 **Portfolio:** ${portfolioData.contact.portfolio}\n\n` +
        `He's active on all platforms and usually responds within 24 hours!`;

    case "location":
      return `${portfolioData.personal.name} is based in **${portfolioData.personal.location}** (${portfolioData.personal.timezone}).\n\n` +
        `He speaks ${portfolioData.personal.languages.join(', ')} and is experienced in remote collaboration with global teams.`;

    case "availability":
      return `**Availability**\n\n` +
        `${portfolioData.personal.availability}\n\n` +
        `He's particularly interested in:\n` +
        `• Freelance projects\n` +
        `• Interesting collaborations\n` +
        `• Open source contributions\n` +
        `• Speaking opportunities\n\n` +
        `Feel free to reach out through any of his contact channels!`;

    case "hobbies":
      return `**When not coding...**\n\n` +
        `${portfolioData.personal.name} enjoys:\n` +
        `${portfolioData.personal.hobbies.map(h => `• ${h}`).join('\n')}\n\n` +
        `He's also interested in:\n` +
        `${portfolioData.personal.interests.map(i => `• ${i}`).join('\n')}\n\n` +
        `🏆 **Achievements:**\n` +
        `${portfolioData.personal.achievements.map(a => `• ${a}`).join('\n')}`;

    case "help":
      return `**I can help you with:**\n\n` +
        `🔍 **General Questions** - About Neer's background and experience\n` +
        `💻 **Technical Skills** - Detailed tech stack and expertise\n` +
        `📱 **Projects** - Information about specific projects\n` +
        `📧 **Contact** - How to reach Neer\n` +
        `💰 **Pricing** - Project rates and budget\n` +
        `⏰ **Timeline** - Project duration and deadlines\n` +
        `🤝 **Collaboration** - Freelance and partnership opportunities\n\n` +
        `Just ask me anything!`;

    case "pricing":
      return `**Project Pricing**\n\n` +
        `Neer offers flexible pricing based on project scope:\n\n` +
        `💼 **Small Projects** - $500 - $2,000\n` +
        `   (Landing pages, small apps, bug fixes)\n\n` +
        `📊 **Medium Projects** - $2,000 - $8,000\n` +
        `   (Full-stack applications, dashboards)\n\n` +
        `🏗️ **Large Projects** - $8,000 - $20,000+\n` +
        `   (SaaS platforms, complex systems)\n\n` +
        `🕒 **Hourly Rate** - $40 - $60/hour\n\n` +
        `Contact him for a detailed quote based on your specific requirements!`;

    case "timeline":
      return `**Project Timelines**\n\n` +
        `Typical project durations:\n\n` +
        `⚡ **Quick Projects** - 1-2 weeks\n` +
        `   (Small websites, simple apps)\n\n` +
        `📈 **Standard Projects** - 3-6 weeks\n` +
        `   (Full-stack apps, dashboards)\n\n` +
        `🏗️ **Complex Projects** - 2-3 months\n` +
        `   (SaaS platforms, custom systems)\n\n` +
        `Timelines can be adjusted based on your needs and requirements.`;

    case "thanks":
      return "You're very welcome! 😊 It's my pleasure to help. Feel free to ask if you have any more questions about Neer's work. Have a great day!";

    case "goodbye":
      return "Goodbye! 👋 Thanks for chatting with me. If you have more questions later, I'll be here. Take care!";

    default:
      // Try to find if the message contains any project name
      for (const project of portfolioData.projects) {
        if (msg.includes(project.name.toLowerCase()) || 
            msg.includes(project.description.toLowerCase().split(' ')[0])) {
          return formatProjectDetails(project);
        }
      }
      
      return `I'm here to help you learn more about **${portfolioData.personal.name}**! Here's what I can tell you about:\n\n` +
        `👤 **Personal Info** - Background, location, languages\n` +
        `💻 **Skills** - Frontend, backend, tools, soft skills\n` +
        `📊 **Experience** - Work history, achievements\n` +
        `🚀 **Projects** - Resume Builder, Analytics, E-commerce, CRM, 3D Portfolio\n` +
        `📧 **Contact** - Email, LinkedIn, GitHub, Instagram\n` +
        `💰 **Pricing** - Rates and budget information\n` +
        `⏰ **Timeline** - Project duration estimates\n\n` +
        `What would you like to explore? 😊`;
  }
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { reply: "Hi! I'm Neer's AI assistant. What would you like to know about him? 😊" },
        { status: 200 }
      );
    }

    // Add small delay to simulate thinking (optional)
    await new Promise(resolve => setTimeout(resolve, 500));

    const intent = detectIntent(message);
    const reply = generateResponse(intent, message);

    return NextResponse.json({ 
      reply,
      intent, // Optional: return detected intent for debugging
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        reply: "I'm having trouble processing your request right now. Please try again in a moment. Meanwhile, you can check out Neer's projects in the section above! 🚀" 
      },
      { status: 200 } // Return 200 even on error with friendly message
    );
  }
}