export default function IronySection() {
  return (
    <section className="py-6 sm:py-8 lg:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-3 sm:mb-4">
            The Great Options Paradox
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0 font-semibold">
            A striking contradiction that reveals the gap between knowledge and application
          </p>
        </div>
        
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-6 lg:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 lg:gap-8 items-stretch mb-3 sm:mb-4 md:mb-5">
            <div className="text-center md:text-left flex flex-col justify-between">
              <div className="flex flex-col items-center md:items-start">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-50 rounded-full mb-3 md:mb-4">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-red-500">90%</div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-navy mb-2 md:mb-3">Traders Lose Money</h3>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-semibold flex-grow">
                Despite countless resources and strategies available, the vast majority of options traders consistently lose money in the markets.
              </p>
            </div>
            
            <div className="text-center md:text-right flex flex-col justify-between">
              <div className="flex flex-col items-center md:items-end">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full mb-3 md:mb-4">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-accent">3</div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-navy mb-2 md:mb-3">Nobel Prize Winners</h3>
              </div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-semibold flex-grow">
                Three brilliant economists won the Nobel Prize for mathematically decoding options pricing and risk management.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
                         <div className="relative flex justify-center">
                               <span className="bg-white px-8 py-3 text-accent text-xl md:text-2xl lg:text-3xl font-bold shadow-lg rounded-full">The Gap</span>
             </div>
          </div>
          
          <div className="mt-5 md:mt-6 lg:mt-8 text-center">
            <div className="bg-navy rounded-2xl p-4 md:p-6 lg:p-8">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3">
                The School of Options Bridges This Gap
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto font-semibold">
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
