// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing functions...');
    
    // Initialize all functions
    initNavigation();
    initSmoothScrolling();
    // initContactButtons(); // Removed - buttons now use onclick attributes
    initFormHandling();
    initAnimations();
    initMobileMenu();
    initScrollEffects();
    initProductHover();
    initHeaderScroll();
    
    console.log('All functions initialized successfully');
});

// Global functions for debugging
window.debugEnquiry = function() {
    console.log('Enquiry functions available:', {
        openEnquiryModal: typeof openEnquiryModal,
        openProductEnquiry: typeof openProductEnquiry,
        openWhatsAppEnquiry: typeof openWhatsAppEnquiry
    });
};

// Test function to check if buttons are working
window.testButton = function() {
    console.log('Button clicked successfully!');
    alert('Button is working!');
};

// Comprehensive debug function
window.debugAll = function() {
    console.log('=== DEBUGGING ALL FUNCTIONS ===');
    
    // Check if functions exist
    const functions = [
        'openEnquiryModal',
        'closeEnquiryModal', 
        'openProductEnquiry',
        'addProductEnquiry',
        'openProductSelectionModal',
        'closeProductSelectionModal',
        'openWhatsAppEnquiry',
        'openWhatsAppEnquiryAshish',
        'showProductModal',
        'testButton'
    ];
    
    functions.forEach(funcName => {
        console.log(`${funcName}: ${typeof window[funcName]}`);
    });
    
    // Check if elements exist
    const elements = [
        'enquiryModal',
        'productSelectionModal',
        'enquiryForm',
        'productEnquiryList',
        'productsList'
    ];
    
    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        console.log(`${elementId}: ${element ? 'EXISTS' : 'NOT FOUND'}`);
    });
    
    // Check selected products
    console.log('Selected products:', selectedProducts);
    
    // Test button click
    console.log('=== TESTING BUTTON CLICK ===');
    const testBtn = document.querySelector('button[onclick="testButton()"]');
    if (testBtn) {
        console.log('Test button found, clicking...');
        testBtn.click();
    } else {
        console.log('Test button not found');
    }
    
    console.log('=== DEBUG COMPLETE ===');
};

// Add debug call on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== PAGE LOADED ===');
    setTimeout(() => {
        console.log('Running debug check...');
        if (typeof window.debugAll === 'function') {
            window.debugAll();
        }
    }, 1000);
});

// Header scroll effects
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional - uncomment if you want this effect)
        /*
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Active navigation link highlighting
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateActiveNav, 100));
    updateActiveNav(); // Initial call
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact button functionality - REMOVED - buttons now use onclick attributes
// function initContactButtons() {
//     const contactButtons = document.querySelectorAll('.contact-btn');
//     
//     contactButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             const contactCard = this.closest('.contact-card');
//             const name = contactCard.querySelector('h4').textContent;
//             const phone = contactCard.querySelector('.contact-details span:first-child').textContent.replace('📞 ', '');
//             
//             // Create a modal or notification
//             showContactModal(name, phone);
//         });
//     });
// }

// Show contact modal - REMOVED - no longer needed
// function showContactModal(name, phone) {
//     // Remove existing modal if any
//     const existingModal = document.querySelector('.contact-modal');
//     if (existingModal) {
//         existingModal.remove();
//     }
//     
//     const modal = document.createElement('div');
//     modal.className = 'contact-modal';
//     modal.innerHTML = `
//         <div class="modal-overlay">
//             <div class="modal-header">
//                 <h3>Contact ${name}</h3>
//                 <button class="modal-close">&times;</button>
//             </div>
//             <div class="modal-body">
//                 <p><strong>Phone:</strong> ${phone}</p>
//                 <p>Would you like to call or send a message?</p>
//                 <div class="modal-actions">
//                     <button class="btn-primary" onclick="window.location.href='tel:${phone.replace(/\s/g, '')}'">
//                         <i class="fas fa-phone"></i> Call Now
//                     </button>
//                     <button class="btn-secondary" onclick="this.closest('.contact-modal').remove()">
//                         Close
//                     </button>
//                 </div>
//             </div>
//         </div>
//     `;
//     
//     document.body.appendChild(modal);
//     
//     // Close modal functionality
//     const closeBtn = modal.querySelector('.modal-close');
//     closeBtn.addEventListener('click', () => modal.remove());
//     
//     // Close on outside click
//     modal.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             modal.remove();
//         }
//     });
//     
//     // Close on escape key
//     document.addEventListener('keydown', function closeOnEscape(e) {
//         if (e.key === 'Escape') {
//             modal.remove();
//             document.removeEventListener('keydown', closeOnEscape);
//         }
//     });
//     
//     // Animate modal in
//     setTimeout(() => {
//         modal.style.opacity = '1';
//         modal.querySelector('.modal-overlay').style.transform = 'scale(1)';
//     }, 10);
// }

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.product-category, .stat, .contact-item, .about-text, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile menu
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (this.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = nav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Scroll effects
function initScrollEffects() {
    const parallaxElements = document.querySelectorAll('.hero-image, .about-image');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Product hover effects
function initProductHover() {
    const productCategories = document.querySelectorAll('.product-category');
    
    productCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(30, 58, 138, 0.98);
            backdrop-filter: blur(20px);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            z-index: 999;
        }
        
        .nav.active {
            transform: translateY(0);
        }
        
        .nav-list {
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
        }
        
        .nav-link {
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            background: rgba(255, 255, 255, 0.1);
            margin-top: 0.5rem;
            border-radius: 8px;
        }
        
        .dropdown-menu li a {
            color: white;
            padding: 0.8rem 1rem;
        }
        
        .dropdown-menu li a:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-image, .hero-content');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add CSS for loading animation
const loadingCSS = `
    .hero-image, .hero-content {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    body.loaded .hero-image,
    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }
`;

const loadingStyle = document.createElement('style');
loadingStyle.textContent = loadingCSS;
document.head.appendChild(loadingStyle);

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #3b82f6, #60a5fa);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', throttle(() => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
}, 100));

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px)';
    this.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
}); 

// Enquiry System
let selectedProducts = [];
let currentProductSelection = null;

// Global functions for enquiry system
function openEnquiryModal() {
    console.log('openEnquiryModal called');
    try {
        const modal = document.getElementById('enquiryModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Enquiry modal opened successfully');
        } else {
            console.error('Enquiry modal element not found');
        }
    } catch (error) {
        console.error('Error opening enquiry modal:', error);
    }
}

function closeEnquiryModal() {
    console.log('closeEnquiryModal called');
    try {
        const modal = document.getElementById('enquiryModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset form
            const form = document.getElementById('enquiryForm');
            if (form) form.reset();
            selectedProducts = [];
            updateProductEnquiryList();
            console.log('Enquiry modal closed successfully');
        }
    } catch (error) {
        console.error('Error closing enquiry modal:', error);
    }
}

function openProductEnquiry(productId, productName, categoryKey) {
    console.log('openProductEnquiry called:', { productId, productName, categoryKey });
    try {
        // Add product to enquiry list
        const product = {
            id: productId,
            name: productName,
            category: categoryKey,
            quantity: 1
        };
        
        // Check if product already exists
        const existingIndex = selectedProducts.findIndex(p => p.id === productId);
        if (existingIndex !== -1) {
            selectedProducts[existingIndex].quantity += 1;
        } else {
            selectedProducts.push(product);
        }
        
        updateProductEnquiryList();
        openEnquiryModal();
        console.log('Product enquiry opened successfully');
    } catch (error) {
        console.error('Error opening product enquiry:', error);
    }
}

function addProductEnquiry() {
    openProductSelectionModal();
}

function openProductSelectionModal() {
    document.getElementById('productSelectionModal').classList.add('active');
    populateProductsList();
}

function closeProductSelectionModal() {
    document.getElementById('productSelectionModal').classList.remove('active');
    currentProductSelection = null;
}

function populateProductsList() {
    const productsList = document.getElementById('productsList');
    const productsData = getProductsData();
    
    productsList.innerHTML = '';
    
    Object.keys(productsData).forEach(categoryKey => {
        const category = productsData[categoryKey];
        category.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.dataset.productId = product.id;
            productItem.dataset.category = categoryKey;
            
            productItem.innerHTML = `
                <div class="product-item-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div style="display: none; width: 100%; height: 100%; background: var(--foundation-alt); display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-image" style="color: var(--text-secondary);"></i>
                    </div>
                </div>
                <div class="product-item-info">
                    <div class="product-item-name">${product.name}</div>
                    <div class="product-item-category">${category.name}</div>
                </div>
                <div class="product-item-check">
                    <i class="fas fa-check"></i>
                </div>
            `;
            
            productItem.addEventListener('click', () => selectProduct(product, categoryKey));
            productsList.appendChild(productItem);
        });
    });
}

function selectProduct(product, categoryKey) {
    // Remove previous selection
    document.querySelectorAll('.product-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Select current item
    event.currentTarget.classList.add('selected');
    
    // Add to enquiry list
    const productData = {
        id: product.id,
        name: product.name,
        category: categoryKey,
        quantity: 1
    };
    
    // Check if product already exists
    const existingIndex = selectedProducts.findIndex(p => p.id === product.id);
    if (existingIndex !== -1) {
        selectedProducts[existingIndex].quantity += 1;
    } else {
        selectedProducts.push(productData);
    }
    
    closeProductSelectionModal();
    updateProductEnquiryList();
}

function updateProductEnquiryList() {
    const productEnquiryList = document.getElementById('productEnquiryList');
    
    if (selectedProducts.length === 0) {
        productEnquiryList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No products selected. Click "Add Another Product" to start.</p>';
        return;
    }
    
    productEnquiryList.innerHTML = selectedProducts.map((product, index) => `
        <div class="product-enquiry-item">
            <div class="product-enquiry-header">
                <div class="product-enquiry-title">${product.name}</div>
                <button type="button" class="remove-product-btn" onclick="removeProductEnquiry(${index})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="product-enquiry-details">
                <div class="form-group">
                    <label>Quantity</label>
                    <div class="quantity-controls">
                        <button type="button" class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" class="quantity-input" value="${product.quantity}" min="1" onchange="setQuantity(${index}, this.value)">
                        <button type="button" class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <input type="text" value="${getCategoryName(product.category)}" readonly style="background: var(--foundation-alt);">
                </div>
            </div>
            <input type="hidden" name="products[${index}][id]" value="${product.id}">
            <input type="hidden" name="products[${index}][name]" value="${product.name}">
            <input type="hidden" name="products[${index}][quantity]" value="${product.quantity}">
            <input type="hidden" name="products[${index}][category]" value="${product.category}">
        </div>
    `).join('');
}

function removeProductEnquiry(index) {
    selectedProducts.splice(index, 1);
    updateProductEnquiryList();
}

function updateQuantity(index, change) {
    const newQuantity = selectedProducts[index].quantity + change;
    if (newQuantity >= 1) {
        selectedProducts[index].quantity = newQuantity;
        updateProductEnquiryList();
    }
}

function setQuantity(index, value) {
    const quantity = parseInt(value) || 1;
    if (quantity >= 1) {
        selectedProducts[index].quantity = quantity;
        updateProductEnquiryList();
    }
}

function getCategoryName(categoryKey) {
    const categories = {
        'printing': 'Offset Printing Machines & Spares',
        'textile': 'Textile Machinery & Spares',
        'invisible_grills': 'Invisible Grills & Components',
        'components': 'Sheet Metal & Components'
    };
    return categories[categoryKey] || categoryKey;
}

function getProductsData() {
    return {
        printing: {
            name: 'Offset Printing Machines & Spares',
            icon: 'fas fa-print',
            products: [
                {
                    id: 'komari-separator',
                    name: 'Komari Offset Printing Paper Separator',
                    description: 'High-quality paper separator for offset printing machines',
                    image: '/images/komari offsett printing paper separerator.webp',
                    specs: {
                        'Type': 'Paper Separator',
                        'Brand': 'Komari',
                        'Material': 'Stainless Steel',
                        'Compatibility': 'Offset Printing Machines'
                    }
                },
                {
                    id: 'heidelberg-gto52',
                    name: 'Heidelberg GTO 52 Offset Printing Machine',
                    description: 'Professional offset printing machine for high-quality prints',
                    image: '/images/Heidelberg Gto 52 Offset Printing Machine Heidelberg Gto 52 Offset Printing Machine.webp',
                    specs: {
                        'Model': 'GTO 52',
                        'Brand': 'Heidelberg',
                        'Type': 'Offset Printing',
                        'Sheet Size': 'A4/A3'
                    }
                },
                {
                    id: 'mitsubishi-separator',
                    name: 'Mitsubishi Sheet Separator',
                    description: 'Precision sheet separator for offset printing',
                    image: '/images/mitsubishi sheet seprator off set printing.webp',
                    specs: {
                        'Brand': 'Mitsubishi',
                        'Type': 'Sheet Separator',
                        'Material': 'Steel',
                        'Application': 'Offset Printing'
                    }
                },
                {
                    id: 'paper-cup-sucker',
                    name: 'Paper Cup Rubber Sucker',
                    description: 'Rubber sucker for paper handling in printing machines',
                    image: '/images/paper cup rubber sucker.webp',
                    specs: {
                        'Material': 'Rubber',
                        'Application': 'Paper Handling',
                        'Type': 'Sucker Cup',
                        'Compatibility': 'Printing Machines'
                    }
                },
                {
                    id: 'varnishing-coating',
                    name: 'Varnishing Coating Machine for Paper',
                    description: 'Professional varnishing and coating machine',
                    image: '/images/varnigshing coating machine for paper .webp',
                    specs: {
                        'Type': 'Varnishing Machine',
                        'Application': 'Paper Coating',
                        'Material': 'Stainless Steel',
                        'Process': 'Coating & Varnishing'
                    }
                }
            ]
        },
        textile: {
            name: 'Textile Machinery & Spares',
            icon: 'fas fa-spinner',
            products: [
                {
                    id: 'sulzer-g6300',
                    name: 'Sulzer G6300 Spare Parts',
                    description: 'Complete range of spare parts for Sulzer G6300 weaving machines',
                    image: '/images/sulzer g6300.webp',
                    specs: {
                        'Machine': 'Sulzer G6300',
                        'Type': 'Spare Parts',
                        'Application': 'Weaving',
                        'Brand': 'Sulzer'
                    }
                },
                {
                    id: 'somet-rapier',
                    name: 'Somet Rapier Loom',
                    description: 'High-speed rapier loom for textile manufacturing',
                    image: '/images/somet rapier loom.webp',
                    specs: {
                        'Brand': 'Somet',
                        'Type': 'Rapier Loom',
                        'Speed': 'High Speed',
                        'Application': 'Textile Weaving'
                    }
                },
                {
                    id: 'staubli-jacquard',
                    name: 'Staubli Jacquard M4 Module',
                    description: 'Advanced jacquard module for complex weaving patterns',
                    image: '/images/staubli jacquard m4 module.webp',
                    specs: {
                        'Brand': 'Staubli',
                        'Model': 'M4 Module',
                        'Type': 'Jacquard',
                        'Application': 'Complex Weaving'
                    }
                },
                {
                    id: 'toyota-airjet',
                    name: 'Toyota Air-Jet Spares',
                    description: 'Spare parts for Toyota air-jet weaving machines',
                    image: '/images/toyota airjet leno accesories.webp',
                    specs: {
                        'Brand': 'Toyota',
                        'Type': 'Air-Jet Spares',
                        'Application': 'Weaving',
                        'Machine': 'Air-Jet Loom'
                    }
                },
                {
                    id: 'toyota-leno',
                    name: 'Toyota Airjet Leno Accessories',
                    description: 'Specialized accessories for Toyota air-jet leno weaving',
                    image: '/images/Toyota Airjet Spares Leno Device.webp',
                    specs: {
                        'Brand': 'Toyota',
                        'Type': 'Leno Accessories',
                        'Application': 'Leno Weaving',
                        'Machine': 'Air-Jet Loom'
                    }
                },
                {
                    id: 'catch-code-toyota',
                    name: 'Catch Code Toyota Air Jet Looms Leno Drive',
                    description: 'Leno drive mechanism for Toyota air-jet looms',
                    image: '/images/catch code toyota air jet looms leno drive.webp',
                    specs: {
                        'Brand': 'Toyota',
                        'Type': 'Leno Drive',
                        'Application': 'Air-Jet Loom',
                        'Function': 'Leno Mechanism'
                    }
                },
                {
                    id: 'somet-spares',
                    name: 'Somet Machine Spare Parts',
                    description: 'Comprehensive spare parts for Somet weaving machines',
                    image: '/images/somet machine spare parts.webp',
                    specs: {
                        'Brand': 'Somet',
                        'Type': 'Spare Parts',
                        'Application': 'Weaving',
                        'Machine': 'Somet Looms'
                    }
                },
                {
                    id: 'sulzer-g6100',
                    name: 'Sulzer G6100',
                    description: 'Sulzer G6100 weaving machine components',
                    image: '/images/ Sulzer G6100 Sulzer G6100.webp',
                    specs: {
                        'Brand': 'Sulzer',
                        'Model': 'G6100',
                        'Type': 'Weaving Machine',
                        'Application': 'Textile Weaving'
                    }
                },
                {
                    id: 'ruti-shuttle',
                    name: 'Ruti C Shuttle Looms',
                    description: 'Traditional shuttle looms from Ruti',
                    image: '/images/ruti C Shuttle Looms.webp',
                    specs: {
                        'Brand': 'Ruti',
                        'Type': 'Shuttle Loom',
                        'Model': 'C Series',
                        'Application': 'Traditional Weaving'
                    }
                },
                {
                    id: 'solna-225',
                    name: 'Solna 225',
                    description: 'Solna 225 printing and processing machine',
                    image: '/images/solna 225.webp',
                    specs: {
                        'Brand': 'Solna',
                        'Model': '225',
                        'Type': 'Processing Machine',
                        'Application': 'Textile Processing'
                    }
                }
            ]
        },
        invisible_grills: {
            name: 'Invisible Grills & Components',
            icon: 'fas fa-th-large',
            products: [
                {
                    id: 'invisible-grill-raw',
                    name: 'Invisible Window Grill Raw Material',
                    description: 'Complete raw material for invisible window grills',
                    image: '/images/invisible window grille raw material.webp',
                    specs: {
                        'Type': 'Raw Material',
                        'Application': 'Invisible Grills',
                        'Material': 'Stainless Steel',
                        'Usage': 'Window Security'
                    }
                },
                {
                    id: 'nylon-coated-wire',
                    name: 'Nylon-Coated Wire Rope',
                    description: 'High-quality nylon-coated wire rope for invisible grills',
                    image: '/images/nylon coated wires(invisible grille).webp',
                    specs: {
                        'Type': 'Wire Rope',
                        'Coating': 'Nylon',
                        'Application': 'Invisible Grills',
                        'Strength': 'High Tensile'
                    }
                },
                {
                    id: 'ss-torx-screws',
                    name: 'SS 304 Torx Head Screws',
                    description: 'Stainless steel torx head screws for invisible grill assembly',
                    image: '/images/ Ss 304 Torx Head Screws Ss 304 Torx Head Screws.webp',
                    specs: {
                        'Material': 'SS 304',
                        'Type': 'Torx Head',
                        'Application': 'Grill Assembly',
                        'Grade': 'Stainless Steel'
                    }
                },
                {
                    id: 'cross-clips-stiffener',
                    name: '2.50 mm Cross Clips & Stiffener',
                    description: 'Cross clips and stiffener components for invisible grills',
                    image: '/images/2.50 mm Cross clips ,Stiffner. 2.50 mm Cross clips ,Stiffner..webp',
                    specs: {
                        'Size': '2.50 mm',
                        'Type': 'Cross Clips',
                        'Function': 'Stiffener',
                        'Application': 'Invisible Grills'
                    }
                },
                {
                    id: 'nylon-bush-track',
                    name: 'Nylon Bush For Invisible Window Grill Track',
                    description: 'Nylon bush components for invisible grill track system',
                    image: '/images/Nylon Bush For Invisible Window Grill Track.webp',
                    specs: {
                        'Material': 'Nylon',
                        'Type': 'Bush',
                        'Application': 'Grill Track',
                        'Function': 'Smooth Movement'
                    }
                },
                {
                    id: 'hex-flange-screw',
                    name: 'Hex Flange Head Screw',
                    description: 'Hex flange head screws for secure grill assembly',
                    image: '/images/Hex Flange Head Screw .webp',
                    specs: {
                        'Type': 'Hex Flange',
                        'Application': 'Grill Assembly',
                        'Material': 'Steel',
                        'Head': 'Flange'
                    }
                },
                {
                    id: 'ferrule-aluminium',
                    name: '2 mm Ferrule Aluminium',
                    description: 'Aluminium ferrules for wire rope termination',
                    image: '/images/ 2 mm Ferrule Aluminium 2 mm Ferrule Aluminium 2 mm Ferrule Aluminium 2 mm Ferrule Aluminium.webp',
                    specs: {
                        'Material': 'Aluminium',
                        'Size': '2 mm',
                        'Type': 'Ferrule',
                        'Application': 'Wire Termination'
                    }
                },
                {
                    id: 'nylon-coated-5mm',
                    name: '5 mm Nylon Coated Wire Rope',
                    description: '5mm diameter nylon-coated wire rope for heavy-duty applications',
                    image: '/images/316 l Our product range includes a wide range of 5 mm. Nylon Coated Wire Rope.. View More 5 mm. Nylon Coated Wire Rope. 5 mm. Nylon Coated Wire Rope..webp',
                    specs: {
                        'Diameter': '5 mm',
                        'Coating': 'Nylon',
                        'Type': 'Wire Rope',
                        'Application': 'Heavy Duty'
                    }
                }
            ]
        },
        components: {
            name: 'Sheet Metal & Components',
            icon: 'fas fa-cogs',
            products: [
                {
                    id: 'sheet-metal-die',
                    name: 'Sheet Metal Pressed Die',
                    description: 'Precision pressed die for sheet metal components',
                    image: '/images/ Sheet Metal Pressed Die Sheet Metal Pressed Die.webp',
                    specs: {
                        'Type': 'Pressed Die',
                        'Material': 'Sheet Metal',
                        'Application': 'Metal Forming',
                        'Process': 'Pressing'
                    }
                },
                {
                    id: 'ms-csk-bolts',
                    name: 'MS CSK Head Bolts',
                    description: 'Countersunk head bolts for flush mounting',
                    image: '/images/ms csk headbols(cks bolts).webp',
                    specs: {
                        'Material': 'MS',
                        'Type': 'CSK Head',
                        'Application': 'Flush Mounting',
                        'Grade': 'Standard'
                    }
                },
                {
                    id: 'stainless-shim',
                    name: 'Stainless Steel Shim Washer',
                    description: 'Precision shim washers for exact spacing',
                    image: '/images/stainless steel shims washer.webp',
                    specs: {
                        'Material': 'Stainless Steel',
                        'Type': 'Shim Washer',
                        'Application': 'Spacing',
                        'Precision': 'High'
                    }
                },
                {
                    id: 'heald-frame',
                    name: 'Heald Frame Accessories',
                    description: 'Complete range of heald frame accessories',
                    image: '/images/heald frame accesories.webp',
                    specs: {
                        'Type': 'Heald Frame',
                        'Application': 'Weaving',
                        'Category': 'Accessories',
                        'Machine': 'Loom'
                    }
                },
                {
                    id: 'spring-steel-connector',
                    name: 'Spring Steel Connector',
                    description: 'Durable spring steel connectors for mechanical applications',
                    image: '/images/spring-steel-connecter-250x250.jpg',
                    specs: {
                        'Material': 'Spring Steel',
                        'Type': 'Connector',
                        'Application': 'Mechanical',
                        'Strength': 'High'
                    }
                },
                {
                    id: 'tension-disc',
                    name: 'Tension Disc Stainless Steel',
                    description: 'Stainless steel tension discs for warping applications',
                    image: '/images/tension disc stainless steel (warping).webp',
                    specs: {
                        'Material': 'Stainless Steel',
                        'Type': 'Tension Disc',
                        'Application': 'Warping',
                        'Function': 'Tension Control'
                    }
                },
                {
                    id: 'lee-spring',
                    name: 'Lee Spring Metal Compression Spares',
                    description: 'Metal compression spring components',
                    image: '/images/lee spring metal compression spares.webp',
                    specs: {
                        'Brand': 'Lee Spring',
                        'Type': 'Compression',
                        'Material': 'Metal',
                        'Application': 'Spring Assembly'
                    }
                },
                {
                    id: 'knobs',
                    name: 'Knobs',
                    description: 'Various types of knobs for machinery control',
                    image: '/images/knobs.webp',
                    specs: {
                        'Type': 'Control Knobs',
                        'Application': 'Machinery',
                        'Material': 'Various',
                        'Function': 'Manual Control'
                    }
                },
                {
                    id: 'china-rapier',
                    name: 'China Rapier',
                    description: 'Rapier components for weaving machines',
                    image: '/images/china rapier.webp',
                    specs: {
                        'Origin': 'China',
                        'Type': 'Rapier',
                        'Application': 'Weaving',
                        'Machine': 'Rapier Loom'
                    }
                },
                {
                    id: 'feeder-tensioner',
                    name: 'Feeder Back Tensioner China Rapier',
                    description: 'Back tensioner for rapier feeder systems',
                    image: '/images/feeder back tensioner china rapier.webp',
                    specs: {
                        'Type': 'Back Tensioner',
                        'Application': 'Rapier Feeder',
                        'Origin': 'China',
                        'Function': 'Tension Control'
                    }
                }
            ]
        }
    };
}

// Product search and filtering
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productName = item.querySelector('.product-item-name').textContent.toLowerCase();
        const productCategory = item.querySelector('.product-item-category').textContent.toLowerCase();
        
        if (productName.includes(searchTerm) || productCategory.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterByCategory(category) {
    const productItems = document.querySelectorAll('.product-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    productItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (selectedProducts.length === 0) {
                showNotification('Please select at least one product for enquiry.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Submit form
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    showNotification('Enquiry submitted successfully! We will contact you soon.', 'success');
                    closeEnquiryModal();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                showNotification('Failed to submit enquiry. Please try again or contact us directly.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    // Close modals on outside click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('enquiry-modal')) {
            closeEnquiryModal();
        }
        if (e.target.classList.contains('product-selection-modal')) {
            closeProductSelectionModal();
        }
    });
    
    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEnquiryModal();
            closeProductSelectionModal();
        }
    });
});

// WhatsApp integration functions
function openWhatsAppEnquiry(productName = '') {
    const message = productName 
        ? `Hello from Laxmi Textile website! I would like to inquire about ${productName}.`
        : 'Hello from Laxmi Textile website! I would like to inquire about your products.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919833782555?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

function openWhatsAppEnquiryAshish(productName = '') {
    const message = productName 
        ? `Hello from Laxmi Textile website! I would like to inquire about ${productName}.`
        : 'Hello from Laxmi Textile website! I would like to inquire about your products.';
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919833127327?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 5000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
} 

// Global showProductModal function for products page
function showProductModal(categoryKey, productId) {
    const productsData = getProductsData();
    const category = productsData[categoryKey];
    const product = category.products.find(p => p.id === productId);
    
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.querySelector('.modal-body');
    
    if (modalTitle) modalTitle.textContent = product.name;
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="modal-content-grid">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-image-placeholder" style="display: none;">
                        <i class="fas fa-image"></i>
                        <h3>${product.name}</h3>
                    </div>
                </div>
                <div class="modal-details">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="modal-specs">
                        <h4>Specifications</h4>
                        <ul class="specs-list">
                            ${Object.entries(product.specs).map(([key, value]) => 
                                `<li><span class="spec-label">${key}:</span> <span>${value}</span></li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="btn-primary" onclick="openProductEnquiry('${product.id}', '${product.name}', '${categoryKey}')">
                            <i class="fas fa-shopping-cart"></i> Add to Enquiry
                        </button>
                        <button class="btn-secondary" onclick="openWhatsAppEnquiry('${product.name}')">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="btn-secondary" onclick="this.closest('.product-modal').classList.remove('active')">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    if (modal) modal.classList.add('active');
} 

// Simple test function for console
window.testAll = function() {
    console.log('🧪 Testing all functionality...');
    
    // Test 1: Check if functions exist
    const functions = ['openEnquiryModal', 'testButton', 'debugAll'];
    let allFunctionsExist = true;
    
    functions.forEach(func => {
        if (typeof window[func] !== 'function') {
            console.error(`❌ Function ${func} not found`);
            allFunctionsExist = false;
        } else {
            console.log(`✅ Function ${func} exists`);
        }
    });
    
    // Test 2: Check if elements exist
    const elements = ['enquiryModal', 'productSelectionModal'];
    let allElementsExist = true;
    
    elements.forEach(elementId => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`❌ Element ${elementId} not found`);
            allElementsExist = false;
        } else {
            console.log(`✅ Element ${elementId} exists`);
        }
    });
    
    // Test 3: Try to open enquiry modal
    try {
        openEnquiryModal();
        console.log('✅ Enquiry modal opened successfully');
        setTimeout(() => {
            closeEnquiryModal();
            console.log('✅ Enquiry modal closed successfully');
        }, 2000);
    } catch (error) {
        console.error('❌ Failed to open/close enquiry modal:', error);
    }
    
    console.log('🧪 Test complete!');
    return allFunctionsExist && allElementsExist;
}; 