# 🚀 Deployment Guide - Laxmi Textile Website

## ✅ Pre-Deployment Checklist

### 1. **Domain Configuration**
- [ ] Update `PRODUCTION_DOMAIN` in `ecosystem.config.js` to your actual domain
- [ ] Ensure DNS is properly configured
- [ ] SSL certificate is installed (HTTPS required for production)

### 2. **Environment Setup**
- [ ] Server has Node.js 14+ installed
- [ ] Server has sufficient memory (recommended: 1GB+)
- [ ] Port 3000 is available and not blocked by firewall
- [ ] Server has internet access for npm install

### 3. **Security Considerations**
- [ ] Firewall rules configured
- [ ] SSH access secured
- [ ] Regular security updates enabled
- [ ] Database credentials secured (if applicable)

## 🚀 Quick Deployment

### Option 1: Automated Deployment
```bash
# Make script executable (if not already)
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

### Option 2: Manual Deployment
```bash
# Install dependencies
npm install

# Install PM2 globally
npm install -g pm2

# Create logs directory
mkdir -p logs

# Start in production mode
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Setup auto-start on boot
pm2 startup
```

## 📊 Post-Deployment Verification

### 1. **Check Application Status**
```bash
pm2 status
pm2 logs
```

### 2. **Test Endpoints**
- [ ] Homepage loads: `https://yourdomain.com/`
- [ ] Health check: `https://yourdomain.com/health`
- [ ] Products page: `https://yourdomain.com/products`
- [ ] Static assets load properly

### 3. **Performance Check**
- [ ] Page load times are acceptable
- [ ] No console errors in browser
- [ ] Mobile responsiveness works
- [ ] Images load correctly

## 🔧 Maintenance Commands

### PM2 Process Management
```bash
# Check status
npm run pm2:status

# View logs
npm run pm2:logs

# Restart application
npm run pm2:restart

# Stop application
npm run pm2:stop

# Start application
npm run pm2:start
```

### Application Updates
```bash
# Pull latest code
git pull origin main

# Install new dependencies
npm install

# Restart application
npm run pm2:restart
```

## 🚨 Troubleshooting

### Common Issues

#### 1. **Port Already in Use**
```bash
# Check what's using port 3000
lsof -i :3000

# Kill process if needed
kill -9 <PID>
```

#### 2. **Permission Denied**
```bash
# Run with sudo if needed
sudo ./deploy.sh
```

#### 3. **PM2 Not Found**
```bash
# Install PM2 globally
npm install -g pm2
```

#### 4. **Application Won't Start**
```bash
# Check logs
pm2 logs

# Check status
pm2 status

# Restart with fresh config
pm2 delete laxmi-textile-website
pm2 start ecosystem.config.js --env production
```

## 📈 Monitoring & Scaling

### 1. **PM2 Monitoring Dashboard**
```bash
# Open PM2 monitoring
pm2 monit
```

### 2. **Log Management**
- Logs are stored in `./logs/` directory
- Consider log rotation for production
- Monitor error logs for issues

### 3. **Performance Monitoring**
- Monitor memory usage: `pm2 monit`
- Check response times
- Monitor error rates

## 🔒 Security Best Practices

### 1. **Regular Updates**
- Keep Node.js updated
- Update dependencies regularly: `npm audit fix`
- Monitor security advisories

### 2. **Access Control**
- Restrict server access
- Use SSH keys instead of passwords
- Regular security audits

### 3. **Backup Strategy**
- Regular database backups (if applicable)
- Code repository backups
- Configuration backups

## 📞 Support

If you encounter issues during deployment:
1. Check the logs: `pm2 logs`
2. Verify configuration in `ecosystem.config.js`
3. Ensure all dependencies are installed
4. Check server resources and permissions

---

**🎉 Your website is now deployment ready!**

Remember to:
- Update the production domain in `ecosystem.config.js`
- Test thoroughly before going live
- Monitor performance and logs
- Keep security updates current 