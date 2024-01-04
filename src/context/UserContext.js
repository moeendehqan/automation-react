import { createContext, useContext, useState } from 'react';

// ایجاد یک Context جدید
const UserContext = createContext();

// تعریف یک Provider برای ارائه اطلاعات به کامپوننت‌ها
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const setUserData = (newUserId) => {
    setUserId(newUserId);
  };

  return (
    <UserContext.Provider value={{ userId, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// تعریف یک Hook برای استفاده از Context در کامپوننت‌ها
export const useUser = () => {
  return useContext(UserContext);
};
