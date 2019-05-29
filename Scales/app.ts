class Scales {
    constructor(){

    }
    products:Array<Product> = [];

    add(product:Product):void{
        this.products.push(product);
    }
    getSumScale():number {
        let sumScale = 0;
        for(var i = 0; i < this.products.length; i++){
            sumScale += this.products[i].getScale();
        }
        return sumScale;
    }
    getNameList():Array<string> {
        let nameList = [];
        for(var i = 0; i < this.products.length; i++){
            nameList.push(this.products[i].getName());
        }
        return nameList;
    }
}

class Product {
    name:string;
    weight:number;
    constructor(_name:string, _weight:number){
        this.name = _name;
        this.weight = _weight;
    }
    getName():string{
        return this.name;
    }
    getScale():number {
        return this.weight;
    }
}

class Tomato extends Product {
    constructor(_name:string, _weight:number) {
        super(_name, _weight);
    }
    color:string = 'red';
}

class Apple extends Product {
    constructor(_name:string, _weight:number) {
        super(_name, _weight);
    }
    color:string = 'green';
}

let scales = new Scales;
let tomato1 = new Tomato ('tomato1', 15);
scales.add(tomato1);
let tomato2 = new Tomato ('tomato2', 16);
scales.add(tomato2);
let tomato3 = new Tomato ('tomato3', 17);
scales.add(tomato3);
let apple1 = new Apple ('apple1', 20);
scales.add(apple1);
let apple2 = new Apple('apple2', 32);
scales.add(apple2);
console.log(scales.getNameList());
console.log(scales.getSumScale());