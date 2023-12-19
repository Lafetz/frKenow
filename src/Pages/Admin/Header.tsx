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

import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
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
          <MenuItem>
            <Link to={"/admin/reports"}>Reports</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"/admin/new"}>New Game</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"/admin/requests"}>Requests</Link>
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
