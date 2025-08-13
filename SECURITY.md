# Security Features Documentation

This document outlines the comprehensive security features implemented in the Laxmi Textile Engineering Works website.

## 🔒 Implemented Security Features

### 1. Input Sanitization and Validation

**Location**: `server.js` - `sanitizeInput()`, `validateEmail()`, `validatePassword()`

**Features**:
- **XSS Prevention**: Removes dangerous HTML characters (`<`, `>`)
- **Script Injection Protection**: Removes `javascript:` protocol and `script` tags
- **Event Handler Protection**: Removes `on*` event handlers
- **Email Validation**: Regex-based email format validation
- **Password Strength**: Enforces minimum 8 characters with uppercase, lowercase, and number

**Usage**:
```javascript
// Input sanitization is automatically applied to all requests
const sanitizedInput = sanitizeInput(userInput);

// Email validation
if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
}

// Password validation
if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Password too weak' });
}
```

### 2. Secure Password Hashing with bcrypt

**Location**: `server.js` - `hashPassword()`, `verifyPassword()`

**Features**:
- **bcrypt Integration**: Uses industry-standard bcrypt for password hashing
- **Salt Rounds**: Configurable salt rounds (default: 12)
- **Secure Comparison**: Timing-attack resistant password verification

**Usage**:
```javascript
// Hash a password
const hashedPassword = await hashPassword('userPassword123');

// Verify a password
const isValid = await verifyPassword('userPassword123', hashedPassword);
```

### 3. Secure Session Management

**Location**: `server.js` - Session configuration and authentication routes

**Features**:
- **HttpOnly Cookies**: Prevents XSS access to session tokens
- **Secure Flag**: HTTPS-only cookies in production
- **SameSite**: Strict same-site policy prevents CSRF attacks
- **Token Generation**: Cryptographically secure random tokens

**Cookie Configuration**:
```javascript
res.cookie('sessionToken', token, {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

### 4. Rate Limiting

**Location**: `server.js` - `rateLimiter` middleware

**Features**:
- **IP-based Limiting**: 10 requests per minute per IP address
- **Sliding Window**: Automatic cleanup of old records
- **Memory Efficient**: Uses Map for storage with automatic cleanup
- **Configurable**: Easy to adjust limits and time windows

**Configuration**:
```javascript
const windowMs = 60 * 1000; // 1 minute window
const maxRequests = 10; // 10 requests per minute per IP
```

### 5. Security HTTP Headers

**Location**: `server.js` - Helmet configuration and custom headers

**Implemented Headers**:
- **Strict-Transport-Security**: Forces HTTPS in production
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-XSS-Protection**: Additional XSS protection
- **Content-Security-Policy**: Controls resource loading
- **Referrer-Policy**: Controls referrer information
- **Permissions-Policy**: Restricts browser features

**Header Configuration**:
```javascript
// Helmet configuration
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            // ... more directives
        }
    },
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true
    }
}));

// Custom security headers
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'DENY');
res.setHeader('X-XSS-Protection', '1; mode=block');
```

### 6. Error Handling and Logging

**Location**: `server.js` - Global error handler

**Features**:
- **Production-safe**: Generic error messages in production
- **Detailed Logging**: Comprehensive error logging for debugging
- **No Information Leakage**: Prevents sensitive data exposure
- **Structured Logging**: Includes timestamp, IP, method, and URL

**Error Response**:
```javascript
// Development: Detailed error information
{
    "error": "Specific error message",
    "stack": "Error stack trace"
}

// Production: Generic error message
{
    "error": "Something went wrong. Please try again later."
}
```

### 7. CORS Configuration

**Location**: `server.js` - CORS middleware

**Features**:
- **Environment-specific**: Different origins for dev/production
- **Credentials Support**: Secure cookie handling
- **Method Restriction**: Only allows necessary HTTP methods
- **Header Control**: Restricts allowed headers

**Configuration**:
```javascript
app.use(cors({
    origin: NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 8. Request Size Limits

**Location**: `server.js` - Body parsing middleware

**Features**:
- **JSON Limit**: 10MB maximum JSON payload
- **URL-encoded Limit**: 10MB maximum form data
- **DoS Protection**: Prevents large payload attacks

**Configuration**:
```javascript
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
```

## 🚀 API Endpoints

### Authentication Endpoints

#### POST `/api/register`
Register a new user with secure password hashing.

**Request Body**:
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

**Request Body**:
```json
{
    "email": "user@example.com",
    "password": "SecurePass123"
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

## 🔧 Configuration

### Environment Variables

Set these environment variables for production:

```bash
NODE_ENV=production
PORT=3000
```

### Production Checklist

Before deploying to production:

1. ✅ Set `NODE_ENV=production`
2. ✅ Update CORS origins to your actual domain
3. ✅ Configure HTTPS (required for secure cookies)
4. ✅ Set up proper logging (consider using Winston or similar)
5. ✅ Configure database for user storage
6. ✅ Set up monitoring and alerting
7. ✅ Regular security audits

### Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Monitoring**: Monitor for suspicious activity
3. **Backups**: Regular database and file backups
4. **SSL/TLS**: Always use HTTPS in production
5. **Access Control**: Implement proper authorization
6. **Audit Logs**: Log all authentication attempts
7. **Rate Limiting**: Monitor and adjust rate limits as needed

## 🛡️ Security Testing

### Manual Testing

1. **XSS Testing**: Try injecting `<script>alert('xss')</script>`
2. **SQL Injection**: Test with SQL-like strings
3. **Rate Limiting**: Make rapid requests to test limits
4. **Authentication**: Test with invalid credentials
5. **Session Security**: Test cookie attributes

### Automated Testing

Consider implementing automated security tests:

```javascript
// Example security test
describe('Security Tests', () => {
    test('should sanitize XSS input', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                name: '<script>alert("xss")</script>',
                email: 'test@example.com',
                password: 'Password123'
            });
        
        expect(response.status).toBe(201);
        expect(response.body.user.name).not.toContain('<script>');
    });
});
```

## 📞 Support

For security-related issues or questions:

1. Review this documentation
2. Check the code comments in `server.js`
3. Test the security features manually
4. Consider professional security audit for production deployments

---

**Note**: This security implementation provides a solid foundation but should be enhanced based on your specific requirements and threat model. Consider additional security measures like:

- Database security (connection encryption, prepared statements)
- File upload security (virus scanning, type validation)
- API rate limiting per user (not just IP)
- Two-factor authentication
- Security monitoring and alerting
- Regular penetration testing 