/*jslint
    fudge, node
*/

//MD # functional-timers/p
//MD Curried functions for nodejs timers. Each returns a cancel function./p
//MD ## Functions/p

const options_parse = function (options) {

// Only supplied args to callback
    if (Array.isArray(options)) {
        return {
            args: options
        };
    }

// Only supplied delay value
    if (typeof options === "number") {
        return {
            delay: options
        };
    }

// Expect an object with some of {delay, args}
    if (typeof options === "object") {
        return options;
    }

    return {};
};

//MD     set_immediate(...args)(callback)/p
const set_immediate = function (...args) {
    return function (callback) {
        const timer_ref = setImmediate(callback, ...args);

        return function clear_immediate() {
            clearImmediate(timer_ref);
        };
    };
};

//MD     set_interval(options)(callback)/p
const set_interval = function (options) {
    return function (callback) {
        const parsed_options = options_parse(options);

        const timer_ref = setInterval(
            callback,
            parsed_options.delay,
            ...(
                (Array.isArray(parsed_options.args))
                ? parsed_options.args
                : []
            )
        );

        return function clear_interval() {
            clearInterval(timer_ref);
        };
    };
};

//MD     set_timeout(options)(callback)/p
const set_timeout = function (options) {
    return function (callback) {
        const parsed_options = options_parse(options);

        const timer_ref = setTimeout(
            callback,
            parsed_options.delay,
            ...(
                (Array.isArray(parsed_options.args))
                ? parsed_options.args
                : []
            )
        );

        return function clear_timeout() {
            clearTimeout(timer_ref);
        };
    };
};

//MD ## Options/p
//MD The options parameter may be any of the following:/p
//MD - A numeric delay value/p
//MD - An array of arguments to be passed to the callback/p
//MD - An object with delay (numeric) and/or args (array) properties/p
//MD ## Example/p
//MD     const cancel = set_interval(1000)(callback_function);/p
//MD     cancel();/p

export {
    set_immediate,
    set_interval,
    set_timeout
};