import React, { useState, useEffect, useRef } from "react";
import ReactCodeInput from "react-code-input";
import { postOtp } from "../action/auth.action";
import { handlePost } from "../helper";
const INITIAL_LENGT_CODE = 4;
const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const Otp = ({ dataReg, callbackResponse }) => {
  const twoDigits = (num) => String(num).padStart(2, "0");
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(120);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const [valCode, setValCode] = useState("");

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
        setStatus(STATUS.STARTED);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );

  const handleReSend = () => {
    if (STATUS.STOPPED) {
      setLoading(true);
      let dataOtp = {
        fullName: dataReg.fullname,
        phoneNumber: dataReg.mobile_no,
      };
      postOtp(dataOtp, (res, status, msg, isLoading) => {
        if (status) {
          setStatus(STATUS.STARTED);
          setSecondsRemaining(120);
        } else {
          callbackResponse("", msg);
        }
        setLoading(isLoading);
      });
    }
  };

  const handleSend = (res) => {
    setLoading(true);
    dataReg.kode_otp = res;
    handlePost({
      url: "auth/register",
      data: dataReg,
      callback: (res, msg, status) => {
        setSecondsRemaining(0);
        if (res !== null) {
          if (status) {
            callbackResponse(true, msg);
          } else {
            callbackResponse(false, msg);
          }
        } else {
          callbackResponse(false, msg);
        }
        setLoading(false);
      },
    });
  };

  return (
    <div className="row d-flex align-items-center justify-content-center">
      <h6 className="text-center">masukan kode otp yang kami kirim melalui pesan whatsapp</h6>
      <ReactCodeInput
        value={valCode}
        className="col-12 text-center"
        onChange={(res) => {
          setValCode(res);
          if (res.length === INITIAL_LENGT_CODE) {
            handleSend(res);
          }
        }}
        type="password"
        fields={4}
        autoFocus={true}
        inputStyle={{
          padding: "10px",
          width: "30px",
          fontSize: "14px",
          margin: "10px",
          backgroundColor: "#e0e0e0",
          border: "none",
          borderRadius: "4px",
          textAlign: "center",
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <button className="btn btn-primary col-8  text-center" type="submit" disabled={status === STATUS.STARTED} onClick={handleReSend}>
        <div>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          ) : (
            <span className="sr-only">Kirim ulang otp {status === STATUS.STARTED && twoDigits(secondsRemaining)}</span>
          )}
        </div>
      </button>
    </div>
  );
};
export default Otp;
