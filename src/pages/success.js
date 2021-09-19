import successImage from "../assets/success.png";
import playstoreImage from "../assets/playstore.png";
import React from "react";

const SuccessScreen = () => {
  return (
    <div className="container mt-5 mb-5 px-4">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card px-4 py-3">
            <img src={successImage} alt={successImage} />
            <h4 className="text-center"> Selamat, registrasi berhasil dilakukan</h4>
            <br />
            <div>
              <h6 className="text-center text-black d-flex align-items-center justify-content-center">
                silahkan download aplikasi kami di play store dan lakukan proses login untuk masuk ke aplikasi, terimakasih.
              </h6>
            </div>
            <br />
            <div className="d-flex align-items-center justify-content-center">
              <img src={playstoreImage} alt={playstoreImage} height="40px" width="140px" />
            </div>
            <div className="col-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
