import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MoreVertical, Send } from "lucide-react";

const chats = [
  {
    name: "Khalid Hasan Zibon",
    message: "Sup man! How is going?",
    time: "8:30pm",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "PewDiePie",
    message: "Subscribe to my channel",
    time: "6:30pm",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Marzia Mithila",
    message: "I love you too ✦",
    time: "3:00pm",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Rasel Ahmed",
    message: "Link https://youtube.com/...",
    time: "11:00am",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    name: "Maidul Islam Saad",
    message: "Vai kotodin tore dekhina.",
    time: "10:25pm",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "Earid Ahmed",
    message: "Hagar Hagar Dular kamatesi?",
    time: "9:15am",
    avatar: "https://i.pravatar.cc/40?img=6",
  },
];

export default function ChatApp() {
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [chatMessages, setChatMessages] = useState({
    "Khalid Hasan Zibon": [],
    PewDiePie: [],
    "Marzia Mithila": [],
    "Rasel Ahmed": [],
    "Maidul Islam Saad": [],
    "Earid Ahmed": [],
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat.name]: [
        ...prev[selectedChat.name],
        { from: "me", text: input },
      ],
    }));
    setInput("");
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white text-black font-sans">
      <aside className="w-full md:w-1/3 lg:w-1/4 bg-black text-white p-4 transition-all duration-500 ease-in-out">
        <div className="h-full overflow-y-auto pr-2">
          <h2 className="text-xl font-bold mb-6">Chats</h2>
          {chats.map((chat, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedChat(chat)}
              className={`flex items-center gap-3 mb-4 cursor-pointer p-2 rounded-xl transition duration-300 ${
                selectedChat.name === chat.name
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={chat.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{chat.name}</p>
                <p className="text-xs opacity-70 truncate">{chat.message}</p>
                <p className="text-[10px] opacity-50">{chat.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-gradient-to-br from-white via-gray-100 to-white transition-all duration-500 ease-in-out p-4 md:p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-2">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="w-10 h-10 rounded-full"
            />
            <p className="font-bold">{selectedChat.name}</p>
          </div>
          <div className="flex gap-4 text-gray-500">
            <MoreVertical className="hover:text-black transition" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-4 flex flex-col pr-2">
          {(chatMessages[selectedChat.name] || []).map((msg, i) => (
            <motion.div
              key={i}
              className={`max-w-[70%] md:max-w-md px-4 py-2 rounded-2xl text-sm shadow-md transition-all duration-300 ease-in-out ${
                msg.from === "me"
                  ? "bg-black text-white self-start animate-slideInLeft"
                  : "bg-white text-black self-end animate-slideInRight"
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 border-t pt-4 mt-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Write Message"
            className="flex-1 bg-gray-100 p-2 rounded-xl focus:outline-none text-black"
          />
          <button
            onClick={handleSend}
            className="bg-black text-white p-2 rounded-xl hover:scale-105 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
