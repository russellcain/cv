export const basics = {
  name: "Russell \"Rusty\" Cain",
  title: "Software Developer",
  github: "russellcain",
  phone: "727.858.2052",
  email: "russellcain24@gmail.com",
  about: [
    "Aims to create and improve the design, performance, and cleanliness of high-quality software.",
    "Recently, I've really enjoyed diving deeper into all things search and will happily talk your ear off about it.",
    "At the end of the day, I love puzzles, understanding how things work, and identifying slicker solutions."
  ]
};

export const stack = [
  "Scala (w/ Akka)", 
  "Python (w/ Django & Flask)", 
  "Elastic", 
  "MySQL, Postgres, etc.", 
  "Kubernetes, Docker, & Jenkins", 
  "RESTful (w/ Swagger)", 
  "React (Redux)", 
  "Kafka", 
  "TSX & JS", 
  "Vue & SCSS (this resumé)" // Soon to be Astro & Tailwind!
];

export const hobbies = ["Coding", "Climbing", "Biking"];

export const projects = [
  {
    name: "sudoku-solvers",
    stack: "Python, Go, TSX, Scala",
    description: "My favorite way to learn new languages, having them host and solve sudoku boards"
  },
  {
    name: "fantasy-hockey",
    stack: "Scala, TSX",
    description: "A customized platform to accomodate my family's particular fantasy hockey desires (salary cap, trades, etc)"
  }
];

export const experience = [
  {
    title: "Software Engineer",
    company: "PeloTech",
    date: "Sep 2024-Present",
    bullets: [
      "Designed and implemented full-stack TypeScript applications with RESTful APIs, role-based access control, and real-time analytics serving 10,000+ users.",
      "Built scalable third-party API integrations with robust error handling, pagination strategies, and retry mechanisms to ensure system reliability.",
      "Led monorepo architecture migration and service refactoring, improving build performance by 40% and enabling cross-team code sharing.",
      "Established comprehensive test automation with Playwright e2e coverage and performance optimization, reducing production incidents by 60%."
    ]
  },
  {
    title: "Search Engineer",
    company: "Discovery Education",
    date: "Mar 2021-Sep 2024",
    bullets: [
      "Architected large-scale search infrastructure serving 5M+ queries/day, orchestrating Elasticsearch cluster upgrade with zero downtime and 3x performance improvement.",
      "Built JavaScript/TypeScript features for search term correction and recommendations, optimizing algorithms for sub-100ms query response times at scale."
    ]
  },
  {
    title: "Full Stack Developer",
    company: "Pareto Intelligence",
    date: "Mar 2019-Mar 2021",
    bullets: [
      "Engineered distributed data processing system handling 1M+ records/day using Kafka event streams, with React/TypeScript Ul for data reconciliation and visualization.",
      "Designed and deployed cloud-native microservices on AWS with reusable TypeScript component libraries, improving development velocity across 5 engineering teams."
    ]
  }
];

export const education = [
  {
    school: "Loyola University of Chicago",
    degree: "MS: Mathematics",
    date: "Jan 2017-Dec 2018",
    details: "Focus in Number / Group Theory"
  },
  {
    school: "Loyola University of Chicago",
    degree: "BS: Math & Econ",
    date: "Aug 2014 May 2018",
    details: "Honors/Cum Laude"
  }
];
