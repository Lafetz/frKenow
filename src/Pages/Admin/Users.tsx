import { Flex, Heading, useToast } from "@chakra-ui/react";
import AdminHeader from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { User } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";
import { useNavigate } from "react-router-dom";
import UserComponent from "./components/user";

const Users = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>();
  useEffect(() => {
    socket.emit("user", (res: AckEvent) => {
      if (res.code == 200) {
        setUser(res.payload);
        if (!res.payload.isAdmin) {
          navigate("/");
        }
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
  useEffect(() => {
    socket.emit("users", (res: AckEvent) => {
      console.log(res);
      if (res.code == 200) {
        setUsers(res.payload);
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
    <>
      {user && (
        <Flex flexDir="column">
          <AdminHeader />
          <Flex paddingY="25px" gap="15px" flexDir="column" alignItems="center">
            <Heading
              as="h1"
              fontWeight="bold"
              fontSize={["sm", "md", "lg", "xl"]}
              noOfLines={2}
            >
              Users
            </Heading>
            {users?.map((u) => {
              //@ts-ignore
              return <UserComponent user={u} />;
            })}
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default Users;
