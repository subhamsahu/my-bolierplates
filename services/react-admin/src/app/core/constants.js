
export const APPNAME = "ADMIN SYTEM"

export const DEBUG = true
export const DEV_MODE = true
// Service URL

export const BASE_URL = `http://${process.env.REACT_APP_USER_SERVER_IP}:${process.env.REACT_APP_USER_SERVER_PORT}/api/v1/`;
export const USER_SERVICE_URL = `http://${process.env.REACT_APP_USER_SERVER_IP}:${process.env.REACT_APP_USER_SERVER_PORT}/api/`;
export const RESTAURANT_SERVICE_URL = `http://${process.env.REACT_APP_RESTAURANT_SERVER_IP}:${process.env.REACT_APP_RESTAURANT_SERVER_PORT}/restaurant/v1/`;
export const PAYMENT_SERVICE_URL = `http://${process.env.REACT_APP_PAYMENT_SERVER_IP}:${process.env.REACT_APP_PAYMENT_SERVER_PORT}/payment/v1/`;

export const RAZORPAY_API_KEY = `${process.env.REACT_APP_RAZORPAY_API_KEY}`

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
