import { useQueryClient, useMutation, useQuery } from "react-query";
import * as api from "../api/index";
import { toast } from "react-toastify";
import { setCookie, getCookie } from "../componet/Cookie";

export const useGetCaptcha = () => {
  return useQuery(["captcha"], api.getCaptcha);
};

export const useSendOtp = (mobile, captcha, encrypted_response, setMode) => {
  const queryClient = useQueryClient();
  return useMutation(() => api.sendOtp(mobile, captcha, encrypted_response), {
    onSuccess: async () => {
      await queryClient.refetchQueries([
        "sendotp",
        mobile,
        captcha,
        encrypted_response,
      ]);
      toast.success("کد تایید ارسال شد");
      setMode("otp");
    },
    onError: (error) => {
      toast.warning(error.response.data.message);
    },
  });
};

export const useLogin = (otp, mobile, remember) => {
  const queryClient = useQueryClient();
  return useMutation(() => api.login(otp, mobile), {
    onSuccess: async (data) => {
      await queryClient.refetchQueries(["login", otp, mobile]);
      toast.success("ورود موفق");
      if (remember) {
        setCookie("idu", data, 10);
      }
      return data;
    },
    onError: (error) => {
      toast.warning(error.response.data.message);
    },
  });
};

export const useCheckIdu = (idu) => {
  const queryClient = useQueryClient();
  return useMutation(() => api.checkidu(idu), {
    onSuccess: async (data) => {
      await queryClient.refetchQueries(["idu", idu]);
      return data;
    },
    onError: (error) => {
      console.error = () => {};
      setCookie("idu", "", 0);
      toast.warning(error.response.data.message);
    },
  });
};

export const useGetUser = (userId) => {
  const queryClient = useQueryClient();
  return useMutation(() => api.getUser(userId), {
    onSuccess: async (data) => {
      await queryClient.refetchQueries(["getUser", userId]);
      return data;
    },
  });
};
