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

const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export { LoginStart, LoginSuccess, LoginFailure,Follow,Unfollow }
