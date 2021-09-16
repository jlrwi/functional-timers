/*jslint
    fudge, node
*/

// Curried wrappers for nodejs timers that return clear functions

const set_immediate = function (callback) {
    const timer_ref = setImmediate(callback);

    return function clear_immediate() {
        clearImmediate(timer_ref);
    };
};

const set_interval = function (callback) {
    return function (delay) {
        const timer_ref = setInterval(callback, delay);

        return function clear_interval() {
            clearInterval(timer_ref);
        };
    };
};

const set_timeout = function (callback) {
    return function (delay) {
        const timer_ref = setTimeout(callback, delay);

        return function clear_timeout() {
            clearTimeout(timer_ref);
        };
    };
};

export {
    set_immediate,
    set_interval,
    set_timeout
};