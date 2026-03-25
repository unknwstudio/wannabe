#!/bin/bash
set -e
cd /var/www/wannabe
git pull
npm install
npm run build
pm2 restart wannabe
echo "Redeployed successfully"
