import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Input, Button, VStack } from "@chakra-ui/react";
import MessageBubble from "./MessageBubble";
import ChatService from "../api/handler";
import { toast } from "../themes/defaultTheme";

export interface Message {
  text: string;
  sender: "user" | "bot";
  type: "text" | "chart" | "notification";
  metaData?: any;
}

const Chat: React.FC = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState("");

  const handleVisualize = async (query: string) => {
    setIsLoading(true);

    // call api
    const res = await ChatService.visualize(query, selectedDataSource);

    const fig_json = JSON.parse(res.fig_json);

    // @ts-ignore

    const botMessage: Message = {
      text: res.response,
      sender: "bot",
      type: "chart",
      metaData: {
        fig_json: fig_json,
      },
    };
    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setIsLoading(false);
  };

  // handle send message
  const handleSendMessage = async (query: string) => {
    setIsLoading(true);

    if (query.trim() === "") {
      setIsLoading(false);
      return;
    }

    const newMessage: Message = {
      text: query,
      sender: "user",
      type: "text",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    if (!selectedDataSource) {
      toast({
        title: "Please select a data source.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // call api
    const res = await ChatService.createChat(query, selectedDataSource);

    // @ts-ignore

    const botMessage = {
      text: res.response,
      sender: "bot",
      type: "text",
    };
    // @ts-ignore
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    setIsLoading(false);
  };

  useEffect(() => {}, [messages]);

  useEffect(() => {
    // Scroll to bottom when new message is added
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Flex flexDir={"row"} w={"100%"}>
      <Flex flexDir={"column"} w={"100%"} h={"100vh"} flexGrow={1}>
        <Box w="100%" h="100%" p={4} border="1px solid" borderColor="gray.200">
          <Flex direction="column" h="100%">
            <Box flex="1" overflowY="auto" mb={4} ref={messageContainerRef}>
              <VStack spacing={2} align="flex-start">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={index}
                    message={message}
                    onVisualize={handleVisualize}
                  />
                ))}

                {isLoading && (
                  <MessageBubble
                    message={{
                      text: "Thinking ...",
                      sender: "bot",
                      type: "notification",
                    }}
                  />
                )}
              </VStack>
            </Box>
            <Flex>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                mr={2}
              />
              <Button
                colorScheme="blue"
                onClick={() => handleSendMessage(input)}
                disabled={isLoading}
              >
                Send
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Chat;
