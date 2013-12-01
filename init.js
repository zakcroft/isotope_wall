$(function (runtime, IsotopeWallController) {
    runtime.controller = new IsotopeWallController ({
        container: 'ul#items', // defaults to this
        filters: '#filter',  // defaults ...
        ajaxResources: [$.getJSON('data/items1.json'), $.get('templates/item.html')] // mandatory n >= 1
    });
    runtime.controller.init();

}(IsotopeWall.runtime, IsotopeWall.IsotopeWallController));

