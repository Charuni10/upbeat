import { useState, useEffect } from "react";
import {
  Heading,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";
import Nav from "./sidebar";
import "./home.css";
import img from "../static/home.png";
import { MessageSquareWarning, Star } from "lucide-react";
import SidebarMobile from "./sidebarMobile";
import { useNavigate } from "react-router";

export function Home() {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.clear();
    }, 1 * 60 * 60 * 1000);

    return () => clearTimeout(timeoutId);
  }, []);
  const handleRatingChange = (value: any) => {
    setRating(value);
  }
  const handleSubmit = () => {
    console.log("Rating:", rating);
    setRating(0);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home">
      <Nav />
      <SidebarMobile />
      <Heading pt={20} color={"darkblue"}>
        UPBEAT
      </Heading>
      <img src={img} alt="home" className="img" style={{ paddingTop: "40px" }} />
      <div className="bottom">
        <div>Feeling Stressed? Take a deep breath and open UPBEAT</div>
        <div>Find your moment of calm within chaos</div>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
      <Box position="fixed" bottom={4} right={4}>
        <Popover>
          <PopoverTrigger>
            <MessageSquareWarning cursor={"pointer"} size="35px" />
          </PopoverTrigger>
          <PopoverContent
            width={"4xs"}
            background={"white"}
            borderRadius={5}
            p={10}
            fontSize={"medium"}
          >
            <HStack>
              <PopoverHeader fontSize={"2xs"}>Give your feedback</PopoverHeader>
              <PopoverCloseButton
                w={"25px"}
                h={"20px"}
                border={"none"}
                background={"white"}
                alignSelf={"flex-end"}
                pb={10}
              />
            </HStack>
            <PopoverBody>
              <VStack>
                <Text> Rate Us</Text>
                <HStack>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      onClick={() => handleRatingChange(index + 1)}
                      color={index < rating ? "blue" : "black"}
                      fill={index < rating ? "blue" : "white"}
                      style={{ cursor: "pointer", marginLeft: "5px" }}
                    />
                  ))}
                </HStack>
                <button
                  onClick={handleSubmit}
                  style={{ marginTop: "10px", padding: "5px" }}
                >
                  Submit
                </button>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </div>
  );
}