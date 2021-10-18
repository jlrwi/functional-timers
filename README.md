# functional-timers 
Curried functions for nodejs timers. Each returns a cancel function. 
## Functions 
    set_immediate(...args)(callback) 
    set_interval(options)(callback) 
    set_timeout(options)(callback) 
## Options 
The options parameter may be any of the following: 
- A numeric delay value 
- An array of arguments to be passed to the callback 
- An object with delay and/or args properties 
## Example 
    const cancel = set_interval(1000)(callback_function); 
    cancel(); 
