import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { ExtendedSocket, RequestUser } from '@rumikub/shared-models';

export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;
export const WSAuthMiddleware = (jwtService: JwtService): SocketMiddleware => {
  return async (socket: ExtendedSocket, next) => {
    try {
      const token: string | undefined = socket.handshake?.auth?.jwt;

      if (!token) {
        return next({
          name: 'Unauthorized',
          message: 'JWT token was not provided',
        });
      }

      const jwtPayload = jwtService.verify<RequestUser>(token ?? '');

      if (jwtPayload) {
        socket.username = jwtPayload.username;
        return next();
      }

      return next({
        name: 'Unauthorized',
        message: 'Unauthorized',
      });
    } catch (error) {
      return next({
        name: 'Unauthorized',
        message: 'Unauthorized',
      });
    }
  };
};
