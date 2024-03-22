import React, { useState } from "react";
import { Box, Input, VStack, Text } from "@chakra-ui/react";
import { SendIcon } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, isUser: true }]);
      // Here you can handle sending message to backend or any other logic
      setInputText("");
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4} h="100vh" justify="flex-end">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        flex="1"
        bg="gray.100"
        overflowY="auto"
        maxHeight="70vh"
        boxShadow="sm"
      >
        {messages.map((message, index) => (
          <Text
            key={index}
            textAlign={message.isUser ? "right" : "left"}
            fontStyle={message.isUser ? "italic" : "normal"}
          >
            {message.text}
          </Text>
        ))}
      </Box>
      <Box p={4} w="100%" display="flex" alignItems="center">
        <Input
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          borderRadius="50px"
          border={"2px solid blue"}
          padding={10}
          mr={2}
          w={"70%"}
        />
        <SendIcon
          size={"1.5rem"}
          cursor="pointer"
          onClick={handleSendMessage}
          color="#41C9E2"
        />
      </Box>
    </VStack>
  );
};
