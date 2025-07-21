import { Job, User, JobSeeker, Employer, JobCategory } from '../types';

// WhatsApp Integration Types
export interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  type: 'text' | 'template' | 'interactive' | 'media';
  content: string;
  timestamp: Date;
  metadata?: {
    jobId?: string;
    userId?: string;
    intent?: string;
    location?: string;
    skill?: string;
  };
}

export interface WhatsAppBotFlow {
  id: string;
  name: string;
  trigger: string;
  steps: BotStep[];
  isActive: boolean;
}

export interface BotStep {
  id: string;
  type: 'message' | 'question' | 'action' | 'condition';
  content: string;
  options?: string[];
  nextStep?: string;
  action?: 'create_job' | 'show_jobs' | 'collect_info' | 'prompt_coins';
}

export interface WhatsAppJobApplication {
  id: string;
  jobId: string;
  candidatePhone: string;
  candidateName: string;
  candidateAge?: number;
  candidateSkills?: string[];
  candidateArea?: string;
  status: 'pending' | 'sent' | 'viewed' | 'contacted' | 'hired';
  messageContent: string;
  timestamp: Date;
  coinsUsed?: number;
}

export interface WhatsAppBroadcastChannel {
  id: string;
  name: string;
  description: string;
  city: string;
  skill: JobCategory;
  memberCount: number;
  isVerified: boolean;
  adminPhone: string;
  coinCost: number;
  isActive: boolean;
}

export interface WhatsAppVerifiedProfile {
  userId: string;
  phone: string;
  isVerified: boolean;
  verificationDate: Date;
  hasVideoIntro: boolean;
  hasVoiceMessage: boolean;
  videoIntroUrl?: string;
  voiceMessageUrl?: string;
}

// WhatsApp Integration Service
export class WhatsAppIntegration {
  private apiProvider: 'gupshup' | 'twilio' | 'wati' | 'zoko';
  private apiKey: string;
  private webhookUrl: string;

  constructor(provider: 'gupshup' | 'twilio' | 'wati' | 'zoko', apiKey: string, webhookUrl: string) {
    this.apiProvider = provider;
    this.apiKey = apiKey;
    this.webhookUrl = webhookUrl;
  }

  /**
   * Generate WhatsApp application message for a job
   */
  generateJobApplicationMessage(job: Job, candidate: JobSeeker): string {
    const skills = candidate.skills.join(', ');
    const area = `${candidate.location.city}, ${candidate.location.state}`;
    
    return `Hi! I'm interested in your job posting for a ${job.title} in ${job.location.city}. Here are my details:

👤 Name: ${candidate.name}
📅 Age: ${candidate.age || 'Not specified'}
🛠️ Skills: ${skills}
📍 Area: ${area}
📱 Phone: ${candidate.phone}

I'm available for ${candidate.availability} and have ${candidate.experience} experience in this field.

Please let me know if you'd like to discuss this opportunity further!`;
  }

  /**
   * Send WhatsApp job application
   */
  async sendJobApplication(job: Job, candidate: JobSeeker, employerPhone: string): Promise<WhatsAppJobApplication> {
    const message = this.generateJobApplicationMessage(job, candidate);
    
    const application: WhatsAppJobApplication = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: job.id,
      candidatePhone: candidate.phone,
      candidateName: candidate.name,
      candidateAge: candidate.age,
      candidateSkills: candidate.skills,
      candidateArea: `${candidate.location.city}, ${candidate.location.state}`,
      status: 'sent',
      messageContent: message,
      timestamp: new Date()
    };

    // Mock API call to send WhatsApp message
    await this.sendWhatsAppMessage(employerPhone, message);
    
    return application;
  }

  /**
   * Smart bot with role detection
   */
  async handleBotMessage(userMessage: string, userPhone: string): Promise<string> {
    const intent = this.detectIntent(userMessage);
    
    if (intent.type === 'job_seeker') {
      return this.handleJobSeekerFlow(intent, userPhone);
    } else if (intent.type === 'employer') {
      return this.handleEmployerFlow(intent, userPhone);
    } else {
      return this.handleGeneralFlow(userMessage, userPhone);
    }
  }

  /**
   * Detect user intent from message
   */
  private detectIntent(message: string): { type: 'job_seeker' | 'employer' | 'general'; location?: string; skill?: string } {
    const lowerMessage = message.toLowerCase();
    
    // Job seeker keywords
    const jobSeekerKeywords = ['looking for job', 'need work', 'want job', 'searching job', 'apply for job'];
    const isJobSeeker = jobSeekerKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Employer keywords
    const employerKeywords = ['hire', 'need worker', 'want to hire', 'looking for worker', 'need staff'];
    const isEmployer = employerKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Extract location
    const locationMatch = message.match(/(?:in|at|near)\s+([A-Za-z\s]+)/i);
    const location = locationMatch ? locationMatch[1].trim() : undefined;
    
    // Extract skill
    const skillMatch = message.match(/(?:as|for)\s+([A-Za-z\s]+)/i);
    const skill = skillMatch ? skillMatch[1].trim() : undefined;
    
    if (isJobSeeker) {
      return { type: 'job_seeker', location, skill };
    } else if (isEmployer) {
      return { type: 'employer', location, skill };
    } else {
      return { type: 'general', location, skill };
    }
  }

  /**
   * Handle job seeker bot flow
   */
  private async handleJobSeekerFlow(intent: any, userPhone: string): Promise<string> {
    const { location, skill } = intent;
    
    if (location && skill) {
      // Show curated jobs
      const jobs = await this.getCuratedJobs(location, skill);
      const jobList = jobs.slice(0, 3).map(job => 
        `🏢 ${job.title}\n📍 ${job.location.city}\n💰 ${this.formatSalary(job.compensation)}\n📱 Apply: ${job.id}`
      ).join('\n\n');
      
      return `Here are some ${skill} jobs in ${location}:\n\n${jobList}\n\n💡 For more jobs and to save your preferences, download our app: https://spothire.app/download\n\n🎯 You can also earn coins by referring friends!`;
    } else {
      return `Hi! I can help you find jobs. Please tell me:\n\n📍 What city are you looking in?\n🛠️ What type of work are you looking for?\n\nFor example: "I'm looking for a job as a driver in Mumbai"`;
    }
  }

  /**
   * Handle employer bot flow
   */
  private async handleEmployerFlow(intent: any, userPhone: string): Promise<string> {
    const { location, skill } = intent;
    
    if (location && skill) {
      return `Great! I can help you hire ${skill} workers in ${location}.\n\nTo create a job posting, I need a few details:\n\n📝 Job title:\n💰 Salary range:\n📅 Job type (full-time/part-time):\n📞 Contact number:\n\nOr you can create a detailed posting in our app: https://spothire.app/employer`;
    } else {
      return `Hi! I can help you hire workers. Please tell me:\n\n👥 How many workers do you need?\n🛠️ What type of work?\n📍 In which city?\n\nFor example: "I want to hire 2 cooks in Noida"`;
    }
  }

  /**
   * Handle general bot flow
   */
  private handleGeneralFlow(message: string, userPhone: string): string {
    return `Hi! Welcome to Spot Hire! 🎉\n\nI can help you:\n\n🔍 Find jobs in your area\n👥 Hire workers for your business\n💰 Earn coins by referring friends\n\nWhat would you like to do?\n\n💡 Download our app for the best experience: https://spothire.app/download`;
  }

  /**
   * Automated lead qualification with coin prompt
   */
  async promptForCoins(employerPhone: string, candidatePhone: string, jobId: string): Promise<void> {
    const message = `💎 To unlock full contact details for this candidate, please use 5 SPOT coins.\n\nThis will give you:\n📞 Direct phone number\n📱 WhatsApp contact\n📍 Exact location\n👤 Complete profile\n\n💳 Buy coins: https://spothire.app/coins\n🎁 New users get 10 free coins!`;
    
    await this.sendWhatsAppMessage(employerPhone, message);
  }

  /**
   * Create WhatsApp broadcast channel
   */
  async createBroadcastChannel(
    name: string,
    city: string,
    skill: JobCategory,
    adminPhone: string,
    coinCost: number = 5
  ): Promise<WhatsAppBroadcastChannel> {
    const channel: WhatsAppBroadcastChannel = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description: `${skill} jobs in ${city}`,
      city,
      skill,
      memberCount: 0,
      isVerified: false,
      adminPhone,
      coinCost,
      isActive: true
    };

    // Mock API call to create WhatsApp group
    await this.createWhatsAppGroup(channel);
    
    return channel;
  }

  /**
   * Send job to broadcast channel
   */
  async sendJobToChannel(job: Job, channel: WhatsAppBroadcastChannel): Promise<void> {
    const message = `🏢 NEW JOB POSTING\n\n📋 ${job.title}\n📍 ${job.location.city}, ${job.location.state}\n💰 ${this.formatSalary(job.compensation)}\n📅 ${job.type}\n\n📞 Contact: ${job.employer.maskedBusinessName}\n\n💡 Apply via WhatsApp or download our app for more details!`;
    
    await this.sendWhatsAppMessage(channel.adminPhone, message);
  }

  /**
   * Verify user profile via WhatsApp
   */
  async verifyProfile(userPhone: string, userId: string): Promise<WhatsAppVerifiedProfile> {
    const verificationCode = Math.random().toString().substr(2, 6);
    
    const message = `🔐 Spot Hire Verification\n\nYour verification code is: ${verificationCode}\n\nEnter this code in the app to get your verified badge! ✅\n\nThis helps employers trust your profile.`;
    
    await this.sendWhatsAppMessage(userPhone, message);
    
    const verifiedProfile: WhatsAppVerifiedProfile = {
      userId,
      phone: userPhone,
      isVerified: true,
      verificationDate: new Date(),
      hasVideoIntro: false,
      hasVoiceMessage: false
    };
    
    return verifiedProfile;
  }

  /**
   * Send personalized assistant messages
   */
  async sendPersonalizedMessage(userPhone: string, messageType: 'job_reminder' | 'coin_earned' | 'profile_viewed'): Promise<void> {
    let message = '';
    
    switch (messageType) {
      case 'job_reminder':
        message = `Hey! 👋 You applied for 2 jobs yesterday. Here's a new one that might interest you:\n\n🏢 Delivery Partner\n📍 Near your area\n💰 ₹15,000/month\n\n💡 Check it out: https://spothire.app/jobs`;
        break;
      case 'coin_earned':
        message = `🎉 Congratulations! You've earned 3 coins from referrals!\n\n💰 Current balance: 8 coins\n💎 Use them to unlock job contacts\n\n🎁 Refer more friends to earn more coins!`;
        break;
      case 'profile_viewed':
        message = `👀 Your profile has been viewed by 2 employers!\n\n💡 Make it stronger by:\n✅ Adding a profile photo\n✅ Completing your skills\n✅ Adding work experience\n\nThis increases your chances of getting hired!`;
        break;
    }
    
    await this.sendWhatsAppMessage(userPhone, message);
  }

  /**
   * Send daily job digest
   */
  async sendDailyJobDigest(userPhone: string, city: string, jobs: Job[]): Promise<void> {
    const topJobs = jobs.slice(0, 5);
    const jobList = topJobs.map(job => 
      `🏢 ${job.title}\n📍 ${job.location.city}\n💰 ${this.formatSalary(job.compensation)}`
    ).join('\n\n');
    
    const message = `📰 Daily Job Digest - ${city}\n\n${jobList}\n\n📱 View all jobs: https://spothire.app/jobs/${city}\n💡 Set up alerts for your preferred jobs!`;
    
    await this.sendWhatsAppMessage(userPhone, message);
  }

  // Helper methods
  private async sendWhatsAppMessage(to: string, message: string): Promise<void> {
    // Mock API call - replace with actual WhatsApp API
    console.log(`Sending WhatsApp message to ${to}: ${message}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async createWhatsAppGroup(channel: WhatsAppBroadcastChannel): Promise<void> {
    // Mock API call - replace with actual WhatsApp API
    console.log(`Creating WhatsApp group: ${channel.name}`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private async getCuratedJobs(location: string, skill: string): Promise<Job[]> {
    // Mock API call - replace with actual job search
    return [];
  }

  private formatSalary(compensation: Job['compensation']): string {
    if (compensation.type === 'negotiable') {
      return 'Salary negotiable';
    }
    if (compensation.min && compensation.max) {
      return `₹${compensation.min.toLocaleString()} - ₹${compensation.max.toLocaleString()}`;
    }
    if (compensation.min) {
      return `₹${compensation.min.toLocaleString()}+`;
    }
    return 'Salary not specified';
  }
}

// Export singleton instance
export const whatsappIntegration = new WhatsAppIntegration('gupshup', 'mock-api-key', 'https://spothire.app/webhook'); 