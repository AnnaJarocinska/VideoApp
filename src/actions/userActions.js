const logIn = (userObj) => {
    return {
        type: "LOG_IN",
        payload: userObj
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    logIn,
    logOut
}