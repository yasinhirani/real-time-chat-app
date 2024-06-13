import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import { database } from "../Firebase";
import { AuthContext } from "../context/context";

function Chats() {
  const { authData } = useContext(AuthContext);

  const [messages, setMessages] = useState<any>(null);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onValue(ref(database, "messages"), (snapshot) => {
      if (snapshot.val()) {
        const sortedMessages = Object.values(snapshot.val()).sort(
          (a: any, b: any) => a.sendAt - b.sendAt
        );
        setMessages(sortedMessages);
        if (messageEndRef.current) {
          messageEndRef.current.scrollIntoView();
        }
      }
    });
  }, []);

  return (
    <div className="chats-wrapper">
      <div className="chats-container">
        {messages && (
          <div className="chats">
            {messages.map((message: any) => {
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
                  ).getHours()} : ${new Date(message.sendAt).getMinutes()}`}</p>
                </div>
              );
            })}
          </div>
        )}
        {!messages && <div>No messages yet...</div>}
      </div>
      <div ref={messageEndRef} />
    </div>
  );
}

export default Chats;
