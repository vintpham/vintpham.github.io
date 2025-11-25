const commands = {
    help: {
        description: "Display available commands",
        execute: () => {
            return `
<span class="info">Available Commands:</span>
<br><br>
  <span class="success">about</span>      - Learn about me<br>
  <span class="success">projects</span>   - View my projects<br>
  <span class="success">skills</span>     - See my technical skills<br>
  <span class="success">contact</span>    - Get my contact information<br>
  <span class="success">education</span>  - View my education background<br>
  <span class="success">resume></span>    - View or download my resume<br>
  <span class="success">clear</span>      - Clear the terminal<br>
  <span class="success">help</span>       - Display this help message<br>
<br>
Type any command to get started!
            `;
        }
    },
    about: {
        description: "Learn about me",
        execute: () => {
            return `
<span class="info">About Me</span><br>
────────────────────────────────────────<br>
<br>
Hello, I'm a Computer Science student at the University of Washington, expected to graduated December 2025.<br>
I am currently seeking to use my academic knowledge and practical skills to leverage an internship or<br>
full time position, in order to contribute to organizational success and foster innovation.
<br>
I specialize in:<br>
  • Flutter app development<br>
  • Data analysis<br>
  • Website developement<br>
  • Full-stack development<br>
<br>
When I'm not coding, I enjoy hiking, analyzing baseball, basketball and football statistics,<br>
and exploring game design mechanics. I'm also an avid rugby player who is currently on the UW Rugby Team.<br>
            `;
        }
    },
    projects: {
        description: "View my projects",
        execute: () => {
            return `
<span class="info">Projects</span><br>
────────────────────────────────────────<br>
<br>
<span class="success">1. Flutter Mobile App</span><br>
   • Cross-platform mobile application with Provider state management<br>
   • Features: Local data persistence, API integration, accessibility<br>
   • Tech: Flutter, Dart, REST APIs<br>
<br>
<span class="success">2. Data Analysis Dashboard</span><br>
   • Interactive data visualization and statistical analysis<br>
   • Tech: R, ggplot2, data manipulation libraries<br>
<br>
<span class="success">3. Baseball Analytics Tool</span><br>
   • Statistical analysis and prediction models for baseball<br>
   • Tech: Python, pandas, machine learning<br>
<br>
Type <span class="warning">'github'</span> to view my GitHub profile
            `;
        }
    },
    skills: {
        description: "See my technical skills",
        execute: () => {
            return `
<span class="info">Technical Skills</span><br>
────────────────────────────────────────<br>
<br>
<span class="success">Languages:</span><br>
  Dart <br>
  R <br>
  Python<br>
  Java<br>
  SQL<br>
  Javascript<br>
  TypeScript<br>
  HTML<br>
  C+<br>
  CSS<br>
<br>
<span class="success">Frameworks & Tools:</span><br>
  • Flutter & Provider<br>
  • Git & GitHub<br>
  • VSCode<br>
  • Mobile UI/UX Design<br>
  • React<br>
  • Jira<br>
            `;
        }
    },
    education: {
        description: "View my education background",
        execute: () => {
            return `
<span class="info">Education</span><br>
────────────────────────────────────────<br>
<br>
<span class="success">University of Washington</span><br>
Major: Computer Science<br>
Minor: Data Science<br>
<br>
Relevant Coursework:<br>
  • Interaction Programming(Mobile App Development)<br>
  • Algorithms<br>
  • Data Structures and Parallelism<br>
  • Machine Learning<br>
  • Computer Securities<br>
  • Database Internals<br>
            `;
        }
    },
    contact: {
        description: "Get my contact information",
        execute: () => {
            return `
<span class="info">Contact Information</span><br>
────────────────────────────────────────<br>
<br>
📧 Email:    vincenttuananpham@gmail.com<br>
💼 LinkedIn: https://www.linkedin.com/in/vincent-pham-9294892b0/<br>
🐙 GitHub:   https://github.com/vintpham<br>
📱 Phone:    +1 (206) 380 1737<br>
<br>
Feel free to reach out for collaborations or opportunities!
            `;
        }
    },
    resume: {
        description: "View or download my resume",
        execute: () => {
            window.open('VincentResume.pdf', '_blank');
            return `Opening resume...`;
        }
    },
    github: {
        description: "Open GitHub profile",
        execute: () => {
            window.open('https://github.com/vintpham', '_blank');
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
<br>
<span class="success">Hi, I'm Vincent, and welcome to my interactive portfolio!</span><br>
<br>
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
