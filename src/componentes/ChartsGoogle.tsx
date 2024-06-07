import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import Navigation from "./Navigation.tsx";
import {  getDatosChartPieFetch } from "../services/ApiServicio.ts";

export const optionsLine = {
    title: "Compras Vs Ventas",
    curveType: "function",
    legend: { position: "bottom" },
};

export const optionsPie = {
    title: "Cantidad de Articulos Venta",
};

function ChartsGoogle() {

    //const [datosChartLine, setDatosChartLine] = useState<any>();
    const [datosChartPie, setDatosChartPie] = useState<any>();

    //const getLineChart =  async () => {
    //    const datosBackend = await getDatosChartLineFetch();
    //    console.log(datosBackend);
    //    setDatosChartLine(datosBackend);
    //}

    const getPieChart =  async () => {
        const datosBackend = await getDatosChartPieFetch();
        console.log(datosBackend);
        setDatosChartPie(datosBackend);
    }

    useEffect(() => {
        //getLineChart();
        getPieChart();
    }, []);


    return (
        <>
            <Navigation></Navigation>
            <Chart
                chartType="LineChart"
                //data={datosChartLine}
                options={optionsLine}
                width="100%"
                height="400px"
            />
            <Chart
                chartType="PieChart"
                data={datosChartPie}
                options={optionsPie}
                width={"100%"}
                height={"400px"}
            />
        </>
    )
}

export default ChartsGoogle