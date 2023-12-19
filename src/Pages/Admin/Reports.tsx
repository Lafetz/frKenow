import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stat,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import AdminHeader from "./Header";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
import { Report, User } from "../../utils/types/data";
import { useNavigate } from "react-router-dom";
const Reports = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [total, setTotal] = useState(0);
  const [payout, setPayout] = useState(0);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
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
    socket.emit("report", (res: AckEvent) => {
      if (res.code == 200) {
        let t = 0;
        let p = 0;
        res.payload.map((r: Report) => {
          t += r.bet * 30;
          p = r.first + r.second + r.third;
        });
        setTotal(t);
        setPayout(p);
      } else {
        toast({
          title: "Error",
          description: "internal server error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  }, []);
  return (
    <>
      {!user && <Spinner />}
      {user && (
        <Flex flexDir="column">
          <AdminHeader />

          <Flex gap="10px" flexWrap="wrap" alignSelf="center">
            <Card maxW="300px">
              <CardHeader>
                <Heading size="md">STAKE</Heading>
              </CardHeader>
              <CardBody>
                <Stat>{total}</Stat>
              </CardBody>
            </Card>
            <Card maxW="300px">
              <CardHeader>
                <Heading size="md">PAYOUT</Heading>
              </CardHeader>
              <CardBody>
                <Stat>{payout}</Stat>
              </CardBody>
            </Card>
            <Card maxW="300px">
              <CardHeader>
                <Heading size="md">PROFIT</Heading>
              </CardHeader>
              <CardBody>
                <Stat>{total - payout}</Stat>
              </CardBody>
            </Card>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default Reports;
