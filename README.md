# Laxmi Textile Engineering Works - Professional Website

A comprehensive, secure web application for Laxmi Textile Engineering Works, showcasing their range of textile machinery, printing equipment, invisible grills, and precision components.

## 🚀 Features

### Core Functionality
- **Product Catalog**: Comprehensive display of textile machinery, printing equipment, and components
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Fast Performance**: Optimized loading with compression and caching
- **SEO Optimized**: Search engine friendly structure and metadata

### 🔒 Security Features (NEW!)

This application implements comprehensive security measures to protect against common web vulnerabilities:

#### 1. Input Validation & XSS Protection
- **Sanitization**: All user inputs are automatically sanitized to prevent XSS attacks
- **Validation**: Email and password validation with strong requirements
- **Encoding**: Output encoding to prevent script injection

#### 2. Secure Authentication
- **bcrypt Integration**: Industry-standard password hashing with configurable salt rounds
- **Session Management**: Secure HttpOnly cookies with SameSite protection
- **Token Generation**: Cryptographically secure session tokens

#### 3. Rate Limiting
- **IP-based Protection**: 10 requests per minute per IP address
- **Brute Force Prevention**: Automatic blocking of excessive requests
- **Memory Efficient**: Automatic cleanup of old rate limit records

#### 4. Security Headers
- **HSTS**: Strict Transport Security for HTTPS enforcement
- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing prevention
- **X-XSS-Protection**: Additional XSS protection
- **Content-Security-Policy**: Resource loading control
- **Referrer-Policy**: Referrer information control

#### 5. Error Handling & Logging
- **Production-safe**: Generic error messages in production
- **Detailed Logging**: Comprehensive error tracking for debugging
- **No Information Leakage**: Prevents sensitive data exposure

#### 6. CORS & Request Security
- **Environment-specific**: Different CORS policies for dev/production
- **Request Limits**: 10MB maximum payload size
- **Method Restriction**: Only necessary HTTP methods allowed

## 📦 Installation

### Prerequisites
- Node.js (>= 14.0.0)
- npm or yarn

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd laxmit

# Install dependencies
npm install

# Start the development server
npm start
```

### Environment Setup
```bash
# Development
NODE_ENV=development npm start

# Production
NODE_ENV=production npm start
```

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production    # Environment (development/production)
PORT=3000             # Server port
```

### Security Configuration
The application includes several security configurations that can be customized:

#### Rate Limiting
```javascript
const windowMs = 60 * 1000; // 1 minute window
const maxRequests = 10; // 10 requests per minute per IP
```

#### Password Requirements
```javascript
// Minimum 8 characters with 1 uppercase, 1 lowercase, and 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
```

#### CORS Origins
```javascript
// Update these for production
origin: NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000']
```

## 🛡️ Security Testing

### Automated Tests
Run the comprehensive security test suite:

```bash
node test-security.js
```

This will test:
- ✅ XSS Protection
- ✅ Password Validation
- ✅ Rate Limiting
- ✅ Authentication
- ✅ Security Headers
- ✅ Error Handling
- ✅ Input Validation

### Manual Testing
1. **XSS Testing**: Try injecting `<script>alert('xss')</script>`
2. **Rate Limiting**: Make rapid requests to test limits
3. **Authentication**: Test with invalid credentials
4. **Security Headers**: Check browser developer tools

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/register`
Register a new user with secure password hashing.

**Request**:
```json
{
    "email": "user@example.com",
    "password": "SecurePass123",
    "name": "John Doe"
}
```

**Response**:
```json
{
    "message": "User registered successfully",
    "user": {
        "email": "user@example.com",
        "name": "John Doe"
    }
}
```

#### POST `/api/login`
Authenticate user and create secure session.

**Request**:
```json
{
    "email": "user@example.com",
    "password": "Password123"
}
```

**Response**:
```json
{
    "message": "Login successful",
    "user": {
        "email": "user@example.com"
    }
}
```

#### POST `/api/logout`
Clear session and logout user.

**Response**:
```json
{
    "message": "Logged out successfully"
}
```

### Product Endpoints

#### GET `/api/products`
Retrieve all product categories and subcategories.

**Response**: Complete product catalog with categories:
- Printing Machinery & Spares
- Textile Machinery & Spares
- Invisible Grills & Components
- Sheet Metal & Components

## 🏗️ Project Structure

```
laxmit/
├── server.js              # Main application server with security features
├── package.json           # Dependencies and scripts
├── SECURITY.md           # Comprehensive security documentation
├── test-security.js      # Security test suite
├── public/               # Static files
│   ├── index.html        # Home page
│   ├── products.html     # Products page
│   ├── 404.html          # Error page
│   ├── css/              # Stylesheets
│   ├── js/               # JavaScript files
│   └── images/           # Product images
└── images/               # Additional images
```

## 🔒 Security Best Practices

### For Production Deployment

1. **Environment Configuration**
   - Set `NODE_ENV=production`
   - Update CORS origins to your actual domain
   - Configure HTTPS (required for secure cookies)

2. **Database Security**
   - Use encrypted database connections
   - Implement prepared statements
   - Regular database backups

3. **Monitoring & Logging**
   - Set up application monitoring
   - Configure security alerting
   - Regular security audits

4. **Additional Security Measures**
   - Two-factor authentication
   - File upload security
   - API rate limiting per user
   - Regular penetration testing

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
NODE_ENV=production npm start
```

### Docker (Optional)
```bash
# Build image
docker build -t laxmi-textile .

# Run container
docker run -p 3000:3000 -e NODE_ENV=production laxmi-textile
```

## 📞 Support

For technical support or security-related questions:

1. Review the `SECURITY.md` documentation
2. Run the security test suite: `node test-security.js`
3. Check the code comments in `server.js`
4. Consider professional security audit for production deployments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔄 Updates

### Latest Security Updates
- ✅ Comprehensive input sanitization
- ✅ bcrypt password hashing
- ✅ Rate limiting implementation
- ✅ Security headers configuration
- ✅ Secure session management
- ✅ Production-safe error handling

---

**Note**: This application implements industry-standard security practices but should be regularly updated and audited based on your specific security requirements and threat model. 