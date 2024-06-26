import { createContext, useContext } from "react";
import { apiClient } from '../api/ApiClient';
import Cookies from "js-cookie";

const AuthConext =  createContext()

export const useAuth = () => useContext(AuthConext);

export default function AuthProvider({ children }) {

    function login(response) {
        const jwtToken = 'Bearer ' + (response.data.token)
        Cookies.set('jwtToken', jwtToken, {expires: 1});
        Cookies.set('id', response.data.id, {expires: 1});
        apiClient.interceptors.request.use((config) =>{
            config.headers.Authorization = jwtToken
            return config
        })
        if (response.data.role==="USER") {
            Cookies.set('user', true, {expires: 1});
        } else {
            Cookies.set('admin', true, {expires: 1});
        }
    }

    function authenticated() {
        if (Cookies.get('jwtToken')===undefined) {
            return false;
        }
        return true;
    }

    function getId() {
        return Cookies.get('id');
    }

    function admin() {
        if (Cookies.get('admin')===undefined) {
            return false;
        }
        return true;
    }

    function user() {
        if (Cookies.get('user')===undefined) {
            return false;
        }
        return true;
    }

    function logout() {
        Cookies.remove('jwtToken');
        Cookies.remove('user');
        Cookies.remove('admin');
    }

    function refresh() {
        if (Cookies.get('jwtToken')===undefined) {
            logout();
        } else {
            apiClient.interceptors.request.use((config) =>{
                config.headers.Authorization = Cookies.get('jwtToken');
                return config
            })
        }
    }

    return (
        <AuthConext.Provider value={ {login, logout, authenticated, getId, admin, user, refresh} } >
            {children}
        </AuthConext.Provider>
    )
}