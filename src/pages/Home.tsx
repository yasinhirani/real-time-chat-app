import Chats from "../components/Chats";
import Header from "../components/Header";
import Input from "../components/Input";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Header />
      <Chats />
      <Input />
    </div>
  );
}

export default Home;
