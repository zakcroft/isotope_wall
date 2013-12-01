var jam = {
    "packages": [
        {
            "name": "chai",
            "location": "jam/chai",
            "main": "./index"
        },
        {
            "name": "isotope",
            "location": "jam/isotope",
            "main": "jquery.isotope.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "mocha",
            "location": "jam/mocha",
            "main": "./index"
        },
        {
            "name": "sinon",
            "location": "jam/sinon",
            "main": "sinon.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "isotope": {
            "deps": [
                "jquery"
            ]
        },
        "sinon": {
            "exports": "sinon"
        },
        "underscore": {
            "exports": "_"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "chai",
            "location": "jam/chai",
            "main": "./index"
        },
        {
            "name": "isotope",
            "location": "jam/isotope",
            "main": "jquery.isotope.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "mocha",
            "location": "jam/mocha",
            "main": "./index"
        },
        {
            "name": "sinon",
            "location": "jam/sinon",
            "main": "sinon.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "isotope": {
            "deps": [
                "jquery"
            ]
        },
        "sinon": {
            "exports": "sinon"
        },
        "underscore": {
            "exports": "_"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "chai",
            "location": "jam/chai",
            "main": "./index"
        },
        {
            "name": "isotope",
            "location": "jam/isotope",
            "main": "jquery.isotope.js"
        },
        {
            "name": "jquery",
            "location": "jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "mocha",
            "location": "jam/mocha",
            "main": "./index"
        },
        {
            "name": "sinon",
            "location": "jam/sinon",
            "main": "sinon.js"
        },
        {
            "name": "underscore",
            "location": "jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "isotope": {
            "deps": [
                "jquery"
            ]
        },
        "sinon": {
            "exports": "sinon"
        },
        "underscore": {
            "exports": "_"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}