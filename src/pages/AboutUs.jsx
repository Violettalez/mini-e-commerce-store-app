function AboutUs({ data }) {
  return (
    <div className="mt-10 md:px-5">
      <section className="w-full py-10 md:py-6 bg-gradient-to-r from-basic-red via-dark-red to-basic-black text-center rounded-2xl shadow-lg *:text-basic-weight">
        <h2 class="text-4xl font-bold font-header">About Us</h2>
        <p class="max-w-2xl mx-auto">
          Welcome to <span class="font-semibold">eStore</span> – your trusted
          online shop for premium and branded fashion.
        </p>
      </section>
      <div className="flex flex-row items-center justify-center gap-8 px-6 py-12">
        <div className="hidden lg:block flex-1 flex justify-center">
          <img
            src="/sport-girl.png"
            alt="sport girl"
            className="max-h-[600px] object-contain"
          />
        </div>
        <div className="lg:flex-2 max-w-4xl space-y-6">
          <div className="bg-basic-weight p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-semibold text-basic-red mb-4 font-header">
              Who We Are
            </h3>
            <p className="text-gray-700 leading-relaxed">
              At <span className="font-semibold">eStore</span>, we believe that
              style is a way to express individuality. Our online store
              specializes in{" "}
              <span className="text-basic-black font-medium">
                branded clothing and accessories{" "}
              </span>
              from world-renowned designers. We carefully select collections to
              bring you only the best in fashion, quality, and comfort.
            </p>
          </div>

          <div className="bg-dark-weight p-8 rounded-2xl shadow-inner">
            <h3 className="text-2xl font-semibold text-basic-red mb-4 font-header">
              Our Mission
            </h3>
            <p className="text-gray-800 leading-relaxed">
              We strive to make luxury fashion accessible to everyone by
              combining
              <span className="font-medium"> top-tier brands</span> with an
              effortless online shopping experience. Our mission is to help you
              feel confident and stylish, no matter the occasion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-basic-weight p-6 rounded-xl shadow-md text-center">
              <h4 className="font-semibold text-basic-red mb-2 font-header">
                Quality
              </h4>
              <p className="text-gray-600 text-sm">
                Only authentic and premium products from trusted brands.
              </p>
            </div>
            <div className="bg-basic-weight p-6 rounded-xl shadow-md text-center">
              <h4 className="font-semibold text-basic-red mb-2 font-header">
                Trust
              </h4>
              <p className="text-gray-600 text-sm">
                Transparent shopping and reliable customer service.
              </p>
            </div>
            <div className="bg-basic-weight p-6 rounded-xl shadow-md text-center">
              <h4 className="font-semibold text-basic-red mb-2 font-header">
                Style
              </h4>
              <p className="text-gray-600 text-sm">
                Fashion that reflects your unique personality and lifestyle.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block flex-1 flex justify-center">
          <img
            src="/sport-boy.png"
            alt="sport boy"
            className="max-h-[600px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
