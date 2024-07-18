"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { Layer } from "@/types/canvas";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";

interface RoomProps {
  children: ReactNode
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: RoomProps) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"} throttle={16} >
      {/* publicApiKey={"pk_dev_tD5TavX7rg9Lm7K7zfPbFhqfw97hwzER8kRvXG2PK8Fr5TvHqNKp8cuoV4EUSsrx"} */}
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
          selection: [],
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layersIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}