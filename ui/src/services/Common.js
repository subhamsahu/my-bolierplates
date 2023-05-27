import axios from 'axios';
import { BASE_URL, headersConfig } from '../core/Constants';

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
