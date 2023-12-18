import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
type Props = {
  timer: number;
};
const Timer = ({ timer }: Props) => {
  const [counter, setCounter] = useState(timer);
  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return <Box>17:20</Box>;
};
