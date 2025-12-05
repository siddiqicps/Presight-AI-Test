import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import MessageCard from '../components/message-card';

const socket = io('http://localhost:3000'); // Replace with your server URL



function WebSocketRequstPage() {

  const [messages, setMessages] = useState([]);
  const hasRun = useRef(false);

  useEffect(() => {
    // You can also set up listeners for incoming events here
    if(!hasRun.current){
      hasRun.current = true;
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

    
      for(let i=1; i<=10; i++){
        console.log("Sending Message---",i);
        sendMessage(i);
      }
    }

    socket.on('requestRecieved', (data) => {
      console.log('Received response from server:', data);
      setMessages(prevData => [...prevData, data])
    });

    socket.on('requestProcessed', (data) => {
      console.log('Received response from server:', data);
      setMessages(prevArray =>
        prevArray.map((item, i) => (i+1 === data.index ? data : item))
      );
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off();
    };
  },[]);

  const sendMessage = (i) => {
      socket.emit('submitRequest', { text: i });
  };

  return (
    <main className="flex-1 p-4">
        {/* <!-- Main content for the current page --> */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">WebSocket Request</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {messages && messages.map((m,i) => (
              <MessageCard message={m}/>
            ))}
        </div>
      </div>
    </main>
  );
}

export default WebSocketRequstPage;