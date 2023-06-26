
export const APPNAME = "Auto Test Assistant"

export const DEBUG = true
export const DEV_MODE = true
// Service URL

export const BASE_URL = `http://${process.env.REACT_APP_USER_SERVER_IP}:${process.env.REACT_APP_USER_SERVER_PORT}/api/v1/`;

export const headersConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const topBarHeight = 64
export const sideNavWidth = 260
export const navbarHeight = 60
export const sidenavCompactWidth = 80
export const containedLayoutWidth = 1200
