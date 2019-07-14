// const square = function (x) {
//     return x * x
// };

// const square = (x) => {
//     return x * x
// };

// const square = (x) => x * x;

const event = {
    name:'event',
    guestList:['l','o','v','e'],
    printList() {
        // const that = this;

        console.log('hello event ' + this.name);
        this.guestList.forEach((guest) => {
            console.log(guest + ' ' + this.name);
        })
    }
};

// console.log(square(4));

event.printList();