import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
} from "@chakra-ui/react";
import AdminHeader from "./Header";
const Reports = () => {
  return (
    <Flex flexDir="column">
      <AdminHeader />

      <Flex gap="10px" flexWrap="wrap" alignSelf="center">
        <Card maxW="300px">
          <CardHeader>
            <Heading size="md">STAKE</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card maxW="300px">
          <CardHeader>
            <Heading size="md">STAKE</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        <Card maxW="300px">
          <CardHeader>
            <Heading size="md"> PROFIT</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Collected Fees</StatLabel>
              <StatNumber>£0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 28</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};
export default Reports;
