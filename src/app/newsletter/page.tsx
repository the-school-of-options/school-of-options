'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon, 
  ClockIcon, 
  ChartBarIcon,
  TrendingUpIcon,
  BellIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

export default function NewsletterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    interests: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Newsletter signup:', formData);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', experience: '', interests: [] });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleInterestChange = (interest: string) => {
    const updatedInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest];
    
    setFormData({
      ...formData,
      interests: updatedInterests
    });
  };

  const newsletterFeatures = [
    {
      icon: ChartBarIcon,
      title: 'Daily Market Levels',
      description: 'Key support and resistance levels for Nifty and Bank Nifty'
    },
    {
      icon: TrendingUpIcon,
      title: 'Market Analysis',
      description: 'Professional insights on market trends and volatility'
    },
    {
      icon: BellIcon,
      title: 'Trade Alerts',
      description: 'Important market events and trading opportunities'
    }
  ];

  const sampleContent = [
    {
      date: 'Dec 20, 2024',
      subject: 'Nifty at Key Resistance - Strategy for Today',
      preview: 'Nifty testing 24,500 resistance. Bank Nifty showing strength. Here\'s your strategy for today...'
    },
    {
      date: 'Dec 19, 2024',
      subject: 'Volatility Spike Expected - Prepare Your Positions',
      preview: 'VIX rising ahead of weekly expiry. Recommended adjustments to your options positions...'
    },
    {
      date: 'Dec 18, 2024',
      subject: 'Weekly Outlook: Range-bound Market Expected',
      preview: 'Technical analysis suggests sideways movement. Best strategies for range-bound markets...'
    }
  ];

  const interests = [
    'Daily Market Levels',
    'Options Strategies',
    'Volatility Analysis',
    'Technical Analysis',
    'Risk Management',
    'Trading Psychology'
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      content: 'The daily newsletter has become an essential part of my trading routine. The market levels are incredibly accurate.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      content: 'I love how complex market analysis is explained in simple terms. Perfect for busy professionals like me.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Business Owner',
      content: 'The trade alerts have helped me avoid major losses and capture profitable opportunities. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Start Your Day with
                <br />
                <span className="text-green">Market Intelligence</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join 50,000+ traders who start their day with our free newsletter. 
                Get daily market levels, insights, and trading strategies delivered at 8:30 AM.
              </p>
              
              <div className="flex items-center mb-8 text-gray-300">
                <ClockIcon className="h-6 w-6 text-green mr-3" />
                <span className="text-lg">Delivered daily at 8:30 AM IST</span>
              </div>
              
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-green mb-2">50,000+</div>
                  <div className="text-gray-300">Subscribers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green mb-2">Daily</div>
                  <div className="text-gray-300">Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green mb-2">Free</div>
                  <div className="text-gray-300">Forever</div>
                </div>
              </div>
            </div>
            
            <div className="bg-navy-light rounded-2xl p-8">
              <div className="text-center mb-6">
                <EnvelopeIcon className="h-16 w-16 text-green mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Subscribe Now</h2>
                <p className="text-gray-300">Join the community of successful traders</p>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white text-navy rounded-lg focus:ring-2 focus:ring-green"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white text-navy rounded-lg focus:ring-2 focus:ring-green"
                      placeholder="Your Email Address"
                    />
                  </div>
                  
                  <div>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white text-navy rounded-lg focus:ring-2 focus:ring-green"
                    >
                      <option value="">Trading Experience</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="advanced">Advanced (3+ years)</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="btn-primary w-full text-lg py-4">
                    Subscribe to Newsletter
                  </button>
                  
                  <p className="text-sm text-gray-300 text-center">
                    No spam. Unsubscribe anytime. Your email is safe with us.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green mb-2">Welcome Aboard!</h3>
                  <p className="text-gray-300 mb-4">
                    You&apos;ll receive your first newsletter tomorrow at 8:30 AM.
                  </p>
                  <p className="text-sm text-gray-400">
                    Check your email for a confirmation message.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              What You&apos;ll Get Every Morning
            </h2>
            <p className="text-xl text-gray-600">
              Professional-grade market intelligence delivered to your inbox
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsletterFeatures.map((feature) => (
              <div key={feature.title} className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Recent Newsletter Samples
            </h2>
            <p className="text-xl text-gray-600">
              See what our subscribers receive every morning
            </p>
          </div>

          <div className="space-y-6">
            {sampleContent.map((content) => (
              <div key={content.date} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-green font-semibold">{content.date}</span>
                  <span className="text-sm text-gray-500">8:30 AM IST</span>
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-3">{content.subject}</h3>
                <p className="text-gray-600">{content.preview}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-green font-semibold hover:text-green-dark">
                    Read Full Newsletter →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              What Our Subscribers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.content}&quot;
                </blockquote>
                
                <div>
                  <div className="font-bold text-navy">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-16 bg-navy text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Trading Community
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Connect with thousands of traders, share insights, and learn together
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-navy-light rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Telegram Channel</h3>
              <p className="text-gray-300 mb-4">
                Real-time market updates and community discussions
              </p>
              <button className="btn-primary w-full">
                Join Telegram
              </button>
            </div>
            
            <div className="bg-navy-light rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">WhatsApp Group</h3>
              <p className="text-gray-300 mb-4">
                Direct access to support and quick market alerts
              </p>
              <button className="btn-primary w-full">
                Join WhatsApp
              </button>
            </div>
          </div>
          
          <p className="text-gray-300">
            Already have 15,000+ active members sharing knowledge and insights daily
          </p>
        </div>
      </section>
    </div>
  );
}
