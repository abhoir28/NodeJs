
import login from "../models/login";

const loginModel = async (db, email, loginType, profileName, profileImage) => {

    return (login(db, email, loginType, profileName, profileImage));
};


export {
    loginModel
};