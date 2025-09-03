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
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6 md:mb-8">
            Real Stories, Real Results
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 font-semibold">
            See how our students transformed their trading journey from consistent losses to profitable strategies
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20 group">
              {/* Author at top */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-navy rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-base">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-navy text-sm sm:text-base">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600 font-semibold">
                    {testimonial.role}, {testimonial.location}
                  </div>
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed flex-grow text-sm sm:text-base font-semibold">
                &quot;{testimonial.content}&quot;
              </p>
              
              {/* Result Highlight */}
              <div className="bg-accent/15 rounded-lg p-3 sm:p-4 mt-auto border border-accent/20">
                <div className="text-navy font-bold text-sm sm:text-base">
                  {testimonial.result}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6 px-4 sm:px-0 font-semibold">
            Join over 2,00,000+ learners who have transformed their trading with our guidance
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 font-semibold">
            <div className="flex items-center">⭐ 4.9/5 Rating</div>
            <div className="flex items-center">📈 85% Success Rate</div>
            <div className="flex items-center">🏆 Industry Leading</div>
          </div>
        </div>
      </div>
    </section>
  );
}
