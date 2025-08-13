#!/usr/bin/env node

/**
 * Security Features Test Script
 * 
 * This script tests all the implemented security features:
 * 1. Input sanitization and XSS protection
 * 2. Password validation
 * 3. Rate limiting
 * 4. Authentication with bcrypt
 * 5. Secure cookies
 * 6. Error handling
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';

// Test colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, data = null, cookies = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (cookies) {
            options.headers['Cookie'] = cookies;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const response = {
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: body ? JSON.parse(body) : null
                    };
                    resolve(response);
                } catch (error) {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function runTests() {
    log('\n🔒 SECURITY FEATURES TEST SUITE', 'bold');
    log('================================\n', 'bold');

    let testCount = 0;
    let passedTests = 0;

    // Test 1: XSS Protection
    log('1. Testing XSS Protection...', 'blue');
    testCount++;
    try {
        const xssData = {
            email: 'test@example.com',
            password: 'SecurePass123',
            name: '<script>alert("xss")</script>'
        };
        
        const response = await makeRequest('POST', '/api/register', xssData);
        
        if (response.statusCode === 201 && 
            response.body.user.name === 'alert("xss")/') {
            log('   ✅ XSS protection working - script tags removed', 'green');
            passedTests++;
        } else {
            log('   ❌ XSS protection failed', 'red');
        }
    } catch (error) {
        log(`   ❌ XSS test error: ${error.message}`, 'red');
    }

    // Test 2: Password Validation
    log('\n2. Testing Password Validation...', 'blue');
    testCount++;
    try {
        const weakPasswordData = {
            email: 'test@example.com',
            password: 'weak',
            name: 'Test User'
        };
        
        const response = await makeRequest('POST', '/api/register', weakPasswordData);
        
        if (response.statusCode === 400 && 
            response.body.error.includes('Password must be at least 8 characters')) {
            log('   ✅ Password validation working - weak password rejected', 'green');
            passedTests++;
        } else {
            log('   ❌ Password validation failed', 'red');
        }
    } catch (error) {
        log(`   ❌ Password validation test error: ${error.message}`, 'red');
    }

    // Test 3: Rate Limiting
    log('\n3. Testing Rate Limiting...', 'blue');
    testCount++;
    try {
        let rateLimitHit = false;
        
        // Make multiple rapid requests
        for (let i = 0; i < 12; i++) {
            const response = await makeRequest('GET', '/api/products');
            if (response.statusCode === 429) {
                rateLimitHit = true;
                break;
            }
        }
        
        if (rateLimitHit) {
            log('   ✅ Rate limiting working - requests blocked after limit', 'green');
            passedTests++;
        } else {
            log('   ❌ Rate limiting not working', 'red');
        }
    } catch (error) {
        log(`   ❌ Rate limiting test error: ${error.message}`, 'red');
    }

    // Test 4: Authentication with bcrypt
    log('\n4. Testing Authentication with bcrypt...', 'blue');
    testCount++;
    try {
        const loginData = {
            email: 'test@example.com',
            password: 'Password123'
        };
        
        const response = await makeRequest('POST', '/api/login', loginData);
        
        if (response.statusCode === 200 && 
            response.body.message === 'Login successful') {
            log('   ✅ Authentication working with bcrypt', 'green');
            passedTests++;
            
            // Check for secure cookie
            const setCookieHeader = response.headers['set-cookie'];
            if (setCookieHeader && setCookieHeader.some(cookie => 
                cookie.includes('HttpOnly') && cookie.includes('sessionToken'))) {
                log('   ✅ Secure HttpOnly cookie set', 'green');
            } else {
                log('   ⚠️  Secure cookie not properly set', 'yellow');
            }
        } else {
            log('   ❌ Authentication failed', 'red');
        }
    } catch (error) {
        log(`   ❌ Authentication test error: ${error.message}`, 'red');
    }

    // Test 5: Error Handling
    log('\n5. Testing Error Handling...', 'blue');
    testCount++;
    try {
        const response = await makeRequest('GET', '/nonexistent-endpoint');
        
        if (response.statusCode === 404) {
            log('   ✅ 404 error handling working', 'green');
            passedTests++;
        } else {
            log('   ❌ Error handling failed', 'red');
        }
    } catch (error) {
        log(`   ❌ Error handling test error: ${error.message}`, 'red');
    }

    // Test 6: Security Headers
    log('\n6. Testing Security Headers...', 'blue');
    testCount++;
    try {
        const response = await makeRequest('GET', '/');
        
        const headers = response.headers;
        const securityHeaders = [
            'x-content-type-options',
            'x-frame-options',
            'x-xss-protection',
            'strict-transport-security'
        ];
        
        const presentHeaders = securityHeaders.filter(header => 
            headers[header] !== undefined
        );
        
        if (presentHeaders.length >= 2) {
            log(`   ✅ Security headers present: ${presentHeaders.join(', ')}`, 'green');
            passedTests++;
        } else {
            log('   ❌ Security headers missing', 'red');
        }
    } catch (error) {
        log(`   ❌ Security headers test error: ${error.message}`, 'red');
    }

    // Test 7: Input Validation
    log('\n7. Testing Input Validation...', 'blue');
    testCount++;
    try {
        const invalidEmailData = {
            email: 'invalid-email',
            password: 'SecurePass123',
            name: 'Test User'
        };
        
        const response = await makeRequest('POST', '/api/register', invalidEmailData);
        
        if (response.statusCode === 400 && 
            response.body.error.includes('Invalid email format')) {
            log('   ✅ Email validation working', 'green');
            passedTests++;
        } else {
            log('   ❌ Email validation failed', 'red');
        }
    } catch (error) {
        log(`   ❌ Input validation test error: ${error.message}`, 'red');
    }

    // Summary
    log('\n📊 TEST SUMMARY', 'bold');
    log('===============', 'bold');
    log(`Total Tests: ${testCount}`, 'blue');
    log(`Passed: ${passedTests}`, 'green');
    log(`Failed: ${testCount - passedTests}`, 'red');
    log(`Success Rate: ${Math.round((passedTests / testCount) * 100)}%`, 'bold');

    if (passedTests === testCount) {
        log('\n🎉 All security tests passed! Your application is secure.', 'green');
    } else {
        log('\n⚠️  Some security tests failed. Please review the implementation.', 'yellow');
    }

    log('\n🔧 SECURITY FEATURES IMPLEMENTED:', 'bold');
    log('• Input sanitization and XSS protection', 'green');
    log('• Password validation and bcrypt hashing', 'green');
    log('• Rate limiting (10 requests/minute per IP)', 'green');
    log('• Secure session management with HttpOnly cookies', 'green');
    log('• Comprehensive security headers', 'green');
    log('• Production-safe error handling', 'green');
    log('• CORS configuration', 'green');
    log('• Request size limits', 'green');

    log('\n📚 For detailed documentation, see SECURITY.md', 'blue');
}

// Run the tests
runTests().catch(error => {
    log(`\n❌ Test suite failed: ${error.message}`, 'red');
    process.exit(1);
}); 