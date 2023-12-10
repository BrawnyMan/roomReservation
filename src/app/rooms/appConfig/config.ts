import { environment } from '../../../environments/environment';

export const AppConfig = {
    apiUrl: environment.production
    ? "http://myhost.si"
    : "http://localhost:7392/api/v1.0/room",
};
