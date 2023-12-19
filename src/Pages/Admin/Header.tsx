import {
  Button,
  Flex,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
  Image,
  Heading,
  Center,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        height="fit-content"
        justifyContent="space-around"
        padding="10px"
        alignItems="center"
        fontSize="larger"
      >
        <Button
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
          onClick={onOpen}
        >
          Open
        </Button>
        <Flex
          justifyContent="center"
          alignItems="center"
          color="#4f0321"
          gap="5px"
        >
          <Text height="max-content" as="b">
            Admin
          </Text>
          <Button size="md" bg="#4f0321" color="white">
            Sign out
          </Button>
        </Flex>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Center>
              <Image
                boxSize="50px"
                objectFit="cover"
                src={logo}
                alt="jackpot banner"
              />
            </Center>

            <Center>
              <Heading
                as="h1"
                fontWeight="bold"
                fontSize={["sm", "md", "lg", "xl"]}
                color="#704802"
                noOfLines={2}
              >
                Zewd Games
              </Heading>
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column" gap={[25, 10]}>
              <Button>
                <Link to={"/admin/reports"}>Reports</Link>
              </Button>
              <Button>
                <Link to={"/admin/new"}>New Game</Link>
              </Button>
              <Button>
                {" "}
                <Link to={"/admin/requests"}>Requests</Link>
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default AdminHeader;
