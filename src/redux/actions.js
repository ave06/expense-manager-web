export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const loginUser = (user) => {
    return {
        type: LOG_IN,
        user,
    };
};

export const logoutUser = () => {
    return {
        type: LOG_OUT,
    };
};