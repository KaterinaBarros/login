import { Bounce, toast } from "react-toastify";
import PreferenceMP from "../models/mercadopago/PreferenceMP";

const urlBase = 'http://localhost:8080/api';

export async function getData<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${urlBase}/${path}`);
    if (!response.ok) {
      toast.error('Ocurrio un error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function postData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${urlBase}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      toast.error('Ocurrio un error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    return Promise.reject(error);
  }
}

export async function createPreferenceMP(pedido?: any){
    let urlServer = 'http://localhost:8080/api/Preference';
	let method:string = "POST";
    const response = await fetch(urlServer, {
	  "method": method,
	  "body": JSON.stringify(pedido),
	  "headers": {
		"Content-Type": 'application/json'
	  }
	});
    return await response.json() as PreferenceMP;   
}   

export async function putData<T>(path: string, data: T): Promise<T> {
  try {
    const response = await fetch(`${urlBase}/${path}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error('Ocurrio un error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      throw Error(response.statusText);
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function deleteData(path: string) {
  try {
    const response = await fetch(`${urlBase}/${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error('Ocurrio un error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      throw Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}

