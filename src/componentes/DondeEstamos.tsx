const longitud = '-68.8408526';
const latitud = '-32.8863197';

const DondeEstamos = () => {
    return (
        <div>
            <iframe id="map" src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d${longitud}!3d${latitud}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448`} width="1600" height="450" frameBorder="0" style={{ border: '0px'}}></iframe>
            <p>Nos ubicamos en la provincia de Mendoza entre las calles Av. San Martín & Av. Las Heras.</p>
        </div>
    );
};

export default DondeEstamos;
