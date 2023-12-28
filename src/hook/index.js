import { useQueryClient, useMutation, useQuery } from "react-query";
import * as api from '../api/index'
import { toast } from "react-toastify";


export const useGetCaptcha = () =>{
    return useQuery(['captcha'], api.getCaptcha)
}

export const useSendOtp = (mobile, captcha, encrypted_response) =>{
    const queryClient = useQueryClient();
    return useMutation(
        () => api.sendOtp(mobile, captcha, encrypted_response),
        {
            onSuccess: async () => {
                await queryClient.refetchQueries(['sendotp', mobile, captcha, encrypted_response]);
                toast.success('کد تایید ارسال شد');

                
            },
            onError: (error) => {
                toast.warning(error.response.data.message);
            }
        }

    )

}