import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';


interface UseSocketProps {
  url?: string;
  events?: {
    [key: string]: (data: any) => void;
  };
}

export const useSocket = ({ 
  url = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000',
  events = {} 
}: UseSocketProps = {}) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    // Set up event listeners
    Object.entries(events).forEach(([event, handler]) => {
      socketRef.current?.on(event, handler);
    });

    // Connection error handling
    socketRef.current.on('connect_error', (error: any) => {
      console.error('Socket connection error:', error);
    });

    // Cleanup on unmount
    return () => {
      Object.keys(events).forEach((event) => {
        socketRef.current?.off(event);
      });
      socketRef.current?.disconnect();
    };
  }, [url]);

  // Emit wrapper function
  const emit = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  return {
    socket: socketRef.current,
    emit,
    connected: socketRef.current?.connected || false
  };
};