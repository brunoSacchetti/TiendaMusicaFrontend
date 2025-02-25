import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";

interface ReportePedidos {
  numeroPedido: number;
  fecha_pedido: string;
  instrumento: string;
  marca: string;
  modelo: string;
  cantidad: number;
  precio: number;
  subtotal: number;
}

export const ReportePedidos = () => {
  const [reportData, setReportData] = useState<ReportePedidos[]>([]);

  // Para filtrar por fecha el reporte
  const [fechaDesde, setFechaDesde] = useState<string>("");
  const [fechaHasta, setFechaHasta] = useState<string>("");

  const[fechaLimiteMin, setFechaLimiteMin] = useState<string>("")
  const[fechaLimiteMax, setFechaLimiteMax] = useState<string>("")



  // Función para cargar datos sin filtros
  const fetchAllReportData = async () => {
    try {
      setFechaDesde("");
      setFechaHasta("");
      const response = await axios.get("http://localhost:8080/api/all/reporte-pedidos");
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching all report data:", error);
    }
  };

  // Función para cargar datos con filtros de fecha
  const fetchFilteredReportData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/reporte-pedidos?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`, {
        params: {
          fechaDesde,
          fechaHasta,
        },
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching filtered report data:", error);
    }
  };

  //Obtenemos las fechas limites para generar el excel con todas las fechas
  // Obtiene las fechas límites y las establece en el estado
const fetchFechasLimites = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/pedidos/limite-fechas`);
    const { fechaMinima, fechaMaxima } = response.data;

    // Convertir las cadenas de fecha al formato deseado (yyyy-MM-dd)
    const fechaMinimaFormateada = fechaMinima.split("T")[0];
    const fechaMaximaFormateada = fechaMaxima.split("T")[0];

    // Establecer las fechas límites en el estado
    setFechaLimiteMin(fechaMinimaFormateada);
    setFechaLimiteMax(fechaMaximaFormateada);
    console.log(fechaLimiteMin);
    console.log(fechaLimiteMax);
  } catch (error) {
    console.error("Error al obtener las fechas límites:", error);
  }
};


  //Handle para manejar el archivo creacion de Excel

const handleGenerateExcel = async () => {
  try {

    const fechaDesdeFiltro = fechaDesde || fechaLimiteMin; // Supón que 'fecha_minima' es el valor mínimo posible en tu conjunto de datos
    const fechaHastaFiltro = fechaHasta || fechaLimiteMax;

    const response = await axios.get(`http://localhost:8080/api/generate-excel-report`, {
      params: {
        fechaDesde: fechaDesdeFiltro,
        fechaHasta: fechaHastaFiltro,
      },
      responseType: 'blob', // la respuesta en formato binario
    });

    
    const url = window.URL.createObjectURL(new Blob([response.data]));

    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reporte_pedidos_instrumentos.xlsx');
    document.body.appendChild(link);
    link.click();

    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al generar el reporte en formato .xlsx:", error);

  }
};

  useEffect(() => {
    fetchAllReportData();
    fetchFechasLimites();
  }, []);

  return (
    <div className="container">
      <h2>Reporte de Pedidos</h2>
      <Form className="mb-4">
        <Form.Group controlId="fechaDesde">
          <Form.Label>Fecha Desde</Form.Label>
          <Form.Control
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="fechaHasta">
          <Form.Label>Fecha Hasta</Form.Label>
          <Form.Control
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" onClick={fetchFilteredReportData}>
          Filtrar
        </Button>
        <Button className="mt-2 ms-2" variant="secondary" onClick={fetchAllReportData}>
          Reset
        </Button>
        <Button className="mt-2 ms-2" variant="success" onClick={handleGenerateExcel}>
          Generar Excel
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Número de Pedido</th>
            <th>Fecha Pedido</th>
            <th>Instrumento</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.numeroPedido}</td>
              <td>{pedido.fecha_pedido}</td>
              <td>{pedido.instrumento}</td>
              <td>{pedido.marca}</td>
              <td>{pedido.modelo}</td>
              <td>{pedido.cantidad}</td>
              <td>{pedido.precio}</td>
              <td>{pedido.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
