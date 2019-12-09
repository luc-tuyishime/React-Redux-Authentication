import { alertConstants } from '../constants';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return {
        type: alertActions.success,
        message
    }
}

function error(message) {
    return {
        type: alertActions.error,
        message
    }
}

function clear() {
    return {
        type: alertActions.clear
    }
}
