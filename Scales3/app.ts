interface IStorageEngine {
    addItem(item: IScalable):void;
    getItem(index:number):IScalable;
    getCount():number;
}
interface IScalable {
    getName():string;
    getScale():number;
}
class Scales <StorageEngine extends IStorageEngine> {
    storageEngine:StorageEngine;
    constructor(_storageEngine:StorageEngine){
        this.storageEngine = _storageEngine;
    }
    
    addItem(item:IScalable):void {
        this.storageEngine.addItem(item);
    }
    getItem(index:number):IScalable{
       return this.storageEngine.getItem(index);
    }
    getCount():number {
        return this.storageEngine.getCount();
    }
    
    getSumScale():number{
        
        let sumScale:number = 0;
        for(let i = 0; i < this.storageEngine.getCount(); i++) {
            console.log(this.getItem(i));
            sumScale += this.getItem(i).getScale();
        }
        return sumScale;
    }
    getNameList():Array<string>{
        let nameList:Array<string> = [];
        for(let i = 0; i < this.getCount(); i++) {
            nameList.push(this.getItem(i).getName());
        }
        return nameList;
    }
}

class ScalesStorageEngineArray implements IStorageEngine {
    items:Array<IScalable>;
    constructor(){
        this.items = [];
    }
    addItem(item:IScalable):void{
        this.items.push(item);
        
    }
    getItem(index:number):IScalable{
        if(index >= this.items.length){
            return;
        }
        return this.items[index];
    }
    getCount():number {
        return this.items.length;
    }
}

class ScalesStorageLocalStorage implements IStorageEngine{
    static scales:number = 0;
    localStorageKey:string;
    constructor(){
        ScalesStorageLocalStorage.scales++;
        this.localStorageKey = "scales "+ ScalesStorageLocalStorage.scales;
        localStorage[this.localStorageKey] = JSON.stringify([]);
    }
    addItem(item:IScalable):void{
        let items:IScalable[] = JSON.parse(localStorage.getItem(this.localStorageKey));
        items.push(item);
        localStorage[this.localStorageKey] = JSON.stringify(items);
    }
    getItem(index:number):IScalable{
        
        let items:IScalable[] = JSON.parse(localStorage.getItem(this.localStorageKey));
        if(index >= items.length){
            return;
        }
        return items[index];
    }
    getCount():number{
        let items:IScalable[] = JSON.parse(localStorage.getItem(this.localStorageKey));
        
        return items.length;
    }
}


class Product implements IScalable{
    private _name:string;
    private _scale:number;
    constructor(_name: string, _scale:number){
        this._name = _name;
        this._scale = _scale;
    }
    
    getName():string{
        return this._name;
    }
    getScale():number{
        return this._scale;
    }
    
}
console.log(Product.prototype);
let scales1 = new Scales<ScalesStorageEngineArray>(new ScalesStorageEngineArray);
let product1  = new Product('product1', 25);
let product2  = new Product('product2', 26);
let product3  = new Product('product3', 27);
scales1.addItem(product1);
scales1.addItem(product2);
scales1.addItem(product3);
console.log(scales1.getSumScale());
console.log(scales1.getNameList());
let scales2 = new Scales<ScalesStorageLocalStorage>(new ScalesStorageLocalStorage);
let product4  = new Product('product4', 120);
let product5  = new Product('product5', 98);
let product6  = new Product('product6', 45);
let product7 = new Product('product7',87);
scales2.addItem(product4);
scales2.addItem(product5);
scales2.addItem(product6);
scales2.addItem(product7);
console.log(scales2.getSumScale());
console.log(scales2.getNameList());

