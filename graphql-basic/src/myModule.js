const message = "Some message from myModule.js";
const location = 'malang';

const getGreeting = (name) => {
    return `Welcome ${name}`;
}
export {message, getGreeting,location as default}