import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { createServer } from 'https';
import * as fs from 'fs';
import { environment } from '../../environments/environment';
import { WSAuthMiddleware } from './events.middleware';

export class SessionAdapter extends IoAdapter {

  constructor(private jwtService: JwtService) {
    super();
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const cors = environment.production ? undefined : { origin: true, credentials: true };
    options.cors = cors;

    const server = environment.production
      ? this.createSecureIOServer(port, options)
      : super.createIOServer(port, options);

    server.use(WSAuthMiddleware(this.jwtService));
    return server;
  }

  createSecureIOServer(port: number, options?: ServerOptions): Server {
    const httpsServer = createServer({
      ca: fs.readFileSync('/etc/ssl/server-cert-key/cloudflare.crt'),
      key: fs.readFileSync('/etc/ssl/server-cert-key/key.pem'),
      cert: fs.readFileSync('/etc/ssl/server-cert-key/cert.pem'),
    }).listen(port);

    return new Server(httpsServer, options);
  }
}
