import LogoImage from '../../assets/logo_rastreolax.png';

export const Footer = () => {
  return (
    <footer className="border-t-2 border-slate-200 py-4 px-4 absolute bottom-0 w-full flex justify-center">
      <img
        src={LogoImage}
        alt="LAXGPS"
        width={256}
        height={256}
        className="logoCompany"
      />
    </footer>
  );
};

export default Footer;
