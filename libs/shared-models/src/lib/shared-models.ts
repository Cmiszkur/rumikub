import { Socket } from 'socket.io';

export interface ExtendedSocket extends Socket {
  username: string;
  gameRoomId: string | undefined;
}

export interface RequestUser {
  _id?: string;
  /**
   * token issue date
   */
  iat?: number;
  /**
   * token expire date
   */
  exp?: number;
  username: string;
}
