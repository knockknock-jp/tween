(function () {

    /**
     * JavaScriptのシンプルなトゥイーンエンジン2
     * @param target
     * @constructor
     */
    window.Tween = function (target) {

        var _target = target;
        var _intervalId;
        var _count;
        var _arr;

        /**
         * 開始
         * @param property
         * @param parameter
         */
        this.play = function (property, parameter) {
            this.stop();
            var _property = property;
            var _parameter = parameter;
            _arr = [];
            for (var key in _property) {
                _arr.push({
                    targetProperty: key, // 対象プロパティ
                    firstValue: _target[key], // 初期値
                    lastValue: _property[key] // 最終値
                });
            }
            // アニメーション秒数が設定してある場合
            if (_parameter && _parameter["duration"] && 0 < _parameter["duration"]) {
                if (!_parameter["easing"]) _parameter["easing"] = window.Easing.linear; // イージング関数
                _count = 0;
                var scope = this;
                this._intervalId = setInterval(function () {
                    var length = _arr.length;
                    for (var i = 0; i < length; i = i + 1) {
                        if (_parameter["duration"] <= _count) {
                            _target[_arr[i].targetProperty] = _arr[i].lastValue;
                            // 停止
                            scope.stop();
                            // コールバック
                            if (_parameter["on"]) _parameter["on"]({target: _target});
                            if (_parameter["complete"]) _parameter["complete"]({target: _target});
                        } else {
                            var t = _count; // 現在の秒数
                            var b = _arr[i].firstValue; // 初期値
                            var c = _arr[i].lastValue - _arr[i].firstValue; // 目的値
                            var d = _parameter["duration"]; // 完了までの秒数
                            _target[_arr[i].targetProperty] = _parameter["easing"](t, b, c, d);
                            _count = _count + (1000 / 60);
                            // コールバック
                            if (_parameter["on"]) _parameter["on"]({target: _target});
                        }
                    }
                }, 1000 / 60);
                // アニメーション秒数が設定していない場合
            } else {
                var length = _arr.length;
                for (var i = 0; i < length; i = i + 1) {
                    _target[_arr[i].targetProperty] = _arr[i].lastValue;
                }
                // コールバック
                if (_parameter && _parameter["on"]) _parameter["on"]({target: _target});
                if (_parameter && _parameter["complete"]) _parameter["complete"]({target: _target});
            }
        };

        /**
         * 停止
         */
        this.stop = function () {
            clearInterval(this._intervalId);
        };

    };

    /**
     * イージング関数
     * @type {{linear: Function, sineEaseIn: Function, sineEaseInOut: Function, sineEaseOut: Function, sineEaseOutIn: Function, quadraticEaseIn: Function, quadraticEaseInOut: Function, quadraticEaseOut: Function, quadraticEaseOutIn: Function, cubicEaseIn: Function, cubicEaseInOut: Function, cubicEaseOut: Function, cubicEaseOutIn: Function, quarticEaseIn: Function, quarticEaseInOut: Function, quarticEaseOut: Function, quarticEaseOutIn: Function, quinticEaseIn: Function, quinticEaseInOut: Function, quinticEaseOut: Function, quinticEaseOutIn: Function, exponentialEaseIn: Function, exponentialEaseInOut: Function, exponentialEaseOut: Function, exponentialEaseOutIn: Function, circularEaseIn: Function, circularEaseInOut: Function, circularEaseOut: Function, circularEaseOutIn: Function, elasticEaseIn: Function, elasticEaseInOut: Function, elasticEaseOut: Function, elasticEaseOutIn: Function, backEaseIn: Function, backEaseInOut: Function, backEaseOut: Function, backEaseOutIn: Function, bounceEaseIn: Function, bounceEaseInOut: Function, bounceEaseOut: Function, bounceEaseOutIn: Function}}
     */
    window.Easing = {

        /**
         * Linear
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        linear: function (t, b, c, d) {
            return ((c / d) * t) + b;
        },

        /**
         * Sine
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        sineEaseIn: function (t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        sineEaseInOut: function (t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        },
        sineEaseOut: function (t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        sineEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                return (c / 2) * Math.sin((t * 2) / d * (Math.PI / 2)) + b;
            }
            return -(c / 2) * Math.cos((t * 2 - d) / d * (Math.PI / 2)) + (c / 2) + (b + c / 2);
        },

        /**
         * Quadratic
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        quadraticEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        quadraticEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t + b;
            }
            return -c / 2 * ((--t) * (t - 2) - 1) + b;
        },
        quadraticEaseOut: function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        quadraticEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                return -(c / 2) * (t = (t * 2 / d)) * (t - 2) + b;
            }
            return (c / 2) * (t = (t * 2 - d) / d) * t + (b + c / 2);
        },

        /**
         * Cubic
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        cubicEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        cubicEaseInOut: function (t, b, c, d) {
            return ((t /= d / 2) < 1) ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;
        },
        cubicEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        cubicEaseOutIn: function (t, b, c, d) {
            return t < d / 2 ? c / 2 * ((t = t * 2 / d - 1) * t * t + 1) + b : c / 2 * (t = (t * 2 - d) / d) * t * t + b + c / 2;
        },

        /**
         * Quartic
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        quarticEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        quarticEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t + b;
            }
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        },
        quarticEaseOut: function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        quarticEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                return -(c / 2) * ((t = (t * 2) / d - 1) * t * t * t - 1) + b;
            }
            return (c / 2) * (t = (t * 2 - d) / d) * t * t * t + (b + c / 2);
        },

        /**
         * Quintic
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        quinticEaseIn: function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        quinticEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        },
        quinticEaseOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        quinticEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                return (c / 2) * ((t = (t * 2) / d - 1) * t * t * t * t + 1) + b;
            }
            return (c / 2) * (t = (t * 2 - d) / d) * t * t * t * t + (b + c / 2);
        },

        /**
         * Exponential
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        exponentialEaseIn: function (t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        exponentialEaseInOut: function (t, b, c, d) {
            if (t == 0) {

                return b;
            }
            if (t == d) {
                return b + c;
            }
            if ((t /= d / 2.0) < 1.0) {
                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            }
            return c / 2 * (2 - Math.pow(2, -10 * --t)) + b;
        },
        exponentialEaseOut: function (t, b, c, d) {
            return t == d ? b + c : c * (1 - Math.pow(2, -10 * t / d)) + b;
        },
        exponentialEaseOutIn: function (t, b, c, d) {
            if (t < d / 2.0) {
                return t * 2.0 == d ? b + c / 2.0 : c / 2.0 * (1 - Math.pow(2, -10 * t * 2.0 / d)) + b;
            }
            return (t * 2.0 - d) == 0 ? b + c / 2.0 : c / 2.0 * Math.pow(2, 10 * ((t * 2 - d) / d - 1)) + b + c / 2.0;
        },

        /**
         * Circular
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        circularEaseIn: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        circularEaseInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        },
        circularEaseOut: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        circularEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                return (c / 2) * Math.sqrt(1 - (t = (t * 2) / d - 1) * t) + b;
            }
            return -(c / 2) * (Math.sqrt(1 - (t = (t * 2 - d) / d) * t) - 1) + (b + c / 2);
        },

        /**
         * Elastic
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        elasticEaseIn: function (t, b, c, d) {
            var a = 0;
            var p = 0;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            var s;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        elasticEaseInOut: function (t, b, c, d) {
            var a = 0;
            var p = 0;
            if (t == 0) {
                return b;
            }
            if ((t /= d / 2) == 2) {
                return b + c;
            }
            if (!p) {
                p = d * (0.3 * 1.5);
            }
            var s;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) {
                return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            }
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
        },
        elasticEaseOut: function (t, b, c, d) {
            var a = 0;
            var p = 0;
            if (t == 0) {
                return b;
            }
            if ((t /= d) == 1) {
                return b + c;
            }
            if (!p) {
                p = d * 0.3;
            }
            var s;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        elasticEaseOutIn: function (t, b, c, d) {
            var a = 0;
            var p = 0;
            var s;
            c /= 2;
            if (t < d / 2) {
                if ((t *= 2) == 0) {
                    return b;
                }
                if ((t /= d) == 1) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            } else {
                if ((t = t * 2 - d) == 0) {
                    return (b + c);
                }
                if ((t /= d) == 1) {
                    return (b + c) + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + (b + c);
            }
        },

        /**
         * Back
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        backEaseIn: function (t, b, c, d) {
            var s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        backEaseInOut: function (t, b, c, d) {
            var s = 1.70158;
            if ((t /= d / 2) < 1) {
                return c / 2 * (t * t * (((s * 1.525) + 1) * t - s * 1.525)) + b;
            }
            return c / 2 * ((t -= 2) * t * (((s * 1.525) + 1) * t + s * 1.525) + 2) + b;
        },
        backEaseOut: function (t, b, c, d) {
            var s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        backEaseOutIn: function (t, b, c, d) {
            var s = 1.70158;
            if (t < d / 2) {
                return (c / 2) * ((t = (t * 2) / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            }
            return (c / 2) * (t = (t * 2 - d) / d) * t * ((s + 1) * t - s) + (b + c / 2);
        },

        /**
         * Bounce
         * @param {Number} t 現在の秒数
         * @param {Number} b 初期値
         * @param {Number} c 目的値
         * @param {Number} d 完了までの秒数
         */
        bounceEaseIn: function (t, b, c, d) {
            if ((t = (d - t) / d) < (1 / 2.75)) {
                return c - (c * (7.5625 * t * t)) + b;
            }
            if (t < (2 / 2.75)) {
                return c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + b;
            }
            if (t < (2.5 / 2.75)) {
                return c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + b;
            }
            return c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + b;
        },
        bounceEaseInOut: function (t, b, c, d) {
            if (t < d / 2) {
                if ((t = (d - t * 2) / d) < (1 / 2.75)) {
                    return (c - (c * (7.5625 * t * t))) * 0.5 + b;
                }
                if (t < (2 / 2.75)) {
                    return (c - (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75))) * 0.5 + b;
                }
                if (t < (2.5 / 2.75)) {
                    return (c - (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375))) * 0.5 + b;
                }
                return (c - (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375))) * 0.5 + b;
            } else {
                if ((t = (t * 2 - d) / d) < (1 / 2.75)) {
                    return (c * (7.5625 * t * t)) * 0.5 + c * 0.5 + b;
                }
                if (t < (2 / 2.75)) {
                    return (c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) * 0.5 + c * 0.5 + b;
                }
                if (t < (2.5 / 2.75)) {
                    return (c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) * 0.5 + c * 0.5 + b;
                }
                return (c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) * 0.5 + c * 0.5 + b;
            }
        },
        bounceEaseOut: function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75)) {
                return c * (7.5625 * t * t) + b;
            }
            if (t < (2 / 2.75)) {
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            }
            if (t < (2.5 / 2.75)) {
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            }
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
        },
        bounceEaseOutIn: function (t, b, c, d) {
            if (t < d / 2) {
                if ((t = (t * 2) / d) < (1 / 2.75)) {
                    return (c / 2) * (7.5625 * t * t) + b;
                }
                if (t < (2 / 2.75)) {
                    return (c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                }
                if (t < (2.5 / 2.75)) {
                    return (c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                }
                return (c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            } else {
                if ((t = (d - (t * 2 - d)) / d) < (1 / 2.75)) {
                    return (c / 2) - ((c / 2) * (7.5625 * t * t)) + (b + c / 2);
                }
                if (t < (2 / 2.75)) {
                    return (c / 2) - ((c / 2) * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75)) + (b + c / 2);
                }
                if (t < (2.5 / 2.75)) {
                    return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375)) + (b + c / 2);
                }
                return (c / 2) - ((c / 2) * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375)) + (b + c / 2);
            }
        }
    };

})();