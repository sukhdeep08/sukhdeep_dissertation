import style from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.threeflex}>
          <Link to="/" className="text-uppercase">
            privacy policy
          </Link>
          <div className={style.verticalLine}></div>
          <Link to="/" className="text-uppercase">
            term of service
          </Link>
          <div className={style.verticalLine}></div>
          <Link to="/" className="text-uppercase">
            About SnapUp.
          </Link>
        </div>
        <span className="text-white copyright-text text-manrope fs-14 fw-3">
          &copy; 2022 SnapUp. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
