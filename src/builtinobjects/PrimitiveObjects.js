//typescript version of built in objects
var NumberObj = (function () {
    function NumberObj(value) {
        this.type = "number";
        this.value = value;
    }
    NumberObj.prototype.increment = function (amount) {
        this.value += amount.value;
    };
    return NumberObj;
})();
//# sourceMappingURL=PrimitiveObjects.js.map