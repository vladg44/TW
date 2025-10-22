class Stream{
    #value;//private field to hold the current value
    #nextValue;
    static #count=0;
    constructor(value,nextValue){
        this.#value=value;
        this.#nextValue=nextValue;
        Stream.#count++;
    }
    get value(){
        return this.#value;
    }

    get next(){
        this.#value=this.#nextValue(this.#value);
    return this.#value;
    }
    static get count(){
        return Stream.#count;
    }

}

class ConstantStream extends Stream{
    constructor(value){
        super(value, x=>x);
    }
}

class NextIntegerStream extends Stream{
    constructor(){
        super(0,x=>x+1);
    } 
}

const constant = new ConstantStream(1);
const NextInteger= new NextIntegerStream();
for(let i=0;i<10;i++){
console.log(`constant[${i}]=${constant.next}`);
console.log(`NextInteger[${i}]=${NextInteger.next}`);
}
console.log(Stream.count);


class EvenStream extends Stream{
constructor(start){
    if(start%2!==0){
        start++;
    }
    super(start-2,x=>x+2);
}


}
const evenStream=new EvenStream(5);
for(let i=0;i<10;i++){
    console.log(`evenStream[${i}]=${evenStream.next}`);
    }