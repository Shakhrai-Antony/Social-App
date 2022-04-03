"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("../DAL/API/API");
var SET_AUTH_DATA = 'SET-AUTH-DATA';
var SET_CAPTCHA = 'SET-CAPTCHA';
var initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    captcha: null
};
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_AUTH_DATA:
            return __assign(__assign(__assign({}, state), action.data), { isAuth: 123 });
        case SET_CAPTCHA:
            return __assign(__assign({}, state), { captcha: action.url });
        default:
            return state;
    }
};
exports.setAuthUserData = function (email, id, login, isAuth) {
    return {
        type: SET_AUTH_DATA, data: { email: email, id: id, login: login, isAuth: isAuth }
    };
};
exports.setCaptchaSuccess = function (url) {
    return {
        type: SET_CAPTCHA, url: url
    };
};
exports.setAuthUserDataThunkCreator = function () {
    return function (dispatch) {
        return API_1.userValidationAPI.setAuthUser().then(function (data) {
            if (data.resultCode === 0) {
                var _a = data.data, email = _a.email, id = _a.id, login = _a.login;
                dispatch(exports.setAuthUserData(email, id, login, true));
            }
        });
    };
};
exports.setLogInUserThunkCreator = function (email, password, rememberMe, captcha) {
    return function (dispatch) {
        // @ts-ignore
        API_1.userValidationAPI.logInUser(email, password, rememberMe, captcha).then(function (data) {
            if (data.resultCode === 0) {
                dispatch(exports.setAuthUserDataThunkCreator());
            }
        });
    };
};
exports.setLogOutUserThunkCreator = function () {
    return function (dispatch) {
        API_1.userValidationAPI.logOutUser().then(function (data) {
            if (data.resultCode === 0) {
                dispatch(exports.setAuthUserData(null, null, null, false));
            }
        });
    };
};
exports.getCaptchaSuccessThunkCreator = function () {
    return function (dispatch) {
        API_1.userValidationAPI.getCaptcha().then(function (data) {
            dispatch(exports.setCaptchaSuccess(data.url));
        });
    };
};
exports.default = authReducer;
