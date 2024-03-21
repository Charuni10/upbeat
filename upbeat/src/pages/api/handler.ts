import axios from "axios";

export const ENDPOINT = {
  CHAT: "chat",
  VISUALIZE: "visualize",
  QUESTIONS: "questions",
};

export const AXIOS_CLIENT = axios.create({
  baseURL: "http://52.179.95.166:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

class ChatService {
  static createChat = async (query: string, selectedDataSource: string) => {
    const { data } = await AXIOS_CLIENT.post(
      ENDPOINT.CHAT + `/${selectedDataSource}`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          query,
        },
      }
    );
    return data;
  };

  static visualize = async (query: string, selectedDataSource: string) => {
    const { data } = await AXIOS_CLIENT.post(
      ENDPOINT.VISUALIZE + `/${selectedDataSource}`,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          query,
        },
      }
    );
    return data;
  };

  static getPrompts = async (dataSource: string) => {
    const { data } = await AXIOS_CLIENT.post(
      ENDPOINT.QUESTIONS + `/${dataSource}`
    );
    return data;
  };
}

export default ChatService;
