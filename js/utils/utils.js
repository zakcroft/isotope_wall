IsotopeWall.utils = (function () {
    "use strict"

    var mixin = function (obj, props) {
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                obj[prop] = props[prop];
            }
        }
    };

    var clone = function(obj){
        var c = {}
        mixin(c, obj)
        return c
    }

    var inherits = function (c, p) {

        if(Object.create){
            inheritsEC5(c, p);
            return;
        }

        function __() {
            this.constructor = c;
        }
        __.prototype = p.prototype;

        c.prototype = new __();

        c.prototype._super = p.prototype;

    }

    var inheritsEC5 = function (c, p) {

        // is this right?
        if (Object.isFrozen(p.prototype)) {
            throw new TypeError("Extending this class is forbidden");
        }

        // however this is meant to be slower that inherits part above
        //http://jsperf.com/object-create-vs-constructor-vs-object-literal/7
        c.prototype = Object.create(p.prototype)


        /* Adding props this way avoids enumeration and overwriting*/
        // you still need to reset the constructor
        Object.defineProperty(c.prototype, "constructor", {
            value: c
        });

        // set _super on the prototype as its nicer
        Object.defineProperty(c.prototype, "_super", {
            value: p.prototype
        });

        //  Object.getOwnPropertyDescriptor(User.prototype, 'constructor')
        //      => Object {value: function, writable: false, enumerable: false, configurable: false}

    }

    var err = function(msg){
        throw new Error(msg);
    }

    return {
        //createGettersAndSetters: createGettersAndSetters,
        mixin:mixin,
        clone:clone,
        inherits: inherits,
        inheritsEC5:inheritsEC5,
        err:err
    }

    //module.exports = IsotopeWall.utils;
})();


