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
var authReducer_1 = require("./authReducer");
var SET_INITIALIZED = 'SET-INITIALIZED';
var initialState = {
    initialized: false
};
var appReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_INITIALIZED:
            return __assign(__assign({}, state), { initialized: true });
        default: return state;
    }
};
exports.setInitializedAC = function () {
    return {
        type: SET_INITIALIZED
    };
};
exports.initializedSuccess = function () {
    return function (dispatch) {
        var promise = dispatch(authReducer_1.setAuthUserDataThunkCreator());
        promise.then(function () {
            dispatch(exports.setInitializedAC());
        });
    };
};
exports.default = appReducer;
