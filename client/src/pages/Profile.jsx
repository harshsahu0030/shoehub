import { useContext, useEffect, useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { profile_data } from "../data/profile";
import MetaData from "../utils/MetaData";
import { useMutation } from "@tanstack/react-query";
import { logoutUserApi } from "../app/api/userApi";
import toast from "react-hot-toast";
import { AuthContext } from "../context/Authuser";

const Profile = () => {
  const backToTopHanlder = useBackToTop();
  const navigate = useNavigate();
  const { refetch } = useContext(AuthContext);

  //react queries
  const { mutate, isPending } = useMutation({
    mutationFn: logoutUserApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/`);
      refetch();
    },
  });

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={`Shoehub | Profile`}
        description={`User information, profile details`}
        keywords={`user info, user, profile`}
      />
      <div className="flex flex-col gap-3 mt-10 w-full md:w-[50%] m-auto">
        <h1 className="text-3xl font-semibold">Your Profile</h1>

        <hr className="border-b-2 border-lightGray/50" />

        <ul className="flex flex-col gap-2">
          {profile_data &&
            profile_data.links.map((item, i) => (
              <li
                key={i}
                className="capitalize text-lg font-medium p-4 border border-lightGray/60 rounded-lg hover:bg-lightGray/30 transition-all"
              >
                <Link
                  to={item.url}
                  className="flex items-center justify-between"
                >
                  {item.name}{" "}
                  <MdOutlineKeyboardArrowRight className="text-2xl" />
                </Link>
              </li>
            ))}

          <button
            className="capitalize text-lg font-medium p-4 border border-lightGray/60 rounded-lg hover:bg-red-400 transition-all flex justify-between items-center bg-red-300 cursor-pointer"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Logout <MdOutlineKeyboardArrowRight className="text-2xl" />
          </button>
        </ul>
      </div>
    </>
  );
};

export default Profile;
