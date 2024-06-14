import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import { database } from "../Firebase";
import { AuthContext } from "../context/context";
import { IChats } from "../models/chats.model";

function Chats() {
  const { authData } = useContext(AuthContext);

  const [messages, setMessages] = useState<IChats[] | null>(null);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onValue(ref(database, "messages"), (snapshot) => {
      if (snapshot.val()) {
        const sortedMessages: any = Object.values(snapshot.val()).sort(
          (date1: any, date2: any) => date1.sendAt - date2.sendAt
        );
        setMessages(sortedMessages);
      }
    });
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="chats-wrapper">
      <div className="chats-container">
        {messages && (
          <div className="chats">
            {messages.map((message: IChats) => {
              return (
                <div
                  className={`chat ${
                    message.senderEmail === authData?.email
                      ? "self-end"
                      : "self-start"
                  }`}
                  key={message.id}
                >
                  <p className="sender-name">{message.senderName}</p>
                  <p className="message">{message.message}</p>
                  <p className="timestamp">{`${new Date(
                    message.sendAt
                  ).getHours()} : ${
                    new Date(message.sendAt).getMinutes() < 9
                      ? `0${new Date(message.sendAt).getMinutes()}`
                      : new Date(message.sendAt).getMinutes()
                  }`}</p>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        )}
        {!messages && <div>No messages yet...</div>}
      </div>
    </div>
  );
}

export default Chats;
