import { Center, Td, Text, Tr } from "@chakra-ui/react";
import { Report } from "../../utils/types/data";

import { texts } from "../../utils/game/images";

type Props = {
  reportsI: number;
  reportI: number;
  reports: Report[];
};
const Winner = ({ reportI, reportsI, reports }: Props) => {
  // const { isOpen, onToggle } = useDisclosure();
  // useEffect(() => {
  //   onToggle();
  // }, []);
  return (
    <Tr key={`${reportI} ${reports}`}>
      <Td style={{ paddingRight: "3px", paddingLeft: "3px" }}>
        <Text as="b" color="#693f62" textAlign="right">
          {reportI == 0 ? 1 : reportI == 1 ? 2 : 3}ኛ
        </Text>
      </Td>
      <Td style={{ paddingRight: "3px", paddingLeft: "3px" }}>
        <Center>
          <Text color="#1e3f2e" as="b">
            #{reports[reportsI].gameno}
          </Text>
        </Center>
      </Td>
      <Td style={{ paddingRight: "3px", paddingLeft: "3px" }}>
        <Center>
          <Text color="#1e3f2e" as="b">
            {texts[reports[reportsI].balls[reportI] - 1]}
          </Text>
        </Center>
      </Td>
      <Td style={{ paddingRight: "3px", paddingLeft: "3px" }}>
        <Center>
          <Text color="#1e3f2e" as="b">
            @{reports[reportsI].winners[reportI]}
          </Text>
        </Center>
      </Td>
      <Td style={{ paddingRight: "3px", paddingLeft: "3px" }}>
        <Center>
          <Text color="#1e3f2e" as="b" textAlign="right">
            {reportI == 0
              ? reports[reportsI].first
              : reportI == 1
              ? reports[reportsI].second
              : reports[reportsI].third}
          </Text>
        </Center>{" "}
      </Td>
    </Tr>
  );
};
export default Winner;
