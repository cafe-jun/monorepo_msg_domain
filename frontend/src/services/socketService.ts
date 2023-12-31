import { io, Socket } from "socket.io-client";

export type SocketExceptionStatus =
  | "BadRequest"
  | "Unauthorized"
  | "Forbidden"
  | "NotFound"
  | "Conflict"
  | "InternalServerError";

export interface SocketException {
  status: SocketExceptionStatus;
  message: string;
}

export class SocketService {
  private static instance: SocketService;
  private readonly socket: Socket;
  public socketId = "";

  private constructor() {
    const socket_url = process.env.REACT_APP_SOCKET_URL;
    console.log("socketurl", socket_url);
    this.socket = io("http://localhost:3001/core", {
      transports: ["websocket"],
      closeOnBeforeunload: false,
      // path: process.env.REACT_APP_SOCKET_PATH,
    });
    this.socket.connect();
    // TODO: 타이밍 이슈 여부 파악 및 해결
    this.socket.on("connect", () => {
      this.socketId = this.socket.id;
    });
  }

  // singleton
  public static getInstance() {
    if (this.instance === undefined) {
      this.instance = new SocketService();
    }
    return this.instance;
  }

  public on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string) {
    this.socket.off(event);
  }

  public emit(event: string, ...args: any[]) {
    if (this.isArgsWithErrorHandler(args)) {
      const [ackCallback, errorHandlerCallback] = args.slice(-2);
      const ackCallbackWithErrorHandler = (res: any | SocketException) => {
        if (!this.isSocketResponseError(res)) {
          ackCallback(res);
        } else {
          errorHandlerCallback(res);
        }
      };
      this.socket.emit(
        event,
        ...args.slice(0, -2),
        ackCallbackWithErrorHandler
      );
    } else {
      this.socket.emit(event, ...args);
    }
  }

  private isArgsWithErrorHandler(args: any[]) {
    return args.at(-1) instanceof Function && args.at(-2) instanceof Function;
  }

  private isSocketResponseError(
    res: any | SocketException
  ): res is SocketException {
    return res.error !== undefined;
  }
}

export const networkServiceInstance = SocketService.getInstance();
