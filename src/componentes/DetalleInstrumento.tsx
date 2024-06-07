import { useParams } from "react-router-dom";
import { Instrumento } from "../models/Instrumento";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getData } from "../services/ApiServicio";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartReducer";

const DetalleInstrumento = () => {
    //--------REDUX--------
    const dispatch = useDispatch();
    //---------------------

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
    };
    const {id} = useParams();

    const [instrumento, setInstrumento] = useState<Instrumento | undefined>();

    const getInstrumentos = async () => {
        const data: Instrumento = await getData(`Instrumentos/${id}`);
        setInstrumento(data);
    }

    const generarPDF = () => {
        window.open("http://localhost:8080/api/Instrumentos/api/downloadPdfPlatos/" + id, "_blank");
    }

    useEffect(() => { getInstrumentos(); }, []);

    if (instrumento == undefined) {
        return(
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
   
    return (
        <div className="container d-flex" style={{maxWidth: '1000px', maxHeight: '750px'}}>
            <Card style={{width: '600px'}}>
                <div>
                    <Card.Img src={`/src/assets/img/${instrumento?.imagen}`} 
                    style={{ maxHeight: '400px', objectFit: 'contain'}} className="img-fluid rounded-start" />
                </div>
                <Card.Body className="text-start" style={{fontSize: '0.8em'}}>
                    <Card.Text>Descripción:</Card.Text>
                    <Card.Text>{instrumento?.descripcion}</Card.Text>
                </Card.Body>
            </Card>
            
            <Card className="text-start" style={{width: '400px'}}>
                <Card.Body>
                    <Card.Text>
                        <small className="text-muted">{instrumento?.cantidadVendida} vendidos</small>
                    </Card.Text>
                    <Card.Title className="fw-bolder">{instrumento?.instrumento}</Card.Title>
                    <Card.Text className="fs-2 fw-normal">${instrumento?.precio}</Card.Text>
                    <Card.Text className="fs-6 fw-normal mt-4">Marca: {instrumento?.marca}</Card.Text>
                    <Card.Text className="fs-6 fw-normal">Modelo: {instrumento?.modelo}</Card.Text>
                    <Card.Text className="fs-6 fw-normal mt-4">Costo de envío:</Card.Text>
                    <div className="d-flex">
                        {instrumento?.costoEnvio === "G" ? <img src={`/src/assets/img/camion.png`} /> : null}
                        <Card.Text className={instrumento?.costoEnvio === "G" ? 'text-success' : 'text-warning'}>
                            {instrumento?.costoEnvio === "G" ? "Envío gratis a todo el país" : `Costo de envío interior de Argentina $${instrumento?.costoEnvio}`}
                        </Card.Text>
                    </div>
                </Card.Body>

                <Card.Footer className="bg-transparent d-flex align-items-center justify-content-center">
                    <button className="btn btn-outline-primary" onClick={() => handleAddToCart(instrumento)}>Agregar al
                        carrito
                    </button>
                    <a className="btn btn-success" onClick={(e) => generarPDF()}>Generar PDF</a>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default DetalleInstrumento;


