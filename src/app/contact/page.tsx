'use client';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

export default function ContactPage() {

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
      color: 'bg-navy'
    },
    {
      icon: PhoneIcon,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+91 11 4567 8901',
      action: 'Call Now',
      color: 'bg-accent'
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
    <div>
      {/* Hero Section - Enhanced Responsiveness */}
      <section className="bg-gradient-to-br from-navy to-navy-dark text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
            Get in <span className="text-accent">Touch</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 sm:px-0 font-semibold">
            Have questions about our programs? Need support? We&apos;re here to help you succeed in your options trading journey.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">24/7</div>
              <div className="text-gray-300 text-sm sm:text-base font-semibold">WhatsApp Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-1 sm:mb-2">&lt;2 hrs</div>
              <div className="text-gray-300 text-sm sm:text-base font-semibold">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods - Enhanced Responsiveness */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4 sm:mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0 font-semibold">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {contactMethods.map((method) => (
              <div key={method.title} className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                  <method.icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-navy mb-2 sm:mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base font-semibold">{method.description}</p>
                <p className="font-semibold text-navy mb-3 sm:mb-4 text-sm sm:text-base">{method.contact}</p>
                
                <button className="btn-primary w-full text-sm sm:text-base">
                  {method.action}
                </button>
              </div>
            ))}
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
            <p className="text-xl text-gray-600 font-semibold">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-3">{faq.question}</h3>
                    <p className="text-gray-600 font-semibold">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4 font-semibold">
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
