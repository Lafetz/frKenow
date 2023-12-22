import {
  Button,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import AdminHeader from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
import { Transaction, User } from "../../utils/types/data";
import Request from "./components/Request";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const [requests, setRequests] = useState<Transaction[]>();
  const [transType, setTransType] = useState<string>("pending");
  const allTransaction = () => {
    setTransType("all");
  };
  const pendingTransaction = () => {
    setTransType("pending");
  };
  const approvedTransaction = () => {
    setTransType("approved");
  };
  const { socket } = useContext(SocketContext);
  const [user, setUser] = useState<User>();
  const toast = useToast();
  const navigate = useNavigate();
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
    socket.emit("requests", (res: AckEvent) => {
      console.log(res.payload);
      if (res.code == 200) {
        setRequests(res.payload);
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
      {user && (
        <Flex flexDir="column">
          <AdminHeader />
          <Flex justifyContent="center" flexDir="column" alignItems="center">
            <Flex padding="25px" justifyContent="center" gap="3px">
              <Button onClick={pendingTransaction}>Pending</Button>
              <Button onClick={approvedTransaction}>Approved</Button>
              <Button onClick={allTransaction}>All</Button>
            </Flex>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>Transactions</TableCaption>
                <Thead>
                  <Tr>
                    <Th>username</Th>
                    <Th>Date</Th>
                    <Th>Amount</Th>
                    <Th>Status</Th>
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {requests?.map((t) => {
                    if (transType === "all") {
                      return <Request key={t._id} transaction={t} />;
                    }
                    if (transType === "pending") {
                      return t.status === "pending" ? (
                        <Request key={t._id} transaction={t} />
                      ) : (
                        <></>
                      );
                    }
                    if (transType === "approved") {
                      return t.status === "approved" ? (
                        <Request key={t._id} transaction={t} />
                      ) : (
                        <></>
                      );
                    }
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export default Requests;
