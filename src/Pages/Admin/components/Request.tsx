import { Tr, Td } from "@chakra-ui/react";
import { Transaction } from "../../../utils/types/data";
import ApproveTransaction from "./approve";
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
        {transaction.status == "pending" && (
          <ApproveTransaction trans={transaction} />
        )}
      </Td>
    </Tr>
  );
};
export default Request;
