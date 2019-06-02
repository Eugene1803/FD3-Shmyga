var Scales = /** @class */ (function () {
    function Scales(_storageEngine) {
        this.storageEngine = _storageEngine;
    }
    Scales.prototype.addItem = function (item) {
        this.storageEngine.addItem(item);
    };
    Scales.prototype.getItem = function (index) {
        return this.storageEngine.getItem(index);
    };
    Scales.prototype.getCount = function () {
        return this.storageEngine.getCount();
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.storageEngine.getCount(); i++) {
            console.log(this.getItem(i));
            sumScale += this.getItem(i).getScale();
        }
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        for (var i = 0; i < this.getCount(); i++) {
            nameList.push(this.getItem(i).getName());
        }
        return nameList;
    };
    return Scales;
}());
var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.items = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        if (index >= this.items.length) {
            return;
        }
        return this.items[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.items.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageLocalStorage = /** @class */ (function () {
    function ScalesStorageLocalStorage() {
        ScalesStorageLocalStorage.scales++;
        this.localStorageKey = "scales " + ScalesStorageLocalStorage.scales;
        localStorage[this.localStorageKey] = JSON.stringify([]);
    }
    ScalesStorageLocalStorage.prototype.addItem = function (item) {
        var items = JSON.parse(localStorage.getItem(this.localStorageKey));
        items.push(item);
        localStorage[this.localStorageKey] = JSON.stringify(items);
    };
    ScalesStorageLocalStorage.prototype.getItem = function (index) {
        var items = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (index >= items.length) {
            return;
        }
        return items[index];
    };
    ScalesStorageLocalStorage.prototype.getCount = function () {
        var items = JSON.parse(localStorage.getItem(this.localStorageKey));
        return items.length;
    };
    ScalesStorageLocalStorage.scales = 0;
    return ScalesStorageLocalStorage;
}());
var Product = /** @class */ (function () {
    function Product(_name, _scale) {
        this._name = _name;
        this._scale = _scale;
    }
    Product.prototype.getName = function () {
        return this._name;
    };
    Product.prototype.getScale = function () {
        return this._scale;
    };
    return Product;
}());
console.log(Product.prototype);
var scales1 = new Scales(new ScalesStorageEngineArray);
var product1 = new Product('product1', 25);
var product2 = new Product('product2', 26);
var product3 = new Product('product3', 27);
scales1.addItem(product1);
scales1.addItem(product2);
scales1.addItem(product3);
console.log(scales1.getSumScale());
console.log(scales1.getNameList());
var scales2 = new Scales(new ScalesStorageLocalStorage);
var product4 = new Product('product4', 120);
var product5 = new Product('product5', 98);
var product6 = new Product('product6', 45);
var product7 = new Product('product7', 87);
scales2.addItem(product4);
scales2.addItem(product5);
scales2.addItem(product6);
scales2.addItem(product7);
console.log(scales2.getSumScale());
console.log(scales2.getNameList());
//# sourceMappingURL=app.js.map