/*jslint
    fudge, node
*/

import {
    set_immediate,
    set_interval,
    set_timeout
} from "./index.js";

// Set up a ticker every second
const interval = set_interval(1000)(function () {
    console.log("tick");
});

// Schedule the ticker to be cancelled after 5 seconds
const aborted_timeout = set_timeout(5000)(function () {
    interval();
    console.log("aborted time out - should not happen");
});

// Schedule the above timeout to be cancelled before it runs
set_timeout(3000)(function () {
    aborted_timeout();
});

// Schedule an immediate invocation after 6 seconds
set_timeout(6000)(function () {
    set_immediate("6 seconds", "immediate")(console.log);
});

// Finally cancel the ticker at 10 seconds
set_timeout({
    delay: 10000,
    args: ["timed out"]
})(function (message) {
    interval();
    console.log(message);
});