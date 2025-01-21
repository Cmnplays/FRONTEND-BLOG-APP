import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { LoadingButton } from "../index.js";

const LogOutBtn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    setLoading(true);
    authService.logout().then(() => {
      dispatch(logout());
      setLoading(false);
    });
  };
  return (
    <>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={handleLogout}
      >
        Logout
      </button>
      <LoadingButton loading={loading} />
    </>
  );
};

export default LogOutBtn;
