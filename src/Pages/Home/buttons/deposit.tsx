import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const Deposit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem onClick={onOpen}>Deposit</MenuItem>
      {/* <Button size="md" bg="#4f0321" color="white" onClick={onOpen}>
        Deposit
      </Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px"></ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green">Deposit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Deposit;
