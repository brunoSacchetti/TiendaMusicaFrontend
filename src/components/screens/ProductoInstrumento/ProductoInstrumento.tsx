import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import { Instrument } from "../../../types/Instrument";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

/* interface IProducts {
  id: number;
  name: string;
  price: string;
  category: string;
} */

interface ProductListProps {
  instrumentos: Instrument[];
}

export const ProductoInstrumento: React.FC<ProductListProps> = ({
  instrumentos,
}) => {
  const dispatch = useDispatch();

  const { productsList } = useAppSelector((state) => state.cart);

  const handleAddOrRemoveProduct = (product: Instrument) => {
    // Verifica si el producto ya está en el carrito
    if (productsList.find((pdt) => pdt.id === product.id)) {
      dispatch(removeProductFromCart(product.id)); // Asume que esta acción existe y está correctamente definida
    } else {
      dispatch(addProductToCart(product));
    }
  };

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrument | null>(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const handleVerDetalle = (instrumento: Instrument) => {
    setInstrumentoSeleccionado(instrumento);
  };

  const handleVolver = () => {
    setInstrumentoSeleccionado(null); // Limpiar el instrumento seleccionado cuando se vuelve a la lista de productos
  };

  /* return (
    <>
      <h2>Listado de Instrumentos</h2>
      <div className="row">
        {instrumentos.map((inst) => {
          const isInCart = productsList.some((pdt) => pdt.id === inst.id); // Comprueba si el producto está en el carrito
          return (
            <div key={inst.id} className="col-3 mt-3">
              <div className="card">
                <img
                  src={inst.imagen}
                  alt={inst.instrumento}
                  className="card-img-top"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h4 className="card-title">{inst.instrumento}</h4>
                  <p className="card-text">
                    <b>Precio:</b> {inst.precio}
                  </p>
                  <p className="card-text">
                    <b>Categoria:</b> {inst.categoria.denominacion}
                  </p>
                  <button
                    className={`btn ${isInCart ? "btn-danger" : "btn-success"}`}
                    onClick={() => handleAddOrRemoveProduct(inst)}
                  >
                    {isInCart ? "Remove" : "Add"} to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  ); */

  /* return (
    <>
      <h2>Listado de Instrumentos</h2>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {instrumentos.map((inst) => {
          const isInCart = productsList.some((pdt) => pdt.id === inst.id); // Comprueba si el producto está en el carrito
          return (
            <Card key={inst.id} className="m-auto mb-4 instrument-card" style={{ width: "30%" }}>
              <Row>
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  <Card.Img
                    src={inst.imagen}
                    alt={inst.instrumento}
                    className="instrument-image"
                    style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "contain" }}
                  />
                </Col>
                <Col md={8}>
                  <ListGroup.Item className="m-md-3">
                      {inst.cantidadVendida} unidades vendidas
                  </ListGroup.Item>
                  <Card.Body>
                    <Card.Title>{inst.instrumento}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item style={{ fontWeight: "bold", fontSize: "30px" }}>
                      ${inst.precio}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontWeight: "bold", fontSize: "15px" }}>
                      Marca: {inst.marca}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontWeight: "bold", fontSize: "15px" }}>
                      Modelo: {inst.modelo}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ fontWeight: "bold", fontSize: "15px" }}>
                      {inst.descripcion}
                    </ListGroup.Item>
                    <ListGroup.Item style={{ color: inst.costoEnvio === "G" ? "green" : "orange" }}>
                    <span className="material-symbols-outlined mt-1">local_shipping</span>
                      {inst.costoEnvio === "G" ? "Envío gratis a todo el país" : "Costo de envío interior de Argentina: $" + inst.costoEnvio}
                    </ListGroup.Item>
                    
                    <Button
                      className={`btn ${isInCart ? "btn-danger" : "btn-success"}`}
                      onClick={() => handleAddOrRemoveProduct(inst)}
                    >
                      {isInCart ? "Remove" : "Add"} to Cart
                    </Button>
                  </ListGroup>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </>
  );
   */
  return (
    <>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        Instrumentos - Listado de Productos
      </h2>
      <div className="d-flex justify-content-center">
        <div style={{ width: "900px", maxWidth: "1000px" }}>
          {" "}
          {/* Ajusta el ancho máximo según tu preferencia */}
          {instrumentos.map((inst) => {
            const isInCart = productsList.some((pdt) => pdt.id === inst.id); // Comprueba si el producto está en el carrito
            return (
              <Card key={inst.id} className="m-auto mb-4 instrument-card">
                <Row>
                  <Col
                    md={4}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <div
                      style={{
                        maxHeight: "200px",
                        maxWidth: "200px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={inst.imagen}
                        alt={inst.instrumento}
                        className="instrument-image"
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={8}>
                    <ListGroup.Item className="m-md-3">
                      {inst.cantidadVendida} unidades vendidas
                    </ListGroup.Item>
                    <Card.Body>
                      <Card.Title style={{ fontSize: "35px" }}>
                        {inst.instrumento}
                      </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item
                        style={{ fontWeight: "bold", fontSize: "25px" }}
                      >
                        ${inst.precio}
                      </ListGroup.Item>
                      <ListGroup.Item
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        Marca: {inst.marca}
                      </ListGroup.Item>
                      <ListGroup.Item
                        style={{ fontWeight: "bold", fontSize: "15px" }}
                      >
                        Modelo: {inst.modelo}
                      </ListGroup.Item>
                      <ListGroup.Item style={{ fontSize: "15px" }}>
                        Descripcion: {inst.descripcion}
                      </ListGroup.Item>
                      <ListGroup.Item
                        style={{
                          color: inst.costoEnvio === "G" ? "green" : "orange",
                        }}
                      >
                        <span className="material-symbols-outlined mt-1">
                          local_shipping
                        </span>
                        {inst.costoEnvio === "G" /* || inst.costoEnvio === "0" */
                          ? "Envío gratis a todo el país"
                          : "Costo de envío interior de Argentina: $" +
                            inst.costoEnvio}
                      </ListGroup.Item>

                      <Button
                        className={`btn ${
                          isInCart ? "btn-danger" : "btn-success"
                        } `}
                        style={{ width: "30%", margin: "10px" }}
                        onClick={() => handleAddOrRemoveProduct(inst)}
                      >
                        {isInCart ? "Remove" : "Add"} to Cart
                      </Button>
                      <Link to={`/detalle/${inst.id}`}>
                        <Button
                          className="btn btn-primary"
                          style={{ width: "30%", margin: "10px" }}
                        >
                          Ver Detalle
                        </Button>
                      </Link>
                    </ListGroup>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
