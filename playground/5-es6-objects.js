//object property shorthand
const name = 'knz';
const age = 27;
const user = {
    name, age
};
console.log(user);

//object destructuring
const product = {
    label: 'Red',
    price: 3,
    stock: 201,
    sale: undefined
};
//change name
// const {label: productLabel, stock, price} = product;
// console.log(productLabel, stock, price);

const transaction = (type, {label,stock}) => {
    console.log(type);
    console.log(label,stock);
};

transaction('hello',product);