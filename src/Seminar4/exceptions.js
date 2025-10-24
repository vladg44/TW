const orderCoffee = (type) => {

    const types = {
        REGULAR: 'REGULAR',
        SPECIAL: 'SPECIAL',
        SCNS: 'SWEET_COFFEE_NO_SUGAR'
    }

    if (Object.values(types).indexOf(type) === -1) {
        throw new Error('coffee error')
    } else {
        console.log(`preparing ${type} coffee`)
    }
}

try {
    orderCoffee('REGULAR')
    orderCoffee('SWEET_COFFEE_NO_SUGAR')
} catch (err) {
    console.log(err)
}


// După ce ați testat exemplul, implementați funcția increaseSalary care primește ca parametrii
//  un array de salarii și un număr reprezentând procentul cu care se vor mări (ex 10). 
// Funcția aruncă excepții dacă primul parametru nu este un array sau al doilea parametru nu este un număr.

const increaseSalary = (salaries, percent) => {
    if (!Array.isArray(salaries)) {
        throw new Error('First parameter must be an array');
    }   
    if (typeof percent !== 'number') {
        throw new Error('Second parameter must be a number');
    }
    return salaries.map(salary => salary + (salary * percent / 100));
}

// Testare funcție increaseSalary
try {
    const newSalaries = increaseSalary([1000, 2000, 3000], 5);
    console.log('New salaries:', newSalaries);
} catch (err) {
    console.log(err.message);
}