export const debug = true
// Service URL
export const BASE_URL = `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/v1/`;
export const BACKEND_URL = `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/api/v1/`;

export const headersConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

