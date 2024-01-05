import { Image, Stack } from "@chakra-ui/react";
import banner1 from "../../assets/banner/1.jpg"
import banner2 from "../../assets/banner/2.jpg"
import banner3 from "../../assets/banner/3.jpg"
import banner4 from "../../assets/banner/4.jpg"
import banner5 from "../../assets/banner/5.jpg"
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
          height= {{ base: "75px", sm: "75px", lg: "150px" }}
          objectFit="fill"
          src={banner1}
          alt="jackpot banner"
        />
      )}

      {currentBanner === 2 && (
        <Image
          boxSize="100%"
          height= {{ base: "75px", sm: "75px", lg: "150px" }}
          objectFit="fill"
          src={banner2}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 3 && (
        <Image
          boxSize="100%"
          height= {{ base: "75px", sm: "75px", lg: "150px" }}
          objectFit="fill"
          src={banner3}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 4 && (
        <Image
          boxSize="100%"
           height= {{ base: "75px", sm: "75px", lg: "150px" }}
          objectFit="fill"
          src={banner4}
          alt="jackpot banner"
        />
        )}
              {currentBanner === 5 && (
        <Image
          boxSize="100%"
           height= {{ base: "75px", sm: "75px", lg: "150px" }}
          objectFit="fill"
          src={banner5}
          alt="jackpot banner"
        />
        )}
    </Stack>
  );
};
