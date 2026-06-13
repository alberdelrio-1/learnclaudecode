// ===================================
// Claude Code Learning Manual - JavaScript
// Version 1.0
// ===================================

// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = document.querySelector('.theme-icon');

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// Theme toggle event
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Search Functionality
const searchToggle = document.getElementById('search-toggle');
const searchContainer = document.getElementById('search-container');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Toggle search bar
if (searchToggle) {
    searchToggle.addEventListener('click', () => {
        searchContainer.classList.toggle('hidden');
        if (!searchContainer.classList.contains('hidden')) {
            searchInput.focus();
        }
    });
}

// Search index - all searchable content
const searchIndex = [
    // Core concepts
    { title: "The Terminal", page: "core-concepts.html#section1", keywords: "terminal command line cli bash powershell" },
    { title: "Installation & Pricing", page: "getting-started.html#installation", keywords: "install setup pricing pro max subscription" },
    { title: "File Access", page: "core-concepts.html#section1", keywords: "files read write edit access permissions" },
    { title: "Tool Use", page: "core-concepts.html#section2", keywords: "tools actions execute run commands" },
    { title: "CLAUDE.md", page: "essential-features.html#claude-md", keywords: "claude.md instructions configuration standards" },
    { title: "Plan Mode", page: "essential-features.html#plan-mode", keywords: "plan review approve strategy approach" },
    { title: "Context Window", page: "core-concepts.html#section3", keywords: "context memory whiteboard tokens usage" },
    { title: "Tokens & Cost", page: "core-concepts.html#section3", keywords: "tokens cost money pricing usage budget" },
    { title: "Model Selection", page: "core-concepts.html#section3", keywords: "models opus sonnet haiku switch change" },
    { title: "/compact", page: "core-concepts.html#section4", keywords: "compact compress summarize context memory" },
    { title: "/clear", page: "core-concepts.html#section4", keywords: "clear wipe reset context memory" },
    { title: "Sessions", page: "essential-features.html#sessions", keywords: "sessions resume continue save persist" },
    { title: "Permission Modes", page: "essential-features.html#permissions", keywords: "permissions security approval access control" },
    { title: "Memory System", page: "essential-features.html#memory", keywords: "memory auto-memory learning preferences" },
    { title: "Skills", page: "advanced.html#skills", keywords: "skills slash commands automation custom workflows" },
    { title: "Hooks", page: "advanced.html#hooks", keywords: "hooks automation guardrails policies events" },
    { title: "MCP Servers", page: "advanced.html#mcp", keywords: "mcp servers integrations connect apps salesforce" },
    { title: "Subagents", page: "advanced.html#subagents", keywords: "subagents parallel workers agents delegation" },
    { title: "Remote Control", page: "advanced.html#remote", keywords: "remote control mobile phone qr code" },
    { title: "Scheduling", page: "advanced.html#scheduling", keywords: "scheduling loop cron automation recurring" },

    // Workflows
    { title: "Code Exploration", page: "workflows.html", keywords: "explore codebase understand architecture overview" },
    { title: "Bug Fixing", page: "workflows.html", keywords: "bugs errors debugging fixes troubleshoot" },
    { title: "Feature Development", page: "workflows.html", keywords: "features new development build implement" },
    { title: "Refactoring", page: "workflows.html", keywords: "refactor modernize cleanup improve quality" },
    { title: "Testing", page: "workflows.html", keywords: "tests testing unit integration coverage" },
    { title: "Documentation", page: "workflows.html", keywords: "documentation docs comments readme jsdoc" },
    { title: "Git & Pull Requests", page: "workflows.html", keywords: "git github pr pull request commit branch" },

    // Troubleshooting
    { title: "Installation Issues", page: "troubleshooting.html", keywords: "install installation command not found path" },
    { title: "Authentication Errors", page: "troubleshooting.html", keywords: "auth authentication oauth login account" },
    { title: "Performance Issues", page: "troubleshooting.html", keywords: "performance slow cpu memory usage thrashing" },
    { title: "Search Not Working", page: "troubleshooting.html", keywords: "search ripgrep grep find" },
    { title: "/doctor Command", page: "troubleshooting.html", keywords: "doctor diagnose diagnostic troubleshoot" },

    // Getting Started
    { title: "VS Code Setup", page: "getting-started.html#vscode-setup", keywords: "vscode vs code extension editor ide" },
    { title: "Terminal Basics", page: "getting-started.html#terminal", keywords: "terminal basics pwd ls cd mkdir" },
    { title: "First Task", page: "getting-started.html#first-task", keywords: "first task beginner start tutorial" },

    // Commands
    { title: "/help Command", page: "essential-features.html#slash-commands", keywords: "help commands list available" },
    { title: "/usage Command", page: "essential-features.html#slash-commands", keywords: "usage tokens cost consumption" },
    { title: "/config Command", page: "essential-features.html#slash-commands", keywords: "config configuration settings preferences" },
    { title: "/memory Command", page: "essential-features.html#slash-commands", keywords: "memory view edit preferences" },
    { title: "/model Command", page: "essential-features.html#slash-commands", keywords: "model switch change opus sonnet haiku" }
];

// Search with fuzzy matching using Fuse.js
let fuse;
if (typeof Fuse !== 'undefined') {
    fuse = new Fuse(searchIndex, {
        keys: ['title', 'keywords'],
        threshold: 0.3,
        includeScore: true
    });
}

// Search input handler
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = fuse ? fuse.search(query) : simpleSearch(query);
        displaySearchResults(results, query);
    });
}

function simpleSearch(query) {
    const lowerQuery = query.toLowerCase();
    return searchIndex
        .filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.keywords.toLowerCase().includes(lowerQuery)
        )
        .map(item => ({ item }))
        .slice(0, 10);
}

function displaySearchResults(results, query) {
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result" style="text-align: center; opacity: 0.7;">
                No results found for "${query}"
            </div>
        `;
        return;
    }

    const html = results.map(result => {
        const item = result.item;
        return `
            <a href="${item.page}" class="search-result">
                <strong>${item.title}</strong>
                <div style="font-size: 0.875rem; opacity: 0.8;">${item.keywords}</div>
            </a>
        `;
    }).join('');

    searchResults.innerHTML = html;
}

// Copy to Clipboard
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-button')) {
        const button = e.target;
        const codeText = button.getAttribute('data-copy') ||
                        button.previousElementSibling?.textContent ||
                        button.parentElement?.querySelector('code')?.textContent;

        if (codeText) {
            navigator.clipboard.writeText(codeText.trim()).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = 'var(--success)';

                setTimeout(() => {
                    button.textContent = originalText || 'Copy';
                    button.style.background = 'var(--accent-primary)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                button.textContent = 'Failed';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            });
        }
    }
});

// Tab Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Checkbox persistence in Getting Started
const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
checkboxes.forEach((checkbox, index) => {
    const savedState = localStorage.getItem(`checkbox-${index}`);
    if (savedState === 'true') {
        checkbox.checked = true;
    }

    checkbox.addEventListener('change', () => {
        localStorage.setItem(`checkbox-${index}`, checkbox.checked);
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            }
        }
    });
});

// Add copy buttons to all code blocks that don't have them
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(codeBlock => {
        const pre = codeBlock.parentElement;

        // Check if a copy button already exists
        if (!pre.querySelector('.copy-button')) {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.setAttribute('data-copy', codeBlock.textContent);
            pre.style.position = 'relative';
            pre.appendChild(button);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K to toggle search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchContainer.classList.toggle('hidden');
        if (!searchContainer.classList.contains('hidden')) {
            searchInput.focus();
        }
    }

    // Escape to close search
    if (e.key === 'Escape' && !searchContainer.classList.contains('hidden')) {
        searchContainer.classList.add('hidden');
        searchInput.value = '';
        searchResults.innerHTML = '';
    }

    // Cmd/Ctrl + / to toggle theme
    if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        if (themeToggle) {
            themeToggle.click();
        }
    }
});

// Highlight current page in sidebar
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.sidebar a');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    }
});

// Add loading animation for external links
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.addEventListener('click', () => {
        link.style.opacity = '0.6';
        setTimeout(() => {
            link.style.opacity = '1';
        }, 500);
    });
});

// Table of Contents auto-highlight on scroll
const tocLinks = document.querySelectorAll('.toc a');
const sections = Array.from(tocLinks).map(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
        return document.querySelector(href);
    }
    return null;
}).filter(Boolean);

function highlightTOC() {
    const scrollPos = window.scrollY + 100;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.style.fontWeight = '400';
        link.style.color = 'var(--text-secondary)';

        if (link.getAttribute('href') === `#${current}`) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--accent-primary)';
        }
    });
}

if (sections.length > 0) {
    window.addEventListener('scroll', highlightTOC);
    highlightTOC(); // Initial highlight
}

// Print friendly - expand all collapsed sections before printing
window.addEventListener('beforeprint', () => {
    const collapsedSections = document.querySelectorAll('.collapsed');
    collapsedSections.forEach(section => {
        section.classList.remove('collapsed');
    });
});

// Mobile menu toggle (for responsive sidebar)
function createMobileMenu() {
    if (window.innerWidth < 968) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !document.querySelector('.mobile-menu-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '☰ Menu';
            toggle.style.cssText = `
                display: block;
                width: 100%;
                padding: var(--spacing-md);
                background: var(--accent-primary);
                color: white;
                border: none;
                font-size: var(--font-size-base);
                font-weight: 600;
                cursor: pointer;
            `;

            const nav = sidebar.querySelector('ul');
            nav.style.display = 'none';

            toggle.addEventListener('click', () => {
                nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
            });

            sidebar.insertBefore(toggle, sidebar.firstChild);
        }
    }
}

window.addEventListener('resize', createMobileMenu);
createMobileMenu();

// Console welcome message
console.log('%cClaude Code Learning Manual', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cVersion 1.0 - Built for beginners', 'font-size: 14px; color: #718096;');
console.log('%c\nKeyboard Shortcuts:', 'font-weight: bold; margin-top: 10px;');
console.log('  Cmd/Ctrl + K: Toggle search');
console.log('  Cmd/Ctrl + /: Toggle theme');
console.log('  Escape: Close search');
console.log('%c\nEnjoy learning! 🚀', 'color: #10b981; font-weight: bold;');
