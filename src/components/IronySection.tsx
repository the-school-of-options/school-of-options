export default function IronySection() {
  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6">
            The Great Options Paradox
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            A striking contradiction that reveals the gap between knowledge and application
          </p>
        </div>
        
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-8 sm:mb-12">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-red-50 rounded-full mb-6">
                <div className="text-3xl lg:text-4xl font-bold text-red-500">90%</div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Traders Lose Money</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Despite countless resources and strategies available, the vast majority of options traders consistently lose money in the markets.
              </p>
            </div>
            
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-accent/10 rounded-full mb-6">
                <div className="text-3xl lg:text-4xl font-bold text-accent">3</div>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Nobel Prize Winners</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Three brilliant economists won the Nobel Prize for mathematically decoding options pricing and risk management.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-6 py-2 text-accent font-semibold">The Gap</span>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-navy rounded-2xl p-8 lg:p-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                The School of Options Bridges This Gap
              </h3>
              <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                We transform Nobel Prize-winning complexity into practical, systematic education. 
                Our mission is to provide the missing link between theoretical knowledge and profitable trading reality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
