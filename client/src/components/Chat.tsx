import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface Messages {
  message: string;
}
const Chat = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<string[]>([]);

  const room = localStorage.getItem("roomId");
  // console.log(room);

  const { register, handleSubmit, reset } = useForm<Messages>();

  const handleSend = ({ message }: Messages) => {
    const sendData = {
      type: "chat",
      payload: {
        message: message,
      },
    };
    socket?.send(JSON.stringify(sendData));
    // console.log(message);
    reset();
  };
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    setSocket(ws);

    ws.onopen = () => {
      if (room) {
        ws.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomId: room,
            },
          })
        );
      }
    };

    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
      // alert(e.data);
    };

    return () => {
      ws.close();
    };
  }, [room]);

  // console.log(messages);
  return (
    <div className="flex flex-col gap-4 w-[550px] h-[600px] border border-neutral-800 rounded-lg px-6 py-4">
      <div
        className="w-full py-2 flex flex-col gap-2
        "
      >
        <h1 className="flex gap-2 font-semibold text-2xl items-center">
          <MessageCircle size={26} /> Real Time Chat
        </h1>
        <p className="text-neutral-400 font-medium text-sm">
          A simple chat app
        </p>
      </div>

      <div className="w-full bg-neutral-800 rounded-lg flex py-2 items-center justify-between px-3 text-xs font-medium text-neutral-400">
        {room && <h1>Room code: {room}</h1>}
        {/* <h1>Room code: 23423</h1> */}
      </div>

      {/* Chat div */}
      <div className="w-full flex-1 border border-neutral-800 rounded-lg overflow-y-auto flex-col py-2 justify-items-end px-2 gap-2">
        {messages.map((message, key) => (
          <h1
            className="p-1 bg-neutral-200 mb-2 rounded-lg text-black"
            key={key}
          >
            {message}
          </h1>
        ))}
      </div>

      {/* Input div */}

      <form className="w-full flex gap-2" onSubmit={handleSubmit(handleSend)}>
        <input
          type="text"
          className="bg-transparent border outline-none py-2 px-3 border-neutral-800 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium text-sm flex-1 rounded-md"
          placeholder="Type a message..."
          id="message"
          {...register("message")}
        />
        <button
          type="submit"
          className="bg-neutral-300 text-black px-6 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
