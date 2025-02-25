import { useDispatch } from "react-redux";
import { removeProductFromCart, resetCart } from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import axios from "axios";

export const Cart = () => {
    const dispatch = useDispatch();
    const { productsList } = useAppSelector(state => state.cart);
  
    const handleRemoveInstrument = (instrumentId: number) => {
        dispatch(removeProductFromCart(instrumentId))
    };
    
    
    const handleSaveCart = async () => {
      // Asumiendo que cada producto se agrega con cantidad = 1
      const detalles = productsList.map(instrumento => ({
          cantidad: 1, // cantidad fija para simplificar
          instrumento: {
              id: instrumento.id, // solo enviamos el ID al backend
              // otros detalles del instrumento no se envían, el backend debe recuperarlos
          }
      }));

      try {
          const response = await axios.post('http://localhost:8080/api/pedidos', detalles);
          alert(`El pedido con id ${response.data.id} se guardó correctamente`); 
          dispatch(resetCart());
      } catch (error) {
          console.error('Error al guardar el pedido:', error);
          alert('Hubo un error al guardar el pedido.');
      }
  };

    return (
      <>
        <h2>Carrito de Instrumentos</h2>
        <button className="btn btn-primary mb-3" onClick={handleSaveCart}>Guardar Carrito</button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoría</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(instrumento => {
              return (
                <tr key={instrumento.id}>
                  <th scope="row">{instrumento.id}</th>
                  <td>{instrumento.instrumento}</td>
                  <td>${instrumento.precio}</td>
                  <td>{instrumento.categoria.denominacion}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleRemoveInstrument(instrumento.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
}