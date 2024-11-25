
export const Service = () => {
  // Hardcoded services data
  const services = [
    {
      service: "Web Development",
      description: "Crafting tailor-made websites and web applications for diverse needs.",
      price: "$1,500 - $7,000",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d3d"
    },
    {
      service: "E-commerce Website Development",
      description: "Building powerful e-commerce websites for seamless online shopping experiences.",
      price: "$2,000 - $8,000",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d3e"
    },
    {
      service: "Responsive Web Design",
      description: "Creating visually stunning and responsive designs for all devices.",
      price: "$1,200 - $6,000",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d3f"
    },
    {
      service: "Mobile App Development",
      description: "Developing innovative and user-friendly mobile applications for various platforms.",
      price: "$2,500 - $10,000",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d40"
    },
    {
      service: "WordPress Website Development",
      description: "Building dynamic websites using the WordPress platform tailored to your needs.",
      price: "$1,300 - $5,500",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d41"
    },
    {
      service: "UI/UX Design Services",
      description: "Crafting intuitive and user-centric UI/UX designs for enhanced user experiences.",
      price: "$1,800 - $7,500",
      provider: "Tech Solutions Inc.",
      _id: "6742c12325b86a782a520d42"
    }
  ];

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services && services.length > 0 ? (
          services.map((curElem) => {
            return (
              <div className="card" key={curElem._id}>
                <div className="card-img">
                  <img src="/images/design.png" alt="service" width="200" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{curElem.provider}</p>
                    <p>{curElem.price}</p>
                  </div>
                  <h2>{curElem.service}</h2>
                  <p>{curElem.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No services available...</p>
        )}
      </div>
    </section>
  );
};
