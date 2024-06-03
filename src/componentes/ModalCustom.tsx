import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Modal } from "react-bootstrap";
import { InstrumentoCreateUpdate } from "../models/Instrumento";
import { useEffect, useState } from "react";
import { Categoria } from "../models/Categoria";
import { getData } from "../services/ApiServicio";

type ModalTypeProps = {
    showModal: boolean;
    handleClose:() => void;
    editing?: boolean;
    instrumento?: InstrumentoCreateUpdate;
    createUpdateInstumento:(newInstrumento: InstrumentoCreateUpdate) => void;
};

const ModalCustom: React.FC<ModalTypeProps> = ({ showModal, editing, instrumento, handleClose, createUpdateInstumento }) => {{

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const getInstrumentos = async () => {
        const data: any = await getData("Categorias");
        setCategorias(data);
    }  

    useEffect(() => { getInstrumentos(); }, []);

    const validationSchema = Yup.object({
        instrumento: Yup.string().required("Campo requerido"),
        marca: Yup.string().required("Campo requerido"),
        modelo: Yup.string().required("Campo requerido"),
        imagen: Yup.mixed().required("Campo requerido"),
        precio: Yup.number().required("Campo requerido"),
        costoEnvio: Yup.string().required("Campo requerido"),
        cantidadVendida: Yup.number().required("Campo requerido"),
        descripcion: Yup.string().required("Campo requerido"),
        categoria: Yup.string().required("Campo requerido")
    })
    

    const initialValues: InstrumentoCreateUpdate = {
        instrumento: "",
        marca: "",
        modelo: "",
        imagen: "",
        precio: 0,
        costoEnvio: "",
        cantidadVendida: 0,
        descripcion: "",
        categoria: "",
        id: ""
    }

    return (
        <Modal
            id={"modal"}
            show={showModal}
            onHide={handleClose}
            size={"lg"}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                {editing ? (
                    <Modal.Title>Editar instrumento:</Modal.Title>
                ) : (
                    <Modal.Title>Añadir instrumento:</Modal.Title>
                )}
            </Modal.Header>

            <Modal.Body>
                <Formik
                    validationSchema={ validationSchema }
                    initialValues={ instrumento ? instrumento : initialValues }
                    enableReinitialize={ true }
                    onSubmit={async (values) => {
                        createUpdateInstumento(values);
                        handleClose();
                    }}
                >
                    {(props) => (
                        <form autoComplete="off" className="form-obraAlta"
                        onSubmit={props.handleSubmit}
                        >
                        <div className="mb-3 mt-1">
                            <label htmlFor="instrumento" className="form-label">Nombre</label>
                            <input type="text"
                                className="form-control"
                                id="instrumento"
                                name="instrumento"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.instrumento}
                            />
                           {props.touched.modelo && props.errors.instrumento ? (
                                <div className="text-danger">{props.errors.instrumento}</div>
                            ): null}
                        </div>

                        <div className="mb-3 mt-1">
                            <label htmlFor="marca" className="form-label">Marca</label>
                            <input type="text"
                                className="form-control"
                                id="marca"
                                name="marca"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.marca}
                            />
                            {props.touched.modelo && props.errors.marca ? (
                                <div className="text-danger">{props.errors.marca}</div>
                            ): null}
                        </div>

                        <div className="mb-3 mt-1">
                            <label htmlFor="modelo" className="form-label">Modelo</label>
                            <input type="text"
                            className="form-control"
                            id="modelo"
                            name="modelo"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.modelo}
                            />
                            {props.touched.modelo && props.errors.modelo ? (
                                <div className="text-danger">{props.errors.modelo}</div>
                            ): null}
                        </div>

                        <div className="mb-3 mt-1">
                            <label htmlFor="categoria" className="form-label">Categoria</label>
                                <select 
                                    className="form-select"
                                    aria-label="Default select example"
                                    id="categoria"
                                    name="categoria"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.categoria}
                                    >
                                    <option value="">Seleccione la categoria</option>
                                    {categorias.map((categoria, index) => (
                                        <>
                                            <option key={index} value={categoria.denominacion}>{categoria.denominacion}</option>
                                        </>
                                    ))}
                                </select>
                           {props.touched.categoria && props.errors.categoria ? (
                                <div className="text-danger">{props.errors.categoria}</div>
                            ): null}
                        </div>
                        
                        <div className="mb-3 mt-1">
                            <label htmlFor="imagen" className="form-label">Imagen</label>
                            <input type="text"
                            className="form-control"
                            id="imagen"
                            name="imagen"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.imagen}
                            />
                        </div>

                        <div className="mb-3 mt-1">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <input type="number"
                            className="form-control"
                            id="precio"
                            name="precio"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.precio}
                            />
                            {props.touched.precio && props.errors.precio ? (
                                <div className="text-danger">{props.errors.precio}</div>
                            ): null}
                        </div>
                        
                        <div className="mb-3 mt-1">
                            <label htmlFor="costoEnvio" className="form-label">Costo de envio</label>
                            <input type="text"
                            className="form-control"
                            id="costoEnvio"
                            name="costoEnvio"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.costoEnvio}
                            />
                            {props.touched.costoEnvio && props.errors.costoEnvio ? (
                                <div className="text-danger">{props.errors.costoEnvio}</div>
                            ): null}
                        </div>

                        <div className="mb-3 mt-1">
                            <label htmlFor="cantidadVendida" className="form-label">Cantidad vendida</label>
                            <input type="number"
                            className="form-control"
                            id="cantidadVendida"
                            name="cantidadVendida"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.cantidadVendida}
                            />
                            {props.touched.cantidadVendida && props.errors.cantidadVendida ? (
                                <div className="text-danger">{props.errors.cantidadVendida}</div>
                            ): null}
                        </div>
                        
                        <div className="mb-3 mt-1">
                            <label htmlFor="descripcion" className="form-label">Descripcion</label>
                            <input type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.descripcion}
                            />
                            {props.touched.descripcion && props.errors.descripcion ? (
                                <div className="text-danger">{props.errors.descripcion}</div>
                            ): null}
                        </div>

                        <div className="text-center">
                            <Button className="px-5 btn-lg" variant="primary" type="submit">Guardar</Button>
                        </div>
                        </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
            
}};

export default ModalCustom;