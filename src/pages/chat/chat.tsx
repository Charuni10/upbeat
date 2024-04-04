import React, { useState } from "react";
import { Box, Input, Flex, Text, Spacer } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";
import Navbar from "../home/sidebar";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newUserMessage: Message = {
        id: messages.length,
        text: inputText,
        isUser: true,
      };
      const botResponse: Message = {
        id: messages.length + 1,
        text: "Welcome! How can I assist you?",
        isUser: false,
      };
      setMessages([...messages, newUserMessage, botResponse]);
      setInputText("");
    }
  };

  return (
    <>
      <Navbar />
      <Box p={4} h="100vh" bg="#f4f4f4">
        {/* Set full screen height */}
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          overflowY="auto"
          maxHeight="70vh"
          boxShadow="sm"
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
          }}
        >
          {messages.map((message) => (
            <Flex
              key={message.id}
              justify={message.isUser ? "flex-end" : "flex-start"}
              mb={2}
            >
              <Text
                borderRadius="20px"
                padding="10px 15px"
                maxW="70%"
                textAlign={message.isUser ? "right" : "left"}
                backgroundColor={message.isUser ? "#41c9e2" : "#ccc"}
                color={message.isUser ? "white" : "#333"}
              >
                {message.text}
              </Text>
            </Flex>
          ))}
        </Box>
        <Flex mt={4} pos="absolute" insetX="0" bottom="0" py={4} px={2} ml={60}>
          {/* Positioned at bottom */}
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
            border="1px solid #41c9e2"
            padding="12px"
            fontSize="16px"
            outline="none"
            flex="1"
            mr={2}
            m={20}
          />
          <Box ml={-10} mr={10}>
            <SendIcon
              size={"1.8rem"}
              cursor="pointer"
              onClick={handleSendMessage}
              style={{ color: "#41c9e2", marginTop: "35px" }}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
