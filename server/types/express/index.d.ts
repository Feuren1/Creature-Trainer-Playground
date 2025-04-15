// types/express/index.d.ts
import { UserPayload } from '../user';
declare global {
  namespace Express {
    interface Request {
      user?: string | UserPayload;
    }
  }
}
