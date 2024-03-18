import axios from "axios";
import router from "@/router";
import {
    REGISTER_USER_ACTION,
    LOGIN_USER_ACTION,
    AUTH_ACTION,
    AUTO_AUTH_ACTION,
    LOGOUT_ACTION,
    AUTO_LOGOUT_ACTION,
    SET_USER_TOKEN_DATA_MUTATION,
    REGISTER_CLIENT_ACTION,
    LOGIN_CLIENT_ACTION,
} from "@/store/storeConstants";
import UserRegisterValidations from "@/services/UserRegisterValidations";
import UserLoginValidations from "@/services/UserLoginValidations";

export default {
    async [REGISTER_USER_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password
        }
        try {
            let response = await axios.post('http://127.0.0.1:7000/auth/register/', postData);
            if (response.status === 200) {
                await router.push('/confirm');
            }
        } catch (e) {
            if (e.response !== undefined) {
                throw UserRegisterValidations.getErrorMessageDetail(e.response.data.errors);
            } else {
                console.log(e.response);
            }
        }
    },
    async [AUTO_AUTH_ACTION](context) {
        let userData = localStorage.getItem('userData');
        if (userData) {
            context.commit(
                SET_USER_TOKEN_DATA_MUTATION,
                JSON.parse(userData)
            );
        }
    },
    async [LOGIN_USER_ACTION](context, payload) {
        return context.dispatch(AUTH_ACTION, {
            ...payload,
            url: 'http://127.0.0.1:7000/auth/login/'
        });
    },
    async [AUTH_ACTION](context, payload) {
        let postData = {
            email: payload.email,
            password: payload.password,
        };
        try {
            let response = await axios.post(payload.url, postData);
            if  (response.status === 200) {
                let tokenData = {
                    email: payload.email,
                    accessToken: response.data.access,
                }
                localStorage.setItem('userData', JSON.stringify(tokenData));
                context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData)
                await router.push('/info');
            }
        } catch (e) {
            if (e.response !== undefined) {
                throw UserLoginValidations.getErrorMessageDetail(e.response.data);
            } else {
                await router.replace('/error');
            }
        }
    },
    [LOGOUT_ACTION](context) {
        context.commit(SET_USER_TOKEN_DATA_MUTATION, {
            email: null,
            accessToken: null
        })
        localStorage.removeItem('userData');
    },
    [AUTO_LOGOUT_ACTION](context) {
        context.dispatch(LOGOUT_ACTION);
    }
}