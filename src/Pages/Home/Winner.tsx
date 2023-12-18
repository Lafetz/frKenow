import { Avatar, Flex, Text } from "@chakra-ui/react";

const Winner = () => {
  return (
    <Flex alignItems="center" gap="15px" color="#693f62">
      <Flex alignItems="center" gap="5px">
        <Avatar
          size="md"
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
        />
        <Text as="b">0932****63ETB</Text>
      </Flex>
      <Text as="b">6000ETB</Text>
    </Flex>
  );
};
export default Winner;
