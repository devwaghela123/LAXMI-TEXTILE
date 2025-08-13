#!/bin/bash

echo "🚀 Deploying Laxmi Textile Website to Production"
echo "=================================================="

# Check if running as root (recommended for production)
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  Warning: Not running as root. Some operations may fail."
    echo "   Consider running with sudo for production deployment."
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo "📦 Installing dependencies..."

# Install dependencies
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Install PM2 globally if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 process manager..."
    npm install -g pm2
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install PM2"
        exit 1
    fi
    echo "✅ PM2 installed successfully"
else
    echo "✅ PM2 is already installed"
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Set production environment
export NODE_ENV=production

echo "🔧 Starting application in production mode..."

# Start the application with PM2
pm2 start ecosystem.config.js --env production

if [ $? -eq 0 ]; then
    echo "✅ Application started successfully in production mode"
    
    # Save PM2 configuration
    pm2 save
    
    # Setup PM2 to start on system boot
    pm2 startup
    
    echo ""
    echo "🎉 Deployment complete!"
    echo ""
    echo "📊 Application Status:"
    pm2 status
    echo ""
    echo "📝 Useful Commands:"
    echo "   pm2 status                    # Check application status"
    echo "   pm2 logs                      # View application logs"
    echo "   pm2 restart laxmi-textile-website  # Restart application"
    echo "   pm2 stop laxmi-textile-website     # Stop application"
    echo "   pm2 delete laxmi-textile-website  # Remove from PM2"
    echo ""
    echo "🌐 Your website should now be accessible at your configured domain"
    echo "💚 Health check available at: /health"
    echo ""
    echo "⚠️  IMPORTANT: Update the PRODUCTION_DOMAIN in ecosystem.config.js"
    echo "   to match your actual domain before going live!"
    
else
    echo "❌ Failed to start application"
    exit 1
fi 