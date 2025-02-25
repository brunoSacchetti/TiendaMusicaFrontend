import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export const NavbarCrud = () => {
  return (
    <>
    <Navbar expand="lg" className="bg-primary">
      <Container fluid className="justify-content-center justify-content-lg-between">
        <Navbar.Brand className="text-white d-flex align-items-center" href="#" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}> 
        <span className="material-symbols-outlined m-2">home</span>
        INSTRUMENTOS - CRUD - CARRITO DE COMPRA
        </Navbar.Brand>
        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll />
        <Link to="/addInstrument" className="btn btn-outline-light">Añadir Instrumento</Link>
      </Container>
    </Navbar>
    </>
  )
}