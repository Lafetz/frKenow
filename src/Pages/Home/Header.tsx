import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Text,
  Image,
  Heading,
  useToast,
  Spinner,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { User } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";
import Withdraw from "./buttons/withdraw";
import Deposit from "./buttons/deposit";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
type Props = {
  user: any;
};
const Header = ({ user }: Props) => {
  return (
    <Flex
      height="fit-content"
      justifyContent="space-between"
      paddingX="5px"
      paddingY="10px"
      alignItems="center"
      fontSize="larger"
    >
      <Flex alignItems="center" gap="5px">
        <Image
          boxSize="50px"
          objectFit="cover"
          src={logo}
          alt="jackpot banner"
        />
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={["sm", "md", "lg", "xl"]}
          color="#704802"
          noOfLines={2}
        >
          Zewd Games
        </Heading>
      </Flex>
      <Flex gap="15px" alignItems="center">
        {!user && <Spinner />}
        {user && (
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            color="#4f0321"
            gap={[3, 1]}
            fontSize={["sm", "md", "lg", "xl"]}
          >
            <Text lineHeight="1rem" height="max-content" as="b">
              {user.credit}
            </Text>

            <Text lineHeight="1rem" height="max-content" as="b">
              @{user.username}
            </Text>
          </Flex>
        )}
        <Avatar
          size={["sm", "md"]}
          name="Kola Tioluwani"
          src="https://bit.ly/tioluwani-kolawole"
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>
              <Deposit />
            </MenuItem>
            <MenuItem>
              <Withdraw />
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
export default Header;
