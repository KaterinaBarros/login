import { Link } from "react-router-dom";

const Home = () => {
    return (
            <div className="container mt-4">
                <h1>Musical Hendrix</h1>
                <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="3000">
                            <img src="src/assets/img/nro2.jpg" style={{maxHeight: '500px', objectFit: 'contain'}} className="d-block w-100" alt="imagen1" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img src="src/assets/img/nro1.jpg" style={{maxHeight: '500px', objectFit: 'contain'}} className="d-block w-100" alt="imagen2" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="3000">
                            <img src="src/assets/img/nro5.jpg" style={{maxHeight: '500px', objectFit: 'contain'}} className="d-block w-100" alt="imagen2" />
                            <div className="carousel-caption d-none d-md-block">
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-4 fst-italic">
                    Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de 
                    experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las 
                    mejores elecciones para tu compra musical
                </p>

                <button className="btn btn-primary mt-4">
                    <Link className="nav-link" to={`productos`}>Ver productos</Link>
                </button>
            </div>
    );
};

export default Home;
