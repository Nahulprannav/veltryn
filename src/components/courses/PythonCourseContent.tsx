export const pythonCourseLevels = [
  // LEVEL 1-10: Python Basics (Foundation)
  {
    level: 1,
    title: "Introduction to Python",
    topics: ["What is Python?", "Why Python is popular?", "Where Python is used?"],
    assignment: "List 5 real-world applications of Python.",
    points: 10
  },
  {
    level: 2,
    title: "Installing Python & IDEs",
    topics: ["Python installation", "PyCharm / VSCode setup"],
    assignment: "Install Python and write a screenshot code: print('Python Installed')",
    points: 10
  },
  {
    level: 3,
    title: "Python Syntax & Keywords",
    topics: ["Print statement", "Comments", "Keywords overview"],
    assignment: "Write a program using 5 different keywords.",
    points: 10
  },
  {
    level: 4,
    title: "Variables & Data Types",
    topics: ["int, float, string, bool", "Type conversion"],
    assignment: "Create variables for name, age, marks & print them.",
    points: 10
  },
  {
    level: 5,
    title: "Input & Output",
    topics: ["input()", "formatted strings (f-strings)"],
    assignment: "Ask user name & age, print greeting.",
    points: 10
  },
  {
    level: 6,
    title: "Operators",
    topics: ["Arithmetic", "Logical", "Comparison"],
    assignment: "Write a calculator for +, -, *, /.",
    points: 20
  },
  {
    level: 7,
    title: "Strings Basics",
    topics: ["indexing, slicing", "string functions"],
    assignment: "Take a string from user and print reversed string.",
    points: 10
  },
  {
    level: 8,
    title: "Lists Basics",
    topics: ["list creation", "indexing, slicing"],
    assignment: "Create a list of 5 items and append 2 new items.",
    points: 10
  },
  {
    level: 9,
    title: "Tuples & Sets",
    topics: ["immutable vs mutable", "set operations"],
    assignment: "Convert a list to tuple and print.",
    points: 10
  },
  {
    level: 10,
    title: "Dictionaries",
    topics: ["key-value pairs", "common dict methods"],
    assignment: "Create a student dictionary and print keys & values.",
    points: 10
  },

  // LEVEL 11-20: Flow Control & Functions
  {
    level: 11,
    title: "Conditions (if, elif, else)",
    topics: ["control flow", "nested conditions"],
    assignment: "Check if a number is odd or even.",
    points: 10
  },
  {
    level: 12,
    title: "Loops (for, while)",
    topics: ["iteration", "break & continue"],
    assignment: "Print multiplication table of a number.",
    points: 10
  },
  {
    level: 13,
    title: "Loop Applications",
    topics: ["pattern programs", "calculations"],
    assignment: "Print star pyramid pattern.",
    points: 20
  },
  {
    level: 14,
    title: "Functions Basics",
    topics: ["def keyword", "parameters & return values"],
    assignment: "Create a function to add two numbers.",
    points: 10
  },
  {
    level: 15,
    title: "Function Types",
    topics: ["default args", "keyword args", "variable-length args"],
    assignment: "Create a function with default arguments.",
    points: 10
  },
  {
    level: 16,
    title: "Lambda Functions",
    topics: ["short anonymous functions"],
    assignment: "Square of a number using lambda.",
    points: 10
  },
  {
    level: 17,
    title: "Recursion",
    topics: ["calling function inside itself"],
    assignment: "Write a recursive factorial program.",
    points: 20
  },
  {
    level: 18,
    title: "Modules & Packages",
    topics: ["import", "built-in modules"],
    assignment: "Import math module and print sqrt of number.",
    points: 10
  },
  {
    level: 19,
    title: "Exception Handling",
    topics: ["try–except", "finally", "raising errors"],
    assignment: "Handle divide-by-zero error.",
    points: 20
  },
  {
    level: 20,
    title: "File Handling",
    topics: ["read, write", "working with text files"],
    assignment: "Create a file and write your name inside.",
    points: 20
  },

  // LEVEL 21-30: Intermediate Python
  {
    level: 21,
    title: "Advanced Lists",
    topics: ["list comprehension", "nested lists"],
    assignment: "Generate list of first 20 squares.",
    points: 20
  },
  {
    level: 22,
    title: "Advanced Strings",
    topics: ["formatting", "regex basic intro"],
    assignment: "Count number of vowels in string.",
    points: 10
  },
  {
    level: 23,
    title: "Object Oriented Programming – Basics",
    topics: ["classes & objects", "init method"],
    assignment: "Create a class Car with properties.",
    points: 20
  },
  {
    level: 24,
    title: "OOP – Inheritance",
    topics: ["single & multi-level inheritance"],
    assignment: "Create Parent → Child classes.",
    points: 20
  },
  {
    level: 25,
    title: "OOP – Polymorphism",
    topics: ["method overriding", "operator overloading"],
    assignment: "Override a method in child class.",
    points: 20
  },
  {
    level: 26,
    title: "OOP – Encapsulation",
    topics: ["private & public attributes"],
    assignment: "Create private variable & access via method.",
    points: 20
  },
  {
    level: 27,
    title: "OOP – Abstraction",
    topics: ["abstract classes"],
    assignment: "Create abstract class Animal.",
    points: 20
  },
  {
    level: 28,
    title: "Working With Libraries",
    topics: ["math, statistics, datetime"],
    assignment: "Use datetime to print today's date.",
    points: 10
  },
  {
    level: 29,
    title: "Virtual Environments",
    topics: ["venv", "pip usage"],
    assignment: "Create venv & install a library.",
    points: 30
  },
  {
    level: 30,
    title: "Working With JSON",
    topics: ["JSON parse", "read/write JSON"],
    assignment: "Convert dictionary → JSON & save to file.",
    points: 20
  },

  // LEVEL 31-40: Data Handling & Automation
  {
    level: 31,
    title: "CSV Handling",
    topics: ["csv reader & writer"],
    assignment: "Create a CSV and store 5 student records.",
    points: 20
  },
  {
    level: 32,
    title: "Excel Automation",
    topics: ["openpyxl basics"],
    assignment: "Write 10 numbers into Excel using openpyxl.",
    points: 30
  },
  {
    level: 33,
    title: "Web Scraping – Basics",
    topics: ["requests", "BeautifulSoup"],
    assignment: "Scrape title of a website.",
    points: 30
  },
  {
    level: 34,
    title: "Web Scraping – Advanced",
    topics: ["pagination scraping", "exporting data"],
    assignment: "Scrape a list of items & save to file.",
    points: 40
  },
  {
    level: 35,
    title: "API Basics",
    topics: ["GET & POST", "working with public APIs"],
    assignment: "GET request to a public API & print data.",
    points: 30
  },
  {
    level: 36,
    title: "Automation Scripts",
    topics: ["system automation", "scheduling scripts"],
    assignment: "Create a script to rename 10 files automatically.",
    points: 40
  },
  {
    level: 37,
    title: "Python Regular Expressions",
    topics: ["pattern matching", "searching text"],
    assignment: "Extract all emails from a text.",
    points: 20
  },
  {
    level: 38,
    title: "Working With Databases",
    topics: ["SQLite basics", "CRUD operations"],
    assignment: "Create SQLite table & insert 5 records.",
    points: 30
  },
  {
    level: 39,
    title: "Multithreading",
    topics: ["threading module"],
    assignment: "Create 2 threads printing numbers.",
    points: 20
  },
  {
    level: 40,
    title: "Multiprocessing",
    topics: ["parallel execution"],
    assignment: "Run 2 parallel tasks to compute squares.",
    points: 30
  },

  // LEVEL 41-50: Advanced Python & Real Projects
  {
    level: 41,
    title: "GUI Development (Tkinter)",
    topics: ["basic windows", "buttons, forms"],
    assignment: "Create a window with text 'Hello Python'.",
    points: 20
  },
  {
    level: 42,
    title: "GUI Mini Projects",
    topics: ["calculator", "login system"],
    assignment: "Build a calculator app.",
    points: 50
  },
  {
    level: 43,
    title: "Web Development With Flask",
    topics: ["routing", "templates"],
    assignment: "Create a simple Flask 'Hello World' website.",
    points: 30
  },
  {
    level: 44,
    title: "Flask CRUD App",
    topics: ["forms", "database connection"],
    assignment: "Build CRUD with database.",
    points: 50
  },
  {
    level: 45,
    title: "Python With Git & GitHub",
    topics: ["version control"],
    assignment: "Create Git repo & push code.",
    points: 20
  },
  {
    level: 46,
    title: "Python Unit Testing",
    topics: ["pytest basics"],
    assignment: "Write test cases for calculator functions.",
    points: 30
  },
  {
    level: 47,
    title: "Python Deployment",
    topics: ["hosting Flask apps", "environment variables"],
    assignment: "Deploy Flask app on Render / Railway.",
    points: 50
  },
  {
    level: 48,
    title: "Python for Data Science",
    topics: ["NumPy basics"],
    assignment: "Create array & perform operations.",
    points: 20
  },
  {
    level: 49,
    title: "Python for ML",
    topics: ["Pandas", "Scikit-Learn intro"],
    assignment: "Load CSV using Pandas and analyze.",
    points: 30
  },
  {
    level: 50,
    title: "Final Capstone Project",
    topics: ["real-world mini-app", "portfolio-ready project"],
    assignment: "Build any one: Weather App / Todo App / Student Result System / Movie Recommendation System / Sales Dashboard",
    points: 100
  }
];
