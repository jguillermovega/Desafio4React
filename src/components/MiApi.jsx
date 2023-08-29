import { useState, useEffect } from "react";

const MiApi = () => {
    const [paises, setPaises] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const obtenerDatos = async () => {
        const url = "https://restcountries.com/v3.1/all";
        const response = await fetch(url);
        const json = await response.json();
        const jsonOrdenado = json.sort((a, b) => 
            a.name.common.localeCompare(b.name.common));
        setPaises(jsonOrdenado);
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

    const filtrarPaises = (p) => {
        return p.name.common.toLowerCase().includes(busqueda.toLowerCase());
    }


    return(
        <>
        <div>
        <h1>Países del Mundo</h1>
        <h2>Busca algún país por su nombre:</h2>
        <input
            id="busqueda"
            type="text"
            placeholder="Ingrese el nombre del país"
            className="form-control"
            value={busqueda}
            onChange={(e) => {
                setBusqueda(e.target.value);
            }}
        />
        </div>

        {paises.filter(filtrarPaises).map((p, index) => (
        <div key={index}>
            <h3>País: {p.name.common}</h3>
            <p>Capital: {p.capital}</p>
            <p>Continente: {p.continents}</p>
            <p>Población: {p.population} personas</p>
        </div>
        ))}
        </>
    );
};

export default MiApi;