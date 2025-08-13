// Products Page JavaScript

class ProductsPage {
    constructor() {
        this.products = this.getProductsData();
        this.currentCategory = 'printing';
        this.init();
    }

    getProductsData() {
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

    init() {
        this.setupEventListeners();
        this.renderCategories();
        this.renderProducts(this.currentCategory);
        this.hideLoading();
    }

    setupEventListeners() {
        // Category tab clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.category-tab')) {
                const tab = e.target.closest('.category-tab');
                const category = tab.dataset.category;
                this.switchCategory(category);
            }
        });

        // Product card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.product-card')) {
                const card = e.target.closest('.product-card');
                const productId = card.dataset.productId;
                const category = card.dataset.category;
                this.showProductModal(category, productId);
            }
        });

        // Modal close
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('productModal');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideProductModal();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideProductModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideProductModal();
            }
        });
    }

    renderCategories() {
        const categoryTabs = document.getElementById('categoryTabs');
        if (!categoryTabs) return;
        
        categoryTabs.innerHTML = '';

        Object.keys(this.products).forEach((categoryKey, index) => {
            const category = this.products[categoryKey];
            const tab = document.createElement('div');
            tab.className = `category-tab ${index === 0 ? 'active' : ''}`;
            tab.dataset.category = categoryKey;
            
            tab.innerHTML = `
                <i class="${category.icon}"></i>
                <span>${category.name}</span>
            `;
            
            categoryTabs.appendChild(tab);
        });
    }

    renderProducts(categoryKey) {
        const productsContent = document.getElementById('productsContent');
        if (!productsContent) return;
        
        const category = this.products[categoryKey];
        if (!category) return;

        productsContent.innerHTML = '';

        category.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = product.id;
            productCard.dataset.category = categoryKey;
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="product-image-placeholder" style="display: none;">
                        <i class="fas fa-image"></i>
                        <h3>${product.name}</h3>
                    </div>
                    <div class="product-overlay">
                        <button class="view-details-btn">View Details</button>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-specs">
                        ${Object.entries(product.specs).slice(0, 2).map(([key, value]) => 
                            `<span class="spec-tag">${key}: ${value}</span>`
                        ).join('')}
                    </div>
                    <div class="product-actions">
                        <button class="btn-inquire" onclick="openProductEnquiry('${product.id}', '${product.name}', '${categoryKey}')">Inquire Now</button>
                        <button class="btn-details" onclick="showProductModal('${categoryKey}', '${product.id}')">Details</button>
                    </div>
                </div>
            `;
            
            productsContent.appendChild(productCard);
        });
    }

    switchCategory(categoryKey) {
        // Update active tab
        document.querySelectorAll('.category-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-category="${categoryKey}"]`).classList.add('active');
        
        // Update current category and render products
        this.currentCategory = categoryKey;
        this.renderProducts(categoryKey);
    }

    showProductModal(categoryKey, productId) {
        const category = this.products[categoryKey];
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

    hideProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) modal.classList.remove('active');
    }

    hideLoading() {
        const loading = document.querySelector('.loading');
        if (loading) loading.style.display = 'none';
    }

    showError(message) {
        const productsContent = document.getElementById('productsContent');
        if (productsContent) {
            productsContent.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize the products page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductsPage();
});

// Add smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add intersection observer for animations
document.addEventListener('DOMContentLoaded', () => {
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

    // Observe product cards for animation
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Add focus styles for keyboard navigation
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    // Remove focus styles when using mouse
    document.body.classList.remove('keyboard-navigation');
});

// Add CSS for keyboard navigation
const keyboardStyles = document.createElement('style');
keyboardStyles.textContent = `
    .keyboard-navigation .category-tab:focus,
    .keyboard-navigation .product-card:focus,
    .keyboard-navigation button:focus {
        outline: 2px solid #C0392B;
        outline-offset: 2px;
    }
`;
document.head.appendChild(keyboardStyles); 