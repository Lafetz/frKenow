import { Flex, Text } from "@chakra-ui/react";
import RemoveUser from "./removeUser";
import { User } from "../../../utils/types/data";
import AddCredit from "./addCredit";

type Props = {
  user: User;
};

const UserComponent = ({ user }: Props) => {
  return (
    <>
      <Flex
        border="1px solid #704802"
        borderRadius="md"
        padding="5px"
        justifyContent="space-between"
        gap="7px"
        w={[350, 450]}
      >
        <Flex flexDir="column" alignItems="center" gap={[2, 3]}>
          <Text w="100%" textAlign="left" as="b">
            Phone:{user.number}
          </Text>
          <Text w="100%" textAlign="left" as="b">
            username:{user.username}
          </Text>
          <Text w="100%" textAlign="left" as="b">
            cedits:{user.credit}
          </Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" gap={[3, 4]}>
          <AddCredit username={user.username} />
          <RemoveUser username={user.username} />
        </Flex>
      </Flex>
    </>
  );
};
export default UserComponent;
