const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Create Pet Profile",
      description:
        "Sign up and create a detailed profile for your pet including medical history and contact information.",
    },
    {
      step: "2",
      title: "Get Your QR Tag",
      description:
        "Receive QR code that attaches to your pet’s collar for easy identification.",
    },
    {
      step: "3",
      title: "Instant Connection",
      description:
        "Anyone who finds your pet can scan the QR code and instantly get your contact info to help reunite you.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-cyan-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How VetTag Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Getting started with VetTag is simple. Just follow these three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-white/50 backdrop-blur-2xl p-6 rounded-2xl shadow hover:shadow-lg transition">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full mb-4 font-bold text-lg">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
