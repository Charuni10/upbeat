import React, { useState, useEffect } from "react";
import { Box, Text, Input, Button, Link as ChakraLink } from "@chakra-ui/react";
import "../chat/chat.css";

const messages = [
  {
    author: "loading",
    body: "...",
    timeout: 0,
  },
  {
    author: "bot",
    body: "Hello",
    timeout: 800,
  },
  {
    author: "bot",
    body: "Follow the white rabbit...",
    timeout: 1500,
  },
  {
    author: "bot",
    body: "Ach i'm kidding, it's me, Paul",
    timeout: 3000,
  },
  {
    author: "bot",
    body: "What's up?",
    timeout: 4000,
  },
  {
    author: "bot",
    body: [
      {
        url: "/blog/",
        text: "Blog",
      },
      {
        url: "https://codepen.io/onefastsnail",
        text: "Codepen",
      },
      {
        url: "https://github.com/onefastsnail",
        text: "Github",
      },
    ],
    timeout: 5000,
  },
];

const responses = [
  "This bot silly",
  "No really, its a gimic, quickly made in my Codepen",
  [
    "Ok here is a joke...",
    "When Alexander Graham Bell invented the telephone he had three missed calls from Chuck Norris",
  ],
  [
    "Want another? Ok last one...",
    "Chuck Norris can win a game of Connect 4 with 3 moves",
  ],
  "I'm out, good bye.",
];

interface Message {
  author: string;
  body: string | Array<{ url: string; text: string }>;
}

const Message: React.FC<{ data: Message }> = ({ data }) => {
  const { author, body } = data;

  let finalBody;

  if (Array.isArray(body)) {
    finalBody = body.map((item, index) => {
      return (
        <ChakraLink href={item.url} key={index} mr={2}>
          {item.text}
        </ChakraLink>
      );
    });
  } else {
    finalBody = <Text>{body}</Text>;
  }

  return (
    <Box className={`c-chat__item c-chat__item--${author}`}>{finalBody}</Box>
  );
};

export const Chat: React.FC = () => {
  const [messagesState, setMessagesState] = useState<Message[]>([]);
  const [responsesIndex, setResponsesIndex] = useState<number>(0);

  useEffect(() => {
    demo();
  }, []);

  const addMessage = (item: Message) => {
    setMessagesState([...messagesState, item]);

    setTimeout(() => {
      const items = document.querySelectorAll("div");
      const lastItem = items[items.length - 1] as HTMLElement;
      document.querySelector(".c-chat__list")!.scrollTop =
        lastItem.offsetTop + lastItem.offsetHeight;
    }, 100);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = e.currentTarget.querySelector("input") as HTMLInputElement;

    addMessage({
      author: "human",
      body: input.value,
    });

    mockReply();

    input.value = "";
  };

  const demo = () => {
    setMessagesState([]);
    setResponsesIndex(0);

    messages.forEach((item, index) => {
      setTimeout(() => addMessage(item), item.timeout);
    });

    setTimeout(() => {
      setMessagesState(messagesState.slice(1));
    }, 700);
  };

  const mockReply = () => {
    const response = responses[responsesIndex];

    if (response) {
      setResponsesIndex(responsesIndex + 1);

      if (Array.isArray(response)) {
        response.forEach((item, index) => {
          setTimeout(
            () => addMessage({ author: "bot", body: item }),
            600 + 500 * index
          );
        });
      } else {
        setTimeout(() => addMessage({ author: "bot", body: response }), 600);
      }
    }
  };

  return (
    <Box className="c-chat">
      <Box className="c-chat__list">
        {messagesState.map((message, index) => (
          <Message key={index} data={message} />
        ))}
      </Box>
      <form className="c-chat__form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="input"
          placeholder="Type your message here..."
          autoFocus
          autoComplete="off"
          isRequired
        />
        <Button type="submit">Send</Button>
      </form>
    </Box>
  );
};
