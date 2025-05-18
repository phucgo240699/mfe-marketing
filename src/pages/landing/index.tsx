// import React, { useState } from 'react';
// import './index.css';
// import TypingEffect from './typingEffect';

// enum MessageTypeEnum {
//   Text,
//   Image,
// }

// interface TextMessage extends GeneralMessage {
//   id: string;
//   type: MessageTypeEnum.Text;
//   data: string;
// }

// interface ImageMessage extends GeneralMessage {
//   id: string;
//   type: MessageTypeEnum.Image;
//   data: string;
// }

// interface GeneralMessage {
//   hasRendered?: boolean;
// }

// type Message = TextMessage | ImageMessage;

// function App() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '0',
//       type: MessageTypeEnum.Text,
//       data: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     },
//     {
//       id: '1',
//       type: MessageTypeEnum.Image,
//       data: 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
//     },
//   ]);
//   return (
//     <div className="m-28">
//       {messages.map((message, index) => {
//         if (message.type === MessageTypeEnum.Text) {
//           return (
//             <TypingEffect
//               key={message.id}
//               text={message.data}
//               onDone={() =>
//                 setMessages((prevMessages) =>
//                   prevMessages.map((prevMessage) => {
//                     if (prevMessage.id === message.id) {
//                       return {
//                         ...prevMessage,
//                         hasRendered: true,
//                       };
//                     }
//                     return prevMessage;
//                   })
//                 )
//               }
//             />
//           );
//         } else if (
//           message.type === MessageTypeEnum.Image &&
//           (index === 0 || messages[index - 1].hasRendered)
//         ) {
//           return (
//             <img
//               key={message.id}
//               fetchPriority={'high'}
//               src={message.data}
//               alt={'landscape'}
//               className={'mt-4 animate-fade-in'}
//             />
//           );
//         }
//       })}
//     </div>
//   );
// }

// export default App;

import React, { useState, useRef, useEffect, useMemo } from 'react';

let count = 20;

const fetchMessages = async (amount: number) => {
  // simulate server delay
  await new Promise((res) => setTimeout(res, 500));
  const result: any[] = [];
  if (count <= 0) return result;
  for (let i = (count - 1) * amount + 1; i <= count * amount; ++i) {
    result.push({
      id: i,
      sender: i % 2 === 0 ? 'user' : 'bot',
      text: `Message ${i}`,
    });
  }
  --count;
  return result;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAmountPerFetching = useMemo(() => 20, []);
  const [loading, setLoading] = useState(false);

  const loadMessages = async (prepend = false) => {
    if (loading) return; // avoid double load
    setLoading(true);

    const newMessages = await fetchMessages(messagesAmountPerFetching);

    setMessages((prev) =>
      prepend ? [...newMessages, ...prev] : [...prev, ...newMessages]
    );

    setLoading(false);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const botReply = generateBotReply(trimmed);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: botReply };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSend();
  };

  const generateBotReply = (userText: string) => {
    return `You said: "${userText}". I am still learning 😊`;
  };

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = async () => {
      if (container?.scrollTop === 0) {
        const prevHeight = container.scrollHeight;
        await loadMessages(true);
        requestAnimationFrame(() => {
          container.scrollTop = container.scrollHeight - prevHeight;
        });
      }
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  useEffect(() => {
    if (messages.length === messagesAmountPerFetching) {
      requestAnimationFrame(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [messages, messagesEndRef]);

  return (
    <div className="max-w-xl mx-auto mt-8 font-sans flex flex-col h-[600px] animate-fade-in">
      <div
        ref={containerRef}
        className="flex-1 bg-white border border-gray-300 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4"
      >
        <div
          className={`flex justify-center mb-2 transition-all duration-500 transform ${
            loading
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <svg
            className="animate-spin h-6 w-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 010 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            ></path>
          </svg>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`
              max-w-3/4 px-4 py-2 rounded-2xl break-words
              ${
                msg.sender === 'user'
                  ? 'self-end bg-green-100 text-gray-900 animate-fade-in-right'
                  : 'self-start bg-gray-200 text-gray-800 animate-fade-in-left'
              }
            `}
          >
            <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 duration-150"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
