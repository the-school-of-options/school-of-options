import { StarIcon } from '@heroicons/react/24/solid';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      location: 'Bangalore',
      content: 'I was losing money consistently in options for 2 years. After joining the mentorship program, I finally understood the mechanics. Now I have a systematic approach and consistent profits.',
      result: '₹2.5L profit in 6 months',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      location: 'Mumbai',
      content: 'The 3-step approach of Teaching, Training, and Mentorship is brilliant. Kundan sir\'s personalized guidance helped me build confidence and develop my own trading style.',
      result: 'From losses to 15% monthly returns',
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Amit Patel',
      role: 'Business Owner',
      location: 'Ahmedabad',
      content: 'Best investment I made for my trading career. The backtesting tools and automation setup alone are worth the program fee. The mentorship is invaluable.',
      result: 'Automated profitable strategies',
      image: '/api/placeholder/60/60'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our students transformed their trading journey from consistent losses to profitable strategies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-gray-50 rounded-2xl p-8 h-full">
              {/* Author at top */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-navy">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.location}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 italic leading-relaxed h-fit">
                &quot;{testimonial.content}&quot;
              </p>
              
              {/* Result Highlight */}
            
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Join over 2,00,000+ learners who have transformed their trading with our guidance
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div>⭐ 4.9/5 Rating</div>
            <div>📈 85% Success Rate</div>
            <div>🏆 Industry Leading</div>
          </div>
        </div>
      </div>
    </section>
  );
}
