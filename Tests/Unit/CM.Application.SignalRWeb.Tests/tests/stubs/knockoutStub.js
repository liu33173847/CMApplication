define(['jquery'], function ($) {
    var _subscribe = function(callback, context) {
        this.subscriptions.push([callback, context]);
    };
    var _observable = function (value) {
        var latestValue = value;
        var innerObservable = function() {
            if (arguments.length > 0) {
                latestValue = arguments[0];
                $.each(innerObservable.subscriptions, function (i, item) {
                    item[0].apply(item[i]);
                });
                return this;
            } else {
                return latestValue;
            }
        };
        innerObservable.subscriptions = [];
        innerObservable.subscribe = _subscribe;

        innerObservable.isObservable = true;
        return innerObservable;
    };
    var ko = {
        applyBindings: function () {
            
        },
        observable: _observable,
        observableArray: function (a) {
            if (arguments.length == 0) {
                a = [];
            }
            var result = _observable(a);
            result.push = function (item) {
                result().push(item);
            };
            result.remove = function (valueOrPredicate) {
                var underlyingArray = a;
                var removedValues = [];
                var predicate = typeof valueOrPredicate == "function" ? valueOrPredicate : function (item) { return item === valueOrPredicate; };
                for (var i = 0; i < underlyingArray.length; i++) {
                    var value = underlyingArray[i];
                    if (predicate(value)) {
                        removedValues.push(value);
                        underlyingArray.splice(i, 1);
                        i--;
                    }
                }
                return removedValues;
            };
            return result;
        },
        renderTemplate: function (template, dataOrBindingContext, options, targetNodeOrNodeArray, renderMode) {
            return;
        },
        removeNode: function (d) {
            return d;
        },
        cleanNode: function (d) {
            return d;
        },
        bindingHandlers: {

        },
        computed: function (func, ctx) {
            var observable = function () { return func.apply(ctx); };

            if (typeof func.read === "function" && typeof func.write === "function") {
                observable = function (newValue) {
                    if (newValue === null || newValue === undefined) {
                        return func.read.apply(ctx);
                    } else {
                        return func.write(newValue);
                    }
                }
            }

            observable.subscribers = [];
            observable.subscribe = function (callback) {
                observable.subscribers.push(callback);
            };
            observable.triggerChange = function () {
                for (var i = 0; i < observable.subscribers.length; i++) {
                    observable.subscribers[i]();
                }
            };
            observable.isComputed = true;
            return observable;
        },   
        isObservable: function (func) {
            return func.isObservable === true;
        },
        utils: {
            unwrapObservable: function (unwrappedObservable) {
                if (unwrappedObservable.isObservable) return unwrappedObservable();
                return unwrappedObservable;
            },
            registerEventHandler: function (element, eventType, handler) {
                if (!element.addEventListener) throw new Error('element needs a mock addEventListener(eventType, handler)');
                element.addEventListener(eventType, handler);
            }
        },
        virtualElements: {
            allowedBindings: {}
        }
    };
    //copied from real ko
    ko.BindingContext = function (dataItem, parentBindingContext, dataItemAlias) {
        if (parentBindingContext) {
            $.extend(this, parentBindingContext); // Inherit $root and any custom properties
            this['$parentContext'] = parentBindingContext;
            this['$parent'] = parentBindingContext['$data'];
            this['$parents'] = (parentBindingContext['$parents'] || []).slice(0);
            this['$parents'].unshift(this['$parent']);
        } else {
            this['$parents'] = [];
            this['$root'] = dataItem;
            // Export 'ko' in the binding context so it will be available in bindings and templates
            // even if 'ko' isn't exported as a global, such as when using an AMD loader.
            // See https://github.com/SteveSanderson/knockout/issues/490
            this['ko'] = ko;
        }
        this['$data'] = dataItem;
        if (dataItemAlias)
            this[dataItemAlias] = dataItem;
    };
    ko.BindingContext.prototype['createChildContext'] = function (dataItem, dataItemAlias) {
        return new ko.BindingContext(dataItem, this, dataItemAlias);
    };
    ko.BindingContext.prototype['extend'] = function (properties) {
        var clone = ko.utils.extend(new ko.BindingContext(), this);
        return ko.utils.extend(clone, properties);
    };

    return ko;

});