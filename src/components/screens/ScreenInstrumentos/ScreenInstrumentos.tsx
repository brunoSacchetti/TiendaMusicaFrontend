import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductoInstrumento } from "../ProductoInstrumento/ProductoInstrumento";
import { Instrument } from "../../../types/Instrument";
import axios from "axios";
import { useEffect, useState } from "react";

export const ScreenInstrumentos = () => {
  //const user = useAppSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //declaramos el useState
  const [instrumentos, setInstrumentos] = useState<Instrument[]>([]);

  //utilizamos useEffect
  useEffect(() => {
    axios.get("http://localhost:8080/api/instrumentos/all").then((response) => {
        setInstrumentos(response.data);
    });
  }, []);

  return (
    <>
      <ProductoInstrumento instrumentos={instrumentos} />
    </>
  );
};
