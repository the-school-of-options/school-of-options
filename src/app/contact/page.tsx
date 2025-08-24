'use client';

import { useState } from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'WhatsApp Support',
      description: 'Get instant responses to your queries',
      contact: '+91 98765 43210',
      action: 'Chat Now',
      color: 'bg-green-500'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email Support',
      description: 'For detailed queries and support',
      contact: 'support@schoolofoptions.com',
      action: 'Send Email',
      color: 'bg-blue-500'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+91 11 4567 8901',
      action: 'Call Now',
      color: 'bg-purple-500'
    }
  ];

  const offices = [
    {
      city: 'Gurgaon',
      address: 'Sector 44, Gurgaon, Haryana 122003',
      type: 'Head Office',
      timing: 'Mon-Fri: 9:00 AM - 6:00 PM'
    },
    {
      city: 'Gaya',
      address: 'Civil Lines, Gaya, Bihar 823001',
      type: 'Regional Office',
      timing: 'Mon-Fri: 10:00 AM - 5:00 PM'
    }
  ];

  const faqs = [
    {
      question: 'How do I get refunds for the mentorship program?',
      answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied with the program quality. After 7 days, no refunds are provided.'
    },
    {
      question: 'When do new cohorts start?',
      answer: 'New cohorts start every month. The next cohort begins on January 15, 2025. Limited seats available.'
    },
    {
      question: 'What is the program fee?',
      answer: 'The complete 6-month mentorship program is priced at ₹35,000, which includes live classes, recordings, tools, and personal mentorship.'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'While we don\'t provide job placement, our program focuses on making you a successful independent trader with consistent profits.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-green">Touch</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Have questions about our programs? Need support? We&apos;re here to help you succeed in your options trading journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">24/7</div>
              <div className="text-gray-300">WhatsApp Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">&lt;2 hrs</div>
              <div className="text-gray-300">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green mb-2">2 Cities</div>
              <div className="text-gray-300">Office Locations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method) => (
              <div key={method.title} className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="font-semibold text-navy mb-4">{method.contact}</p>
                
                <button className="btn-primary w-full">
                  {method.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-navy mb-6">Send us a Message</h2>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-navy mb-2">Subject</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option value="mentorship">Mentorship Program</option>
                        <option value="refund">Refund Query</option>
                        <option value="technical">Technical Support</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button type="submit" className="btn-primary w-full text-lg py-4">
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green mb-2">Message Sent!</h3>
                  <p className="text-gray-600">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-navy mb-6">Our Offices</h2>
                
                <div className="space-y-6">
                  {offices.map((office) => (
                    <div key={office.city} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex items-start mb-4">
                        <MapPinIcon className="h-6 w-6 text-green mr-3 mt-1" />
                        <div>
                          <h3 className="text-xl font-bold text-navy">{office.city}</h3>
                          <p className="text-green font-semibold">{office.type}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{office.address}</p>
                      
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="h-5 w-5 mr-2" />
                        <span>{office.timing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-green mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Still have questions? We&apos;re here to help!
            </p>
            <button className="btn-primary px-8 py-3">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
