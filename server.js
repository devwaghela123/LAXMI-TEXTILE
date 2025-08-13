const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Production domain - update this to your actual domain
const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || 'https://yourdomain.com';

// ============================================================================
// SECURITY CONFIGURATION
// ============================================================================

// Rate limiting storage (in production, use Redis or database)
const rateLimitStore = new Map();

// Rate limiter middleware
const rateLimiter = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10; // 10 requests per minute per IP
    
    if (!rateLimitStore.has(ip)) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
        const record = rateLimitStore.get(ip);
        if (now > record.resetTime) {
            // Reset window
            record.count = 1;
            record.resetTime = now + windowMs;
        } else {
            record.count++;
        }
        
        if (record.count > maxRequests) {
            return res.status(429).json({ 
                error: 'Too many requests. Please try again later.',
                retryAfter: Math.ceil((record.resetTime - now) / 1000)
            });
        }
    }
    
    next();
};

// Clean up old rate limit records every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimitStore.entries()) {
        if (now > record.resetTime) {
            rateLimitStore.delete(ip);
        }
    }
}, 5 * 60 * 1000);

// Input sanitization and validation
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    
    // Remove potentially dangerous characters and patterns
    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .replace(/script/gi, '') // Remove script tags
        .trim();
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

// XSS protection middleware
const xssProtection = (req, res, next) => {
    // Sanitize query parameters
    if (req.query) {
        for (const [key, value] of Object.entries(req.query)) {
            if (typeof value === 'string') {
                req.query[key] = sanitizeInput(value);
            }
        }
    }
    
    // Sanitize body parameters
    if (req.body) {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === 'string') {
                req.body[key] = sanitizeInput(value);
            }
        }
    }
    
    next();
};

// Secure session management
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'laxmi-textile-secure-session-secret-2024',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
};

// ============================================================================
// MIDDLEWARE SETUP
// ============================================================================

// Enhanced security headers
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://formspree.io"],
            frameSrc: ["'none'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: NODE_ENV === 'production' ? [] : null
        }
    },
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    },
    frameguard: { action: 'deny' },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Additional security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // Remove server information
    res.removeHeader('X-Powered-By');
    
    next();
});

// Apply rate limiting to all routes
app.use(rateLimiter);

// CORS configuration
app.use(cors({
    origin: NODE_ENV === 'production' 
        ? [PRODUCTION_DOMAIN] // Use environment variable for production domain
        : ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// XSS protection middleware
app.use(xssProtection);

// Serve static files with security headers
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
        // Set cache headers for static assets
        if (path.endsWith('.css') || path.endsWith('.js') || path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg') || path.endsWith('.gif') || path.endsWith('.ico')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
        }
        
        // Security headers for all static files
        res.setHeader('X-Content-Type-Options', 'nosniff');
    }
}));

// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================

// Password hashing utility
const hashPassword = async (password) => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};

// Password verification utility
const verifyPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Generate secure token
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

// ============================================================================
// ROUTES
// ============================================================================

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Products page route
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

// API Routes for products data
app.get('/api/products', (req, res) => {
    const products = {
        printing: {
            name: "Offset Printing Machines & Spares",
            description: "Complete printing solutions and spare parts",
            icon: "fas fa-print",
            subcategories: [
                {
                    id: "komari-separator",
                    name: "Komari Offset Printing Paper Separator",
                    description: "High-quality paper separator for efficient printing operations",
                    image: "/images/products/printing/komari-separator.jpg",
                    features: ["Precision paper handling", "Durable construction", "Easy maintenance", "High efficiency"]
                },
                {
                    id: "ryobi-separator",
                    name: "Paper Separator for Ryobi Offset Printing Machines",
                    description: "Compatible paper separator for Ryobi printing systems",
                    image: "/images/products/printing/ryobi-separator.jpg",
                    features: ["Ryobi compatibility", "Reliable performance", "Quick installation", "Cost-effective"]
                },
                {
                    id: "hmt-offset",
                    name: "HMT Offset Machine",
                    description: "Professional offset printing machine for commercial use",
                    image: "/images/products/printing/hmt-offset.jpg",
                    features: ["Commercial grade", "High speed", "Advanced controls", "Quality output"]
                },
                {
                    id: "mitsubishi-separator",
                    name: "Mitsubishi Sheet Separator for Offset Printing",
                    description: "Premium sheet separator for Mitsubishi printing equipment",
                    image: "/images/products/printing/mitsubishi-separator.jpg",
                    features: ["Mitsubishi compatible", "Precision engineering", "Long service life", "Easy operation"]
                },
                {
                    id: "paper-cup-sucker",
                    name: "Paper Cup Rubber Sucker",
                    description: "Durable rubber sucker for paper handling systems",
                    image: "/images/products/printing/paper-cup-sucker.jpg",
                    features: ["High durability", "Flexible design", "Easy replacement", "Cost-effective"]
                },
                {
                    id: "heidelberg-gto",
                    name: "Heidelberg GTO 52 Offset Printing Machine",
                    description: "Professional Heidelberg offset printing solution",
                    image: "/images/products/printing/heidelberg-gto.jpg",
                    features: ["Heidelberg quality", "52 cm format", "Advanced technology", "Reliable performance"]
                },
                {
                    id: "varnish-coating",
                    name: "Varnish Coating Machine for Paper",
                    description: "Specialized coating machine for paper finishing",
                    image: "/images/products/printing/varnish-coating.jpg",
                    features: ["Paper coating", "Varnish application", "Uniform finish", "High capacity"]
                },
                {
                    id: "solna-225",
                    name: "Solna 225 Offset Printing Machine",
                    description: "Compact offset printing machine for small to medium operations",
                    image: "/images/products/printing/solna-225.jpg",
                    features: ["Compact design", "Easy operation", "Quality output", "Affordable"]
                }
            ]
        },
        textile: {
            name: "Textile Machinery & Spares",
            description: "Comprehensive textile machinery solutions and spare parts",
            icon: "fas fa-spinner",
            subcategories: [
                {
                    id: "sulzer-g6300",
                    name: "Sulzer G 6300",
                    description: "High-performance Sulzer weaving machine spare parts",
                    image: "/images/products/textile/sulzer-g6300.jpg",
                    features: ["Sulzer compatible", "Precision parts", "Durable construction", "Easy installation"]
                },
                {
                    id: "somet-spares",
                    name: "Somet Machine Spare Parts",
                    description: "Complete range of Somet weaving machine components",
                    image: "/images/products/textile/somet-spares.jpg",
                    features: ["Somet compatible", "Quality assurance", "Wide range", "Reliable supply"]
                },
                {
                    id: "wire-tensioner",
                    name: "Stainless Steel Wire Tensioner Disk",
                    description: "Precision tensioner disk for textile machinery",
                    image: "/images/products/textile/wire-tensioner.jpg",
                    features: ["Stainless steel", "Precision tensioning", "Corrosion resistant", "Long lifespan"]
                },
                {
                    id: "feeder-tensioner",
                    name: "Feeder-back Tensioner for China Rapier looms",
                    description: "Specialized tensioner for China rapier loom systems",
                    image: "/images/products/textile/feeder-tensioner.jpg",
                    features: ["China rapier compatible", "Precision tensioning", "Easy adjustment", "Durable design"]
                },
                {
                    id: "dornier-cable",
                    name: "Dornier GTN Weft Cable",
                    description: "High-quality weft cable for Dornier weaving machines",
                    image: "/images/products/textile/dornier-cable.jpg",
                    features: ["Dornier compatible", "High strength", "Precision engineering", "Reliable performance"]
                },
                {
                    id: "side-selvadge-cutter",
                    name: "Side Selvadge Cutter Repairing",
                    description: "Professional repair service for selvadge cutting systems",
                    image: "/images/products/textile/side-selvadge-cutter.jpg",
                    features: ["Expert repair", "Quality service", "Quick turnaround", "Warranty included"]
                },
                {
                    id: "side-selvage-heater",
                    name: "Side Selvage Heater",
                    description: "Precision heating system for selvadge treatment",
                    image: "/images/products/textile/side-selvage-heater.jpg",
                    features: ["Precision heating", "Temperature control", "Energy efficient", "Easy maintenance"]
                },
                {
                    id: "staubli-jacquard",
                    name: "Staubli Jacquard M4 Module",
                    description: "Advanced Jacquard module for complex pattern weaving",
                    image: "/images/products/textile/staubli-jacquard.jpg",
                    features: ["Complex patterns", "High speed", "Digital control", "Easy programming"]
                },
                {
                    id: "chrome-tensioners",
                    name: "Chrome-plated Yarn Tensioners",
                    description: "Durable chrome-plated tensioners for yarn handling",
                    image: "/images/products/textile/chrome-tensioners.jpg",
                    features: ["Chrome plating", "Corrosion resistant", "Smooth operation", "Long service life"]
                },
                {
                    id: "toyota-leno",
                    name: "Toyota Air-Jet Spares Leno Device",
                    description: "Specialized leno device for Toyota air-jet looms",
                    image: "/images/products/textile/toyota-leno.jpg",
                    features: ["Toyota compatible", "Precision leno", "Easy installation", "Reliable performance"]
                },
                {
                    id: "toyota-510-jatt",
                    name: "Toyota 510 Jatt Leno Accessories",
                    description: "Complete leno accessories for Toyota 510 Jatt looms",
                    image: "/images/products/textile/toyota-510-jatt.jpg",
                    features: ["510 Jatt compatible", "Complete accessories", "Quality parts", "Easy maintenance"]
                },
                {
                    id: "somet-rapier",
                    name: "Somet Rapier Loom Spare Parts",
                    description: "Comprehensive spare parts for Somet rapier looms",
                    image: "/images/products/textile/somet-rapier.jpg",
                    features: ["Somet rapier", "Complete range", "Quality assurance", "Reliable supply"]
                },
                {
                    id: "carbide-cutters",
                    name: "Carbide Cutters",
                    description: "High-performance carbide cutters for weaving machines",
                    image: "/images/products/textile/carbide-cutters.jpg",
                    features: ["Carbide material", "High durability", "Sharp cutting", "Long lifespan"]
                },
                {
                    id: "sulzer-g6100",
                    name: "Sulzer G 6100 Weft Needle",
                    description: "Precision weft needle for Sulzer G 6100 machines",
                    image: "/images/products/textile/sulzer-g6100.jpg",
                    features: ["G 6100 compatible", "Precision needle", "High quality", "Reliable performance"]
                },
                {
                    id: "water-jet-parts",
                    name: "Water Jet Parts",
                    description: "Complete range of water jet weaving machine components",
                    image: "/images/products/textile/water-jet-parts.jpg",
                    features: ["Water jet compatible", "Complete range", "Quality parts", "Reliable supply"]
                },
                {
                    id: "yamada-dobby",
                    name: "Yamada Dobby Wire",
                    description: "High-quality dobby wire for Yamada systems",
                    image: "/images/products/textile/yamada-dobby.jpg",
                    features: ["Yamada compatible", "High strength", "Precision wire", "Durable construction"]
                },
                {
                    id: "dornier-airjet",
                    name: "Dornier Air-Jet Parts",
                    description: "Specialized parts for Dornier air-jet weaving machines",
                    image: "/images/products/textile/dornier-airjet.jpg",
                    features: ["Dornier compatible", "Air-jet specific", "Quality parts", "Reliable performance"]
                },
                {
                    id: "iron-drc-rod",
                    name: "Iron DRC Rod",
                    description: "Durable iron DRC rod for weaving applications",
                    image: "/images/products/textile/iron-drc-rod.jpg",
                    features: ["Iron construction", "High strength", "Durable design", "Easy installation"]
                },
                {
                    id: "dobby-spring",
                    name: "Dobby Spring with Nylon Hook",
                    description: "Specialized spring with nylon hook for dobby systems",
                    image: "/images/products/textile/dobby-spring.jpg",
                    features: ["Nylon hook", "Spring action", "Durable design", "Easy installation"]
                },
                {
                    id: "tension-disc",
                    name: "Tension Disc (Stainless Steel)",
                    description: "Precision stainless steel tension disc for warping",
                    image: "/images/products/textile/tension-disc.jpg",
                    features: ["Stainless steel", "Precision tensioning", "Corrosion resistant", "Long lifespan"]
                },
                {
                    id: "lee-spring",
                    name: "Lee Spring",
                    description: "High-quality compression spring for machinery applications",
                    image: "/images/products/textile/lee-spring.jpg",
                    features: ["Compression spring", "High quality", "Durable design", "Reliable performance"]
                }
            ]
        },
        invisible_grills: {
            name: "Invisible Grills & Components",
            description: "Complete invisible grill solutions and components",
            icon: "fas fa-th-large",
            subcategories: [
                {
                    id: "torx-screws",
                    name: "SS 304 Torx Head Screws",
                    description: "High-quality stainless steel torx head screws for invisible grills",
                    image: "/images/products/grills/torx-screws.jpg",
                    features: ["SS 304 material", "Torx head", "Corrosion resistant", "High strength"]
                },
                {
                    id: "cross-clips",
                    name: "2.50 mm Cross Clips & Stiffener",
                    description: "Precision cross clips and stiffeners for grill assembly",
                    image: "/images/products/grills/cross-clips.jpg",
                    features: ["2.50mm size", "Cross design", "Stiffener included", "Easy installation"]
                },
                {
                    id: "hex-flange-screw",
                    name: "Hex Flange Head Screw",
                    description: "Specialized hex flange head screws for invisible grills",
                    image: "/images/products/grills/hex-flange-screw.jpg",
                    features: ["Hex flange head", "High strength", "Easy installation", "Durable design"]
                },
                {
                    id: "nylon-bush",
                    name: "White Cylindrical Nylon Bush",
                    description: "Precision nylon bush for invisible window grill tracks",
                    image: "/images/products/grills/nylon-bush.jpg",
                    features: ["Cylindrical design", "Nylon material", "Track compatible", "Smooth operation"]
                },
                {
                    id: "aluminum-ferrule",
                    name: "2 mm Ferrule (Aluminium)",
                    description: "Lightweight aluminum ferrule for grill applications",
                    image: "/images/products/grills/aluminum-ferrule.jpg",
                    features: ["2mm size", "Aluminum material", "Lightweight", "Corrosion resistant"]
                },
                {
                    id: "nylon-coated-wire",
                    name: "2.5 mm Nylon-Coated Wire",
                    description: "Durable nylon-coated wire for invisible grill systems",
                    image: "/images/products/grills/nylon-coated-wire.jpg",
                    features: ["2.5mm diameter", "Nylon coating", "Weather resistant", "Long lifespan"]
                },
                {
                    id: "5mm-nylon-wire",
                    name: "5 mm Nylon-Coated Wire Rope",
                    description: "Heavy-duty nylon-coated wire rope for structural applications",
                    image: "/images/products/grills/5mm-nylon-wire.jpg",
                    features: ["5mm diameter", "Wire rope", "Nylon coating", "High strength"]
                },
                {
                    id: "nylon-coated-ms",
                    name: "Nylon Coating Mild Steel Wire Rope",
                    description: "Nylon-coated mild steel wire rope for enhanced durability",
                    image: "/images/products/grills/nylon-coated-ms.jpg",
                    features: ["Mild steel core", "Nylon coating", "Enhanced durability", "Weather resistant"]
                },
                {
                    id: "invisible-grill-raw",
                    name: "Invisible Window Grill Raw Material",
                    description: "Complete raw material for invisible window grill manufacturing",
                    image: "/images/products/grills/invisible-grill-raw.jpg",
                    features: ["Raw material", "Complete solution", "Quality assured", "Customizable"]
                },
                {
                    id: "nylon-coated-finishes",
                    name: "Invisible Grills (nylon-coated finishes)",
                    description: "Finished invisible grills with nylon coating for enhanced appearance",
                    image: "/images/products/grills/nylon-coated-finishes.jpg",
                    features: ["Nylon coating", "Enhanced finish", "Weather resistant", "Aesthetic appeal"]
                }
            ]
        },
        components: {
            name: "Sheet Metal & Components",
            description: "Precision sheet metal components and accessories",
            icon: "fas fa-cogs",
            subcategories: [
                {
                    id: "sheet-metal-die",
                    name: "Sheet Metal Pressed Die",
                    description: "Precision pressed die for sheet metal component manufacturing",
                    image: "/images/products/components/sheet-metal-die.jpg",
                    features: ["Precision die", "Sheet metal", "Custom design", "High accuracy"]
                },
                {
                    id: "plastic-screw-knob",
                    name: "Plastic Head Screw Knob",
                    description: "User-friendly plastic head screw knob for easy operation",
                    image: "/images/products/components/plastic-screw-knob.jpg",
                    features: ["Plastic head", "Easy grip", "User friendly", "Durable design"]
                },
                {
                    id: "csk-bolts",
                    name: "MS CSK Head Bolts",
                    description: "High-quality mild steel countersunk head bolts",
                    image: "/images/products/components/csk-bolts.jpg",
                    features: ["MS material", "CSK head", "High strength", "Easy installation"]
                },
                {
                    id: "shim-washer",
                    name: "Stainless Steel Shim Washer",
                    description: "Precision stainless steel shim washers for fine adjustments",
                    image: "/images/products/components/shim-washer.jpg",
                    features: ["Stainless steel", "Precision shim", "Fine adjustment", "Corrosion resistant"]
                },
                {
                    id: "heald-frame-accessories",
                    name: "Heald Frame Accessories",
                    description: "Complete range of heald frame accessories for weaving",
                    image: "/images/products/components/heald-frame-accessories.jpg",
                    features: ["Heald frame", "Complete accessories", "Quality parts", "Easy installation"]
                },
                {
                    id: "drc-rod-accessories",
                    name: "DRC Rod Accessories",
                    description: "Specialized accessories for DRC rod applications",
                    image: "/images/products/components/drc-rod-accessories.jpg",
                    features: ["DRC rod", "Specialized accessories", "Quality parts", "Easy installation"]
                },
                {
                    id: "air-jet-omni",
                    name: "Air-Jet Omni Plus",
                    description: "Advanced air-jet omni plus system for weaving machines",
                    image: "/images/products/components/air-jet-omni.jpg",
                    features: ["Air-jet system", "Omni plus", "Advanced technology", "High efficiency"]
                },
                {
                    id: "china-rapier",
                    name: "China Rapier",
                    description: "High-quality China rapier components for weaving machines",
                    image: "/images/products/components/china-rapier.jpg",
                    features: ["China rapier", "High quality", "Precision parts", "Reliable performance"]
                },
                {
                    id: "knobs",
                    name: "Knobs",
                    description: "Complete range of knobs for machinery applications",
                    image: "/images/products/components/knobs.jpg",
                    features: ["Complete range", "Various sizes", "Easy grip", "Durable design"]
                }
            ]
        }
    };
    
    res.json(products);
});

// Example authentication routes (for demonstration)
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        
        // Input validation
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        if (!validatePassword(password)) {
            return res.status(400).json({ 
                error: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number' 
            });
        }
        
        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // In a real application, you would save to database here
        // For demo purposes, we'll just return success
        res.status(201).json({ 
            message: 'User registered successfully',
            user: { email, name }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Input validation
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        // In a real application, you would fetch user from database
        // For demo purposes, we'll simulate a successful login
        const mockHashedPassword = await hashPassword('Password123');
        const isValidPassword = await verifyPassword(password, mockHashedPassword);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate session token
        const token = generateToken();
        
        // Set secure cookie
        res.cookie('sessionToken', token, {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        
        res.json({ 
            message: 'Login successful',
            user: { email }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('sessionToken');
    res.json({ message: 'Logged out successfully' });
});

// ============================================================================
// HEALTH CHECK & MONITORING
// ============================================================================

// Health check endpoint for deployment monitoring
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: NODE_ENV,
        version: '1.0.0'
    });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error internally
    console.error('Error:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
    
    // Send generic error message to client
    const errorMessage = NODE_ENV === 'production' 
        ? 'Something went wrong. Please try again later.' 
        : err.message;
    
    res.status(err.status || 500).json({ 
        error: errorMessage,
        ...(NODE_ENV === 'development' && { stack: err.stack })
    });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
    console.log(`🌐 Environment: ${NODE_ENV}`);
    if (NODE_ENV === 'production') {
        console.log(`🌍 Production domain: ${PRODUCTION_DOMAIN}`);
    }
    console.log(`🔒 Security features enabled: Rate limiting, XSS protection, Secure headers`);
    console.log(`💚 Health check available at: /health`);
    console.log(`📊 Server started at: ${new Date().toISOString()}`);
});

module.exports = app; 