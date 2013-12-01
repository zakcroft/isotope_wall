//var utils = require('../js/lib/utils');
//var expect = require('chai').expect;
//var assert = require('assert');

var expect = chai.expect;


describe('IsotopeWallController', function () {

    var controller = null;
    var testData = [
        {
            "items": [
                {
                    "meta": {"id": "", "type": "comment", "link": "twitter.com"},
                    "content": "START"
                },
                {
                    "meta": {"id": "", "type": "office", "link": "facebook.com"},
                    "content": "This is the content for"
                }
            ]
        }
    ]

    var testFixture = document.querySelectorAll('.testFixture');

    var someHtml = '<some><html></html></some>';


    var loadResourcesStub = null;

    var isoController = IsotopeWall.IsotopeWallController;
    var container = 'ul#items'; // defaults to this
    var filters = '#filter';  // defaults ...
    var ajaxResources = [$.getJSON('../data/items1.json'), $.get('../templates/item.html')] // mandatory n >= 1

    // all
    beforeEach(function () {
        controller = new isoController({container: container, filters: filters, ajaxResources: ajaxResources });
    });

    // all
    afterEach(function () {
        delete controller;
    })

    describe("loadResources", function () {


        // pointless
        it('succeeds to return a promise using fake ajax requests', function () {

            //controller = new isoController({container: container, filters: filters,  ajaxResources: ajaxResources });

            var requests = this.requests = [];
            var loadResourcesSpy = sinon.spy(controller, "loadResources");
            var xhr = sinon.useFakeXMLHttpRequest();

            xhr.onCreate = function (xhr) {
                requests.push(xhr);
            };

            $.getJSON();
            $.get();

            this.requests[0].respond(200, { "Content-Type": "application/json" }, JSON.stringify(testData[0]));
            this.requests[1].respond(200, { "Content-Type": "text/html" }, someHtml);

            controller.loadResources(requests);

            expect(loadResourcesSpy.calledOnce, "loadResources called more than once").to.be.true;

            var spyCall = loadResourcesSpy.returnValues[0];

            expect(spyCall.state(), "loadResources does not resolve a promise").to.eq('resolved');

            xhr.restore();
            loadResourcesSpy.restore();

        })

    })


    describe("init", function () {


        beforeEach(function () {

            loadResourcesStub = sinon.stub(controller, "loadResources");
        });

        afterEach(function () {
            loadResourcesStub.restore();
        })

        it('Successful resource loading calls correct method in order', function () {

            loadResourcesStub.returns($.Deferred().resolve(testData, [someHtml]).promise());

            var configureResourcesSpy = sinon.spy(controller, "configureResources");
            var appendJsonToDomSpy = sinon.spy(controller, "appendJsonToDom");
            var startIsotopeSpy = sinon.spy(controller, "startIsotope");
            var startInfiniteScroll = sinon.spy(controller, "startInfiniteScroll");
            var attachHandlers = sinon.spy(controller, "attachHandlers");

            controller.init();

            expect(configureResourcesSpy.calledOnce, "configureResources called more than once").to.be.true;
            expect(configureResourcesSpy.calledWith(someHtml), "configureResources called with wrong parameter").to.be.true;
            expect(configureResourcesSpy.calledBefore(appendJsonToDomSpy), "appendJsonToDom called before configureResources").to.be.true;

            expect(appendJsonToDomSpy.calledOnce, "appendJsonToDom called more than once").to.be.true;
            expect(appendJsonToDomSpy.calledWith(testData[0].items, someHtml), "appendJsonToDom called with wrong parameter").to.be.true;
            expect(appendJsonToDomSpy.calledBefore(startIsotopeSpy), "startIsotope called before appendJsonToDom").to.be.true;

            expect(startIsotopeSpy.calledOnce, "startIsotope called more than once").to.be.true;
            expect(startIsotopeSpy.calledWith(sinon.match.object), "startIsotope called with non object").to.be.true;

            expect(startInfiniteScroll.calledOnce, "startInfinite called more than once").to.be.true;
            expect(startInfiniteScroll.calledWith(sinon.match.object), "startInfinite called with non object").to.be.true;

            expect(attachHandlers.calledOnce, "attachHandlers called more than once").to.be.true;

            configureResourcesSpy.restore();
            appendJsonToDomSpy.restore();
            startIsotopeSpy.restore();
            startInfiniteScroll.restore();
            attachHandlers.restore();
            document.getElementById('items').innerHTML = '';

        });

        it('Unsuccessful resource loading calls correct method', function () {

            var mock = sinon.mock(IsotopeWall.utils);

            mock.expects("err").withExactArgs("init failed").once();

            loadResourcesStub.returns($.Deferred().reject({}, {}, "could not complete").promise());

            controller.init();

            mock.verify();

        });

        it('throws error when fails to load resources', function () {
            var iso = IsotopeWall.utils;

            var spy = sinon.spy(IsotopeWall.utils, "err");

            loadResourcesStub.returns($.Deferred().reject({}, {}, "could not complete").promise());

            controller.init();

            expect(spy.threw(), 'spy not threw').to.be.true;

            expect(spy.calledOnce, 'spy not called').to.be.true;

        });

    })

    describe("compileItems", function () {

        var compileItemsSpy = null;

        beforeEach(function (done) {

            var promise = $.get('../templates/item.html').then(function(html){
                controller.compiledHtml = _.template(html);
                done();
            })

            compileItemsSpy = sinon.spy(controller, "compileItems");
        });

        afterEach(function () {
            compileItemsSpy.restore();
        });

        it('compiles the items to domElements', function () {

            controller.compileItems(testData[0].items);
            var spyCall = compileItemsSpy.returnValues[0];

            expect(compileItemsSpy.calledOnce, 'compileItems not called once').to.be.true;
            expect(compileItemsSpy.returned(sinon.match.array), 'Compiled Dom Elements is not an array').to.be.true;
            expect(spyCall.length).to.equal(2);

        });
    })

    describe("appendItems", function () {

        var spy = null;
        var items = null;

        beforeEach(function (done) {

            var promise = $.get('../templates/item.html').then(function (html) {
                controller.compiledHtml = _.template(html);
                items = controller.compileItems(testData[0].items);
                done();
            })

            spy = sinon.spy(controller, "appendItems");


        });

        afterEach(function () {
            spy.restore();
        });

        it('should append Json To Dom ', function () {

            controller.appendItems(items);

            var domItems = document.getElementById('items');

            expect(domItems.children[1].nodeName).to.equal('LI');
            expect(domItems.children[1].nodeType).to.equal(1);

        })
    })
})

