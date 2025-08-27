import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Messages {
  message: string;
}
const Room = () => {
  const { register, handleSubmit, reset } = useForm<Messages>();

  const navigate = useNavigate();

  const handleSend = ({ message }: Messages) => {
    localStorage.setItem("roomId", message);
    navigate("/chat");
    reset();
  };

  return (
    <div className="flex flex-col gap-4 w-[550px] border border-neutral-800 rounded-lg px-6 py-4">
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

      <h1>Please choose a room to chat: </h1>

      {/* Input div */}

      <form className="w-full flex gap-2" onSubmit={handleSubmit(handleSend)}>
        <input
          type="text"
          className="bg-transparent border outline-none py-2 px-3 border-neutral-800 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium text-sm flex-1 rounded-md"
          placeholder="Enter room ID..."
          id="roomId"
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

export default Room;
