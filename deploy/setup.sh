#!/bin/bash
set -e
# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
# PM2
sudo npm install -g pm2
# Nginx
sudo apt-get install -y nginx
# Clone repo
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://YOUR_GITHUB_TOKEN@github.com/unknwstudio/wannabe.git
cd wannabe
# Install and build
sudo npm install
sudo npm run build
# Start with PM2
sudo pm2 start npm --name "wannabe" -- start
sudo pm2 save
sudo pm2 startup
# Copy nginx config
sudo cp /var/www/wannabe/deploy/nginx.conf /etc/nginx/sites-available/wannabe
sudo ln -s /etc/nginx/sites-available/wannabe /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
echo "Deploy complete. Site running at http://80.242.57.219"
