const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {

                isLoading: true,
                user: null,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {

                isLoading: false,
                user: action.payload,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {

                isLoading: false,
                user: null,
                error: true,
            };
        case "LOGOUT":
            return {

                isLoading: false,
                user: null,
                error: false,
            };
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following) => following !== action.payload
                    ),
                },
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: {
                    ...state.user,
                    city: action.payload.city,
                    from: action.payload.from,
                    relationship: action.payload.relationship,
                    profilePicture: action.payload.profilePicture ? action.payload.profilePicture : state.user.profilePicture
                },
            };

        default:
            return state;
    }
};

export default AuthReducer;