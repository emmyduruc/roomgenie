
import React from 'react';
import { Container } from '@mantine/core';

interface RoomSelectorProps {
  roomNames: { [key: string]: string };
  selectedRoomId: string | null;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const RoomSelector: React.FC<RoomSelectorProps> = ({
  roomNames,
  selectedRoomId,
  setSelectedRoomId,
}) => {
  const roomOptions = Object.entries(roomNames).map(([id, name]) => ({
    value: id,
    label: name,
  }));

  return (
    <Container className='flex gap-2 flex-row justify-start my-4'>
    {roomOptions.map((room) => {
      return (
        <div
          onClick={() => setSelectedRoomId(room.value)}
           className={`shadow-lg flex-row flex border  items-center justify-start p-2 rounded-full ${
            selectedRoomId === room.value ? 'bg-green-300' : 'bg-white'
           }`}>
          <p className='text-xs'>
              {room.label}
            </p>
        </div>
      );
    })}

    </Container>
  );
};