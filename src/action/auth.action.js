import { handlePost } from "../helper";

export const postOtp = (data, callback) => {
  let isLoading = true;
  let dataOtp = {
    nomor: data.phoneNumber,
    type: "sms",
    nama: data.fullName,
    islogin: "0",
    isRegister: "1",
  };
  handlePost({
    url: "auth/otp",
    data: dataOtp,
    callback: (res, msg, status) => {
      isLoading = false;
      callback(res, status, msg, isLoading);
    },
  });
};
