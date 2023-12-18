import { Flex, Icon, Text } from "@chakra-ui/react";
import Winner from "./Winner";

const Winners = () => {
  return (
    <Flex alignItems="center" flexDir="column" gap="5px">
      <Flex
        bg="#f9d61a"
        gap="10px"
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderRadius="xl"
        paddingY="5px"
      >
        <Text color="#1e3f2e" fontSize="x-large" as="b">
          WINNERS
        </Text>
        <Icon />
      </Flex>
      <Flex gap="5px" bg="#fef79d" flexDir="column" padding="10px">
        {[0, 1, 2, , 7, 8, 9, 5].map((x) => (
          <Winner key={x} />
        ))}
      </Flex>
    </Flex>
  );
};
export default Winners;
