class Scales {
    constructor(){

    }
    products:Array<Iscalable> = [];

    add(product:Iscalable):void{
        this.products.push(product);
    }
    getSumScale():number {
        let sumScale:number = 0;
        for(var i = 0; i < this.products.length; i++){
            sumScale += this.products[i].getScale();
        }
        return sumScale;
    }
    getNameList():Array<string> {
        let nameList:Array<string> = [];
        for(var i = 0; i < this.products.length; i++){
            nameList.push(this.products[i].getName());
        }
        return nameList;
    }
}


interface Iscalable {
    getName():string;
    getScale():number;
}
class Tomato implements Iscalable {
    name:string;
    scale:number;
    constructor(_name:string, _scale:number) {
        this.name = _name;
        this.scale = _scale;
    }
    getScale():number {
        return this.scale;
    }
    getName():string {
        return this.name;
    }
}
class Apple implements Iscalable {
    name:string;
    scale:number;
    constructor(_name:string, _scale:number) {
        this.name = _name;
        this.scale = _scale;
    }
    getScale():number {
        return this.scale;
    }
    getName():string {
        return this.name;
    }
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