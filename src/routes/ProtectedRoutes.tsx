import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NavbarCrud } from "../components/ui/NavBarCrud/NavBarCrud";
import { Home } from "../components/screens/Home/Home";
import { AddInstrument } from "../components/screens/Instrumentos/AddInstruments";
import { EditInstrument } from "../components/screens/Instrumentos/EditInstrument";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { Cart } from "../components/screens/Cart/Cart";
import { ScreenInstrumentos } from "../components/screens/ScreenInstrumentos/ScreenInstrumentos";
import { CartMP } from "../components/screens/Cart/CartMP";
import { Login } from "../components/screens/Login/Login";
import { Inicio } from "../components/screens/Inicio/Inicio";
import { GoogleMaps } from "../components/screens/DondeEstamos/GoogleMaps";
import { DetalleInstrumento } from "../components/screens/DetalleInstrumento/DetalleInstrumento";
import ProtectedRoute from "../components/screens/ProtectedRoutes/ProtectedRoutes";
import { setLogin, setLogout } from "../redux/slices/auth";
import { Charts } from "../components/screens/Graficos/Charts";
import { ReportePedidos } from "../components/screens/Pedidos/ReportePedidos";


export const ProtectedRoutes = () => {
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const total = useAppSelector((state) => state.cart.totalCount);

  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(setLogout());
    localStorage.removeItem("user");
    localStorage.removeItem("rol");
    navigate("/login");
  };
  
  return (
    <>
      <NavbarCrud />
      <div className="container">
        <div className="d-flex py-4">
        <Link className="btn" to="/" style={{backgroundColor: "lightgray"}}>
            Inicio
          </Link>
          <Link className="btn btn-info mx-2" to="/donde-estamos">
            Donde Estamos
          </Link>
          <Link className="btn btn-info mx-1" to="/productos">
            Productos
          </Link>
          <Link className="btn btn-info mx-1" to="/grilla-instrumentos">
            Grilla de Instrumentos
          </Link>
          <Link className="btn btn-warning mx-1" to="/bar-chart">
            Graficos
          </Link>
          <Link className="btn btn-success mx-1" to="/reporte-pedidos">
            Pedidos
          </Link>
          <div className="ms-auto">
            <Link className="btn btn-primary position-relative" style={{marginRight: "220px"}} to="/cart"> <span className="material-symbols-outlined m-1 mt-0">shopping_cart</span>
              Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {isNaN(total) ? 0 : total}{" "}
                
                <span className="visually-hidden">products in cart</span>
              </span>
            </Link>
          </div>
          
          <div className="ms-auto d-flex align-items-center">
            {isLogged && (
              <>
                <span className="me-3"><span className="material-symbols-outlined">person</span>Usuario: <b>{user}</b></span>
                <button className="btn btn-success" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
        <hr />
        {/* <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/addInstrument" element={<AddInstrument />} />
          <Route path="/editInstrument/:id" element={<EditInstrument />} /> */}
          {/* <Route path="/viewInstrument/:id" /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* <Route path="/cart" element={<CartMP />} />
          <Route path="/productos" element={<ScreenInstrumentos />} /> */}

        {/* </Routes> */}

        <Routes>

          {/* Redirigir al login si no está autenticado */}
          {!isLogged && <Route path="/*" element={<Navigate to="/login" />} />}

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/donde-estamos" element={<GoogleMaps />} />
          <Route path="/cart" element={<CartMP />} />
          <Route path="/productos" element={<ScreenInstrumentos />} />
          <Route path="/detalle/:id" element={<DetalleInstrumento />} />
          
          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'OPERADOR']} />}>
            <Route path="/addInstrument" element={<AddInstrument />} />
            <Route path="/editInstrument/:id" element={<EditInstrument />} />
            <Route path="/grilla-instrumentos" element={<Home />} />
            <Route path="/bar-chart" element={<Charts />} />
            <Route path="/reporte-pedidos" element={<ReportePedidos />} />
          </Route>
        </Routes>

      </div>
    </>
  );
};
