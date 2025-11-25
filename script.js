const commands = {
    help: {
        description: "Display available commands",
        execute: () => {
            return `
<span class="info">Available Commands:</span>

  <span class="success">about</span>      - Learn about me
  <span class="success">projects</span>   - View my projects
  <span class="success">skills</span>     - See my technical skills
  <span class="success">contact</span>    - Get my contact information
  <span class="success">education</span>  - View my education background
  <span class="success">clear</span>      - Clear the terminal
  <span class="success">help</span>       - Display this help message

Type any command to get started!
            `;
        }
    },
    about: {
        description: "Learn about me",
        execute: () => {
            return `
<span class="info">About Me</span>
────────────────────────────────────────

Hey! I'm a Computer Science student passionate about 
software development, mobile applications, and data analysis.

I specialize in:
  • Flutter app development
  • Data analysis with R
  • Cybersecurity concepts
  • Full-stack development

When I'm not coding, I enjoy analyzing baseball statistics
and exploring game design mechanics.
            `;
        }
    },
    projects: {
        description: "View my projects",
        execute: () => {
            return `
<span class="info">Projects</span>
────────────────────────────────────────

<span class="success">1. Flutter Mobile App</span>
   • Cross-platform mobile application with Provider state management
   • Features: Local data persistence, API integration, accessibility
   • Tech: Flutter, Dart, REST APIs

<span class="success">2. Data Analysis Dashboard</span>
   • Interactive data visualization and statistical analysis
   • Tech: R, ggplot2, data manipulation libraries

<span class="success">3. Baseball Analytics Tool</span>
   • Statistical analysis and prediction models for baseball
   • Tech: Python, pandas, machine learning

Type <span class="warning">'github'</span> to view my GitHub profile
            `;
        }
    },
    skills: {
        description: "See my technical skills",
        execute: () => {
            return `
<span class="info">Technical Skills</span>
────────────────────────────────────────

<span class="success">Languages:</span>
  Dart  ████████████████░░  85%
  R     ███████████████░░░  75%
  Python████████████████░░  80%
  Java  ██████████████░░░░  70%
  SQL   ████████████░░░░░░  65%

<span class="success">Frameworks & Tools:</span>
  • Flutter & Provider
  • Git & GitHub
  • VSCode
  • Data Visualization
  • Mobile UI/UX Design
            `;
        }
    },
    education: {
        description: "View my education background",
        execute: () => {
            return `
<span class="info">Education</span>
────────────────────────────────────────

<span class="success">University of Washington</span>
Computer Science Major

Relevant Coursework:
  • Mobile App Development
  • Data Structures & Algorithms
  • Data Analysis (INFO201)
  • Cybersecurity
  • Database Systems
            `;
        }
    },
    contact: {
        description: "Get my contact information",
        execute: () => {
            return `
<span class="info">Contact Information</span>
────────────────────────────────────────

📧 Email:    your.email@example.com
💼 LinkedIn: linkedin.com/in/yourprofile
🐙 GitHub:   github.com/yourusername
📱 Phone:    (123) 456-7890

Feel free to reach out for collaborations or opportunities!
            `;
        }
    },
    github: {
        description: "Open GitHub profile",
        execute: () => {
            window.open('https://github.com/yourusername', '_blank');
            return `<span class="success">Opening GitHub profile...</span>`;
        }
    },
    clear: {
        description: "Clear the terminal",
        execute: () => {
            document.getElementById('terminal-output').innerHTML = '';
            return null;
        }
    }
};

const asciiArt = `
 ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
 ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝ 
`;

const welcomeMessage = `
<span class="ascii-art">${asciiArt}</span>

<span class="success">Welcome to my interactive portfolio!</span>

Type <span class="warning">'help'</span> to see available commands.
`;

let commandHistory = [];
let historyIndex = -1;

function init() {
    printOutput(welcomeMessage);
    document.getElementById('terminal-input').focus();
}

function printOutput(text, className = '') {
    if (text === null) return;
    const output = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = `output-line ${className}`;
    line.innerHTML = text;
    output.appendChild(line);
    scrollToBottom();
}

function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(input) {
    const trimmedInput = input.trim().toLowerCase();
    
    printOutput(`<span class="command-line">visitor@portfolio:~$ ${input}</span>`);
    
    if (trimmedInput === '') {
        return;
    }
    
    commandHistory.unshift(input);
    historyIndex = -1;
    
    if (commands[trimmedInput]) {
        const result = commands[trimmedInput].execute();
        if (result) {
            printOutput(result);
        }
    } else {
        printOutput(`<span class="error">Command not found: ${trimmedInput}</span>
Type <span class="warning">'help'</span> for available commands.`, 'error');
    }
}

document.getElementById('terminal-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const input = this.value;
        processCommand(input);
        this.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            this.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            this.value = commandHistory[historyIndex];
        } else {
            historyIndex = -1;
            this.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = this.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            this.value = matches[0];
        }
    }
});

document.getElementById('terminal').addEventListener('click', function() {
    document.getElementById('terminal-input').focus();
});

window.onload = init;
