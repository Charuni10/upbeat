import React, { useState } from "react";
import { Box, Input, Flex, Text } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import Navbar from "../home/sidebar";
import "./chat.css";
import SidebarMobile from "../home/sidebarMobile";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const getBotResponse = async (query: string): Promise<string> => {
    const response = await fetch('https://upbeat-backup.onrender.com/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),  // Sending the input as JSON
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.response; // Adjust this based on the response structure you expect
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== "") {
      const newUserMessage: Message = {
        id: messages.length,
        text: inputText,
        isUser: true,
      };

      setMessages([...messages, newUserMessage]); // Add user message to state

      try {
        // Get response from the bot using fetch
        const botResponseText = await getBotResponse(inputText);

        const botResponse: Message = {
          id: messages.length + 1,
          text: botResponseText,
          isUser: false,
        };

        setMessages((prevMessages) => [...prevMessages, botResponse]); // Add bot response to state
      } catch (error) {
        console.error("Error fetching bot response:", error);
      }

      setInputText(""); // Clear input field
    }
  };

  return (
    <Box className="chat-container" overflow={"hidden"}>
      <Navbar />
      <SidebarMobile />
      <Box py={4} className="chat" overflowY={"scroll"} height={"93vh"}>
        <Box
          borderRadius="lg"
          p={4}
          boxShadow="sm"
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
          }}
          mt={50}
          className="chat1"
        >
          {messages.map((message) => (
            <Flex
              key={message.id}
              justify={message.isUser ? "flex-end" : "flex-start"}
              mb={10}
              className="text"
            >
              <Text
                borderRadius="20px"
                padding="10px 15px"
                maxW="70%"
                textAlign={message.isUser ? "right" : "left"}
                backgroundColor={message.isUser ? "#5995fd" : "#ccc"}
                color={message.isUser ? "white" : "#333"}
              >
                {message.text}
              </Text>
            </Flex>
          ))}
        </Box>
        <Flex
          mt={4}
          mb={10}
          pos="absolute"
          bottom={5}
          py={16}
          px={2}
          className="chatbox"
        >
          <Input
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            borderRadius="30px"
            border="1px solid #5995fd"
            padding="12px"
            fontSize="16px"
            outline="none"
            flex="1"
            mr={2}
            m={20}
            className="input"
          />
          <Box ml={-10} pr={20}>
            <SendIcon
              size={"2rem"}
              cursor="pointer"
              onClick={handleSendMessage}
              style={{ color: "#5995fd", marginTop: "30px" }}
            />
          </Box>
        </Flex>
        <Box
          fontSize={"x-small"}
          color={"gray"}
          pos={"absolute"}
          marginTop={1}
          bottom={1}
          py={17}
          className="intimate"
          backgroundColor={"#f4f4f4"}
        >
          I'm an AI chatbot using a machine learning model to generate responses.
          They're usually pretty accurate, but not perfect!
        </Box>
      </Box>
    </Box>
  );
};
