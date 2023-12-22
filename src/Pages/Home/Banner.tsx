import { Image, Stack } from "@chakra-ui/react";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import { useEffect, useState } from "react";

export const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner % 2) + 1);
    }, 3000); // Change the banner every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentBanner]);

  return (
    <Stack width="100%" direction="row">
      {currentBanner === 1 && (
        <Image
          boxSize="100%"
          height="130px"
          objectFit="cover"
          src={banner1}
          alt="jackpot banner"
        />
      )}

      {currentBanner === 2 && (
        <Image
          boxSize="100%"
          height="130px"
          objectFit="cover"
          src={banner2}
          alt="jackpot banner"
        />
      )}
    </Stack>
  );
};
