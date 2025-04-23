/**
 * Webcode Studios 2.0
 * Main JavaScript file
 */

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGridEffects();
    initCardEffects();
    initContactFeatures();
    setupCustomDropdown();
    fixScrollServiceButton();
});

/**
 * SECTION 1: NAVIGATION & UI INTERACTIONS
 */

// Initialize all navigation-related functionality
function initNavigation() {
    setupSmoothScrolling();
    setupMobileMenu();
    setupScrollButtons();
}

// Set up smooth scrolling for all internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle functionality
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change menu icon
        const menuIcon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (menuIcon) {
            menuIcon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const menuIcon = mobileMenuBtn.querySelector('.material-symbols-outlined');
            if (menuIcon) menuIcon.textContent = 'menu';
        });
    });
}

// Set up scroll down buttons
function setupScrollButtons() {
    // Hero scroll down button
    const scrollDownBtn = document.getElementById('scroll-down');
    if (scrollDownBtn) {
        scrollDownBtn.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // About section scroll to services button
    const scrollServicesBtn = document.getElementById('scroll-services');
    if (scrollServicesBtn) {
        scrollServicesBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Fix for the services scroll button
function fixScrollServiceButton() {
    const scrollServiceBtn = document.getElementById('scroll-services');
    if (scrollServiceBtn) {
        scrollServiceBtn.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * SECTION 2: GRID CANVAS EFFECTS
 */

// Initialize all grid-related effects
function initGridEffects() {
    setupHeroGrid();
    window.addEventListener('resize', handleWindowResize);
}

// Set up hero grid canvas
function setupHeroGrid() {
    const gridCanvas = document.getElementById('grid-canvas');
    if (!gridCanvas) return;
    
    const gridCtx = gridCanvas.getContext('2d');
    
    // Set canvas dimensions to match window
    setCanvasDimensions(gridCanvas);
    
    // Initialize hero grid
    drawGrid(gridCtx, gridCanvas.width, gridCanvas.height);
    
    // Mouse tracking for hero section
    trackHeroMouseMovement(gridCanvas, gridCtx);
}

// Handle window resize for all canvases
function handleWindowResize() {
    // Resize hero grid
    const gridCanvas = document.getElementById('grid-canvas');
    if (gridCanvas) {
        setCanvasDimensions(gridCanvas);
        const gridCtx = gridCanvas.getContext('2d');
        drawGrid(gridCtx, gridCanvas.width, gridCanvas.height);
    }
    
    // Resize all card canvases
    setAllCardCanvasDimensions();
}

// Set canvas dimensions to match container
function setCanvasDimensions(canvas) {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    canvas.width = window.innerWidth;
    canvas.height = hero.offsetHeight;
}

// Set dimensions for all card canvases
function setAllCardCanvasDimensions() {
    const cardCanvases = document.querySelectorAll('.card-grid-canvas');
    cardCanvases.forEach(canvas => {
        const card = canvas.closest('.team-card, .service-card, .contact-form-container');
        if (card) {
            canvas.width = card.offsetWidth;
            canvas.height = card.offsetHeight;
            
            // Draw default grid (with low opacity)
            const ctx = canvas.getContext('2d');
            drawGrid(ctx, canvas.width, canvas.height, 'rgba(0, 120, 170, 0.03)');
        }
    });
}

// Draw grid on canvas
function drawGrid(ctx, width, height, gridColor = 'rgba(0, 120, 170, 0.05)') {
    const gridSize = 30; // Size of grid cells
    
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Draw vertical lines
    for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

// Track mouse movement for hero grid effect
function trackHeroMouseMovement(canvas, ctx) {
    // Mouse variables
    let mouseX = 0;
    let mouseY = 0;
    const trailRadius = 150; // Radius of the light reveal effect
    
    // Track mouse movement
    window.addEventListener('mousemove', (e) => {
        const heroRect = document.querySelector('.hero').getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY - heroRect.top + window.scrollY;
        
        // Only highlight if mouse is within the hero section
        if (mouseY >= 0 && mouseY <= heroRect.height) {
            highlightHeroGrid(ctx, mouseX, mouseY, trailRadius, canvas.width, canvas.height);
        } else {
            // Reset grid if mouse is outside hero
            drawGrid(ctx, canvas.width, canvas.height);
        }
    });
}

// Highlight hero grid
function highlightHeroGrid(ctx, x, y, radius, width, height) {
    highlightGrid(ctx, x, y, radius, 40, width, height);
}

// Highlight card grid
function highlightCardGrid(ctx, x, y, radius, width, height) {
    highlightGrid(ctx, x, y, radius, 30, width, height);
}

// Generic grid highlight function
function highlightGrid(ctx, x, y, radius, gridSize, canvasWidth, canvasHeight) {
    const gridStartX = Math.floor((x - radius) / gridSize) * gridSize;
    const gridStartY = Math.floor((y - radius) / gridSize) * gridSize;
    const gridEndX = Math.ceil((x + radius) / gridSize) * gridSize;
    const gridEndY = Math.ceil((y + radius) / gridSize) * gridSize;
    
    // Clear the previous highlighted grid
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw regular grid first (barely visible)
    const isHeroGrid = ctx.canvas.id === 'grid-canvas';
    if (isHeroGrid) {
        drawGrid(ctx, canvasWidth, canvasHeight);
    } else {
        drawGrid(ctx, canvasWidth, canvasHeight, 'rgba(0, 120, 170, 0.03)');
    }
    
    // Create clipping region for the grid highlight (flashlight area)
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.clip();
    
    // Draw highlighted grid lines only within the clipped area
    ctx.lineWidth = 1.5;
    
    // Draw vertical lines
    for (let gx = gridStartX - gridSize; gx <= gridEndX + gridSize; gx += gridSize) {
        const distance = Math.abs(x - gx);
        if (distance < radius) {
            const opacity = Math.max(0, 1 - distance / radius);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(gx, y - radius);
            ctx.lineTo(gx, y + radius);
            ctx.stroke();
        }
    }
    
    // Draw horizontal lines
    for (let gy = gridStartY - gridSize; gy <= gridEndY + gridSize; gy += gridSize) {
        const distance = Math.abs(y - gy);
        if (distance < radius) {
            const opacity = Math.max(0, 1 - distance / radius);
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.8})`;
            ctx.beginPath();
            ctx.moveTo(x - radius, gy);
            ctx.lineTo(x + radius, gy);
            ctx.stroke();
        }
    }
    
    // Add glow at intersections
    for (let gx = gridStartX - gridSize; gx <= gridEndX + gridSize; gx += gridSize) {
        for (let gy = gridStartY - gridSize; gy <= gridEndY + gridSize; gy += gridSize) {
            const distance = Math.sqrt(Math.pow(x - gx, 2) + Math.pow(y - gy, 2));
            if (distance < radius * 0.8) {
                const opacity = Math.max(0, 1 - distance / (radius * 0.8));
                ctx.fillStyle = `rgba(0, 240, 255, ${opacity * 0.3})`;
                ctx.beginPath();
                ctx.arc(gx, gy, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Add subtle glow in the center
    const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
    );
    
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
    gradient.addColorStop(0.7, 'rgba(0, 180, 255, 0.05)');
    gradient.addColorStop(1, 'rgba(0, 80, 170, 0)');
    
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

/**
 * SECTION 3: CARD HOVER EFFECTS
 */

// Initialize card effects
function initCardEffects() {
    setAllCardCanvasDimensions();
    setupCardHoverEffects();
}

// Add grid hover effects to all cards
function setupCardHoverEffects() {
    // Team cards
    setupCardTypeHoverEffects('.team-card');
    
    // Service cards
    setupCardTypeHoverEffects('.service-card');
    
    // Contact form hover effect
    setupContactFormHoverEffect();
}

// Set up hover effects for a specific card type
function setupCardTypeHoverEffects(cardSelector) {
    const cards = document.querySelectorAll(cardSelector);
    
    cards.forEach(card => {
        const canvas = card.querySelector('.card-grid-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let cardRect;
        
        // Add hover event listeners
        card.addEventListener('mouseenter', () => {
            cardRect = card.getBoundingClientRect();
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!cardRect) cardRect = card.getBoundingClientRect();
            
            const cardX = e.clientX - cardRect.left;
            const cardY = e.clientY - cardRect.top;
            
            highlightCardGrid(ctx, cardX, cardY, 100, canvas.width, canvas.height);
        });
        
        card.addEventListener('mouseleave', () => {
            drawGrid(ctx, canvas.width, canvas.height, 'rgba(0, 120, 170, 0.03)');
        });
    });
}

// Set up contact form hover effect
function setupContactFormHoverEffect() {
    const formContainer = document.querySelector('.contact-form-container');
    if (!formContainer) return;
    
    const canvas = formContainer.querySelector('.card-grid-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let formRect;
    
    formContainer.addEventListener('mouseenter', () => {
        formRect = formContainer.getBoundingClientRect();
    });
    
    formContainer.addEventListener('mousemove', (e) => {
        if (!formRect) formRect = formContainer.getBoundingClientRect();
        
        const formX = e.clientX - formRect.left;
        const formY = e.clientY - formRect.top;
        
        highlightCardGrid(ctx, formX, formY, 100, canvas.width, canvas.height);
    });
    
    formContainer.addEventListener('mouseleave', () => {
        drawGrid(ctx, canvas.width, canvas.height, 'rgba(0, 120, 170, 0.03)');
    });
}

/**
 * SECTION 4: CONTACT SECTION FEATURES
 */

// Initialize all contact section features
function initContactFeatures() {
    initializeCircuitMap();
    setupTerminalTyping();
    setupLocationDots();
}

// Circuit Board Animation for Contact Map
function initializeCircuitMap() {
    const circuitCanvas = document.getElementById('circuit-canvas');
    if (!circuitCanvas) return;
    
    const circuitCtx = circuitCanvas.getContext('2d');
    
    // Set canvas dimensions
    function setCircuitCanvasDimensions() {
        const circuitContainer = document.querySelector('.circuit-container');
        if (!circuitContainer) return;
        
        circuitCanvas.width = circuitContainer.offsetWidth;
        circuitCanvas.height = circuitContainer.offsetHeight;
        
        // Redraw circuit
        drawCircuit();
    }
    
    setCircuitCanvasDimensions();
    window.addEventListener('resize', setCircuitCanvasDimensions);
    
    // Draw circuit lines and nodes
    function drawCircuit() {
        const width = circuitCanvas.width;
        const height = circuitCanvas.height;
        
        circuitCtx.clearRect(0, 0, width, height);
        
        // Grid size
        const gridSize = 30;
        
        // Draw grid
        drawGrid(circuitCtx, width, height, 'rgba(0, 180, 255, 0.1)');
        
        // Circuit nodes (connection points)
        const nodes = generateCircuitNodes(width, height, gridSize);
        
        // Add special locations to the nodes (location dots)
        const specialLocations = getSpecialLocations();
        
        // Add special locations to the nodes
        nodes.push(...specialLocations);
        
        // Connect nodes
        connectCircuitNodes(circuitCtx, nodes, specialLocations);
        
        // Add data pulse animations
        animateDataPulses(circuitCtx, circuitCanvas.width, circuitCanvas.height);
    }
    
    // Generate circuit nodes
    function generateCircuitNodes(width, height, gridSize) {
        const nodes = [];
        for (let x = gridSize; x < width; x += gridSize * 2) {
            for (let y = gridSize; y < height; y += gridSize * 2) {
                // Skip some nodes randomly
                if (Math.random() > 0.7) {
                    nodes.push({ x, y });
                }
            }
        }
        return nodes;
    }
    
    // Get special locations from dots on the map
    function getSpecialLocations() {
        const specialLocations = [];
        const locationDots = document.querySelectorAll('.location-dot');
        
        locationDots.forEach(dot => {
            // Calculate position relative to the circuit container
            const x = dot.offsetLeft + 6; // Half the dot width
            const y = dot.offsetTop + 6;
            
            specialLocations.push({ x, y });
        });
        
        return specialLocations;
    }
    
    // Connect circuit nodes with lines
    function connectCircuitNodes(ctx, nodes, specialLocations) {
        // Connect nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            
            // Find nearest nodes to connect to (1-3 connections)
            const connections = findNearestNodes(node, nodes, 3);
            
            // Draw connections
            connections.forEach(connection => {
                // Check if this is a special location connection
                const isSpecial = specialLocations.includes(node) || specialLocations.includes(connection);
                
                // Stronger lines for special connections
                if (isSpecial) {
                    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
                    ctx.lineWidth = 2;
                } else {
                    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
                    ctx.lineWidth = 1.5;
                }
                
                // Draw line segment with right angles (circuit board style)
                if (Math.random() > 0.5) {
                    // Horizontal then vertical
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(connection.x, node.y);
                    ctx.lineTo(connection.x, connection.y);
                    ctx.stroke();
                } else {
                    // Vertical then horizontal
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(node.x, connection.y);
                    ctx.lineTo(connection.x, connection.y);
                    ctx.stroke();
                }
            });
            
            // Draw node
            if (!specialLocations.includes(node)) {
                ctx.fillStyle = 'rgba(0, 240, 255, 0.3)';
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
    
    // Find nearest nodes to connect to
    function findNearestNodes(sourceNode, allNodes, count) {
        // Calculate distance to all other nodes
        const nodesWithDistance = allNodes
            .filter(node => node !== sourceNode) // Exclude self
            .map(node => {
                const dx = node.x - sourceNode.x;
                const dy = node.y - sourceNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                return { node, distance };
            });
        
        // Sort by distance
        nodesWithDistance.sort((a, b) => a.distance - b.distance);
        
        // Get nearest nodes (up to count)
        const connectCount = Math.floor(Math.random() * count) + 1; // Random number of connections (1 to count)
        return nodesWithDistance.slice(0, connectCount).map(item => item.node);
    }
    
    // Animate data pulses
    function animateDataPulses(ctx, width, height) {
        // Create data pulses that travel along the circuit
        const dataPulses = [];
        
        // Add some pulses
        for (let i = 0; i < 5; i++) {
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            
            dataPulses.push({
                x: startX,
                y: startY,
                targetX: Math.random() * width,
                targetY: Math.random() * height,
                progress: 0,
                speed: 0.01 + Math.random() * 0.02
            });
        }
        
        // Animate pulses
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Redraw the circuit grid
            drawGrid(ctx, width, height, 'rgba(0, 180, 255, 0.1)');
            
            // Update and draw pulses
            dataPulses.forEach(pulse => {
                pulse.progress += pulse.speed;
                
                if (pulse.progress >= 1) {
                    // Reset pulse
                    pulse.x = Math.random() * width;
                    pulse.y = Math.random() * height;
                    pulse.targetX = Math.random() * width;
                    pulse.targetY = Math.random() * height;
                    pulse.progress = 0;
                    pulse.speed = 0.01 + Math.random() * 0.02;
                }
                
                // Calculate current position
                const currentX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
                const currentY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;
                
                // Draw pulse
                ctx.fillStyle = 'rgba(0, 240, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
                ctx.fill();
                
                // Add glow
                ctx.fillStyle = 'rgba(0, 240, 255, 0.2)';
                ctx.beginPath();
                ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Terminal typing animation
function setupTerminalTyping() {
    const typingLines = document.querySelectorAll('.typing-text');
    if (typingLines.length === 0) return;
    
    function animateTyping() {
        typingLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            
            // Delay each line
            setTimeout(() => {
                let i = 0;
                const interval = setInterval(() => {
                    line.textContent += text[i];
                    i++;
                    
                    if (i >= text.length) {
                        clearInterval(interval);
                    }
                }, 50);
            }, index * 1000);
        });
    }
    
    // Start typing animation when terminal is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTyping();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const terminal = document.querySelector('.terminal-content');
    if (terminal) {
        observer.observe(terminal);
    }
}

// Location dot interactions
function setupLocationDots() {
    const locationDots = document.querySelectorAll('.location-dot');
    
    locationDots.forEach(dot => {
        dot.addEventListener('mouseenter', () => {
            dot.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.8)';
        });
        
        dot.addEventListener('mouseleave', () => {
            dot.style.boxShadow = 'none';
        });
    });
}

/**
 * SECTION 5: CUSTOM FORM ELEMENTS
 */

// Set up custom dropdown to replace the native select
// Set up custom dropdown to replace the native select
function setupCustomDropdown() {
    // Find the original select
    const originalSelect = document.getElementById('service');
    if (!originalSelect) return;
    
    // Get the parent wrapper
    const inputWrapper = originalSelect.closest('.input-wrapper');
    if (!inputWrapper) return;
    
    // Add the select-wrapper class to the input wrapper
    inputWrapper.classList.add('select-wrapper');
    
    // Create custom select elements
    const customSelectWrapper = document.createElement('div');
    customSelectWrapper.className = 'custom-select-wrapper';
    
    // Create the main select display
    const customSelect = document.createElement('div');
    customSelect.className = 'custom-select';
    
    // Add the icon (reuse the existing one)
    const icon = inputWrapper.querySelector('.material-symbols-outlined').cloneNode(true);
    customSelect.appendChild(icon);
    
    // Add the selected text
    const selectedText = document.createElement('span');
    selectedText.className = 'custom-select-text';
    selectedText.textContent = originalSelect.options[originalSelect.selectedIndex].text;
    customSelect.appendChild(selectedText);
    
    // Add dropdown icon
    const dropdownIcon = document.createElement('span');
    dropdownIcon.className = 'material-symbols-outlined custom-select-icon';
    dropdownIcon.textContent = 'expand_more';
    customSelect.appendChild(dropdownIcon);
    
    // Create the options container
    const customOptions = document.createElement('div');
    customOptions.className = 'custom-select-options';
    
    // Add options
    for (let i = 0; i < originalSelect.options.length; i++) {
        const option = originalSelect.options[i];
        
        // Skip disabled options (like the placeholder)
        if (option.disabled) continue;
        
        const customOption = document.createElement('div');
        customOption.className = 'custom-option';
        customOption.setAttribute('data-value', option.value);
        
        // Create the option text
        const optionText = document.createElement('span');
        optionText.textContent = option.text;
        
        customOption.appendChild(optionText);
        
        // Handle option selection
        customOption.addEventListener('click', function() {
            // Update the original select
            originalSelect.value = this.getAttribute('data-value');
            
            // Update the displayed text
            selectedText.textContent = optionText.textContent;
            
            // Close the dropdown
            customSelectWrapper.classList.remove('open');
            
            // Trigger change event on the original select
            const event = new Event('change');
            originalSelect.dispatchEvent(event);
        });
        
        customOptions.appendChild(customOption);
    }
    
    // Toggle dropdown on click
    customSelect.addEventListener('click', function(e) {
        e.stopPropagation();
        customSelectWrapper.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        customSelectWrapper.classList.remove('open');
    });
    
    // Assemble the custom dropdown
    customSelectWrapper.appendChild(customSelect);
    customSelectWrapper.appendChild(customOptions);
    
    // Insert the custom dropdown right after the icon
    inputWrapper.appendChild(customSelectWrapper);
    
    // Make sure the line effect is still visible
    const lineEffect = inputWrapper.querySelector('.line-effect');
    if (lineEffect) {
        inputWrapper.appendChild(lineEffect);
    }
}
