import { Box, Text, IconButton, Avatar } from "@chakra-ui/react";
import Plot from "react-plotly.js";
import { FaChartBar } from "react-icons/fa";

interface MessageBubbleProps {
  message: Message;
  onVisualize?: (text: string) => void;
}

export interface Message {
  text: string;
  sender: "user" | "bot";
  type: "text" | "chart" | "notification";
  metaData?: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onVisualize,
}) => {
  return (
    <Box
      p={2}
      borderRadius="md"
      bgColor={message.sender === "user" ? "" : "gray.100"}
      color={message.sender === "user" ? "" : "gray.800"}
      alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
      display="flex"
      gap={4}
      alignItems="center"
    >
      {/* Avatar */}
      <Avatar
        name={message.sender}
        bg="gray.300"
        color="gray.600"
        size={"sm"}
      />

      <Box
        flex="1"
        display="flex"
        flexDirection="row"
        gap={4}
        alignItems="center"
      >
        <Text fontSize="sm">{message.text}</Text>

        {message.type === "chart" ? (
          <Plot
            data={message.metaData.fig_json.data}
            layout={message.metaData.fig_json.layout}
            // Add any necessary props here
          />
        ) : (
          // Render the chart icon if no json_data is available
          message.sender === "bot" &&
          message.type === "text" && (
            <IconButton
              aria-label="visualize"
              icon={<FaChartBar />}
              onClick={() => onVisualize && onVisualize(message.text)}
              size={"sm"}
            />
          )
        )}
      </Box>
    </Box>
  );
};

export default MessageBubble;
