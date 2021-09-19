import logoAds from "./assets/logo.png";
import backImage from "./assets/back.png";
import playstoreImage from "./assets/playstore.png";
import React, { useState } from "react";
import Register from "./pages/register";
import Otp from "./pages/otp";
import SuccessScreen from "./pages/success";

const App = () => {
  const [dataRegister, setDataRegister] = useState(null);
  const [message, setMessage] = useState("");
  const [back, setBack] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess) {
    return <SuccessScreen />;
  }
  return (
    <div className="container mt-5 mb-5 px-4">
      <div className="row d-flex align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card px-4 py-3">
            {back && <img onClick={() => setBack(false)} style={{ cursor: "pointer" }} height="30px" width="30px" src={backImage} />}
            <div className="d-flex  align-items-center justify-content-center ">
              <img src={logoAds} height="60px" width="65px" alt={logoAds} />
            </div>
            <br />
            <div className="d-flex align-items-center justify-content-center ">
              <div>Selamat datang di Ads Coin</div>
            </div>
            <h6 className="text-muted text-center">Sign up to continue</h6>
            <div
              className={`d-flex align-items-center ${message === "" && "d-none"}`}
              style={{
                background: "#cfe2ff",
                paddingTop: "8px",
                paddingLeft: "10px",
              }}
            >
              <h6>{message}</h6>
            </div>
            <br />
            {dataRegister === null || !back ? (
              <Register
                callbackResponse={(res, msg) => {
                  setMessage(msg);
                  if (res !== "") {
                    setDataRegister(res);
                    setBack(true);
                  } else {
                    setDataRegister(null);
                    setBack(false);
                  }
                }}
                dataReg={dataRegister}
              />
            ) : (
              <Otp
                dataReg={dataRegister}
                callbackResponse={(status, res) => {
                  setMessage(res);
                  if (status) {
                    setIsSuccess(true);
                  }
                }}
              />
            )}
            <br />
            <div>
              <h6 className="text-black d-flex align-items-center justify-content-center">Download aplikasi kami di play store</h6>
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

export default App;
