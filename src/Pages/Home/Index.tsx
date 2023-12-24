import { Flex, useToast, Spinner } from "@chakra-ui/react";
import { Game } from "./Game";

import Winners from "./Winners";
import Header from "./Header";
import { Banner } from "./Banner";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { User } from "../../utils/types/data";
import { AckEvent, GameStatus } from "../../utils/types/socketEvents";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [user, setUser] = useState<User>();
  const [status, setStatus] = useState<GameStatus>();
  useEffect(() => {
    socket.emit("user", (res: AckEvent) => {
      if (res.code == 200) {
        setUser(res.payload);
      } else if (res.code == 404) {
        navigate("/signin");
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
    <Flex paddingX="10px" flexDir="column">
      <Header user={user} />
      <Banner />
      <Flex
        paddingY="10px"
        justifyContent="space-around"
        flexWrap="wrap-reverse"
      >
        <Winners status={status} />
        {user && (
          <Game
            user={user}
            setUser={setUser}
            status={status}
            setStatus={setStatus}
          />
        )}
        {!user && <Spinner alignSelf="center" size="xl" />}
      </Flex>
    </Flex>
  );
};
export default Home;
