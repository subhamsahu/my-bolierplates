import axios from 'axios';
import { BASE_URL, headersConfig } from '../core/constants';

export const commonService = async () => {
    const url = `${BASE_URL}someendpoint`
    console.log(url)
    const response = await axios.post(url, headersConfig)
        .then(res => { return res })
        .catch(err => { return err });
    console.log(response)
    const data = response?.data || []
    return data
}


export const getCurrentUserToken = () =>{
    let token = localStorage.getItem('Token')
    token = JSON.parse(token || '{}')
    return token
}

export const getUserData = () =>{
    let user = localStorage.getItem('User');
    user = JSON.parse(user || '{}');
    return user
}

export const generateGlobalHeader = () =>{
    let token = getCurrentUserToken()
    const headersData = {
        headers: {
            'access': token.acess
        }
    }
}

