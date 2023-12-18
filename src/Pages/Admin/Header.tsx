import {
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
const AdminHeader = () => {
  return (
    <Flex
      height="fit-content"
      justifyContent="space-between"
      padding="10px"
      alignItems="center"
      fontSize="larger"
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem command="⌘T">Reports</MenuItem>
          <MenuItem command="⌘T">Setting</MenuItem>
          <MenuItem icon={<AddIcon />} command="⌘T">
            New Tab
          </MenuItem>
        </MenuList>
      </Menu>
      <Flex gap="20px" alignItems="center">
        <Flex
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          color="#4f0321"
          gap="3px"
        >
          <Text height="max-content" as="b">
            Admin
          </Text>
        </Flex>
        <Button size="lg" bg="#4f0321" color="white">
          Sign out
        </Button>
      </Flex>
    </Flex>
  );
};
export default AdminHeader;
