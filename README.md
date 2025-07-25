# Spot Hire - Find Local Jobs & Hire Staff

A comprehensive job marketplace platform focused on blue-collar jobs, connecting local businesses with job seekers across India.

## 🚀 Features

### For Job Seekers
- **Free Job Browsing**: Search and view all job details completely free
- **Coin-based Contact System**: Pay only when you want to contact employers (2-5 coins per contact)
- **Smart Search**: Advanced filtering by location, category, salary, and job type
- **Real-time Applications**: Track application status in real-time
- **Profile Management**: Create detailed profiles with skills and experience

### For Employers
- **Easy Job Posting**: Simple, intuitive job posting process
- **Application Management**: View and manage applications efficiently
- **Contact Protection**: Business information protected until genuine interest
- **Verified Listings**: All job posts are verified for quality

### Core Features
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Offline Support**: Basic functionality works even when offline
- **Real-time Notifications**: Instant updates on applications and messages
- **Secure Payments**: Integrated payment system for coin purchases
- **Multi-language Support**: English and Hindi support (expandable)

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **State Management**: React Context API
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Email/Password + Google OAuth)
- **Payments**: Razorpay Integration
- **Deployment**: Netlify/Vercel Ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/spothire.git
cd spothire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Fill in your Firebase and other service credentials. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed setup instructions.

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄 Database Setup

The application uses Firebase Firestore as the backend. Follow the [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) guide to set up your Firebase project and database.

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('employer', 'jobseeker')),
  phone TEXT NOT NULL,
  location JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT FALSE,
  coins INTEGER DEFAULT 0
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL,
  location JSONB NOT NULL,
  compensation JSONB NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  employer_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'active',
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  contact_cost INTEGER DEFAULT 3
);
```

### Applications Table
```sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  jobseeker_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'applied',
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  message TEXT
);
```

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Payment Gateway
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

# Analytics
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Add environment variables in Vercel dashboard

## 📱 Progressive Web App (PWA)

The application is PWA-ready with:
- Offline functionality
- Install prompts
- Push notifications
- Background sync

## 🔒 Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **XSS Protection**: Content Security Policy implemented
- **CSRF Protection**: CSRF tokens for all forms
- **Rate Limiting**: API rate limiting to prevent abuse
- **Data Encryption**: All sensitive data encrypted at rest and in transit

## 🎨 Design System

The application follows a consistent design system:
- **Colors**: Blue primary, yellow accent for coins
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Components**: Reusable UI components
- **Animations**: Smooth micro-interactions

## 📊 Analytics & Monitoring

- **Google Analytics**: User behavior tracking
- **Error Monitoring**: Automatic error reporting
- **Performance Monitoring**: Core Web Vitals tracking
- **User Feedback**: In-app feedback system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@spothire.com
- **Phone**: +91-9876543210
- **Documentation**: [docs.spothire.com](https://docs.spothire.com)

## 🗺 Roadmap

### Phase 1 (Current)
- ✅ Core job marketplace functionality
- ✅ Coin-based contact system
- ✅ Responsive web application

### Phase 2 (Q2 2024)
- 📱 Mobile app (React Native)
- 🔔 Push notifications
- 💬 In-app messaging
- 📊 Advanced analytics

### Phase 3 (Q3 2024)
- 🌍 Multi-language support
- 💳 Multiple payment gateways
- 🤖 AI-powered job matching
- 📈 Employer analytics dashboard

### Phase 4 (Q4 2024)
- 🌏 International expansion
- 🎥 Video interviews
- 📱 Mobile-first features
- 🔗 API for third-party integrations

---

Made with ❤️ for India's workforce