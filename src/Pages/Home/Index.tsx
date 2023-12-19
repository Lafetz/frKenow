import { Flex, useToast, Spinner } from "@chakra-ui/react";
import { Game } from "./Game";

import Winners from "./Winners";
import Header from "./Header";
import { Banner } from "./Banner";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { User } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";
const Home = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    socket.emit("user", (res: AckEvent) => {
      if (res.code == 200) {
        setUser(res.payload);
      } else {
        toast({
          title: "server error",
          description: "unable to connect to server",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }, []);
  return (
    <Flex paddingX="15px" flexDir="column">
      <Header user={user} />
      <Banner />
      <Flex
        paddingY="10px"
        justifyContent="space-around"
        flexWrap="wrap-reverse"
      >
        <Winners />
        {user && <Game user={user} setUser={setUser} />}
        {!user && <Spinner alignSelf="center" size="xl" />}
      </Flex>
    </Flex>
  );
};
export default Home;
