<<<<<<< HEAD
import { environment } from '../../../environments/environment';

export const AppConfig = {
    apiUrl: environment.production
    ? "http://myhost.si"
    : "http://localhost:7392/api/v1.0/room",
=======
export const AppConfig = {
    apiUrl: "http://localhost:7392/api"
>>>>>>> b1f85429dd387ed4cd2ad1752807b698ffce9729
};