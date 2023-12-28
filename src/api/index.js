import axios from 'axios'
const OnRun = 'http://127.0.0.1:8080'
const client = axios.create({baseURL:OnRun})

export const getCaptcha = async (payload) =>{
        const {data} = await client.get('/getcaptcha')
        return data
}


export const sendOtp = async (mobile, captcha, encrypted_response) => {
        const {data} = await client.post('/sendotp',{mobile:mobile, captcha:captcha, encrypted_response:encrypted_response})
        return data
}