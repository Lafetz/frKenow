import { Button, Tr, Td } from "@chakra-ui/react";
import { Transaction } from "../../../utils/types/data";
type Props = {
  transaction: Transaction;
};
const Request = ({ transaction }: Props) => {
  return (
    <Tr>
      <Td>{transaction.username}</Td>
      <Td>{new Date(transaction.timestamp).toDateString()}</Td>
      <Td>{transaction.amount} ETB</Td>
      <Td>{transaction.status}</Td>
      <Td>
        <Button>Approve</Button>
      </Td>
    </Tr>
  );
};
export default Request;
