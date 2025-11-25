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
Hey! I'm a Computer Science student passionate about <br>
software development, mobile applications, and data analysis.<br>
<br>
I specialize in:<br>
  • Flutter app development<br>
  • Data analysis with R<br>
  • Cybersecurity concepts<br>
  • Full-stack development<br>
<br>
When I'm not coding, I enjoy analyzing baseball statistics<br>
and exploring game design mechanics.
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
  Dart  ████████████████░░  85%<br>
  R     ███████████████░░░  75%<br>
  Python████████████████░░  80%<br>
  Java  ██████████████░░░░  70%<br>
  SQL   ████████████░░░░░░  65%<br>
<br>
<span class="success">Frameworks & Tools:</span><br>
  • Flutter & Provider<br>
  • Git & GitHub<br>
  • VSCode<br>
  • Data Visualization<br>
  • Mobile UI/UX Design
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
Computer Science Major<br>
<br>
Relevant Coursework:<br>
  • Mobile App Development<br>
  • Data Structures & Algorithms<br>
  • Data Analysis (INFO201)<br>
  • Cybersecurity<br>
  • Database Systems
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
📧 Email:    your.email@example.com<br>
💼 LinkedIn: linkedin.com/in/yourprofile<br>
🐙 GitHub:   github.com/yourusername<br>
📱 Phone:    (123) 456-7890<br>
<br>
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
<br>
<span class="success">Welcome to my interactive portfolio!</span><br>
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
