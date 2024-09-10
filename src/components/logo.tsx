import LogoImage from '../assets/logo_rastreolax.png';

export function Logo() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img
                src={LogoImage}
                alt="Logo"
                width={256}
                height={256}
                className="logo-image"
            />
        </div>
    );
}
