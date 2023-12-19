import {
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Header from "../Home/Header";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { Transaction, User } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";

const Transactions = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [user, setUser] = useState<User>();
  const [transactions, setTransactions] = useState<Transaction[]>();
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
  useEffect(() => {
    socket.emit("user_transactions", (res: AckEvent) => {
      console.log(res);
      if (res.code == 200) {
        setTransactions(res.payload);
        console.log();
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
    <Flex paddingX="25px" flexDir="column">
      <Header user={user} />
      <Flex
        w="100%"
        maxW="md"
        paddingTop="50px"
        justifyContent="center"
        alignSelf="center"
        flexDir="column"
        alignItems="center"
      >
        <Heading
          paddingBottom="25px"
          w="fit-content"
          as="h2"
          size="md"
          noOfLines={1}
        >
          user's Transactions
        </Heading>
        <Flex paddingTop="10px" justifyContent="center" flexDir="column">
          <TableContainer>
            <Table variant="simple">
              <TableCaption>Transactions</TableCaption>
              <Thead>
                <Tr>
                  <Th>Withdrawl</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions?.map((t) => {
                  return (
                    <Tr>
                      <Td>{new Date(t.timestamp).toDateString()}</Td>
                      <Td>{t.amount} ETB</Td>
                      <Td>{t.status}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Transactions;
