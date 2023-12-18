import { useContext, useEffect } from "react";
import { SocketContext } from "../Context/socketContext";
import { useToast } from "@chakra-ui/react";
type ErrorEvent = {
  title: string;
  description: string;
};
export const ErrorEvent = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  useEffect(() => {
    socket.on("error_emit", (err: ErrorEvent) => {
      toast({
        title: err.title,
        description: err.description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
  }, []);

  return <></>;
};
