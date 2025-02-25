import Table from "react-bootstrap/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Instrument } from "../../../types/Instrument";
import { CategoryInstrument } from "../../../types/CategoryInstrument";
import { useAppSelector } from "../../../hooks/redux";

const url = "http://localhost:8080/api/instrumentos/";

export const Home = () => {
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);
  //para poder filtrar por categoria debemos setear el estado. Será un id el que reciba
  const [filtroCategoria, setFiltroCategoria] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<CategoryInstrument[]>([]);

  //traemos el rol de redux
  const userRole = useAppSelector((state) => state.auth.rol);

  const cargarInstrumentos = async () => {
    try {
      let urlCompleta = url + "all";
      if (filtroCategoria) {
        urlCompleta += `/filter?categoriaId=${filtroCategoria}`; //controlador hecho en backend
      }
      const resultado = await axios.get(urlCompleta);
      setInstrumentos(resultado.data);
    } catch (error) {
      console.error("Error al cargar los instrumentos:", error);
    }
  };

  //traemos las categorias
  const cargarCategorias = async () => {
    try {
      const resultado = await axios.get(
        "http://localhost:8080/api/categorias/all"
      );
      setCategorias(resultado.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  const eliminarInstrumento = async (id: number) => {
    try {
      await axios.delete(url + `delete/${id}`);
      cargarInstrumentos();
    } catch (error) {
      console.error("Error al eliminar el instrumento:", error);
    }
  };

  //Cargamos tanto las categorias como instrumentos
  useEffect(() => {
    cargarInstrumentos();
    cargarCategorias();
  }, [filtroCategoria]); //Dependencias: [filtroCategoria] significa que este useEffect se ejecutará cada vez que el valor de filtroCategoria cambie.
  //Esto es útil cuando deseas reaccionar a cambios en el estado o props.
  //En tu caso, cambiar el filtro de categoría provocará una nueva carga de los instrumentos que coincidan con el nuevo filtro.

  return (
    <div className="container">
      <div className="mt-2 align-content-md-center justify-content-center d-flex">
        <label className="mt-2 align-content-center justify-content-center me-4">
          Filtrar por categoria:
        </label>
        <select
          className="form-control border-3 bg-gradient"
          value={filtroCategoria || ""}
          onChange={(e) => setFiltroCategoria(Number(e.target.value) || null)}
        >
          <option value="">Todas las Categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.denominacion}
            </option>
          ))}
        </select>
      </div>
      <div className="py-4">
        <Table striped bordered hover className="table border shadow">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Instrumento</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Precio</th>
              <th>Costo Envio</th>
              <th>Cantidad Vendida</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {instrumentos.map((instrumento, index) => (
              <tr key={index}>
                <td>{instrumento.id}</td>
                <td>
                  <img
                    src={instrumento.imagen}
                    style={{ width: "50px", height: "auto" }}
                    alt="Instrumento"
                  />
                </td>
                <td>{instrumento.instrumento}</td>
                <td>{instrumento.marca}</td>
                <td>{instrumento.modelo}</td>
                <td>{instrumento.precio}</td>
                <td>
                  {instrumento.costoEnvio === "G" ||
                  instrumento.costoEnvio === "0"
                    ? "Envio Gratis"
                    : instrumento.costoEnvio}
                </td>
                <td>{instrumento.cantidadVendida}</td>
                <td>{instrumento.descripcion}</td>
                <td>{instrumento.categoria?.denominacion}</td>
                {/* <td>
                  <Link
                    className="btn btn-success mx-2"
                    to={`/editInstrument/${instrumento.id}`}
                  >
                    Editar
                  </Link>
                  <Button
                    className="btn btn-danger mx-2"
                    onClick={() => eliminarInstrumento(instrumento.id)}
                  >
                    Eliminar
                  </Button>
                </td> */}
                <td>
                  {/* Renderizar los botones solo si el rol no es OPERADOR */}
                  {userRole !== "OPERADOR" && (
                    <>
                      <Link
                        className="btn btn-success mx-2"
                        to={`/editInstrument/${instrumento.id}`}
                      >
                        Editar
                      </Link>
                      <Button
                        className="btn btn-danger mx-2"
                        onClick={() => eliminarInstrumento(instrumento.id)}
                      >
                        Eliminar
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
