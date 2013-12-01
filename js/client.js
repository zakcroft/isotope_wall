IsotopeWall.IsotopeWallController = (function ($, _, utils, defaults) {
    "use strict"
    function IsotopeWallController(settings) {
        //var validators = Array.prototype.slice.call( arguments )

        this.container = $(settings.container || 'ul#items');
        this.domFilters = $(settings.filters || '#filter');
        this.compiledHtml = null;
        this.ajaxResources = settings.ajaxResources || utils.err('No resources');
        this.isotope = settings.isotope || {};
        this.infiniteScroll = $(settings.infiniteScroll || {});
    }

    IsotopeWallController.prototype.init = function () {
        var _self = this;
        this.loadResources(
                _self.ajaxResources
            ).done(function (json, html) {
                _self.configureResources(html[0]);
                _self.appendJsonToDom(_self.parseData(json[0]), html[0]);
                _self.startIsotope(_self.isotope).startInfiniteScroll(_self.infiniteScroll).attachHandlers();

            }).fail(function () {
                try {
                    utils.err("init failed");
                }
                catch (err) {
                    //Handle errors here
                }

            });
    }

    IsotopeWallController.prototype.attachHandlers = function () {
        var _self = this;
        $("a", this.domFilters).click(function (e) {
            e.preventDefault();
            _self.filterResults($(this).attr('data-option-value'));
        })
        return this;
    }

    IsotopeWallController.prototype.filterResults = function (filter) {
        this.container.isotope({ filter: filter });
        return this;
    }

    IsotopeWallController.prototype.loadResources = function (resources) {
        return $.when.apply($, resources);
    }

    IsotopeWallController.prototype.configureResources = function (html) {
        this.compiledHtml = _.template(html);
        return this;
    }

    IsotopeWallController.prototype.appendJsonToDom = function (json) {
        this.appendItems(this.compileItems(json));
        return this;
    }

    IsotopeWallController.prototype.compileItems = function (json) {
        var _self = this;
        var domElements = [];
        $.each(json, function (index, item) {
            domElements[index] = $(_self.compiledHtml(item))[0];
        })
        return domElements;
    }

    IsotopeWallController.prototype.appendItems = function (items) {
        this.container.append(items);
        return this;
    }

    IsotopeWallController.prototype.startIsotope = function (setting) {
        this.container.isotope($.extend(defaults.isotope, setting));
        return this;
    }

    IsotopeWallController.prototype.startInfiniteScroll = function (setting) {
        var _self = this;
        this.container.infinitescroll($.extend(defaults.infiniteScroll, setting),
            function (json, opts) {
                var els = _self.compileItems(json.items);
                _self.appendItems($(els))
                _self.container.isotope('appended', $(els));
            }
        );
        return this;
    }

    IsotopeWallController.prototype.parseData = function (json) {
        return json.items;
    }

//    if (typeof exports !== "undefined" && typeof module !== "undefined") {
//        module.exports = IsotopeWallController;
//    }

    return IsotopeWallController;



})(jQuery, _, IsotopeWall.utils, IsotopeWall.defaults);






