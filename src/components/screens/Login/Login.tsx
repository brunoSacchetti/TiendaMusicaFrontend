import { Button, Form } from "react-bootstrap";
import styles from "./Login.module.css"
import { FormEvent, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import axios from "axios";
import { LoginRequest } from "../../../types/Post/LoginRequest";
import { useAppDispatch } from "../../../hooks/redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../redux/slices/auth";
import { Usuario } from "../../../types/Usuario";

export const Login = () => {
    
    const [showPass, setShowPass] = useState(false);
    
    //para capturar el error
    const [error, setError] = useState<string | null>(null);

    const {values, handleChange} = useForm({
        user: "",
        password: ""
    })

    const {user, password} = values;

    /* const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user, password); 
    } */

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
          const loginRequest: LoginRequest = { user, password };
          console.log(loginRequest);
      
          const response = await axios.post("http://localhost:8080/usuarios/api/login", loginRequest  /* { usuario: user, password } */);
          const rol = response.data;
          // Guarda el rol del usuario en localStorage o en el estado de tu aplicación

          //Guardamos el usuario en LocalStorage
          localStorage.setItem("user", user);
          localStorage.setItem("rol", rol);

          dispatch(setLogin({user, rol}));
          navigate("/")

          console.log("Rol del usuario:", rol);
        } catch (error) {
          console.error("Error de autenticación:", error);
          setError("Usuario y/o Clave incorrectos, vuelva a intentar");
        }
    };

    return (
    <div className={styles.containerLogin}>
    <div className={styles.containerForm}>
      <span style={{fontSize: "10vh"}}className="material-symbols-outlined">account_circle</span>
      <Form onSubmit={handleSubmitForm}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Usuario</Form.Label>
          <Form.Control onChange={handleChange} name="user" value={user} type="text" placeholder="Usuario" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={handleChange}
            type= {showPass ? "text" : "password"}
            placeholder="Contraseña"
          />
        </Form.Group>
        <Form.Check // prettier-ignore
          type="switch"
          id="custom-switch"
          onChange={() => {
            setShowPass(!showPass);
        }}
          label="Mostrar Contraseña"
        />
        {error && <div className="text-danger mt-3">{error}</div>}
        <div className="d-flex justify-content-center align-items-center mt-2">
          <Button type="submit" variant="primary">Ingresar</Button>
        </div>
      </Form>
      </div>
    </div>
  );
};
