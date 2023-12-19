import { Image, Stack } from "@chakra-ui/react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import { useEffect, useState } from "react";
const images = [banner1, banner2];
export const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentIndex == 1) {
        setCurrentIndex(0);
      } else if (currentIndex == 0) {
        setCurrentIndex(1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Stack width="100%" direction="row">
      <Image
        boxSize="100%"
        height="130px"
        objectFit="cover"
        src={images[currentIndex]}
        alt="jackpot banner"
      />
    </Stack>
  );
};
