var Scales = /** @class */ (function () {
    function Scales() {
        this.products = [];
    }
    Scales.prototype.add = function (product) {
        this.products.push(product);
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = 0;
        for (var i = 0; i < this.products.length; i++) {
            sumScale += this.products[i].getScale();
        }
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var nameList = [];
        for (var i = 0; i < this.products.length; i++) {
            nameList.push(this.products[i].getName());
        }
        return nameList;
    };
    return Scales;
}());
var Tomato = /** @class */ (function () {
    function Tomato(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Tomato.prototype.getScale = function () {
        return this.scale;
    };
    Tomato.prototype.getName = function () {
        return this.name;
    };
    return Tomato;
}());
var Apple = /** @class */ (function () {
    function Apple(_name, _scale) {
        this.name = _name;
        this.scale = _scale;
    }
    Apple.prototype.getScale = function () {
        return this.scale;
    };
    Apple.prototype.getName = function () {
        return this.name;
    };
    return Apple;
}());
var scales = new Scales;
var tomato1 = new Tomato('tomato1', 15);
scales.add(tomato1);
var tomato2 = new Tomato('tomato2', 16);
scales.add(tomato2);
var tomato3 = new Tomato('tomato3', 17);
scales.add(tomato3);
var apple1 = new Apple('apple1', 20);
scales.add(apple1);
var apple2 = new Apple('apple2', 32);
scales.add(apple2);
console.log(scales.getNameList());
console.log(scales.getSumScale());
//# sourceMappingURL=app.js.map