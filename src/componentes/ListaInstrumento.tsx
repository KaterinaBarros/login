import { useState, useEffect } from "react";
import {Instrumento}  from '../models/Instrumento';
import { getData } from "../services/ApiServicio";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/CartReducer";

const ListaInstrumentos = () => {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    const getInstrumentos = async () => {
        const data: any = await getData("Instrumentos");
        setInstrumentos(data);
    }

    useEffect(() => { getInstrumentos(); }, []);

    if (!instrumentos) {
        return(
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    //--------REDUX--------
    const dispatch = useDispatch();
    //---------------------

    const handleAddToCart = (product: any) => {
        dispatch(addToCart(product));
    };

    return (
       <div>
            <header>
                <h1>Instrumentos musicales</h1>
            </header>
            <main className='mt-5 d-flex align-items-center justify-content-center'>
                <div>
                    {instrumentos.map((instrumento) => (
                        <Card key={instrumento.id} className="mb-3 text-start" style={{ maxWidth: '800px' }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <Card.Img src={`src/assets/img/${instrumento.imagen}`}  className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                    <Card.Body>
                                        <div>
                                            <Card.Title className="fw-normal">{instrumento.instrumento}</Card.Title>
                                            <Card.Text className="fs-4 fw-bold">${instrumento.precio}</Card.Text>
                                            <div className="d-flex">
                                                {instrumento.costoEnvio === "G" ? <img src={`src/assets/img/camion.png`} /> : null}
                                                <Card.Text className={instrumento.costoEnvio === "G" ? 'text-success' : 'text-warning'}>{instrumento.costoEnvio === "G" ? "Envío gratis a todo el país" : `Costo de envío interior de Argentina $${instrumento.costoEnvio}`}</Card.Text>
                                            </div>
                                            <Card.Text>
                                                <small className="text-muted">{instrumento.cantidadVendida} vendidos</small>
                                            </Card.Text>
                                            <button className="btn btn-secondary">
                                                <Link className="nav-link" to={`detalle/${instrumento.id}`}>Ver detalle</Link>
                                            </button>
                                        </div>

                                        <button className="btn btn-outline-primary mt-4" onClick={() => handleAddToCart(instrumento)}>
                                            Agregar al carrito
                                        </button>
                                    </Card.Body>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ListaInstrumentos;
