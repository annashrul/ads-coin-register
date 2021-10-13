import React, { useState, useEffect } from "react";
import { checkInputEmail, templateInput } from "../helper";
import { postOtp } from "../action/auth.action";

const Register = ({ callbackResponse, dataReg = null }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [confirmationPin, setConfirmationPin] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isErrorFullName, setIsErrorFullName] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPhoneNumber, setIsErrorPhoneNumber] = useState(false);
  const [isErrorPin, setIsErrorPin] = useState(false);
  const [isErrorConfirmationPin, setIsErrorConfirmationPin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const lengthTextFullName = 80;
  const lengthTextemail = 80;
  const lengthTextphoneNumber = 15;
  const lengthTextpin = 6;
  const lengthTextconfirmationPin = 6;
  useEffect(() => {
        const path = window.location.pathname;
        setReferralCode(path.replace("/", ""));
  }, []);

  useEffect(() => {
    if (dataReg !== null) {
      setFullName(dataReg.fullname);
      setEmail(dataReg.email);
      setPhoneNumber(dataReg.mobile_no);
      setPin(dataReg.pin);
      setConfirmationPin(dataReg.pin);
      setReferralCode(referralCode);
    }
  }, [dataReg]);

  useEffect(() => {
    valid();
  }, [fullName, email, phoneNumber, pin, confirmationPin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let dataOtp = {
      fullName: fullName,
      phoneNumber: phoneNumber,
    };
    postOtp(dataOtp, (res, status, msg, isLoading) => {
      if (status) {
        callbackResponse(
          {
            fullname: fullName,
            email: email,
            mobile_no: phoneNumber,
            pin: pin,
            sponsor: referralCode,
            signup_source: "website",
          },
          ""
        );
      } else {
        callbackResponse("", msg);
      }
      setLoading(isLoading);
    });
  };

  const valid = () => {
    let val = true;
    if (fullName === "" || email === "" || phoneNumber === "" || pin === "" || confirmationPin === "") {
      val = true;
    } else if (isErrorFullName || isErrorEmail || isErrorPhoneNumber || isErrorPin || isErrorConfirmationPin) {
      val = true;
    } else {
      val = false;
    }
    return setDisabled(val);
  };

  return (
    <form onSubmit={handleSubmit}>
      {templateInput({
        label: "Full name",
        isError: isErrorFullName,
        state: fullName,
        maxLengthInput: lengthTextFullName,
        callback: (val) => {
          setFullName(val);
          val === "" ? setIsErrorFullName(true) : setIsErrorFullName(false);
        },
      })}
      {templateInput({
        label: "Email",
        isError: isErrorEmail,
        state: email,
        maxLengthInput: lengthTextemail,
        callback: (val) => {
          setEmail(val);
          val === "" || !checkInputEmail(val) ? setIsErrorEmail(true) : setIsErrorEmail(false);
        },
        isErrorTextOther: !checkInputEmail(email) && "format email salah",
      })}
      {templateInput({
        label: "Phone number",
        isError: isErrorPhoneNumber,
        state: phoneNumber,
        maxLengthInput: lengthTextphoneNumber,
        callback: (val) => {
          val = val.replace(/[^\d]/, "");
          setPhoneNumber(val);
          val === "" || val.length < 10 ? setIsErrorPhoneNumber(true) : setIsErrorPhoneNumber(false);
        },
        isErrorTextOther: phoneNumber.length < 10 && "terlalu pendek",
      })}
      {templateInput({
        label: "Pin",
        isError: isErrorPin,
        state: pin,
        maxLengthInput: lengthTextpin,
        callback: (val) => {
          val = val.replace(/[^\d]/, "");
          setPin(val);
          val === "" || val.length < 6 ? setIsErrorPin(true) : setIsErrorPin(false);
        },
        isErrorTextOther: pin.length < 6 && "harus 6 digit angka",
      })}
      {templateInput({
        label: "Confirm pin",
        isError: isErrorConfirmationPin,
        state: confirmationPin,
        maxLengthInput: lengthTextconfirmationPin,
        callback: (val) => {
          val = val.replace(/[^\d]/, "");
          setConfirmationPin(val);
          val === "" || val.length < 6 || pin !== val ? setIsErrorConfirmationPin(true) : setIsErrorConfirmationPin(false);
        },
        isErrorTextOther: confirmationPin.length < 6 ? "harus 6 digit angka" : confirmationPin !== pin ? "pin tidak cocok" : "",
      })}

      <button className={`btn btn-primary mt-4 ${disabled ? "disabled" : ""}`} type="submit" disabled={disabled} style={{ width: "100%" }}>
        <div>{loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : <span className="sr-only">Daftar</span>}</div>
      </button>
    </form>
  );
};

export default Register;
