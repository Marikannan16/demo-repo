import React, { useState } from "react";
// import "../App.css";
import ENHR from "../Images/ENHR.png";
import logo from "../Images/screen.png";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoutes";
import Swal from 'sweetalert2';

const Login = ({ value }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowPassword] = useState(true);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (!email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    if (email === "admin@gmail.com" && password === "admin") {
      // Successful login
      Swal.fire({

        icon: 'success',
        title: 'Success!',
        text: 'You have logged in successfully!',
      }).then(() => {
        navigate('/home');
      });
    } else {
      // Failed login
      Swal.fire({

        icon: 'error',
        title: 'Failed!',
        text: 'Invalid email or password!',
      });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email, password);

  //   if (!email || !password) {
  //     setError("Please fill the credential");
  //     return;
  //   }
  //   if (email == "admin@gmail.com" && password == "admin"){
  //     navigate('/home')
  //   }
  //   else{
  //     setError("please fill the credential")
  //   }
  //   // navigate('/home')
  // };

  const visiblePassword = (e) => {
    e.preventDefault();

    setShowPassword(!showpassword);
  };
  return (
    <>
      <div>
        <div className="flex flex-col-reverse lg:flex-row overflow-hidden">
          <div className=" px-10 lg:px-36 pb-20 pt-10 w-screen lg:w-1/2 h-full lg:h-screen bg-white relative">
            <div className="flex flex-col justify-center gap-6">
              <img src={ENHR} alt="ENHR logo" className="mx-auto mt-5" width={80} />
              <h4 className="text-2xl mt-5">
                Welcome to
                <br />
                <span className="text-3xl font-bold text-nowrap">ENCompliance HR</span><br />
              </h4>
            </div>

            <form onSubmit={handleSubmit} className="mt-7">
              <h3 className="text-xl font-semibold pb-2 mt-3 mb-3">Login</h3>
              <label htmlFor="email" className="block pb-1 font-bold">
                Email ID
              </label>
              <div className="relative flex items-center pb-2">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full ps-10 pt-2 pb-2 rounded border border-gray-400 "
                  placeholder="Enter Your Email ID"
                  required autoComplete="off"
                />
                <svg className="absolute ms-1 text-xl left-2 h-5 w-5" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 2.55512C1 2.08363 1.1873 1.63144 1.5207 1.29804C1.8541 0.964645 2.30628 0.777344 2.77778 0.777344H15.2222C15.6937 0.777344 16.1459 0.964645 16.4793 1.29804C16.8127 1.63144 17 2.08363 17 2.55512M1 2.55512V11.444C1 11.9155 1.1873 12.3677 1.5207 12.7011C1.8541 13.0345 2.30628 13.2218 2.77778 13.2218H15.2222C15.6937 13.2218 16.1459 13.0345 16.4793 12.7011C16.8127 12.3677 17 11.9155 17 11.444V2.55512M1 2.55512L9 7.88845L17 2.55512" stroke="#000000 " strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                </svg>
              </div>
              <label htmlFor="password" className="block p-1 font-bold">
                Password
              </label>
              <div className="relative flex items-center pb-2">
                <input
                  type={showpassword ? "password" : "text"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full ps-10 pt-2 pb-2 rounded border border-gray-400"
                  placeholder="Enter Your Password "
                  required
                />
                <svg className="absolute ms-1 text-xl left-1.5 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11M5 13C5 12.4696 5.21071 11.9609 5.58579 11.5858C5.96086 11.2107 6.46957 11 7 11H17C17.5304 11 18.0391 11.2107 18.4142 11.5858C18.7893 11.9609 19 12.4696 19 13V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V13ZM11 16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16C13 15.7348 12.8946 15.4804 12.7071 15.2929C12.5196 15.1054 12.2652 15 12 15C11.7348 15 11.4804 15.1054 11.2929 15.2929C11.1054 15.4804 11 15.7348 11 16Z" stroke="#000000" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* <CiLock className="absolute text-2xl left-2" /> */}
                <div className="absolute text-xl right-2 px-1">
                  <button onClick={visiblePassword}>
                    {showpassword ? (
                      <svg className="h-5 w-5" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.55452 12.8239C4.327 9.09586 7.55622 6.44694 11.1887 6.44694C14.82 6.44694 18.0492 9.09586 18.8228 12.8239C18.8534 12.9719 18.9413 13.1015 19.067 13.1843C19.1928 13.2672 19.3461 13.2964 19.4933 13.2656C19.6405 13.2348 19.7695 13.1465 19.8519 13.0201C19.9344 12.8937 19.9634 12.7396 19.9328 12.5917C19.0527 8.35138 15.3716 5.30859 11.1887 5.30859C7.00574 5.30859 3.32459 8.35138 2.44452 12.5917C2.41388 12.7396 2.44296 12.8937 2.52538 13.0201C2.6078 13.1465 2.73679 13.2348 2.88399 13.2656C3.03119 13.2964 3.18452 13.2672 3.31027 13.1843C3.43602 13.1015 3.52388 12.9719 3.55452 12.8239ZM11.1773 8.72362C12.2287 8.72362 13.2371 9.14338 13.9805 9.89056C14.724 10.6377 15.1416 11.6511 15.1416 12.7078C15.1416 13.7645 14.724 14.7779 13.9805 15.5251C13.2371 16.2723 12.2287 16.692 11.1773 16.692C10.1259 16.692 9.11759 16.2723 8.37414 15.5251C7.63069 14.7779 7.21302 13.7645 7.21302 12.7078C7.21302 11.6511 7.63069 10.6377 8.37414 9.89056C9.11759 9.14338 10.1259 8.72362 11.1773 8.72362Z" fill="#000000" />
                      </svg>
                      // <VscEye className="text-black" />
                    ) : (
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48"> <path d="M 42.470703 3.9863281 A 1.50015 1.50015 0 0 0 41.439453 4.4394531 L 4.4394531 41.439453 A 1.50015 1.50015 0 1 0 6.5605469 43.560547 L 16.916016 33.205078 C 18.6847 35.119215 21.200325 36.330078 24 36.330078 C 29.33 36.330078 33.669922 31.989922 33.669922 26.669922 C 33.669922 23.870103 32.45923 21.347142 30.544922 19.576172 L 35.052734 15.068359 C 39.90447 17.90912 43.668811 22.496845 45.050781 27.869141 C 45.220781 28.549141 45.83 29 46.5 29 C 46.62 29 46.749141 28.989219 46.869141 28.949219 C 47.679141 28.749219 48.159219 27.930859 47.949219 27.130859 C 46.409379 21.128251 42.461227 16.073087 37.277344 12.84375 L 43.560547 6.5605469 A 1.50015 1.50015 0 0 0 42.470703 3.9863281 z M 23.990234 9 C 12.820234 9 2.7507813 16.620859 0.05078125 27.130859 C -0.15921875 27.930859 0.32085937 28.749219 1.1308594 28.949219 C 1.9308594 29.159219 2.7492187 28.679141 2.9492188 27.869141 C 5.2792187 18.819141 14.330234 12 23.990234 12 C 25.700234 12 27.389531 12.209141 29.019531 12.619141 L 31.480469 10.160156 C 29.090469 9.4001562 26.570234 9 23.990234 9 z M 24 17 C 18.67 17 14.339844 21.339922 14.339844 26.669922 C 14.339844 26.869922 14.349375 27.079297 14.359375 27.279297 L 18.150391 23.490234 C 18.760391 22.360234 19.700078 21.420547 20.830078 20.810547 L 24.619141 17.019531 C 24.409141 17.009531 24.21 17 24 17 z M 28.425781 21.695312 C 29.796425 22.916506 30.669922 24.687458 30.669922 26.669922 C 30.669922 30.339922 27.68 33.330078 24 33.330078 C 22.025372 33.330078 20.255983 32.456581 19.035156 31.085938 L 28.425781 21.695312 z"></path> </svg>
                    )}
                  </button>
                </div>
              </div>
              <div></div>
              <input
                type="submit"
                id="submit"
                value="Login"
                className="w-full bg-primary print:bg-primary text-md py-1.5 rounded cursor-pointer mt-3"
                required
              />
              <div>
                {error && <p style={{ color: "red" }} className="text-center font-pop">{error}</p>}
                <p className="text-center mb-10 cursor-pointer font-pop">
                  Forget Password ?
                </p>
              </div>
            </form>
            <div
              className="h-96 w-96 rounded-full absolute lg:-left-40 -left-44 lg:-bottom-60 -bottom-64"
              style={{
                background: "#d7b95f",
                background:
                  "linear-gradient(192deg, rgba(255,252,0,0.7399159492898721) 0%, rgba(255,255,255,0.4878151089537377) 100%)",
              }}
            ></div>
          </div>
          <div className="flex flex-col justify-center items-center relative lg:px-24 px-10 w-full lg:w-1/2 h-screen  bg-primary print:bg-primary">
            <div className="flex flex-col justify-center items-start gap-3">
              <img
                src={logo}
                alt="Login logo"
                className="mx-auto px-5"
                width={340}
              />
              <div className="text-center mt-3">
                <p className="text-xl font-semibold">
                  Compliance simplified, Result Amplified
                  <br />
                  <span className="text-base font-medium">
                    Your trusted partners for seamless business compliance and
                    success
                  </span>
                </p>
              </div>
            </div>
            <div
              className="h-96 w-96 rounded-full absolute lg:-right-32 -top-60 -right-44"
              style={{
                background: "rgb(87,87,81)",
                background:
                  "linear-gradient(80deg, rgba(87,87,81,0.6698879380853904) 0%, rgba(255,255,255,0.4878151089537377) 100%)",
                opacity: "0.7",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
