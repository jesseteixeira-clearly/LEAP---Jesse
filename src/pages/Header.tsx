'use client'
import { useAuthentication } from "@/hooks/authentication.hook";

import router from "next/router";
import Cookies from 'js-cookie'
interface HeaderProps{
  title: string
}
export const Header: React.FC <HeaderProps> = ({title}) => {
 
  const { logout } = useAuthentication();
  
  const handleLogin = async () => {
    router.push("/login");
  }
  const handleLogout = async () => {
    logout();
    router.push("/login");
  };

  return (
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
           <button
              onClick={Cookies.get('token') ? handleLogout: handleLogin}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {/** I dont need to validate the token, just read from it, as if I need to access protected spaces, the middleware handles it for me */}
             {Cookies.get('token') ? 'Logout' : 'Login'} 
            </button>  
          </div>
        </div>
      </header>
  );
}
 
