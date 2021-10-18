/*jslint
    fudge, node
*/

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

const set_immediate = function (...args) {
    return function (callback) {
        const timer_ref = setImmediate(callback, ...args);

        return function clear_immediate() {
            clearImmediate(timer_ref);
        };
    };
};

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

export {
    set_immediate,
    set_interval,
    set_timeout
};
