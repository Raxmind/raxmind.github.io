(function () {
    'use strict';

    Lampa.Storage.set('platform', 'browser');
    Lampa.Storage.set('isTizen', 'false'); })();

function createProperty(value) {
    var _value = value;

    function _get() {
        return _value;
    }

    function _set(v) {
        _value = v;
    }

    return {
        "get": _get,
        "set": _set
    };
};

function makePropertyWritable(objBase, objScopeName, propName, initValue) {
    var newProp,
        initObj;

    if (objBase && objScopeName in objBase && propName in objBase[objScopeName]) {
        if(typeof initValue === "undefined") {
            initValue = objBase[objScopeName][propName];
        }

        newProp = createProperty(initValue);

        try {
            Object.defineProperty(objBase[objScopeName], propName, newProp);
        } catch (e) {
            initObj = {};
            initObj[propName] = newProp;
            try {
                objBase[objScopeName] = Object.create(objBase[objScopeName], initObj);
            } catch(e) {
            }
        }
    }
};

makePropertyWritable(window, "navigator", "userAgent");

window.navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36";

console.log(window.navigator.userAgent);
