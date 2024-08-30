import { createContext, useLayoutEffect, useState } from "react";
import propTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { loadUserApi } from "../app/api/userApi";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [isUser, setIsUser] = useState(false);

  const { isSuccess, data, refetch, error, isError, isLoading } = useQuery({
    queryKey: ["load-user"],
    queryFn: loadUserApi,
    refetchOnWindowFocus: false,
  });

  useLayoutEffect(() => {
    if (isSuccess) {
      setCurrentUser(data.data);
      setIsUser(true);
    }

    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isSuccess, data, isError, error]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isUser,
        refetch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthUserProvider.propTypes = {
  children: propTypes.array,
};
