$.fn.preBind = function (type, data, fn) {
    this.each(function () {
        var $this = $(this);

        $this.bind(type, data, fn);

        var currentBindings = $._data(this, 'events')[type];
        if ($.isArray(currentBindings)) {
            currentBindings.unshift(currentBindings.pop());
        }
    });
    return this;
};