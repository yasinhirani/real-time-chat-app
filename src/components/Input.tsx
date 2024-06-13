import { ref, set } from "firebase/database";
import { FormEvent, useContext, useState } from "react";
import { database } from "../Firebase";
import { AuthContext } from "../context/context";
import { serverTimestamp } from "firebase/database";

function Input() {
  const { authData } = useContext(AuthContext);

  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    set(ref(database, `messages/${crypto.randomUUID()}`), {
      id: crypto.randomUUID(),
      message,
      senderEmail: authData?.email,
      senderName: authData?.name,
      sendAt: serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <div className="input-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            className="msg-input"
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="btn-send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Input;
