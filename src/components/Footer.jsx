import React from "react";

function Footer() {
  return (
    <div className="footer" style={{position: "fixed", bottom: "0", left: "0",right: "0"}}>
      <footer className="py-3 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2021
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
