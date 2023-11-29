const test = {
    name: "Raji",
    age: 22,
    address: {
        country: "Nigeria",
        state: "Lagos",
        city: "Ikeja",
    },
};

const {
    name,
    age,
    address: { country, state, city },
} = test;

console.log(name, age, country, state, city);
