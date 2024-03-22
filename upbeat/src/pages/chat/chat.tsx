import React, { useState } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";

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
      <Box borderWidth="1px" borderRadius="lg" p={4} flex="1">
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
      <Box p={4} w="100%">
        <Input
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          p={10}
          borderRadius={"50px"}
          border={"2px solid black"}
          w="70%"
          mr={10}
        />
        <Button
          mt={2}
          onClick={handleSendMessage}
          p={10}
          borderRadius={"10px"}
          border={"2px solid black"}
          w={100}
        >
          Send
        </Button>
      </Box>
    </VStack>
  );
};
