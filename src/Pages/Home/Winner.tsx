import { Avatar, Flex, ScaleFade, Text, useDisclosure } from "@chakra-ui/react";
import { Report } from "../../utils/types/data";
import { useEffect } from "react";
import src from "../../assets/5.jpg";
type Props = {
  reportsI: number;
  reportI: number;
  reports: Report[];
};
const Winner = ({ reportI, reportsI, reports }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  useEffect(() => {
    onToggle();
  }, []);
  return (
    <ScaleFade
      in={isOpen}
      transition={{ exit: { delay: 2 }, enter: { duration: 0.5 } }}
    >
      <Flex alignItems="center" gap="15px" color="#693f62">
        <Flex alignItems="center" gap="5px">
          <Avatar size="md" name="profile" src={src} />
          <Text as="b">@{reports[reportsI].winners[reportI]}</Text>
        </Flex>
        <Text as="b">
          {reportI == 0
            ? reports[reportsI].first
            : reportI == 1
            ? reports[reportsI].second
            : reports[reportsI].third}{" "}
          ETB
        </Text>
      </Flex>
    </ScaleFade>
  );
};
export default Winner;
