import axios from 'axios'
import { OnRun } from '../config/OnRun'
const client = axios.create({baseURL:OnRun})

export const getCaptcha = async (payload) =>{
        const {data} = await client.get('/getcaptcha')
        return data
}


export const sendOtp = async (mobile, captcha, encrypted_response) => {
        const {data} = await client.post('/sendotp',{mobile:mobile, captcha:captcha, encrypted_response:encrypted_response})
        return data
}


export const login = async (otp, mobile) =>{
        const {data} = await client.post('/login',{otp:otp, mobile:mobile})
        return data
}


export const  checkidu = async (idu) =>{
        const {data} = await client.post('/checkidu', {idu:idu})
        return data
}

export const getUser = async (userId) =>{
        const {data} = await client.post('/getuser', {userid:userId})
        return data
}