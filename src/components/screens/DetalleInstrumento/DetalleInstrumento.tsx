import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import { Instrument } from "../../../types/Instrument";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { getIntrumentoById } from "../../../services/fetch";
import { InstrumentDto } from "../../../types/Dto/InstrumentDto";
import axios, { AxiosResponse } from "axios";

export const DetalleInstrumento = () => {
  const { id } = useParams<{ id: string }>();
  const [instrumento, setInstrumento] = useState<Instrument | null>(null);
  const dispatch = useDispatch();
  const { productsList } = useAppSelector((state) => state.cart);

  const getInstrumentoId = async () => {
    const seleccionado: Instrument = await getIntrumentoById(Number(id));
    setInstrumento(seleccionado);
  };

  useEffect(() => {
    getInstrumentoId();
  }, [id]);

  const handleAddOrRemoveProduct = (product: Instrument) => {
    if (productsList.find((pdt) => pdt.id === product.id)) {
      dispatch(removeProductFromCart(product.id));
    } else {
      dispatch(addProductToCart(product));
    }
  };

  const handleGenerarPdf = async (product: InstrumentDto) => {
    try {
      const response: AxiosResponse = await axios.post('http://localhost:8080/api/pdf/generarReporte-pdf', product, {
        responseType: 'blob', // Indicar que esperamos un blob como respuesta
      });
  
      if (response.status !== 200) {
        throw new Error('Error al generar el PDF');
      }
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      const contentDisposition = response.headers['content-disposition'];
      const fileNameMatch = contentDisposition ? contentDisposition.match(/filename="(.+)"/) : null;
      const fileName = fileNameMatch ? fileNameMatch[1] : `detalle-instrumento-${instrumento?.instrumento}.pdf`;
  
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      // Manejar el error aquí
    }
  };


  return (
    <>
      {instrumento && (
        <Card className="m-auto mb-4 mt-4 instrument-card" style={{ width: "60%" }}>
          <Row>
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <Card.Img
                src={instrumento.imagen}
                className="instrument-image"
                style={{ maxWidth: "290px" }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title style={{fontSize: "14px"}}>{instrumento.cantidadVendida} unidades vendidas</Card.Title>
                <Card.Title style={{fontSize: "35px"}}>{instrumento.instrumento}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item style={{ fontWeight: "bold", fontSize: "30px" }}>
                  ${instrumento.precio}
                </ListGroup.Item>
                <ListGroup.Item><b>Marca: </b>{instrumento.marca}</ListGroup.Item>
                <ListGroup.Item><b>Modelo: </b> {instrumento.modelo}</ListGroup.Item>
                <ListGroup.Item>Descripcion: {instrumento.descripcion}</ListGroup.Item>
                <ListGroup.Item
                        style={{
                          color: instrumento.costoEnvio === "G" ? "green" : "orange",
                        }}
                      >
                        <span className="material-symbols-outlined mt-1">
                          local_shipping
                        </span>
                        {instrumento.costoEnvio === "G"
                          ? "Envío gratis a todo el país"
                          : "Costo de envío interior de Argentina: $" +
                          instrumento.costoEnvio}
                      </ListGroup.Item>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    className={`btn ${productsList.find((pdt) => pdt.id === instrumento.id) ? "btn-danger" : "btn-success"}`}
                    style={{ width: "100px", textAlign: "center" }}
                    onClick={() => handleAddOrRemoveProduct(instrumento)}
                  >
                    {productsList.find((pdt) => pdt.id === instrumento.id) ? "Remove" : "Add"} to Cart
                  </Button>
                  
              <Button
              className="btn"
              style={{ 
                width: "100px", 
                height: "6vh", 
                textAlign: "center", 
                marginTop: "12px", 
                marginRight: "6px", 
                backgroundColor: "#ff6600", // Cambia el color de fondo a un rojo más suave
                border: "none", // Quita el borde del botón
                borderRadius: "4px", // Opcional: agrega un borde redondeado
              }}
              onClick={() => handleGenerarPdf({
                id: instrumento.id,
                instrumento: instrumento.instrumento,
                marca: instrumento.marca,
                modelo: instrumento.modelo,
                imagen: instrumento.imagen,
                precio: instrumento.precio,
                costoEnvio: instrumento.costoEnvio,
                cantidadVendida: instrumento.cantidadVendida,
                descripcion: instrumento.descripcion,
              })}              
            >
              Generar PDF
              </Button>
              
                  <Link to="/productos">
                    <Button
                      className="btn"
                      style={{ width: "100px", height: "4vh", textAlign: "center", marginTop: "12px", marginRight: "6px", backgroundColor: "slateblue" }}
                    >
                      Volver
                    </Button>
                  </Link>
                </div>
              </ListGroup>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};
