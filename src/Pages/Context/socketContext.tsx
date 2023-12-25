import { useToast } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { Socket, io } from "socket.io-client";

// import * as io from "socket.io-client";
type SocketConnection = {
  auth: boolean;

  socket: Socket;
};

//@ts-ignore
const SocketContext = createContext<SocketConnection>({});

const SocketProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<boolean>(true);
  const toast = useToast();
  let token;
  try {
    //@ts-ignore
    token = JSON.parse(localStorage.getItem("token"));
  } catch (err) {
    return <Navigate to="/sigin" />;
  }

  const socket = io("https://daclan.onrender.com", {
    auth: { token: token },
  });

  useEffect(() => {
    const onConnect = () => {};

    const onConnectError = (err: any) => {
      if (err && err.message === "unauthorized") {
        setAuth(false);
      } else {
        toast({
          title: "connection error",
          description: "unable to connect to server",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    };
    try {
      socket.on("connect_error", onConnectError);
      socket.on("connect", onConnect);
    } catch (err) {
      toast({
        title: "connection error",
        description: "unable to connect to server",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    return () => {};
  }, []);

  return (
    <SocketContext.Provider value={{ auth: auth, socket: socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export { SocketContext, SocketProvider };
