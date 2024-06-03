import { ChangeEventHandler} from "react";

export interface Instrumento {
    id: string;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: string;
    addCarrito?:ChangeEventHandler;
}

export interface CarritoInstrumento {
    id: string;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: string;
    cartQuantity: number;
    cartAmount: number;
}

export interface InstrumentoCreateUpdate {
    id: string;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: number;
    costoEnvio: string;
    cantidadVendida: number;
    descripcion: string;
    categoria: string;
}
