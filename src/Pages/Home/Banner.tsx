import { Image, Stack } from "@chakra-ui/react";
import banner1 from "../../assets/banner/1.png"
import banner2 from "../../assets/banner/2.png"
import banner3 from "../../assets/banner/3.png"
import banner4 from "../../assets/banner/4.png"
import banner5 from "../../assets/banner/5.png"
import { useEffect, useState } from "react";

export const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {

      setCurrentBanner((prevBanner) => prevBanner<5?prevBanner+1:1);
    }, 3000); // Change the banner every 3 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentBanner]);

  return (
    <Stack width="100%" direction="row">
      {currentBanner === 1 && (
        <Image
          boxSize="100%"
          height="150px"
          objectFit="fill"
          src={banner1}
          alt="jackpot banner"
        />
      )}

      {currentBanner === 2 && (
        <Image
          boxSize="100%"
          height="150px"
          objectFit="fill"
          src={banner2}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 3 && (
        <Image
          boxSize="100%"
          height="150px"
          objectFit="fill"
          src={banner3}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 4 && (
        <Image
          boxSize="100%"
          height="150px"
          objectFit="fill"
          src={banner4}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 5 && (
        <Image
          boxSize="100%"
          height="150px"
          objectFit="fill"
          src={banner5}
          alt="jackpot banner"
        />
        )}
    </Stack>
  );
};
