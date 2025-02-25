import { useDispatch } from "react-redux";
import { addProductToCart, removeProductFromCart, resetCart, updateProductQuantity } from "../../../redux/slices/cartSlice";
import { useAppSelector } from "../../../hooks/redux";
import axios from "axios";
import { useState } from "react";

export const Cart = () => {
  const dispatch = useDispatch();
  const { productsList } = useAppSelector(state => state.cart);
  const [productQuantities, setProductQuantities] = useState<{ [id: number]: number }>({});

  const handleRemoveInstrument = (instrumentId: number) => {
    dispatch(removeProductFromCart(instrumentId));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setProductQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: Math.max(newQuantity, 1), // Ensure quantity is at least 1
    }));
  };

  const handleIncrementQuantity = (id: number) => {
    handleQuantityChange(id, productQuantities[id] + 1 || 1);
  };

  const handleDecrementQuantity = (id: number) => {
    handleQuantityChange(id, productQuantities[id] - 1 || 0); // Remove item if quantity reaches 0
  };

  const handleSaveCart = async () => {
    const detalles = productsList.map(instrumento => ({
      cantidad: productQuantities[instrumento.id] || 1, // Use quantity from state or default to 1
      instrumento: {
        id: instrumento.id,
      },
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
            const quantity = productQuantities[instrumento.id] || 1;

            return (
              <tr key={instrumento.id}>
                <th scope="row">{instrumento.id}</th>
                <td>{instrumento.instrumento}</td>
                <td>${instrumento.precio}</td>
                <td>{instrumento.categoria.denominacion}</td>
                <td>
                  <button className="btn btn-sm btn-primary" onClick={() => handleDecrementQuantity(instrumento.id)}>
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button className="btn btn-sm btn-primary m-2" onClick={() => handleIncrementQuantity(instrumento.id)}>
                    +
                  </button>
                  <button className="btn btn-danger" onClick={() => handleRemoveInstrument(instrumento.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
