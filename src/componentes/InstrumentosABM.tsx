import { Button} from "react-bootstrap";
import { deleteData, getData, postData, putData } from "../services/ApiServicio";
import { InstrumentoCreateUpdate } from "../models/Instrumento";
import { useEffect, useState } from "react";
import ModalCustom from "./ModalCustom";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import swal from 'sweetalert';
import { Categoria } from "../models/Categoria";

const InstrumentosABM = () => {
    
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [instrumentos, setInstrumentos] = useState<InstrumentoCreateUpdate[]>([]);
    const [instrumentoEdit, setInstrumentoEdit] = useState<InstrumentoCreateUpdate>();
    const [categorias, setCategorias] = useState<Categoria[]>([]);


    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleShowModalEditing = (instrumento: InstrumentoCreateUpdate) => {
        setShowModal(true);
        setEditing(true);
        setInstrumentoEdit(instrumento);
    };

    const handleCloseModal = () => {
        setInstrumentoEdit(undefined);
        setShowModal(false);
        setEditing(false);
    };

    const getDatos = async () => {
        const data1: any = await getData("Instrumentos");
        const data2: any = await getData("Categorias");
        setInstrumentos(data1);
        setCategorias(data2);
    };

    const getDatosByCategoria = async (id: string) => {
        const data: any = id === '' ? await getData("Instrumentos") : await getData(`Instrumentos/List/${id}`);
        setInstrumentos(data);
    };    

    useEffect(() => { 
        getDatos();
    }, []);

    if (!instrumentos) {
        return(
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }

    const createUpdateInstumento = async (instrumento: InstrumentoCreateUpdate) => {
        try {
             if (editing) {
                await putData(`Instrumentos/${instrumento?.id}`, instrumento);
                toast.success('Instrumento modificado exitosamente!', {
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
            } else {
                await postData("Instrumentos/Create", instrumento);
                toast.success('Instrumento creado exitosamente!', {
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
            }
            getDatos();
        } catch (error) {
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
        }
    }

    const handleDelete = async (id: string) => {
       swal({
            title: "¿Estas seguro de eliminar el instrumento?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            try {
            if (willDelete) {
                    await deleteData(`Instrumentos/${id}`);
                    getDatos();
                    swal("Instrumento eliminado correctamente!", {
                        icon: "success",
                    });
                }
            } catch (error) {
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
            }
        });

    }

    return (
        <div>
            <div className="mb-3 mt-1">
                <label htmlFor="categoria" className="form-label">Categorias</label>
                    <select 
                        className="form-select"
                        aria-label="Default select example"
                        id="categoria"
                        name="categoria"
                        onChange={(e) => getDatosByCategoria(e.target.value)}
                        >
                        <option value="">All</option>
                        {categorias.map((categoria, index) => (
                            <>
                                <option key={index} value={categoria.id}>{categoria.denominacion}</option>
                            </>
                        ))}
                    </select>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow >
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Nombre</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Marca</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Modelo</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Categoria</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Imagen</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Precio</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Costo de envio</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Cantidad vendida</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Descripcion</TableCell>
                            <TableCell className="border" align="center" style={{fontWeight: 'bold'}}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {instrumentos.map((instrumento, index) => (
                            <TableRow key={index} >
                                <TableCell className="border" align="center">{instrumento.instrumento}</TableCell>
                                <TableCell className="border" align="center">{instrumento.marca}</TableCell>
                                <TableCell className="border" align="center">{instrumento.modelo}</TableCell>
                                <TableCell className="border" align="center">{instrumento.categoria}</TableCell>
                                <TableCell className="border" align="center">
                                    <img style={{maxWidth: "200px"}} src={instrumento.imagen.length <= 10 ? `/src/assets/img/${instrumento.imagen}` : instrumento.imagen} alt={instrumento.instrumento} />
                                </TableCell>
                                <TableCell className="border" align="center">{instrumento.precio}</TableCell>
                                <TableCell className="border" align="center">{instrumento.costoEnvio}</TableCell>
                                <TableCell className="border" align="center">{instrumento.cantidadVendida}</TableCell>
                                <TableCell className="border" align="center">{instrumento.descripcion}</TableCell>
                                <TableCell className="border" align="center">
                                    <Button variant="primary" onClick={handleShowModal} className="mt-2">Agregar</Button>
                                    <Button variant="secondary" onClick={() => handleShowModalEditing(instrumento)} className="mt-2">Modificar</Button>
                                    <Button variant="danger" onClick={() => handleDelete(instrumento.id)} className="mt-2">Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <ModalCustom 
                showModal={showModal}
                editing={editing}
                instrumento={instrumentoEdit}
                handleClose={handleCloseModal}
                createUpdateInstumento={createUpdateInstumento}>
            </ModalCustom>
            <ToastContainer/>
        </div>
    );
};

export default InstrumentosABM;
