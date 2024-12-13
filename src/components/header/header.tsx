import LogoImage from '../../assets/logo_rastreolax.png';

export function Header() {
  return (
    <header className="header">
      <h1>Lector IMEI </h1>

      <img
        src={LogoImage}
        alt="LAXGPS"
        width={256}
        height={256}
        className="logoCompany"
      />
    </header>
  );
}
