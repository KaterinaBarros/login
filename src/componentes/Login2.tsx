import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Usuario from "../models/Usuario";


function Login2() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState<Usuario>(new Usuario());
    const [clave, setClave] = useState<string>("");
    const [txtValidacion, setTxtValidacion] = useState<string>("");
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'txtUsuario') {
            setUsuario(prev => ({ ...prev, usuario: value }));
        } else if (id === 'txtClave') {
            setClave(value);
        }
    };

    const login = async () => {
        try {
            const response = await fetch('services/apiServicio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario: usuario.usuario, clave })
            });
            const data = await response.json();
            if (response.ok) {
                const { id, rol } = data;
                const updatedUsuario = { ...usuario, id, rol };
                setUsuario(updatedUsuario);
                localStorage.setItem('usuario', JSON.stringify(updatedUsuario));
                navigate('/menu', {
                    replace: true,
                    state: {
                        logged: true,
                        usuario: updatedUsuario
                    },
                });
            } else {
                setTxtValidacion("Usuario y/o clave incorrectas");
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión", error);
            setTxtValidacion("Error en el servidor, inténtelo nuevamente más tarde");
        }
    };

    return (
        <>
            <div className="center">
                <form>
                    <div className="mb-3">
                        <label htmlFor="txtUsuario" className="form-label">Usuario</label>
                        <input type="text" id='txtUsuario' className="form-control" placeholder="Ingrese el nombre" value={usuario.usuario} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === "Enter") login(); }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="txtClave" className="form-label">Clave</label>
                        <input type="password" id='txtClave' className="form-control" placeholder="Ingrese la clave" value={clave} onChange={handleInputChange} onKeyDown={(e) => { if (e.key === "Enter") login(); }} />
                    </div>
                    <div className="col">
                        <label>
                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                            Es Administrador
                        </label>
                        <p>El usuario que se logueará tiene Rol {isChecked ? 'Administrador (admin)' : 'Usuario (user)'}.</p>
                    </div>
                    <div className="col">
                        <button onClick={login} className="btn btn-success" type="button">
                            Ingresar
                        </button>
                    </div>
                    <div>
                        <p style={{ color: 'red', lineHeight: 5, padding: 5 }}>{txtValidacion}</p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login2;
