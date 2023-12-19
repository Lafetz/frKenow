import {
  Avatar,
  Flex,
  Text,
  Image,
  Heading,
  Spinner,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import src from "../../assets/5.jpg";
import Withdraw from "./buttons/withdraw";
import Deposit from "./buttons/deposit";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
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
        <Link to="/">
          <Image
            boxSize="50px"
            objectFit="cover"
            src={logo}
            alt="jackpot banner"
          />{" "}
        </Link>
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
            fontSize={["sm", "md", "lg", "xl"]}
          >
            <Text height="max-content" as="b">
              {user.credit}
            </Text>

            <Text height="max-content" as="b">
              @{user.username}
            </Text>
          </Flex>
        )}
        <Avatar size={["sm", "md"]} name="Kola Tioluwani" src={src} />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <Deposit />
            <Withdraw />
            <MenuItem>
              <Link to="/transactions">Transactions</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
export default Header;
