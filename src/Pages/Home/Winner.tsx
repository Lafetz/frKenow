import { Flex, ScaleFade, Text, useDisclosure } from "@chakra-ui/react";
import { Report } from "../../utils/types/data";
import { useEffect } from "react";

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
    <ScaleFade in={isOpen} transition={{ enter: { duration: 1 } }}>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        gap="15px"
        color="#693f62"
      >
        <Flex alignItems="center" gap="5px">
          <Text as="b">የጨዋታ ቁጥር:{reports[reportsI].gameno}</Text>

          <Text as="b">ምስል:{reports[reportsI].balls[reportI]}</Text>
          <Text as="b">@{reports[reportsI].winners[reportI]}</Text>
        </Flex>
        <Text as="b" textAlign="right">
          {reportI == 0
            ? reports[reportsI].first
            : reportI == 1
            ? reports[reportsI].second
            : reports[reportsI].third}
          ETB
        </Text>
      </Flex>
    </ScaleFade>
  );
};
export default Winner;
