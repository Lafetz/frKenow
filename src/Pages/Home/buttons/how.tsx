import {
    Avatar,

    Button,

    Flex,

    List,

    ListIcon,

    ListItem,

    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalOverlay,

    Text,

    useDisclosure,
    
  } from "@chakra-ui/react";
  import src from "../../../assets/how.gif";
import { CheckIcon } from "@chakra-ui/icons";
  
  const HowToPlay = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure();
   
    
    return (
      <>
        <Avatar size={["sm", "md"]} onClick={onOpen} name="how to play" src={src} />
        
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody paddingTop="50px">
            <Flex color="#103d4d" gap="5px" flexDir="column" alignItems="center">
            <Text  as="u" fontSize="3xl" textAlign="center">
              የአጨዋወት ዘዴ
            </Text>
            <List spacing={3} maxW="420px">
  <ListItem display='flex'>
    <ListIcon marginTop="5px" as={CheckIcon} color='green.500' />
    ከተደረደሩት ምስች ውስጥ እድለኛ ያደርገኛል ብለው ያሰቡትን ምስል በመምረጥ እናም ጨዋታው የሚጠይቀውን መደብ ተቀማጭ በማድረግ የጨዋታው አሸናፊ ይሁኑ
  </ListItem>
  <ListItem display='flex'>
    <ListIcon marginTop="5px" as={CheckIcon} color='green.500' />
    አንድ ተጫዋች በአንድ ጨዋታ የተለያዩ ምስሎችን በመያዝ
              የጨዋታው ተሳታፊ መሆን ይችላል
  </ListItem>
  <ListItem display='flex'>
    <ListIcon marginTop="5px" as={CheckIcon} color='green.500' />
    ገንዘብ ገቢ ለማድረግ ተቀማጭ የሚለውን በመጫን የሚፈልጉን የብር መጠን
              በማስገባት ከተዘረዘሩት የክፍያ አማራጮች (ቴሌብር፣ ሲቢብር …) ተጠቅሞ በማስገባት መጫወት ይችላሉ
  </ListItem>
  <ListItem display='flex'>
    <ListIcon marginTop="5px" as={CheckIcon} color='green.500' />
  
    ገንዘብ ወጪ ለማድረግ የሚፈልጉትን የክፍያ አማራጭ ይጠቀሙ፣ በመቀጠል ወጪ ለማድረግ የሚፈልጉትን የገንዘብ
              መጠን፣ አካውንት ቁጥር ወይም ስልክ ቁጥሮን በማስገባት ወጪ ያድርጉ
  </ListItem>
</List>
           
          </Flex>
            </ModalBody>
            
             <ModalFooter justifyContent="center">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
              እሺ
              </Button></ModalFooter> 
          </ModalContent>
        </Modal>
      </>
    );
  };
  export default HowToPlay;