const LoginStart = () => ({
    type: "LOGIN_START",
});

const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});

export { LoginStart, LoginSuccess, LoginFailure }
