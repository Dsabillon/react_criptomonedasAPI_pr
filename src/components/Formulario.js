import React, { useEffect, useState } from "react";
import Error from "./Error";
import styled from "@emotion/styled";
import axios from "axios";

//Custom Hooks
import useMoneda from "../hooks/useMoneda";
import useCriptomonedas from "../hooks/useCriptomonedas";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #326ac0;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #66a2fe;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda }) => {
  //StatesFormulario
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //States de CustomHooks
  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);
  const [criptomoneda, SelectCripto] = useCriptomonedas(
    "Elige tu criptomoneda",
    "",
    listacripto
  );

  useEffect(() => {
    const consultaAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };

    consultaAPI();
  }, []);

  //SubmitFunc
  const cotizarMoneda = (e) => {
    e.preventDefault();

    //Validar
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }
    guardarError(false);
    //Pasar los datos al componente principal
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
