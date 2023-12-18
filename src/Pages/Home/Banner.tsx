import { Box, Image, Stack } from "@chakra-ui/react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
export const Banner = () => {
  return (
    <Stack width="100%" direction="row">
      <Image
        boxSize="50%"
        height="100px"
        objectFit="cover"
        src={banner1}
        alt="jackpot banner"
      />
      <Image
        boxSize="50%"
        height="100px"
        objectFit="cover"
        src={banner2}
        alt="jackpot banner"
      />
    </Stack>
  );
};
