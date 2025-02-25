import { Link, Navigate, Route, Routes } from "react-router-dom";
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
import { ProtectedRoutes } from "./ProtectedRoutes";
import { UserRole } from "../types/UserRole";
import { setLogin } from "../redux/slices/auth";
import { useEffect } from "react";


export const AppRouter = () => {
  const total = useAppSelector((state) => state.cart.totalCount);
  const isLogged = useAppSelector((state) => state.auth.isLogged);

  const dispatch = useAppDispatch();

  
  //Utilizamos useEffect para recuperar el estado de la sesion, con local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("rol") as UserRole;

    if (storedUser && ["ADMIN", "OPERADOR", "VISOR"].includes(storedRole)) {
        dispatch(setLogin({ user: storedUser, rol: storedRole }));
    }
  }, [dispatch]);
  
  return (
    <>
      {/* <NavbarCrud />
      <div className="container">
        <div className="d-flex py-4">
        <Link className="btn btn-info mx-2" to="/">
            Inicio
          </Link>
          <Link className="btn btn-info mx-2" to="/donde-estamos">
            Donde Estamos
          </Link>
          <Link className="btn btn-info mx-2" to="/productos">
            Productos
          </Link>
          <Link className="btn btn-info mx-2" to="/home">
            Grilla de Instrumentos
          </Link>
          <div className="ms-auto">
            <Link className="btn btn-primary position-relative" to="/cart"> <span className="material-symbols-outlined m-1 mt-0">shopping_cart</span>
              Carrito
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {isNaN(total) ? 0 : total}{" "}
                
                <span className="visually-hidden">products in cart</span>
              </span>
            </Link>
          </div>
        </div>
        <hr /> */}
        {/* <Routes> */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addInstrument" element={<AddInstrument />} />
          <Route path="/editInstrument/:id" element={<EditInstrument />} />
          <Route path="/detalle/:id" element={<DetalleInstrumento />} /> */}
          {/* <Route path="/cart" element={<Cart />} /> */}
          {/* {<Route path="/donde-estamos" element={<GoogleMaps />} />
          <Route path="/cart" element={<CartMP />} />
          <Route path="/productos" element={<ScreenInstrumentos />} />} */}
{/* 
        </Routes>  */}

        {/* <Routes> */}

          {/* Redirigir al login si no está autenticado */}
          {/* {!isLogged && <Route path="/*" element={<Navigate to="/login" />} />} */}

          {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/home" element={<Home />} />
          <Route path="/donde-estamos" element={<GoogleMaps />} />
          <Route path="/cart" element={<CartMP />} />
          <Route path="/productos" element={<ScreenInstrumentos />} />
          <Route path="/detalle/:id" element={<DetalleInstrumento />} /> */}
          
          {/* Rutas protegidas */}
          {/* <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'OPERADOR']} />}>
            <Route path="/addInstrument" element={<AddInstrument />} />
            <Route path="/editInstrument/:id" element={<EditInstrument />} />
          </Route>
        </Routes> */}
        
        <Routes>
          {isLogged
            ? <Route path="/*" element={<ProtectedRoutes/>}/>
            : <Route path="/*" element={<Login/>}/>
          }
          <Route path="/login" element={<Login />}/>
        </Routes>
    </>
  );
};

