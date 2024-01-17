import { createContext, useReducer, useEffect } from 'react';
import AuthReducer from './AuthReducer';
import axios from "../config/axios";


const INITIAL_STATE = {
    user: null,
    error: false,
    isLoading:true
};

const AuthContext = createContext(INITIAL_STATE);
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            getUser(); 
        }
        else{
            dispatch({ type: "LOGOUT" });
        }
    }, [])

    const getUser = async () => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.get('/usercurrent');
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.DT });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                error: state.error,
                isLoading:state.isLoading,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }