import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Send as SendIcon, AddReaction } from "@mui/icons-material";
import { Socket } from "socket.io-client";
import { IUser } from "../../../../interfaces/user.interface";
import { IMessage } from "../../../../interfaces/message.interface";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface ChatMessageProps {
  socket: Socket;
  user: IUser;
}

function ChatMessage({ socket, user }: ChatMessageProps) {
  const [message, setMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState<IMessage[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const sendMessage = () => {
    socket.emit("sendMessage", {
      author: user.username,
      idUser: user.id,
      message: message,
    });
    setMessage("");
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };

  useEffect(() => {
    socket.on("previousMessages", (messages) => {
      setPreviousMessage(messages);
    });
  }, [socket]);

  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        padding={2}
        borderTop="1px solid #ccc"
        bgcolor="#fff"
        zIndex={1000}
      >
        <Grid container mb={2}>
          <Grid item sm={12}>
            {previousMessage.map((msg: any) => (
              <Box
                key={msg.id}
                display="flex"
                justifyContent={
                  msg.idUser === user.id ? "flex-end" : "flex-start"
                }
                mb={1}
                alignSelf={msg.idUser === user.id ? "flex-end" : "flex-start"}
                maxWidth="100%"
              >
                <Box
                  bgcolor={msg.idUser === user.id ? "#dcf8c6" : "#f3f3f3"}
                  color={msg.idUser === user.id ? "#000" : "#333"}
                  py={1}
                  px={2}
                  borderRadius={8}
                >
                  <strong>{msg.author}</strong>: {msg.message}
                </Box>
              </Box>
            ))}
          </Grid>
        </Grid>
        <Grid container alignItems="center" spacing={1}>
          <Grid item sm={11}>
            <OutlinedInput
              fullWidth
              placeholder="Digite uma mensagem"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    edge="end"
                  >
                    <AddReaction />
                  </IconButton>
                  <Box
                    position="absolute"
                    bottom="64px"
                    right="0"
                    zIndex={1001}
                  >
                    {showEmojiPicker && (
                      <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                    )}
                  </Box>
                </InputAdornment>
              }
              label="Password"
            />
          </Grid>
          <Grid item sm={1}>
            <Button
              onClick={sendMessage}
              variant="contained"
              size="large"
              disabled={message === ""}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default ChatMessage;
