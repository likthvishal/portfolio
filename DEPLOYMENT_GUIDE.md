# Portfolio Website Deployment Guide

## Prerequisites
- Domain purchased from Namecheap ✅
- Firebase account
- Firebase CLI installed

## Step 1: Update Firebase Configuration

Your `.firebaserc` currently has the old project name. You'll need to either:
- Use an existing Firebase project, OR
- Create a new Firebase project

## Step 2: Build Your React App

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Step 3: Deploy to Firebase

```bash
firebase login
firebase init (if not already done)
firebase deploy --only hosting
```

## Step 4: Connect Your Namecheap Domain to Firebase

### In Firebase Console:
1. Go to Firebase Console → Your Project → Hosting
2. Click "Add custom domain"
3. Enter your domain name
4. Firebase will provide you with DNS records

### In Namecheap:
1. Log into your Namecheap account
2. Go to Domain List → Manage your domain
3. Go to "Advanced DNS" tab
4. Add these DNS records that Firebase provides:
   - **Type: A Record**
     - Host: @
     - Value: Firebase IP address
   - **Type: A Record** 
     - Host: @
     - Value: Firebase IP address (2nd one)
   - **Type: TXT Record**
     - Host: @
     - Value: Your Firebase verification code

Wait for DNS propagation (can take 24-48 hours, usually much faster).

## Alternative Quick Start with Vercel (Easier)

If you prefer a simpler approach:

### Using Vercel:
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your GitHub repository
4. Vercel will automatically build and deploy
5. Add your custom domain in Vercel dashboard
6. Update Namecheap DNS to point to Vercel

### Vercel DNS Configuration:
In Namecheap Advanced DNS:
- Add CNAME record: www → cname.vercel-dns.com
- Add A record: @ → 76.76.21.21 (Vercel's IP)

This is typically faster and easier than Firebase for React apps.

