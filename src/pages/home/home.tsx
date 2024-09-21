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
  Text,
  HStack,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Nav from "./sidebar";
import "./home.css";
import { MessageSquareWarning, Star } from "lucide-react";
import SidebarMobile from "./sidebarMobile";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from "../static/images/1.jpg";
import img2 from "../static/images/2.jpg";
import img3 from "../static/images/3.jpg";
import img4 from "../static/images/4.jpg";
import img5 from "../static/images/5.jpg";
import { DailyQues } from "./dailyques";

export function Home() {
  const [rating, setRating] = useState(0);
  const [items, setItems] = useState<
    { quote: string; author: string; imageUrl: string }[]
  >([]);
  const [loadingQuotes, setLoadingQuotes] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    adaptiveHeight: true,
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "lnEDx5cxQetDXeJ9cZvyc7QtbNmzHu754Hp10TZI",
        },
      });
      return response.json();
    };

    const fetchItems = async () => {
      try {
        const imageUrls = [img1, img2, img3, img4, img5];
        const quotesPromises = imageUrls.map(() => fetchQuote());
        const quotesArray = await Promise.all(quotesPromises);

        const combinedItems = imageUrls.map((imageUrl, index) => ({
          imageUrl,
          quote: quotesArray[index]?.[0]?.quote || "No quote available.",
          author: quotesArray[index]?.[0]?.author || "Unknown",
        }));

        setItems(combinedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingQuotes(false);
      }
    };

    fetchItems();
  }, []);

  const handleRatingChange = (value: any) => {
    setRating(value);
  };
  const handleSubmit = () => setRating(0);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 20) {
      setIsFormVisible(true);
      setIsModalOpen(true); // Open the modal if it's after 8 PM
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <Nav />
      <SidebarMobile />
      <Heading pt={5} color={"darkblue"}>
        UPBEAT
      </Heading>
      <Box className="slider-container">
        <Slider {...settings} adaptiveHeight>
          {items.map((item, index) => (
            <Box key={index} textAlign="center" p={5}>
              <Box display={"flex"} justifyContent={"center"}>
                <img
                  src={item.imageUrl}
                  alt={`Random ${index + 1}`}
                  className="slider-img"
                  height={"300px"}
                  width={"400px"}
                  style={{
                    border: "1px solid white",
                    borderRadius: "20px",
                  }}
                />
              </Box>
              {loadingQuotes ? (
                <Text fontSize="xl" fontStyle="italic" pt={10}>
                  Loading quote...
                </Text>
              ) : (
                <Text fontStyle="italic" pt={10}>
                  "{item.quote}"
                </Text>
              )}
              <Text fontWeight="bold" textAlign="right">
                - {loadingQuotes ? "Loading..." : item.author}
              </Text>
            </Box>
          ))}
        </Slider>
      </Box>
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Daily Questions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DailyQues isPopup />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
