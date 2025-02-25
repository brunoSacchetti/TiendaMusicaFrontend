import { Carousel } from "react-bootstrap";

export const Inicio = () => {
  return (
    <>
    <div className="menu">
      <h1 style={{textAlign:'center',color:'blue', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontFamily: 'Times New Roman, serif', fontSize: '4rem' }}>MUSICAL HENDRIX</h1>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/t1.jpg"
                alt="First slide"
                style={{ width: "2000px", height: "650px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/t2.jpg"
                alt="Second slide"
                style={{ width: "2000px", height: "650px" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex justify-content-center align-items-center">
            <div className="bg-gray">
              <img
                className="d-block mx-auto"
                src="img/t3.jpg"
                alt="Third slide"
                style={{ width: "2000px", height: "650px" }}
              />
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      <p style={{textAlign:'center', fontSize:'30px', margin:'30px', fontFamily: "Times New Roman"}}>
      Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
      experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
      mejores elecciones para tu compra musical.
      </p>
      </div>
    </>
  );
};