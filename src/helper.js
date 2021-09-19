import axios from "axios";

export const templateInput = ({ label, isError, state, maxLengthInput, callback, isErrorTextOther = "" }) => {
  return (
    <div className="form-group" style={{ marginBottom: "10px" }}>
      <div className="col">
        <label className="font-10 d-flex">
          <span className="col">
            {label} *{" "}
            {isError && (
              <span className="font-10 red weight">
                {" "}
                <br />
                {state === "" ? "tidak boleh kosong" : isErrorTextOther !== "" && isErrorTextOther}
              </span>
            )}
          </span>
          <span className="font-10 right">
            {" "}
            {state.length}/{maxLengthInput}
          </span>
        </label>
      </div>
      <input
        maxLength={maxLengthInput}
        type="text"
        className={`form-control ${isError && "error-input"}`}
        onChange={(e) => {
          let val = e.target.value;
          callback(val);
        }}
        onBlur={(e) => {
          let val = e.target.value;
          callback(val);
        }}
        value={state}
      />
    </div>
  );
};

export const checkInputEmail = (emailAddress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAddress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
};

export const handlePost = async ({ url, data, callback }) => {
  axios
    .post("https://api.adscoin.id/" + url, data, {
      headers: { "X-Project-ID": "8123268367ea27e094e71e290", "X-Requested-From": "apps" },
    })
    .then(function (response) {
      const datum = response.data;
      if (datum.status === "success") {
        callback(datum, datum.msg, true);
      } else {
        callback(datum, datum.msg, false);
      }
    })
    .catch(function (err) {
      if (err.message === "Network Error") {
        callback(null, "a network error occurred.", false);
      } else {
        if (err.response !== undefined) {
          if (err.response.data.msg !== undefined) {
            callback(null, err.response.data.msg, false);
          } else {
            callback(null, "a server error occurred.", false);
          }
        }
      }
    });
};
