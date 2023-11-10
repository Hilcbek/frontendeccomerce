import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Router, UploadImage } from "../../utils/Axios";
import ClipLoader from "react-spinners/ClipLoader";
const Register = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  let [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    profile:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Ic_account_circle_48px.svg/1200px-Ic_account_circle_48px.svg.png",
  });
  let navigate = useNavigate();
  let res;
  let handleSubmit = async (e) => {
    setLoading(true);
    let { username, email, password, profile } = data;
    e.preventDefault();
    try {
      if (!String(data.profile).includes("http")) {
        let upload = await UploadImage(data.profile);
        if (upload) {
          res = await Router.post("/auth/register", {
            username,
            email,
            password,
            profile: upload,
          });
        }
      } else {
        res = await Router.post("/auth/register", {
          username,
          email,
          password,
          profile,
        });
      }
      if (res.data) {
        toast.success("Registered Successfully");
        setLoading(false);
        setData({});
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setLoading(false);
      setData({});
    }
  };
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="p-1 shadow-md shadow-black/50 my-5 w-[360px]">
        <h1 className="font-light font-Roboto underline my-3 text-4xl text-center">
          Register!
        </h1>
        <form
          action=""
          className="flex items-start justify-start flex-col w-11/12 mx-auto"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="profile"
            className="cursor-pointer w-14 h-14 rounded-full my-1 mx-auto border-solid border-[1px] border-black/80 p-[.5px]"
          >
            <input
              className="hidden"
              id="profile"
              type="file"
              onChange={(e) => setData({ ...data, profile: e.target.files[0] })}
            />
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                String(data.profile)?.includes("http")
                  ? data.profile
                  : URL?.createObjectURL(data.profile)
              }
              alt=""
            />
          </label>
          <div className="flex text-start justify-start flex-col w-full my-1">
            <label
              htmlFor="username"
              className="underline tracking-widest mb-1 ml-4"
            >
              Username
            </label>
            <input
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="text-sm p-2 outline-none border-solid border-[#2196f3] border-[1px] mt-1 text-black"
              type="text"
              placeholder="E.g. John"
            />
          </div>
          <div className="flex text-start justify-start flex-col w-full my-1">
            <label
              htmlFor="email"
              className="underline tracking-widest mb-1 ml-4"
            >
              Email Address
            </label>
            <input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="text-sm p-2 outline-none border-solid border-[#2196f3] border-[1px] mt-1 text-black"
              type="email"
              name="email"
              id=""
              placeholder="E.g. example@gamil.com"
            />
          </div>
          <div className="flex text-start justify-start flex-col w-full my-1">
            <label
              htmlFor="password"
              className="underline tracking-widest mb-1 ml-4"
            >
              Password
            </label>
            <input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="text-sm p-2 outline-none border-solid border-[#2196f3] border-[1px] mt-1 text-black"
              type="password"
              name="password"
              id="password"
              placeholder='E.g. JAa;903eujd"/)'
            />
          </div>
          <button className="p-2 bg-[#2196f3] flex items-center justify-center text-white w-full font-Roboto my-3 text-sm">
            {loading ? (
              <ClipLoader
                color={color}
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
        <h1 className="text-xs font-Roboto text-center my-2 font-light">
          Already have an Account?{" "}
          <Link className="ml-2 font-bold" to={"/login"}>
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
};

export default Register;
