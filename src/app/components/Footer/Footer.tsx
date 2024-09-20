import { FaGithub, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10">
      <aside>
        <img
          src="/svg/logo.svg"
          alt="Logo"
          width="75"
          height="auto"
          className="fill-current"
        />
        <div className="mt-4 text-neutral-content">
          &copy; {new Date().getFullYear()} Pujin Studio. All rights reserved.
          <br />
          Licensed under{" "}
          <a
            href="https://opensource.org/licenses/MIT"
            className="text-blue-500"
          >
            MIT License
          </a>
          .
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-2">
          <a
            href="https://facebook.com/bayu.ariyadi.fuujin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-500"
          >
            <FaFacebook className="text-2xl mr-2" />
          </a>
          <a
            href="https://github.com/BayuAriyadi/roasting-oc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-500"
          >
            <FaGithub className="text-2xl mr-2" />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
