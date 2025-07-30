const companyLogosMap = import.meta.glob(
  "../assets/companies/*.{png,svg,jpg,jpeg}",
  {
    eager: true,
    as: "url",
  }
);

const companyOrder = [
  "uoft.png",
  "stanford.png",
  "epfl.png",
  "campus_biotech.png",
  "nus.png",
  "cove_neurosciences.png",
];

const companyLogos = companyOrder.map(
  (name) => companyLogosMap[`../assets/companies/${name}`]
);

const InstitutionGrid = () => {
  return (
    <section className="w-full pt-24 px-4 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl pl-17 mb-8 text-left">I have worked at:</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-60 gap-y-20 justify-items-center items-center">
          {companyLogos.map((src, idx) => (
            <div
              key={idx}
              className="h-40 w-50 object-contain flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Company logo ${idx}`}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-120"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstitutionGrid;
