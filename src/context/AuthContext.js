import { createContext, useReducer, useEffect } from 'react';
import AuthReducer from './AuthReducer';
import axios from "../config/axios";


const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false,
};

const AuthContext = createContext(INITIAL_STATE);
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {

        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.get('/usercurrent');
            console.log(res.data.DT);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.DT });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }