var _STRINGS = {
        Ad: {
            Mobile: {
                Preroll: {
                    ReadyIn: "The game is ready in ",
                    Loading: "Your game is loading...",
                    Close: "Close"
                },
                Header: {
                    ReadyIn: "The game is ready in ",
                    Loading: "Your game is loading...",
                    Close: "Close"
                },
                End: {
                    ReadyIn: "Advertisement ends in ",
                    Loading: "Please wait ...",
                    Close: "Close"
                }
            }
        },
        Loading: {
            Loading: "LOADING"
        },
        Tutorial: [
            ["Hi! My name is Tom.", "Welcome to Talking Tom Gold Run!"],
            ["Collect gold bricks to turn into", "an invincible ball!"],
            ["Flick upwards to jump", "over the obstacle."],
            ["Press the UP ARROW to", "jump over the obstacle."],
            ["Tap or Flick to the right", "to pick up those coins!"],
            ["Press the RIGHT ARROW", "to pick up those coins!"],
            ["We need to go to the left now.", "Tap or Flick to the left."],
            ["We need to go to the left now.", "Press the LEFT ARROW."],
            ["Almost there! Tap or Flick", "to the left again."],
            ["Almost there! Press the", "LEFT ARROW again."],
            ["Flick downwards to slide", "and grab that cookie!"],
            ["Press the DOWN ARROW to slide", "and grab that cookie!"],
            ["It's all up to you now.", "Good luck and have fun!"]
        ],
        UI: {
            enter: "enter",
            continue: "continue",
            owned: "owned",
            using: "using",
            skateboard: "skateboard",
            "roller-skates": "roller-skates",
            rocket: "rocket",
            "flying carpet": "flying carpet",
            hoverboard: "hoverboard"
        }
    },
    _SETTINGS = {
        API: {
            Enabled: !0,
            Log: {
                Events: {
                    InitializeGame: !0,
                    EndGame: !0,
                    Level: {
                        Begin: !0,
                        End: !0,
                        Win: !0,
                        Lose: !0,
                        Draw: !0
                    }
                }
            }
        },
        Ad: {
            Mobile: {
                Preroll: {
                    Enabled: !0,
                    Duration: 5,
                    Width: 300,
                    Height: 250,
                    Rotation: {
                        Enabled: !1,
                        Weight: {
                            MobileAdInGamePreroll: 40,
                            MobileAdInGamePreroll2: 40,
                            MobileAdInGamePreroll3: 20
                        }
                    }
                },
                Header: {
                    Enabled: !1,
                    Duration: 5,
                    Width: 320,
                    Height: 50,
                    Rotation: {
                        Enabled: !1,
                        Weight: {
                            MobileAdInGameHeader: 40,
                            MobileAdInGameHeader2: 40,
                            MobileAdInGameHeader3: 20
                        }
                    }
                },
                Footer: {
                    Enabled: !1,
                    Duration: 5,
                    Width: 320,
                    Height: 50,
                    Rotation: {
                        Enabled: !1,
                        Weight: {
                            MobileAdInGameFooter: 40,
                            MobileAdInGameFooter2: 40,
                            MobileAdInGameFooter3: 20
                        }
                    }
                },
                End: {
                    Enabled: !1,
                    Duration: 1,
                    Width: 300,
                    Height: 250,
                    Rotation: {
                        Enabled: !1,
                        Weight: {
                            MobileAdInGameEnd: 40,
                            MobileAdInGameEnd2: 40,
                            MobileAdInGameEnd3: 20
                        }
                    }
                }
            }
        },
        Language: {
            Default: "en"
        },
        DeveloperBranding: {
            Splash: {
                Enabled: 0
            },
            Logo: {
                Enabled: !0,
                Link: "http://www.gamessumo.com",
                LinkEnabled: !1,
                NewWindow: !0,
                Width: 166,
                Height: 61
            }
        },
        Branding: {
            Splash: {
                Enabled: !1
            },
            Logo: {
                Enabled: !1,
                Link: "http://www.gamessumo.com",
                LinkEnabled: !0,
                NewWindow: !0,
                Width: 280,
                Height: 34
            }
        },
        MoreGames: {
            Enabled: 1,
            Link: "http://www.gamessumo.com",
            NewWindow: !0
        },
        Gamecenter: {
            Enabled: !0
        }
    },
    MobileAdInGamePreroll = {
        ad_duration: _SETTINGS.Ad.Mobile.Preroll.Duration,
        ad_width: _SETTINGS.Ad.Mobile.Preroll.Width,
        ad_height: _SETTINGS.Ad.Mobile.Preroll.Height,
        ready_in: _STRINGS.Ad.Mobile.Preroll.ReadyIn,
        loading: _STRINGS.Ad.Mobile.Preroll.Loading,
        close: _STRINGS.Ad.Mobile.Preroll.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
        Initialize: function() {
            if (_SETTINGS.Ad.Mobile.Preroll.Rotation.Enabled) {
                var e = (i = _SETTINGS.Ad.Mobile.Preroll.Rotation.Weight).MobileAdInGamePreroll,
                    t = e + i.MobileAdInGamePreroll2,
                    i = t + i.MobileAdInGamePreroll3,
                    n = Math.floor(100 * Math.random());
                console.log("seed: ", n), n <= e ? this.selectedOverlayName = "MobileAdInGamePreroll" : n <= t ? this.selectedOverlayName = "MobileAdInGamePreroll2" : n <= i && (this.selectedOverlayName = "MobileAdInGamePreroll3"), console.log("Ad rotating preroll enabled")
            } else this.selectedOverlayName = "MobileAdInGamePreroll", console.log("Ad rotating preroll disabled");
            console.log("selected:", this.selectedOverlayName), this.overlay = $("#" + this.selectedOverlayName), this.box = $("#" + this.selectedOverlayName + "-Box"), this.game = $("#game"), this.boxContents = {
                footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
                header: $("#" + this.selectedOverlayName + "-Box-Header"),
                close: $("#" + this.selectedOverlayName + "-Box-Close"),
                body: $("#" + this.selectedOverlayName + "-Box-Body")
            }, this.box.width(this.ad_width), this.box.height(this.ad_height), this.box.css("left", (this.overlay.width() - this.box.width()) / 2), this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2), this.overlay.show(this.Timer(0))
        },
        Timer: function(e) {
            var t = e,
                i = setInterval(function() {
                    MobileAdInGamePreroll.boxContents.header.text(MobileAdInGamePreroll.ready_in + t + "..."), MobileAdInGamePreroll.boxContents.footer.text(MobileAdInGamePreroll.loading), 0 > --t && (clearInterval(i), MobileAdInGamePreroll.boxContents.close.css("left", MobileAdInGamePreroll.boxContents.body.width() - 23), MobileAdInGamePreroll.boxContents.close.show(), MobileAdInGamePreroll.boxContents.header.html(MobileAdInGamePreroll.close), MobileAdInGamePreroll.boxContents.footer.text(""))
                }, 1e3)
        },
        Close: function() {
            this.boxContents.close.hide(), this.overlay.hide()
        }
    },
    MobileAdInGameHeader = {
        ad_duration: _SETTINGS.Ad.Mobile.Header.Duration,
        ad_width: _SETTINGS.Ad.Mobile.Header.Width,
        ad_height: _SETTINGS.Ad.Mobile.Header.Height,
        Initialize: function() {
            if (_SETTINGS.Ad.Mobile.Header.Rotation.Enabled) {
                var e = (i = _SETTINGS.Ad.Mobile.Header.Rotation.Weight).MobileAdInGameHeader,
                    t = e + i.MobileAdInGameHeader2,
                    i = t + i.MobileAdInGameHeader3,
                    n = Math.floor(100 * Math.random());
                console.log("seed: ", n), n <= e ? this.selectedOverlayName = "MobileAdInGameHeader" : n <= t ? this.selectedOverlayName = "MobileAdInGameHeader2" : n <= i && (this.selectedOverlayName = "MobileAdInGameHeader3"), console.log("Ad rotating header enabled")
            } else this.selectedOverlayName = "MobileAdInGameHeader", console.log("Ad rotating header disabled");
            this.div = $("#" + this.selectedOverlayName), this.game = $("#game"), this.div.width(this.ad_width), this.div.height(this.ad_height), this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2), this.div.css("top", 0), this.div.show(this.Timer(this.ad_duration))
        },
        Timer: function(e) {
            var t = setInterval(function() {
                0 > --e && (MobileAdInGameHeader.div.hide(), clearInterval(t))
            }, 1e3)
        }
    },
    MobileAdInGameFooter = {
        ad_duration: _SETTINGS.Ad.Mobile.Footer.Duration,
        ad_width: _SETTINGS.Ad.Mobile.Footer.Width,
        ad_height: _SETTINGS.Ad.Mobile.Footer.Height,
        Initialize: function() {
            if (_SETTINGS.Ad.Mobile.Footer.Rotation.Enabled) {
                var e = (i = _SETTINGS.Ad.Mobile.Footer.Rotation.Weight).MobileAdInGameFooter,
                    t = e + i.MobileAdInGameFooter2,
                    i = t + i.MobileAdInGameFooter3,
                    n = Math.floor(100 * Math.random());
                console.log("seed: ", n), n <= e ? this.selectedOverlayName = "MobileAdInGameFooter" : n <= t ? this.selectedOverlayName = "MobileAdInGameFooter2" : n <= i && (this.selectedOverlayName = "MobileAdInGameFooter3"), console.log("Ad rotating footer enabled")
            } else this.selectedOverlayName = "MobileAdInGameFooter", console.log("Ad rotating footer disabled");
            this.div = $("#" + this.selectedOverlayName), this.game = $("#game"), this.div.width(this.ad_width), this.div.height(this.ad_height), this.div.css("left", this.game.position().left + (this.game.width() - this.div.width()) / 2), this.div.css("top", this.game.height() - this.div.height() - 5), this.div.show(this.Timer(this.ad_duration))
        },
        Timer: function(e) {
            var t = setInterval(function() {
                0 > --e && (MobileAdInGameFooter.div.hide(), clearInterval(t))
            }, 1e3)
        }
    },
    MobileAdInGameEnd = {
        ad_duration: _SETTINGS.Ad.Mobile.End.Duration,
        ad_width: _SETTINGS.Ad.Mobile.End.Width,
        ad_height: _SETTINGS.Ad.Mobile.End.Height,
        ready_in: _STRINGS.Ad.Mobile.End.ReadyIn,
        loading: _STRINGS.Ad.Mobile.End.Loading,
        close: _STRINGS.Ad.Mobile.End.Close + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
        Initialize: function() {
            if (_SETTINGS.Ad.Mobile.End.Rotation.Enabled) {
                var e = (i = _SETTINGS.Ad.Mobile.End.Rotation.Weight).MobileAdInGameEnd,
                    t = e + i.MobileAdInGameEnd2,
                    i = t + i.MobileAdInGameEnd3,
                    n = Math.floor(100 * Math.random());
                console.log("seed: ", n), n <= e ? this.selectedOverlayName = "MobileAdInGameEnd" : n <= t ? this.selectedOverlayName = "MobileAdInGameEnd2" : n <= i && (this.selectedOverlayName = "MobileAdInGameEnd3"), console.log("Ad rotating end enabled")
            } else this.selectedOverlayName = "MobileAdInGameEnd", console.log("Ad rotating end disabled");
            console.log("selected:", this.selectedOverlayName), this.overlay = $("#" + this.selectedOverlayName), this.box = $("#" + this.selectedOverlayName + "-Box"), this.game = $("#game"), this.boxContents = {
                footer: $("#" + this.selectedOverlayName + "-Box-Footer"),
                header: $("#" + this.selectedOverlayName + "-Box-Header"),
                close: $("#" + this.selectedOverlayName + "-Box-Close"),
                body: $("#" + this.selectedOverlayName + "-Box-Body")
            }, this.box.width(this.ad_width), this.box.height(this.ad_height), this.box.css("left", (this.overlay.width() - this.box.width()) / 2), this.box.css("top", (this.overlay.height() - this.box.height() - this.boxContents.header.height() - this.boxContents.footer.height()) / 2), this.overlay.show(this.Timer(this.ad_duration))
        },
        Timer: function(e) {
            var t = e,
                i = setInterval(function() {
                    MobileAdInGameEnd.boxContents.header.text(MobileAdInGameEnd.ready_in + t + "..."), MobileAdInGameEnd.boxContents.footer.text(MobileAdInGameEnd.loading), 0 > --t && (clearInterval(i), MobileAdInGameEnd.boxContents.close.css("left", MobileAdInGameEnd.boxContents.body.width() - 23), MobileAdInGameEnd.boxContents.close.show(), MobileAdInGameEnd.boxContents.header.html(MobileAdInGameEnd.close), MobileAdInGameEnd.boxContents.footer.text(""))
                }, 1e3)
        },
        Close: function() {
            this.boxContents.close.hide(), this.overlay.hide()
        }
    };
! function(e, t) {
    function i(e, i, n) {
        if (n === t && 1 === e.nodeType)
            if (n = "data-" + i.replace(Se, "-$1").toLowerCase(), "string" == typeof(n = e.getAttribute(n))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : ve.test(n) ? W.parseJSON(n) : n)
                } catch (e) {}
                W.data(e, i, n)
            } else n = t;
        return n
    }

    function n(e) {
        for (var t in e)
            if (("data" !== t || !W.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }

    function s() {
        return !1
    }

    function a() {
        return !0
    }

    function o(e) {
        return !e || !e.parentNode || 11 === e.parentNode.nodeType
    }

    function r(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }

    function h(e, t, i) {
        if (t = t || 0, W.isFunction(t)) return W.grep(e, function(e, n) {
            return !!t.call(e, n, e) === i
        });
        if (t.nodeType) return W.grep(e, function(e) {
            return e === t === i
        });
        if ("string" == typeof t) {
            var n = W.grep(e, function(e) {
                return 1 === e.nodeType
            });
            if (Zt.test(t)) return W.filter(t, n, !i);
            t = W.filter(t, n)
        }
        return W.grep(e, function(e) {
            return 0 <= W.inArray(e, t) === i
        })
    }

    function l(e) {
        var t = si.split("|");
        if ((e = e.createDocumentFragment()).createElement)
            for (; t.length;) e.createElement(t.pop());
        return e
    }

    function u(e, t) {
        if (1 === t.nodeType && W.hasData(e)) {
            var i, n, s;
            n = W._data(e);
            var a = W._data(t, n),
                o = n.events;
            if (o)
                for (i in delete a.handle, a.events = {}, o)
                    for (n = 0, s = o[i].length; n < s; n++) W.event.add(t, i, o[i][n]);
            a.data && (a.data = W.extend({}, a.data))
        }
    }

    function c(e, t) {
        var i;
        1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), "object" === (i = t.nodeName.toLowerCase()) ? (t.parentNode && (t.outerHTML = e.outerHTML), W.support.html5Clone && e.innerHTML && !W.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === i && mi.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === i ? t.selected = e.defaultSelected : "input" === i || "textarea" === i ? t.defaultValue = e.defaultValue : "script" === i && t.text !== e.text && (t.text = e.text), t.removeAttribute(W.expando))
    }

    function d(e) {
        return void 0 !== e.getElementsByTagName ? e.getElementsByTagName("*") : void 0 !== e.querySelectorAll ? e.querySelectorAll("*") : []
    }

    function g(e) {
        mi.test(e.type) && (e.defaultChecked = e.checked)
    }

    function m(e, t) {
        if (t in e) return t;
        for (var i = t.charAt(0).toUpperCase() + t.slice(1), n = t, s = Li.length; s--;)
            if ((t = Li[s] + i) in e) return t;
        return n
    }

    function p(e, t) {
        return e = t || e, "none" === W.css(e, "display") || !W.contains(e.ownerDocument, e)
    }

    function f(e, t) {
        for (var i, n, s = [], a = 0, o = e.length; a < o; a++)(i = e[a]).style && (s[a] = W._data(i, "olddisplay"), t ? (!s[a] && "none" === i.style.display && (i.style.display = ""), "" === i.style.display && p(i) && (s[a] = W._data(i, "olddisplay", w(i.nodeName)))) : (n = vi(i, "display"), !s[a] && "none" !== n && W._data(i, "olddisplay", n)));
        for (a = 0; a < o; a++) !(i = e[a]).style || t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? s[a] || "" : "none");
        return e
    }

    function y(e, t, i) {
        return (e = _i.exec(t)) ? Math.max(0, e[1] - (i || 0)) + (e[2] || "px") : t
    }

    function x(e, t, i, n) {
        t = i === (n ? "border" : "content") ? 4 : "width" === t ? 1 : 0;
        for (var s = 0; 4 > t; t += 2) "margin" === i && (s += W.css(e, i + Di[t], !0)), n ? ("content" === i && (s -= parseFloat(vi(e, "padding" + Di[t])) || 0), "margin" !== i && (s -= parseFloat(vi(e, "border" + Di[t] + "Width")) || 0)) : (s += parseFloat(vi(e, "padding" + Di[t])) || 0, "padding" !== i && (s += parseFloat(vi(e, "border" + Di[t] + "Width")) || 0));
        return s
    }

    function b(e, t, i) {
        var n = "width" === t ? e.offsetWidth : e.offsetHeight,
            s = !0,
            a = W.support.boxSizing && "border-box" === W.css(e, "boxSizing");
        if (0 >= n || null == n) {
            if ((0 > (n = vi(e, t)) || null == n) && (n = e.style[t]), Mi.test(n)) return n;
            s = a && (W.support.boxSizingReliable || n === e.style[t]), n = parseFloat(n) || 0
        }
        return n + x(e, t, i || (a ? "border" : "content"), s) + "px"
    }

    function w(e) {
        if (zi[e]) return zi[e];
        var t = W("<" + e + ">").appendTo(R.body),
            i = t.css("display");
        return t.remove(), "none" !== i && "" !== i || (Si = R.body.appendChild(Si || W.extend(R.createElement("iframe"), {
            frameBorder: 0,
            width: 0,
            height: 0
        })), ki && Si.createElement || ((ki = (Si.contentWindow || Si.contentDocument).document).write("<!doctype html><html><body>"), ki.close()), t = ki.body.appendChild(ki.createElement(e)), i = vi(t, "display"), R.body.removeChild(Si)), zi[e] = i, i
    }

    function v(e, t, i, n) {
        var s;
        if (W.isArray(t)) W.each(t, function(t, s) {
            i || Hi.test(e) ? n(e, s) : v(e + "[" + ("object" == typeof s ? t : "") + "]", s, i, n)
        });
        else if (i || "object" !== W.type(t)) n(e, t);
        else
            for (s in t) v(e + "[" + s + "]", t[s], i, n)
    }

    function S(e) {
        return function(t, i) {
            "string" != typeof t && (i = t, t = "*");
            var n, s, a = t.toLowerCase().split(V),
                o = 0,
                r = a.length;
            if (W.isFunction(i))
                for (; o < r; o++) n = a[o], (s = /^\+/.test(n)) && (n = n.substr(1) || "*"), (n = e[n] = e[n] || [])[s ? "unshift" : "push"](i)
        }
    }

    function k(e, i, n, s, a, o) {
        var r;
        (o = o || {})[a = a || i.dataTypes[0]] = !0;
        for (var h = 0, l = (a = e[a]) ? a.length : 0, u = e === en; h < l && (u || !r); h++) "string" == typeof(r = a[h](i, n, s)) && (!u || o[r] ? r = t : (i.dataTypes.unshift(r), r = k(e, i, n, s, r, o)));
        return (u || !r) && !o["*"] && (r = k(e, i, n, s, "*", o)), r
    }

    function T(e, i) {
        var n, s, a = W.ajaxSettings.flatOptions || {};
        for (n in i) i[n] !== t && ((a[n] ? e : s || (s = {}))[n] = i[n]);
        s && W.extend(!0, e, s)
    }

    function I() {
        try {
            return new e.XMLHttpRequest
        } catch (e) {}
    }

    function A() {
        return setTimeout(function() {
            dn = t
        }, 0), dn = W.now()
    }

    function E(e, t, i) {
        var n, s, a, o, r, h = 0,
            l = yn.length,
            u = W.Deferred().always(function() {
                delete c.elem
            }),
            c = function() {
                for (var t = dn || A(), i = 1 - ((t = Math.max(0, d.startTime + d.duration - t)) / d.duration || 0), n = 0, s = d.tweens.length; n < s; n++) d.tweens[n].run(i);
                return u.notifyWith(e, [d, i, t]), 1 > i && s ? t : (u.resolveWith(e, [d]), !1)
            },
            d = u.promise({
                elem: e,
                props: W.extend({}, t),
                opts: W.extend(!0, {
                    specialEasing: {}
                }, i),
                originalProperties: t,
                originalOptions: i,
                startTime: dn || A(),
                duration: i.duration,
                tweens: [],
                createTween: function(t, i) {
                    var n = W.Tween(e, d.opts, t, i, d.opts.specialEasing[t] || d.opts.easing);
                    return d.tweens.push(n), n
                },
                stop: function(t) {
                    for (var i = 0, n = t ? d.tweens.length : 0; i < n; i++) d.tweens[i].run(1);
                    return t ? u.resolveWith(e, [d, t]) : u.rejectWith(e, [d, t]), this
                }
            });
        for (n in t = d.props, i = d.opts.specialEasing, t)
            if (a = i[s = W.camelCase(n)], o = t[n], W.isArray(o) && (a = o[1], o = t[n] = o[0]), n !== s && (t[s] = o, delete t[n]), (r = W.cssHooks[s]) && "expand" in r)
                for (n in o = r.expand(o), delete t[s], o) n in t || (t[n] = o[n], i[n] = a);
            else i[s] = a;
        for (; h < l; h++)
            if (n = yn[h].call(d, e, t, d.opts)) return n;
        var g = d;
        return W.each(t, function(e, t) {
            for (var i = (xn[e] || []).concat(xn["*"]), n = 0, s = i.length; n < s && !i[n].call(g, e, t); n++);
        }), W.isFunction(d.opts.start) && d.opts.start.call(e, d), W.fx.timer(W.extend(c, {
            anim: d,
            queue: d.opts.queue,
            elem: e
        })), d.progress(d.opts.progress).done(d.opts.done, d.opts.complete).fail(d.opts.fail).always(d.opts.always)
    }

    function P(e, t, i, n, s) {
        return new P.prototype.init(e, t, i, n, s)
    }

    function _(e, t) {
        var i, n = {
                height: e
            },
            s = 0;
        for (t = t ? 1 : 0; 4 > s; s += 2 - t) n["margin" + (i = Di[s])] = n["padding" + i] = e;
        return t && (n.opacity = n.width = e), n
    }

    function M(e) {
        return W.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var C, z, R = e.document,
        O = e.location,
        D = e.navigator,
        L = e.jQuery,
        N = e.$,
        j = Array.prototype.push,
        H = Array.prototype.slice,
        B = Array.prototype.indexOf,
        G = Object.prototype.toString,
        U = Object.prototype.hasOwnProperty,
        F = String.prototype.trim,
        W = function(e, t) {
            return new W.fn.init(e, t, C)
        },
        q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        $ = /\S/,
        V = /\s+/,
        X = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        K = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        Y = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        Q = /^[\],:{}\s]*$/,
        J = /(?:^|:|,)(?:\s*\[)+/g,
        Z = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        ee = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        te = /^-ms-/,
        ie = /-([\da-z])/gi,
        ne = function(e, t) {
            return (t + "").toUpperCase()
        },
        se = function() {
            R.addEventListener ? (R.removeEventListener("DOMContentLoaded", se, !1), W.ready()) : "complete" === R.readyState && (R.detachEvent("onreadystatechange", se), W.ready())
        },
        ae = {};
    W.fn = W.prototype = {
        constructor: W,
        init: function(e, i, n) {
            var s, a;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if ("string" == typeof e) {
                if ((s = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && 3 <= e.length ? [null, e, null] : K.exec(e)) && (s[1] || !i)) {
                    if (s[1]) return a = (i = i instanceof W ? i[0] : i) && i.nodeType ? i.ownerDocument || i : R, e = W.parseHTML(s[1], a, !0), Y.test(s[1]) && W.isPlainObject(i) && this.attr.call(e, i, !0), W.merge(this, e);
                    if ((i = R.getElementById(s[2])) && i.parentNode) {
                        if (i.id !== s[2]) return n.find(e);
                        this.length = 1, this[0] = i
                    }
                    return this.context = R, this.selector = e, this
                }
                return !i || i.jquery ? (i || n).find(e) : this.constructor(i).find(e)
            }
            return W.isFunction(e) ? n.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), W.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return H.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e, t, i) {
            return (e = W.merge(this.constructor(), e)).prevObject = this, e.context = this.context, "find" === t ? e.selector = this.selector + (this.selector ? " " : "") + i : t && (e.selector = this.selector + "." + t + "(" + i + ")"), e
        },
        each: function(e, t) {
            return W.each(this, e, t)
        },
        ready: function(e) {
            return W.ready.promise().done(e), this
        },
        eq: function(e) {
            return -1 == (e = +e) ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(H.apply(this, arguments), "slice", H.call(arguments).join(","))
        },
        map: function(e) {
            return this.pushStack(W.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: j,
        sort: [].sort,
        splice: [].splice
    }, W.fn.init.prototype = W.fn, W.extend = W.fn.extend = function() {
        var e, i, n, s, a, o, r = arguments[0] || {},
            h = 1,
            l = arguments.length,
            u = !1;
        for ("boolean" == typeof r && (u = r, r = arguments[1] || {}, h = 2), "object" != typeof r && !W.isFunction(r) && (r = {}), l === h && (r = this, --h); h < l; h++)
            if (null != (e = arguments[h]))
                for (i in e) n = r[i], r !== (s = e[i]) && (u && s && (W.isPlainObject(s) || (a = W.isArray(s))) ? (a ? (a = !1, o = n && W.isArray(n) ? n : []) : o = n && W.isPlainObject(n) ? n : {}, r[i] = W.extend(u, o, s)) : s !== t && (r[i] = s));
        return r
    }, W.extend({
        noConflict: function(t) {
            return e.$ === W && (e.$ = N), t && e.jQuery === W && (e.jQuery = L), W
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? W.readyWait++ : W.ready(!0)
        },
        ready: function(e) {
            if (!(!0 === e ? --W.readyWait : W.isReady)) {
                if (!R.body) return setTimeout(W.ready, 1);
                W.isReady = !0, !0 !== e && 0 < --W.readyWait || (z.resolveWith(R, [W]), W.fn.trigger && W(R).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === W.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === W.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? String(e) : ae[G.call(e)] || "object"
        },
        isPlainObject: function(e) {
            if (!e || "object" !== W.type(e) || e.nodeType || W.isWindow(e)) return !1;
            try {
                if (e.constructor && !U.call(e, "constructor") && !U.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (e) {
                return !1
            }
            for (var i in e);
            return i === t || U.call(e, i)
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        error: function(e) {
            throw Error(e)
        },
        parseHTML: function(e, t, i) {
            var n;
            return e && "string" == typeof e ? ("boolean" == typeof t && (i = t, t = 0), t = t || R, (n = Y.exec(e)) ? [t.createElement(n[1])] : (n = W.buildFragment([e], t, i ? null : []), W.merge([], (n.cacheable ? W.clone(n.fragment) : n.fragment).childNodes))) : null
        },
        parseJSON: function(t) {
            return t && "string" == typeof t ? (t = W.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : Q.test(t.replace(Z, "@").replace(ee, "]").replace(J, "")) ? new Function("return " + t)() : void W.error("Invalid JSON: " + t)) : null
        },
        parseXML: function(i) {
            var n, s;
            if (!i || "string" != typeof i) return null;
            try {
                e.DOMParser ? (s = new DOMParser, n = s.parseFromString(i, "text/xml")) : ((n = new ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(i))
            } catch (e) {
                n = t
            }
            return (!n || !n.documentElement || n.getElementsByTagName("parsererror").length) && W.error("Invalid XML: " + i), n
        },
        noop: function() {},
        globalEval: function(t) {
            t && $.test(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(te, "ms-").replace(ie, ne)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, i, n) {
            var s, a = 0,
                o = e.length,
                r = o === t || W.isFunction(e);
            if (n)
                if (r) {
                    for (s in e)
                        if (!1 === i.apply(e[s], n)) break
                } else
                    for (; a < o && !1 !== i.apply(e[a++], n););
            else if (r) {
                for (s in e)
                    if (!1 === i.call(e[s], s, e[s])) break
            } else
                for (; a < o && !1 !== i.call(e[a], a, e[a++]););
            return e
        },
        trim: F && !F.call("\ufeff ") ? function(e) {
            return null == e ? "" : F.call(e)
        } : function(e) {
            return null == e ? "" : (e + "").replace(X, "")
        },
        makeArray: function(e, t) {
            var i, n = t || [];
            return null != e && (i = W.type(e), null == e.length || "string" === i || "function" === i || "regexp" === i || W.isWindow(e) ? j.call(n, e) : W.merge(n, e)), n
        },
        inArray: function(e, t, i) {
            var n;
            if (t) {
                if (B) return B.call(t, e, i);
                for (n = t.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; i < n; i++)
                    if (i in t && t[i] === e) return i
            }
            return -1
        },
        merge: function(e, i) {
            var n = i.length,
                s = e.length,
                a = 0;
            if ("number" == typeof n)
                for (; a < n; a++) e[s++] = i[a];
            else
                for (; i[a] !== t;) e[s++] = i[a++];
            return e.length = s, e
        },
        grep: function(e, t, i) {
            var n = [],
                s = 0,
                a = e.length;
            for (i = !!i; s < a; s++) i !== !!t(e[s], s) && n.push(e[s]);
            return n
        },
        map: function(e, i, n) {
            var s, a, o = [],
                r = 0,
                h = e.length;
            if (e instanceof W || h !== t && "number" == typeof h && (0 < h && e[0] && e[h - 1] || 0 === h || W.isArray(e)))
                for (; r < h; r++) null != (s = i(e[r], r, n)) && (o[o.length] = s);
            else
                for (a in e) null != (s = i(e[a], a, n)) && (o[o.length] = s);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function(e, i) {
            var n, s, a;
            return "string" == typeof i && (n = e[i], i = e, e = n), W.isFunction(e) ? (s = H.call(arguments, 2), (a = function() {
                return e.apply(i, s.concat(H.call(arguments)))
            }).guid = e.guid = e.guid || W.guid++, a) : t
        },
        access: function(e, i, n, s, a, o, r) {
            var h, l = null == n,
                u = 0,
                c = e.length;
            if (n && "object" == typeof n) {
                for (u in n) W.access(e, i, u, n[u], 1, o, s);
                a = 1
            } else if (s !== t) {
                if (h = r === t && W.isFunction(s), l && (h ? (h = i, i = function(e, t, i) {
                        return h.call(W(e), i)
                    }) : (i.call(e, s), i = null)), i)
                    for (; u < c; u++) i(e[u], n, h ? s.call(e[u], u, i(e[u], n)) : s, r);
                a = 1
            }
            return a ? e : l ? i.call(e) : c ? i(e[0], n) : o
        },
        now: function() {
            return (new Date).getTime()
        }
    }), W.ready.promise = function(t) {
        if (!z)
            if (z = W.Deferred(), "complete" === R.readyState) setTimeout(W.ready, 1);
            else if (R.addEventListener) R.addEventListener("DOMContentLoaded", se, !1), e.addEventListener("load", W.ready, !1);
        else {
            R.attachEvent("onreadystatechange", se), e.attachEvent("onload", W.ready);
            var i = !1;
            try {
                i = null == e.frameElement && R.documentElement
            } catch (e) {}
            i && i.doScroll && function e() {
                if (!W.isReady) {
                    try {
                        i.doScroll("left")
                    } catch (t) {
                        return setTimeout(e, 50)
                    }
                    W.ready()
                }
            }()
        }
        return z.promise(t)
    }, W.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(e, t) {
        ae["[object " + t + "]"] = t.toLowerCase()
    }), C = W(R);
    var oe = {};
    W.Callbacks = function(e) {
        var i;
        if ("string" == typeof e) {
            if (!(i = oe[e])) {
                var n = oe[i = e] = {};
                W.each(i.split(V), function(e, t) {
                    n[t] = !0
                }), i = n
            }
        } else i = W.extend({}, e);
        var s, a, o, r, h, l, u = [],
            c = !(e = i).once && [],
            d = function(t) {
                for (s = e.memory && t, a = !0, l = r || 0, r = 0, h = u.length, o = !0; u && l < h; l++)
                    if (!1 === u[l].apply(t[0], t[1]) && e.stopOnFalse) {
                        s = !1;
                        break
                    } o = !1, u && (c ? c.length && d(c.shift()) : s ? u = [] : g.disable())
            },
            g = {
                add: function() {
                    if (u) {
                        var t = u.length;
                        ! function t(i) {
                            W.each(i, function(i, n) {
                                var s = W.type(n);
                                "function" !== s || e.unique && g.has(n) ? n && n.length && "string" !== s && t(n) : u.push(n)
                            })
                        }(arguments), o ? h = u.length : s && (r = t, d(s))
                    }
                    return this
                },
                remove: function() {
                    return u && W.each(arguments, function(e, t) {
                        for (var i; - 1 < (i = W.inArray(t, u, i));) u.splice(i, 1), o && (i <= h && h--, i <= l && l--)
                    }), this
                },
                has: function(e) {
                    return -1 < W.inArray(e, u)
                },
                empty: function() {
                    return u = [], this
                },
                disable: function() {
                    return u = c = s = t, this
                },
                disabled: function() {
                    return !u
                },
                lock: function() {
                    return c = t, s || g.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(e, t) {
                    return t = [e, (t = t || []).slice ? t.slice() : t], u && (!a || c) && (o ? c.push(t) : d(t)), this
                },
                fire: function() {
                    return g.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!a
                }
            };
        return g
    }, W.extend({
        Deferred: function(e) {
            var t = [
                    ["resolve", "done", W.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", W.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", W.Callbacks("memory")]
                ],
                i = "pending",
                n = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return W.Deferred(function(i) {
                            W.each(t, function(t, n) {
                                var a = n[0],
                                    o = e[t];
                                s[n[1]](W.isFunction(o) ? function() {
                                    var e = o.apply(this, arguments);
                                    e && W.isFunction(e.promise) ? e.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[a + "With"](this === s ? i : this, [e])
                                } : i[a])
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? W.extend(e, n) : n
                    }
                },
                s = {};
            return n.pipe = n.then, W.each(t, function(e, a) {
                var o = a[2],
                    r = a[3];
                n[a[1]] = o.add, r && o.add(function() {
                    i = r
                }, t[1 ^ e][2].disable, t[2][2].lock), s[a[0]] = o.fire, s[a[0] + "With"] = o.fireWith
            }), n.promise(s), e && e.call(s, s), s
        },
        when: function(e) {
            var t, i, n, s = 0,
                a = H.call(arguments),
                o = a.length,
                r = 1 !== o || e && W.isFunction(e.promise) ? o : 0,
                h = 1 === r ? e : W.Deferred(),
                l = function(e, i, n) {
                    return function(s) {
                        i[e] = this, n[e] = 1 < arguments.length ? H.call(arguments) : s, n === t ? h.notifyWith(i, n) : --r || h.resolveWith(i, n)
                    }
                };
            if (1 < o)
                for (t = Array(o), i = Array(o), n = Array(o); s < o; s++) a[s] && W.isFunction(a[s].promise) ? a[s].promise().done(l(s, n, a)).fail(h.reject).progress(l(s, i, t)) : --r;
            return r || h.resolveWith(n, a), h.promise()
        }
    });
    var re, he, le, ue, ce, de, ge, me, pe, fe, ye, xe, be = W,
        we = R.createElement("div");
    if (we.setAttribute("className", "t"), we.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", le = we.getElementsByTagName("*"), (ue = we.getElementsByTagName("a")[0]).style.cssText = "top:1px;float:left;opacity:.5", le && le.length) {
        de = (ce = R.createElement("select")).appendChild(R.createElement("option")), ge = we.getElementsByTagName("input")[0], he = {
            leadingWhitespace: 3 === we.firstChild.nodeType,
            tbody: !we.getElementsByTagName("tbody").length,
            htmlSerialize: !!we.getElementsByTagName("link").length,
            style: /top/.test(ue.getAttribute("style")),
            hrefNormalized: "/a" === ue.getAttribute("href"),
            opacity: /^0.5/.test(ue.style.opacity),
            cssFloat: !!ue.style.cssFloat,
            checkOn: "on" === ge.value,
            optSelected: de.selected,
            getSetAttribute: "t" !== we.className,
            enctype: !!R.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== R.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === R.compatMode,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, ge.checked = !0, he.noCloneChecked = ge.cloneNode(!0).checked, ce.disabled = !0, he.optDisabled = !de.disabled;
        try {
            delete we.test
        } catch (e) {
            he.deleteExpando = !1
        }
        if (!we.addEventListener && we.attachEvent && we.fireEvent && (we.attachEvent("onclick", xe = function() {
                he.noCloneEvent = !1
            }), we.cloneNode(!0).fireEvent("onclick"), we.detachEvent("onclick", xe)), (ge = R.createElement("input")).value = "t", ge.setAttribute("type", "radio"), he.radioValue = "t" === ge.value, ge.setAttribute("checked", "checked"), ge.setAttribute("name", "t"), we.appendChild(ge), (me = R.createDocumentFragment()).appendChild(we.lastChild), he.checkClone = me.cloneNode(!0).cloneNode(!0).lastChild.checked, he.appendChecked = ge.checked, me.removeChild(ge), me.appendChild(we), we.attachEvent)
            for (fe in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                })(ye = (pe = "on" + fe) in we) || (we.setAttribute(pe, "return;"), ye = "function" == typeof we[pe]), he[fe + "Bubbles"] = ye;
        W(function() {
            var t, i, n, s, a = R.getElementsByTagName("body")[0];
            a && ((t = R.createElement("div")).style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(t, a.firstChild), i = R.createElement("div"), t.appendChild(i), i.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", (n = i.getElementsByTagName("td"))[0].style.cssText = "padding:0;margin:0;border:0;display:none", ye = 0 === n[0].offsetHeight, n[0].style.display = "", n[1].style.display = "none", he.reliableHiddenOffsets = ye && 0 === n[0].offsetHeight, i.innerHTML = "", i.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", he.boxSizing = 4 === i.offsetWidth, he.doesNotIncludeMarginInBodyOffset = 1 !== a.offsetTop, e.getComputedStyle && (he.pixelPosition = "1%" !== (e.getComputedStyle(i, null) || {}).top, he.boxSizingReliable = "4px" === (e.getComputedStyle(i, null) || {
                width: "4px"
            }).width, (s = R.createElement("div")).style.cssText = i.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;", s.style.marginRight = s.style.width = "0", i.style.width = "1px", i.appendChild(s), he.reliableMarginRight = !parseFloat((e.getComputedStyle(s, null) || {}).marginRight)), void 0 !== i.style.zoom && (i.innerHTML = "", i.style.cssText = "padding:0;margin:0;border:0;display:block;overflow:hidden;width:1px;padding:1px;display:inline;zoom:1", he.inlineBlockNeedsLayout = 3 === i.offsetWidth, i.style.display = "block", i.style.overflow = "visible", i.innerHTML = "<div></div>", i.firstChild.style.width = "5px", he.shrinkWrapBlocks = 3 !== i.offsetWidth, t.style.zoom = 1), a.removeChild(t))
        }), me.removeChild(we), le = ue = ce = de = ge = me = we = null, re = he
    } else re = {};
    be.support = re;
    var ve = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Se = /([A-Z])/g;
    W.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (W.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return !!(e = e.nodeType ? W.cache[e[W.expando]] : e[W.expando]) && !n(e)
        },
        data: function(e, i, n, s) {
            if (W.acceptData(e)) {
                var a, o, r = W.expando,
                    h = "string" == typeof i,
                    l = e.nodeType,
                    u = l ? W.cache : e,
                    c = l ? e[r] : e[r] && r;
                if (c && u[c] && (s || u[c].data) || !h || n !== t) return c || (l ? e[r] = c = W.deletedIds.pop() || W.guid++ : c = r), u[c] || (u[c] = {}, l || (u[c].toJSON = W.noop)), "object" != typeof i && "function" != typeof i || (s ? u[c] = W.extend(u[c], i) : u[c].data = W.extend(u[c].data, i)), a = u[c], s || (a.data || (a.data = {}), a = a.data), n !== t && (a[W.camelCase(i)] = n), h ? null == (o = a[i]) && (o = a[W.camelCase(i)]) : o = a, o
            }
        },
        removeData: function(e, t, i) {
            if (W.acceptData(e)) {
                var s, a, o, r = e.nodeType,
                    h = r ? W.cache : e,
                    l = r ? e[W.expando] : W.expando;
                if (h[l]) {
                    if (t && (s = i ? h[l] : h[l].data)) {
                        W.isArray(t) || (t = t in s ? [t] : (t = W.camelCase(t)) in s ? [t] : t.split(" ")), a = 0;
                        for (o = t.length; a < o; a++) delete s[t[a]];
                        if (!(i ? n : W.isEmptyObject)(s)) return
                    }(i || (delete h[l].data, n(h[l]))) && (r ? W.cleanData([e], !0) : W.support.deleteExpando || h != h.window ? delete h[l] : h[l] = null)
                }
            }
        },
        _data: function(e, t, i) {
            return W.data(e, t, i, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && W.noData[e.nodeName.toLowerCase()];
            return !t || !0 !== t && e.getAttribute("classid") === t
        }
    }), W.fn.extend({
        data: function(e, n) {
            var s, a, o, r, h, l = this[0],
                u = 0,
                c = null;
            if (e === t) {
                if (this.length && (c = W.data(l), 1 === l.nodeType && !W._data(l, "parsedAttrs"))) {
                    for (h = (o = l.attributes).length; u < h; u++)(r = o[u].name).indexOf("data-") || (r = W.camelCase(r.substring(5)), i(l, r, c[r]));
                    W._data(l, "parsedAttrs", !0)
                }
                return c
            }
            return "object" == typeof e ? this.each(function() {
                W.data(this, e)
            }) : ((s = e.split(".", 2))[1] = s[1] ? "." + s[1] : "", a = s[1] + "!", W.access(this, function(n) {
                if (n === t) return (c = this.triggerHandler("getData" + a, [s[0]])) === t && l && (c = W.data(l, e), c = i(l, e, c)), c === t && s[1] ? this.data(s[0]) : c;
                s[1] = n, this.each(function() {
                    var t = W(this);
                    t.triggerHandler("setData" + a, s), W.data(this, e, n), t.triggerHandler("changeData" + a, s)
                })
            }, null, n, 1 < arguments.length, null, !1))
        },
        removeData: function(e) {
            return this.each(function() {
                W.removeData(this, e)
            })
        }
    }), W.extend({
        queue: function(e, t, i) {
            var n;
            if (e) return t = (t || "fx") + "queue", n = W._data(e, t), i && (!n || W.isArray(i) ? n = W._data(e, t, W.makeArray(i)) : n.push(i)), n || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var i = W.queue(e, t),
                n = i.length,
                s = i.shift(),
                a = W._queueHooks(e, t);
            "inprogress" === s && (s = i.shift(), n--), s && ("fx" === t && i.unshift("inprogress"), delete a.stop, s.call(e, function() {
                W.dequeue(e, t)
            }, a)), !n && a && a.empty.fire()
        },
        _queueHooks: function(e, t) {
            var i = t + "queueHooks";
            return W._data(e, i) || W._data(e, i, {
                empty: W.Callbacks("once memory").add(function() {
                    W.removeData(e, t + "queue", !0), W.removeData(e, i, !0)
                })
            })
        }
    }), W.fn.extend({
        queue: function(e, i) {
            var n = 2;
            return "string" != typeof e && (i = e, e = "fx", n--), arguments.length < n ? W.queue(this[0], e) : i === t ? this : this.each(function() {
                var t = W.queue(this, e, i);
                W._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && W.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                W.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = W.fx && W.fx.speeds[e] || e, t = t || "fx", this.queue(t, function(t, i) {
                var n = setTimeout(t, e);
                i.stop = function() {
                    clearTimeout(n)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, i) {
            var n, s = 1,
                a = W.Deferred(),
                o = this,
                r = this.length,
                h = function() {
                    --s || a.resolveWith(o, [o])
                };
            for ("string" != typeof e && (i = e, e = t), e = e || "fx"; r--;)(n = W._data(o[r], e + "queueHooks")) && n.empty && (s++, n.empty.add(h));
            return h(), a.promise(i)
        }
    });
    var ke, Te, Ie, Ae = /[\t\r\n]/g,
        Ee = /\r/g,
        Pe = /^(?:button|input)$/i,
        _e = /^(?:button|input|object|select|textarea)$/i,
        Me = /^a(?:rea|)$/i,
        Ce = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        ze = W.support.getSetAttribute;
    W.fn.extend({
        attr: function(e, t) {
            return W.access(this, W.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                W.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return W.access(this, W.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return e = W.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (e) {}
            })
        },
        addClass: function(e) {
            var t, i, n, s, a, o, r;
            if (W.isFunction(e)) return this.each(function(t) {
                W(this).addClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e)
                for (t = e.split(V), i = 0, n = this.length; i < n; i++)
                    if (1 === (s = this[i]).nodeType)
                        if (s.className || 1 !== t.length) {
                            for (a = " " + s.className + " ", o = 0, r = t.length; o < r; o++) 0 > a.indexOf(" " + t[o] + " ") && (a += t[o] + " ");
                            s.className = W.trim(a)
                        } else s.className = e;
            return this
        },
        removeClass: function(e) {
            var i, n, s, a, o, r, h;
            if (W.isFunction(e)) return this.each(function(t) {
                W(this).removeClass(e.call(this, t, this.className))
            });
            if (e && "string" == typeof e || e === t)
                for (i = (e || "").split(V), r = 0, h = this.length; r < h; r++)
                    if (1 === (s = this[r]).nodeType && s.className) {
                        for (n = (" " + s.className + " ").replace(Ae, " "), a = 0, o = i.length; a < o; a++)
                            for (; 0 <= n.indexOf(" " + i[a] + " ");) n = n.replace(" " + i[a] + " ", " ");
                        s.className = e ? W.trim(n) : ""
                    } return this
        },
        toggleClass: function(e, t) {
            var i = typeof e,
                n = "boolean" == typeof t;
            return W.isFunction(e) ? this.each(function(i) {
                W(this).toggleClass(e.call(this, i, this.className, t), t)
            }) : this.each(function() {
                if ("string" === i)
                    for (var s, a = 0, o = W(this), r = t, h = e.split(V); s = h[a++];) o[(r = n ? r : !o.hasClass(s)) ? "addClass" : "removeClass"](s);
                else "undefined" !== i && "boolean" !== i || (this.className && W._data(this, "__className__", this.className), this.className = this.className || !1 === e ? "" : W._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            e = " " + e + " ";
            for (var t = 0, i = this.length; t < i; t++)
                if (1 === this[t].nodeType && 0 <= (" " + this[t].className + " ").replace(Ae, " ").indexOf(e)) return !0;
            return !1
        },
        val: function(e) {
            var i, n, s, a = this[0];
            return arguments.length ? (s = W.isFunction(e), this.each(function(n) {
                var a, o = W(this);
                1 !== this.nodeType || (null == (a = s ? e.call(this, n, o.val()) : e) ? a = "" : "number" == typeof a ? a += "" : W.isArray(a) && (a = W.map(a, function(e) {
                    return null == e ? "" : e + ""
                })), (i = W.valHooks[this.type] || W.valHooks[this.nodeName.toLowerCase()]) && "set" in i && i.set(this, a, "value") !== t) || (this.value = a)
            })) : a ? (i = W.valHooks[a.type] || W.valHooks[a.nodeName.toLowerCase()]) && "get" in i && (n = i.get(a, "value")) !== t ? n : "string" == typeof(n = a.value) ? n.replace(Ee, "") : null == n ? "" : n : void 0
        }
    }), W.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function(e) {
                    var t, i, n = e.selectedIndex,
                        s = [],
                        a = e.options,
                        o = "select-one" === e.type;
                    if (0 > n) return null;
                    for (e = o ? n : 0, i = o ? n + 1 : a.length; e < i; e++)
                        if ((t = a[e]).selected && (W.support.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !W.nodeName(t.parentNode, "optgroup"))) {
                            if (t = W(t).val(), o) return t;
                            s.push(t)
                        } return o && !s.length && a.length ? W(a[n]).val() : s
                },
                set: function(e, t) {
                    var i = W.makeArray(t);
                    return W(e).find("option").each(function() {
                        this.selected = 0 <= W.inArray(W(this).val(), i)
                    }), i.length || (e.selectedIndex = -1), i
                }
            }
        },
        attrFn: {},
        attr: function(e, i, n, s) {
            var a, o, r = e.nodeType;
            if (e && 3 !== r && 8 !== r && 2 !== r) return s && W.isFunction(W.fn[i]) ? W(e)[i](n) : void 0 === e.getAttribute ? W.prop(e, i, n) : ((s = 1 !== r || !W.isXMLDoc(e)) && (i = i.toLowerCase(), o = W.attrHooks[i] || (Ce.test(i) ? Te : ke)), n !== t ? null === n ? void W.removeAttr(e, i) : o && "set" in o && s && (a = o.set(e, n, i)) !== t ? a : (e.setAttribute(i, n + ""), n) : o && "get" in o && s && null !== (a = o.get(e, i)) ? a : null === (a = e.getAttribute(i)) ? t : a)
        },
        removeAttr: function(e, t) {
            var i, n, s, a, o = 0;
            if (t && 1 === e.nodeType)
                for (n = t.split(V); o < n.length; o++)(s = n[o]) && (i = W.propFix[s] || s, (a = Ce.test(s)) || W.attr(e, s, ""), e.removeAttribute(ze ? s : i), a && i in e && (e[i] = !1))
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (Pe.test(e.nodeName) && e.parentNode) W.error("type property can't be changed");
                    else if (!W.support.radioValue && "radio" === t && W.nodeName(e, "input")) {
                        var i = e.value;
                        return e.setAttribute("type", t), i && (e.value = i), t
                    }
                }
            },
            value: {
                get: function(e, t) {
                    return ke && W.nodeName(e, "button") ? ke.get(e, t) : t in e ? e.value : null
                },
                set: function(e, t, i) {
                    if (ke && W.nodeName(e, "button")) return ke.set(e, t, i);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, i, n) {
            var s, a, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o) return (1 !== o || !W.isXMLDoc(e)) && (i = W.propFix[i] || i, a = W.propHooks[i]), n !== t ? a && "set" in a && (s = a.set(e, n, i)) !== t ? s : e[i] = n : a && "get" in a && null !== (s = a.get(e, i)) ? s : e[i]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var i = e.getAttributeNode("tabindex");
                    return i && i.specified ? parseInt(i.value, 10) : _e.test(e.nodeName) || Me.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), Te = {
        get: function(e, i) {
            var n, s = W.prop(e, i);
            return !0 === s || "boolean" != typeof s && (n = e.getAttributeNode(i)) && !1 !== n.nodeValue ? i.toLowerCase() : t
        },
        set: function(e, t, i) {
            var n;
            return !1 === t ? W.removeAttr(e, i) : ((n = W.propFix[i] || i) in e && (e[n] = !0), e.setAttribute(i, i.toLowerCase())), i
        }
    }, ze || (Ie = {
        name: !0,
        id: !0,
        coords: !0
    }, ke = W.valHooks.button = {
        get: function(e, i) {
            var n;
            return (n = e.getAttributeNode(i)) && (Ie[i] ? "" !== n.value : n.specified) ? n.value : t
        },
        set: function(e, t, i) {
            var n = e.getAttributeNode(i);
            return n || (n = R.createAttribute(i), e.setAttributeNode(n)), n.value = t + ""
        }
    }, W.each(["width", "height"], function(e, t) {
        W.attrHooks[t] = W.extend(W.attrHooks[t], {
            set: function(e, i) {
                if ("" === i) return e.setAttribute(t, "auto"), i
            }
        })
    }), W.attrHooks.contenteditable = {
        get: ke.get,
        set: function(e, t, i) {
            "" === t && (t = "false"), ke.set(e, t, i)
        }
    }), W.support.hrefNormalized || W.each(["href", "src", "width", "height"], function(e, i) {
        W.attrHooks[i] = W.extend(W.attrHooks[i], {
            get: function(e) {
                return null === (e = e.getAttribute(i, 2)) ? t : e
            }
        })
    }), W.support.style || (W.attrHooks.style = {
        get: function(e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }), W.support.optSelected || (W.propHooks.selected = W.extend(W.propHooks.selected, {
        get: function(e) {
            return (e = e.parentNode) && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
        }
    })), W.support.enctype || (W.propFix.enctype = "encoding"), W.support.checkOn || W.each(["radio", "checkbox"], function() {
        W.valHooks[this] = {
            get: function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
        }
    }), W.each(["radio", "checkbox"], function() {
        W.valHooks[this] = W.extend(W.valHooks[this], {
            set: function(e, t) {
                if (W.isArray(t)) return e.checked = 0 <= W.inArray(W(e).val(), t)
            }
        })
    });
    var Re = /^(?:textarea|input|select)$/i,
        Oe = /^([^\.]*|)(?:\.(.+)|)$/,
        De = /(?:^|\s)hover(\.\S+|)\b/,
        Le = /^key/,
        Ne = /^(?:mouse|contextmenu)|click/,
        je = /^(?:focusinfocus|focusoutblur)$/,
        He = function(e) {
            return W.event.special.hover ? e : e.replace(De, "mouseenter$1 mouseleave$1")
        };
    W.event = {
        add: function(e, i, n, s, a) {
            var o, r, h, l, u, c, d, g, m;
            if (3 !== e.nodeType && 8 !== e.nodeType && i && n && (o = W._data(e))) {
                for (n.handler && (n = (d = n).handler, a = d.selector), n.guid || (n.guid = W.guid++), (h = o.events) || (o.events = h = {}), (r = o.handle) || (o.handle = r = function(e) {
                        return void 0 === W || e && W.event.triggered === e.type ? t : W.event.dispatch.apply(r.elem, arguments)
                    }, r.elem = e), i = W.trim(He(i)).split(" "), o = 0; o < i.length; o++) u = (l = Oe.exec(i[o]) || [])[1], c = (l[2] || "").split(".").sort(), m = W.event.special[u] || {}, u = (a ? m.delegateType : m.bindType) || u, m = W.event.special[u] || {}, l = W.extend({
                    type: u,
                    origType: l[1],
                    data: s,
                    handler: n,
                    guid: n.guid,
                    selector: a,
                    needsContext: a && W.expr.match.needsContext.test(a),
                    namespace: c.join(".")
                }, d), (g = h[u]) || ((g = h[u] = []).delegateCount = 0, m.setup && !1 !== m.setup.call(e, s, c, r)) || (e.addEventListener ? e.addEventListener(u, r, !1) : e.attachEvent && e.attachEvent("on" + u, r)), m.add && (m.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), a ? g.splice(g.delegateCount++, 0, l) : g.push(l), W.event.global[u] = !0;
                e = null
            }
        },
        global: {},
        remove: function(e, t, i, n, s) {
            var a, o, r, h, l, u, c, d, g, m, p = W.hasData(e) && W._data(e);
            if (p && (c = p.events)) {
                for (t = W.trim(He(t || "")).split(" "), a = 0; a < t.length; a++)
                    if (r = h = (o = Oe.exec(t[a]) || [])[1], o = o[2], r) {
                        for (d = W.event.special[r] || {}, l = (g = c[r = (n ? d.delegateType : d.bindType) || r] || []).length, o = o ? RegExp("(^|\\.)" + o.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, u = 0; u < g.length; u++) m = g[u], (s || h === m.origType) && (!i || i.guid === m.guid) && (!o || o.test(m.namespace)) && (!n || n === m.selector || "**" === n && m.selector) && (g.splice(u--, 1), m.selector && g.delegateCount--, d.remove && d.remove.call(e, m));
                        0 === g.length && l !== g.length && ((!d.teardown || !1 === d.teardown.call(e, o, p.handle)) && W.removeEvent(e, r, p.handle), delete c[r])
                    } else
                        for (r in c) W.event.remove(e, r + t[a], i, n, !0);
                W.isEmptyObject(c) && (delete p.handle, W.removeData(e, "events", !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(i, n, s, a) {
            if (!s || 3 !== s.nodeType && 8 !== s.nodeType) {
                var o, r, h, l, u, c, d, g = i.type || i;
                if (l = [], !je.test(g + W.event.triggered) && (0 <= g.indexOf("!") && (g = g.slice(0, -1), o = !0), 0 <= g.indexOf(".") && (g = (l = g.split(".")).shift(), l.sort()), s && !W.event.customEvent[g] || W.event.global[g]))
                    if ((i = "object" == typeof i ? i[W.expando] ? i : new W.Event(g, i) : new W.Event(g)).type = g, i.isTrigger = !0, i.exclusive = o, i.namespace = l.join("."), i.namespace_re = i.namespace ? RegExp("(^|\\.)" + l.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = 0 > g.indexOf(":") ? "on" + g : "", s) {
                        if (i.result = t, i.target || (i.target = s), (n = null != n ? W.makeArray(n) : []).unshift(i), !(u = W.event.special[g] || {}).trigger || !1 !== u.trigger.apply(s, n)) {
                            if (d = [
                                    [s, u.bindType || g]
                                ], !a && !u.noBubble && !W.isWindow(s)) {
                                for (r = u.delegateType || g, o = je.test(r + g) ? s : s.parentNode, h = s; o; o = o.parentNode) d.push([o, r]), h = o;
                                h === (s.ownerDocument || R) && d.push([h.defaultView || h.parentWindow || e, r])
                            }
                            for (r = 0; r < d.length && !i.isPropagationStopped(); r++) o = d[r][0], i.type = d[r][1], (c = (W._data(o, "events") || {})[i.type] && W._data(o, "handle")) && c.apply(o, n), (c = l && o[l]) && W.acceptData(o) && c.apply && !1 === c.apply(o, n) && i.preventDefault();
                            return i.type = g, !a && !i.isDefaultPrevented() && (!u._default || !1 === u._default.apply(s.ownerDocument, n)) && ("click" !== g || !W.nodeName(s, "a")) && W.acceptData(s) && l && s[g] && ("focus" !== g && "blur" !== g || 0 !== i.target.offsetWidth) && !W.isWindow(s) && ((h = s[l]) && (s[l] = null), W.event.triggered = g, s[g](), W.event.triggered = t, h && (s[l] = h)), i.result
                        }
                    } else
                        for (r in s = W.cache) s[r].events && s[r].events[g] && W.event.trigger(i, n, s[r].handle.elem, !0)
            }
        },
        dispatch: function(i) {
            i = W.event.fix(i || e.event);
            var n, s, a, o, r, h, l = (W._data(this, "events") || {})[i.type] || [],
                u = l.delegateCount,
                c = H.call(arguments),
                d = !i.exclusive && !i.namespace,
                g = W.event.special[i.type] || {},
                m = [];
            if (c[0] = i, i.delegateTarget = this, !g.preDispatch || !1 !== g.preDispatch.call(this, i)) {
                if (u && (!i.button || "click" !== i.type))
                    for (s = i.target; s != this; s = s.parentNode || this)
                        if (!0 !== s.disabled || "click" !== i.type) {
                            for (o = {}, r = [], n = 0; n < u; n++) o[h = (a = l[n]).selector] === t && (o[h] = a.needsContext ? 0 <= W(h, this).index(s) : W.find(h, this, null, [s]).length), o[h] && r.push(a);
                            r.length && m.push({
                                elem: s,
                                matches: r
                            })
                        } for (l.length > u && m.push({
                        elem: this,
                        matches: l.slice(u)
                    }), n = 0; n < m.length && !i.isPropagationStopped(); n++)
                    for (o = m[n], i.currentTarget = o.elem, s = 0; s < o.matches.length && !i.isImmediatePropagationStopped(); s++) a = o.matches[s], (d || !i.namespace && !a.namespace || i.namespace_re && i.namespace_re.test(a.namespace)) && (i.data = a.data, i.handleObj = a, (a = ((W.event.special[a.origType] || {}).handle || a.handler).apply(o.elem, c)) !== t && (i.result = a, !1 === a && (i.preventDefault(), i.stopPropagation())));
                return g.postDispatch && g.postDispatch.call(this, i), i.result
            }
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: ["char", "charCode", "key", "keyCode"],
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, i) {
                var n, s, a, o = i.button,
                    r = i.fromElement;
                return null == e.pageX && null != i.clientX && (s = (n = e.target.ownerDocument || R).documentElement, a = n.body, e.pageX = i.clientX + (s && s.scrollLeft || a && a.scrollLeft || 0) - (s && s.clientLeft || a && a.clientLeft || 0), e.pageY = i.clientY + (s && s.scrollTop || a && a.scrollTop || 0) - (s && s.clientTop || a && a.clientTop || 0)), !e.relatedTarget && r && (e.relatedTarget = r === e.target ? i.toElement : r), !e.which && o !== t && (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
            }
        },
        fix: function(e) {
            if (e[W.expando]) return e;
            var t, i, n = e,
                s = W.event.fixHooks[e.type] || {},
                a = s.props ? this.props.concat(s.props) : this.props;
            for (e = W.Event(n), t = a.length; t;) e[i = a[--t]] = n[i];
            return e.target || (e.target = n.srcElement || R), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, n) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(e, t, i) {
                    W.isWindow(this) && (this.onbeforeunload = i)
                },
                teardown: function(e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(e, t, i, n) {
            e = W.extend(new W.Event, i, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            }), n ? W.event.trigger(e, null, t) : W.event.dispatch.call(t, e), e.isDefaultPrevented() && i.preventDefault()
        }
    }, W.event.handle = W.event.dispatch, W.removeEvent = R.removeEventListener ? function(e, t, i) {
        e.removeEventListener && e.removeEventListener(t, i, !1)
    } : function(e, t, i) {
        t = "on" + t, e.detachEvent && (void 0 === e[t] && (e[t] = null), e.detachEvent(t, i))
    }, W.Event = function(e, t) {
        if (!(this instanceof W.Event)) return new W.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || !1 === e.returnValue || e.getPreventDefault && e.getPreventDefault() ? a : s) : this.type = e, t && W.extend(this, t), this.timeStamp = e && e.timeStamp || W.now(), this[W.expando] = !0
    }, W.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = a;
            var e = this.originalEvent;
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = a;
            var e = this.originalEvent;
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = a, this.stopPropagation()
        },
        isDefaultPrevented: s,
        isPropagationStopped: s,
        isImmediatePropagationStopped: s
    }, W.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        W.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var i, n = e.relatedTarget,
                    s = e.handleObj;
                return n && (n === this || W.contains(this, n)) || (e.type = s.origType, i = s.handler.apply(this, arguments), e.type = t), i
            }
        }
    }), W.support.submitBubbles || (W.event.special.submit = {
        setup: function() {
            if (W.nodeName(this, "form")) return !1;
            W.event.add(this, "click._submit keypress._submit", function(e) {
                e = e.target, (e = W.nodeName(e, "input") || W.nodeName(e, "button") ? e.form : t) && !W._data(e, "_submit_attached") && (W.event.add(e, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), W._data(e, "_submit_attached", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && W.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            if (W.nodeName(this, "form")) return !1;
            W.event.remove(this, "._submit")
        }
    }), W.support.changeBubbles || (W.event.special.change = {
        setup: function() {
            if (Re.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (W.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), W.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), W.event.simulate("change", this, e, !0)
            })), !1;
            W.event.add(this, "beforeactivate._change", function(e) {
                e = e.target, Re.test(e.nodeName) && !W._data(e, "_change_attached") && (W.event.add(e, "change._change", function(e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && W.event.simulate("change", this.parentNode, e, !0)
                }), W._data(e, "_change_attached", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type) return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return W.event.remove(this, "._change"), !Re.test(this.nodeName)
        }
    }), W.support.focusinBubbles || W.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var i = 0,
            n = function(e) {
                W.event.simulate(t, e.target, W.event.fix(e), !0)
            };
        W.event.special[t] = {
            setup: function() {
                0 == i++ && R.addEventListener(e, n, !0)
            },
            teardown: function() {
                0 == --i && R.removeEventListener(e, n, !0)
            }
        }
    }), W.fn.extend({
        on: function(e, i, n, a, o) {
            var r, h;
            if ("object" == typeof e) {
                for (h in "string" != typeof i && (n = n || i, i = t), e) this.on(h, i, n, e[h], o);
                return this
            }
            if (null == n && null == a ? (a = i, n = i = t) : null == a && ("string" == typeof i ? (a = n, n = t) : (a = n, n = i, i = t)), !1 === a) a = s;
            else if (!a) return this;
            return 1 === o && (r = a, (a = function(e) {
                return W().off(e), r.apply(this, arguments)
            }).guid = r.guid || (r.guid = W.guid++)), this.each(function() {
                W.event.add(this, e, a, n, i)
            })
        },
        one: function(e, t, i, n) {
            return this.on(e, t, i, n, 1)
        },
        off: function(e, i, n) {
            var a, o;
            if (e && e.preventDefault && e.handleObj) return a = e.handleObj, W(e.delegateTarget).off(a.namespace ? a.origType + "." + a.namespace : a.origType, a.selector, a.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, i, e[o]);
                return this
            }
            return !1 !== i && "function" != typeof i || (n = i, i = t), !1 === n && (n = s), this.each(function() {
                W.event.remove(this, e, n, i)
            })
        },
        bind: function(e, t, i) {
            return this.on(e, null, t, i)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        live: function(e, t, i) {
            return W(this.context).on(e, this.selector, t, i), this
        },
        die: function(e, t) {
            return W(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function(e, t, i, n) {
            return this.on(t, e, i, n)
        },
        undelegate: function(e, t, i) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", i)
        },
        trigger: function(e, t) {
            return this.each(function() {
                W.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            if (this[0]) return W.event.trigger(e, t, this[0], !0)
        },
        toggle: function(e) {
            var t = arguments,
                i = e.guid || W.guid++,
                n = 0,
                s = function(i) {
                    var s = (W._data(this, "lastToggle" + e.guid) || 0) % n;
                    return W._data(this, "lastToggle" + e.guid, s + 1), i.preventDefault(), t[s].apply(this, arguments) || !1
                };
            for (s.guid = i; n < t.length;) t[n++].guid = i;
            return this.click(s)
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), W.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        W.fn[t] = function(e, i) {
            return null == i && (i = e, e = null), 0 < arguments.length ? this.on(t, null, e, i) : this.trigger(t)
        }, Le.test(t) && (W.event.fixHooks[t] = W.event.keyHooks), Ne.test(t) && (W.event.fixHooks[t] = W.event.mouseHooks)
    });
    var Be, Ge, Ue, Fe, We, qe, $e, Ve, Xe, Ke, Ye, Qe = e,
        Je = function(e, t, i, n) {
            i = i || [];
            var s, a, o, r, h = (t = t || gt).nodeType;
            if (!e || "string" != typeof e) return i;
            if (1 !== h && 9 !== h) return [];
            if (!(o = We(t)) && !n && (s = zt.exec(e)))
                if (r = s[1]) {
                    if (9 === h) {
                        if (!(a = t.getElementById(r)) || !a.parentNode) return i;
                        if (a.id === r) return i.push(a), i
                    } else if (t.ownerDocument && (a = t.ownerDocument.getElementById(r)) && qe(t, a) && a.id === r) return i.push(a), i
                } else {
                    if (s[2]) return xt.apply(i, bt.call(t.getElementsByTagName(e), 0)), i;
                    if ((r = s[3]) && Ut && t.getElementsByClassName) return xt.apply(i, bt.call(t.getElementsByClassName(r), 0)), i
                } return lt(e.replace(Pt, "$1"), t, i, n, o)
        },
        Ze = function(e) {
            return function(t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        },
        et = function(e) {
            return function(t) {
                var i = t.nodeName.toLowerCase();
                return ("input" === i || "button" === i) && t.type === e
            }
        },
        tt = function(e) {
            return vt(function(t) {
                return t = +t, vt(function(i, n) {
                    for (var s, a = e([], i.length, t), o = a.length; o--;) i[s = a[o]] && (i[s] = !(n[s] = i[s]))
                })
            })
        },
        it = function(e, t, i) {
            if (e === t) return i;
            for (e = e.nextSibling; e;) {
                if (e === t) return -1;
                e = e.nextSibling
            }
            return 1
        },
        nt = function(e, t) {
            var i, n, s, a, o, r, h;
            if (o = Tt[ct][e]) return t ? 0 : o.slice(0);
            for (o = e, r = [], h = Ue.preFilter; o;) {
                for (a in i && !(n = _t.exec(o)) || (n && (o = o.slice(n[0].length)), r.push(s = [])), i = !1, (n = Mt.exec(o)) && (s.push(i = new dt(n.shift())), o = o.slice(i.length), i.type = n[0].replace(Pt, " ")), Ue.filter)(n = Nt[a].exec(o)) && (!h[a] || (n = h[a](n, gt, !0))) && (s.push(i = new dt(n.shift())), o = o.slice(i.length), i.type = a, i.matches = n);
                if (!i) break
            }
            return t ? o.length : o ? Je.error(e) : Tt(e, r).slice(0)
        },
        st = function(e, t, i) {
            var n = t.dir,
                s = i && "parentNode" === t.dir,
                a = ft++;
            return t.first ? function(t, i, a) {
                for (; t = t[n];)
                    if (s || 1 === t.nodeType) return e(t, i, a)
            } : function(t, i, o) {
                if (o) {
                    for (; t = t[n];)
                        if ((s || 1 === t.nodeType) && e(t, i, o)) return t
                } else
                    for (var r, h = pt + " " + a + " ", l = h + Be; t = t[n];)
                        if (s || 1 === t.nodeType) {
                            if ((r = t[ct]) === l) return t.sizset;
                            if ("string" == typeof r && 0 === r.indexOf(h)) {
                                if (t.sizset) return t
                            } else {
                                if (t[ct] = l, e(t, i, o)) return t.sizset = !0, t;
                                t.sizset = !1
                            }
                        }
            }
        },
        at = function(e) {
            return 1 < e.length ? function(t, i, n) {
                for (var s = e.length; s--;)
                    if (!e[s](t, i, n)) return !1;
                return !0
            } : e[0]
        },
        ot = function(e, t, i, n, s) {
            for (var a, o = [], r = 0, h = e.length, l = null != t; r < h; r++)(a = e[r]) && (i && !i(a, n, s) || (o.push(a), l && t.push(r)));
            return o
        },
        rt = function(e, t, i, n, s, a) {
            return n && !n[ct] && (n = rt(n)), s && !s[ct] && (s = rt(s, a)), vt(function(a, o, r, h) {
                if (!a || !s) {
                    var l, u, c = [],
                        d = [],
                        g = o.length;
                    if (!(u = a)) {
                        u = t || "*";
                        var m = r.nodeType ? [r] : r,
                            p = [];
                        l = 0;
                        for (var f = m.length; l < f; l++) Je(u, m[l], p, a);
                        u = p
                    }
                    if (m = !e || !a && t ? u : ot(u, c, e, r, h), p = i ? s || (a ? e : g || n) ? [] : o : m, i && i(m, p, r, h), n)
                        for (u = ot(p, d), n(u, [], r, h), r = u.length; r--;)(l = u[r]) && (p[d[r]] = !(m[d[r]] = l));
                    if (a)
                        for (r = e && p.length; r--;)(l = p[r]) && (a[c[r]] = !(o[c[r]] = l));
                    else p = ot(p === o ? p.splice(g, p.length) : p), s ? s(null, o, p, h) : xt.apply(o, p)
                }
            })
        },
        ht = function(e) {
            var t, i, n, s = e.length,
                a = Ue.relative[e[0].type];
            i = a || Ue.relative[" "];
            for (var o = a ? 1 : 0, r = st(function(e) {
                    return e === t
                }, i, !0), h = st(function(e) {
                    return -1 < wt.call(t, e)
                }, i, !0), l = [function(e, i, n) {
                    return !a && (n || i !== Ke) || ((t = i).nodeType ? r(e, i, n) : h(e, i, n))
                }]; o < s; o++)
                if (i = Ue.relative[e[o].type]) l = [st(at(l), i)];
                else {
                    if ((i = Ue.filter[e[o].type].apply(null, e[o].matches))[ct]) {
                        for (n = ++o; n < s && !Ue.relative[e[n].type]; n++);
                        return rt(1 < o && at(l), 1 < o && e.slice(0, o - 1).join("").replace(Pt, "$1"), i, o < n && ht(e.slice(o, n)), n < s && ht(e = e.slice(n)), n < s && e.join(""))
                    }
                    l.push(i)
                } return at(l)
        },
        lt = function(e, t, i, n, s) {
            var a, o, r, h, l = nt(e);
            if (!n && 1 === l.length) {
                if (2 < (o = l[0] = l[0].slice(0)).length && "ID" === (r = o[0]).type && 9 === t.nodeType && !s && Ue.relative[o[1].type]) {
                    if (!(t = Ue.find.ID(r.matches[0].replace(Lt, ""), t, s)[0])) return i;
                    e = e.slice(o.shift().length)
                }
                for (a = Nt.POS.test(e) ? -1 : o.length - 1; 0 <= a && (r = o[a], !Ue.relative[h = r.type]); a--)
                    if ((h = Ue.find[h]) && (n = h(r.matches[0].replace(Lt, ""), Rt.test(o[0].type) && t.parentNode || t, s))) {
                        if (o.splice(a, 1), !(e = n.length && o.join(""))) return xt.apply(i, bt.call(n, 0)), i;
                        break
                    }
            }
            return $e(e, l)(n, t, s, i, Rt.test(e)), i
        },
        ut = function() {},
        ct = ("sizcache" + Math.random()).replace(".", ""),
        dt = String,
        gt = Qe.document,
        mt = gt.documentElement,
        pt = 0,
        ft = 0,
        yt = [].pop,
        xt = [].push,
        bt = [].slice,
        wt = [].indexOf || function(e) {
            for (var t = 0, i = this.length; t < i; t++)
                if (this[t] === e) return t;
            return -1
        },
        vt = function(e, t) {
            return e[ct] = null == t || t, e
        },
        St = function() {
            var e = {},
                t = [];
            return vt(function(i, n) {
                return t.push(i) > Ue.cacheLength && delete e[t.shift()], e[i] = n
            }, e)
        },
        kt = St(),
        Tt = St(),
        It = St(),
        At = "\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w#") + ")|)|)[\\x20\\t\\r\\n\\f]*\\]",
        Et = ":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + At + ")|[^:]|\\\\.)*|.*))\\)|)",
        Pt = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        _t = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        Mt = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
        Ct = RegExp(Et),
        zt = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
        Rt = /[\x20\t\r\n\f]*[+~]/,
        Ot = /h\d/i,
        Dt = /input|select|textarea|button/i,
        Lt = /\\(?!\\)/g,
        Nt = {
            ID: /^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,
            NAME: /^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,
            TAG: RegExp("^(" + "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w", "w*") + ")"),
            ATTR: RegExp("^" + At),
            PSEUDO: RegExp("^" + Et),
            POS: /:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i,
            CHILD: RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        jt = function(e) {
            var t = gt.createElement("div");
            try {
                return e(t)
            } catch (e) {
                return !1
            }
        },
        Ht = jt(function(e) {
            return e.appendChild(gt.createComment("")), !e.getElementsByTagName("*").length
        }),
        Bt = jt(function(e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild && void 0 !== e.firstChild.getAttribute && "#" === e.firstChild.getAttribute("href")
        }),
        Gt = jt(function(e) {
            return e.innerHTML = "<select></select>", "boolean" != (e = typeof e.lastChild.getAttribute("multiple")) && "string" !== e
        }),
        Ut = jt(function(e) {
            return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !(!e.getElementsByClassName || !e.getElementsByClassName("e").length) && (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length)
        }),
        Ft = jt(function(e) {
            e.id = ct + 0, e.innerHTML = "<a name='" + ct + "'></a><div name='" + ct + "'></div>", mt.insertBefore(e, mt.firstChild);
            var t = gt.getElementsByName && gt.getElementsByName(ct).length === 2 + gt.getElementsByName(ct + 0).length;
            return Ge = !gt.getElementById(ct), mt.removeChild(e), t
        });
    try {
        bt.call(mt.childNodes, 0)[0].nodeType
    } catch (e) {
        bt = function(e) {
            for (var t, i = []; t = this[e]; e++) i.push(t);
            return i
        }
    }
    if (Je.matches = function(e, t) {
            return Je(e, null, null, t)
        }, Je.matchesSelector = function(e, t) {
            return 0 < Je(t, null, null, [e]).length
        }, Fe = Je.getText = function(e) {
            var t, i = "",
                n = 0;
            if (t = e.nodeType) {
                if (1 === t || 9 === t || 11 === t) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) i += Fe(e)
                } else if (3 === t || 4 === t) return e.nodeValue
            } else
                for (; t = e[n]; n++) i += Fe(t);
            return i
        }, We = Je.isXML = function(e) {
            return !!(e = e && (e.ownerDocument || e).documentElement) && "HTML" !== e.nodeName
        }, qe = Je.contains = mt.contains ? function(e, t) {
            var i = 9 === e.nodeType ? e.documentElement : e,
                n = t && t.parentNode;
            return e === n || !(!n || 1 !== n.nodeType || !i.contains || !i.contains(n))
        } : mt.compareDocumentPosition ? function(e, t) {
            return t && !!(16 & e.compareDocumentPosition(t))
        } : function(e, t) {
            for (; t = t.parentNode;)
                if (t === e) return !0;
            return !1
        }, Je.attr = function(e, t) {
            var i, n = We(e);
            return n || (t = t.toLowerCase()), (i = Ue.attrHandle[t]) ? i(e) : n || Gt ? e.getAttribute(t) : (i = e.getAttributeNode(t)) ? "boolean" == typeof e[t] ? e[t] ? t : null : i.specified ? i.value : null : null
        }, Ue = Je.selectors = {
            cacheLength: 50,
            createPseudo: vt,
            match: Nt,
            attrHandle: Bt ? {} : {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            find: {
                ID: Ge ? function(e, t, i) {
                    if (void 0 !== t.getElementById && !i) return (e = t.getElementById(e)) && e.parentNode ? [e] : []
                } : function(e, t, i) {
                    if (void 0 !== t.getElementById && !i) return (t = t.getElementById(e)) ? t.id === e || void 0 !== t.getAttributeNode && t.getAttributeNode("id").value === e ? [t] : void 0 : []
                },
                TAG: Ht ? function(e, t) {
                    if (void 0 !== t.getElementsByTagName) return t.getElementsByTagName(e)
                } : function(e, t) {
                    var i = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (var n, s = [], a = 0; n = i[a]; a++) 1 === n.nodeType && s.push(n);
                        return s
                    }
                    return i
                },
                NAME: Ft && function(e, t) {
                    if (void 0 !== t.getElementsByName) return t.getElementsByName(name)
                },
                CLASS: Ut && function(e, t, i) {
                    if (void 0 !== t.getElementsByClassName && !i) return t.getElementsByClassName(e)
                }
            },
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(Lt, ""), e[3] = (e[4] || e[5] || "").replace(Lt, ""), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1] ? (e[2] || Je.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * ("even" === e[2] || "odd" === e[2])), e[4] = +(e[6] + e[7] || "odd" === e[2])) : e[2] && Je.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, i;
                    return Nt.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[3] : (t = e[4]) && (Ct.test(t) && (i = nt(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (t = t.slice(0, i), e[0] = e[0].slice(0, i)), e[2] = t), e.slice(0, 3))
                }
            },
            filter: {
                ID: Ge ? function(e) {
                    return e = e.replace(Lt, ""),
                        function(t) {
                            return t.getAttribute("id") === e
                        }
                } : function(e) {
                    return e = e.replace(Lt, ""),
                        function(t) {
                            return (t = void 0 !== t.getAttributeNode && t.getAttributeNode("id")) && t.value === e
                        }
                },
                TAG: function(e) {
                    return "*" === e ? function() {
                        return !0
                    } : (e = e.replace(Lt, "").toLowerCase(), function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function(e) {
                    var t = kt[ct][e];
                    return t || (t = kt(e, RegExp("(^|[\\x20\\t\\r\\n\\f])" + e + "([\\x20\\t\\r\\n\\f]|$)"))),
                        function(e) {
                            return t.test(e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        }
                },
                ATTR: function(e, t, i) {
                    return function(n) {
                        return null == (n = Je.attr(n, e)) ? "!=" === t : !t || (n += "", "=" === t ? n === i : "!=" === t ? n !== i : "^=" === t ? i && 0 === n.indexOf(i) : "*=" === t ? i && -1 < n.indexOf(i) : "$=" === t ? i && n.substr(n.length - i.length) === i : "~=" === t ? -1 < (" " + n + " ").indexOf(i) : "|=" === t && (n === i || n.substr(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(e, t, i, n) {
                    return "nth" === e ? function(e) {
                        var t, s;
                        if (t = e.parentNode, 1 === i && 0 === n) return !0;
                        if (t)
                            for (s = 0, t = t.firstChild; t && (1 !== t.nodeType || (s++, e !== t)); t = t.nextSibling);
                        return (s -= n) === i || 0 == s % i && 0 <= s / i
                    } : function(t) {
                        var i = t;
                        switch (e) {
                            case "only":
                            case "first":
                                for (; i = i.previousSibling;)
                                    if (1 === i.nodeType) return !1;
                                if ("first" === e) return !0;
                                i = t;
                            case "last":
                                for (; i = i.nextSibling;)
                                    if (1 === i.nodeType) return !1;
                                return !0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var i, n = Ue.pseudos[e] || Ue.setFilters[e.toLowerCase()] || Je.error("unsupported pseudo: " + e);
                    return n[ct] ? n(t) : 1 < n.length ? (i = [e, e, "", t], Ue.setFilters.hasOwnProperty(e.toLowerCase()) ? vt(function(e, i) {
                        for (var s, a = n(e, t), o = a.length; o--;) e[s = wt.call(e, a[o])] = !(i[s] = a[o])
                    }) : function(e) {
                        return n(e, 0, i)
                    }) : n
                }
            },
            pseudos: {
                not: vt(function(e) {
                    var t = [],
                        i = [],
                        n = $e(e.replace(Pt, "$1"));
                    return n[ct] ? vt(function(e, t, i, s) {
                        s = n(e, null, s, []);
                        for (var a = e.length; a--;)(i = s[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, s, a) {
                        return t[0] = e, n(t, null, a, i), !i.pop()
                    }
                }),
                has: vt(function(e) {
                    return function(t) {
                        return 0 < Je(e, t).length
                    }
                }),
                contains: vt(function(e) {
                    return function(t) {
                        return -1 < (t.textContent || t.innerText || Fe(t)).indexOf(e)
                    }
                }),
                enabled: function(e) {
                    return !1 === e.disabled
                },
                disabled: function(e) {
                    return !0 === e.disabled
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                parent: function(e) {
                    return !Ue.pseudos.empty(e)
                },
                empty: function(e) {
                    var t;
                    for (e = e.firstChild; e;) {
                        if ("@" < e.nodeName || 3 === (t = e.nodeType) || 4 === t) return !1;
                        e = e.nextSibling
                    }
                    return !0
                },
                header: function(e) {
                    return Ot.test(e.nodeName)
                },
                text: function(e) {
                    var t, i;
                    return "input" === e.nodeName.toLowerCase() && "text" === (t = e.type) && (null == (i = e.getAttribute("type")) || i.toLowerCase() === t)
                },
                radio: Ze("radio"),
                checkbox: Ze("checkbox"),
                file: Ze("file"),
                password: Ze("password"),
                image: Ze("image"),
                submit: et("submit"),
                reset: et("reset"),
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                input: function(e) {
                    return Dt.test(e.nodeName)
                },
                focus: function(e) {
                    var t = e.ownerDocument;
                    return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && (!!e.type || !!e.href)
                },
                active: function(e) {
                    return e === e.ownerDocument.activeElement
                },
                first: tt(function() {
                    return [0]
                }),
                last: tt(function(e, t) {
                    return [t - 1]
                }),
                eq: tt(function(e, t, i) {
                    return [0 > i ? i + t : i]
                }),
                even: tt(function(e, t) {
                    for (var i = 0; i < t; i += 2) e.push(i);
                    return e
                }),
                odd: tt(function(e, t) {
                    for (var i = 1; i < t; i += 2) e.push(i);
                    return e
                }),
                lt: tt(function(e, t, i) {
                    for (t = 0 > i ? i + t : i; 0 <= --t;) e.push(t);
                    return e
                }),
                gt: tt(function(e, t, i) {
                    for (i = 0 > i ? i + t : i; ++i < t;) e.push(i);
                    return e
                })
            }
        }, Ve = mt.compareDocumentPosition ? function(e, t) {
            return e === t ? (Xe = !0, 0) : (e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) : e.compareDocumentPosition) ? -1 : 1
        } : function(e, t) {
            if (e === t) return Xe = !0, 0;
            if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
            var i, n, s = [],
                a = [],
                o = i = e.parentNode;
            if (i === (n = t.parentNode)) return it(e, t);
            if (!i) return -1;
            if (!n) return 1;
            for (; o;) s.unshift(o), o = o.parentNode;
            for (o = n; o;) a.unshift(o), o = o.parentNode;
            for (i = s.length, n = a.length, o = 0; o < i && o < n; o++)
                if (s[o] !== a[o]) return it(s[o], a[o]);
            return o === i ? it(e, a[o], -1) : it(s[o], t, 1)
        }, [0, 0].sort(Ve), Ye = !Xe, Je.uniqueSort = function(e) {
            var t, i = 1;
            if (Xe = Ye, e.sort(Ve), Xe)
                for (; t = e[i]; i++) t === e[i - 1] && e.splice(i--, 1);
            return e
        }, Je.error = function(e) {
            throw Error("Syntax error, unrecognized expression: " + e)
        }, $e = Je.compile = function(e, t) {
            var i, n = [],
                s = [],
                a = It[ct][e];
            if (!a) {
                for (t || (t = nt(e)), i = t.length; i--;)(a = ht(t[i]))[ct] ? n.push(a) : s.push(a);
                var o = 0 < n.length,
                    r = 0 < s.length,
                    h = function(e, t, i, a, l) {
                        var u, c, d = [],
                            g = 0,
                            m = "0",
                            p = e && [],
                            f = null != l,
                            y = Ke,
                            x = e || r && Ue.find.TAG("*", l && t.parentNode || t),
                            b = pt += null == y ? 1 : Math.E;
                        for (f && (Ke = t !== gt && t, Be = h.el); null != (l = x[m]); m++) {
                            if (r && l) {
                                for (u = 0; c = s[u]; u++)
                                    if (c(l, t, i)) {
                                        a.push(l);
                                        break
                                    } f && (pt = b, Be = ++h.el)
                            }
                            o && ((l = !c && l) && g--, e && p.push(l))
                        }
                        if (g += m, o && m !== g) {
                            for (u = 0; c = n[u]; u++) c(p, d, t, i);
                            if (e) {
                                if (0 < g)
                                    for (; m--;) !p[m] && !d[m] && (d[m] = yt.call(a));
                                d = ot(d)
                            }
                            xt.apply(a, d), f && !e && 0 < d.length && 1 < g + n.length && Je.uniqueSort(a)
                        }
                        return f && (pt = b, Ke = y), p
                    };
                h.el = 0, i = o ? vt(h) : h, a = It(e, i)
            }
            return a
        }, gt.querySelectorAll) {
        var Wt, qt = lt,
            $t = /'|\\/g,
            Vt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
            Xt = [":focus"],
            Kt = [":active", ":focus"],
            Yt = mt.matchesSelector || mt.mozMatchesSelector || mt.webkitMatchesSelector || mt.oMatchesSelector || mt.msMatchesSelector;
        jt(function(e) {
            e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || Xt.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || Xt.push(":checked")
        }), jt(function(e) {
            e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && Xt.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || Xt.push(":enabled", ":disabled")
        }), Xt = RegExp(Xt.join("|")), lt = function(e, t, i, n, s) {
            if (!(n || s || Xt && Xt.test(e))) {
                var a, o, r = !0,
                    h = ct;
                if (o = t, a = 9 === t.nodeType && e, 1 === t.nodeType && "object" !== t.nodeName.toLowerCase()) {
                    for (a = nt(e), (r = t.getAttribute("id")) ? h = r.replace($t, "\\$&") : t.setAttribute("id", h), h = "[id='" + h + "'] ", o = a.length; o--;) a[o] = h + a[o].join("");
                    o = Rt.test(e) && t.parentNode || t, a = a.join(",")
                }
                if (a) try {
                    return xt.apply(i, bt.call(o.querySelectorAll(a), 0)), i
                } catch (e) {} finally {
                    r || t.removeAttribute("id")
                }
            }
            return qt(e, t, i, n, s)
        }, Yt && (jt(function(e) {
            Wt = Yt.call(e, "div");
            try {
                Yt.call(e, "[test!='']:sizzle"), Kt.push("!=", Et)
            } catch (e) {}
        }), Kt = RegExp(Kt.join("|")), Je.matchesSelector = function(e, t) {
            if (t = t.replace(Vt, "='$1']"), !(We(e) || Kt.test(t) || Xt && Xt.test(t))) try {
                var i = Yt.call(e, t);
                if (i || Wt || e.document && 11 !== e.document.nodeType) return i
            } catch (e) {}
            return 0 < Je(t, null, null, [e]).length
        })
    }
    Ue.pseudos.nth = Ue.pseudos.eq, Ue.filters = ut.prototype = Ue.pseudos, Ue.setFilters = new ut, Je.attr = W.attr, W.find = Je, W.expr = Je.selectors, W.expr[":"] = W.expr.pseudos, W.unique = Je.uniqueSort, W.text = Je.getText, W.isXMLDoc = Je.isXML, W.contains = Je.contains;
    var Qt = /Until$/,
        Jt = /^(?:parents|prev(?:Until|All))/,
        Zt = /^.[^:#\[\.,]*$/,
        ei = W.expr.match.needsContext,
        ti = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    W.fn.extend({
        find: function(e) {
            var t, i, n, s, a, o, r = this;
            if ("string" != typeof e) return W(e).filter(function() {
                for (t = 0, i = r.length; t < i; t++)
                    if (W.contains(r[t], this)) return !0
            });
            for (o = this.pushStack("", "find", e), t = 0, i = this.length; t < i; t++)
                if (n = o.length, W.find(e, this[t], o), 0 < t)
                    for (s = n; s < o.length; s++)
                        for (a = 0; a < n; a++)
                            if (o[a] === o[s]) {
                                o.splice(s--, 1);
                                break
                            } return o
        },
        has: function(e) {
            var t, i = W(e, this),
                n = i.length;
            return this.filter(function() {
                for (t = 0; t < n; t++)
                    if (W.contains(this, i[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(h(this, e, !1), "not", e)
        },
        filter: function(e) {
            return this.pushStack(h(this, e, !0), "filter", e)
        },
        is: function(e) {
            return !!e && ("string" == typeof e ? ei.test(e) ? 0 <= W(e, this.context).index(this[0]) : 0 < W.filter(e, this).length : 0 < this.filter(e).length)
        },
        closest: function(e, t) {
            for (var i, n = 0, s = this.length, a = [], o = ei.test(e) || "string" != typeof e ? W(e, t || this.context) : 0; n < s; n++)
                for (i = this[n]; i && i.ownerDocument && i !== t && 11 !== i.nodeType;) {
                    if (o ? -1 < o.index(i) : W.find.matchesSelector(i, e)) {
                        a.push(i);
                        break
                    }
                    i = i.parentNode
                }
            return a = 1 < a.length ? W.unique(a) : a, this.pushStack(a, "closest", e)
        },
        index: function(e) {
            return e ? "string" == typeof e ? W.inArray(this[0], W(e)) : W.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(e, t) {
            var i = "string" == typeof e ? W(e, t) : W.makeArray(e && e.nodeType ? [e] : e),
                n = W.merge(this.get(), i);
            return this.pushStack(o(i[0]) || o(n[0]) ? n : W.unique(n))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), W.fn.andSelf = W.fn.addBack, W.each({
        parent: function(e) {
            return (e = e.parentNode) && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return W.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, i) {
            return W.dir(e, "parentNode", i)
        },
        next: function(e) {
            return r(e, "nextSibling")
        },
        prev: function(e) {
            return r(e, "previousSibling")
        },
        nextAll: function(e) {
            return W.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return W.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, i) {
            return W.dir(e, "nextSibling", i)
        },
        prevUntil: function(e, t, i) {
            return W.dir(e, "previousSibling", i)
        },
        siblings: function(e) {
            return W.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return W.sibling(e.firstChild)
        },
        contents: function(e) {
            return W.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : W.merge([], e.childNodes)
        }
    }, function(e, t) {
        W.fn[e] = function(i, n) {
            var s = W.map(this, t, i);
            return Qt.test(e) || (n = i), n && "string" == typeof n && (s = W.filter(n, s)), s = 1 < this.length && !ti[e] ? W.unique(s) : s, 1 < this.length && Jt.test(e) && (s = s.reverse()), this.pushStack(s, e, H.call(arguments).join(","))
        }
    }), W.extend({
        filter: function(e, t, i) {
            return i && (e = ":not(" + e + ")"), 1 === t.length ? W.find.matchesSelector(t[0], e) ? [t[0]] : [] : W.find.matches(e, t)
        },
        dir: function(e, i, n) {
            var s = [];
            for (e = e[i]; e && 9 !== e.nodeType && (n === t || 1 !== e.nodeType || !W(e).is(n));) 1 === e.nodeType && s.push(e), e = e[i];
            return s
        },
        sibling: function(e, t) {
            for (var i = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && i.push(e);
            return i
        }
    });
    var ii, ni, si = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ai = / jQuery\d+="(?:null|\d+)"/g,
        oi = /^\s+/,
        ri = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        hi = /<([\w:]+)/,
        li = /<tbody/i,
        ui = /<|&#?\w+;/,
        ci = /<(?:script|style|link)/i,
        di = /<(?:script|object|embed|option|style)/i,
        gi = RegExp("<(?:" + si + ")[\\s/>]", "i"),
        mi = /^(?:checkbox|radio)$/,
        pi = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fi = /\/(java|ecma)script/i,
        yi = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        xi = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        bi = l(R),
        wi = bi.appendChild(R.createElement("div"));
    xi.optgroup = xi.option, xi.tbody = xi.tfoot = xi.colgroup = xi.caption = xi.thead, xi.th = xi.td, W.support.htmlSerialize || (xi._default = [1, "X<div>", "</div>"]), W.fn.extend({
        text: function(e) {
            return W.access(this, function(e) {
                return e === t ? W.text(this) : this.empty().append((this[0] && this[0].ownerDocument || R).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (W.isFunction(e)) return this.each(function(t) {
                W(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = W(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return W.isFunction(e) ? this.each(function(t) {
                W(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = W(this),
                    i = t.contents();
                i.length ? i.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = W.isFunction(e);
            return this.each(function(i) {
                W(this).wrapAll(t ? e.call(this, i) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                W.nodeName(this, "body") || W(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(e) {
                (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            if (!o(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = W.clean(arguments);
                return this.pushStack(W.merge(e, this), "before", this.selector)
            }
        },
        after: function() {
            if (!o(this[0])) return this.domManip(arguments, !1, function(e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = W.clean(arguments);
                return this.pushStack(W.merge(this, e), "after", this.selector)
            }
        },
        remove: function(e, t) {
            for (var i, n = 0; null != (i = this[n]); n++) e && !W.filter(e, [i]).length || (!t && 1 === i.nodeType && (W.cleanData(i.getElementsByTagName("*")), W.cleanData([i])), i.parentNode && i.parentNode.removeChild(i));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                for (1 === e.nodeType && W.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return W.clone(this, e, t)
            })
        },
        html: function(e) {
            return W.access(this, function(e) {
                var i = this[0] || {},
                    n = 0,
                    s = this.length;
                if (e === t) return 1 === i.nodeType ? i.innerHTML.replace(ai, "") : t;
                if ("string" == typeof e && !ci.test(e) && (W.support.htmlSerialize || !gi.test(e)) && (W.support.leadingWhitespace || !oi.test(e)) && !xi[(hi.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(ri, "<$1></$2>");
                    try {
                        for (; n < s; n++) 1 === (i = this[n] || {}).nodeType && (W.cleanData(i.getElementsByTagName("*")), i.innerHTML = e);
                        i = 0
                    } catch (e) {}
                }
                i && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function(e) {
            return o(this[0]) ? this.length ? this.pushStack(W(W.isFunction(e) ? e() : e), "replaceWith", e) : this : W.isFunction(e) ? this.each(function(t) {
                var i = W(this),
                    n = i.html();
                i.replaceWith(e.call(this, t, n))
            }) : ("string" != typeof e && (e = W(e).detach()), this.each(function() {
                var t = this.nextSibling,
                    i = this.parentNode;
                W(this).remove(), t ? W(t).before(e) : W(i).append(e)
            }))
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, i, n) {
            var s, a, o, r = 0,
                h = (e = [].concat.apply([], e))[0],
                l = [],
                u = this.length;
            if (!W.support.checkClone && 1 < u && "string" == typeof h && pi.test(h)) return this.each(function() {
                W(this).domManip(e, i, n)
            });
            if (W.isFunction(h)) return this.each(function(s) {
                var a = W(this);
                e[0] = h.call(this, s, i ? a.html() : t), a.domManip(e, i, n)
            });
            if (this[0]) {
                if (a = (o = (s = W.buildFragment(e, this, l)).fragment).firstChild, 1 === o.childNodes.length && (o = a), a)
                    for (i = i && W.nodeName(a, "tr"), s = s.cacheable || u - 1; r < u; r++) n.call(i && W.nodeName(this[r], "table") ? this[r].getElementsByTagName("tbody")[0] || this[r].appendChild(this[r].ownerDocument.createElement("tbody")) : this[r], r === s ? o : W.clone(o, !0, !0));
                o = a = null, l.length && W.each(l, function(e, t) {
                    t.src ? W.ajax ? W.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        throws: !0
                    }) : W.error("no ajax") : W.globalEval((t.text || t.textContent || t.innerHTML || "").replace(yi, "")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), W.buildFragment = function(e, i, n) {
        var s, a, o, r = e[0];
        return i = (i = !(i = i || R).nodeType && i[0] || i).ownerDocument || i, 1 === e.length && "string" == typeof r && 512 > r.length && i === R && "<" === r.charAt(0) && !di.test(r) && (W.support.checkClone || !pi.test(r)) && (W.support.html5Clone || !gi.test(r)) && (a = !0, o = (s = W.fragments[r]) !== t), s || (s = i.createDocumentFragment(), W.clean(e, i, s, n), a && (W.fragments[r] = o && s)), {
            fragment: s,
            cacheable: a
        }
    }, W.fragments = {}, W.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        W.fn[e] = function(i) {
            var n, s = 0,
                a = [],
                o = (i = W(i)).length;
            if ((null == (n = 1 === this.length && this[0].parentNode) || n && 11 === n.nodeType && 1 === n.childNodes.length) && 1 === o) return i[t](this[0]), this;
            for (; s < o; s++) n = (0 < s ? this.clone(!0) : this).get(), W(i[s])[t](n), a = a.concat(n);
            return this.pushStack(a, e, i.selector)
        }
    }), W.extend({
        clone: function(e, t, i) {
            var n, s, a, o;
            if (W.support.html5Clone || W.isXMLDoc(e) || !gi.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (wi.innerHTML = e.outerHTML, wi.removeChild(o = wi.firstChild)), !(W.support.noCloneEvent && W.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || W.isXMLDoc(e)))
                for (c(e, o), n = d(e), s = d(o), a = 0; n[a]; ++a) s[a] && c(n[a], s[a]);
            if (t && (u(e, o), i))
                for (n = d(e), s = d(o), a = 0; n[a]; ++a) u(n[a], s[a]);
            return o
        },
        clean: function(e, t, i, n) {
            var s, a, o, r, h, u, c, d = t === R && bi,
                m = [];
            for (t && void 0 !== t.createDocumentFragment || (t = R), s = 0; null != (o = e[s]); s++)
                if ("number" == typeof o && (o += ""), o) {
                    if ("string" == typeof o)
                        if (ui.test(o)) {
                            for (d = d || l(t), u = t.createElement("div"), d.appendChild(u), o = o.replace(ri, "<$1></$2>"), a = (hi.exec(o) || ["", ""])[1].toLowerCase(), h = (r = xi[a] || xi._default)[0], u.innerHTML = r[1] + o + r[2]; h--;) u = u.lastChild;
                            if (!W.support.tbody)
                                for (h = li.test(o), a = (r = "table" !== a || h ? "<table>" !== r[1] || h ? [] : u.childNodes : u.firstChild && u.firstChild.childNodes).length - 1; 0 <= a; --a) W.nodeName(r[a], "tbody") && !r[a].childNodes.length && r[a].parentNode.removeChild(r[a]);
                            !W.support.leadingWhitespace && oi.test(o) && u.insertBefore(t.createTextNode(oi.exec(o)[0]), u.firstChild), o = u.childNodes, u.parentNode.removeChild(u)
                        } else o = t.createTextNode(o);
                    o.nodeType ? m.push(o) : W.merge(m, o)
                } if (u && (o = u = d = null), !W.support.appendChecked)
                for (s = 0; null != (o = m[s]); s++) W.nodeName(o, "input") ? g(o) : void 0 !== o.getElementsByTagName && W.grep(o.getElementsByTagName("input"), g);
            if (i)
                for (e = function(e) {
                        if (!e.type || fi.test(e.type)) return n ? n.push(e.parentNode ? e.parentNode.removeChild(e) : e) : i.appendChild(e)
                    }, s = 0; null != (o = m[s]); s++) W.nodeName(o, "script") && e(o) || (i.appendChild(o), void 0 !== o.getElementsByTagName && (c = W.grep(W.merge([], o.getElementsByTagName("script")), e), m.splice.apply(m, [s + 1, 0].concat(c)), s += c.length));
            return m
        },
        cleanData: function(e, t) {
            for (var i, n, s, a, o = 0, r = W.expando, h = W.cache, l = W.support.deleteExpando, u = W.event.special; null != (s = e[o]); o++)
                if ((t || W.acceptData(s)) && (i = (n = s[r]) && h[n])) {
                    if (i.events)
                        for (a in i.events) u[a] ? W.event.remove(s, a) : W.removeEvent(s, a, i.handle);
                    h[n] && (delete h[n], l ? delete s[r] : s.removeAttribute ? s.removeAttribute(r) : s[r] = null, W.deletedIds.push(n))
                }
        }
    }), W.uaMatch = function(e) {
        return e = e.toLowerCase(), {
            browser: (e = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [])[1] || "",
            version: e[2] || "0"
        }
    }, ni = {}, (ii = W.uaMatch(D.userAgent)).browser && (ni[ii.browser] = !0, ni.version = ii.version), ni.chrome ? ni.webkit = !0 : ni.webkit && (ni.safari = !0), W.browser = ni, W.sub = function() {
        function e(t, i) {
            return new e.fn.init(t, i)
        }
        W.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function(i, n) {
            return n && n instanceof W && !(n instanceof e) && (n = e(n)), W.fn.init.call(this, i, n, t)
        }, e.fn.init.prototype = e.fn;
        var t = e(R);
        return e
    };
    var vi, Si, ki, Ti = /alpha\([^)]*\)/i,
        Ii = /opacity=([^)]*)/,
        Ai = /^(top|right|bottom|left)$/,
        Ei = /^(none|table(?!-c[ea]).+)/,
        Pi = /^margin/,
        _i = RegExp("^(" + q + ")(.*)$", "i"),
        Mi = RegExp("^(" + q + ")(?!px)[a-z%]+$", "i"),
        Ci = RegExp("^([-+])=(" + q + ")", "i"),
        zi = {},
        Ri = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Oi = {
            letterSpacing: 0,
            fontWeight: 400
        },
        Di = ["Top", "Right", "Bottom", "Left"],
        Li = ["Webkit", "O", "Moz", "ms"],
        Ni = W.fn.toggle;
    W.fn.extend({
        css: function(e, i) {
            return W.access(this, function(e, i, n) {
                return n !== t ? W.style(e, i, n) : W.css(e, i)
            }, e, i, 1 < arguments.length)
        },
        show: function() {
            return f(this, !0)
        },
        hide: function() {
            return f(this)
        },
        toggle: function(e, t) {
            var i = "boolean" == typeof e;
            return W.isFunction(e) && W.isFunction(t) ? Ni.apply(this, arguments) : this.each(function() {
                (i ? e : p(this)) ? W(this).show(): W(this).hide()
            })
        }
    }), W.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var i = vi(e, "opacity");
                        return "" === i ? "1" : i
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: W.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, i, n, s) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var a, o, r, h = W.camelCase(i),
                    l = e.style;
                if (i = W.cssProps[h] || (W.cssProps[h] = m(l, h)), r = W.cssHooks[i] || W.cssHooks[h], n === t) return r && "get" in r && (a = r.get(e, !1, s)) !== t ? a : l[i];
                if ("string" == (o = typeof n) && (a = Ci.exec(n)) && (n = (a[1] + 1) * a[2] + parseFloat(W.css(e, i)), o = "number"), !(null == n || "number" === o && isNaN(n) || ("number" === o && !W.cssNumber[h] && (n += "px"), r && "set" in r && (n = r.set(e, n, s)) === t))) try {
                    l[i] = n
                } catch (e) {}
            }
        },
        css: function(e, i, n, s) {
            var a, o, r, h = W.camelCase(i);
            return i = W.cssProps[h] || (W.cssProps[h] = m(e.style, h)), (r = W.cssHooks[i] || W.cssHooks[h]) && "get" in r && (a = r.get(e, !0, s)), a === t && (a = vi(e, i)), "normal" === a && i in Oi && (a = Oi[i]), n || s !== t ? (o = parseFloat(a), n || W.isNumeric(o) ? o || 0 : a) : a
        },
        swap: function(e, t, i) {
            var n, s = {};
            for (n in t) s[n] = e.style[n], e.style[n] = t[n];
            for (n in i = i.call(e), t) e.style[n] = s[n];
            return i
        }
    }), e.getComputedStyle ? vi = function(t, i) {
        var n, s, a, o, r = e.getComputedStyle(t, null),
            h = t.style;
        return r && ("" === (n = r[i]) && !W.contains(t.ownerDocument, t) && (n = W.style(t, i)), Mi.test(n) && Pi.test(i) && (s = h.width, a = h.minWidth, o = h.maxWidth, h.minWidth = h.maxWidth = h.width = n, n = r.width, h.width = s, h.minWidth = a, h.maxWidth = o)), n
    } : R.documentElement.currentStyle && (vi = function(e, t) {
        var i, n, s = e.currentStyle && e.currentStyle[t],
            a = e.style;
        return null == s && a && a[t] && (s = a[t]), Mi.test(s) && !Ai.test(t) && (i = a.left, (n = e.runtimeStyle && e.runtimeStyle.left) && (e.runtimeStyle.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : s, s = a.pixelLeft + "px", a.left = i, n && (e.runtimeStyle.left = n)), "" === s ? "auto" : s
    }), W.each(["height", "width"], function(e, t) {
        W.cssHooks[t] = {
            get: function(e, i, n) {
                if (i) return 0 === e.offsetWidth && Ei.test(vi(e, "display")) ? W.swap(e, Ri, function() {
                    return b(e, t, n)
                }) : b(e, t, n)
            },
            set: function(e, i, n) {
                return y(e, i, n ? x(e, t, n, W.support.boxSizing && "border-box" === W.css(e, "boxSizing")) : 0)
            }
        }
    }), W.support.opacity || (W.cssHooks.opacity = {
        get: function(e, t) {
            return Ii.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var i = e.style,
                n = e.currentStyle,
                s = W.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                a = n && n.filter || i.filter || "";
            i.zoom = 1, 1 <= t && "" === W.trim(a.replace(Ti, "")) && i.removeAttribute && (i.removeAttribute("filter"), n && !n.filter) || (i.filter = Ti.test(a) ? a.replace(Ti, s) : a + " " + s)
        }
    }), W(function() {
        W.support.reliableMarginRight || (W.cssHooks.marginRight = {
            get: function(e, t) {
                return W.swap(e, {
                    display: "inline-block"
                }, function() {
                    if (t) return vi(e, "marginRight")
                })
            }
        }), !W.support.pixelPosition && W.fn.position && W.each(["top", "left"], function(e, t) {
            W.cssHooks[t] = {
                get: function(e, i) {
                    if (i) {
                        var n = vi(e, t);
                        return Mi.test(n) ? W(e).position()[t] + "px" : n
                    }
                }
            }
        })
    }), W.expr && W.expr.filters && (W.expr.filters.hidden = function(e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !W.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || vi(e, "display"))
    }, W.expr.filters.visible = function(e) {
        return !W.expr.filters.hidden(e)
    }), W.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        W.cssHooks[e + t] = {
            expand: function(i) {
                var n = "string" == typeof i ? i.split(" ") : [i],
                    s = {};
                for (i = 0; 4 > i; i++) s[e + Di[i] + t] = n[i] || n[i - 2] || n[0];
                return s
            }
        }, Pi.test(e) || (W.cssHooks[e + t].set = y)
    });
    var ji = /%20/g,
        Hi = /\[\]$/,
        Bi = /\r?\n/g,
        Gi = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Ui = /^(?:select|textarea)/i;
    W.fn.extend({
        serialize: function() {
            return W.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? W.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Ui.test(this.nodeName) || Gi.test(this.type))
            }).map(function(e, t) {
                var i = W(this).val();
                return null == i ? null : W.isArray(i) ? W.map(i, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(Bi, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: i.replace(Bi, "\r\n")
                }
            }).get()
        }
    }), W.param = function(e, i) {
        var n, s = [],
            a = function(e, t) {
                t = W.isFunction(t) ? t() : null == t ? "" : t, s[s.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (i === t && (i = W.ajaxSettings && W.ajaxSettings.traditional), W.isArray(e) || e.jquery && !W.isPlainObject(e)) W.each(e, function() {
            a(this.name, this.value)
        });
        else
            for (n in e) v(n, e[n], i, a);
        return s.join("&").replace(ji, "+")
    };
    var Fi, Wi, qi = /#.*$/,
        $i = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Vi = /^(?:GET|HEAD)$/,
        Xi = /^\/\//,
        Ki = /\?/,
        Yi = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Qi = /([?&])_=[^&]*/,
        Ji = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Zi = W.fn.load,
        en = {},
        tn = {},
        nn = ["*/"] + ["*"];
    try {
        Wi = O.href
    } catch (e) {
        (Wi = R.createElement("a")).href = "", Wi = Wi.href
    }
    Fi = Ji.exec(Wi.toLowerCase()) || [], W.fn.load = function(e, i, n) {
        if ("string" != typeof e && Zi) return Zi.apply(this, arguments);
        if (!this.length) return this;
        var s, a, o, r = this,
            h = e.indexOf(" ");
        return 0 <= h && (s = e.slice(h, e.length), e = e.slice(0, h)), W.isFunction(i) ? (n = i, i = t) : i && "object" == typeof i && (a = "POST"), W.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: i,
            complete: function(e, t) {
                n && r.each(n, o || [e.responseText, t, e])
            }
        }).done(function(e) {
            o = arguments, r.html(s ? W("<div>").append(e.replace(Yi, "")).find(s) : e)
        }), this
    }, W.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, t) {
        W.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), W.each(["get", "post"], function(e, i) {
        W[i] = function(e, n, s, a) {
            return W.isFunction(n) && (a = a || s, s = n, n = t), W.ajax({
                type: i,
                url: e,
                data: n,
                success: s,
                dataType: a
            })
        }
    }), W.extend({
        getScript: function(e, i) {
            return W.get(e, t, i, "script")
        },
        getJSON: function(e, t, i) {
            return W.get(e, t, i, "json")
        },
        ajaxSetup: function(e, t) {
            return t ? T(e, W.ajaxSettings) : (t = e, e = W.ajaxSettings), T(e, t), e
        },
        ajaxSettings: {
            url: Wi,
            isLocal: /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/.test(Fi[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": nn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": W.parseJSON,
                "text xml": W.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: S(en),
        ajaxTransport: S(tn),
        ajax: function(e, i) {
            function n(e, i, n, o) {
                var l, c, x, b, v, k = i;
                if (2 !== w) {
                    if (w = 2, h && clearTimeout(h), r = t, a = o || "", S.readyState = 0 < e ? 4 : 0, n) {
                        o = S;
                        var T, I, A, E, P = (b = d).contents,
                            _ = b.dataTypes,
                            M = b.responseFields;
                        for (I in M) I in n && (o[M[I]] = n[I]);
                        for (;
                            "*" === _[0];) _.shift(), T === t && (T = b.mimeType || o.getResponseHeader("content-type"));
                        if (T)
                            for (I in P)
                                if (P[I] && P[I].test(T)) {
                                    _.unshift(I);
                                    break
                                } if (_[0] in n) A = _[0];
                        else {
                            for (I in n) {
                                if (!_[0] || b.converters[I + " " + _[0]]) {
                                    A = I;
                                    break
                                }
                                E || (E = I)
                            }
                            A = A || E
                        }
                        b = n = A ? (A !== _[0] && _.unshift(A), n[A]) : void 0
                    }
                    if (200 <= e && 300 > e || 304 === e)
                        if (d.ifModified && ((v = S.getResponseHeader("Last-Modified")) && (W.lastModified[s] = v), (v = S.getResponseHeader("Etag")) && (W.etag[s] = v)), 304 === e) k = "notmodified", l = !0;
                        else {
                            var C;
                            e: {
                                var z;
                                if (c = b, k = (l = d).dataTypes.slice(), n = k[0], T = {}, I = 0, l.dataFilter && (c = l.dataFilter(c, l.dataType)), k[1])
                                    for (C in l.converters) T[C.toLowerCase()] = l.converters[C];
                                for (; x = k[++I];)
                                    if ("*" !== x) {
                                        if ("*" !== n && n !== x) {
                                            if (!(C = T[n + " " + x] || T["* " + x]))
                                                for (z in T)
                                                    if ((v = z.split(" "))[1] === x && (C = T[n + " " + v[0]] || T["* " + v[0]])) {
                                                        !0 === C ? C = T[z] : !0 !== T[z] && (x = v[0], k.splice(I--, 0, x));
                                                        break
                                                    } if (!0 !== C)
                                                if (C && l.throws) c = C(c);
                                                else try {
                                                    c = C(c)
                                                } catch (e) {
                                                    C = {
                                                        state: "parsererror",
                                                        error: C ? e : "No conversion from " + n + " to " + x
                                                    };
                                                    break e
                                                }
                                        }
                                        n = x
                                    } C = {
                                    state: "success",
                                    data: c
                                }
                            }
                            k = (l = C).state, c = l.data, l = !(x = l.error)
                        }
                    else x = k, (!k || e) && (k = "error", 0 > e && (e = 0));
                    S.status = e, S.statusText = (i || k) + "", l ? p.resolveWith(g, [c, k, S]) : p.rejectWith(g, [S, k, x]), S.statusCode(y), y = t, u && m.trigger("ajax" + (l ? "Success" : "Error"), [S, d, l ? c : x]), f.fireWith(g, [S, k]), u && (m.trigger("ajaxComplete", [S, d]), --W.active || W.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof e && (i = e, e = t), i = i || {};
            var s, a, o, r, h, l, u, c, d = W.ajaxSetup({}, i),
                g = d.context || d,
                m = g !== d && (g.nodeType || g instanceof W) ? W(g) : W.event,
                p = W.Deferred(),
                f = W.Callbacks("once memory"),
                y = d.statusCode || {},
                x = {},
                b = {},
                w = 0,
                v = "canceled",
                S = {
                    readyState: 0,
                    setRequestHeader: function(e, t) {
                        if (!w) {
                            var i = e.toLowerCase();
                            e = b[i] = b[i] || e, x[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === w ? a : null
                    },
                    getResponseHeader: function(e) {
                        var i;
                        if (2 === w) {
                            if (!o)
                                for (o = {}; i = $i.exec(a);) o[i[1].toLowerCase()] = i[2];
                            i = o[e.toLowerCase()]
                        }
                        return i === t ? null : i
                    },
                    overrideMimeType: function(e) {
                        return w || (d.mimeType = e), this
                    },
                    abort: function(e) {
                        return e = e || v, r && r.abort(e), n(0, e), this
                    }
                };
            if (p.promise(S), S.success = S.done, S.error = S.fail, S.complete = f.add, S.statusCode = function(e) {
                    var t;
                    if (e)
                        if (2 > w)
                            for (t in e) y[t] = [y[t], e[t]];
                        else t = e[S.status], S.always(t);
                    return this
                }, d.url = ((e || d.url) + "").replace(qi, "").replace(Xi, Fi[1] + "//"), d.dataTypes = W.trim(d.dataType || "*").toLowerCase().split(V), null == d.crossDomain && (l = Ji.exec(d.url.toLowerCase()) || !1, d.crossDomain = l && l.join(":") + (l[3] ? "" : "http:" === l[1] ? 80 : 443) !== Fi.join(":") + (Fi[3] ? "" : "http:" === Fi[1] ? 80 : 443)), d.data && d.processData && "string" != typeof d.data && (d.data = W.param(d.data, d.traditional)), k(en, d, i, S), 2 === w) return S;
            if (u = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Vi.test(d.type), u && 0 == W.active++ && W.event.trigger("ajaxStart"), !d.hasContent && (d.data && (d.url += (Ki.test(d.url) ? "&" : "?") + d.data, delete d.data), s = d.url, !1 === d.cache)) {
                l = W.now();
                var T = d.url.replace(Qi, "$1_=" + l);
                d.url = T + (T === d.url ? (Ki.test(d.url) ? "&" : "?") + "_=" + l : "")
            }
            for (c in (d.data && d.hasContent && !1 !== d.contentType || i.contentType) && S.setRequestHeader("Content-Type", d.contentType), d.ifModified && (s = s || d.url, W.lastModified[s] && S.setRequestHeader("If-Modified-Since", W.lastModified[s]), W.etag[s] && S.setRequestHeader("If-None-Match", W.etag[s])), S.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + nn + "; q=0.01" : "") : d.accepts["*"]), d.headers) S.setRequestHeader(c, d.headers[c]);
            if (!d.beforeSend || !1 !== d.beforeSend.call(g, S, d) && 2 !== w) {
                for (c in v = "abort", {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) S[c](d[c]);
                if (r = k(tn, d, i, S)) {
                    S.readyState = 1, u && m.trigger("ajaxSend", [S, d]), d.async && 0 < d.timeout && (h = setTimeout(function() {
                        S.abort("timeout")
                    }, d.timeout));
                    try {
                        w = 1, r.send(x, n)
                    } catch (e) {
                        if (!(2 > w)) throw e;
                        n(-1, e)
                    }
                } else n(-1, "No Transport");
                return S
            }
            return S.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var sn = [],
        an = /\?/,
        on = /(=)\?(?=&|$)|\?\?/,
        rn = W.now();
    W.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = sn.pop() || W.expando + "_" + rn++;
            return this[e] = !0, e
        }
    }), W.ajaxPrefilter("json jsonp", function(i, n, s) {
        var a, o, r, h = i.data,
            l = i.url,
            u = !1 !== i.jsonp,
            c = u && on.test(l),
            d = u && !c && "string" == typeof h && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && on.test(h);
        if ("jsonp" === i.dataTypes[0] || c || d) return a = i.jsonpCallback = W.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, o = e[a], c ? i.url = l.replace(on, "$1" + a) : d ? i.data = h.replace(on, "$1" + a) : u && (i.url += (an.test(l) ? "&" : "?") + i.jsonp + "=" + a), i.converters["script json"] = function() {
            return r || W.error(a + " was not called"), r[0]
        }, i.dataTypes[0] = "json", e[a] = function() {
            r = arguments
        }, s.always(function() {
            e[a] = o, i[a] && (i.jsonpCallback = n.jsonpCallback, sn.push(a)), r && W.isFunction(o) && o(r[0]), r = o = t
        }), "script"
    }), W.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(e) {
                return W.globalEval(e), e
            }
        }
    }), W.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), W.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var i, n = R.head || R.getElementsByTagName("head")[0] || R.documentElement;
            return {
                send: function(s, a) {
                    (i = R.createElement("script")).async = "async", e.scriptCharset && (i.charset = e.scriptCharset), i.src = e.url, i.onload = i.onreadystatechange = function(e, s) {
                        (s || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, n && i.parentNode && n.removeChild(i), i = t, s || a(200, "success"))
                    }, n.insertBefore(i, n.firstChild)
                },
                abort: function() {
                    i && i.onload(0, 1)
                }
            }
        }
    });
    var hn, ln = !!e.ActiveXObject && function() {
            for (var e in hn) hn[e](0, 1)
        },
        un = 0;
    W.ajaxSettings.xhr = e.ActiveXObject ? function() {
        var t;
        if (!(t = !this.isLocal && I())) e: {
            try {
                t = new e.ActiveXObject("Microsoft.XMLHTTP");
                break e
            } catch (e) {}
            t = void 0
        }
        return t
    } : I;
    var cn = W.ajaxSettings.xhr();
    W.extend(W.support, {
        ajax: !!cn,
        cors: !!cn && "withCredentials" in cn
    }), W.support.ajax && W.ajaxTransport(function(i) {
        var n;
        if (!i.crossDomain || W.support.cors) return {
            send: function(s, a) {
                var o, r, h = i.xhr();
                if (i.username ? h.open(i.type, i.url, i.async, i.username, i.password) : h.open(i.type, i.url, i.async), i.xhrFields)
                    for (r in i.xhrFields) h[r] = i.xhrFields[r];
                i.mimeType && h.overrideMimeType && h.overrideMimeType(i.mimeType), !i.crossDomain && !s["X-Requested-With"] && (s["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (r in s) h.setRequestHeader(r, s[r])
                } catch (e) {}
                h.send(i.hasContent && i.data || null), n = function(e, s) {
                    var r, l, u, c, d;
                    try {
                        if (n && (s || 4 === h.readyState))
                            if (n = t, o && (h.onreadystatechange = W.noop, ln && delete hn[o]), s) 4 !== h.readyState && h.abort();
                            else {
                                r = h.status, u = h.getAllResponseHeaders(), c = {}, (d = h.responseXML) && d.documentElement && (c.xml = d);
                                try {
                                    c.text = h.responseText
                                } catch (e) {}
                                try {
                                    l = h.statusText
                                } catch (e) {
                                    l = ""
                                }
                                r || !i.isLocal || i.crossDomain ? 1223 === r && (r = 204) : r = c.text ? 200 : 404
                            }
                    } catch (e) {
                        s || a(-1, e)
                    }
                    c && a(r, l, c, u)
                }, i.async ? 4 === h.readyState ? setTimeout(n, 0) : (o = ++un, ln && (hn || (hn = {}, W(e).unload(ln)), hn[o] = n), h.onreadystatechange = n) : n()
            },
            abort: function() {
                n && n(0, 1)
            }
        }
    });
    var dn, gn, mn = /^(?:toggle|show|hide)$/,
        pn = RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$", "i"),
        fn = /queueHooks$/,
        yn = [function(e, t, i) {
            var n, s, a, o, r, h, l = this,
                u = e.style,
                c = {},
                d = [],
                g = e.nodeType && p(e);
            for (n in i.queue || (null == (r = W._queueHooks(e, "fx")).unqueued && (r.unqueued = 0, h = r.empty.fire, r.empty.fire = function() {
                    r.unqueued || h()
                }), r.unqueued++, l.always(function() {
                    l.always(function() {
                        r.unqueued--, W.queue(e, "fx").length || r.empty.fire()
                    })
                })), 1 === e.nodeType && ("height" in t || "width" in t) && (i.overflow = [u.overflow, u.overflowX, u.overflowY], "inline" === W.css(e, "display") && "none" === W.css(e, "float") && (W.support.inlineBlockNeedsLayout && "inline" !== w(e.nodeName) ? u.zoom = 1 : u.display = "inline-block")), i.overflow && (u.overflow = "hidden", W.support.shrinkWrapBlocks || l.done(function() {
                    u.overflow = i.overflow[0], u.overflowX = i.overflow[1], u.overflowY = i.overflow[2]
                })), t) s = t[n], mn.exec(s) && (delete t[n], s !== (g ? "hide" : "show") && d.push(n));
            if (s = d.length)
                for (a = W._data(e, "fxshow") || W._data(e, "fxshow", {}), g ? W(e).show() : l.done(function() {
                        W(e).hide()
                    }), l.done(function() {
                        var t;
                        for (t in W.removeData(e, "fxshow", !0), c) W.style(e, t, c[t])
                    }), n = 0; n < s; n++) t = d[n], o = l.createTween(t, g ? a[t] : 0), c[t] = a[t] || W.style(e, t), t in a || (a[t] = o.start, g && (o.end = o.start, o.start = "width" === t || "height" === t ? 1 : 0))
        }],
        xn = {
            "*": [function(e, t) {
                var i, n, s = this.createTween(e, t),
                    a = pn.exec(t),
                    o = s.cur(),
                    r = +o || 0,
                    h = 1,
                    l = 20;
                if (a) {
                    if (i = +a[2], "px" !== (n = a[3] || (W.cssNumber[e] ? "" : "px")) && r) {
                        r = W.css(s.elem, e, !0) || i || 1;
                        do {
                            r /= h = h || ".5", W.style(s.elem, e, r + n)
                        } while (h !== (h = s.cur() / o) && 1 !== h && --l)
                    }
                    s.unit = n, s.start = r, s.end = a[1] ? r + (a[1] + 1) * i : i
                }
                return s
            }]
        };
    W.Animation = W.extend(E, {
        tweener: function(e, t) {
            W.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var i, n = 0, s = e.length; n < s; n++) i = e[n], xn[i] = xn[i] || [], xn[i].unshift(t)
        },
        prefilter: function(e, t) {
            t ? yn.unshift(e) : yn.push(e)
        }
    }), W.Tween = P, P.prototype = {
        constructor: P,
        init: function(e, t, i, n, s, a) {
            this.elem = e, this.prop = i, this.easing = s || "swing", this.options = t, this.start = this.now = this.cur(), this.end = n, this.unit = a || (W.cssNumber[i] ? "" : "px")
        },
        cur: function() {
            var e = P.propHooks[this.prop];
            return e && e.get ? e.get(this) : P.propHooks._default.get(this)
        },
        run: function(e) {
            var t, i = P.propHooks[this.prop];
            return this.options.duration ? this.pos = t = W.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : P.propHooks._default.set(this), this
        }
    }, P.prototype.init.prototype = P.prototype, P.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = W.css(e.elem, e.prop, !1, "")) && "auto" !== t ? t : 0 : e.elem[e.prop]
            },
            set: function(e) {
                W.fx.step[e.prop] ? W.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[W.cssProps[e.prop]] || W.cssHooks[e.prop]) ? W.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, W.each(["toggle", "show", "hide"], function(e, t) {
        var i = W.fn[t];
        W.fn[t] = function(n, s, a) {
            return null == n || "boolean" == typeof n || !e && W.isFunction(n) && W.isFunction(s) ? i.apply(this, arguments) : this.animate(_(t, !0), n, s, a)
        }
    }), W.fn.extend({
        fadeTo: function(e, t, i, n) {
            return this.filter(p).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, i, n)
        },
        animate: function(e, t, i, n) {
            var s = W.isEmptyObject(e),
                a = W.speed(t, i, n);
            return t = function() {
                var t = E(this, W.extend({}, e), a);
                s && t.stop(!0)
            }, s || !1 === a.queue ? this.each(t) : this.queue(a.queue, t)
        },
        stop: function(e, i, n) {
            var s = function(e) {
                var t = e.stop;
                delete e.stop, t(n)
            };
            return "string" != typeof e && (n = i, i = e, e = t), i && !1 !== e && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    i = null != e && e + "queueHooks",
                    a = W.timers,
                    o = W._data(this);
                if (i) o[i] && o[i].stop && s(o[i]);
                else
                    for (i in o) o[i] && o[i].stop && fn.test(i) && s(o[i]);
                for (i = a.length; i--;) a[i].elem === this && (null == e || a[i].queue === e) && (a[i].anim.stop(n), t = !1, a.splice(i, 1));
                (t || !n) && W.dequeue(this, e)
            })
        }
    }), W.each({
        slideDown: _("show"),
        slideUp: _("hide"),
        slideToggle: _("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        W.fn[e] = function(e, i, n) {
            return this.animate(t, e, i, n)
        }
    }), W.speed = function(e, t, i) {
        var n = e && "object" == typeof e ? W.extend({}, e) : {
            complete: i || !i && t || W.isFunction(e) && e,
            duration: e,
            easing: i && t || t && !W.isFunction(t) && t
        };
        return n.duration = W.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in W.fx.speeds ? W.fx.speeds[n.duration] : W.fx.speeds._default, null != n.queue && !0 !== n.queue || (n.queue = "fx"), n.old = n.complete, n.complete = function() {
            W.isFunction(n.old) && n.old.call(this), n.queue && W.dequeue(this, n.queue)
        }, n
    }, W.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, W.timers = [], W.fx = P.prototype.init, W.fx.tick = function() {
        for (var e, t = W.timers, i = 0; i < t.length; i++) !(e = t[i])() && t[i] === e && t.splice(i--, 1);
        t.length || W.fx.stop()
    }, W.fx.timer = function(e) {
        e() && W.timers.push(e) && !gn && (gn = setInterval(W.fx.tick, W.fx.interval))
    }, W.fx.interval = 13, W.fx.stop = function() {
        clearInterval(gn), gn = null
    }, W.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, W.fx.step = {}, W.expr && W.expr.filters && (W.expr.filters.animated = function(e) {
        return W.grep(W.timers, function(t) {
            return e === t.elem
        }).length
    });
    var bn = /^(?:body|html)$/i;
    W.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            W.offset.setOffset(this, e, t)
        });
        var i, n, s, a, o, r, h, l = {
                top: 0,
                left: 0
            },
            u = this[0],
            c = u && u.ownerDocument;
        return c ? (n = c.body) === u ? W.offset.bodyOffset(u) : (i = c.documentElement, W.contains(i, u) ? (void 0 !== u.getBoundingClientRect && (l = u.getBoundingClientRect()), s = M(c), a = i.clientTop || n.clientTop || 0, o = i.clientLeft || n.clientLeft || 0, r = s.pageYOffset || i.scrollTop, h = s.pageXOffset || i.scrollLeft, {
            top: l.top + r - a,
            left: l.left + h - o
        }) : l) : void 0
    }, W.offset = {
        bodyOffset: function(e) {
            var t = e.offsetTop,
                i = e.offsetLeft;
            return W.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(W.css(e, "marginTop")) || 0, i += parseFloat(W.css(e, "marginLeft")) || 0), {
                top: t,
                left: i
            }
        },
        setOffset: function(e, t, i) {
            var n = W.css(e, "position");
            "static" === n && (e.style.position = "relative");
            var s, a, o = W(e),
                r = o.offset(),
                h = W.css(e, "top"),
                l = W.css(e, "left"),
                u = {},
                c = {};
            ("absolute" === n || "fixed" === n) && -1 < W.inArray("auto", [h, l]) ? (s = (c = o.position()).top, a = c.left) : (s = parseFloat(h) || 0, a = parseFloat(l) || 0), W.isFunction(t) && (t = t.call(e, i, r)), null != t.top && (u.top = t.top - r.top + s), null != t.left && (u.left = t.left - r.left + a), "using" in t ? t.using.call(e, u) : o.css(u)
        }
    }, W.fn.extend({
        position: function() {
            if (this[0]) {
                var e = this[0],
                    t = this.offsetParent(),
                    i = this.offset(),
                    n = bn.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return i.top -= parseFloat(W.css(e, "marginTop")) || 0, i.left -= parseFloat(W.css(e, "marginLeft")) || 0, n.top += parseFloat(W.css(t[0], "borderTopWidth")) || 0, n.left += parseFloat(W.css(t[0], "borderLeftWidth")) || 0, {
                    top: i.top - n.top,
                    left: i.left - n.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || R.body; e && !bn.test(e.nodeName) && "static" === W.css(e, "position");) e = e.offsetParent;
                return e || R.body
            })
        }
    }), W.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, i) {
        var n = /Y/.test(i);
        W.fn[e] = function(s) {
            return W.access(this, function(e, s, a) {
                var o = M(e);
                if (a === t) return o ? i in o ? o[i] : o.document.documentElement[s] : e[s];
                o ? o.scrollTo(n ? W(o).scrollLeft() : a, n ? a : W(o).scrollTop()) : e[s] = a
            }, e, s, arguments.length, null)
        }
    }), W.each({
        Height: "height",
        Width: "width"
    }, function(e, i) {
        W.each({
            padding: "inner" + e,
            content: i,
            "": "outer" + e
        }, function(n, s) {
            W.fn[s] = function(s, a) {
                var o = arguments.length && (n || "boolean" != typeof s),
                    r = n || (!0 === s || !0 === a ? "margin" : "border");
                return W.access(this, function(i, n, s) {
                    var a;
                    return W.isWindow(i) ? i.document.documentElement["client" + e] : 9 === i.nodeType ? (a = i.documentElement, Math.max(i.body["scroll" + e], a["scroll" + e], i.body["offset" + e], a["offset" + e], a["client" + e])) : s === t ? W.css(i, n, s, r) : W.style(i, n, s, r)
                }, i, o ? s : t, o, null)
            }
        })
    }), e.jQuery = e.$ = W, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return W
    })
}(window);
var w, h, multiplier, destW, destH, portraitMode = !0,
    mobilePortraitWidth = 480,
    mobilePortraitHeight = 640,
    mobileLandscapeWidth = 640,
    mobileLandscapeHeight = 480,
    mobileWidth = portraitMode ? mobilePortraitWidth : mobileLandscapeWidth,
    mobileHeight = portraitMode ? mobilePortraitHeight : mobileLandscapeHeight,
    desktopWidth = 640,
    desktopHeight = 640,
    dynamicClickableEntityDivs = {},
    coreDivsToResize = ["game", "play", "orientate"],
    advancedDivsToResize = {
        MobileAdInGamePreroll: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll2: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd2: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        },
        MobileAdInGamePreroll3: {
            "box-width": _SETTINGS.Ad.Mobile.Preroll.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.Preroll.Height + 20
        },
        MobileAdInGameEnd3: {
            "box-width": _SETTINGS.Ad.Mobile.End.Width + 2,
            "box-height": _SETTINGS.Ad.Mobile.End.Height + 20
        }
    };

function adjustLayers(e) {
    for (i = 0; i < coreDivsToResize.length; i++) ig.ua.mobile ? ($("#" + coreDivsToResize[i]).width(w), $("#" + coreDivsToResize[i]).height(h)) : ($("#" + coreDivsToResize[i]).width(destW), $("#" + coreDivsToResize[i]).height(destH), $("#" + coreDivsToResize[i]).css("left", e ? 0 : w / 2 - destW / 2));
    for (key in advancedDivsToResize) try {
        $("#" + key).width(w), $("#" + key).height(h), $("#" + key + "-Box").css("left", (w - advancedDivsToResize[key]["box-width"]) / 2), $("#" + key + "-Box").css("top", (h - advancedDivsToResize[key]["box-height"]) / 2)
    } catch (e) {
        console.log(e)
    }
    $("#ajaxbar").width(w), $("#ajaxbar").height(h)
}
var minHeight = 99999999;

function sizeHandler() {
    if ($("#game")) {
        w = window.innerWidth, h = window.innerHeight, ig.ua.mobile ? (multiplier = Math.min(h / mobileHeight, w / mobileWidth), destW = mobileWidth * multiplier, destH = mobileHeight * multiplier) : (multiplier = Math.min(h / desktopHeight, w / desktopWidth), destW = desktopWidth * multiplier, destH = desktopHeight * multiplier), widthRatio = window.innerWidth / mobileWidth, heightRatio = window.innerHeight / mobileHeight, adjustLayers(), window.scrollTo(0, 1), ig.ua.mobile || $("#tempdiv").hide();
        for (var e = navigator.userAgent.split(" "), t = null, i = 0; i < e.length; i++) "Version/" == e[i].substr(0, 8) && (t = e[i]);
        e = window.chrome, -1 < navigator.userAgent.indexOf("Chrome") && null == t ? ig.ua.mobile && null != e && $(window) && ((t = document.getElementById("scrollDown")).src = "media/graphics/orientate/scroll_down.png", t.style.height = "40%", t.style.width = "20%", t.style.backgroundColor = "rgba(11,156,49,0.4)", 0 == window.orientation && $("#scrollDown").hide(), 90 == Math.abs(window.orientation) && ((t = document.body.offsetHeight) < minHeight && (minHeight = t), t = portraitMode ? document.getElementById("orientate") : document.getElementById("game"), e = document.getElementById("tempdiv"), t = t.clientHeight + e.clientHeight, console.log(t + "," + minHeight), t > minHeight ? $("#scrollDown").hide() : $("#scrollDown").show()), $(window).on("orientationchange", function() {
            0 == window.orientation && $("#scrollDown").hide(), Math.abs(window.orientation), $("#scrollDown").show(), 0 == window.orientation && $("#scrollDown").hide()
        }), window.addEventListener("resize", function() {
            if (0 == window.orientation && $("#scrollDown").hide(), 90 == Math.abs(window.orientation)) {
                var e = portraitMode ? document.getElementById("orientate") : document.getElementById("game"),
                    t = document.getElementById("tempdiv");
                e.clientHeight + t.clientHeight > minHeight ? $("#scrollDown").hide() : $("#scrollDown").show()
            }
        })) : ($("#scrollDown").hide(), $("#tempdiv").hide())
    }
}

function orientationHandler() {
    console.log("changing orientation ..."), ig.ua.mobile && ((portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth) ? ($("#orientate").show(), $("#game").hide()) : ($("#orientate").hide(), $("#game").show())), sizeHandler()
}

function fixSamsungHandler() {
    ig.ua.android && !(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && !(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox")) && (document.addEventListener("touchstart", function(e) {
        return e.preventDefault(), !1
    }, !1), document.addEventListener("touchmove", function(e) {
        return e.preventDefault(), !1
    }, !1), document.addEventListener("touchend", function(e) {
        return e.preventDefault(), !1
    }, !1))
}

function getInternetExplorerVersion() {
    var e = -1;
    return "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (e = parseFloat(RegExp.$1)), e
}
window.addEventListener("resize", function() {
    orientationHandler()
}, !1), window.addEventListener("orientationchange", function() {
    orientationHandler()
}, !1), document.ontouchmove = function() {
    window.scrollTo(0, 1)
};
var ie = getInternetExplorerVersion();

function getQueryVariable(e) {
    for (var t = window.location.search.substring(1).split("&"), i = 0; i < t.length; i++) {
        var n = t[i].split("=");
        if (decodeURIComponent(n[0]) == e) return decodeURIComponent(n[1])
    }
}
if (this.jukebox = {}, jukebox.Player = function(e, t) {
        for (var i in this.id = ++jukebox.__jukeboxId, this.origin = t || null, this.settings = {}, this.defaults) this.settings[i] = this.defaults[i];
        if ("[object Object]" === Object.prototype.toString.call(e))
            for (var n in e) this.settings[n] = e[n];
        if ("[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager), this.resource = this.isPlaying = null, this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) : this.settings.resources[0] || null, null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
        return this.__init(), this
    }, jukebox.__jukeboxId = 0, jukebox.Player.prototype = {
        defaults: {
            resources: [],
            autoplay: !1,
            spritemap: {},
            flashMediaElement: "./swf/FlashMediaElement.swf",
            timeout: 1e3
        },
        __addToManager: function() {
            !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
        },
        __init: function() {
            var e, t = this,
                i = this.settings,
                n = {};
            if (jukebox.Manager && void 0 !== jukebox.Manager.features && (n = jukebox.Manager.features), !0 === n.html5audio) {
                if (this.context = new Audio, this.context.src = this.resource, null === this.origin) {
                    var s = function(e) {
                        t.__addToManager(e)
                    };
                    this.context.addEventListener("canplaythrough", s, !0), window.setTimeout(function() {
                        t.context.removeEventListener("canplaythrough", s, !0), s("timeout")
                    }, i.timeout)
                }
                for (e in this.context.autobuffer = !0, this.context.preload = !0, this.HTML5API) this[e] = this.HTML5API[e];
                1 < n.channels ? !0 === i.autoplay ? this.context.autoplay = !0 : void 0 !== i.spritemap[i.autoplay] && this.play(i.autoplay) : 1 === n.channels && void 0 !== i.spritemap[i.autoplay] && (this.backgroundMusic = i.spritemap[i.autoplay], this.backgroundMusic.started = Date.now ? Date.now() : +new Date, this.play(i.autoplay)), 1 == n.channels && !0 !== i.canPlayBackground && (window.addEventListener("pagehide", function() {
                    null !== t.isPlaying && (t.pause(), t.__wasAutoPaused = !0)
                }), window.addEventListener("pageshow", function() {
                    t.__wasAutoPaused && (t.resume(), delete t._wasAutoPaused)
                }))
            } else {
                if (!0 !== n.flashaudio) throw "Your Browser does not support Flash Audio or HTML5 Audio.";
                for (e in this.FLASHAPI) this[e] = this.FLASHAPI[e];
                n = ["id=jukebox-flashstream-" + this.id, "autoplay=" + i.autoplay, "file=" + window.encodeURIComponent(this.resource)], this.__initFlashContext(n), !0 === i.autoplay ? this.play(0) : i.spritemap[i.autoplay] && this.play(i.autoplay)
            }
        },
        __initFlashContext: function(e) {
            var t, i, n = this.settings.flashMediaElement,
                s = {
                    flashvars: e.join("&"),
                    quality: "high",
                    bgcolor: "#000000",
                    wmode: "transparent",
                    allowscriptaccess: "always",
                    allowfullscreen: "true"
                };
            if (navigator.userAgent.match(/MSIE/)) {
                t = document.createElement("div"), document.getElementsByTagName("body")[0].appendChild(t);
                var a = document.createElement("object");
                for (i in a.id = "jukebox-flashstream-" + this.id, a.setAttribute("type", "application/x-shockwave-flash"), a.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"), a.setAttribute("width", "0"), a.setAttribute("height", "0"), s.movie = n + "?x=" + (Date.now ? Date.now() : +new Date), s.flashvars = e.join("&amp;"), s)(e = document.createElement("param")).setAttribute("name", i), e.setAttribute("value", s[i]), a.appendChild(e);
                t.outerHTML = a.outerHTML, this.context = document.getElementById("jukebox-flashstream-" + this.id)
            } else {
                for (i in (t = document.createElement("embed")).id = "jukebox-flashstream-" + this.id, t.setAttribute("type", "application/x-shockwave-flash"), t.setAttribute("width", "100"), t.setAttribute("height", "100"), s.play = !1, s.loop = !1, s.src = n + "?x=" + (Date.now ? Date.now() : +new Date), s) t.setAttribute(i, s[i]);
                document.getElementsByTagName("body")[0].appendChild(t), this.context = t
            }
        },
        backgroundHackForiOS: function() {
            if (void 0 !== this.backgroundMusic) {
                var e = Date.now ? Date.now() : +new Date;
                void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started = e, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (e - this.backgroundMusic.started) / 1e3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
            }
        },
        play: function(e, t) {
            if (null !== this.isPlaying && !0 !== t) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(e, this.id);
            else {
                var i, n = this.settings.spritemap;
                if (void 0 !== n[e]) i = n[e].start;
                else if ("number" == typeof e)
                    for (var s in i = e, n)
                        if (i >= n[s].start && i <= n[s].end) {
                            e = s;
                            break
                        } void 0 !== i && "[object Object]" === Object.prototype.toString.call(n[e]) && (this.isPlaying = this.settings.spritemap[e], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(i))
            }
        },
        stop: function() {
            return this.__lastPosition = 0, this.isPlaying = null, this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause(), !0
        },
        pause: function() {
            return this.isPlaying = null, this.__lastPosition = this.getCurrentTime(), this.context.pause(), this.__lastPosition
        },
        resume: function(e) {
            return null !== (e = "number" == typeof e ? e : this.__lastPosition) ? (this.play(e), this.__lastPosition = null, !0) : (this.context.play(), !1)
        },
        HTML5API: {
            getVolume: function() {
                return this.context.volume || 1
            },
            setVolume: function(e) {
                return this.context.volume = e, 1e-4 > Math.abs(this.context.volume - e)
            },
            getCurrentTime: function() {
                return this.context.currentTime || 0
            },
            setCurrentTime: function(e) {
                try {
                    return this.context.currentTime = e, !0
                } catch (e) {
                    return !1
                }
            }
        },
        FLASHAPI: {
            getVolume: function() {
                return this.context && "function" == typeof this.context.getVolume ? this.context.getVolume() : 1
            },
            setVolume: function(e) {
                return !(!this.context || "function" != typeof this.context.setVolume || (this.context.setVolume(e), 0))
            },
            getCurrentTime: function() {
                return this.context && "function" == typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
            },
            setCurrentTime: function(e) {
                return !(!this.context || "function" != typeof this.context.setCurrentTime) && this.context.setCurrentTime(e)
            }
        }
    }, void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(e) {
        for (var t in this.features = {}, this.codecs = {}, this.__players = {}, this.__playersLength = 0, this.__clones = {}, this.__queue = [], this.settings = {}, this.defaults) this.settings[t] = this.defaults[t];
        if ("[object Object]" === Object.prototype.toString.call(e))
            for (var i in e) this.settings[i] = e[i];
        this.__detectFeatures(), jukebox.Manager.__initialized = !1 !== this.settings.useGameLoop || window.setInterval(function() {
            jukebox.Manager.loop()
        }, 20)
    }, jukebox.Manager.prototype = {
        defaults: {
            useFlash: !1,
            useGameLoop: !1
        },
        __detectFeatures: function() {
            var e = window.Audio && new Audio;
            if (e && e.canPlayType && !1 === this.settings.useFlash) {
                for (var t, i, n = [{
                        e: "3gp",
                        m: ["audio/3gpp", "audio/amr"]
                    }, {
                        e: "aac",
                        m: ["audio/aac", "audio/aacp"]
                    }, {
                        e: "amr",
                        m: ["audio/amr", "audio/3gpp"]
                    }, {
                        e: "caf",
                        m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
                    }, {
                        e: "m4a",
                        m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
                    }, {
                        e: "mp3",
                        m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
                    }, {
                        e: "mpga",
                        m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
                    }, {
                        e: "mp4",
                        m: ["audio/mp4", "video/mp4"]
                    }, {
                        e: "ogg",
                        m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
                    }, {
                        e: "wav",
                        m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
                    }, {
                        e: "webm",
                        m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
                    }], s = 0, a = n.length; s < a; s++)
                    if (i = n[s].e, n[s].m.length && "object" == typeof n[s].m)
                        for (var o = 0, r = n[s].m.length; o < r; o++) {
                            if (t = n[s].m[o], "" !== e.canPlayType(t)) {
                                this.codecs[i] = t;
                                break
                            }
                            this.codecs[i] || (this.codecs[i] = !1)
                        }
                this.features.html5audio = !!(this.codecs.mp3 || this.codecs.ogg || this.codecs.webm || this.codecs.wav), this.features.channels = 8, e.volume = .1337, this.features.volume = !!(1e-4 > Math.abs(e.volume - .1337)), navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
            }
            if (this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1, window.ActiveXObject) try {
                new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
            } catch (e) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0), !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr", this.features.volume = !0, this.features.channels = 1)
        },
        __getPlayerById: function(e) {
            return this.__players && void 0 !== this.__players[e] ? this.__players[e] : null
        },
        __getClone: function(e, t) {
            for (var i in this.__clones) {
                var n = this.__clones[i];
                if (null === n.isPlaying && n.origin === e) return n
            }
            if ("[object Object]" === Object.prototype.toString.call(t)) {
                for (var s in i = {}, t) i[s] = t[s];
                return i.autoplay = !1, (s = new jukebox.Player(i, e)).isClone = !0, s.wasReady = !1, this.__clones[s.id] = s
            }
            return null
        },
        loop: function() {
            if (0 !== this.__playersLength)
                if (this.__queue.length && this.__playersLength < this.features.channels) {
                    var e = this.__queue[0],
                        t = this.__getPlayerById(e.origin);
                    if (null !== t) {
                        var i = this.__getClone(e.origin, t.settings);
                        null !== i && (!0 === this.features.volume && (t = this.__players[e.origin]) && i.setVolume(t.getVolume()), this.add(i), i.play(e.pointer, !0))
                    }
                    this.__queue.splice(0, 1)
                } else
                    for (i in this.__queue.length && 1 === this.features.channels && (e = this.__queue[0], null !== (t = this.__getPlayerById(e.origin)) && t.play(e.pointer, !0), this.__queue.splice(0, 1)), this.__players) t = (e = this.__players[i]).getCurrentTime() || 0, e.isPlaying && !1 === e.wasReady ? e.wasReady = e.setCurrentTime(e.isPlaying.start) : e.isPlaying && !0 === e.wasReady ? t > e.isPlaying.end && (!0 === e.isPlaying.loop ? e.play(e.isPlaying.start, !0) : e.stop()) : e.isClone && null === e.isPlaying ? this.remove(e) : void 0 !== e.backgroundMusic && null === e.isPlaying && t > e.backgroundMusic.end && e.backgroundHackForiOS()
        },
        getPlayableResource: function(e) {
            "[object Array]" !== Object.prototype.toString.call(e) && (e = [e]);
            for (var t = 0, i = e.length; t < i; t++) {
                var n = e[t],
                    s = n.match(/\.([^\.]*)$/)[1];
                if (s && this.codecs[s]) return n
            }
            return null
        },
        add: function(e) {
            return e instanceof jukebox.Player && void 0 === this.__players[e.id] && (this.__playersLength++, this.__players[e.id] = e, !0)
        },
        remove: function(e) {
            return e instanceof jukebox.Player && void 0 !== this.__players[e.id] && (this.__playersLength--, delete this.__players[e.id], !0)
        },
        addToQueue: function(e, t) {
            return ("string" == typeof e || "number" == typeof e) && void 0 !== this.__players[t] && (this.__queue.push({
                pointer: e,
                origin: t
            }), !0)
        }
    },
    function() {
        var e = {},
            t = null,
            i = !0,
            n = !1;
        if ("undefined" != typeof AudioContext) t = new AudioContext;
        else if ("undefined" != typeof webkitAudioContext) t = new webkitAudioContext;
        else if ("undefined" != typeof Audio) {
            i = !1;
            try {
                new Audio
            } catch (e) {
                n = !0
            }
        } else i = !1, n = !0;
        if (i) {
            var s = void 0 === t.createGain ? t.createGainNode() : t.createGain();
            s.gain.value = 1, s.connect(t.destination)
        }(o = function() {
            this._volume = 1, this._muted = !1, this.usingWebAudio = i, this.noAudio = n, this._howls = []
        }).prototype = {
            volume: function(e) {
                if (0 <= (e = parseFloat(e)) && 1 >= e) {
                    for (var t in this._volume = e, i && (s.gain.value = e), this._howls)
                        if (this._howls.hasOwnProperty(t) && !1 === this._howls[t]._webAudio)
                            for (e = 0; e < this._howls[t]._audioNode.length; e++) this._howls[t]._audioNode[e].volume = this._howls[t]._volume * this._volume;
                    return this
                }
                return i ? s.gain.value : this._volume
            },
            mute: function() {
                return this._setMuted(!0), this
            },
            unmute: function() {
                return this._setMuted(!1), this
            },
            _setMuted: function(e) {
                for (var t in this._muted = e, i && (s.gain.value = e ? 0 : this._volume), this._howls)
                    if (this._howls.hasOwnProperty(t) && !1 === this._howls[t]._webAudio)
                        for (var n = 0; n < this._howls[t]._audioNode.length; n++) this._howls[t]._audioNode[n].muted = e
            }
        };
        var a = new o,
            o = null;
        if (!n) var r = {
            mp3: !!(o = new Audio).canPlayType("audio/mpeg;").replace(/^no$/, ""),
            opus: !!o.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
            ogg: !!o.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
            wav: !!o.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
            m4a: !!(o.canPlayType("audio/x-m4a;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""),
            mp4: !!(o.canPlayType("audio/x-mp4;") || o.canPlayType("audio/aac;")).replace(/^no$/, ""),
            weba: !!o.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
        };
        var h = function(e) {
            this._autoplay = e.autoplay || !1, this._buffer = e.buffer || !1, this._duration = e.duration || 0, this._format = e.format || null, this._loop = e.loop || !1, this._loaded = !1, this._sprite = e.sprite || {}, this._src = e.src || "", this._pos3d = e.pos3d || [0, 0, -.5], this._volume = void 0 !== e.volume ? e.volume : 1, this._urls = e.urls || [], this._rate = e.rate || 1, this._onload = [e.onload || function() {}], this._onloaderror = [e.onloaderror || function() {}], this._onend = [e.onend || function() {}], this._onpause = [e.onpause || function() {}], this._onplay = [e.onplay || function() {}], this._onendTimer = [], this._webAudio = i && !this._buffer, this._audioNode = [], this._webAudio && this._setupAudioNode(), a._howls.push(this), this.load()
        };
        if (h.prototype = {
                load: function() {
                    var i = this,
                        s = null;
                    if (!n) {
                        for (var o = 0; o < i._urls.length; o++) {
                            var h, u;
                            if (i._format) h = i._format;
                            else {
                                if (!(h = (h = (u = i._urls[o].toLowerCase().split("?")[0]).match(/.+\.([^?]+)(\?|$)/)) && 2 <= h.length ? h : u.match(/data\:audio\/([^?]+);/))) return void i.on("loaderror");
                                h = h[1]
                            }
                            if (r[h]) {
                                s = i._urls[o];
                                break
                            }
                        }
                        if (s) {
                            if (i._src = s, i._webAudio) {
                                var c = s;
                                if (c in e) i._duration = e[c].duration, l(i);
                                else {
                                    var d = new XMLHttpRequest;
                                    d.open("GET", c, !0), d.responseType = "arraybuffer", d.onload = function() {
                                        t.decodeAudioData(d.response, function(t) {
                                            t && (e[c] = t, l(i, t))
                                        }, function() {
                                            i.on("loaderror")
                                        })
                                    }, d.onerror = function() {
                                        i._webAudio && (i._buffer = !0, i._webAudio = !1, i._audioNode = [], delete i._gainNode, i.load())
                                    };
                                    try {
                                        d.send()
                                    } catch (e) {
                                        d.onerror()
                                    }
                                }
                            } else {
                                var g = new Audio;
                                i._audioNode.push(g), g.src = s, g._pos = 0, g.preload = "auto", g.volume = a._muted ? 0 : i._volume * a.volume(), e[s] = i;
                                var m = function() {
                                    i._duration = Math.ceil(10 * g.duration) / 10, 0 === Object.getOwnPropertyNames(i._sprite).length && (i._sprite = {
                                        _default: [0, 1e3 * i._duration]
                                    }), i._loaded || (i._loaded = !0, i.on("load")), i._autoplay && i.play(), g.removeEventListener("canplaythrough", m, !1)
                                };
                                g.addEventListener("canplaythrough", m, !1), g.load()
                            }
                            return i
                        }
                    }
                    i.on("loaderror")
                },
                urls: function(e) {
                    return e ? (this.stop(), this._urls = "string" == typeof e ? [e] : e, this._loaded = !1, this.load(), this) : this._urls
                },
                play: function(i, n) {
                    var s = this;
                    return "function" == typeof i && (n = i), i && "function" != typeof i || (i = "_default"), s._loaded ? s._sprite[i] ? (s._inactiveNode(function(o) {
                        o._sprite = i;
                        var r, h = 0 < o._pos ? o._pos : s._sprite[i][0] / 1e3,
                            l = s._sprite[i][1] / 1e3 - o._pos,
                            u = !(!s._loop && !s._sprite[i][2]),
                            c = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "",
                            d = {
                                id: c,
                                sprite: i,
                                loop: u
                            };
                        if (r = setTimeout(function() {
                                !s._webAudio && u && s.stop(d.id, d.timer).play(i, d.id), s._webAudio && !u && (s._nodeById(d.id).paused = !0, s._nodeById(d.id)._pos = 0), !s._webAudio && !u && s.stop(d.id, d.timer), s.on("end", c)
                            }, 1e3 * l), s._onendTimer.push(r), d.timer = s._onendTimer[s._onendTimer.length - 1], s._webAudio) {
                            r = s._sprite[i][0] / 1e3;
                            var g = s._sprite[i][1] / 1e3;
                            o.id = c, o.paused = !1, r = [u, r, g], (g = s._nodeById(c)).bufferSource = t.createBufferSource(), g.bufferSource.buffer = e[s._src], g.bufferSource.connect(g.panner), g.bufferSource.loop = r[0], r[0] && (g.bufferSource.loopStart = r[1], g.bufferSource.loopEnd = r[1] + r[2]), g.bufferSource.playbackRate.value = s._rate, s._playStart = t.currentTime, o.gain.value = s._volume, void 0 === o.bufferSource.start ? o.bufferSource.noteGrainOn(0, h, l) : o.bufferSource.start(0, h, l)
                        } else {
                            if (4 !== o.readyState) {
                                s._clearEndTimer(r);
                                var m = i,
                                    p = n,
                                    f = function() {
                                        s.play(m, p), o.removeEventListener("canplaythrough", f, !1)
                                    };
                                return o.addEventListener("canplaythrough", f, !1), s
                            }
                            o.id = c, o.currentTime = h, o.muted = a._muted, o.volume = s._volume * a.volume(), setTimeout(function() {
                                o.play()
                            }, 0)
                        }
                        return s.on("play"), "function" == typeof n && n(c), s
                    }), s) : ("function" == typeof n && n(), s) : (s.on("load", function() {
                        s.play(i, n)
                    }), s)
                },
                pause: function(e, t) {
                    var i = this;
                    if (!i._loaded) return i.on("play", function() {
                        i.pause(e)
                    }), i;
                    i._clearEndTimer(t || 0);
                    var n = e ? i._nodeById(e) : i._activeNode();
                    if (n)
                        if (n._pos = i.pos(null, e), i._webAudio) {
                            if (!n.bufferSource || n.paused) return i;
                            n.paused = !0, void 0 === n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                        } else n.pause();
                    return i.on("pause"), i
                },
                stop: function(e, t) {
                    var i = this;
                    if (!i._loaded) return i.on("play", function() {
                        i.stop(e)
                    }), i;
                    i._clearEndTimer(t || 0);
                    var n = e ? i._nodeById(e) : i._activeNode();
                    if (n)
                        if (n._pos = 0, i._webAudio) {
                            if (!n.bufferSource || n.paused) return i;
                            n.paused = !0, void 0 === n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0)
                        } else n.pause(), n.currentTime = 0;
                    return i
                },
                mute: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.mute(e)
                    }), t;
                    var i = e ? t._nodeById(e) : t._activeNode();
                    return i && (t._webAudio ? i.gain.value = 0 : i.volume = 0), t
                },
                unmute: function(e) {
                    var t = this;
                    if (!t._loaded) return t.on("play", function() {
                        t.unmute(e)
                    }), t;
                    var i = e ? t._nodeById(e) : t._activeNode();
                    return i && (t._webAudio ? i.gain.value = t._volume : i.volume = t._volume), t
                },
                volume: function(e, t) {
                    var i = this;
                    if (0 <= (e = parseFloat(e)) && 1 >= e) {
                        if (i._volume = e, !i._loaded) return i.on("play", function() {
                            i.volume(e, t)
                        }), i;
                        var n = t ? i._nodeById(t) : i._activeNode();
                        return n && (i._webAudio ? n.gain.value = e : n.volume = e * a.volume()), i
                    }
                    return i._volume
                },
                loop: function(e) {
                    return "boolean" == typeof e ? (this._loop = e, this) : this._loop
                },
                sprite: function(e) {
                    return "object" == typeof e ? (this._sprite = e, this) : this._sprite
                },
                pos: function(e, i) {
                    var n = this;
                    if (!n._loaded) return n.on("load", function() {
                        n.pos(e)
                    }), "number" == typeof e ? n : n._pos || 0;
                    e = parseFloat(e);
                    var s = i ? n._nodeById(i) : n._activeNode();
                    if (s) return 0 <= e ? (n.pause(i), s._pos = e, n.play(s._sprite, i), n) : n._webAudio ? s._pos + (t.currentTime - n._playStart) : s.currentTime;
                    if (0 <= e) return n;
                    for (s = 0; s < n._audioNode.length; s++)
                        if (n._audioNode[s].paused && 4 === n._audioNode[s].readyState) return n._webAudio ? n._audioNode[s]._pos : n._audioNode[s].currentTime
                },
                pos3d: function(e, t, i, n) {
                    var s = this;
                    if (t = void 0 !== t && t ? t : 0, i = void 0 !== i && i ? i : -.5, !s._loaded) return s.on("play", function() {
                        s.pos3d(e, t, i, n)
                    }), s;
                    if (!(0 <= e || 0 > e)) return s._pos3d;
                    if (s._webAudio) {
                        var a = n ? s._nodeById(n) : s._activeNode();
                        a && (s._pos3d = [e, t, i], a.panner.setPosition(e, t, i))
                    }
                    return s
                },
                fade: function(e, t, i, n, s) {
                    var a = this,
                        o = Math.abs(e - t),
                        r = e > t ? "down" : "up",
                        h = i / (o /= .01);
                    if (!a._loaded) return a.on("load", function() {
                        a.fade(e, t, i, n, s)
                    }), a;
                    a.volume(e, s);
                    for (var l = 1; l <= o; l++) ! function() {
                        var e = Math.round(1e3 * (a._volume + ("up" === r ? .01 : -.01) * l)) / 1e3;
                        setTimeout(function() {
                            a.volume(e, s), e === t && n && n()
                        }, h * l)
                    }()
                },
                fadeIn: function(e, t, i) {
                    return this.volume(0).play().fade(0, e, t, i)
                },
                fadeOut: function(e, t, i, n) {
                    var s = this;
                    return s.fade(s._volume, e, t, function() {
                        i && i(), s.pause(n), s.on("end")
                    }, n)
                },
                _nodeById: function(e) {
                    for (var t = this._audioNode[0], i = 0; i < this._audioNode.length; i++)
                        if (this._audioNode[i].id === e) {
                            t = this._audioNode[i];
                            break
                        } return t
                },
                _activeNode: function() {
                    for (var e = null, t = 0; t < this._audioNode.length; t++)
                        if (!this._audioNode[t].paused) {
                            e = this._audioNode[t];
                            break
                        } return this._drainPool(), e
                },
                _inactiveNode: function(e) {
                    for (var t = null, i = 0; i < this._audioNode.length; i++)
                        if (this._audioNode[i].paused && 4 === this._audioNode[i].readyState) {
                            e(this._audioNode[i]), t = !0;
                            break
                        } var n;
                    this._drainPool(), t || (this._webAudio ? (n = this._setupAudioNode(), e(n)) : (this.load(), (n = this._audioNode[this._audioNode.length - 1]).addEventListener("loadedmetadata", function() {
                        e(n)
                    })))
                },
                _drainPool: function() {
                    var e, t = 0;
                    for (e = 0; e < this._audioNode.length; e++) this._audioNode[e].paused && t++;
                    for (e = this._audioNode.length - 1; 0 <= e && !(5 >= t); e--) this._audioNode[e].paused && (this._webAudio && this._audioNode[e].disconnect(0), t--, this._audioNode.splice(e, 1))
                },
                _clearEndTimer: function(e) {
                    e = 0 <= (e = this._onendTimer.indexOf(e)) ? e : 0, this._onendTimer[e] && (clearTimeout(this._onendTimer[e]), this._onendTimer.splice(e, 1))
                },
                _setupAudioNode: function() {
                    var e = this._audioNode,
                        i = this._audioNode.length;
                    return e[i] = void 0 === t.createGain ? t.createGainNode() : t.createGain(), e[i].gain.value = this._volume, e[i].paused = !0, e[i]._pos = 0, e[i].readyState = 4, e[i].connect(s), e[i].panner = t.createPanner(), e[i].panner.setPosition(this._pos3d[0], this._pos3d[1], this._pos3d[2]), e[i].panner.connect(e[i]), e[i]
                },
                on: function(e, t) {
                    var i = this["_on" + e];
                    if ("function" == typeof t) i.push(t);
                    else
                        for (var n = 0; n < i.length; n++) t ? i[n].call(this, t) : i[n].call(this);
                    return this
                },
                off: function(e, t) {
                    for (var i = this["_on" + e], n = t.toString(), s = 0; s < i.length; s++)
                        if (n === i[s].toString()) {
                            i.splice(s, 1);
                            break
                        } return this
                },
                unload: function() {
                    for (var t = this._audioNode, i = 0; i < this._audioNode.length; i++) t[i].paused || this.stop(t[i].id), this._webAudio ? t[i].disconnect(0) : t[i].src = "";
                    null !== (t = a._howls.indexOf(this)) && 0 <= t && a._howls.splice(t, 1), delete e[this._src]
                }
            }, i) var l = function(e, t) {
            e._duration = t ? t.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = {
                _default: [0, 1e3 * e._duration]
            }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play()
        };
        "function" == typeof define && define.amd && define(function() {
            return {
                Howler: a,
                Howl: h
            }
        }), "undefined" != typeof exports && (exports.Howler = a, exports.Howl = h), window.Howler = a, window.Howl = h
    }(),
    function(e) {
        Number.prototype.map = function(e, t, i, n) {
            return i + (this - e) / (t - e) * (n - i)
        }, Number.prototype.limit = function(e, t) {
            return Math.min(t, Math.max(e, this))
        }, Number.prototype.round = function(e) {
            return e = Math.pow(10, e || 0), Math.round(this * e) / e
        }, Number.prototype.floor = function() {
            return Math.floor(this)
        }, Number.prototype.ceil = function() {
            return Math.ceil(this)
        }, Number.prototype.toInt = function() {
            return 0 | this
        }, Number.prototype.toRad = function() {
            return this / 180 * Math.PI
        }, Number.prototype.toDeg = function() {
            return 180 * this / Math.PI
        }, Array.prototype.erase = function(e) {
            for (var t = this.length; t--;) this[t] === e && this.splice(t, 1);
            return this
        }, Array.prototype.random = function() {
            return this[Math.floor(Math.random() * this.length)]
        }, Function.prototype.bind = Function.prototype.bind || function(e) {
            var t = this;
            return function() {
                var i = Array.prototype.slice.call(arguments);
                return t.apply(e || null, i)
            }
        }, e.ig = {
            game: null,
            debug: null,
            version: "1.20",
            global: e,
            modules: {},
            resources: [],
            ready: !1,
            baked: !1,
            nocache: "",
            ua: {},
            prefix: e.ImpactPrefix || "",
            lib: "lib/",
            _current: null,
            _loadQueue: [],
            _waitForOnload: 0,
            $: function(e) {
                return "#" == e.charAt(0) ? document.getElementById(e.substr(1)) : document.getElementsByTagName(e)
            },
            $new: function(e) {
                return document.createElement(e)
            },
            copy: function(e) {
                if (!e || "object" != typeof e || e instanceof HTMLElement || e instanceof ig.Class) return e;
                if (e instanceof Array)
                    for (var t = [], i = 0, n = e.length; i < n; i++) t[i] = ig.copy(e[i]);
                else
                    for (i in t = {}, e) t[i] = ig.copy(e[i]);
                return t
            },
            merge: function(e, t) {
                for (var i in t) {
                    var n = t[i];
                    "object" != typeof n || n instanceof HTMLElement || n instanceof ig.Class ? e[i] = n : (e[i] && "object" == typeof e[i] || (e[i] = n instanceof Array ? [] : {}), ig.merge(e[i], n))
                }
                return e
            },
            ksort: function(e) {
                if (!e || "object" != typeof e) return [];
                var t, i = [],
                    n = [];
                for (t in e) i.push(t);
                for (i.sort(), t = 0; t < i.length; t++) n.push(e[i[t]]);
                return n
            },
            setVendorAttribute: function(e, t, i) {
                var n = t.charAt(0).toUpperCase() + t.substr(1);
                e[t] = e["ms" + n] = e["moz" + n] = e["webkit" + n] = e["o" + n] = i
            },
            getVendorAttribute: function(e, t) {
                var i = t.charAt(0).toUpperCase() + t.substr(1);
                return e[t] || e["ms" + i] || e["moz" + i] || e["webkit" + i] || e["o" + i]
            },
            normalizeVendorAttribute: function(e, t) {
                var i = ig.getVendorAttribute(e, t);
                !e[t] && i && (e[t] = i)
            },
            getImagePixels: function(e, t, i, n, s) {
                var a = ig.$new("canvas");
                a.width = e.width, a.height = e.height;
                var o = a.getContext("2d");
                ig.System.SCALE.CRISP(a, o);
                var r = ig.getVendorAttribute(o, "backingStorePixelRatio") || 1;
                ig.normalizeVendorAttribute(o, "getImageDataHD");
                var h = e.width / r,
                    l = e.height / r;
                return a.width = Math.ceil(h), a.height = Math.ceil(l), o.drawImage(e, 0, 0, h, l), 1 === r ? o.getImageData(t, i, n, s) : o.getImageDataHD(t, i, n, s)
            },
            module: function(e) {
                if (ig._current) throw "Module '" + ig._current.name + "' defines nothing";
                if (ig.modules[e] && ig.modules[e].body) throw "Module '" + e + "' is already defined";
                return ig._current = {
                    name: e,
                    requires: [],
                    loaded: !1,
                    body: null
                }, ig.modules[e] = ig._current, ig._loadQueue.push(ig._current), ig
            },
            requires: function() {
                return ig._current.requires = Array.prototype.slice.call(arguments), ig
            },
            defines: function(e) {
                ig._current.body = e, ig._current = null, ig._initDOMReady()
            },
            addResource: function(e) {
                ig.resources.push(e)
            },
            setNocache: function(e) {
                ig.nocache = e ? "?" + Date.now() : ""
            },
            log: function() {},
            assert: function() {},
            show: function() {},
            mark: function() {},
            _loadScript: function(e, t) {
                ig.modules[e] = {
                    name: e,
                    requires: [],
                    loaded: !1,
                    body: null
                }, ig._waitForOnload++;
                var i = ig.prefix + ig.lib + e.replace(/\./g, "/") + ".js" + ig.nocache,
                    n = ig.$new("script");
                n.type = "text/javascript", n.src = i, n.onload = function() {
                    ig._waitForOnload--, ig._execModules()
                }, n.onerror = function() {
                    throw "Failed to load module " + e + " at " + i + " required from " + t
                }, ig.$("head")[0].appendChild(n)
            },
            _execModules: function() {
                for (var e = !1, t = 0; t < ig._loadQueue.length; t++) {
                    for (var i = ig._loadQueue[t], n = !0, s = 0; s < i.requires.length; s++) {
                        var a = i.requires[s];
                        ig.modules[a] ? ig.modules[a].loaded || (n = !1) : (n = !1, ig._loadScript(a, i.name))
                    }
                    n && i.body && (ig._loadQueue.splice(t, 1), i.loaded = !0, i.body(), e = !0, t--)
                }
                if (e) ig._execModules();
                else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                    for (e = [], t = 0; t < ig._loadQueue.length; t++) {
                        for (n = [], a = ig._loadQueue[t].requires, s = 0; s < a.length; s++)(!(i = ig.modules[a[s]]) || !i.loaded) && n.push(a[s]);
                        e.push(ig._loadQueue[t].name + " (requires: " + n.join(", ") + ")")
                    }
                    throw "Unresolved (circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules:\n" + e.join("\n")
                }
            },
            _DOMReady: function() {
                if (!ig.modules["dom.ready"].loaded) {
                    if (!document.body) return setTimeout(ig._DOMReady, 13);
                    ig.modules["dom.ready"].loaded = !0, ig._waitForOnload--, ig._execModules()
                }
                return 0
            },
            _boot: function() {
                document.location.href.match(/\?nocache/) && ig.setNocache(!0), ig.ua.pixelRatio = e.devicePixelRatio || 1, ig.ua.viewport = {
                    width: e.innerWidth,
                    height: e.innerHeight
                }, ig.ua.screen = {
                    width: e.screen.availWidth * ig.ua.pixelRatio,
                    height: e.screen.availHeight * ig.ua.pixelRatio
                }, ig.ua.iPhone = /iPhone/i.test(navigator.userAgent), ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio, ig.ua.iPad = /iPad/i.test(navigator.userAgent), ig.ua.android = /android/i.test(navigator.userAgent), ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent), ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent), ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad, ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent), ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag, ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]), ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent), ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent), ig.ua.Kindle = /Silk/i.test(navigator.userAgent), ig.ua.touchDevice = "ontouchstart" in e || e.navigator.msMaxTouchPoints, ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent)
            },
            _initDOMReady: function() {
                ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
                    requires: [],
                    loaded: !1,
                    body: null
                }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), e.addEventListener("load", ig._DOMReady, !1)))
            }
        };
        for (var t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !e.requestAnimationFrame; i++) e.requestAnimationFrame = e[t[i] + "RequestAnimationFrame"];
        if (e.requestAnimationFrame) {
            var n = 1,
                s = {};
            e.ig.setAnimation = function(t, i) {
                var a = n++;
                s[a] = !0;
                var o = function() {
                    s[a] && (e.requestAnimationFrame(o, i), t())
                };
                return e.requestAnimationFrame(o, i), a
            }, e.ig.clearAnimation = function(e) {
                delete s[e]
            }
        } else e.ig.setAnimation = function(t) {
            return e.setInterval(t, 1e3 / 60)
        }, e.ig.clearAnimation = function(t) {
            e.clearInterval(t)
        };
        var a = !1,
            o = /xyz/.test(function() {
                xyz
            }) ? /\bparent\b/ : /.*/;
        e.ig.Class = function() {};
        var r = function(e) {
            var t, i = this.prototype,
                n = {};
            for (t in e) "function" == typeof e[t] && "function" == typeof i[t] && o.test(e[t]) ? (n[t] = i[t], i[t] = function(e, t) {
                return function() {
                    var i = this.parent;
                    this.parent = n[e];
                    var s = t.apply(this, arguments);
                    return this.parent = i, s
                }
            }(t, e[t])) : i[t] = e[t]
        };
        e.ig.Class.extend = function(t) {
            function i() {
                if (!a) {
                    if (this.staticInstantiate) {
                        var e = this.staticInstantiate.apply(this, arguments);
                        if (e) return e
                    }
                    for (var t in this) "object" == typeof this[t] && (this[t] = ig.copy(this[t]));
                    this.init && this.init.apply(this, arguments)
                }
                return this
            }
            var n = this.prototype;
            a = !0;
            var s = new this;
            for (var h in a = !1, t) s[h] = "function" == typeof t[h] && "function" == typeof n[h] && o.test(t[h]) ? function(e, t) {
                return function() {
                    var i = this.parent;
                    this.parent = n[e];
                    var s = t.apply(this, arguments);
                    return this.parent = i, s
                }
            }(h, t[h]) : t[h];
            return i.prototype = s, i.constructor = i, i.extend = e.ig.Class.extend, i.inject = r, i
        }
    }(window), ig.baked = !0, ig.module("impact.image").defines(function() {
        ig.Image = ig.Class.extend({
            data: null,
            width: 0,
            height: 0,
            loaded: !1,
            failed: !1,
            loadCallback: null,
            path: "",
            staticInstantiate: function(e) {
                return ig.Image.cache[e] || null
            },
            init: function(e) {
                this.path = e, this.load()
            },
            load: function(e) {
                this.loaded ? e && e(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = e || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this), ig.Image.cache[this.path] = this)
            },
            reload: function() {
                this.loaded = !1, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.src = this.path + "?" + Date.now()
            },
            onload: function() {
                this.width = this.data.width, this.height = this.data.height, this.loaded = !0, 1 != ig.system.scale && this.resize(ig.system.scale), this.loadCallback && this.loadCallback(this.path, !0)
            },
            onerror: function() {
                this.failed = !0, this.loadCallback && this.loadCallback(this.path, !1)
            },
            resize: function(e) {
                var t = this.width * e,
                    i = this.height * e;
                (n = ig.$new("canvas")).width = this.width, n.height = this.height, (n = n.getContext("2d")).drawImage(this.data, 0, 0, this.width, this.height, 0, 0, this.width, this.height);
                var n = n.getImageData(0, 0, this.width, this.height),
                    s = ig.$new("canvas");
                s.width = t, s.height = i;
                for (var a = s.getContext("2d"), o = a.getImageData(0, 0, t, i), r = 0; r < i; r++)
                    for (var h = 0; h < t; h++) {
                        var l = 4 * (Math.floor(r / e) * this.width + Math.floor(h / e)),
                            u = 4 * (r * t + h);
                        o.data[u] = n.data[l], o.data[u + 1] = n.data[l + 1], o.data[u + 2] = n.data[l + 2], o.data[u + 3] = n.data[l + 3]
                    }
                a.putImageData(o, 0, 0), this.data = s
            },
            draw: function(e, t, i, n, s, a) {
                if (this.loaded) {
                    var o = ig.system.scale;
                    s = (s || this.width) * o, a = (a || this.height) * o, ig.system.context.drawImage(this.data, i ? i * o : 0, n ? n * o : 0, s, a, ig.system.getDrawPos(e), ig.system.getDrawPos(t), s, a), ig.Image.drawCount++
                }
            },
            drawTile: function(e, t, i, n, s, a, o) {
                if (s = s || n, this.loaded && !(n > this.width || s > this.height)) {
                    var r = ig.system.scale,
                        h = Math.floor(n * r),
                        l = Math.floor(s * r),
                        u = a ? -1 : 1,
                        c = o ? -1 : 1;
                    (a || o) && (ig.system.context.save(), ig.system.context.scale(u, c)), ig.system.context.drawImage(this.data, Math.floor(i * n) % this.width * r, Math.floor(i * n / this.width) * s * r, h, l, ig.system.getDrawPos(e) * u - (a ? h : 0), ig.system.getDrawPos(t) * c - (o ? l : 0), h, l), (a || o) && ig.system.context.restore(), ig.Image.drawCount++
                }
            }
        }), ig.Image.drawCount = 0, ig.Image.cache = {}, ig.Image.reloadCache = function() {
            for (var e in ig.Image.cache) ig.Image.cache[e].reload()
        }
    }), ig.baked = !0, ig.module("impact.font").requires("impact.image").defines(function() {
        ig.Font = ig.Image.extend({
            widthMap: [],
            indices: [],
            firstChar: 32,
            alpha: 1,
            letterSpacing: 1,
            lineSpacing: 0,
            onload: function(e) {
                this._loadMetrics(this.data), this.parent(e)
            },
            widthForString: function(e) {
                if (-1 !== e.indexOf("\n")) {
                    e = e.split("\n");
                    for (var t = 0, i = 0; i < e.length; i++) t = Math.max(t, this._widthForLine(e[i]));
                    return t
                }
                return this._widthForLine(e)
            },
            _widthForLine: function(e) {
                for (var t = 0, i = 0; i < e.length; i++) t += this.widthMap[e.charCodeAt(i) - this.firstChar] + this.letterSpacing;
                return t
            },
            heightForString: function(e) {
                return e.split("\n").length * (this.height + this.lineSpacing)
            },
            draw: function(e, t, i, n) {
                if ("string" != typeof e && (e = e.toString()), -1 !== e.indexOf("\n")) {
                    e = e.split("\n");
                    for (var s = this.height + this.lineSpacing, a = 0; a < e.length; a++) this.draw(e[a], t, i + a * s, n)
                } else {
                    for (n != ig.Font.ALIGN.RIGHT && n != ig.Font.ALIGN.CENTER || (a = this._widthForLine(e), t -= n == ig.Font.ALIGN.CENTER ? a / 2 : a), 1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha), a = 0; a < e.length; a++) n = e.charCodeAt(a), t += this._drawChar(n - this.firstChar, t, i);
                    1 !== this.alpha && (ig.system.context.globalAlpha = 1), ig.Image.drawCount += e.length
                }
            },
            _drawChar: function(e, t, i) {
                if (!this.loaded || 0 > e || e >= this.indices.length) return 0;
                var n = ig.system.scale,
                    s = this.widthMap[e] * n,
                    a = (this.height - 2) * n;
                return ig.system.context.drawImage(this.data, this.indices[e] * n, 0, s, a, ig.system.getDrawPos(t), ig.system.getDrawPos(i), s, a), this.widthMap[e] + this.letterSpacing
            },
            _loadMetrics: function(e) {
                this.height = e.height - 1, this.widthMap = [], this.indices = [];
                for (var t = ig.getImagePixels(e, 0, e.height - 1, e.width, 1), i = 0, n = 0; n < e.width; n++) {
                    var s = 4 * n + 3;
                    0 != t.data[s] ? i++ : 0 == t.data[s] && i && (this.widthMap.push(i), this.indices.push(n - i), i = 0)
                }
                this.widthMap.push(i), this.indices.push(n - i)
            }
        }), ig.Font.ALIGN = {
            LEFT: 0,
            RIGHT: 1,
            CENTER: 2
        }
    }), ig.baked = !0, ig.module("impact.sound").defines(function() {
        ig.SoundManager = ig.Class.extend({
            clips: {},
            volume: 1,
            format: null,
            init: function() {
                for (var e = new Audio, t = 0; t < ig.Sound.use.length; t++) {
                    var i = ig.Sound.use[t];
                    if (e.canPlayType(i.mime)) {
                        this.format = i;
                        break
                    }
                }
                this.format || (ig.Sound.enabled = !1)
            },
            load: function(e, t, i) {
                var n = ig.prefix + e.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
                if (this.clips[e]) {
                    if (t && this.clips[e].length < ig.Sound.channels)
                        for (t = this.clips[e].length; t < ig.Sound.channels; t++) {
                            var s = new Audio(n);
                            s.load(), this.clips[e].push(s)
                        }
                    return this.clips[e][0]
                }
                var a = new Audio(n);
                if (i && (a.addEventListener("canplaythrough", function t(n) {
                        a.removeEventListener("canplaythrough", t, !1), i(e, !0, n)
                    }, !1), a.addEventListener("error", function(t) {
                        i(e, !0, t)
                    }, !1)), a.preload = "auto", a.load(), this.clips[e] = [a], t)
                    for (t = 1; t < ig.Sound.channels; t++)(s = new Audio(n)).load(), this.clips[e].push(s);
                return a
            },
            get: function(e) {
                e = this.clips[e];
                for (var t, i = 0; t = e[i++];)
                    if (t.paused || t.ended) return t.ended && (t.currentTime = 0), t;
                return e[0].pause(), e[0].currentTime = 0, e[0]
            }
        }), ig.Music = ig.Class.extend({
            tracks: [],
            namedTracks: {},
            currentTrack: null,
            currentIndex: 0,
            random: !1,
            _volume: 1,
            _loop: !1,
            _fadeInterval: 0,
            _fadeTimer: null,
            _endedCallbackBound: null,
            init: function() {
                this._endedCallbackBound = this._endedCallback.bind(this), Object.defineProperty ? (Object.defineProperty(this, "volume", {
                    get: this.getVolume.bind(this),
                    set: this.setVolume.bind(this)
                }), Object.defineProperty(this, "loop", {
                    get: this.getLooping.bind(this),
                    set: this.setLooping.bind(this)
                })) : this.__defineGetter__ && (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
            },
            add: function(e, t) {
                if (ig.Sound.enabled) {
                    var i = ig.soundManager.load(e instanceof ig.Sound ? e.path : e, !1);
                    i.loop = this._loop, i.volume = this._volume, i.addEventListener("ended", this._endedCallbackBound, !1), this.tracks.push(i), t && (this.namedTracks[t] = i), this.currentTrack || (this.currentTrack = i)
                }
            },
            next: function() {
                this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
            },
            pause: function() {
                this.currentTrack && this.currentTrack.pause()
            },
            stop: function() {
                if (this.currentTrack) {
                    this.currentTrack.pause();
                    try {
                        this.currentTrack.currentTime = 0
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
            play: function(e) {
                if (e && this.namedTracks[e])(e = this.namedTracks[e]) != this.currentTrack && (this.stop(), this.currentTrack = e);
                else if (!this.currentTrack) return;
                this.currentTrack.play()
            },
            getLooping: function() {
                return this._loop
            },
            setLooping: function(e) {
                for (var t in this._loop = e, this.tracks) this.tracks[t].loop = e
            },
            getVolume: function() {
                return this._volume
            },
            setVolume: function(e) {
                for (var t in this._volume = e.limit(0, 1), this.tracks) this.tracks[t].volume = this._volume
            },
            fadeOut: function(e) {
                this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(e), this._fadeInterval = setInterval(this._fadeStep.bind(this), 50))
            },
            _fadeStep: function() {
                var e = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
                .01 >= e ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = e
            },
            _endedCallback: function() {
                this._loop ? this.play() : this.next()
            }
        }), ig.Sound = ig.Class.extend({
            path: "",
            volume: 1,
            currentClip: null,
            multiChannel: !0,
            init: function(e, t) {
                this.path = e, this.multiChannel = !1 !== t, this.load()
            },
            load: function(e) {
                ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path, this.multiChannel, e) : ig.addResource(this) : e && e(this.path, !0)
            },
            play: function() {
                ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
            },
            stop: function() {
                this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
            }
        }), ig.Sound.FORMAT = {
            MP3: {
                ext: "mp3",
                mime: "audio/mpeg"
            },
            M4A: {
                ext: "m4a",
                mime: "audio/mp4; codecs=mp4a"
            },
            OGG: {
                ext: "ogg",
                mime: "audio/ogg; codecs=vorbis"
            },
            WEBM: {
                ext: "webm",
                mime: "audio/webm; codecs=vorbis"
            },
            CAF: {
                ext: "caf",
                mime: "audio/x-caf"
            }
        }, ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG], ig.Sound.channels = 4, ig.Sound.enabled = !0
    }), ig.baked = !0, ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
        ig.Loader = ig.Class.extend({
            resources: [],
            gameClass: null,
            status: 0,
            done: !1,
            _unloaded: [],
            _drawStatus: 0,
            _intervalId: 0,
            _loadCallbackBound: null,
            init: function(e, t) {
                this.gameClass = e, this.resources = t, this._loadCallbackBound = this._loadCallback.bind(this);
                for (var i = 0; i < this.resources.length; i++) this._unloaded.push(this.resources[i].path)
            },
            load: function() {
                if (ig.system.clear("#000"), this.resources.length) {
                    for (var e = 0; e < this.resources.length; e++) this.loadResource(this.resources[e]);
                    this._intervalId = setInterval(this.draw.bind(this), 16)
                } else this.end()
            },
            loadResource: function(e) {
                e.load(this._loadCallbackBound)
            },
            end: function() {
                this.done || (this.done = !0, clearInterval(this._intervalId))
            },
            draw: function() {},
            _loadCallback: function(e, t) {
                if (!t) throw "Failed to load resource: " + e;
                this._unloaded.erase(e), this.status = 1 - this._unloaded.length / this.resources.length, 0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
            }
        })
    }), ig.baked = !0, ig.module("impact.timer").defines(function() {
        ig.Timer = ig.Class.extend({
            target: 0,
            base: 0,
            last: 0,
            pausedAt: 0,
            init: function(e) {
                this.last = this.base = ig.Timer.time, this.target = e || 0
            },
            set: function(e) {
                this.target = e || 0, this.base = ig.Timer.time, this.pausedAt = 0
            },
            reset: function() {
                this.base = ig.Timer.time, this.pausedAt = 0
            },
            tick: function() {
                var e = ig.Timer.time - this.last;
                return this.last = ig.Timer.time, this.pausedAt ? 0 : e
            },
            delta: function() {
                return (this.pausedAt || ig.Timer.time) - this.base - this.target
            },
            pause: function() {
                this.pausedAt || (this.pausedAt = ig.Timer.time)
            },
            unpause: function() {
                this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
            }
        }), ig.Timer._last = 0, ig.Timer.time = 0, ig.Timer.timeScale = 1, ig.Timer.maxStep = .05, ig.Timer.step = function() {
            var e = Date.now();
            ig.Timer.time += Math.min((e - ig.Timer._last) / 1e3, ig.Timer.maxStep) * ig.Timer.timeScale, ig.Timer._last = e
        }
    }), ig.baked = !0, ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
        ig.System = ig.Class.extend({
            fps: 30,
            width: 320,
            height: 240,
            realWidth: 320,
            realHeight: 240,
            scale: 1,
            tick: 0,
            animationId: 0,
            newGameClass: null,
            running: !1,
            delegate: null,
            clock: null,
            canvas: null,
            context: null,
            init: function(e, t, i, n, s) {
                this.fps = t, this.clock = new ig.Timer, this.canvas = ig.$(e), this.resize(i, n, s), this.context = this.canvas.getContext("2d"), this.getDrawPos = ig.System.drawMode
            },
            resize: function(e, t, i) {
                this.width = e, this.height = t, this.scale = i || this.scale, this.realWidth = this.width * this.scale, this.realHeight = this.height * this.scale, this.canvas.width = this.realWidth, this.canvas.height = this.realHeight
            },
            setGame: function(e) {
                this.running ? this.newGameClass = e : this.setGameNow(e)
            },
            setGameNow: function(e) {
                ig.game = new e, ig.system.setDelegate(ig.game)
            },
            setDelegate: function(e) {
                if ("function" != typeof e.run) throw "System.setDelegate: No run() function in object";
                this.delegate = e, this.startRunLoop()
            },
            stopRunLoop: function() {
                ig.clearAnimation(this.animationId), this.running = !1
            },
            startRunLoop: function() {
                this.stopRunLoop(), this.animationId = ig.setAnimation(this.run.bind(this), this.canvas), this.running = !0
            },
            clear: function(e) {
                this.context.fillStyle = e, this.context.fillRect(0, 0, this.realWidth, this.realHeight)
            },
            run: function() {
                ig.Timer.step(), this.tick = this.clock.tick(), this.delegate.run(), ig.input.clearPressed(), this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
            },
            getDrawPos: null
        }), ig.System.DRAW = {
            AUTHENTIC: function(e) {
                return Math.round(e) * this.scale
            },
            SMOOTH: function(e) {
                return Math.round(e * this.scale)
            },
            SUBPIXEL: function(e) {
                return e * this.scale
            }
        }, ig.System.drawMode = ig.System.DRAW.SMOOTH, ig.System.SCALE = {
            CRISP: function(e, t) {
                ig.setVendorAttribute(t, "imageSmoothingEnabled", !1), e.style.imageRendering = "-moz-crisp-edges", e.style.imageRendering = "-o-crisp-edges", e.style.imageRendering = "-webkit-optimize-contrast", e.style.imageRendering = "crisp-edges", e.style.msInterpolationMode = "nearest-neighbor"
            },
            SMOOTH: function(e, t) {
                ig.setVendorAttribute(t, "imageSmoothingEnabled", !0), e.style.imageRendering = "", e.style.msInterpolationMode = ""
            }
        }, ig.System.scaleMode = ig.System.SCALE.SMOOTH
    }), ig.baked = !0, ig.module("impact.input").defines(function() {
        ig.KEY = {
            MOUSE1: -1,
            MOUSE2: -3,
            MWHEEL_UP: -4,
            MWHEEL_DOWN: -5,
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            PAUSE: 19,
            CAPS: 20,
            ESC: 27,
            SPACE: 32,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            LEFT_ARROW: 37,
            UP_ARROW: 38,
            RIGHT_ARROW: 39,
            DOWN_ARROW: 40,
            INSERT: 45,
            DELETE: 46,
            _0: 48,
            _1: 49,
            _2: 50,
            _3: 51,
            _4: 52,
            _5: 53,
            _6: 54,
            _7: 55,
            _8: 56,
            _9: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_0: 96,
            NUMPAD_1: 97,
            NUMPAD_2: 98,
            NUMPAD_3: 99,
            NUMPAD_4: 100,
            NUMPAD_5: 101,
            NUMPAD_6: 102,
            NUMPAD_7: 103,
            NUMPAD_8: 104,
            NUMPAD_9: 105,
            MULTIPLY: 106,
            ADD: 107,
            SUBSTRACT: 109,
            DECIMAL: 110,
            DIVIDE: 111,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            SHIFT: 16,
            CTRL: 17,
            ALT: 18,
            PLUS: 187,
            COMMA: 188,
            MINUS: 189,
            PERIOD: 190
        }, ig.Input = ig.Class.extend({
            bindings: {},
            actions: {},
            presses: {},
            locks: {},
            delayedKeyup: {},
            isUsingMouse: !1,
            isUsingKeyboard: !1,
            isUsingAccelerometer: !1,
            mouse: {
                x: 0,
                y: 0
            },
            accel: {
                x: 0,
                y: 0,
                z: 0
            },
            initMouse: function() {
                if (!this.isUsingMouse) {
                    this.isUsingMouse = !0;
                    var e = this.mousewheel.bind(this);
                    ig.system.canvas.addEventListener("mousewheel", e, !1), ig.system.canvas.addEventListener("DOMMouseScroll", e, !1), ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1), ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1), ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
                }
            },
            initKeyboard: function() {
                this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
            },
            initAccelerometer: function() {
                this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
            },
            mousewheel: function(e) {
                var t = this.bindings[0 < (e.wheelDelta ? e.wheelDelta : -1 * e.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
                t && (this.actions[t] = !0, this.presses[t] = !0, this.delayedKeyup[t] = !0, e.stopPropagation(), e.preventDefault())
            },
            mousemove: function(e) {
                for (var t = ig.system.canvas, i = 0, n = 0; null != t;) i += t.offsetLeft, n += t.offsetTop, t = t.offsetParent;
                t = e.pageX;
                var s = e.pageY;
                e.touches && (t = e.touches[0].clientX, s = e.touches[0].clientY), this.mouse.x = (t - i) / ig.system.scale, this.mouse.y = (s - n) / ig.system.scale
            },
            contextmenu: function(e) {
                this.bindings[ig.KEY.MOUSE2] && (e.stopPropagation(), e.preventDefault())
            },
            keydown: function(e) {
                e.stopPropagation(), e.preventDefault();
                var t = e.target.tagName;
                "INPUT" != t && "TEXTAREA" != t && (0 > (t = "keydown" == e.type ? e.keyCode : 2 == e.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1) && !ig.ua.mobile && window.focus(), ("touchstart" == e.type || "mousedown" == e.type) && this.mousemove(e), (e = this.bindings[t]) && (this.actions[e] = !0, this.locks[e] || (this.presses[e] = !0, this.locks[e] = !0)))
            },
            keyup: function(e) {
                if ("text" != e.target.type) {
                    var t = this.bindings["keyup" == e.type ? e.keyCode : 2 == e.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1];
                    t && (this.delayedKeyup[t] = !0, e.stopPropagation(), e.preventDefault())
                }
            },
            devicemotion: function(e) {
                this.accel = e.accelerationIncludingGravity
            },
            bind: function(e, t) {
                0 > e ? this.initMouse() : 0 < e && this.initKeyboard(), this.bindings[e] = t
            },
            bindTouch: function(e, t) {
                var i = ig.$(e),
                    n = this;
                i.addEventListener("touchstart", function(e) {
                    n.touchStart(e, t)
                }, !1), i.addEventListener("touchend", function(e) {
                    n.touchEnd(e, t)
                }, !1)
            },
            unbind: function(e) {
                this.delayedKeyup[this.bindings[e]] = !0, this.bindings[e] = null
            },
            unbindAll: function() {
                this.bindings = {}, this.actions = {}, this.presses = {}, this.locks = {}, this.delayedKeyup = {}
            },
            state: function(e) {
                return this.actions[e]
            },
            pressed: function(e) {
                return this.presses[e]
            },
            released: function(e) {
                return this.delayedKeyup[e]
            },
            clearPressed: function() {
                for (var e in this.delayedKeyup) this.actions[e] = !1, this.locks[e] = !1;
                this.delayedKeyup = {}, this.presses = {}
            },
            touchStart: function(e, t) {
                return this.actions[t] = !0, this.presses[t] = !0, e.stopPropagation(), e.preventDefault(), !1
            },
            touchEnd: function(e, t) {
                return this.delayedKeyup[t] = !0, e.stopPropagation(), e.preventDefault(), !1
            }
        })
    }), ig.baked = !0, ig.module("impact.sound-handler").defines(function() {
        ig.SoundHandler = ig.Class.extend({
            formats: {
                ogg: ".ogg",
                mp3: ".mp3"
            },
            jukebox: null,
            pausePosition: null,
            globalMute: !1,
            forceMuted: !1,
            muted: !1,
            bgmPlaying: !1,
            soundPlaying: !1,
            currentSoundPlaying: null,
            soundBuffer: [],
            voSoundLoaded: [],
            sfxSoundLoaded: [],
            SOUNDID: {},
            voSoundsToLoad: [],
            sfxSoundsToLoad: [{
                name: "staticSound",
                path: "media/audio/play/static"
            }, {
                name: "openingSound",
                path: "media/audio/opening/opening"
            }, {
                name: "kittyopeningSound",
                path: "media/audio/opening/kittyopening"
            }, {
                name: "button",
                path: "media/audio/sfx/button"
            }, {
                name: "hit",
                path: "media/audio/sfx/hit2"
            }, {
                name: "step",
                path: "media/audio/sfx/step"
            }, {
                name: "skate",
                path: "media/audio/sfx/skate"
            }, {
                name: "jump",
                path: "media/audio/sfx/jump2"
            }, {
                name: "slide",
                path: "media/audio/sfx/woosh"
            }, {
                name: "crunch",
                path: "media/audio/sfx/crunch"
            }, {
                name: "coin",
                path: "media/audio/sfx/ding"
            }, {
                name: "chirp",
                path: "media/audio/sfx/chirp"
            }],
            debug: !1,
            init: function() {
                this.initSfx(), this.setupWindowHandler()
            },
            allVoSoundLoaded: function() {
                if (this.voSoundLoaded.length >= this.voSoundsToLoad.length) {
                    for (this.debug && console.log("Vo ready"), index = 0; index < this.voSoundLoaded.length; index++) this.voSoundLoaded[index].on("end", function(e) {
                        e.isPlaying = !1, this.soundBuffer.pop()
                    }.bind(this, this.voSoundLoaded[index])), this.voSoundLoaded[index].on("play", function(e) {
                        e.isPlaying = !0
                    }.bind(this, this.voSoundLoaded[index]));
                    return !0
                }
                return !1
            },
            allSfxSoundLoaded: function() {
                return this.sfxSoundLoaded.length >= this.sfxSoundsToLoad.length
            },
            stopBackgroundMusic: function() {
                this.jukebox || this.setupJukebox(), this.jukebox && (this.pausePosition = this.jukebox.player.pause(), this.bgmPlaying = !1)
            },
            playBackgroundMusic: function() {
                this.jukebox || this.setupJukebox(), this.jukebox && (null != this.pausePosition ? this.jukebox.player.resume(this.pausePosition) : (this.jukebox.player.resume(0), this.jukebox.player.play()), this.bgmPlaying = !0)
            },
            playSound: function(e) {
                !(e = this[e]) || this.forceMuted && this.muted || e.isPlaying || (this.soundBuffer.push(e), e.play())
            },
            stopAllAndPlaySound: function(e) {
                this.stopAllSounds(), this.playSound(e)
            },
            stopAllSounds: function() {
                for (index = 0; index < this.soundBuffer.length; index++) this.soundBuffer[index].isPlaying = !1, this.soundBuffer.splice(0, 1)[0].stop()
            },
            addSound: function(e, t, i) {
                var n = t + this.formats.ogg;
                t += this.formats.mp3, this.SOUNDID[e] = e, this[e] = i ? new Howl({
                    urls: [n, t],
                    onload: i
                }) : new Howl({
                    urls: [n, t]
                })
            },
            _muteSounds: function() {
                for (i = 0; i < ig.resources.length; i++) ig.resources[i].multiChannel && ig.resources[i].stop();
                Howler.mute(), this.debug && console.log("Sounds muted")
            },
            _unMuteSounds: function() {
                Howler.unmute(), ig.Sound.enabled = !0, this.debug && console.log("Sounds can play")
            },
            focusBlurMute: function() {
                this.forceMuted || this.mute()
            },
            focusBlurUnmute: function() {
                this.forceMuted || this.unmute()
            },
            setForceMuted: function(e) {
                this.forceMuted = e
            },
            mute: function() {
                this._muteSounds(), this.jukebox && (this.jukebox.player.pause(), this.jukebox.player.setVolume(.01)), this.muted = !0
            },
            unmute: function() {
                if (this._unMuteSounds(), this.jukebox && this.bgmPlaying) {
                    this.jukebox.player.resume();
                    var e = this.musicVolume;
                    0 == e && (e = .01), this.jukebox.player.setVolume(e)
                }
                this.muted = !1
            },
            setupWindowHandler: function() {
                "true" === getQueryVariable("webview") ? ($(window).focus(function() {
                    ig.game && ig.game.resumeGame(), ig.soundHandler && ig.soundHandler.focusBlurUnmute()
                }), $(window).blur(function() {
                    ig.game && ig.game.pauseGame(), ig.soundHandler && ig.soundHandler.focusBlurMute()
                })) : (window.onfocus = function() {
                    ig.game && ig.game.resumeGame(), ig.soundHandler && ig.soundHandler.focusBlurUnmute()
                }, window.onblur = function() {
                    ig.game && ig.game.pauseGame(), ig.soundHandler && ig.soundHandler.focusBlurMute()
                })
            },
            initSfx: function() {
                for (index = 0; index < this.sfxSoundsToLoad.length; index++) {
                    var e = function(e) {
                        this.sfxSoundLoaded.push(this[e])
                    }.bind(this, this.sfxSoundsToLoad[index].name);
                    this.addSound(this.sfxSoundsToLoad[index].name, this.sfxSoundsToLoad[index].path, e)
                }
            },
            initVoSfx: function() {
                for (index = 0; index < this.voSoundsToLoad.length; index++) {
                    var e = function(e) {
                        this.voSoundLoaded.push(this[e])
                    }.bind(this, this.voSoundsToLoad[index].name);
                    this.addSound(this.voSoundsToLoad[index].name, this.voSoundsToLoad[index].path, e)
                }
            },
            setupDesktopMusic: function() {
                ig.music.add("media/audio/music/bgm.*", "background")
            },
            setupJukebox: function() {
                this.jukebox = new ig.Jukebox, this.jukebox.player.setVolume(.01), this.stopBackgroundMusic()
            },
            forceLoopBGM: function() {
                if (this.bgmPlaying && !this.forceMuted && this.jukebox && this.jukebox.player)
                    if (this.jukebox.player.getCurrentTime()) {
                        var e = .06;
                        ig.ua.mobile && (e = .06, ig.ua.android && (e = .07)), this.jukebox.player.settings.spritemap.music && this.jukebox.player.settings.spritemap.music.loop ? this.jukebox.player.getCurrentTime() >= this.jukebox.player.settings.spritemap.music.end - e && (this.jukebox.player.pause(), this.jukebox.player.resume(this.jukebox.player.settings.spritemap.music.start)) : this.jukebox.player.isPlaying && this.jukebox.player.isPlaying.loop ? this.jukebox.player.getCurrentTime() >= this.jukebox.player.isPlaying.end - e && (this.jukebox.player.pause(), this.jukebox.player.resume(this.jukebox.player.isPlaying.start)) : this.jukebox.player.backgroundMusic && this.jukebox.player.backgroundMusic.loop && this.jukebox.player.getCurrentTime() >= this.jukebox.player.backgroundMusic.end - e && (this.jukebox.player.pause(), this.jukebox.player.resume(this.jukebox.player.backgroundMusic.start))
                    } else this.jukebox.player.resume()
            },
            setSfxVolume: function(e) {
                this.sfxVolume = e, Howler.volume(this.sfxVolume)
            },
            setMusicVolume: function(e) {
                this.musicVolume = e, this.jukebox && (0 == (e = this.musicVolume) ? (this.jukebox.player.setVolume(e), this.bgmPlaying && this.jukebox.player.pause(), this.bgmPlaying = !1) : (this.jukebox.player.setVolume(e), this.bgmPlaying || this.jukebox.player.resume(0), this.bgmPlaying = !0))
            }
        })
    }), ig.baked = !0, ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound", "impact.sound-handler").defines(function() {
        ig.main = function(e, t, i, n, s, a, o) {
            ig.system = new ig.System(e, i, n, s, a || 1), ig.input = new ig.Input, ig.soundManager = new ig.SoundManager, ig.music = new ig.Music, ig.ready = !0, ig.soundHandler = new ig.SoundHandler, new(o || ig.Loader)(t, ig.resources).load()
        }
    }), ig.baked = !0, ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
        ig.AnimationSheet = ig.Class.extend({
            width: 8,
            height: 8,
            image: null,
            init: function(e, t, i) {
                this.width = t, this.height = i, this.image = new ig.Image(e)
            }
        }), ig.Animation = ig.Class.extend({
            sheet: null,
            timer: null,
            sequence: [],
            flip: {
                x: !1,
                y: !1
            },
            pivot: {
                x: 0,
                y: 0
            },
            frame: 0,
            tile: 0,
            loopCount: 0,
            alpha: 1,
            angle: 0,
            init: function(e, t, i, n) {
                this.sheet = e, this.pivot = {
                    x: e.width / 2,
                    y: e.height / 2
                }, this.timer = new ig.Timer, this.frameTime = t, this.sequence = i, this.stop = !!n, this.tile = this.sequence[0]
            },
            rewind: function() {
                return this.timer.reset(), this.loopCount = 0, this.tile = this.sequence[0], this
            },
            gotoFrame: function(e) {
                this.timer.set(this.frameTime * -e), this.update()
            },
            gotoRandomFrame: function() {
                this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
            },
            update: function() {
                var e = Math.floor(this.timer.delta() / this.frameTime);
                this.loopCount = Math.floor(e / this.sequence.length), this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : e % this.sequence.length, this.tile = this.sequence[this.frame]
            },
            draw: function(e, t) {
                var i = Math.max(this.sheet.width, this.sheet.height);
                e > ig.system.width || t > ig.system.height || 0 > e + i || 0 > t + i || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(e, t, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(e + this.pivot.x), ig.system.getDrawPos(t + this.pivot.y)), ig.system.context.rotate(this.angle), this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
            }
        })
    }), ig.baked = !0, ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
        ig.Entity = ig.Class.extend({
            id: 0,
            settings: {},
            size: {
                x: 16,
                y: 16
            },
            offset: {
                x: 0,
                y: 0
            },
            posMP: {
                x: 0,
                y: 0
            },
            posML: {
                x: 0,
                y: 0
            },
            enableReposition: !1,
            pos: {
                x: 0,
                y: 0
            },
            last: {
                x: 0,
                y: 0
            },
            vel: {
                x: 0,
                y: 0
            },
            accel: {
                x: 0,
                y: 0
            },
            friction: {
                x: 0,
                y: 0
            },
            maxVel: {
                x: 100,
                y: 100
            },
            zIndex: 0,
            gravityFactor: 1,
            standing: !1,
            bounciness: 0,
            minBounceVelocity: 40,
            anims: {},
            animSheet: null,
            currentAnim: null,
            health: 10,
            type: 0,
            checkAgainst: 0,
            collides: 0,
            _killed: !1,
            slopeStanding: {
                min: 44..toRad(),
                max: 136..toRad()
            },
            init: function(e, t, i) {
                this.id = ++ig.Entity._lastId, this.pos.x = e, this.pos.y = t, ig.merge(this, i)
            },
            addAnim: function(e, t, i, n) {
                if (!this.animSheet) throw "No animSheet to add the animation " + e + " to.";
                return t = new ig.Animation(this.animSheet, t, i, n), this.anims[e] = t, this.currentAnim || (this.currentAnim = t), t
            },
            update: function() {
                this.last.x = this.pos.x, this.last.y = this.pos.y, this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor, this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x), this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
                var e = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
                this.handleMovementTrace(e), this.currentAnim && this.currentAnim.update()
            },
            getNewVelocity: function(e, t, i, n) {
                return t ? (e + t * ig.system.tick).limit(-n, n) : i ? 0 < e - (t = i * ig.system.tick) ? e - t : 0 > e + t ? e + t : 0 : e.limit(-n, n)
            },
            handleMovementTrace: function(e) {
                if (this.standing = !1, e.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0)), e.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0), e.collision.slope) {
                    var t = e.collision.slope;
                    if (0 < this.bounciness) {
                        var i = this.vel.x * t.nx + this.vel.y * t.ny;
                        this.vel.x = (this.vel.x - 2 * t.nx * i) * this.bounciness, this.vel.y = (this.vel.y - 2 * t.ny * i) * this.bounciness
                    } else i = (this.vel.x * t.x + this.vel.y * t.y) / (t.x * t.x + t.y * t.y), this.vel.x = t.x * i, this.vel.y = t.y * i, (t = Math.atan2(t.x, t.y)) > this.slopeStanding.min && t < this.slopeStanding.max && (this.standing = !0)
                }
                this.pos = e.pos
            },
            reposition: function() {
                ig.ua.mobile && this.enableReposition && (portraitMode ? (this.pos.x = this.posMP.x, this.pos.y = this.posMP.y) : (this.pos.x = this.posML.x, this.pos.y = this.posML.y))
            },
            draw: function() {
                this.currentAnim && this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
            },
            kill: function() {
                ig.game.removeEntity(this)
            },
            receiveDamage: function(e) {
                this.health -= e, 0 >= this.health && this.kill()
            },
            touches: function(e) {
                return !(this.pos.x >= e.pos.x + e.size.x || this.pos.x + this.size.x <= e.pos.x || this.pos.y >= e.pos.y + e.size.y || this.pos.y + this.size.y <= e.pos.y)
            },
            distanceTo: function(e) {
                var t = this.pos.x + this.size.x / 2 - (e.pos.x + e.size.x / 2);
                return e = this.pos.y + this.size.y / 2 - (e.pos.y + e.size.y / 2), Math.sqrt(t * t + e * e)
            },
            angleTo: function(e) {
                return Math.atan2(e.pos.y + e.size.y / 2 - (this.pos.y + this.size.y / 2), e.pos.x + e.size.x / 2 - (this.pos.x + this.size.x / 2))
            },
            check: function() {},
            collideWith: function() {},
            ready: function() {}
        }), ig.Entity._lastId = 0, ig.Entity.COLLIDES = {
            NEVER: 0,
            LITE: 1,
            PASSIVE: 2,
            ACTIVE: 4,
            FIXED: 8
        }, ig.Entity.TYPE = {
            NONE: 0,
            A: 1,
            B: 2,
            BOTH: 3
        }, ig.Entity.checkPair = function(e, t) {
            e.checkAgainst & t.type && e.check(t), t.checkAgainst & e.type && t.check(e), e.collides && t.collides && e.collides + t.collides > ig.Entity.COLLIDES.ACTIVE && ig.Entity.solveCollision(e, t)
        }, ig.Entity.solveCollision = function(e, t) {
            var i = null;
            e.collides == ig.Entity.COLLIDES.LITE || t.collides == ig.Entity.COLLIDES.FIXED ? i = e : t.collides != ig.Entity.COLLIDES.LITE && e.collides != ig.Entity.COLLIDES.FIXED || (i = t), e.last.x + e.size.x > t.last.x && e.last.x < t.last.x + t.size.x ? (e.last.y < t.last.y ? ig.Entity.seperateOnYAxis(e, t, i) : ig.Entity.seperateOnYAxis(t, e, i), e.collideWith(t, "y"), t.collideWith(e, "y")) : e.last.y + e.size.y > t.last.y && e.last.y < t.last.y + t.size.y && (e.last.x < t.last.x ? ig.Entity.seperateOnXAxis(e, t, i) : ig.Entity.seperateOnXAxis(t, e, i), e.collideWith(t, "x"), t.collideWith(e, "x"))
        }, ig.Entity.seperateOnXAxis = function(e, t, i) {
            var n = e.pos.x + e.size.x - t.pos.x;
            i ? (i.vel.x = -i.vel.x * i.bounciness + (e === i ? t : e).vel.x, t = ig.game.collisionMap.trace(i.pos.x, i.pos.y, i == e ? -n : n, 0, i.size.x, i.size.y), i.pos.x = t.pos.x) : (i = (e.vel.x - t.vel.x) / 2, e.vel.x = -i, t.vel.x = i, i = ig.game.collisionMap.trace(e.pos.x, e.pos.y, -n / 2, 0, e.size.x, e.size.y), e.pos.x = Math.floor(i.pos.x), e = ig.game.collisionMap.trace(t.pos.x, t.pos.y, n / 2, 0, t.size.x, t.size.y), t.pos.x = Math.ceil(e.pos.x))
        }, ig.Entity.seperateOnYAxis = function(e, t, i) {
            var n = e.pos.y + e.size.y - t.pos.y;
            if (i) {
                t = e === i ? t : e, i.vel.y = -i.vel.y * i.bounciness + t.vel.y;
                var s = 0;
                i == e && Math.abs(i.vel.y - t.vel.y) < i.minBounceVelocity && (i.standing = !0, s = t.vel.x * ig.system.tick), e = ig.game.collisionMap.trace(i.pos.x, i.pos.y, s, i == e ? -n : n, i.size.x, i.size.y), i.pos.y = e.pos.y, i.pos.x = e.pos.x
            } else ig.game.gravity && (t.standing || 0 < e.vel.y) ? (i = ig.game.collisionMap.trace(e.pos.x, e.pos.y, 0, -(e.pos.y + e.size.y - t.pos.y), e.size.x, e.size.y), e.pos.y = i.pos.y, 0 < e.bounciness && e.vel.y > e.minBounceVelocity ? e.vel.y *= -e.bounciness : (e.standing = !0, e.vel.y = 0)) : (i = (e.vel.y - t.vel.y) / 2, e.vel.y = -i, t.vel.y = i, s = t.vel.x * ig.system.tick, i = ig.game.collisionMap.trace(e.pos.x, e.pos.y, s, -n / 2, e.size.x, e.size.y), e.pos.y = i.pos.y, e = ig.game.collisionMap.trace(t.pos.x, t.pos.y, 0, n / 2, t.size.x, t.size.y), t.pos.y = e.pos.y)
        }
    }), ig.baked = !0, ig.module("impact.map").defines(function() {
        ig.Map = ig.Class.extend({
            tilesize: 8,
            width: 1,
            height: 1,
            data: [
                []
            ],
            name: null,
            init: function(e, t) {
                this.tilesize = e, this.data = t, this.height = t.length, this.width = t[0].length
            },
            getTile: function(e, t) {
                var i = Math.floor(e / this.tilesize),
                    n = Math.floor(t / this.tilesize);
                return 0 <= i && i < this.width && 0 <= n && n < this.height ? this.data[n][i] : 0
            },
            setTile: function(e, t, i) {
                e = Math.floor(e / this.tilesize), t = Math.floor(t / this.tilesize), 0 <= e && e < this.width && 0 <= t && t < this.height && (this.data[t][e] = i)
            }
        })
    }), ig.baked = !0, ig.module("impact.collision-map").requires("impact.map").defines(function() {
        ig.CollisionMap = ig.Map.extend({
            lastSlope: 1,
            tiledef: null,
            init: function(e, t, i) {
                for (var n in this.parent(e, t), this.tiledef = i || ig.CollisionMap.defaultTileDef, this.tiledef) n | 0 > this.lastSlope && (this.lastSlope = 0 | n)
            },
            trace: function(e, t, i, n, s, a) {
                var o = {
                        collision: {
                            x: !1,
                            y: !1,
                            slope: !1
                        },
                        pos: {
                            x: e,
                            y: t
                        },
                        tile: {
                            x: 0,
                            y: 0
                        }
                    },
                    r = Math.ceil(Math.max(Math.abs(i), Math.abs(n)) / this.tilesize);
                if (1 < r)
                    for (var h = i / r, l = n / r, u = 0; u < r && (h || l) && (this._traceStep(o, e, t, h, l, s, a, i, n, u), e = o.pos.x, t = o.pos.y, o.collision.x && (i = h = 0), o.collision.y && (n = l = 0), !o.collision.slope); u++);
                else this._traceStep(o, e, t, i, n, s, a, i, n, 0);
                return o
            },
            _traceStep: function(e, t, i, n, s, a, o, r, h, l) {
                e.pos.x += n, e.pos.y += s;
                var u = 0;
                if (n) {
                    var c = 0 < n ? a : 0,
                        d = 0 > n ? this.tilesize : 0,
                        g = (u = Math.max(Math.floor(i / this.tilesize), 0), Math.min(Math.ceil((i + o) / this.tilesize), this.height));
                    n = Math.floor((e.pos.x + c) / this.tilesize);
                    var m = Math.floor((t + c) / this.tilesize);
                    if ((0 < l || n == m || 0 > m || m >= this.width) && (m = -1), 0 <= n && n < this.width)
                        for (var p = u; p < g && !(-1 != m && (u = this.data[p][m], 1 < u && u <= this.lastSlope && this._checkTileDef(e, u, t, i, r, h, a, o, m, p))); p++)
                            if (1 == (u = this.data[p][n]) || u > this.lastSlope || 1 < u && this._checkTileDef(e, u, t, i, r, h, a, o, n, p)) {
                                if (1 < u && u <= this.lastSlope && e.collision.slope) break;
                                e.collision.x = !0, e.tile.x = u, t = e.pos.x = n * this.tilesize - c + d, r = 0;
                                break
                            }
                }
                if (s && (c = 0 < s ? o : 0, s = 0 > s ? this.tilesize : 0, u = Math.max(Math.floor(e.pos.x / this.tilesize), 0), d = Math.min(Math.ceil((e.pos.x + a) / this.tilesize), this.width), p = Math.floor((e.pos.y + c) / this.tilesize), g = Math.floor((i + c) / this.tilesize), (0 < l || p == g || 0 > g || g >= this.height) && (g = -1), 0 <= p && p < this.height))
                    for (n = u; n < d && !(-1 != g && (u = this.data[g][n], 1 < u && u <= this.lastSlope && this._checkTileDef(e, u, t, i, r, h, a, o, n, g))); n++)
                        if (1 == (u = this.data[p][n]) || u > this.lastSlope || 1 < u && this._checkTileDef(e, u, t, i, r, h, a, o, n, p)) {
                            if (1 < u && u <= this.lastSlope && e.collision.slope) break;
                            e.collision.y = !0, e.tile.y = u, e.pos.y = p * this.tilesize - c + s;
                            break
                        }
            },
            _checkTileDef: function(e, t, i, n, s, a, o, r, h, l) {
                if (!(u = this.tiledef[t])) return !1;
                t = (u[2] - u[0]) * this.tilesize;
                var u, c, d = (u[3] - u[1]) * this.tilesize,
                    g = u[4];
                return o = i + s + (0 > d ? o : 0) - (h + u[0]) * this.tilesize, 0 < t * (r = n + a + (0 < t ? r : 0) - (l + u[1]) * this.tilesize) - d * o && (0 > s * -d + a * t ? g : (u = (l = d / (h = Math.sqrt(t * t + d * d))) * (c = o * l + r * (h = -t / h))) * u + (c *= h) * c >= s * s + a * a ? g || .5 > t * (r - a) - d * (o - s) : (e.pos.x = i + s - u, e.pos.y = n + a - c, e.collision.slope = {
                    x: t,
                    y: d,
                    nx: l,
                    ny: h
                }, !0))
            }
        });
        var e = 1 / 3,
            t = 2 / 3;
        ig.CollisionMap.defaultTileDef = {
            5: [0, 1, 1, t, !0],
            6: [0, t, 1, e, !0],
            7: [0, e, 1, 0, !0],
            3: [0, 1, 1, .5, !0],
            4: [0, .5, 1, 0, !0],
            2: [0, 1, 1, 0, !0],
            10: [.5, 1, 1, 0, !0],
            21: [0, 1, .5, 0, !0],
            32: [t, 1, 1, 0, !0],
            43: [e, 1, t, 0, !0],
            54: [0, 1, e, 0, !0],
            27: [0, 0, 1, e, !0],
            28: [0, e, 1, t, !0],
            29: [0, t, 1, 1, !0],
            25: [0, 0, 1, .5, !0],
            26: [0, .5, 1, 1, !0],
            24: [0, 0, 1, 1, !0],
            11: [0, 0, .5, 1, !0],
            22: [.5, 0, 1, 1, !0],
            33: [0, 0, e, 1, !0],
            44: [e, 0, t, 1, !0],
            55: [t, 0, 1, 1, !0],
            16: [1, e, 0, 0, !0],
            17: [1, t, 0, e, !0],
            18: [1, 1, 0, t, !0],
            14: [1, .5, 0, 0, !0],
            15: [1, 1, 0, .5, !0],
            13: [1, 1, 0, 0, !0],
            8: [.5, 1, 0, 0, !0],
            19: [1, 1, .5, 0, !0],
            30: [e, 1, 0, 0, !0],
            41: [t, 1, e, 0, !0],
            52: [1, 1, t, 0, !0],
            38: [1, t, 0, 1, !0],
            39: [1, e, 0, t, !0],
            40: [1, 0, 0, e, !0],
            36: [1, .5, 0, 1, !0],
            37: [1, 0, 0, .5, !0],
            35: [1, 0, 0, 1, !0],
            9: [1, 0, .5, 1, !0],
            20: [.5, 0, 0, 1, !0],
            31: [1, 0, t, 1, !0],
            42: [t, 0, e, 1, !0],
            53: [e, 0, 0, 1, !0],
            12: [0, 0, 1, 0, !1],
            23: [1, 1, 0, 1, !1],
            34: [1, 0, 1, 1, !1],
            45: [0, 1, 0, 0, !1]
        }, ig.CollisionMap.staticNoCollision = {
            trace: function(e, t, i, n) {
                return {
                    collision: {
                        x: !1,
                        y: !1,
                        slope: !1
                    },
                    pos: {
                        x: e + i,
                        y: t + n
                    },
                    tile: {
                        x: 0,
                        y: 0
                    }
                }
            }
        }
    }), ig.baked = !0, ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
        ig.BackgroundMap = ig.Map.extend({
            tiles: null,
            scroll: {
                x: 0,
                y: 0
            },
            distance: 1,
            repeat: !1,
            tilesetName: "",
            foreground: !1,
            enabled: !0,
            preRender: !1,
            preRenderedChunks: null,
            chunkSize: 512,
            debugChunks: !1,
            anims: {},
            init: function(e, t, i) {
                this.parent(e, t), this.setTileset(i)
            },
            setTileset: function(e) {
                this.tilesetName = e instanceof ig.Image ? e.path : e, this.tiles = new ig.Image(this.tilesetName), this.preRenderedChunks = null
            },
            setScreenPos: function(e, t) {
                this.scroll.x = e / this.distance, this.scroll.y = t / this.distance
            },
            preRenderMapToChunks: function() {
                var e = this.width * this.tilesize * ig.system.scale,
                    t = this.height * this.tilesize * ig.system.scale,
                    i = Math.ceil(e / this.chunkSize),
                    n = Math.ceil(t / this.chunkSize);
                this.preRenderedChunks = [];
                for (var s = 0; s < n; s++) {
                    this.preRenderedChunks[s] = [];
                    for (var a = 0; a < i; a++) this.preRenderedChunks[s][a] = this.preRenderChunk(a, s, a == i - 1 ? e - a * this.chunkSize : this.chunkSize, s == n - 1 ? t - s * this.chunkSize : this.chunkSize)
                }
            },
            preRenderChunk: function(e, t, i, n) {
                var s = i / this.tilesize / ig.system.scale + 1,
                    a = n / this.tilesize / ig.system.scale + 1,
                    o = e * this.chunkSize / ig.system.scale % this.tilesize,
                    r = t * this.chunkSize / ig.system.scale % this.tilesize;
                e = Math.floor(e * this.chunkSize / this.tilesize / ig.system.scale), t = Math.floor(t * this.chunkSize / this.tilesize / ig.system.scale);
                var h = ig.$new("canvas");
                for (h.width = i, h.height = n, i = ig.system.context, ig.system.context = h.getContext("2d"), n = 0; n < s; n++)
                    for (var l = 0; l < a; l++)
                        if (n + e < this.width && l + t < this.height) {
                            var u = this.data[l + t][n + e];
                            u && this.tiles.drawTile(n * this.tilesize - o, l * this.tilesize - r, u - 1, this.tilesize)
                        } return ig.system.context = i, h
            },
            draw: function() {
                this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
            },
            drawPreRendered: function() {
                this.preRenderedChunks || this.preRenderMapToChunks();
                var e = ig.system.getDrawPos(this.scroll.x),
                    t = ig.system.getDrawPos(this.scroll.y);
                this.repeat && (e %= this.width * this.tilesize * ig.system.scale, t %= this.height * this.tilesize * ig.system.scale);
                var i = Math.max(Math.floor(e / this.chunkSize), 0),
                    n = Math.max(Math.floor(t / this.chunkSize), 0),
                    s = Math.ceil((e + ig.system.realWidth) / this.chunkSize),
                    a = Math.ceil((t + ig.system.realHeight) / this.chunkSize),
                    o = this.preRenderedChunks[0].length,
                    r = this.preRenderedChunks.length;
                this.repeat || (s = Math.min(s, o), a = Math.min(a, r));
                for (var h = 0; n < a; n++) {
                    for (var l = 0, u = i; u < s; u++) {
                        var c = this.preRenderedChunks[n % r][u % o],
                            d = -e + u * this.chunkSize - l,
                            g = -t + n * this.chunkSize - h;
                        ig.system.context.drawImage(c, d, g), ig.Image.drawCount++, this.debugChunks && (ig.system.context.strokeStyle = "#f0f", ig.system.context.strokeRect(d, g, this.chunkSize, this.chunkSize)), this.repeat && c.width < this.chunkSize && d + c.width < ig.system.realWidth && (l = this.chunkSize - c.width, s++)
                    }
                    this.repeat && c.height < this.chunkSize && g + c.height < ig.system.realHeight && (h = this.chunkSize - c.height, a++)
                }
            },
            drawTiled: function() {
                var e = 0,
                    t = null,
                    i = (this.scroll.x / this.tilesize).toInt(),
                    n = (this.scroll.y / this.tilesize).toInt(),
                    s = this.scroll.x % this.tilesize,
                    a = this.scroll.y % this.tilesize,
                    o = -s - this.tilesize,
                    r = (s = ig.system.width + this.tilesize - s, ig.system.height + this.tilesize - a),
                    h = -1;
                for (a = -a - this.tilesize; a < r; h++, a += this.tilesize) {
                    var l = h + n;
                    if (l >= this.height || 0 > l) {
                        if (!this.repeat) continue;
                        l = 0 < l ? l % this.height : (l + 1) % this.height + this.height - 1
                    }
                    for (var u = -1, c = o; c < s; u++, c += this.tilesize) {
                        if ((e = u + i) >= this.width || 0 > e) {
                            if (!this.repeat) continue;
                            e = 0 < e ? e % this.width : (e + 1) % this.width + this.width - 1
                        }(e = this.data[l][e]) && ((t = this.anims[e - 1]) ? t.draw(c, a) : this.tiles.drawTile(c, a, e - 1, this.tilesize))
                    }
                }
            }
        })
    }), ig.baked = !0, ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
        ig.Game = ig.Class.extend({
            clearColor: "#000000",
            gravity: 0,
            screen: {
                x: 0,
                y: 0
            },
            _rscreen: {
                x: 0,
                y: 0
            },
            entities: [],
            namedEntities: {},
            collisionMap: ig.CollisionMap.staticNoCollision,
            backgroundMaps: [],
            backgroundAnims: {},
            autoSort: !1,
            sortBy: null,
            cellSize: 64,
            _deferredKill: [],
            _levelToLoad: null,
            _doSortEntities: !1,
            staticInstantiate: function() {
                return this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX, ig.game = this, null
            },
            loadLevelWithoutEntities: function(e) {
                this.screen = {
                    x: 0,
                    y: 0
                }, this.collisionMap = ig.CollisionMap.staticNoCollision, this.backgroundMaps = [];
                for (var t = 0; t < e.layer.length; t++) {
                    var i = e.layer[t];
                    if ("collision" == i.name) this.collisionMap = new ig.CollisionMap(i.tilesize, i.data);
                    else {
                        var n = new ig.BackgroundMap(i.tilesize, i.data, i.tilesetName);
                        n.anims = this.backgroundAnims[i.tilesetName] || {}, n.repeat = i.repeat, n.distance = i.distance, n.foreground = !!i.foreground, n.preRender = !!i.preRender, n.name = i.name, this.backgroundMaps.push(n)
                    }
                }
            },
            loadLevel: function(e) {
                this.screen = {
                    x: 0,
                    y: 0
                }, this.entities = [], this.namedEntities = {};
                for (var t = 0; t < e.entities.length; t++) {
                    var i = e.entities[t];
                    this.spawnEntity(i.type, i.x, i.y, i.settings)
                }
                for (this.sortEntities(), this.collisionMap = ig.CollisionMap.staticNoCollision, this.backgroundMaps = [], t = 0; t < e.layer.length; t++)
                    if ("collision" == (i = e.layer[t]).name) this.collisionMap = new ig.CollisionMap(i.tilesize, i.data);
                    else {
                        var n = new ig.BackgroundMap(i.tilesize, i.data, i.tilesetName);
                        n.anims = this.backgroundAnims[i.tilesetName] || {}, n.repeat = i.repeat, n.distance = i.distance, n.foreground = !!i.foreground, n.preRender = !!i.preRender, n.name = i.name, this.backgroundMaps.push(n)
                    } for (t = 0; t < this.entities.length; t++) this.entities[t].ready()
            },
            loadLevelDeferred: function(e) {
                this._levelToLoad = e
            },
            getMapByName: function(e) {
                if ("collision" == e) return this.collisionMap;
                for (var t = 0; t < this.backgroundMaps.length; t++)
                    if (this.backgroundMaps[t].name == e) return this.backgroundMaps[t];
                return null
            },
            getEntityByName: function(e) {
                return this.namedEntities[e]
            },
            getEntitiesByType: function(e) {
                e = "string" == typeof e ? ig.global[e] : e;
                for (var t = [], i = 0; i < this.entities.length; i++) {
                    var n = this.entities[i];
                    n instanceof e && !n._killed && t.push(n)
                }
                return t
            },
            spawnEntity: function(e, t, i, n) {
                var s = "string" == typeof e ? ig.global[e] : e;
                if (!s) throw "Can't spawn entity of type " + e;
                return e = new s(t, i, n || {}), this.entities.push(e), e.name && (this.namedEntities[e.name] = e), e
            },
            sortEntities: function() {
                this.entities.sort(this.sortBy)
            },
            sortEntitiesDeferred: function() {
                this._doSortEntities = !0
            },
            removeEntity: function(e) {
                e.name && delete this.namedEntities[e.name], e._killed = !0, e.type = ig.Entity.TYPE.NONE, e.checkAgainst = ig.Entity.TYPE.NONE, e.collides = ig.Entity.COLLIDES.NEVER, this._deferredKill.push(e)
            },
            run: function() {
                this.update(), this.draw()
            },
            update: function() {
                this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null), (this._doSortEntities || this.autoSort) && (this.sortEntities(), this._doSortEntities = !1), this.updateEntities(), this.checkEntities();
                for (var e = 0; e < this._deferredKill.length; e++) this.entities.erase(this._deferredKill[e]);
                for (var t in this._deferredKill = [], this.backgroundAnims) {
                    var i;
                    for (i in e = this.backgroundAnims[t]) e[i].update()
                }
            },
            updateEntities: function() {
                for (var e = 0; e < this.entities.length; e++) {
                    var t = this.entities[e];
                    t._killed || t.update()
                }
            },
            draw: function() {
                var e;
                for (this.clearColor && ig.system.clear(this.clearColor), this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale, this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale, e = 0; e < this.backgroundMaps.length; e++) {
                    var t = this.backgroundMaps[e];
                    if (t.foreground) break;
                    t.setScreenPos(this.screen.x, this.screen.y), t.draw()
                }
                for (this.drawEntities(); e < this.backgroundMaps.length; e++)(t = this.backgroundMaps[e]).setScreenPos(this.screen.x, this.screen.y), t.draw()
            },
            drawEntities: function() {
                for (var e = 0; e < this.entities.length; e++) this.entities[e].draw()
            },
            checkEntities: function() {
                for (var e = {}, t = 0; t < this.entities.length; t++) {
                    var i = this.entities[t];
                    if (i.type != ig.Entity.TYPE.NONE || i.checkAgainst != ig.Entity.TYPE.NONE || i.collides != ig.Entity.COLLIDES.NEVER)
                        for (var n = {}, s = Math.floor(i.pos.y / this.cellSize), a = Math.floor((i.pos.x + i.size.x) / this.cellSize) + 1, o = Math.floor((i.pos.y + i.size.y) / this.cellSize) + 1, r = Math.floor(i.pos.x / this.cellSize); r < a; r++)
                            for (var h = s; h < o; h++)
                                if (e[r])
                                    if (e[r][h]) {
                                        for (var l = e[r][h], u = 0; u < l.length; u++) i.touches(l[u]) && !n[l[u].id] && (n[l[u].id] = !0, ig.Entity.checkPair(i, l[u]));
                                        l.push(i)
                                    } else e[r][h] = [i];
                    else e[r] = {}, e[r][h] = [i]
                }
            }
        }), ig.Game.SORT = {
            Z_INDEX: function(e, t) {
                return e.zIndex - t.zIndex
            },
            POS_X: function(e, t) {
                return e.pos.x + e.size.x - (t.pos.x + t.size.x)
            },
            POS_Y: function(e, t) {
                return e.pos.y + e.size.y - (t.pos.y + t.size.y)
            }
        }
    }), ig.baked = !0, ig.module("impact.debug.menu").requires("dom.ready", "impact.system").defines(function() {
        ig.System.inject({
            run: function() {
                ig.debug.beforeRun(), this.parent(), ig.debug.afterRun()
            },
            setGameNow: function(e) {
                this.parent(e), ig.debug.ready()
            }
        }), ig.Debug = ig.Class.extend({
            options: {},
            panels: {},
            numbers: {},
            container: null,
            panelMenu: null,
            activePanel: null,
            debugTime: 0,
            debugTickAvg: .016,
            debugRealTime: Date.now(),
            init: function() {
                this.container = ig.$new("div"), this.container.className = "ig_debug", ig.$("body")[0].appendChild(this.container), this.panelMenu = ig.$new("div"), this.panelMenu.innerHTML = '<div class="ig_debug_head">Impact.Debug:</div>', this.panelMenu.className = "ig_debug_panel_menu", this.container.appendChild(this.panelMenu), this.numberContainer = ig.$new("div"), this.numberContainer.className = "ig_debug_stats", this.panelMenu.appendChild(this.numberContainer), window.console && window.console.log && window.console.assert && (ig.log = console.log.bind ? console.log.bind(console) : console.log, ig.assert = console.assert.bind ? console.assert.bind(console) : console.assert), ig.show = this.showNumber.bind(this)
            },
            addNumber: function(e) {
                var t = ig.$new("span");
                this.numberContainer.appendChild(t), this.numberContainer.appendChild(document.createTextNode(e)), this.numbers[e] = t
            },
            showNumber: function(e, t, i) {
                this.numbers[e] || this.addNumber(e, i), this.numbers[e].textContent = t
            },
            addPanel: function(e) {
                var t = new e.type(e.name, e.label);
                if (e.options)
                    for (var i = 0; i < e.options.length; i++) {
                        var n = e.options[i];
                        t.addOption(new ig.DebugOption(n.name, n.object, n.property))
                    }
                for (this.panels[t.name] = t, t.container.style.display = "none", this.container.appendChild(t.container), (e = ig.$new("div")).className = "ig_debug_menu_item", e.textContent = t.label, e.addEventListener("click", function() {
                        this.togglePanel(t)
                    }.bind(this), !1), t.menuItem = e, n = !1, i = 1; i < this.panelMenu.childNodes.length; i++) {
                    var s = this.panelMenu.childNodes[i];
                    if (s.textContent > t.label) {
                        this.panelMenu.insertBefore(e, s), n = !0;
                        break
                    }
                }
                n || this.panelMenu.appendChild(e)
            },
            showPanel: function(e) {
                this.togglePanel(this.panels[e])
            },
            togglePanel: function(e) {
                e != this.activePanel && this.activePanel && (this.activePanel.toggle(!1), this.activePanel.menuItem.className = "ig_debug_menu_item", this.activePanel = null);
                var t = "block" != e.container.style.display;
                e.toggle(t), e.menuItem.className = "ig_debug_menu_item" + (t ? " active" : ""), t && (this.activePanel = e)
            },
            ready: function() {
                for (var e in this.panels) this.panels[e].ready()
            },
            beforeRun: function() {
                var e = Date.now();
                this.debugTickAvg = .8 * this.debugTickAvg + .2 * (e - this.debugRealTime), this.debugRealTime = e, this.activePanel && this.activePanel.beforeRun()
            },
            afterRun: function() {
                var e = Date.now() - this.debugRealTime;
                this.debugTime = .8 * this.debugTime + .2 * e, this.activePanel && this.activePanel.afterRun(), this.showNumber("ms", this.debugTime.toFixed(2)), this.showNumber("fps", Math.round(1e3 / this.debugTickAvg)), this.showNumber("draws", ig.Image.drawCount), ig.game && ig.game.entities && this.showNumber("entities", ig.game.entities.length), ig.Image.drawCount = 0
            }
        }), ig.DebugPanel = ig.Class.extend({
            active: !1,
            container: null,
            options: [],
            panels: [],
            label: "",
            name: "",
            init: function(e, t) {
                this.name = e, this.label = t, this.container = ig.$new("div"), this.container.className = "ig_debug_panel " + this.name
            },
            toggle: function(e) {
                this.active = e, this.container.style.display = e ? "block" : "none"
            },
            addPanel: function(e) {
                this.panels.push(e), this.container.appendChild(e.container)
            },
            addOption: function(e) {
                this.options.push(e), this.container.appendChild(e.container)
            },
            ready: function() {},
            beforeRun: function() {},
            afterRun: function() {}
        }), ig.DebugOption = ig.Class.extend({
            name: "",
            labelName: "",
            className: "ig_debug_option",
            label: null,
            mark: null,
            container: null,
            active: !1,
            colors: {
                enabled: "#fff",
                disabled: "#444"
            },
            init: function(e, t, i) {
                this.name = e, this.object = t, this.property = i, this.active = this.object[this.property], this.container = ig.$new("div"), this.container.className = "ig_debug_option", this.label = ig.$new("span"), this.label.className = "ig_debug_label", this.label.textContent = this.name, this.mark = ig.$new("span"), this.mark.className = "ig_debug_label_mark", this.container.appendChild(this.mark), this.container.appendChild(this.label), this.container.addEventListener("click", this.click.bind(this), !1), this.setLabel()
            },
            setLabel: function() {
                this.mark.style.backgroundColor = this.active ? this.colors.enabled : this.colors.disabled
            },
            click: function(e) {
                return this.active = !this.active, this.object[this.property] = this.active, this.setLabel(), e.stopPropagation(), e.preventDefault(), !1
            }
        }), ig.debug = new ig.Debug
    }), ig.baked = !0, ig.module("impact.debug.entities-panel").requires("impact.debug.menu", "impact.entity").defines(function() {
        ig.Entity.inject({
            colors: {
                names: "#fff",
                velocities: "#0f0",
                boxes: "#f00"
            },
            draw: function() {
                if (this.parent(), ig.Entity._debugShowBoxes && (ig.system.context.strokeStyle = this.colors.boxes, ig.system.context.lineWidth = 1, ig.system.context.strokeRect(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x) - .5, ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y) - .5, this.size.x * ig.system.scale, this.size.y * ig.system.scale)), ig.Entity._debugShowVelocities) {
                    var e = this.pos.x + this.size.x / 2,
                        t = this.pos.y + this.size.y / 2;
                    this._debugDrawLine(this.colors.velocities, e, t, e + this.vel.x, t + this.vel.y)
                }
                if (ig.Entity._debugShowNames && (this.name && (ig.system.context.fillStyle = this.colors.names, ig.system.context.fillText(this.name, ig.system.getDrawPos(this.pos.x - ig.game.screen.x), ig.system.getDrawPos(this.pos.y - ig.game.screen.y))), "object" == typeof this.target))
                    for (var i in this.target)(e = ig.game.getEntityByName(this.target[i])) && this._debugDrawLine(this.colors.names, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, e.pos.x + e.size.x / 2, e.pos.y + e.size.y / 2)
            },
            _debugDrawLine: function(e, t, i, n, s) {
                ig.system.context.strokeStyle = e, ig.system.context.lineWidth = 1, ig.system.context.beginPath(), ig.system.context.moveTo(ig.system.getDrawPos(t - ig.game.screen.x), ig.system.getDrawPos(i - ig.game.screen.y)), ig.system.context.lineTo(ig.system.getDrawPos(n - ig.game.screen.x), ig.system.getDrawPos(s - ig.game.screen.y)), ig.system.context.stroke(), ig.system.context.closePath()
            }
        }), ig.Entity._debugEnableChecks = !0, ig.Entity._debugShowBoxes = !1, ig.Entity._debugShowVelocities = !1, ig.Entity._debugShowNames = !1, ig.Entity.oldCheckPair = ig.Entity.checkPair, ig.Entity.checkPair = function(e, t) {
            ig.Entity._debugEnableChecks && ig.Entity.oldCheckPair(e, t)
        }, ig.debug.addPanel({
            type: ig.DebugPanel,
            name: "entities",
            label: "Entities",
            options: [{
                name: "Checks & Collisions",
                object: ig.Entity,
                property: "_debugEnableChecks"
            }, {
                name: "Show Collision Boxes",
                object: ig.Entity,
                property: "_debugShowBoxes"
            }, {
                name: "Show Velocities",
                object: ig.Entity,
                property: "_debugShowVelocities"
            }, {
                name: "Show Names & Targets",
                object: ig.Entity,
                property: "_debugShowNames"
            }]
        })
    }), ig.baked = !0, ig.module("impact.debug.maps-panel").requires("impact.debug.menu", "impact.game", "impact.background-map").defines(function() {
        ig.Game.inject({
            loadLevel: function(e) {
                this.parent(e), ig.debug.panels.maps.load(this)
            }
        }), ig.DebugMapsPanel = ig.DebugPanel.extend({
            maps: [],
            mapScreens: [],
            init: function(e, t) {
                this.parent(e, t), this.load()
            },
            load: function(e) {
                if (this.options = [], this.panels = [], e && e.backgroundMaps.length)
                    for (this.maps = e.backgroundMaps, this.mapScreens = [], this.container.innerHTML = "", e = 0; e < this.maps.length; e++) {
                        var t = this.maps[e],
                            i = new ig.DebugPanel(e, "Layer " + e),
                            n = new ig.$new("strong");
                        n.textContent = e + ": " + t.tiles.path, i.container.appendChild(n), i.addOption(new ig.DebugOption("Enabled", t, "enabled")), i.addOption(new ig.DebugOption("Pre Rendered", t, "preRender")), i.addOption(new ig.DebugOption("Show Chunks", t, "debugChunks")), this.generateMiniMap(i, t, e), this.addPanel(i)
                    } else this.container.innerHTML = "<em>No Maps Loaded</em>"
            },
            generateMiniMap: function(e, t, i) {
                var n = ig.system.scale,
                    s = ig.$new("canvas"),
                    a = s.getContext("2d"),
                    o = t.tiles.width * n,
                    r = t.tiles.height * n,
                    h = o / t.tilesize;
                a.drawImage(t.tiles.data, 0, 0, o, r, 0, 0, h, r / t.tilesize), (a = ig.$new("canvas")).width = t.width * n, a.height = t.height * n;
                var l = a.getContext("2d");
                for (ig.game.clearColor && (l.fillStyle = ig.game.clearColor, l.fillRect(0, 0, o, r)), r = o = 0; r < t.width; r++)
                    for (var u = 0; u < t.height; u++)(o = t.data[u][r]) && l.drawImage(s, Math.floor((o - 1) * n % h), Math.floor((o - 1) * n / h) * n, n, n, r * n, u * n, n, n);
                (s = ig.$new("div")).className = "ig_debug_map_container", s.style.width = t.width * n + "px", s.style.height = t.height * n + "px", (h = ig.$new("div")).className = "ig_debug_map_screen", h.style.width = ig.system.width / t.tilesize * n - 2 + "px", h.style.height = ig.system.height / t.tilesize * n - 2 + "px", this.mapScreens[i] = h, s.appendChild(a), s.appendChild(h), e.container.appendChild(s)
            },
            afterRun: function() {
                for (var e = ig.system.scale, t = 0; t < this.maps.length; t++) {
                    var i = this.maps[t],
                        n = this.mapScreens[t];
                    if (i && n) {
                        var s = i.scroll.x / i.tilesize,
                            a = i.scroll.y / i.tilesize;
                        i.repeat && (s %= i.width, a %= i.height), n.style.left = s * e + "px", n.style.top = a * e + "px"
                    }
                }
            }
        }), ig.debug.addPanel({
            type: ig.DebugMapsPanel,
            name: "maps",
            label: "Background Maps"
        })
    }), ig.baked = !0, ig.module("impact.debug.graph-panel").requires("impact.debug.menu", "impact.system", "impact.game", "impact.image").defines(function() {
        ig.Game.inject({
            draw: function() {
                ig.graph.beginClock("draw"), this.parent(), ig.graph.endClock("draw")
            },
            update: function() {
                ig.graph.beginClock("update"), this.parent(), ig.graph.endClock("update")
            },
            checkEntities: function() {
                ig.graph.beginClock("checks"), this.parent(), ig.graph.endClock("checks")
            }
        }), ig.DebugGraphPanel = ig.DebugPanel.extend({
            clocks: {},
            marks: [],
            textY: 0,
            height: 128,
            ms: 64,
            timeBeforeRun: 0,
            init: function(e, t) {
                this.parent(e, t), this.mark16ms = (this.height - this.height / this.ms * 16).round(), this.mark33ms = (this.height - this.height / this.ms * 33).round(), this.msHeight = this.height / this.ms, this.graph = ig.$new("canvas"), this.graph.width = window.innerWidth, this.graph.height = this.height, this.container.appendChild(this.graph), this.ctx = this.graph.getContext("2d"), this.ctx.fillStyle = "#444", this.ctx.fillRect(0, this.mark16ms, this.graph.width, 1), this.ctx.fillRect(0, this.mark33ms, this.graph.width, 1), this.addGraphMark("16ms", this.mark16ms), this.addGraphMark("33ms", this.mark33ms), this.addClock("draw", "Draw", "#13baff"), this.addClock("update", "Entity Update", "#bb0fff"), this.addClock("checks", "Entity Checks & Collisions", "#a2e908"), this.addClock("lag", "System Lag", "#f26900"), ig.mark = this.mark.bind(this), ig.graph = this
            },
            addGraphMark: function(e, t) {
                var i = ig.$new("span");
                i.className = "ig_debug_graph_mark", i.textContent = e, i.style.top = t.round() + "px", this.container.appendChild(i)
            },
            addClock: function(e, t, i) {
                var n = ig.$new("span");
                n.className = "ig_debug_legend_color", n.style.backgroundColor = i;
                var s = ig.$new("span");
                s.className = "ig_debug_legend_number", s.appendChild(document.createTextNode("0"));
                var a = ig.$new("span");
                a.className = "ig_debug_legend", a.appendChild(n), a.appendChild(document.createTextNode(t + " (")), a.appendChild(s), a.appendChild(document.createTextNode("ms)")), this.container.appendChild(a), this.clocks[e] = {
                    description: t,
                    color: i,
                    current: 0,
                    start: Date.now(),
                    avg: 0,
                    html: s
                }
            },
            beginClock: function(e, t) {
                this.clocks[e].start = Date.now() + (t || 0)
            },
            endClock: function(e) {
                (e = this.clocks[e]).current = Math.round(Date.now() - e.start), e.avg = .8 * e.avg + .2 * e.current
            },
            mark: function(e, t) {
                this.active && this.marks.push({
                    msg: e,
                    color: t || "#fff"
                })
            },
            beforeRun: function() {
                this.endClock("lag"), this.timeBeforeRun = Date.now()
            },
            afterRun: function() {
                var e = Date.now() - this.timeBeforeRun;
                this.beginClock("lag", Math.max(1e3 / ig.system.fps - e, 0)), e = this.graph.width - 1;
                var t = this.height;
                for (var i in this.ctx.drawImage(this.graph, -1, 0), this.ctx.fillStyle = "#000", this.ctx.fillRect(e, 0, 1, this.height), this.ctx.fillStyle = "#444", this.ctx.fillRect(e, this.mark16ms, 1, 1), this.ctx.fillStyle = "#444", this.ctx.fillRect(e, this.mark33ms, 1, 1), this.clocks) {
                    var n = this.clocks[i];
                    if (n.html.textContent = n.avg.toFixed(2), n.color && 0 < n.current) {
                        this.ctx.fillStyle = n.color;
                        var s = n.current * this.msHeight;
                        t -= s, this.ctx.fillRect(e, t, 1, s), n.current = 0
                    }
                }
                for (this.ctx.textAlign = "right", this.ctx.textBaseline = "top", this.ctx.globalAlpha = .5, i = 0; i < this.marks.length; i++) t = this.marks[i], this.ctx.fillStyle = t.color, this.ctx.fillRect(e, 0, 1, this.height), t.msg && (this.ctx.fillText(t.msg, e - 1, this.textY), this.textY = (this.textY + 8) % 32);
                this.ctx.globalAlpha = 1, this.marks = []
            }
        }), ig.debug.addPanel({
            type: ig.DebugGraphPanel,
            name: "graph",
            label: "Performance"
        })
    }), ig.baked = !0, ig.module("impact.debug.debug").requires("impact.debug.entities-panel", "impact.debug.maps-panel", "impact.debug.graph-panel").defines(function() {}), ig.baked = !0, ig.module("plugins.splash-loader").requires("impact.loader", "impact.animation").defines(function() {
        ig.SplashLoader = ig.Loader.extend({
            bgImage: new ig.Image("media/graphics/game/backgrounds/mainbg.jpg"),
            titleImage: new ig.Image("media/graphics/game/backgrounds/maintitle.png"),
            loadingTextAlpha: 1,
            init: function(e, t) {
                this.parent(e, t), this.setupCustomAnimation(), ig.system.context.font = "18px mainfont, Helvetica, Verdana", ig.system.context.fillText("", 0, 0), MobileAdInGamePreroll.Initialize()
            },
            end: function() {
                this.loadingTextAlpha = 1, this.draw(), this.parent();
                var e = 0 <= document.URL.indexOf("localhost") ? 500 : 3e3;
                window.setTimeout("ig.system.setGame(MyGame)", e), window.clearInterval(ig.loadingScreen.animationTimer)
            },
            setupCustomAnimation: function() {
                ig.loadingScreen = this, ig.loadingScreen.animationTimer = window.setInterval("ig.loadingScreen.animate()", 100)
            },
            animate: function() {
                var e = Date.now() / 1e3 % 1;
                .5 < e && (e = 1 - e), this.loadingTextAlpha = 1 - 2 * e
            },
            draw: function() {
                this._drawStatus += (this.status - this._drawStatus) / 5;
                var e, t = ig.system.context;
                t.save(), t.fillStyle = "#000000", t.fillRect(0, 0, ig.system.width, ig.system.height), this.bgImage.width < ig.system.width && t.scale(ig.system.width / this.bgImage.width, 1), this.bgImage.draw(0, 0), t.restore(), this.titleImage.draw(ig.system.width / 2 - this.titleImage.width / 2, 0), w0 = 152, h0 = 11, x0 = (ig.system.width - w0) / 2, y0 = 570, ig.system.context.save(), t.translate(x0 + w0 / 2, y0), t.fillStyle = "#000000", t.strokeStyle = "#000000", t.lineWidth = 0, t.fillRect(-w0 / 2, 0, w0, h0), t.strokeRect(-w0 / 2, 0, w0, h0), e = this._drawStatus * w0, t.fillStyle = "#A5DE3E", t.strokeStyle = "#A5DE3E", t.lineWidth = 0, t.fillRect(-w0 / 2, 0, e, h0 / 2), t.strokeRect(-w0 / 2, 0, e, h0 / 2), t.fillStyle = "#67BD51", t.strokeStyle = "#67BD51", t.lineWidth = 0, t.fillRect(-w0 / 2, h0 / 2, e, h0 / 2), t.strokeRect(-w0 / 2, h0 / 2, e, h0 / 2), ig.system.context.fillStyle = "#000000", ig.system.context.font = "20px mainfont, Helvetica, Verdana", t = _STRINGS.Loading.Loading, e = ig.system.context.measureText("m").width, e = h0 + e + 4 * e / 10, ig.system.context.globalAlpha = this.loadingTextAlpha, ig.system.context.textAlign = "center", ig.system.context.fillText(t, 0, e), ig.system.context.restore()
            }
        })
    }), ig.baked = !0, ig.module("plugins.tween").requires("impact.entity").defines(function() {
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; ++t)
                if (this[t] === e) return t;
            return -1
        }), ig.Entity.prototype.tweens = [], ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update, ig.Entity.prototype.update = function() {
            if (this._preTweenUpdate(), 0 < this.tweens.length) {
                for (var e = [], t = 0; t < this.tweens.length; t++) this.tweens[t].update(), this.tweens[t].complete || e.push(this.tweens[t]);
                this.tweens = e
            }
        }, ig.Entity.prototype.tween = function(e, t, i) {
            return e = new ig.Tween(this, e, t, i), this.tweens.push(e), e
        }, ig.Entity.prototype.pauseTweens = function() {
            for (var e = 0; e < this.tweens.length; e++) this.tweens[e].pause()
        }, ig.Entity.prototype.resumeTweens = function() {
            for (var e = 0; e < this.tweens.length; e++) this.tweens[e].resume()
        }, ig.Entity.prototype.stopTweens = function(e) {
            for (var t = 0; t < this.tweens.length; t++) this.tweens[t].stop(e)
        }, ig.Tween = function(e, t, i, n) {
            var s = {},
                a = {},
                o = {},
                r = 0,
                h = !1,
                l = !1,
                u = !1;
            this.duration = i, this.paused = this.complete = !1, this.easing = ig.Tween.Easing.Linear.EaseNone, this.onComplete = !1, this.loop = this.delay = 0, this.loopCount = -1, ig.merge(this, n), this.loopNum = this.loopCount, this.chain = function(e) {
                u = e
            }, this.initEnd = function(e, t, i) {
                if ("object" != typeof t[e]) i[e] = t[e];
                else
                    for (subprop in t[e]) i[e] || (i[e] = {}), this.initEnd(subprop, t[e], i[e])
            }, this.initStart = function(e, t, i, n) {
                if ("object" != typeof i[e]) void 0 !== t[e] && (n[e] = i[e]);
                else
                    for (subprop in i[e]) n[e] || (n[e] = {}), void 0 !== t[e] && this.initStart(subprop, t[e], i[e], n[e])
            }, this.start = function() {
                for (var i in this.paused = this.complete = !1, this.loopNum = this.loopCount, r = 0, -1 == e.tweens.indexOf(this) && e.tweens.push(this), l = !0, h = new ig.Timer, t) this.initEnd(i, t, a);
                for (i in a) this.initStart(i, a, e, s), this.initDelta(i, o, e, a)
            }, this.initDelta = function(e, t, i, n) {
                if ("object" != typeof n[e]) t[e] = n[e] - i[e];
                else
                    for (subprop in n[e]) t[e] || (t[e] = {}), this.initDelta(subprop, t[e], i[e], n[e])
            }, this.propUpdate = function(e, t, i, n, s) {
                if ("object" != typeof i[e]) t[e] = void 0 !== i[e] ? i[e] + n[e] * s : t[e];
                else
                    for (subprop in i[e]) this.propUpdate(subprop, t[e], i[e], n[e], s)
            }, this.propSet = function(e, t, i) {
                if ("object" != typeof t[e]) i[e] = t[e];
                else
                    for (subprop in t[e]) i[e] || (i[e] = {}), this.propSet(subprop, t[e], i[e])
            }, this.update = function() {
                if (!l) return !1;
                if (this.delay) {
                    if (h.delta() < this.delay) return;
                    this.delay = 0, h.reset()
                }
                if (this.paused || this.complete) return !1;
                var t = 1 < (t = (h.delta() + r) / this.duration) ? 1 : t,
                    i = this.easing(t);
                for (property in o) this.propUpdate(property, e, s, o, i);
                if (1 <= t) {
                    if (0 == this.loopNum || !this.loop) return this.complete = !0, this.onComplete && this.onComplete(), u && u.start(), !1;
                    if (this.loop == ig.Tween.Loop.Revert) {
                        for (property in s) this.propSet(property, s, e);
                        r = 0, h.reset(), -1 != this.loopNum && this.loopNum--
                    } else if (this.loop == ig.Tween.Loop.Reverse) {
                        for (property in t = {}, i = {}, ig.merge(t, a), ig.merge(i, s), ig.merge(s, t), ig.merge(a, i), a) this.initDelta(property, o, e, a);
                        r = 0, h.reset(), -1 != this.loopNum && this.loopNum--
                    }
                }
            }, this.pause = function() {
                this.paused = !0, r += h.delta()
            }, this.resume = function() {
                this.paused = !1, h.reset()
            }, this.stop = function(e) {
                e && (this.loop = this.complete = this.paused = !1, r += i, this.update()), this.complete = !0
            }
        }, ig.Tween.Loop = {
            Revert: 1,
            Reverse: 2
        }, ig.Tween.Easing = {
            Linear: {},
            Quadratic: {},
            Cubic: {},
            Quartic: {},
            Quintic: {},
            Sinusoidal: {},
            Exponential: {},
            Circular: {},
            Elastic: {},
            Back: {},
            Bounce: {}
        }, ig.Tween.Easing.Linear.EaseNone = function(e) {
            return e
        }, ig.Tween.Easing.Quadratic.EaseIn = function(e) {
            return e * e
        }, ig.Tween.Easing.Quadratic.EaseOut = function(e) {
            return -e * (e - 2)
        }, ig.Tween.Easing.Quadratic.EaseInOut = function(e) {
            return 1 > (e *= 2) ? .5 * e * e : -.5 * (--e * (e - 2) - 1)
        }, ig.Tween.Easing.Cubic.EaseIn = function(e) {
            return e * e * e
        }, ig.Tween.Easing.Cubic.EaseOut = function(e) {
            return --e * e * e + 1
        }, ig.Tween.Easing.Cubic.EaseInOut = function(e) {
            return 1 > (e *= 2) ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
        }, ig.Tween.Easing.Quartic.EaseIn = function(e) {
            return e * e * e * e
        }, ig.Tween.Easing.Quartic.EaseOut = function(e) {
            return -(--e * e * e * e - 1)
        }, ig.Tween.Easing.Quartic.EaseInOut = function(e) {
            return 1 > (e *= 2) ? .5 * e * e * e * e : -.5 * ((e -= 2) * e * e * e - 2)
        }, ig.Tween.Easing.Quintic.EaseIn = function(e) {
            return e * e * e * e * e
        }, ig.Tween.Easing.Quintic.EaseOut = function(e) {
            return (e -= 1) * e * e * e * e + 1
        }, ig.Tween.Easing.Quintic.EaseInOut = function(e) {
            return 1 > (e *= 2) ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
        }, ig.Tween.Easing.Sinusoidal.EaseIn = function(e) {
            return 1 - Math.cos(e * Math.PI / 2)
        }, ig.Tween.Easing.Sinusoidal.EaseOut = function(e) {
            return Math.sin(e * Math.PI / 2)
        }, ig.Tween.Easing.Sinusoidal.EaseInOut = function(e) {
            return -.5 * (Math.cos(Math.PI * e) - 1)
        }, ig.Tween.Easing.Exponential.EaseIn = function(e) {
            return 0 == e ? 0 : Math.pow(2, 10 * (e - 1))
        }, ig.Tween.Easing.Exponential.EaseOut = function(e) {
            return 1 == e ? 1 : 1 - Math.pow(2, -10 * e)
        }, ig.Tween.Easing.Exponential.EaseInOut = function(e) {
            return 0 == e ? 0 : 1 == e ? 1 : 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        }, ig.Tween.Easing.Circular.EaseIn = function(e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }, ig.Tween.Easing.Circular.EaseOut = function(e) {
            return Math.sqrt(1 - --e * e)
        }, ig.Tween.Easing.Circular.EaseInOut = function(e) {
            return 1 > (e /= .5) ? -.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        }, ig.Tween.Easing.Elastic.EaseIn = function(e) {
            var t, i = .1,
                n = .4;
            return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || 1 > i ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n))
        }, ig.Tween.Easing.Elastic.EaseOut = function(e) {
            var t, i = .1,
                n = .4;
            return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || 1 > i ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * e) * Math.sin(2 * (e - t) * Math.PI / n) + 1)
        }, ig.Tween.Easing.Elastic.EaseInOut = function(e) {
            var t, i = .1,
                n = .4;
            return 0 == e ? 0 : 1 == e ? 1 : (n || (n = .3), !i || 1 > i ? (i = 1, t = n / 4) : t = n / (2 * Math.PI) * Math.asin(1 / i), 1 > (e *= 2) ? -.5 * i * Math.pow(2, 10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) : .5 * i * Math.pow(2, -10 * (e -= 1)) * Math.sin(2 * (e - t) * Math.PI / n) + 1)
        }, ig.Tween.Easing.Back.EaseIn = function(e) {
            return e * e * (2.70158 * e - 1.70158)
        }, ig.Tween.Easing.Back.EaseOut = function(e) {
            return (e -= 1) * e * (2.70158 * e + 1.70158) + 1
        }, ig.Tween.Easing.Back.EaseInOut = function(e) {
            return 1 > (e *= 2) ? .5 * e * e * (3.5949095 * e - 2.5949095) : .5 * ((e -= 2) * e * (3.5949095 * e + 2.5949095) + 2)
        }, ig.Tween.Easing.Bounce.EaseIn = function(e) {
            return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - e)
        }, ig.Tween.Easing.Bounce.EaseOut = function(e) {
            return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }, ig.Tween.Easing.Bounce.EaseInOut = function(e) {
            return .5 > e ? .5 * ig.Tween.Easing.Bounce.EaseIn(2 * e) : .5 * ig.Tween.Easing.Bounce.EaseOut(2 * e - 1) + .5
        }
    }), ig.baked = !0, ig.module("plugins.url-parameters").defines(function() {
        ig.UrlParameters = ig.Class.extend({
            init: function() {
                switch (getQueryVariable("iphone")) {
                    case "true":
                        ig.ua.iPhone = !0, console.log("iPhone mode")
                }
                var e = getQueryVariable("webview");
                if (e) switch (e) {
                    case "true":
                        ig.ua.is_uiwebview = !0, console.log("webview mode")
                }
                if (e = getQueryVariable("debug")) switch (e) {
                    case "true":
                        ig.game.showDebugMenu(), console.log("debug mode")
                }
                switch (getQueryVariable("view")) {
                    case "stats":
                        ig.game.resetPlayerStats(), ig.game.endGame()
                }
                getQueryVariable("ad")
            }
        })
    }), ig.baked = !0, ig.module("plugins.jukebox").defines(function() {
        ig.Jukebox = ig.Class.extend({
            init: function() {
                this.player = new jukebox.Player({
                    resources: ["media/audio/music/bgm.mp3", "media/audio/music/bgm.ogg"],
                    spritemap: {
                        music: {
                            start: 0,
                            end: 13.69,
                            loop: !0
                        }
                    }
                })
            }
        })
    }), ig.baked = !0, ig.module("plugins.director").requires("impact.impact").defines(function() {
        ig.Director = ig.Class.extend({
            init: function(e, t) {
                this.game = e, this.levels = [], this.currentLevel = 0, this.append(t)
            },
            loadLevel: function(e) {
                for (key in dynamicClickableEntityDivs) ig.game.hideOverlay([key]);
                return this.currentLevel = e, this.game.loadLevel(this.levels[e]), !0
            },
            loadLevelWithoutEntities: function(e) {
                return this.currentLevel = e, this.game.loadLevelWithoutEntities(this.levels[e]), !0
            },
            append: function(e) {
                return newLevels = [], "object" == typeof e && (e.constructor === [].constructor ? newLevels = e : newLevels[0] = e, this.levels = this.levels.concat(newLevels), !0)
            },
            nextLevel: function() {
                return this.currentLevel + 1 < this.levels.length && this.loadLevel(this.currentLevel + 1)
            },
            previousLevel: function() {
                return 0 <= this.currentLevel - 1 && this.loadLevel(this.currentLevel - 1)
            },
            jumpTo: function(e) {
                var t = null;
                for (i = 0; i < this.levels.length; i++) this.levels[i] == e && (t = i);
                return 0 <= t && this.loadLevel(t)
            },
            firstLevel: function() {
                return this.loadLevel(0)
            },
            lastLevel: function() {
                return this.loadLevel(this.levels.length - 1)
            },
            reloadLevel: function() {
                return this.loadLevel(this.currentLevel)
            }
        })
    }), ig.baked = !0, ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
        ig.Storage = ig.Class.extend({
            staticInstantiate: function() {
                return ig.Storage.instance ? ig.Storage.instance : null
            },
            init: function() {
                ig.Storage.instance = this
            },
            isCapable: function() {
                return void 0 !== window.localStorage
            },
            isSet: function(e) {
                return null !== this.get(e)
            },
            initUnset: function(e, t) {
                null === this.get(e) && this.set(e, t)
            },
            get: function(e) {
                if (!this.isCapable()) return null;
                try {
                    return JSON.parse(localStorage.getItem(e))
                } catch (t) {
                    return window.localStorage.getItem(e)
                }
            },
            getInt: function(e) {
                return ~~this.get(e)
            },
            getFloat: function(e) {
                return parseFloat(this.get(e))
            },
            getBool: function(e) {
                return !!this.get(e)
            },
            key: function(e) {
                return this.isCapable() ? window.localStorage.key(e) : null
            },
            set: function(e, t) {
                if (!this.isCapable()) return null;
                try {
                    window.localStorage.setItem(e, JSON.stringify(t))
                } catch (e) {
                    console.log(e)
                }
            },
            setHighest: function(e, t) {
                t > this.getFloat(e) && this.set(e, t)
            },
            remove: function(e) {
                if (!this.isCapable()) return null;
                window.localStorage.removeItem(e)
            },
            clear: function() {
                if (!this.isCapable()) return null;
                window.localStorage.clear()
            }
        })
    }), this.START_BRANDING_SPLASH, ig.baked = !0, ig.module("plugins.branding.splash").requires("impact.impact", "impact.entity").defines(function() {
        ig.BrandingSplash = ig.Class.extend({
            init: function() {
                ig.game.spawnEntity(EntityBranding, 0, 0)
            }
        }), EntityBranding = ig.Entity.extend({
            gravityFactor: 0,
            size: {
                x: 32,
                y: 32
            },
            splash_320x480: new ig.AnimationSheet("branding/splash_320x480.png", 320, 200),
            splash_480x640: new ig.AnimationSheet("branding/splash_480x640.png", 480, 240),
            init: function(e, t, i) {
                this.parent(e, t, i), 320 >= ig.system.width ? (this.size.x = 320, this.size.y = 200, this.anims.idle = new ig.Animation(this.splash_320x480, 0, [0], !0)) : (this.size.x = 480, this.size.y = 240, this.anims.idle = new ig.Animation(this.splash_480x640, 0, [0], !0)), this.pos.x = (ig.system.width - this.size.x) / 2, this.pos.y = -this.size.y - 200, this.endPosY = (ig.system.height - this.size.y) / 2, e = this.tween({
                    pos: {
                        y: this.endPosY
                    }
                }, .5, {
                    easing: ig.Tween.Easing.Bounce.EaseIn
                }), t = this.tween({}, 2.5, {
                    onComplete: function() {
                        ig.game.director.loadLevel(ig.game.director.currentLevel)
                    }
                }), e.chain(t), e.start(), this.currentAnim = this.anims.idle
            },
            createClickableLayer: function() {
                console.log("Build clickable layer"), this.checkClickableLayer("branding-splash", _SETTINGS.Branding.Logo.Link, !0)
            },
            doesClickableLayerExist: function(e) {
                for (k in dynamicClickableEntityDivs)
                    if (k == e) return !0;
                return !1
            },
            checkClickableLayer: function(e, t, i) {
                "undefined" == typeof wm && (this.doesClickableLayerExist(e) ? (ig.game.showOverlay([e]), $("#" + e).find("[href]").attr("href", t)) : this.createClickableOutboundLayer(e, t, "media/graphics/misc/invisible.png", i))
            },
            createClickableOutboundLayer: function(e, t, i, n) {
                var s = ig.$new("div");
                if (s.id = e, document.body.appendChild(s), $("#" + s.id).css("float", "left"), $("#" + s.id).css("position", "absolute"), ig.ua.mobile) {
                    var a = window.innerHeight / mobileHeight,
                        o = window.innerWidth / mobileWidth;
                    $("#" + s.id).css("left", this.pos.x * o), $("#" + s.id).css("top", this.pos.y * a), $("#" + s.id).css("width", this.size.x * o), $("#" + s.id).css("height", this.size.y * a)
                } else a = w / 2 - destW / 2, o = h / 2 - destH / 2, console.log(a, o), $("#" + s.id).css("left", a + this.pos.x * multiplier), $("#" + s.id).css("top", o + this.pos.y * multiplier), $("#" + s.id).css("width", this.size.x * multiplier), $("#" + s.id).css("height", this.size.y * multiplier);
                n ? $("#" + s.id).html("<a target='_blank' href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>") : $("#" + s.id).html("<a href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>"), dynamicClickableEntityDivs[e] = {}, dynamicClickableEntityDivs[e].width = this.size.x * multiplier, dynamicClickableEntityDivs[e].height = this.size.y * multiplier, dynamicClickableEntityDivs[e].entity_pos_x = this.pos.x, dynamicClickableEntityDivs[e].entity_pos_y = this.pos.y
            },
            draw: function() {
                ig.system.context.fillStyle = "#ffffff", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), this.parent()
            }
        })
    }), this.END_BRANDING_SPLASH, ig.baked = !0, ig.module("game.entities.branding-logo-placeholder").requires("impact.entity").defines(function() {
        EntityBrandingLogoPlaceholder = ig.Entity.extend({
            gravityFactor: 0,
            size: {
                x: 32,
                y: 32
            },
            _wmDrawBox: !0,
            _wmBoxColor: "rgba(0, 0, 255, 0.7)",
            init: function(e, t, i) {
                if (this.parent(e, t, i), i) switch (console.log("settings found ... using that div layer name"), e = i.div_layer_name, console.log("settings.centralize:", i.centralize), i.centralize) {
                    case "true":
                        console.log("centralize true"), centralize = !0;
                        break;
                    case "false":
                        console.log("centralize false"), centralize = !1;
                        break;
                    default:
                        console.log("default ... centralize false"), centralize = !1
                } else e = "branding-logo", centralize = !1;
                if ("undefined" == typeof wm) {
                    if (_SETTINGS.Branding.Logo.Enabled) try {
                        ig.game.spawnEntity(EntityBrandingLogo, this.pos.x, this.pos.y, {
                            div_layer_name: e,
                            centralize: centralize
                        })
                    } catch (e) {
                        console.log(e)
                    }
                    this.kill()
                }
            }
        })
    }), this.START_BRANDING_LOGO, ig.baked = !0, ig.module("game.entities.branding-logo").requires("impact.entity").defines(function() {
        EntityBrandingLogo = ig.Entity.extend({
            gravityFactor: 0,
            logo: new ig.AnimationSheet("branding/logo.png", _SETTINGS.Branding.Logo.Width, _SETTINGS.Branding.Logo.Height),
            size: {
                x: 32,
                y: 32
            },
            zIndex: 10001,
            init: function(e, t, i) {
                this.parent(e, t, i), "undefined" == typeof wm && (_SETTINGS.Branding.Logo.Enabled ? (this.size.x = _SETTINGS.Branding.Logo.Width, this.size.y = _SETTINGS.Branding.Logo.Height, i && i.centralize && (this.pos.x = ig.system.width / 2 - this.size.x / 2, console.log("centralize true ... centering branded logo ..."))) : this.kill()), this.anims.idle = new ig.Animation(this.logo, 0, [0], !0), this.currentAnim = this.anims.idle, i ? (console.log("branding settings found ... using that div layer name"), e = i.div_layer_name) : e = "branding-logo", _SETTINGS.Branding.Logo.LinkEnabled && (console.log("logo link enabled"), this.checkClickableLayer(e, _SETTINGS.Branding.Logo.Link, !0)), console.log("branding logo spawed ...")
            },
            doesClickableLayerExist: function(e) {
                for (k in dynamicClickableEntityDivs)
                    if (k == e) return !0;
                return !1
            },
            checkClickableLayer: function(e, t, i) {
                "undefined" == typeof wm && (this.doesClickableLayerExist(e) ? (ig.game.showOverlay([e]), $("#" + e).find("[href]").attr("href", t)) : this.createClickableOutboundLayer(e, t, "media/graphics/misc/invisible.png", i))
            },
            createClickableOutboundLayer: function(e, t, i, n) {
                var s = ig.$new("div");
                if (s.id = e, document.body.appendChild(s), $("#" + s.id).css("float", "left"), $("#" + s.id).css("position", "absolute"), ig.ua.mobile) {
                    var a = window.innerHeight / mobileHeight,
                        o = window.innerWidth / mobileWidth;
                    $("#" + s.id).css("left", this.pos.x * o), $("#" + s.id).css("top", this.pos.y * a), $("#" + s.id).css("width", this.size.x * o), $("#" + s.id).css("height", this.size.y * a)
                } else a = w / 2 - destW / 2, o = h / 2 - destH / 2, console.log(a, o), $("#" + s.id).css("left", a + this.pos.x * multiplier), $("#" + s.id).css("top", o + this.pos.y * multiplier), $("#" + s.id).css("width", this.size.x * multiplier), $("#" + s.id).css("height", this.size.y * multiplier);
                n ? $("#" + s.id).html("<a target='_blank' href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>") : $("#" + s.id).html("<a href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>"), dynamicClickableEntityDivs[e] = {}, dynamicClickableEntityDivs[e].width = this.size.x * multiplier, dynamicClickableEntityDivs[e].height = this.size.y * multiplier, dynamicClickableEntityDivs[e].entity_pos_x = this.pos.x, dynamicClickableEntityDivs[e].entity_pos_y = this.pos.y
            }
        })
    }), this.END_BRANDING_LOGO, ig.baked = !0, ig.module("game.entities.button-more-games").requires("impact.entity").defines(function() {
        EntityButtonMoreGames = ig.Entity.extend({
            size: {
                x: 176,
                y: 116
            },
            zIndex: 750,
            type: ig.Entity.TYPE.B,
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                setTimeout(this.spawnDiv(), 5)
            },
            spawnDiv: function() {
                if (!this.canSpawnDiv)
                    if (this.canSpawnDiv = !0, _SETTINGS.MoreGames.Enabled) {
                        var e;
                        if (e = this.divLayerName ? this.divLayerName : "more-games", this.checkClickableLayer(e, _SETTINGS.MoreGames.Link, !0), ig.ua.mobile) {
                            var t = window.innerHeight / mobileHeight,
                                i = window.innerWidth / mobileWidth;
                            $("#" + e).css("left", this.pos.x * i), $("#" + e).css("top", this.pos.y * t), $("#" + e).css("width", this.size.x * i), $("#" + e).css("height", this.size.y * t)
                        } else t = document.getElementById("game").offsetLeft, i = document.getElementById("game").offsetTop, $("#" + e).css("left", t + this.pos.x * multiplier), $("#" + e).css("top", i + this.pos.y * multiplier), $("#" + e).css("width", this.size.x * multiplier), $("#" + e).css("height", this.size.y * multiplier)
                    } else this.kill()
            },
            doesClickableLayerExist: function(e) {
                for (k in dynamicClickableEntityDivs)
                    if (k == e) return !0;
                return !1
            },
            checkClickableLayer: function(e, t, i) {
                "undefined" == typeof wm && (this.doesClickableLayerExist(e) ? (ig.game.showOverlay([e]), $("#" + e).find("[href]").attr("href", t)) : this.createClickableOutboundLayer(e, t, "media/graphics/misc/invisible.png", i))
            },
            createClickableOutboundLayer: function(e, t, i, n) {
                var s = ig.$new("div");
                if (s.id = e, document.body.appendChild(s), $("#" + s.id).css("float", "left"), $("#" + s.id).css("position", "absolute"), ig.ua.mobile) {
                    var a = window.innerHeight / mobileHeight,
                        o = window.innerWidth / mobileWidth;
                    $("#" + s.id).css("left", this.pos.x * o), $("#" + s.id).css("top", this.pos.y * a), $("#" + s.id).css("width", this.size.x * o), $("#" + s.id).css("height", this.size.y * a)
                } else a = document.getElementById("game").offsetLeft, o = document.getElementById("game").offsetTop, $("#" + s.id).css("left", a + this.pos.x * multiplier), $("#" + s.id).css("top", o + this.pos.y * multiplier), $("#" + s.id).css("width", this.size.x * multiplier), $("#" + s.id).css("height", this.size.y * multiplier);
                n ? $("#" + s.id).html("<a target='_blank' href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>") : $("#" + s.id).html("<a href='" + t + "'><img style='width:100%;height:100%' src='" + i + "'></a>"), dynamicClickableEntityDivs[e] = {}, dynamicClickableEntityDivs[e].width = this.size.x * multiplier, dynamicClickableEntityDivs[e].height = this.size.y * multiplier, dynamicClickableEntityDivs[e].entity_pos_x = this.pos.x, dynamicClickableEntityDivs[e].entity_pos_y = this.pos.y
            },
            hide: function() {
                var e = "more-games";
                this.divLayerName && (e = this.divLayerName), document.getElementById(e).style.visibility = "hidden", $("#" + e).hide()
            },
            show: function() {
                var e = "more-games";
                this.divLayerName && (e = this.divLayerName), document.getElementById(e).style.visibility = "visible", $("#" + e).show()
            },
            clicking: function() {},
            released: function() {},
            over: function() {},
            leave: function() {}
        })
    }), ig.baked = !0, ig.module("game.entities.opening-shield").requires("impact.entity").defines(function() {
        EntityOpeningShield = ig.Entity.extend({
            size: {
                x: 48,
                y: 48
            },
            move: 0,
            mIconAnim: 0,
            shieldAnim: 0,
            titleAnim: 0,
            shieldImage: new ig.Image("media/graphics/opening/shield.png"),
            mIconImage: new ig.Image("media/graphics/opening/m_icon.png"),
            titleImage: new ig.Image("media/graphics/opening/title.png"),
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                if (!ig.wm)
                    if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                        this.initTimer = new ig.Timer(.1);
                        try {
                            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.openingSound)
                        } catch (e) {
                            console.log(e)
                        }
                    } else ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
            },
            update: function() {
                this.parent(), this.updateOriginalShieldOpening()
            },
            draw: function() {
                this.parent(), ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawOriginalShieldOpening())
            },
            updateOriginalShieldOpening: function() {
                this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.sheildTimer = new ig.Timer(.05)), this.sheildTimer && 0 < this.sheildTimer.delta() && (3 > this.shieldAnim ? (this.shieldAnim++, this.sheildTimer.reset()) : (this.sheildTimer = null, this.moveTimer = new ig.Timer(.001), this.mIconTimer = new ig.Timer(.05), this.titleTimer = new ig.Timer(.15))), this.moveTimer && 0 < this.moveTimer.delta() && (this.move += .3, this.moveTimer.reset()), this.mIconTimer && 0 < this.mIconTimer.delta() && (12 > this.mIconAnim ? (this.mIconAnim++, this.moveTimer.reset()) : this.mIconTimer = null), this.titleTimer && 0 < this.titleTimer.delta() && (11 > this.titleAnim ? (this.titleAnim++, this.titleTimer.reset()) : (this.titleTimer = null, this.nextLevelTimer = new ig.Timer(1))), this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
            },
            drawOriginalShieldOpening: function() {
                if (this.moveTimer) {
                    var e = ig.system.context;
                    e.save();
                    var t = ig.system.width / 2,
                        i = ig.system.height / 2;
                    e.translate(t, i), e.rotate(this.move * Math.PI / 180), e.beginPath(), e.moveTo(0, 0);
                    for (var n = 0, s = 1; 48 >= s; s += 1) e.lineTo(0 + 800 * Math.cos(2 * s * Math.PI / 48), 0 + 800 * Math.sin(2 * s * Math.PI / 48)), 2 == ++n && (n = 0, e.lineTo(0, 0));
                    e.translate(-t, -i), (t = e.createRadialGradient(t, i, 100, t, i, 250)).addColorStop(0, "rgba(255,255,255,0.1)"), t.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = t, e.fill(), e.restore()
                }
                this.shieldImage.drawTile(ig.system.width / 2 - 91, 0 - (768 - ig.system.height) / 2, this.shieldAnim, 182, 768), this.moveTimer && (this.mIconImage.drawTile(ig.system.width / 2 - 96, ig.system.height / 2 - 70, this.mIconAnim, 166, 160), this.titleImage.drawTile(ig.system.width / 2 - 204, ig.system.height / 2 + 100, this.titleAnim, 409, 76)), ig.system.context.globalAlpha = 1
            }
        })
    }), ig.baked = !0, ig.module("game.entities.opening-kitty").requires("impact.entity").defines(function() {
        EntityOpeningKitty = ig.Entity.extend({
            size: {
                x: 48,
                y: 48
            },
            kittyAnim: -1,
            kittyImage: new ig.Image("media/graphics/opening/kitty.png"),
            kittyTitleImage: new ig.Image("media/graphics/opening/kittytitle.png"),
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                if (!ig.wm)
                    if (_SETTINGS.DeveloperBranding.Splash.Enabled) {
                        this.initTimer = new ig.Timer(.1);
                        try {
                            ig.soundHandler.playSound(ig.soundHandler.SOUNDID.kittyopeningSound)
                        } catch (e) {
                            console.log(e)
                        }
                    } else ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1, this.kill()
            },
            update: function() {
                this.parent(), this.updateKittyOpening()
            },
            draw: function() {
                this.parent(), ig.global.wm || (this.nextLevelTimer && 0 > this.nextLevelTimer.delta() && (ig.system.context.globalAlpha = -this.nextLevelTimer.delta()), this.drawKittyOpening())
            },
            updateKittyOpening: function() {
                this.initTimer && 0 < this.initTimer.delta() && (this.initTimer = null, this.kittyTimer = new ig.Timer(.15)), this.kittyTimer && 0 < this.kittyTimer.delta() && (7 > this.kittyAnim ? (this.kittyAnim++, this.kittyTimer.reset()) : (this.kittyTimer = null, this.nextLevelTimer = new ig.Timer(2))), this.nextLevelTimer && 0 < this.nextLevelTimer.delta() && (this.nextLevelTimer = null, ig.game.director.nextLevel(), ig.system.context.globalAlpha = 1)
            },
            drawKittyOpening: function() {
                var e = ig.system.context.createLinearGradient(0, 0, 0, ig.system.height);
                e.addColorStop(0, "#ffed94"), e.addColorStop(1, "#ffcd85"), ig.system.context.fillStyle = e, ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), 0 <= this.kittyAnim && (this.kittyImage.drawTile(ig.system.width / 2 - this.kittyImage.width / 8, ig.system.height / 2 - this.kittyImage.height / 4, this.kittyAnim, 218, 325), this.kittyTitleImage.drawTile(ig.system.width / 2 - this.kittyTitleImage.width / 2, ig.system.height / 2 + this.kittyImage.height / 4 + 10, this.kittyAnim, 380, 37)), ig.system.context.globalAlpha = 1
            }
        })
    }), ig.baked = !0, ig.module("game.entities.pointer").requires("impact.entity").defines(function() {
        EntityPointer = ig.Entity.extend({
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.B,
            isClicking: !1,
            isHovering: !1,
            firstClick: !1,
            isReleased: !1,
            hoveringItem: null,
            objectArray: [],
            ignorePause: !0,
            zIndex: 5e3,
            check: function(e) {
                this.objectArray.push(e)
            },
            clickObject: function(e) {
                this.isClicking && !this.firstClick && "function" == typeof e.clicked && e.clicked(), this.firstClick && !this.isReleased && "function" == typeof e.clicking && e.clicking(), this.firstClick && this.isReleased && "function" == typeof e.released && e.released()
            },
            refreshPos: function() {
                if (ig.ua.mobile) {
                    var e = window.innerHeight / mobileHeight;
                    this.pos.x = ig.input.mouse.x / (window.innerWidth / mobileWidth) - this.size.x / 2 + ig.game.screen.x, this.pos.y = ig.input.mouse.y / e - this.size.y / 2
                } else this.pos.x = ig.input.mouse.x / multiplier - this.size.x / 2 + ig.game.screen.x, this.pos.y = ig.input.mouse.y / multiplier - this.size.y / 2
            },
            update: function() {
                this.refreshPos();
                var e = null,
                    t = -1;
                for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > t && (t = this.objectArray[a].zIndex, e = this.objectArray[a]);
                null != e ? (null != this.hoveringItem && "function" == typeof this.hoveringItem.leave && this.hoveringItem != e && this.hoveringItem.leave(), null != this.hoveringItem && "function" == typeof this.hoveringItem.over && this.hoveringItem == e && this.hoveringItem.over(), this.hoveringItem = e, this.clickObject(e), this.objectArray = []) : null != this.hoveringItem && "function" == typeof this.hoveringItem.leave && (this.hoveringItem.leave(), this.hoveringItem = null), this.isClicking && !this.firstClick ? this.firstClick = !0 : this.isReleased && this.firstClick && (this.firstClick = !1), this.isClicking = ig.input.pressed("click"), this.isReleased = ig.input.released("click")
            }
        })
    }), ig.baked = !0, ig.module("game.entities.pointer-selector").requires("game.entities.pointer").defines(function() {
        EntityPointerSelector = EntityPointer.extend({
            zIndex: 5e3,
            _wmDrawBox: !0,
            _wmBoxColor: "rgba(0, 0, 255, 0.7)",
            size: {
                x: 15,
                y: 15
            },
            init: function(e, t, i) {
                this.parent(e, t, i)
            }
        })
    }), ig.baked = !0, ig.module("game.levels.opening").requires("impact.image", "game.entities.opening-kitty").defines(function() {
        LevelOpening = {
            entities: [{
                type: "EntityOpeningKitty",
                x: 520,
                y: 212
            }],
            layer: []
        }
    }), ig.baked = !0, ig.module("game.entities.audio-toggle").requires("impact.entity").defines(function() {
        EntityAudioToggle = ig.Entity.extend({
            zIndex: 3e3,
            toggleAnim: new ig.Animation(new ig.AnimationSheet("media/graphics/game/ui/mainmenu/mute.png", 54, 56), 0, [0, 1, 2, 3]),
            togglePos: {
                x: 0,
                y: 0
            },
            toggleRect: {
                x: -27,
                y: -28,
                w: 54,
                h: 56
            },
            toggleOffset: {
                x: 0,
                y: 0
            },
            toggleAlpha: 1,
            toggleDown: !1,
            pointer: null,
            control: null,
            hidden: !1,
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                this.pointer = ig.game.getEntitiesByType(EntityPointer)[0], (this.control = ig.game.getEntitiesByType(EntityHomeControl)[0]) || (this.control = ig.game.getEntitiesByType(EntityGameControl)[0]), this.control || (this.control = ig.game.getEntitiesByType(EntityShopControl)[0])
            },
            draw: function() {
                if (!this.hidden) {
                    var e = ig.system.context,
                        t = this.pos.x + this.togglePos.x + this.toggleOffset.x + this.toggleRect.x,
                        i = this.pos.y + this.togglePos.y + this.toggleOffset.y + this.toggleRect.y;
                    this.toggleDown && (i += 2), e.save(), e.globalAlpha = this.toggleAlpha, this.toggleAnim.draw(t, i), e.restore()
                }
            },
            update: function() {
                this.hidden || this.checkClicks()
            },
            aabbCheck: function(e, t) {
                return e.x + e.w > t.x && e.x < t.x + t.w && e.y + e.h > t.y && e.y < t.y + t.h
            },
            checkClicks: function() {
                this.pointer.refreshPos();
                var e = {};
                e.x = this.pointer.pos.x + this.pointer.size.x / 2, e.y = this.pointer.pos.y + this.pointer.size.y / 2, e.w = 1, e.h = 1;
                var t = {};
                t.x = this.pos.x + this.togglePos.x + this.toggleRect.x, t.y = this.pos.y + this.togglePos.y + this.toggleRect.y, t.w = this.toggleRect.w, t.h = this.toggleRect.h, this.toggleDown = !1, this.toggleAnim.tile = 0, ig.game.muted || (this.toggleAnim.tile = 1), this.aabbCheck(e, t) && (ig.ua.mobile || (this.toggleAnim.tile = 2), ig.input.state("click") && (this.toggleDown = !0, this.toggleAnim.tile = 3), ig.input.released("click") && (this.toggleDown = !1, ig.ua.mobile || (this.toggleAnim.tile = 2), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button), ig.game.muted ? this.unmuteAudio() : this.muteAudio(), ig.ua.mobile && (this.toggleAnim.tile = 0, ig.game.muted || (this.toggleAnim.tile = 1))))
            },
            muteAudio: function() {
                ig.game.muted = !0, ig.soundHandler.setMusicVolume(0), ig.soundHandler.setSfxVolume(0), ig.game.savePlayerStats()
            },
            unmuteAudio: function() {
                ig.game.muted = !1, ig.soundHandler.setMusicVolume(ig.game.musicVolume), ig.soundHandler.setSfxVolume(ig.game.sfxVolume), ig.game.savePlayerStats()
            }
        })
    }), ig.baked = !0, ig.module("game.entities.shop-control").requires("impact.entity").defines(function() {
        EntityShopControl = ig.Entity.extend({
            zIndex: 2e3,
            pointer: null,
            control: null,
            coinImage: new ig.Image("media/graphics/game/ui/game/coinicon.png"),
            coinRect: {
                x: 20,
                y: 75,
                w: 41,
                h: 42
            },
            coinCountPos: {
                x: 75,
                y: 106
            },
            lifeImage: new ig.Image("media/graphics/game/ui/game/lifeicon.png"),
            lifeRect: {
                x: 320,
                y: 350,
                w: 40,
                h: 40
            },
            titleImage: new ig.Image("media/graphics/game/ui/game/shop-title.png"),
            titlePos: {
                x: 243,
                y: 46
            },
            panelGreyImage: new ig.Image("media/graphics/game/ui/game/shop-panel0.png"),
            panelImage: new ig.Image("media/graphics/game/ui/game/shop-panel1.png"),
            panelPos: {
                x: 202,
                y: 179
            },
            panelOffset: {
                x: 0,
                y: 0
            },
            panelAlpha: 1,
            itemImage: [new ig.Image("media/graphics/game/ui/game/skateboard.png"), new ig.Image("media/graphics/game/ui/game/skates.png"), new ig.Image("media/graphics/game/ui/game/rocket.png"), new ig.Image("media/graphics/game/ui/game/carpet.png"), new ig.Image("media/graphics/game/ui/game/hoverboard.png")],
            itemId: 0,
            itemPos: {
                x: 254,
                y: 257
            },
            itemTextPos: {
                x: 320,
                y: 248
            },
            arrowSheet: new ig.AnimationSheet("media/graphics/game/ui/game/arrow.png", 50, 46),
            arrowRightAnimUp: null,
            arrowRightAnimDown: null,
            arrowRightAnim: null,
            arrowRightRect: {
                x: 470,
                y: 270,
                w: 50,
                h: 46
            },
            arrowLeftAnimUp: null,
            arrowLeftAnimDown: null,
            arrowLeftAnim: null,
            arrowLeftRect: {
                x: 120,
                y: 270,
                w: 50,
                h: 46
            },
            buttonSheet: new ig.AnimationSheet("media/graphics/game/ui/game/shop-button.png", 119, 65),
            buttonAnimUp: null,
            buttonAnimDown: null,
            buttonAnim: null,
            buttonRect: {
                x: 259,
                y: 420,
                w: 119,
                h: 65
            },
            buttonOffset: {
                x: 0,
                y: 0
            },
            homeSheet: new ig.AnimationSheet("media/graphics/game/ui/game/home.png", 50, 50),
            homeAnimUp: null,
            homeAnimDown: null,
            homeAnim: null,
            homeRect: {
                x: 295,
                y: 530,
                w: 50,
                h: 50
            },
            homeOffset: {
                x: 0,
                y: 0
            },
            skateboardPrice: 1e3,
            hidden: !0,
            showDone: !1,
            hideDone: !1,
            isShowing: !1,
            isHiding: !1,
            showTime: 0,
            showDuration: .5,
            hideTime: 0,
            hideDuration: .5,
            alpha: 0,
            pagingLeft: !1,
            pagingRight: !1,
            pagingTime: 0,
            init: function(e, t, i) {
                this.parent(e, t, i), this.titlePos.x = ig.system.width / 2 - this.titleImage.width / 2, this.panelPos.x = ig.system.width / 2 - this.panelImage.width / 2, this.itemPos.x = this.panelPos.x + 52, this.itemPos.y = this.panelPos.y + 78, this.itemTextPos.x = ig.system.width / 2, this.itemTextPos.y = this.panelPos.y + 55, this.buttonRect.x = ig.system.width / 2 - 61, this.homeRect.x = ig.system.width / 2 - 25, this.buttonAnimUp = new ig.Animation(this.buttonSheet, .1, [0]), this.buttonAnimDown = new ig.Animation(this.buttonSheet, .1, [1]), this.buttonAnim = this.buttonAnimUp, this.homeAnimUp = new ig.Animation(this.homeSheet, .1, [0]), this.homeAnimDown = new ig.Animation(this.homeSheet, .1, [1]), this.homeAnim = this.homeAnimUp, this.arrowLeftAnimUp = new ig.Animation(this.arrowSheet, .1, [0]), this.arrowLeftAnimDown = new ig.Animation(this.arrowSheet, .1, [1]), this.arrowLeftAnim = this.arrowLeftAnimUp, this.arrowLeftAnimUp.flip.x = !0, this.arrowLeftAnimDown.flip.x = !0, this.arrowRightAnimUp = new ig.Animation(this.arrowSheet, .1, [0]), this.arrowRightAnimDown = new ig.Animation(this.arrowSheet, .1, [1]), this.arrowRightAnim = this.arrowRightAnimUp, this.arrowLeftRect.x = ig.system.width / 2 - 200, this.arrowRightRect.x = ig.system.width / 2 + 150, this.lifeRect.x = this.panelPos.x + this.panelImage.width - 45, ig.game.getItemUpgradeEquipped(0) ? this.itemId = 0 : ig.game.getItemUpgradeEquipped(1) ? this.itemId = 1 : ig.game.getItemUpgradeEquipped(2) ? this.itemId = 2 : ig.game.getItemUpgradeEquipped(3) ? this.itemId = 3 : ig.game.getItemUpgradeEquipped(4) && (this.itemId = 4)
            },
            ready: function() {
                this.pointer = ig.game.getEntitiesByType(EntityPointer)[0], this.control = ig.game.getEntitiesByType(EntityHomeControl)[0]
            },
            draw: function() {
                if (!this.hidden && 0 != this.alpha) {
                    if (ig.system.context.globalAlpha = .5 * this.alpha, ig.system.context.fillStyle = "#000000", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), ig.system.context.globalAlpha = 1, ig.system.context.globalAlpha = this.alpha, this.titleImage.draw(this.titlePos.x, this.titlePos.y), ig.system.context.globalAlpha = this.panelAlpha, ig.game.getItemUpgradeStatus(this.itemId) ? this.panelImage.draw(this.panelPos.x + this.panelOffset.x, this.panelPos.y + this.panelOffset.y) : this.panelGreyImage.draw(this.panelPos.x + this.panelOffset.x, this.panelPos.y + this.panelOffset.y), this.itemImage[this.itemId].draw(this.panelPos.x + this.panelOffset.x, this.panelPos.y + this.panelOffset.y), ig.system.context.textAlign = "center", ig.system.context.font = "18px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#1A4283", ig.system.context.fillText(ig.game.getItemUpgradeName(this.itemId), this.itemTextPos.x + this.panelOffset.x, this.itemTextPos.y + this.panelOffset.y), !ig.game.getItemUpgradeStatus(this.itemId)) {
                        this.buttonAnim.draw(this.buttonRect.x, this.buttonRect.y), ig.system.context.textAlign = "center", ig.system.context.font = "16px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#1A4283";
                        var e = this.buttonRect.x - 17 + this.buttonRect.w / 2 + this.buttonOffset.x,
                            t = this.buttonRect.y - 27 + this.buttonRect.h + this.buttonOffset.y;
                        ig.system.context.fillText(ig.game.getItemUpgradePrice(this.itemId), e, t)
                    }
                    ig.game.getItemUpgradeEquipped(this.itemId) && ((e = ig.system.context).save(), e.translate(this.lifeRect.x + this.panelOffset.x, this.lifeRect.y + this.panelOffset.y), e.rotate(-Math.PI / 8), this.lifeImage.draw(-this.lifeRect.w / 2, -this.lifeRect.h), e.textAlign = "center", e.font = "16px mainfont, Helvetica, Verdana", e.fillStyle = "#000000", e.fillText(_STRINGS.UI.using, 2, 22), e.fillStyle = "#e45309", e.fillText(_STRINGS.UI.using, 0, 20), e.restore()), ig.system.context.globalAlpha = 1, this.arrowLeftAnim.draw(this.arrowLeftRect.x, this.arrowLeftRect.y), this.arrowRightAnim.draw(this.arrowRightRect.x, this.arrowRightRect.y), this.homeAnim.draw(this.homeRect.x, this.homeRect.y), this.coinImage.draw(this.coinRect.x, this.coinRect.y), ig.system.context.textAlign = "left", ig.system.context.font = "20px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(ig.game.money, this.coinCountPos.x + 2, this.coinCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(ig.game.money, this.coinCountPos.x, this.coinCountPos.y), ig.system.context.globalAlpha = 1
                }
            },
            show: function() {
                this.hidden = !1, this.isShowing = !0, this.hideDone = this.showDone = !1, this.showTime = ig.system.clock.delta();
                var e = this.showDuration;
                this.offset.y = ig.system.height, this.tweenObj = this.tween({
                    offset: {
                        x: 0,
                        y: 0
                    }
                }, e, {
                    easing: ig.Tween.Easing.Elastic.EaseOut,
                    entity: this,
                    onComplete: function() {
                        this.entity.showDone = !0, this.entity.isShowing = !1
                    }
                }), this.tweenObj.start(), ig.game.visitedShop = !0, ig.game.savePlayerStats()
            },
            hide: function() {
                this.isHiding = !0, this.hideDone = this.showDone = !1, this.hideTime = ig.system.clock.delta();
                var e = this.hideDuration;
                this.offset.y = 0, this.tweenObj = this.tween({
                    offset: {
                        x: 0,
                        y: ig.system.height
                    }
                }, e, {
                    easing: ig.Tween.Easing.Elastic.EaseIn,
                    entity: this,
                    onComplete: function() {
                        this.entity.hideDone = !0, this.entity.hidden = !0, this.entity.isHiding = !1, this.entity.control.unpause()
                    }
                }), this.tweenObj.start()
            },
            update: function() {
                if (!this.hidden) {
                    if (this.isShowing) {
                        var e = ig.system.clock.delta() - this.showTime;
                        e > this.showDuration / 2 && (e = this.showDuration / 2), e /= this.showDuration / 2, this.control.mainMenuAlpha = 1 - e, (e = ig.system.clock.delta() - this.showTime) >= this.showDuration / 2 && ((e -= this.showDuration / 2) > this.showDuration / 2 && (e = this.showDuration / 2), this.alpha = e /= this.showDuration / 2)
                    }
                    this.isHiding && ((e = ig.system.clock.delta() - this.hideTime) > this.hideDuration / 2 && (e = this.hideDuration / 2), e /= this.hideDuration / 2, this.alpha = 1 - e, (e = ig.system.clock.delta() - this.hideTime) >= this.hideDuration / 2 && ((e -= this.hideDuration / 2) > this.hideDuration / 2 && (e = this.hideDuration / 2), e /= this.hideDuration / 2, this.control.mainMenuAlpha = e)), this.tweenObj && this.tweenObj.update(), this.showDone && this.checkClicks(), this.pagingRight && (.5 >= (e = ig.system.clock.delta() - this.pagingTime) ? (e /= .5, this.panelAlpha = 1 - e * e, this.panelOffset.x -= 200 * ig.system.tick) : 1 >= e ? (.5 >= e - ig.system.tick && (this.panelOffset.x = 100, this.itemId += 1, this.itemId >= this.itemImage.length && (this.itemId = 0)), e = (e - .5) / .5, this.panelAlpha = e * e, this.panelOffset.x -= 200 * ig.system.tick) : (this.pagingRight = !1, this.panelOffset.x = 0)), this.pagingLeft && (.5 >= (e = ig.system.clock.delta() - this.pagingTime) ? (1 < (e /= .5) && (e = 1), this.panelAlpha = 1 - e * e, this.panelOffset.x += 200 * ig.system.tick) : 1 >= e ? (.5 >= e - ig.system.tick && (this.panelOffset.x = -100, this.itemId -= 1, 0 > this.itemId && (this.itemId = this.itemImage.length - 1)), 1 < (e = (e - .5) / .5) && (e = 1), this.panelAlpha = e * e, this.panelOffset.x += 200 * ig.system.tick) : (this.pagingLeft = !1, this.panelOffset.x = 0))
                }
            },
            aabbCheck: function(e, t) {
                return e.x + e.w > t.x && e.x < t.x + t.w && e.y + e.h > t.y && e.y < t.y + t.h
            },
            checkClicks: function() {
                this.pointer.refreshPos();
                var e = {};
                if (e.x = this.pointer.pos.x, e.y = this.pointer.pos.y, e.w = this.pointer.size.x, e.h = this.pointer.size.y, !ig.game.getItemUpgradeStatus(this.itemId) && !this.pagingLeft && !this.pagingRight)
                    if (this.aabbCheck(e, this.buttonRect)) {
                        if (ig.input.state("click") && (this.buttonAnim = this.buttonAnimDown, this.buttonOffset.y = 2), ig.input.released("click")) {
                            this.buttonAnim = this.buttonAnimUp, this.buttonOffset.y = 0;
                            var t = ig.game.getItemUpgradePrice(this.itemId);
                            ig.game.money >= t && (ig.game.money -= t, ig.game.setItemUpgradeStatus(this.itemId, !0), ig.game.setItemUpgradeEquipped(this.itemId, !0), ig.game.savePlayerStats(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))
                        }
                    } else this.buttonAnim = this.buttonAnimUp, this.buttonOffset.y = 0;
                ig.game.getItemUpgradeStatus(this.itemId) && !this.pagingLeft && !this.pagingRight && ((t = {
                    x: 0,
                    y: 0,
                    w: 0,
                    h: 0
                }).x = this.panelPos.x, t.y = this.panelPos.y, t.w = this.panelImage.width, t.h = this.panelImage.height, this.aabbCheck(e, t) && ig.input.released("click") && (ig.game.getItemUpgradeEquipped(this.itemId) ? ig.game.setItemUpgradeEquipped(this.itemId, !1) : ig.game.setItemUpgradeEquipped(this.itemId, !0), ig.game.savePlayerStats(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))), this.aabbCheck(e, this.homeRect) ? (ig.input.state("click") && (this.homeAnim = this.homeAnimDown), ig.input.released("click") && (this.homeAnim = this.homeAnimUp, ig.game.savePlayerStats(), this.hide(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.homeAnim = this.homeAnimUp, this.aabbCheck(e, this.arrowRightRect) ? (ig.input.state("click") && (this.arrowRightAnim = this.arrowRightAnimDown), ig.input.released("click") && (this.arrowRightAnim = this.arrowRightAnimUp, this.doPageRight(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.arrowRightAnim = this.arrowRightAnimUp, this.aabbCheck(e, this.arrowLeftRect) ? (ig.input.state("click") && (this.arrowLeftAnim = this.arrowLeftAnimDown), ig.input.released("click") && (this.arrowLeftAnim = this.arrowLeftAnimUp, this.doPageLeft(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.arrowLeftAnim = this.arrowLeftAnimUp
            },
            doPageLeft: function() {
                !this.pagingLeft && !this.pagingRight && (this.pagingLeft = !0, this.pagingTime = ig.system.clock.delta())
            },
            doPageRight: function() {
                !this.pagingRight && !this.pagingLeft && (this.pagingRight = !0, this.pagingTime = ig.system.clock.delta())
            }
        })
    }), ig.baked = !0, ig.module("game.entities.home-control").requires("impact.entity", "game.entities.button-more-games", "game.entities.audio-toggle", "game.entities.shop-control").defines(function() {
        EntityHomeControl = ig.Entity.extend({
            zIndex: 100,
            isHome: !0,
            bgImage: new ig.Image("media/graphics/game/backgrounds/mainbg.jpg"),
            titleImage: new ig.Image("media/graphics/game/backgrounds/maintitle.png"),
            time: 1,
            playButtonAnim: new ig.Animation(new ig.AnimationSheet("media/graphics/game/ui/mainmenu/playgame.png", 110, 64), 0, [0, 1, 2]),
            playButtonPos: {
                x: 0,
                y: 590
            },
            playButtonRect: {
                x: -55,
                y: -32,
                w: 110,
                h: 64
            },
            playButtonOffset: {
                x: 0,
                y: 0
            },
            playButtonAlpha: 1,
            playButtonDown: !1,
            shopButtonAnim: new ig.Animation(new ig.AnimationSheet("media/graphics/game/ui/mainmenu/shop.png", 72, 76), 0, [0, 1, 2]),
            shopButtonPos: {
                x: 0,
                y: 593
            },
            shopButtonRect: {
                x: -36,
                y: -38,
                w: 72,
                h: 76
            },
            shopButtonOffset: {
                x: 0,
                y: 0
            },
            shopButtonAlpha: 1,
            shopButtonDown: !1,
            infoButtonAnim: new ig.Animation(new ig.AnimationSheet("media/graphics/game/ui/mainmenu/info.png", 54, 56), 0, [0, 1, 2]),
            infoButtonPos: {
                x: 0,
                y: 38
            },
            infoButtonRect: {
                x: -27,
                y: -28,
                w: 54,
                h: 56
            },
            infoButtonOffset: {
                x: 0,
                y: 0
            },
            infoButtonAlpha: 1,
            infoButtonDown: !1,
            moregamesButtonImage: new ig.Image("media/graphics/game/ui/mainmenu/moregames.png"),
            moregamesButtonPos: {
                x: 41,
                y: 598
            },
            moregamesButtonRect: {
                x: -31,
                y: -21,
                w: 62,
                h: 42
            },
            moregamesButtonOffset: {
                x: 0,
                y: 0
            },
            moregamesButtonAlpha: 1,
            moregamesButtonDown: !1,
            pointer: null,
            moregames: null,
            audiotoggle: null,
            shop: null,
            menuPaused: !1,
            mainMenuAlpha: 1,
            init: function(e, t, i) {
                this.parent(e, t, i), ig.global.wm || (0 < ig.soundHandler.musicVolume ? ig.soundHandler.bgmPlaying || (ig.soundHandler.playBackgroundMusic(), ig.soundHandler.setMusicVolume(ig.game.musicVolume), ig.soundHandler.setSfxVolume(ig.game.sfxVolume)) : ig.soundHandler.stopBackgroundMusic(), this.playButtonPos.x = ig.system.width / 2, this.shopButtonPos.x = ig.system.width - 10 - this.shopButtonRect.w / 2, this.infoButtonPos.x = ig.system.width - 10 - this.infoButtonRect.w / 2)
            },
            ready: function() {
                this.pointer = ig.game.getEntitiesByType(EntityPointer)[0], this.moregames = ig.game.spawnEntity(EntityButtonMoreGames, this.moregamesButtonPos.x + this.moregamesButtonRect.x, this.moregamesButtonPos.y + this.moregamesButtonRect.y), this.moregames.divLayerName = "more-games", this.moregames.size.x = this.moregamesButtonRect.w, this.moregames.size.y = this.moregamesButtonRect.h, this.moregames.ready(), this.audiotoggle = ig.game.spawnEntity(EntityAudioToggle, 37, 38), this.audiotoggle.ready(), this.shop = ig.game.spawnEntity(EntityShopControl, 0, 0), this.shop.ready(), ig.game.sortEntitiesDeferred(), ig.global.wm || (0 < ig.soundHandler.musicVolume ? ig.soundHandler.bgmPlaying || ig.soundHandler.playBackgroundMusic() : ig.soundHandler.stopBackgroundMusic(), ig.game.doShop && (ig.game.doShop = !1, this.showShop()))
            },
            draw: function() {
                var e = ig.system.context;
                if (e.save(), this.bgImage.width < ig.system.width && e.scale(ig.system.width / this.bgImage.width, 1), this.bgImage.draw(0, 0), e.restore(), 0 != this.mainMenuAlpha) {
                    e.globalAlpha = this.mainMenuAlpha, this.titleImage.draw(ig.system.width / 2 - this.titleImage.width / 2, 0);
                    var t = this.playButtonPos.x + this.playButtonOffset.x + this.playButtonRect.x,
                        i = this.playButtonPos.y + this.playButtonOffset.y + this.playButtonRect.y;
                    this.playButtonDown && (i += 2), e.save(), e.globalAlpha = this.mainMenuAlpha * this.playButtonAlpha, this.playButtonAnim.draw(t, i), e.restore(), t = this.shopButtonPos.x + this.shopButtonOffset.x + this.shopButtonRect.x, i = this.shopButtonPos.y + this.shopButtonOffset.y + this.shopButtonRect.y, this.shopButtonDown && (i += 2), e.save(), e.globalAlpha = this.mainMenuAlpha * this.shopButtonAlpha, this.shopButtonAnim.draw(t, i), e.restore(), t = this.infoButtonPos.x + this.infoButtonOffset.x + this.infoButtonRect.x, i = this.infoButtonPos.y + this.infoButtonOffset.y + this.infoButtonRect.y, this.infoButtonDown && (i += 2), e.save(), e.globalAlpha = this.mainMenuAlpha * this.infoButtonAlpha, this.infoButtonAnim.draw(t, i), e.restore(), t = this.moregamesButtonPos.x + this.moregamesButtonOffset.x + this.moregamesButtonRect.x, i = this.moregamesButtonPos.y + this.moregamesButtonOffset.y + this.moregamesButtonRect.y, this.moregamesButtonDown && (i += 2), e.save(), e.globalAlpha = this.mainMenuAlpha * this.moregamesButtonAlpha, this.moregamesButtonImage.draw(t, i), e.restore(), e.globalAlpha = 1
                }
            },
            playGame: function() {
                ig.input.clearPressed(), this.moregames.hide(), ig.game.firstrun ? (ig.game.doTutorialFlag = !0, ig.game.firstrun = !1, ig.game.savePlayerStats()) : ig.game.doTutorialFlag = !1, ig.game.director.jumpTo(LevelGame)
            },
            playTutorial: function() {
                ig.input.clearPressed(), this.moregames.hide(), ig.game.doTutorialFlag = !0, ig.game.firstrun = !1, ig.game.savePlayerStats(), ig.game.director.jumpTo(LevelGame)
            },
            showShop: function() {
                this.pause(), this.shop.show()
            },
            hideShop: function() {
                this.shop.hide(), this.unpause()
            },
            pause: function() {
                this.menuPaused = !0, this.moregames.hide()
            },
            unpause: function() {
                this.menuPaused = !1, this.moregames.show()
            },
            update: function() {
                this.time += ig.system.tick, this.menuPaused || this.checkClicks()
            },
            aabbCheck: function(e, t) {
                return e.x + e.w > t.x && e.x < t.x + t.w && e.y + e.h > t.y && e.y < t.y + t.h
            },
            checkClicks: function() {
                this.pointer.refreshPos();
                var e = {};
                e.x = this.pointer.pos.x + this.pointer.size.x / 2, e.y = this.pointer.pos.y + this.pointer.size.y / 2, e.w = 1, e.h = 1;
                var t = {};
                if (t.x = this.playButtonPos.x + this.playButtonRect.x, t.y = this.playButtonPos.y + this.playButtonRect.y, t.w = this.playButtonRect.w, t.h = this.playButtonRect.h, this.aabbCheck(e, t)) {
                    if (this.playButtonDown = !1, this.playButtonAnim.tile = 0, ig.ua.mobile || (this.playButtonAnim.tile = 1), ig.input.state("click") && (this.playButtonDown = !0, this.playButtonAnim.tile = 2), ig.input.released("click")) return this.playButtonDown = !1, ig.ua.mobile || (this.playButtonAnim.tile = 1), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button), void this.playGame()
                } else this.playButtonDown = !1, this.playButtonAnim.tile = 0;
                if ((t = {}).x = this.shopButtonPos.x + this.shopButtonRect.x, t.y = this.shopButtonPos.y + this.shopButtonRect.y, t.w = this.shopButtonRect.w, t.h = this.shopButtonRect.h, this.aabbCheck(e, t)) {
                    if (this.shopButtonDown = !1, this.shopButtonAnim.tile = 0, ig.ua.mobile || (this.shopButtonAnim.tile = 1), ig.input.state("click") && (this.shopButtonDown = !0, this.shopButtonAnim.tile = 2), ig.input.released("click")) return this.shopButtonDown = !1, ig.ua.mobile || (this.shopButtonAnim.tile = 1), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button), void this.showShop()
                } else this.shopButtonDown = !1, this.shopButtonAnim.tile = 0;
                if ((t = {}).x = this.infoButtonPos.x + this.infoButtonRect.x, t.y = this.infoButtonPos.y + this.infoButtonRect.y, t.w = this.infoButtonRect.w, t.h = this.infoButtonRect.h, this.aabbCheck(e, t)) {
                    if (this.infoButtonDown = !1, this.infoButtonAnim.tile = 0, ig.ua.mobile || (this.infoButtonAnim.tile = 1), ig.input.state("click") && (this.infoButtonDown = !0, this.infoButtonAnim.tile = 2), ig.input.released("click")) return this.infoButtonDown = !1, ig.ua.mobile || (this.infoButtonAnim.tile = 1), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button), void this.playTutorial()
                } else this.infoButtonDown = !1, this.infoButtonAnim.tile = 0;
                (t = {}).x = this.moregamesButtonPos.x + this.moregamesButtonRect.x, t.y = this.moregamesButtonPos.y + this.moregamesButtonRect.y, t.w = this.moregamesButtonRect.w, t.h = this.moregamesButtonRect.h, this.aabbCheck(e, t) ? (this.moregamesButtonDown = !1, ig.input.state("click") && (this.moregamesButtonDown = !0), ig.input.released("click") && (this.moregamesButtonDown = !1, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.moregamesButtonDown = !1
            },
            roundRect: function(e, t, i, n, s, a, o, r) {
                void 0 === r && (r = !0), void 0 === a && (a = 5), e.beginPath(), e.moveTo(t + a, i), e.lineTo(t + n - a, i), e.quadraticCurveTo(t + n, i, t + n, i + a), e.lineTo(t + n, i + s - a), e.quadraticCurveTo(t + n, i + s, t + n - a, i + s), e.lineTo(t + a, i + s), e.quadraticCurveTo(t, i + s, t, i + s - a), e.lineTo(t, i + a), e.quadraticCurveTo(t, i, t + a, i), e.closePath(), r && e.stroke(), o && e.fill()
            }
        })
    }), ig.baked = !0, ig.module("game.levels.home").requires("impact.image", "game.entities.home-control", "game.entities.pointer-selector").defines(function() {
        LevelHome = {
            entities: [{
                type: "EntityHomeControl",
                x: 0,
                y: 0
            }, {
                type: "EntityPointerSelector",
                x: 0,
                y: 0
            }],
            layer: []
        }
    }), ig.baked = !0, ig.module("game.entities.game-ui").requires("impact.entity").defines(function() {
        EntityGameUi = ig.Entity.extend({
            zIndex: 3e3,
            overlayAlpha: 1,
            homeSheet: new ig.AnimationSheet("media/graphics/game/ui/game/home.png", 50, 50),
            homeAnimUp: null,
            homeAnimDown: null,
            homeAnim: null,
            homeRect: {
                x: 582,
                y: 126,
                w: 50,
                h: 50
            },
            homeEndRect: {
                x: 270,
                y: 484,
                w: 50,
                h: 50
            },
            homeEndOffset: {
                x: 0,
                y: 0
            },
            restartSheet: new ig.AnimationSheet("media/graphics/game/ui/game/restart.png", 48, 52),
            restartAnimUp: null,
            restartAnimDown: null,
            restartAnim: null,
            restartEndRect: {
                x: 320,
                y: 483,
                w: 48,
                h: 52
            },
            restartEndOffset: {
                x: 0,
                y: 0
            },
            pauseSheet: new ig.AnimationSheet("media/graphics/game/ui/game/pause.png", 37, 40),
            pauseAnimUp: null,
            pauseAnimOver: null,
            pauseAnimDown: null,
            pauseAnim: null,
            pauseRect: {
                x: 582,
                y: 26,
                w: 37,
                h: 40
            },
            pauseOffset: {
                x: 0,
                y: 0
            },
            playRect: {
                x: 615,
                y: 5,
                w: 35,
                h: 44
            },
            lifeImage: new ig.Image("media/graphics/game/ui/game/lifeicon.png"),
            lifeRect: {
                x: 502,
                y: 26,
                w: 40,
                h: 40
            },
            lifeCountPos: {
                x: 557,
                y: 56
            },
            coinImage: new ig.Image("media/graphics/game/ui/game/coinicon.png"),
            coinRect: {
                x: 20,
                y: 25,
                w: 41,
                h: 42
            },
            coinCountPos: {
                x: 75,
                y: 56
            },
            cookieImage: new ig.Image("media/graphics/game/ui/game/cookieicon.png"),
            cookieRect: {
                x: 23,
                y: 76,
                w: 35,
                h: 41
            },
            cookieCountPos: {
                x: 95,
                y: 107
            },
            powerLevelGrad: null,
            powerLevelRect: {
                x: 60,
                y: 78,
                w: 10,
                h: 34
            },
            gameOverTitleImage: new ig.Image("media/graphics/game/ui/game/gameover.png"),
            gameOverTitleRect: {
                x: 153,
                y: 131,
                w: 333,
                h: 54
            },
            gameOverTitleOffset: {
                x: 0,
                y: 0
            },
            gameOverPanelImage: new ig.Image("media/graphics/game/ui/game/gameover-panel.png"),
            gameOverPanelRect: {
                x: 219,
                y: 307,
                w: 202,
                h: 156
            },
            gameOverPanelOffset: {
                x: 0,
                y: 0
            },
            gameOverBgImage: new ig.Image("media/graphics/game/ui/game/gameover-bg.png"),
            gameOverBgRect: {
                x: 263,
                y: 209,
                w: 114,
                h: 114
            },
            gameOverBgOffset: {
                x: 0,
                y: 0
            },
            gameOverAnimSheet: new ig.AnimationSheet("media/graphics/game/ui/game/gameover-anim.png", 114, 114),
            gameOverAnim: null,
            panelIconsImage: new ig.Image("media/graphics/game/ui/game/panel-icons.png"),
            panelIconsRect: {
                x: 269,
                y: 337,
                w: 49,
                h: 106
            },
            panelIconsOffset: {
                x: 0,
                y: 0
            },
            pausedTitleImage: new ig.Image("media/graphics/game/ui/game/paused-title.png"),
            pausedTitlePos: {
                x: 0,
                y: 220
            },
            coinEndCountPos: {
                x: 339,
                y: 390
            },
            cookieEndCountPos: {
                x: 339,
                y: 443
            },
            happyBgImage: new ig.Image("media/graphics/game/ui/game/levelup-anim-bg.png"),
            happyBgRect: {
                x: -17,
                y: 533,
                w: 114,
                h: 114
            },
            happyBgOffset: {
                x: 0,
                y: 0
            },
            happyAnimSheet: new ig.AnimationSheet("media/graphics/game/ui/game/levelup-anim.png", 114, 114),
            happyAnim: null,
            happyPanelImage: new ig.Image("media/graphics/game/ui/game/levelup-panel.png"),
            happyPanelRect: {
                x: 219,
                y: 307,
                w: 202,
                h: 155
            },
            happyPanelOffset: {
                x: 0,
                y: 0
            },
            fingerImage: new ig.Image("media/graphics/game/ui/game/finger.png"),
            fingerRect: {
                x: 0,
                y: 0,
                w: 50,
                h: 50
            },
            fingerOffset: {
                x: 0,
                y: 0
            },
            tutorialUIShowTime: 0,
            tutorialUIShowingFlag: !1,
            tutorialUIHideTime: 0,
            tutorialUIHidingFlag: !1,
            tutorialUITickStartTime: 0,
            tutorialUITickFlag: !1,
            tutorialUIFadeTime: 0,
            tutorialUIFadeFlag: !1,
            tutorialUIDrawFlag: !1,
            tutorialUIAlpha: 0,
            tutorialUIOffset: {
                x: 0,
                y: 0
            },
            tutorialID: 0,
            nextTutorialID: 0,
            tutorialTextOrder: 0,
            tutorialTextAlpha: 0,
            tutorialTextRect: {
                x: 40,
                y: 470,
                w: 400,
                h: 100
            },
            tutorialTime: 0,
            control: null,
            pointer: null,
            init: function(e, t, i) {
                this.parent(e, t, i), this.powerLevelGrad = ig.system.context.createLinearGradient(0, 0, 0, this.powerLevelRect.h), this.powerLevelGrad.addColorStop(0, "#cc1e1c"), this.powerLevelGrad.addColorStop(1, "#f59f2a"), this.pauseAnimUp = new ig.Animation(this.pauseSheet, .1, [0]), this.pauseAnimOver = new ig.Animation(this.pauseSheet, .1, [1]), this.pauseAnimDown = new ig.Animation(this.pauseSheet, .1, [2]), this.pauseAnim = this.pauseAnimUp, this.homeAnimUp = new ig.Animation(this.homeSheet, .1, [0]), this.homeAnimDown = new ig.Animation(this.homeSheet, .1, [1]), this.homeAnim = this.homeAnimUp, this.restartAnimUp = new ig.Animation(this.restartSheet, .1, [0]), this.restartAnimDown = new ig.Animation(this.restartSheet, .1, [1]), this.restartAnim = this.restartAnimUp, this.gameOverAnim = new ig.Animation(this.gameOverAnimSheet, .042, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], !1), this.pauseRect.x = ig.system.width - 58, this.homeRect.x = ig.system.width - 63, this.lifeRect.x = ig.system.width - 158, this.lifeCountPos.x = ig.system.width - 103, this.gameOverTitleRect.x = ig.system.width / 2 - this.gameOverTitleRect.w / 2, this.gameOverPanelRect.x = ig.system.width / 2 - this.gameOverPanelRect.w / 2, this.gameOverBgRect.x = ig.system.width / 2 - this.gameOverBgRect.w / 2, this.panelIconsRect.x = this.gameOverPanelRect.x + 30, this.panelIconsRect.y = this.gameOverPanelRect.y + 21, this.coinEndCountPos.x = this.panelIconsRect.x + 103, this.coinEndCountPos.y = this.panelIconsRect.y + 43, this.cookieEndCountPos.x = this.panelIconsRect.x + 103, this.cookieEndCountPos.y = this.panelIconsRect.y + 98, this.homeEndRect.x = ig.system.width / 2 - this.homeEndRect.w - 40, this.restartEndRect.x = ig.system.width / 2 + 40, this.pausedTitlePos.x = ig.system.width / 2 - this.pausedTitleImage.width / 2, this.happyAnim = new ig.Animation(this.happyAnimSheet, .084, [0, 1, 2, 3, 4], !0), this.tutorialTextRect.x = ig.system.width / 2 - this.tutorialTextRect.w / 2, this.happyBgRect.x = this.tutorialTextRect.x - this.happyBgRect.w / 2, this.happyBgRect.y = this.tutorialTextRect.y + this.tutorialTextRect.h / 2 - this.happyBgRect.h / 2, this.tutorialTextRect.w += this.happyBgRect.w / 2
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0], this.pointer = ig.game.getEntitiesByType(EntityPointer)[0]
            },
            draw: function() {
                var e = ig.system.context;
                e.fillStyle = this.control.bgHorizonLinGrad, e.fillRect(0, 121, ig.system.width, 195), this.drawGameStats(), this.drawTutorialUI(), this.control.gamePaused && (ig.system.context.globalAlpha = .5, ig.system.context.fillStyle = "#000000", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), ig.system.context.globalAlpha = 1, this.pausedTitleImage.draw(this.pausedTitlePos.x, this.pausedTitlePos.y)), this.control.gamePaused && (1 < (e = ig.system.clock.delta() % 2) && (e = 1 - (e - 1)), ig.system.context.globalAlpha = .25 + .75 * e), this.pauseAnim.draw(this.pauseRect.x + this.pos.x - this.offset.x - ig.game._rscreen.x, this.pauseRect.y + this.pos.y - this.offset.y - ig.game._rscreen.y), this.control.gamePaused && (ig.system.context.globalAlpha = 1, this.homeAnim.draw(this.homeRect.x + this.pos.x - this.offset.x - ig.game._rscreen.x, this.homeRect.y + this.pos.y - this.offset.y - ig.game._rscreen.y)), this.drawGameOver(), (this.control.gameStarting || this.control.gameEnding) && (ig.system.context.globalAlpha = this.overlayAlpha, ig.system.context.fillStyle = "#000000", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), ig.system.context.globalAlpha = 1)
            },
            drawGameStats: function() {
                this.lifeImage.draw(this.lifeRect.x, this.lifeRect.y), ig.system.context.textAlign = "left", ig.system.context.font = "20px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(this.control.lifeCount, this.lifeCountPos.x + 2, this.lifeCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(this.control.lifeCount, this.lifeCountPos.x, this.lifeCountPos.y), this.coinImage.draw(this.coinRect.x, this.coinRect.y), ig.system.context.textAlign = "left", ig.system.context.font = "20px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(ig.game.money, this.coinCountPos.x + 2, this.coinCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(ig.game.money, this.coinCountPos.x, this.coinCountPos.y), this.cookieImage.draw(this.cookieRect.x, this.cookieRect.y), ig.system.context.textAlign = "left", ig.system.context.font = "20px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(ig.game.cookies, this.cookieCountPos.x + 2, this.cookieCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(ig.game.cookies, this.cookieCountPos.x, this.cookieCountPos.y);
                var e = ig.system.context;
                e.save();
                var t = this.powerLevelRect.w,
                    i = this.powerLevelRect.h,
                    n = this.control.powerLevel;
                e.translate(this.powerLevelRect.x, this.powerLevelRect.y), e.fillStyle = "#000000", e.strokeStyle = "#000000", e.lineWidth = 0, e.fillRect(2, 2, t, i), e.fillStyle = this.powerLevelGrad, e.fillRect(0, (1 - n) * i, t, n * i), e.strokeStyle = "#ffffff", e.lineWidth = 3, e.strokeRect(0, 0, t, i), e.restore()
            },
            drawGameOver: function() {
                if (this.control.gameOver) {
                    var e = ig.system.clock.delta() - this.control.gameOverTime;
                    .5 < e && (e = .5), ig.system.context.globalAlpha = .75 * e / .5, ig.system.context.fillStyle = "#000000", ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height), ig.system.context.globalAlpha = 1, this.gameOverTitleImage.draw(this.gameOverTitleRect.x + this.gameOverTitleOffset.x, this.gameOverTitleRect.y + this.gameOverTitleOffset.y), this.gameOverPanelImage.draw(this.gameOverPanelRect.x + this.gameOverPanelOffset.x, this.gameOverPanelRect.y + this.gameOverPanelOffset.y), this.panelIconsImage.draw(this.panelIconsRect.x + this.panelIconsOffset.x, this.panelIconsRect.y + this.panelIconsOffset.y), ig.system.context.textAlign = "center", ig.system.context.font = "24px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(this.control.coinsCollected, this.coinEndCountPos.x + 2, this.coinEndCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(this.control.coinsCollected, this.coinEndCountPos.x, this.coinEndCountPos.y), ig.system.context.textAlign = "center", ig.system.context.font = "24px mainfont, Helvetica, Verdana", ig.system.context.fillStyle = "#000000", ig.system.context.fillText(ig.game.cookies, this.cookieEndCountPos.x + 2, this.cookieEndCountPos.y + 2), ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(ig.game.cookies, this.cookieEndCountPos.x, this.cookieEndCountPos.y), this.gameOverBgImage.draw(this.gameOverBgRect.x + this.gameOverBgOffset.x, this.gameOverBgRect.y + this.gameOverBgOffset.y), this.gameOverAnim.draw(this.gameOverBgRect.x + this.gameOverBgOffset.x, this.gameOverBgRect.y + this.gameOverBgOffset.y), this.homeAnim.draw(this.homeEndRect.x + this.homeEndOffset.x, this.homeEndRect.y + this.homeEndOffset.y), this.restartAnim.draw(this.restartEndRect.x + this.restartEndOffset.x, this.restartEndRect.y + this.restartEndOffset.y)
                }
            },
            drawFPS: function() {
                ig.system.context.fillStyle = "#ffffff", ig.system.context.font = "20px mainfont, Helvetica, Verdana", ig.system.context.textAlign = "center", ig.system.context.fillText(ig.game.fps, ig.system.width / 2, 40)
            },
            aabbCheck: function(e, t) {
                return e.x + e.w > t.x && e.x < t.x + t.w && e.y + e.h > t.y && e.y < t.y + t.h
            },
            checkMainClicks: function() {
                var e = !1;
                this.pointer.refreshPos();
                var t = {};
                t.x = this.pointer.pos.x, t.y = this.pointer.pos.y, t.w = this.pointer.size.x, t.h = this.pointer.size.y, this.control.gameOver ? (!e && this.aabbCheck(t, this.restartEndRect) ? (ig.input.state("click") && (this.restartAnim = this.restartAnimDown), ig.input.released("click") && (this.restartAnim = this.restartAnimUp, this.control.restartGame(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button)), e = !0) : this.restartAnim = this.restartAnimUp, !e && this.aabbCheck(t, this.homeEndRect) ? (ig.input.state("click") && (this.homeAnim = this.homeAnimDown), ig.input.released("click") && (this.homeAnim = this.homeAnimUp, this.control.quitGame(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.homeAnim = this.homeAnimUp) : (!e && this.aabbCheck(t, this.pauseRect) ? (ig.input.state("click") && (this.pauseAnim = this.pauseAnimDown), ig.input.released("click") && (this.pauseAnim = this.pauseAnimOver, this.control.togglePauseGame(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button)), e = !0) : (this.pauseAnim = this.pauseAnimUp, this.control.gamePaused && (this.pauseAnim = this.pauseAnimDown)), this.control.gamePaused && (!e && this.aabbCheck(t, this.homeRect) ? (ig.input.state("click") && (this.homeAnim = this.homeAnimDown), ig.input.released("click") && (this.homeAnim = this.homeAnimUp, this.control.quitGame(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))) : this.homeAnim = this.homeAnimUp))
            },
            update: function() {
                var e;
                this.checkMainClicks(), this.control.gameOver && this.gameOverAnim.update(), this.control.gameStarting ? (1 < (e = (e = ig.system.clock.delta() - this.control.gameStartTime) / .25) && (e = 1), this.overlayAlpha = 1 - e) : this.control.gameEnding && (e = ig.system.clock.delta() - this.control.gameEndTime, 1 < (e /= .25) && (e = 1), this.overlayAlpha = e), this.control.tutorialMode && !this.control.gamePaused && (this.tutorialTime += ig.system.tick), this.updateTutorialUI()
            },
            drawTime: function(e, t, i, n) {
                if (!isNaN(this.control.gameTime)) {
                    e = Math.floor(this.control.gameTime / 60), 10 > (t = Math.floor(this.control.gameTime % 60)) && (t = "0" + t);
                    var s = _STRINGS.UI.TIME + ": " + e + ":" + t;
                    i = ig.system.context.measureText(s).width, n = ig.system.context.measureText("m").width, e = ig.system.width / 2 - i / 2, t = ig.system.height / 2 + n / 3 + 30, ig.system.context.fillText(s, e, t)
                }
            },
            drawArrow: function(e, t, i, n) {
                var s, a;
                if (s = i - e, a = n - t, 0 != (l = Math.sqrt(s * s + a * a))) {
                    var o;
                    s /= l;
                    var r, h, l = n - 10 * (o = a / l);
                    o = (a = i - 10 * s) + 10 * (r = -o), h = l + 10 * s, r = a - 10 * r, s = l - 10 * s;
                    var u = ig.system.context;
                    u.fillStyle = "#000000", u.beginPath(), u.moveTo(i, n), u.lineTo(o, h), u.lineTo(r, s), u.closePath(), u.fill(), u.strokeStyle = "#000000", u.lineWidth = 10, u.beginPath(), u.moveTo(a, l), u.lineTo(e, t), u.stroke()
                }
            },
            roundRect: function(e, t, i, n, s, a, o, r) {
                void 0 === r && (r = !0), void 0 === a && (a = 5), e.beginPath(), e.moveTo(t + a, i), e.lineTo(t + n - a, i), e.quadraticCurveTo(t + n, i, t + n, i + a), e.lineTo(t + n, i + s - a), e.quadraticCurveTo(t + n, i + s, t + n - a, i + s), e.lineTo(t + a, i + s), e.quadraticCurveTo(t, i + s, t, i + s - a), e.lineTo(t, i + a), e.quadraticCurveTo(t, i, t + a, i), e.closePath(), r && e.stroke(), o && e.fill()
            },
            checkTutorialClicks: function() {
                if (this.control.tutorialMode && !this.tutorialUIHidingFlag && !this.tutorialUIShowingFlag && !this.tutorialUITickFlag && (0 == this.control.tutorialStage || 1 == this.control.tutorialStage || 2 == this.control.tutorialStage || 13 == this.control.tutorialStage)) {
                    this.pointer.refreshPos();
                    var e = {};
                    e.x = this.pointer.pos.x, e.y = this.pointer.pos.y, e.w = this.pointer.size.x, e.h = this.pointer.size.y, this.aabbCheck(e, this.tutorialTextRect) && ig.input.released("click") && (this.control.doNextTutorialStage(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button)), ig.input.released("enter") && (this.control.doNextTutorialStage(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.button))
                }
            },
            updateTutorialUI: function() {
                if (this.tutorialUIDrawFlag) {
                    if (this.tutorialUIShowingFlag ? (0 > (e = 1 - this.tutorialUIOffset.x / ig.system.width) && (e = 0), 1 < e && (e = 1), this.tutorialUIAlpha = .25 + .75 * e, 0 < this.tutorialUIOffset.x ? this.tutorialUIOffset.x -= 2e3 * ig.system.tick : 0 > this.tutorialUIOffset.x && (this.tutorialUIOffset.x += 2e3 * ig.system.tick, 0 <= this.tutorialUIOffset.x && (this.tutorialUIOffset.x = 0, this.tutorialUIShowingFlag = !1, this.happyAnim.rewind(), this.tutorialUITickStartTime = ig.system.clock.delta(), this.tutorialUITickFlag = !0, this.tutorialUIAlpha = 1))) : this.tutorialUIHidingFlag && (0 > (e = this.tutorialUIOffset.x / -ig.system.width) && (e = 0), 1 < e && (e = 1), this.tutorialUIAlpha = .25 + .75 * (1 - e), this.tutorialUIOffset.x -= 2e3 * ig.system.tick, this.tutorialUIOffset.x <= -ig.system.width && (this.tutorialUITickFlag = this.tutorialUIFadeFlag = this.tutorialUIShowingFlag = this.tutorialUIDrawFlag = this.tutorialUIHidingFlag = !1, this.tutorialUIAlpha = this.tutorialTextAlpha = 0)), this.tutorialUITickFlag) {
                        var e = (_STRINGS.Tutorial[this.tutorialID][0] + _STRINGS.Tutorial[this.tutorialID][1]).length,
                            t = (ig.system.clock.delta() - this.tutorialUITickStartTime) / (.02 * e);
                        1 < t && (t = 1), this.tutorialTextOrder = Math.floor(t * e), 1 <= t && (this.tutorialUITickFlag = !1, this.tutorialTextOrder = e), this.tutorialTextAlpha = 1
                    } else this.tutorialUIFadeFlag && (1 <= (t = (ig.system.clock.delta() - this.tutorialUIFadeTime) / .25) ? (this.tutorialID = this.nextTutorialID, this.tutorialUIFadeFlag = !1, this.happyAnim.rewind(), this.tutorialUITickStartTime = ig.system.clock.delta(), this.tutorialUITickFlag = !0, this.tutorialTextOrder = this.tutorialTextAlpha = 0) : this.tutorialTextAlpha = 1 - t);
                    !this.tutorialUIShowingFlag && !this.tutorialUIHidingFlag && (this.happyAnim.update(), this.tutorialUITickFlag || this.checkTutorialClicks())
                }
            },
            showTutorialUI: function(e) {
                this.tutorialUIDrawFlag ? this.tutorialUIHidingFlag ? (this.tutorialUIHidingFlag = !1, this.tutorialUIShowingFlag = !0, this.tutorialUIShowTime = ig.system.clock.delta(), this.tutorialUIOffset.x = ig.system.width, this.happyAnim.rewind(), this.tutorialID = e, this.tutorialTextAlpha = this.tutorialTextOrder = 0) : (this.tutorialUIFadeFlag = !0, this.tutorialUIFadeTime = ig.system.clock.delta(), this.nextTutorialID = e) : (this.tutorialUIShowingFlag = this.tutorialUIDrawFlag = !0, this.tutorialUIShowTime = ig.system.clock.delta(), this.tutorialUIOffset.x = ig.system.width, this.happyAnim.rewind(), this.tutorialID = e, this.tutorialTextAlpha = this.tutorialTextOrder = 0)
            },
            hideTutorialUI: function() {
                this.tutorialUIHidingFlag = !0, this.tutorialUIHideTime = ig.system.clock.delta()
            },
            drawTutorialUI: function() {
                if (this.tutorialUIDrawFlag) {
                    var e = ig.system.context;
                    e.globalAlpha = this.tutorialUIAlpha, e.save(), e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)";
                    var t = this.tutorialTextRect.x + this.tutorialUIOffset.x,
                        i = this.tutorialTextRect.y + this.tutorialUIOffset.y,
                        n = this.tutorialTextRect.w,
                        s = this.tutorialTextRect.h;
                    this.roundRect(e, t, i, n, s, 20, !0, !1), e.restore(), e.globalAlpha = 1, this.tutorialUIShowingFlag || this.drawText(), this.tutorialUIShowingFlag || this.tutorialUIHidingFlag || this.tutorialUITickFlag || this.tutorialUIFadeFlag || 0 != this.control.tutorialStage && 1 != this.control.tutorialStage && 2 != this.control.tutorialStage && 13 != this.control.tutorialStage || !(.5 < ig.system.clock.delta() - this.control.tutorialPausedTime) || (t = t + n - 20, i = i + s - 10, 1 < (n = this.tutorialTime % 2) && (n = 2 - n), n = .25 + .75 * n, e.save(), e.font = "12px mainfont, Helvetica, Verdana", e.translate(t, i), e.textAlign = "right", e.fillStyle = "rgba(255,255,255," + n + ")", e.fillText(_STRINGS.UI.continue, 0, 0), e.restore()), !this.tutorialUIShowingFlag && !this.tutorialUIHidingFlag && !this.tutorialUIFadeFlag && (3 == this.control.tutorialStage ? this.drawJumpInstructions() : 5 == this.control.tutorialStage ? this.drawRightInstructions() : 7 == this.control.tutorialStage || 9 == this.control.tutorialStage ? this.drawLeftInstructions() : 11 == this.control.tutorialStage && this.drawSlideInstructions()), e.globalAlpha = this.tutorialUIAlpha, this.happyBgImage.draw(this.happyBgRect.x + this.happyBgOffset.x + this.tutorialUIOffset.x, this.happyBgRect.y + this.happyBgOffset.y + this.tutorialUIOffset.y), this.happyAnim.draw(this.happyBgRect.x + this.happyBgOffset.x + this.tutorialUIOffset.x, this.happyBgRect.y + this.happyBgOffset.y + this.tutorialUIOffset.y), e.globalAlpha = 1
                }
            },
            drawText: function() {
                if (0 != this.tutorialTextOrder) {
                    var e, t, i;
                    t = this.tutorialTextRect.x + this.tutorialUIOffset.x, i = this.tutorialTextRect.y + this.tutorialUIOffset.y, t += 80, i += 28;
                    var n = ig.system.context;
                    e = this.tutorialTextOrder;
                    var s = _STRINGS.Tutorial[this.tutorialID][0],
                        a = _STRINGS.Tutorial[this.tutorialID][1];
                    e < s.length ? (s = s.substr(0, e), a = "") : e < s.length + a.length && (a = a.substr(0, e - s.length)), n.save(), n.font = "16px mainfont, Helvetica, Verdana", e = 2 * n.measureText("m").width / 3, n.translate(t, i + e), n.textAlign = "left", n.fillStyle = "rgba(255,255,255," + this.tutorialTextAlpha + ")", n.fillText(s, 0, 0), n.translate(0, 4 * e / 2), n.fillText(a, 0, 0), n.restore()
                }
            },
            drawJumpInstructions: function() {
                var e = ig.system.context;
                if (ig.ua.mobile) {
                    var t = ig.system.width / 2 + 200,
                        i = this.tutorialTextRect.y - 50,
                        n = 0;
                    if (e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 40, i - 140, 80, 180, 10, !0, !1), 0 <= (n = this.tutorialTime % 1.5) && .5 > n) {
                        var s = n / .25;
                        1 < s && (s = 1), 0 > (n = -Math.PI / 8 + (1 - s) * Math.PI / 4) && (n = 2 * Math.PI + n)
                    } else .5 <= n && .75 > n ? (1 < (s = (n - .5) / .25) && (s = 1), 0 > (n = -Math.PI / 8) && (n = 2 * Math.PI + n), i -= 100 * s) : (1 < (s = (n - .75) / .25) && (s = 1), 0 > (n = -Math.PI / 8 + s * Math.PI / 4) && (n = 2 * Math.PI + n), i -= 100);
                    e.save(), e.translate(t, i), e.rotate(n), this.fingerImage.draw(-this.fingerImage.width / 2, -this.fingerImage.height / 2), e.restore()
                } else t = ig.system.width / 2 + 150, i = this.tutorialTextRect.y - 100, e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 75, i - 30, 150, 105, 10, !0, !1), 1 < (n = this.tutorialTime % 2) && (n = 2 - n), e.globalAlpha = .25 + .75 * n, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i + 10, t, i - 10), e.globalAlpha = 1, i += 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i - 10, t, i + 10), t -= 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t + 10, i, t - 10, i), t += 90, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t - 10, i, t + 10, i)
            },
            drawSlideInstructions: function() {
                var e = ig.system.context;
                if (ig.ua.mobile) {
                    var t = ig.system.width / 2 + 200,
                        i = this.tutorialTextRect.y - 50 - 100,
                        n = 0;
                    if (e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 40, i - 40, 80, 180, 10, !0, !1), 0 <= (n = this.tutorialTime % 1.5) && .5 > n) {
                        var s = n / .25;
                        1 < s && (s = 1), 0 > (n = -Math.PI / 8 + (1 - s) * Math.PI / 4) && (n = 2 * Math.PI + n)
                    } else .5 <= n && .75 > n ? (1 < (s = (n - .5) / .25) && (s = 1), 0 > (n = -Math.PI / 8) && (n = 2 * Math.PI + n), i += 100 * s) : (1 < (s = (n - .75) / .25) && (s = 1), 0 > (n = -Math.PI / 8 + s * Math.PI / 4) && (n = 2 * Math.PI + n), i += 100);
                    e.save(), e.translate(t, i), e.rotate(n), this.fingerImage.draw(-this.fingerImage.width / 2, -this.fingerImage.height / 2), e.restore()
                } else t = ig.system.width / 2 + 150, i = this.tutorialTextRect.y - 100, e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 75, i - 30, 150, 105, 10, !0, !1), e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i + 10, t, i - 10), 1 < (n = this.tutorialTime % 2) && (n = 2 - n), e.globalAlpha = .25 + .75 * n, i += 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i - 10, t, i + 10), e.globalAlpha = 1, t -= 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t + 10, i, t - 10, i), t += 90, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t - 10, i, t + 10, i)
            },
            drawLeftInstructions: function() {
                var e = ig.system.context;
                if (ig.ua.mobile) {
                    var t = ig.system.width / 2 + 200,
                        i = this.tutorialTextRect.y - 50,
                        n = 0;
                    if (e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 140, i - 40, 180, 80, 10, !0, !1), 0 <= (n = this.tutorialTime % 1.5) && .5 > n) {
                        var s = n / .25;
                        1 < s && (s = 1), 0 > (n = -Math.PI / 8 + (1 - s) * Math.PI / 4) && (n = 2 * Math.PI + n)
                    } else .5 <= n && .75 > n ? (1 < (s = (n - .5) / .25) && (s = 1), 0 > (n = -Math.PI / 8) && (n = 2 * Math.PI + n), t -= 100 * s) : (1 < (s = (n - .75) / .25) && (s = 1), 0 > (n = -Math.PI / 8 + s * Math.PI / 4) && (n = 2 * Math.PI + n), t -= 100);
                    e.save(), e.translate(t, i), e.rotate(n), this.fingerImage.draw(-this.fingerImage.width / 2, -this.fingerImage.height / 2), e.restore()
                } else t = ig.system.width / 2 + 150, i = this.tutorialTextRect.y - 100, e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 75, i - 30, 150, 105, 10, !0, !1), e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i + 10, t, i - 10), i += 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i - 10, t, i + 10), 1 < (n = this.tutorialTime % 2) && (n = 2 - n), e.globalAlpha = .25 + .75 * n, t -= 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t + 10, i, t - 10, i), e.globalAlpha = 1, t += 90, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t - 10, i, t + 10, i)
            },
            drawRightInstructions: function() {
                var e = ig.system.context;
                if (ig.ua.mobile) {
                    var t = ig.system.width / 2 + 100,
                        i = this.tutorialTextRect.y - 50,
                        n = 0;
                    if (e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 40, i - 40, 180, 80, 10, !0, !1), 0 <= (n = this.tutorialTime % 1.5) && .5 > n) {
                        var s = n / .25;
                        1 < s && (s = 1), 0 > (n = -Math.PI / 8 + (1 - s) * Math.PI / 4) && (n = 2 * Math.PI + n)
                    } else .5 <= n && .75 > n ? (1 < (s = (n - .5) / .25) && (s = 1), 0 > (n = -Math.PI / 8) && (n = 2 * Math.PI + n), t += 100 * s) : (1 < (s = (n - .75) / .25) && (s = 1), 0 > (n = -Math.PI / 8 + s * Math.PI / 4) && (n = 2 * Math.PI + n), t += 100);
                    e.save(), e.translate(t, i), e.rotate(n), this.fingerImage.draw(-this.fingerImage.width / 2, -this.fingerImage.height / 2), e.restore()
                } else t = ig.system.width / 2 + 150, i = this.tutorialTextRect.y - 100, e.fillStyle = "rgba(0,0,0,0.75)", e.strokeStyle = "rgba(0,0,0,0.75)", this.roundRect(e, t - 75, i - 30, 150, 105, 10, !0, !1), e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i + 10, t, i - 10), i += 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t, i - 10, t, i + 10), t -= 45, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t + 10, i, t - 10, i), 1 < (n = this.tutorialTime % 2) && (n = 2 - n), e.globalAlpha = .25 + .75 * n, t += 90, e.fillStyle = "rgba(255,255,255,1)", e.strokeStyle = "rgba(255,255,255,1)", this.roundRect(e, t - 20, i - 20, 40, 40, 5, !0, !1), this.drawArrow(t - 10, i, t + 10, i), e.globalAlpha = 1
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-character").requires("impact.entity").defines(function() {
        EntityGameCharacter = ig.Entity.extend({
            offset: {
                x: 75,
                y: 240
            },
            size: {
                x: 1,
                y: 1
            },
            charWidth: 50,
            charHeight: 50,
            runContactRect: {
                x: -25,
                y: -50,
                w: 50,
                h: 50
            },
            jumpContactRect: {
                x: -25,
                y: -100,
                w: 50,
                h: 50
            },
            jumpOffset: 0,
            jumpTime: 0,
            alpha: 1,
            zIndex: 1200,
            ballAnimSheet: new ig.AnimationSheet("media/graphics/game/character/ball_11x2.png", 150, 300),
            runAnimSheet: new ig.AnimationSheet("media/graphics/game/character/run_7x2.png", 150, 300),
            slideAnimSheet: new ig.AnimationSheet("media/graphics/game/character/slide_5x4.png", 150, 300),
            jumpAnimSheet: new ig.AnimationSheet("media/graphics/game/character/jump_9x2.png", 150, 300),
            runAnim: null,
            slideAnim: null,
            jumpAnim: null,
            anim: null,
            skateboardRunAnimSheet: new ig.AnimationSheet("media/graphics/game/character/skaterun_8x2.png", 150, 300),
            skateboardJumpAnimSheet: new ig.AnimationSheet("media/graphics/game/character/skatejump_9x2.png", 150, 300),
            rollerskateRunAnimSheet: new ig.AnimationSheet("media/graphics/game/character/rollerrun_5x1.png", 150, 300),
            rollerskateSlideAnimSheet: new ig.AnimationSheet("media/graphics/game/character/rollerslide_9x2.png", 150, 300),
            rollerskateJumpAnimSheet: new ig.AnimationSheet("media/graphics/game/character/rollerjump_8x2.png", 150, 300),
            rocketRunAnimSheet: new ig.AnimationSheet("media/graphics/game/character/rocketrun_7x2.png", 150, 300),
            rocketJumpAnimSheet: new ig.AnimationSheet("media/graphics/game/character/rocketjump_7x3.png", 150, 300),
            carpetAnimSheet: new ig.AnimationSheet("media/graphics/game/character/carpet_5x2.png", 150, 300),
            hoverboardAnimSheet: new ig.AnimationSheet("media/graphics/game/character/hoverboard_4x2.png", 150, 300),
            growTime: 0,
            growFPS: .03,
            growFrame: 0,
            growImage: [new ig.Image("media/graphics/game/character/grow-anim/frame_0000.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0001.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0002.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0003.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0004.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0005.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0006.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0007.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0008.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0009.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0010.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0011.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0012.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0013.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0014.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0015.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0016.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0017.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0018.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0019.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0020.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0021.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0022.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0023.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0024.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0025.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0026.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0027.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0028.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0029.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0030.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0031.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0032.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0033.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0034.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0035.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0036.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0037.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0038.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0039.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0040.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0041.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0042.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0043.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0044.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0045.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0046.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0047.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0048.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0049.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0050.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0051.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0052.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0053.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0054.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0055.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0056.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0057.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0058.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0059.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0060.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0061.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0062.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0063.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0064.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0065.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0066.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0067.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0068.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0069.png"), new ig.Image("media/graphics/game/character/grow-anim/frame_0070.png")],
            STATES: {
                RUN: 0,
                SLIDE: 1,
                JUMP: 2,
                POWERED: 3,
                INTRO: 4
            },
            state: 0,
            worldPos: {
                x: 0,
                y: 0,
                z: 0
            },
            zValue: 13,
            scale: 1,
            scaleModifier: 1,
            zWidth: 1,
            invulnerableDuration: 2,
            invulnerableStartTime: 0,
            isInvulnerable: !1,
            isShaking: !1,
            shakeDuration: .25,
            shakeStartTime: 0,
            shakeOffset: {
                x: 0,
                y: 0
            },
            shakeAmount: 3,
            queuedPowerUp: !1,
            stepSoundPlayed: 0,
            stepSoundPlayedTime: 0,
            control: null,
            init: function(e, t, i) {
                this.parent(e, t, i), this.ballAnim = new ig.Animation(this.ballAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], !1), ig.game.getItemUpgradeEquipped(0) ? (this.runAnim = new ig.Animation(this.skateboardRunAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], !1), this.jumpAnim = new ig.Animation(this.skateboardJumpAnimSheet, .03, [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 13, 13, 14, 15, 16], !0), this.slideAnim = new ig.Animation(this.slideAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 14, 15, 16, 17, 18], !0)) : ig.game.getItemUpgradeEquipped(1) ? (this.runAnim = new ig.Animation(this.rollerskateRunAnimSheet, .03, [0, 1, 2, 3, 4], !1), this.jumpAnim = new ig.Animation(this.rollerskateJumpAnimSheet, .03, [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12, 13, 13, 14, 15], !0), this.slideAnim = new ig.Animation(this.rollerskateSlideAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 14, 15, 16, 17], !0)) : (ig.game.getItemUpgradeEquipped(2) ? (this.runAnim = new ig.Animation(this.rocketRunAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], !1), this.jumpAnim = new ig.Animation(this.rocketJumpAnimSheet, .03, [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], !0)) : ig.game.getItemUpgradeEquipped(3) ? this.jumpAnim = this.runAnim = new ig.Animation(this.carpetAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], !1) : ig.game.getItemUpgradeEquipped(4) ? this.jumpAnim = this.runAnim = new ig.Animation(this.hoverboardAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7], !1) : (this.runAnim = new ig.Animation(this.runAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], !1), this.jumpAnim = new ig.Animation(this.jumpAnimSheet, .03, [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 11, 12, 12, 12, 13, 13, 14, 15, 16], !0)), this.slideAnim = new ig.Animation(this.slideAnimSheet, .03, [0, 1, 2, 3, 4, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 11, 11, 11, 12, 12, 12, 13, 14, 15, 16, 17, 18], !0)), this.anim = this.runAnim, this.charWidth *= this.scaleModifier, this.charHeight *= this.scaleModifier, this.state = this.STATES.INTRO
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0], this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred(), this.growTime = this.control.gameTime
            },
            draw: function() {
                if (this.state == this.STATES.INTRO) {
                    var e = this.pos.x,
                        t = this.pos.y;
                    ig.system.context.save(), ig.system.context.translate(this.bitwiseRound(e), this.bitwiseRound(t)), ig.system.context.scale(.5, .5), this.growImage[this.growFrame].draw(-126, -280), ig.system.context.restore()
                } else {
                    if (e = this.bitwiseRound(this.pos.x), 0 > (t = this.bitwiseRound(this.pos.y)) && (t = 0), 0 < t) {
                        var i = 1 - -this.jumpOffset / 500;
                        0 > i && (i = 0);
                        var n = 30 * i,
                            s = ig.system.context;
                        s.save(), s.translate(e, t), s.scale(1, .5), s.beginPath(), s.arc(0, 0, n, 0, 2 * Math.PI, !1), s.fillStyle = "rgba(0,0,0," + .2 * i + ")", s.fill(), s.restore()
                    }
                    e = this.pos.x - this.offset.x + this.shakeOffset.x, t = this.pos.y + this.jumpOffset - this.offset.y + this.shakeOffset.y, ig.system.context.globalAlpha = this.alpha, this.anim.draw(this.bitwiseRound(e), this.bitwiseRound(t)), ig.system.context.globalAlpha = 1
                }
            },
            update: function() {
                if (!this.control.gamePaused && !this.control.gameOver && !this.control.gameStarting) {
                    if (this.parent(), this.state == this.STATES.INTRO) {
                        var e = this.control.gameTime - this.growTime;
                        if (this.growFrame = Math.floor(e / this.growFPS), this.growFrame >= this.growImage.length && (this.growFrame = this.growImage.length - 1, 2.5 < e)) return void this.run()
                    }
                    this.state == this.STATES.RUN && (ig.game.getItemUpgradeEquipped(0) || ig.game.getItemUpgradeEquipped(1) ? 2 < (e = ig.system.clock.delta() - this.stepSoundPlayedTime) && (this.stepSoundPlayedTime = ig.system.clock.delta(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.skate)) : !ig.game.getItemUpgradeEquipped(3) && !ig.game.getItemUpgradeEquipped(4) && (4 == this.runAnim.frame && 4 != this.stepSoundPlayed && (this.stepSoundPlayed = 4, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step)), 11 == this.runAnim.frame && 11 != this.stepSoundPlayed && (this.stepSoundPlayed = 11, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step)))), this.state == this.STATES.POWERED && (3 == this.ballAnim.frame && 3 != this.stepSoundPlayed && (this.stepSoundPlayed = 3, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step)), 8 == this.ballAnim.frame && 8 != this.stepSoundPlayed && (this.stepSoundPlayed = 8, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step)), 14 == this.ballAnim.frame && 14 != this.stepSoundPlayed && (this.stepSoundPlayed = 14, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step)), 19 == this.ballAnim.frame && 19 != this.stepSoundPlayed && (this.stepSoundPlayed = 19, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.step))), this.control.tutorialPauseMode || (this.anim.update(), this.isInvulnerable && ((e = this.control.gameTime - this.invulnerableStartTime) >= this.invulnerableDuration ? (this.alpha = 1, this.isInvulnerable = !1) : (.25 < (e %= .5) && (e = .25 - (e - .25)), this.alpha = .25 + e / .25 * .75)), this.isShaking && (e = this.control.gameTime - this.shakeStartTime) >= this.shakeDuration && (this.shakeOffset.x = 0, this.shakeOffset.y = 0, this.isShaking = !1), this.queuedPowerUp && (this.state == this.STATES.RUN || this.state == this.STATES.SLIDE) && this.powerUp())
                }
            },
            run: function() {
                this.state != this.STATES.POWERED && (this.state = this.STATES.RUN, this.anim = this.runAnim, this.anim.rewind(), this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred())
            },
            slide: function() {
                this.state != this.STATES.POWERED && (this.state = this.STATES.SLIDE, this.anim = this.slideAnim, this.anim.rewind(), this.zIndex = 1200 - this.zValue, this.zIndex -= 1, ig.game.sortEntitiesDeferred(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.slide))
            },
            jump: function() {
                this.jumpTime = this.control.gameTime, this.zIndex = 1200 - this.zValue, this.zIndex += 10, ig.game.sortEntitiesDeferred(), this.state != this.STATES.POWERED && !ig.game.getItemUpgradeEquipped(3) && !ig.game.getItemUpgradeEquipped(4) && (this.state = this.STATES.JUMP, this.anim = this.jumpAnim, this.anim.gotoFrame(0), this.anim.rewind()), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.jump)
            },
            queuePowerUp: function() {
                this.queuedPowerUp = !0
            },
            powerUp: function() {
                this.queuedPowerUp = !1, this.state != this.STATES.POWERED && (this.state = this.STATES.POWERED, this.anim = this.ballAnim, this.anim.rewind(), this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred())
            },
            powerDown: function() {
                if (0 > this.jumpOffset) {
                    this.state = this.STATES.JUMP, this.anim = this.jumpAnim;
                    var e = Math.floor((this.control.gameTime - this.jumpTime) / this.anim.frameTime);
                    this.anim.rewind(), this.anim.gotoFrame(e)
                } else this.state = this.STATES.RUN, this.run();
                this.invulnerableStartTime = this.control.gameTime - 1, this.isInvulnerable = !0
            },
            shake: function() {
                this.isShaking = !0, this.shakeStartTime = this.control.gameTime, this.shakeOffset.x = -this.shakeAmount + 2 * Math.random() * this.shakeAmount, this.shakeOffset.y = -this.shakeAmount
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-bgObject").requires("impact.entity").defines(function() {
        EntityGameBgObject = ig.Entity.extend({
            offset: {
                x: 140,
                y: 362
            },
            size: {
                x: 1,
                y: 1
            },
            contactRect: {
                x: 0,
                y: 0
            },
            zIndex: 1200,
            image: null,
            images: [new ig.Image("media/graphics/game/objects/bg00.png"), new ig.Image("media/graphics/game/objects/bg01.png"), new ig.Image("media/graphics/game/objects/bg02.png"), new ig.Image("media/graphics/game/objects/bg03.png"), new ig.Image("media/graphics/game/objects/bg04.png"), new ig.Image("media/graphics/game/objects/bg05.png"), new ig.Image("media/graphics/game/objects/bg06.png"), new ig.Image("media/graphics/game/objects/bg07.png"), new ig.Image("media/graphics/game/objects/bg08.png"), new ig.Image("media/graphics/game/objects/bg09.png"), new ig.Image("media/graphics/game/objects/bg10.png"), new ig.Image("media/graphics/game/objects/bg11.png"), new ig.Image("media/graphics/game/objects/bg12.png"), new ig.Image("media/graphics/game/objects/bg13.png"), new ig.Image("media/graphics/game/objects/bg14.png"), new ig.Image("media/graphics/game/objects/bg15.png"), new ig.Image("media/graphics/game/objects/bg16.png"), new ig.Image("media/graphics/game/objects/bg17.png"), new ig.Image("media/graphics/game/objects/bg18.png"), new ig.Image("media/graphics/game/objects/bg19.png"), new ig.Image("media/graphics/game/objects/bg20.png"), new ig.Image("media/graphics/game/objects/bg21.png"), new ig.Image("media/graphics/game/objects/bg22.png"), new ig.Image("media/graphics/game/objects/bg23.png"), new ig.Image("media/graphics/game/objects/bg24.png"), new ig.Image("media/graphics/game/objects/bg25.png"), new ig.Image("media/graphics/game/objects/bg26.png"), new ig.Image("media/graphics/game/objects/bg27.png")],
            imageId: 0,
            worldPos: {
                x: 0,
                y: 0,
                z: 0
            },
            zValue: 0,
            scale: 1,
            scaleModifier: 1,
            objType: 0,
            control: null,
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0], this.setImageId(this.imageId), this.scale = this.control.cameraDistance / this.zValue, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred()
            },
            setImageId: function(e) {
                null != e && (this.imageId = e, this.image = this.images[e], this.offset.x = this.image.width / 2, this.offset.y = this.image.height)
            },
            draw: function() {
                var e = this.worldPos.x,
                    t = this.worldPos.y,
                    i = this.zValue,
                    n = this.control.cameraDistance; - 10 > i ? (this.killed = !0, this.control.cleanObjects(), this.kill()) : (i = n / i, e = ig.system.width / 2 - this.control.cameraPos.x * i + e * i, t = this.control.cameraPos.y * i + ig.system.height - t * i - (1 - i) * (ig.system.height - this.control.vanishingPoint.y), this.pos.x = e, this.pos.y = t, e = this.control.horizonLine.y, n = this.control.horizonLine.y + this.control.distanceFogHeight, t < e || (t < n && (ig.system.context.globalAlpha = (t - e) / (n - e)), i *= this.scaleModifier, t = this.pos.y - this.offset.y * i - ig.game._rscreen.y, ig.system.context.drawImage(this.image.data, this.bitwiseRound(this.pos.x - this.offset.x * i - ig.game._rscreen.x), this.bitwiseRound(t), this.image.width * i, this.image.height * i), ig.system.context.globalAlpha = 1))
            },
            update: function() {
                this.control.gamePaused || this.control.gameOver || this.control.gameStarting || this.control.character.state != this.control.character.STATES.INTRO && (this.control.tutorialPauseMode || this.moveForward(-this.control.runSpeed * ig.system.tick))
            },
            moveForward: function(e) {
                this.zValue += e, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred()
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-obstacle").requires("impact.entity").defines(function() {
        EntityGameObstacle = ig.Entity.extend({
            offset: {
                x: 72,
                y: 100
            },
            size: {
                x: 1,
                y: 1
            },
            contactRect: {
                x: -58,
                y: -95,
                w: 119,
                h: 92
            },
            zIndex: 1200,
            image: null,
            images: [new ig.Image("media/graphics/game/objects/obstacle00.png"), new ig.Image("media/graphics/game/objects/obstacle01.png"), new ig.Image("media/graphics/game/objects/obstacle02.png"), new ig.Image("media/graphics/game/objects/obstacle03.png"), new ig.Image("media/graphics/game/objects/obstacle04.png"), new ig.Image("media/graphics/game/objects/obstacle05.png"), new ig.Image("media/graphics/game/objects/obstacle06.png"), new ig.Image("media/graphics/game/objects/obstacle07.png"), new ig.Image("media/graphics/game/objects/obstacle08.png"), new ig.Image("media/graphics/game/objects/obstacle09.png"), new ig.Image("media/graphics/game/objects/obstacle10.png"), new ig.Image("media/graphics/game/objects/obstacle11.png")],
            imageId: 0,
            worldPos: {
                x: 0,
                y: 0,
                z: 0
            },
            zValue: 0,
            scale: 1,
            scaleModifier: 1,
            objType: 1,
            slidable: !1,
            zWidth: 0,
            knockedOut: !1,
            knockOutPos: {
                x: 0,
                y: 0
            },
            knockOutOffset: {
                x: 0,
                y: 0
            },
            knockOutGravity: 1200,
            knockOutVector: {
                x: 0,
                y: 0
            },
            knockOutAlpha: 0,
            knockOutAngle: 0,
            knockOutDirection: 1,
            knockOutStopped: !1,
            control: null,
            init: function(e, t, i) {
                this.parent(e, t, i)
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0], this.setImageId(this.imageId), this.scale = this.control.cameraDistance / this.zValue, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred()
            },
            setImageId: function(e) {
                null != e && (0 != e && 1 != e && 2 != e || (e = 0 + Math.floor(3 * Math.random())), 8 != e && 9 != e || (e = 8 + Math.floor(2 * Math.random())), 10 != e && 11 != e || (e = 10 + Math.floor(2 * Math.random())), this.imageId = e, this.image = this.images[e], this.offset.x = this.image.width / 2, this.offset.y = this.image.height, this.slidable = 3 == e, this.contactRect.w = this.image.width * this.scaleModifier, this.contactRect.h = this.image.height / 2 * this.scaleModifier, this.contactRect.x = -this.contactRect.w / 2, this.contactRect.y = -this.contactRect.h, 5 != e && 6 != e && 8 != e && 9 != e || (this.zWidth = 3), 10 != e && 11 != e || (this.zWidth = 5))
            },
            draw: function() {
                var e = this.worldPos.x,
                    t = this.worldPos.y,
                    i = this.zValue,
                    n = this.control.cameraDistance;
                if (-10 > i) this.killed = !0, this.control.cleanObjects(), this.kill();
                else {
                    var s = 0;
                    if (this.knockedOut && (e += this.knockOutPos.x, t -= this.knockOutPos.y, s = this.knockOutAngle), i = n / i, e = ig.system.width / 2 - this.control.cameraPos.x * i + e * i, t = this.control.cameraPos.y * i + ig.system.height - t * i - (1 - i) * (ig.system.height - this.control.vanishingPoint.y), this.pos.x = e, this.pos.y = t, e = this.control.horizonLine.y, n = this.control.horizonLine.y + this.control.distanceFogHeight, !(t < e)) {
                        t < n && (ig.system.context.globalAlpha = (t - e) / (n - e)), this.knockedOut && (ig.system.context.globalAlpha *= this.knockOutAlpha);
                        var a = i * this.scaleModifier,
                            o = (i = this.pos.x, t = this.pos.y, e = -this.offset.x * a, n = -this.offset.y * a, this.image.width * a);
                        0 > o && (o = 0), 0 > (a = this.image.height * a) && (a = 0), ig.system.context.save(), ig.system.context.translate(i, t), 0 < s && ig.system.context.rotate(s), ig.system.context.drawImage(this.image.data, e, n, o, a), ig.system.context.restore(), ig.system.context.globalAlpha = 1
                    }
                }
            },
            update: function() {
                this.control.gamePaused || this.control.gameOver || this.control.gameStarting || this.control.character.state != this.control.character.STATES.INTRO && (this.control.tutorialPauseMode || this.moveForward(-this.control.runSpeed * ig.system.tick))
            },
            moveForward: function(e) {
                this.zValue += e, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred(), this.knockedOut && (this.zIndex = 2e3, ig.game.sortEntitiesDeferred(), this.knockOutPos.x += this.knockOutVector.x * ig.system.tick, this.knockOutPos.y += this.knockOutVector.y * ig.system.tick, 0 < this.knockOutPos.y && (this.knockOutPos.y = 0, this.knockOutVector.x = 0, this.knockOutVector.y = 0, this.knockOutStopped = !0), this.knockOutStopped || (this.knockOutVector.y += this.knockOutGravity * ig.system.tick, this.knockOutAngle += this.knockOutDirection * Math.PI * 3 * ig.system.tick, 0 > this.knockOutAngle && (this.knockOutAngle = 2 * Math.PI + this.knockOutAngle), this.knockOutAlpha -= 2 * ig.system.tick, 0 > this.knockOutAlpha && (this.knockOutAlpha = 0, this.knockOutStopped = !0)))
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            },
            knockOut: function() {
                if (!this.knockedOut) {
                    this.knockedOut = !0;
                    var e = 200 + 100 * Math.random(),
                        t = 1;
                    85 < this.worldPos.x ? t = 1 : -85 > this.worldPos.x ? t = -1 : .5 <= Math.random() && (t = -1), this.knockOutVector.x = e * t / .25, this.knockOutVector.y = -1200, this.knockOutPos.x = 0, this.knockOutPos.y = 0, this.knockOutAlpha = 1, this.knockOutAngle = 0, this.knockOutDirection = t
                }
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-pickup").requires("impact.entity").defines(function() {
        EntityGamePickup = ig.Entity.extend({
            offset: {
                x: 68,
                y: 126
            },
            size: {
                x: 1,
                y: 1
            },
            contactRect: {
                x: -57,
                y: -109,
                w: 114,
                h: 106
            },
            zIndex: 1200,
            cookieImage: new ig.Image("media/graphics/game/pickups/cookie.png"),
            cookieOffset: {
                x: 0,
                y: 0
            },
            cookieDown: !1,
            coinAnimSheet: new ig.AnimationSheet("media/graphics/game/pickups/coin_1x10.png", 70, 66),
            anim: null,
            worldPos: {
                x: 0,
                y: 0,
                z: 0
            },
            zValue: 0,
            scale: 1,
            scaleModifier: 1,
            objType: 2,
            zWidth: 0,
            pickupId: 0,
            control: null,
            init: function(e, t, i) {
                this.parent(e, t, i), this.anim = new ig.Animation(this.coinAnimSheet, .08, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], !1), this.offset.x = 35, this.offset.y = 66, this.contactRect.w = 70, this.contactRect.h = 66, this.contactRect.x = -this.contactRect.w / 2, this.contactRect.y = -this.contactRect.h
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0], this.scale = this.control.cameraDistance / this.zValue, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred()
            },
            setPickupId: function(e) {
                null != e && (this.pickupId = e, 1 == e ? (this.offset.x = this.cookieImage.width / 2, this.offset.y = this.cookieImage.height, this.contactRect.w = this.cookieImage.width, this.contactRect.h = this.cookieImage.height) : (this.offset.x = 35, this.offset.y = 66, this.contactRect.w = 70, this.contactRect.h = 66), this.contactRect.x = -this.contactRect.w / 2, this.contactRect.y = -this.contactRect.h / 2)
            },
            draw: function() {
                var e, t = this.worldPos.x,
                    i = this.worldPos.y,
                    n = this.zValue,
                    s = this.control.cameraDistance;
                if (-10 > n) this.killed = !0, this.control.cleanObjects(), this.kill();
                else if (s /= n, t = ig.system.width / 2 - this.control.cameraPos.x * s + t * s, e = this.control.cameraPos.y * s + ig.system.height - i * s - (1 - s) * (ig.system.height - this.control.vanishingPoint.y), this.pos.x = t, this.pos.y = e, !(65 < n)) {
                    if (45 < n && (ig.system.context.globalAlpha = 1 - (n - 45) / 20), n = s * this.scaleModifier, 0 > (s = this.control.cameraPos.y * s + ig.system.height - (1 - s) * (ig.system.height - this.control.vanishingPoint.y)) && (s = 0), 1 == this.pickupId) {
                        if (0 < s) {
                            0 > (t = 1 - (i - this.cookieOffset.y) / 500) && (t = 0), e = this.cookieImage.width / 4 * n * t, i = this.pos.x;
                            var a = ig.system.context;
                            a.save(), a.translate(this.bitwiseRound(i), this.bitwiseRound(s)), a.scale(1, .5), a.beginPath(), a.arc(0, 0, e, 0, 2 * Math.PI, !1), a.fillStyle = "rgba(0,0,0," + .2 * t + ")", a.fill(), a.restore()
                        }
                        i = this.pos.x - (this.offset.x - this.cookieOffset.x) * n, s = this.pos.y - (this.offset.y - this.cookieOffset.y) * n, t = this.cookieImage.width * n, n *= this.cookieImage.height, 0 < t && 0 < n && ig.system.context.drawImage(this.cookieImage.data, i, s, t, n)
                    } else 0 < s && (0 > (t = 1 - i / 500) && (t = 0), e = 17.5 * n * t, i = this.pos.x, (a = ig.system.context).save(), a.translate(this.bitwiseRound(i), this.bitwiseRound(s)), a.scale(1, .5), a.beginPath(), a.arc(0, 0, e, 0, 2 * Math.PI, !1), a.fillStyle = "rgba(0,0,0," + .2 * t + ")", a.fill(), a.restore()), i = this.pos.x - this.offset.x * n, s = this.pos.y - this.offset.y * n, ig.system.context.save(), ig.system.context.translate(this.bitwiseRound(i), this.bitwiseRound(s)), ig.system.context.scale(n, n), this.anim.draw(0, 0), ig.system.context.restore();
                    ig.system.context.globalAlpha = 1
                }
            },
            update: function() {
                !this.control.gamePaused && !this.control.gameOver && !this.control.gameStarting && this.control.character.state != this.control.character.STATES.INTRO && !this.control.tutorialPauseMode && (this.moveForward(-this.control.runSpeed * ig.system.tick), 1 == this.pickupId ? this.cookieDown ? (this.cookieOffset.y += 60 * ig.system.tick, 0 <= this.cookieOffset.y && (this.cookieOffset.y = -this.cookieOffset.y, this.cookieDown = !1)) : (this.cookieOffset.y -= 60 * ig.system.tick, -20 >= this.cookieOffset.y && (this.cookieOffset.y = -20 - (this.cookieOffset.y + 20), this.cookieDown = !0)) : this.anim.update())
            },
            moveForward: function(e) {
                this.zValue += e, this.zIndex = 1200 - this.zValue, ig.game.sortEntitiesDeferred()
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-hiteffect").requires("impact.entity").defines(function() {
        EntityGameHiteffect = ig.Entity.extend({
            offset: {
                x: 150,
                y: 150
            },
            size: {
                x: 1,
                y: 1
            },
            contactRect: {
                x: 0,
                y: 0
            },
            zIndex: 1300,
            explodeAnimSheet: new ig.AnimationSheet("media/graphics/game/effects/explosion_4x2.png", 300, 300),
            explode2AnimSheet: new ig.AnimationSheet("media/graphics/game/effects/explosion2_4x2.png", 300, 300),
            explodeAnim: null,
            explode2Anim: null,
            anim: null,
            worldPos: {
                x: 0,
                y: 0,
                z: 0
            },
            zValue: 0,
            scale: 1,
            scaleModifier: 1,
            angle: 0,
            alpha: 1,
            timeAlive: 0,
            effectDuration: .3,
            effectId: 0,
            control: null,
            init: function(e, t, i) {
                this.parent(e, t, i), this.explodeAnim = new ig.Animation(this.explodeAnimSheet, this.effectDuration / 7, [0, 1, 2, 3, 4, 5, 6], !0), this.anim = this.explode2Anim = new ig.Animation(this.explode2AnimSheet, this.effectDuration / 8, [0, 1, 2, 3, 4, 5, 6, 7], !0), this.angle = 2 * Math.random() * Math.PI
            },
            ready: function() {
                this.control = ig.game.getEntitiesByType(EntityGameControl)[0]
            },
            setEffectId: function(e) {
                this.effectId = e, 1 == e ? (this.anim = this.explodeAnim, this.offset.y = 150, this.scaleModifier = .8) : this.anim = this.explode2Anim
            },
            draw: function() {
                var e = this.scale * this.scaleModifier,
                    t = this.bitwiseRound(this.pos.x),
                    i = this.bitwiseRound(this.pos.y),
                    n = this.bitwiseRound(-this.offset.x),
                    s = this.bitwiseRound(-this.offset.y);
                ig.system.context.save(), ig.system.context.globalAlpha = this.alpha, ig.system.context.translate(t, i), ig.system.context.rotate(this.angle), ig.system.context.scale(e, e), this.anim.draw(n, s), ig.system.context.restore()
            },
            update: function() {
                if (!this.control.gamePaused && (this.anim.update(), this.timeAlive += ig.system.tick, this.timeAlive > this.effectDuration && (this.killed = !0, this.control.cleanEffects(), this.kill()), 1 == this.effectId)) {
                    var e = this.timeAlive / this.effectDuration;
                    1 < e && (e = 1), 0 > e && (e = 0), .5 < e && (this.alpha = 1 - (e - .5) / .5)
                }
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            }
        })
    }), ig.baked = !0, ig.module("game.entities.game-control").requires("impact.entity", "game.entities.game-ui", "game.entities.game-character", "game.entities.game-bgObject", "game.entities.game-obstacle", "game.entities.game-pickup", "game.entities.game-hiteffect").defines(function() {
        EntityGameControl = ig.Entity.extend({
            zIndex: 100,
            cityImage: new ig.Image("media/graphics/game/backgrounds/cityscape.png"),
            cityPos: {
                x: 0,
                y: 122
            },
            cloudImage: [new ig.Image("media/graphics/game/backgrounds/cloud0.png"), new ig.Image("media/graphics/game/backgrounds/cloud1.png"), new ig.Image("media/graphics/game/backgrounds/cloud2.png")],
            cloudPos: [{
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }, {
                x: 0,
                y: 0
            }],
            gameStarting: !0,
            gameEnding: !1,
            gamePaused: !1,
            gameOver: !1,
            ui: null,
            character: null,
            gameStartTime: 0,
            gameTime: 0,
            gameOverTime: 0,
            tutorialMode: !1,
            tutorialPauseMode: !1,
            tutorialStage: 0,
            tutorialStopDistance: 0,
            tutorialPausedTime: 0,
            vanishingPoint: {
                x: 240,
                y: 80
            },
            horizonLine: {
                x: 0,
                y: 164
            },
            distanceFogHeight: 22,
            sidewalk1ScreenPoints: Array(4),
            sidewalk2ScreenPoints: Array(4),
            roadScreenPoints: Array(4),
            roadLine1ScreenPoints: Array(4),
            roadLine2ScreenPoints: Array(4),
            laneLine1ScreenPoints: Array(4),
            laneLine2ScreenPoints: Array(4),
            grass1ScreenPoints: Array(4),
            grass2ScreenPoints: Array(4),
            cameraPos: {
                x: 0,
                y: 0,
                z: 0
            },
            sidewalkPos: {
                x: 0,
                y: 0
            },
            sidewalkWidth: 950,
            sidewalkColor: {
                r: 214,
                g: 220,
                b: 230
            },
            sidewalk1Pos: {
                x: -373,
                y: 0
            },
            sidewalk1Width: 200,
            sidewalk2Pos: {
                x: 373,
                y: 0
            },
            sidewalk2Width: 200,
            roadPos: {
                x: 0,
                y: 0
            },
            roadWidth: 526,
            roadColor: {
                r: 89,
                g: 100,
                b: 106
            },
            roadLine1Pos: {
                x: 268,
                y: 0
            },
            roadLine1Width: 10,
            roadLine1Color: {
                r: 120,
                g: 141,
                b: 175
            },
            roadLine2Pos: {
                x: -268,
                y: 0
            },
            roadLine2Width: 10,
            roadLine2Color: {
                r: 120,
                g: 141,
                b: 175
            },
            laneLine1Pos: {
                x: -95,
                y: 0,
                z: 0
            },
            laneLine1Width: 15,
            laneLine1Color: {
                r: 255,
                g: 255,
                b: 255
            },
            laneLine2Pos: {
                x: 95,
                y: 0,
                z: 0
            },
            laneLine2Width: 15,
            laneLine2Color: {
                r: 255,
                g: 255,
                b: 255
            },
            roadZOffset: 0,
            laneLineLength: 4,
            cameraDistance: 10,
            vanishingPointOffset: {
                x: 0,
                y: 0
            },
            runSpeed: 15,
            maxRunSpeed: 20,
            acceleration: 1 / 60,
            jumpGravity: 2e3,
            jumpAmt: 0,
            canSlide: !0,
            isSliding: !1,
            slideDuration: 1,
            slideTime: 0,
            objects: [],
            effects: [],
            segments: [],
            bgSets: [],
            segmentSize: 30,
            bgSetSize: 90,
            segmentSizeVariable: 5,
            totalDistance: 0,
            lastBgSetDistance: 0,
            lastSegmentDistance: 0,
            bgSetDefinitions: [
                [{
                    id: 11,
                    x: -350,
                    y: 0,
                    z: 0
                }, {
                    id: 6,
                    x: -350,
                    y: 0,
                    z: 3
                }, {
                    id: 12,
                    x: -300,
                    y: 10,
                    z: 7
                }, {
                    id: 7,
                    x: -350,
                    y: 0,
                    z: 9
                }, {
                    id: 10,
                    x: -350,
                    y: -10,
                    z: 12
                }, {
                    id: 13,
                    x: -360,
                    y: 0,
                    z: 16.95
                }, {
                    id: 8,
                    x: -350,
                    y: 0,
                    z: 17
                }, {
                    id: 9,
                    x: -350,
                    y: 0,
                    z: 21
                }, {
                    id: 27,
                    x: -350,
                    y: 0,
                    z: 24
                }, {
                    id: 26,
                    x: -350,
                    y: 0,
                    z: 27
                }, {
                    id: 11,
                    x: -350,
                    y: 0,
                    z: 30
                }, {
                    id: 6,
                    x: -350,
                    y: 0,
                    z: 33
                }, {
                    id: 12,
                    x: -300,
                    y: 10,
                    z: 37
                }, {
                    id: 7,
                    x: -350,
                    y: 0,
                    z: 39
                }, {
                    id: 10,
                    x: -350,
                    y: -10,
                    z: 42
                }, {
                    id: 13,
                    x: -360,
                    y: 0,
                    z: 46.95
                }, {
                    id: 8,
                    x: -350,
                    y: 0,
                    z: 47
                }, {
                    id: 9,
                    x: -350,
                    y: 0,
                    z: 51
                }, {
                    id: 27,
                    x: -350,
                    y: 0,
                    z: 54
                }, {
                    id: 26,
                    x: -350,
                    y: 0,
                    z: 57
                }, {
                    id: 11,
                    x: -350,
                    y: 0,
                    z: 60
                }, {
                    id: 6,
                    x: -350,
                    y: 0,
                    z: 63
                }, {
                    id: 12,
                    x: -300,
                    y: 10,
                    z: 67
                }, {
                    id: 7,
                    x: -350,
                    y: 0,
                    z: 69
                }, {
                    id: 10,
                    x: -350,
                    y: -10,
                    z: 72
                }, {
                    id: 13,
                    x: -360,
                    y: 0,
                    z: 76.95
                }, {
                    id: 8,
                    x: -350,
                    y: 0,
                    z: 77
                }, {
                    id: 9,
                    x: -350,
                    y: 0,
                    z: 81
                }, {
                    id: 27,
                    x: -350,
                    y: 0,
                    z: 84
                }, {
                    id: 26,
                    x: -350,
                    y: 0,
                    z: 87
                }, {
                    id: 1,
                    x: -550,
                    y: 0,
                    z: 8
                }, {
                    id: 4,
                    x: -550,
                    y: 0,
                    z: 10
                }, {
                    id: 0,
                    x: -650,
                    y: 0,
                    z: 19
                }, {
                    id: 3,
                    x: -570,
                    y: 0,
                    z: 20
                }, {
                    id: 1,
                    x: -1e3,
                    y: 0,
                    z: 27
                }, {
                    id: 5,
                    x: -550,
                    y: 0,
                    z: 28
                }, {
                    id: 1,
                    x: -550,
                    y: 0,
                    z: 38
                }, {
                    id: 4,
                    x: -550,
                    y: 0,
                    z: 40
                }, {
                    id: 0,
                    x: -650,
                    y: 0,
                    z: 49
                }, {
                    id: 3,
                    x: -570,
                    y: 0,
                    z: 50
                }, {
                    id: 1,
                    x: -1e3,
                    y: 0,
                    z: 57
                }, {
                    id: 5,
                    x: -550,
                    y: 0,
                    z: 58
                }, {
                    id: 1,
                    x: -550,
                    y: 0,
                    z: 68
                }, {
                    id: 4,
                    x: -550,
                    y: 0,
                    z: 70
                }, {
                    id: 0,
                    x: -650,
                    y: 0,
                    z: 79
                }, {
                    id: 3,
                    x: -570,
                    y: 0,
                    z: 80
                }, {
                    id: 1,
                    x: -1e3,
                    y: 0,
                    z: 87
                }, {
                    id: 5,
                    x: -550,
                    y: 0,
                    z: 88
                }, {
                    id: 23,
                    x: 350,
                    y: 0,
                    z: 0
                }, {
                    id: 19,
                    x: 350,
                    y: 0,
                    z: 3
                }, {
                    id: 25,
                    x: 300,
                    y: 0,
                    z: 7
                }, {
                    id: 20,
                    x: 350,
                    y: 0,
                    z: 8
                }, {
                    id: 22,
                    x: 350,
                    y: 0,
                    z: 11
                }, {
                    id: 17,
                    x: 350,
                    y: 0,
                    z: 14
                }, {
                    id: 24,
                    x: 350,
                    y: 0,
                    z: 19
                }, {
                    id: 21,
                    x: 350,
                    y: 0,
                    z: 22
                }, {
                    id: 18,
                    x: 350,
                    y: 0,
                    z: 26
                }, {
                    id: 23,
                    x: 350,
                    y: 0,
                    z: 30
                }, {
                    id: 19,
                    x: 350,
                    y: 0,
                    z: 33
                }, {
                    id: 25,
                    x: 300,
                    y: 0,
                    z: 37
                }, {
                    id: 20,
                    x: 350,
                    y: 0,
                    z: 38
                }, {
                    id: 22,
                    x: 350,
                    y: 0,
                    z: 41
                }, {
                    id: 17,
                    x: 350,
                    y: 0,
                    z: 44
                }, {
                    id: 24,
                    x: 350,
                    y: 0,
                    z: 49
                }, {
                    id: 21,
                    x: 350,
                    y: 0,
                    z: 52
                }, {
                    id: 18,
                    x: 350,
                    y: 0,
                    z: 56
                }, {
                    id: 23,
                    x: 350,
                    y: 0,
                    z: 60
                }, {
                    id: 19,
                    x: 350,
                    y: 0,
                    z: 63
                }, {
                    id: 25,
                    x: 300,
                    y: 0,
                    z: 67
                }, {
                    id: 20,
                    x: 350,
                    y: 0,
                    z: 68
                }, {
                    id: 22,
                    x: 350,
                    y: 0,
                    z: 71
                }, {
                    id: 17,
                    x: 350,
                    y: 0,
                    z: 74
                }, {
                    id: 24,
                    x: 350,
                    y: 0,
                    z: 79
                }, {
                    id: 21,
                    x: 350,
                    y: 0,
                    z: 82
                }, {
                    id: 18,
                    x: 350,
                    y: 0,
                    z: 86
                }, {
                    id: 2,
                    x: 500,
                    y: 0,
                    z: 8
                }, {
                    id: 14,
                    x: 550,
                    y: 0,
                    z: 9
                }, {
                    id: 15,
                    x: 600,
                    y: 0,
                    z: 19
                }, {
                    id: 16,
                    x: 550,
                    y: 0,
                    z: 23
                }, {
                    id: 2,
                    x: 500,
                    y: 0,
                    z: 38
                }, {
                    id: 14,
                    x: 550,
                    y: 0,
                    z: 39
                }, {
                    id: 15,
                    x: 600,
                    y: 0,
                    z: 49
                }, {
                    id: 16,
                    x: 550,
                    y: 0,
                    z: 53
                }, {
                    id: 2,
                    x: 500,
                    y: 0,
                    z: 68
                }, {
                    id: 14,
                    x: 550,
                    y: 0,
                    z: 69
                }, {
                    id: 15,
                    x: 600,
                    y: 0,
                    z: 79
                }, {
                    id: 16,
                    x: 550,
                    y: 0,
                    z: 83
                }]
            ],
            segmentDefinitions: [
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 17
                }, {
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 12
                }, {
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 14
                }, {
                    id: 3,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 11
                }, {
                    type: 2,
                    id: 1,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 19
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 25
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 25
                }],
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 17
                }, {
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 14
                }, {
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 12
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 15
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 19
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 25
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 25
                }],
                [{
                    id: 3,
                    x: -90,
                    y: 0,
                    z: 11
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 10
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 15
                }, {
                    type: 2,
                    id: 1,
                    x: -175,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 27
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 30
                }],
                [{
                    id: 3,
                    x: -90,
                    y: 0,
                    z: 11
                }, {
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 15
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 10
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 15
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 1,
                    x: -175,
                    y: 200,
                    z: 15
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 23
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 25
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 27
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 30
                }],
                [{
                    id: 3,
                    x: 90,
                    y: 0,
                    z: 11
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 10
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 15
                }, {
                    type: 2,
                    id: 1,
                    x: 175,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 28
                }],
                [{
                    id: 3,
                    x: 90,
                    y: 0,
                    z: 11
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 10
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 15
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 20
                }, {
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 22
                }, {
                    type: 2,
                    id: 1,
                    x: 0,
                    y: 200,
                    z: 22
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 28
                }],
                [{
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 10
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 15
                }, {
                    id: 3,
                    x: 90,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 28
                }, {
                    type: 2,
                    id: 1,
                    x: -175,
                    y: 0,
                    z: 24
                }],
                [{
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 20
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 25
                }, {
                    id: 3,
                    x: 90,
                    y: 0,
                    z: 21
                }, {
                    id: 0,
                    x: 170,
                    y: 0,
                    z: 10
                }, {
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 10
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 10
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 200,
                    z: 10
                }, {
                    type: 2,
                    id: 1,
                    x: 0,
                    y: 0,
                    z: 21
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 21
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 30
                }],
                [{
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 17
                }, {
                    id: 3,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 12
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 11
                }, {
                    type: 2,
                    id: 1,
                    x: 0,
                    y: 0,
                    z: 11
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 17
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 19
                }, {
                    type: 2,
                    id: 0,
                    x: -175,
                    y: 0,
                    z: 25
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 25
                }],
                [{
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 22
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 27
                }, {
                    id: 3,
                    x: 0,
                    y: 0,
                    z: 21
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 22
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 27
                }, {
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 7
                }, {
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 7
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 200,
                    z: 21
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 21
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 27
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 29
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 7
                }],
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 11
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 16
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 10
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 14
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 26
                }],
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 11
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 16
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 10
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 15
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 14
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 16
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 30
                }],
                [{
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 11
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 10
                }, {
                    id: 11,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 16
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 18
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 22
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 24
                }],
                [{
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 11
                }, {
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 17
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 23
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 28
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 10
                }, {
                    id: 11,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    id: 1,
                    x: -175,
                    y: 0,
                    z: 14
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 23
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 29
                }],
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 10
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 13
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 18
                }, {
                    id: 7,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    id: 7,
                    x: 170,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 28
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 16
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 24
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 26
                }],
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 10
                }, {
                    id: 10,
                    x: 170,
                    y: 0,
                    z: 13
                }, {
                    id: 11,
                    x: 170,
                    y: 0,
                    z: 20
                }, {
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 12
                }, {
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 20
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 26
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 28
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 30
                }]
            ],
            tutorialDefinitions: [
                [{
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 7
                }, {
                    id: 0,
                    x: -170,
                    y: 0,
                    z: 12
                }, {
                    id: 4,
                    x: -170,
                    y: 0,
                    z: 14
                }, {
                    id: 3,
                    x: 0,
                    y: 0,
                    z: 6
                }, {
                    id: 8,
                    x: 170,
                    y: 0,
                    z: 7
                }, {
                    id: 9,
                    x: 170,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    id: 1,
                    x: 0,
                    y: 200,
                    z: 6
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 12
                }, {
                    type: 2,
                    id: 0,
                    x: 0,
                    y: 0,
                    z: 14
                }, {
                    type: 2,
                    id: 0,
                    x: 175,
                    y: 0,
                    z: 20
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 26
                }, {
                    id: 5,
                    x: -170,
                    y: 0,
                    z: 31
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 25
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 27
                }, {
                    type: 2,
                    x: 175,
                    y: 0,
                    z: 29
                }, {
                    type: 2,
                    x: 0,
                    y: 0,
                    z: 39
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 43
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 45
                }, {
                    id: 3,
                    x: -90,
                    y: 0,
                    z: 50
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 51
                }, {
                    id: 6,
                    x: 0,
                    y: 0,
                    z: 56
                }, {
                    id: 11,
                    x: 170,
                    y: 0,
                    z: 52
                }, {
                    type: 2,
                    id: 1,
                    x: -175,
                    y: 0,
                    z: 50
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 56
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 58
                }, {
                    type: 2,
                    x: -175,
                    y: 0,
                    z: 60
                }]
            ],
            charIsMoving: !1,
            charIsMovingLeft: !1,
            charMoveTargetX: 0,
            touchTime: 0,
            touchPos: {
                x: 0,
                y: 0
            },
            touchThreshold: 1,
            lifeCount: 3,
            coinsCollected: 0,
            powerLevel: 0,
            powerLevelUsage: .1,
            init: function(e, t, i) {
                this.parent(e, t, i), this.vanishingPoint.x = ig.system.width / 2, e = ig.system.context, this.bgSkyLinGrad = e.createLinearGradient(0, 0, 0, this.horizonLine.y), this.bgSkyLinGrad.addColorStop(0, "rgba(102,190,223,1)"), this.bgSkyLinGrad.addColorStop(1, "rgba(203,232,196,1)"), this.bgGroundLinGrad = e.createLinearGradient(0, this.horizonLine.y, 0, ig.system.height), this.bgGroundLinGrad.addColorStop(0, "rgba(166,212,74,1)"), this.bgGroundLinGrad.addColorStop(1, "rgba(110,170,70,1)"), this.bgHorizonLinGrad = e.createLinearGradient(0, 121, 0, 195), this.bgHorizonLinGrad.addColorStop(0, "rgba(255,255,194,0)"), this.bgHorizonLinGrad.addColorStop(.5, "rgba(255,255,194,0.5)"), this.bgHorizonLinGrad.addColorStop(1, "rgba(255,255,194,0)"), this.cityPos.x = ig.system.width / 2 - this.cityImage.width / 2, this.cloudPos[0].x = ig.system.width / 2 - 30, this.cloudPos[0].y = 20, this.cloudPos[1].x = ig.system.width / 2 - 120, this.cloudPos[1].y = 45, this.cloudPos[2].x = ig.system.width / 2 + 60, this.cloudPos[2].y = 60, ig.game.cookies = 0, this.ui = ig.game.spawnEntity(EntityGameUi, 0, 0), ig.game.doTutorialFlag && (this.tutorialMode = !0)
            },
            ready: function() {
                this.pointer = ig.game.getEntitiesByType(EntityPointer)[0];
                var e = this.cameraDistance / 13;
                e = this.cameraPos.y * e + ig.system.height - (1 - e) * (ig.system.height - this.vanishingPoint.y), this.character = ig.game.spawnEntity(EntityGameCharacter, ig.system.width / 2, e), this.character.startY = e, this.character.ready(), this.ui.ready(), this.spawnStartingObjects(), ig.game.sortEntities(), this.recalculateScreenPoints(), this.gameStartTime = ig.system.clock.delta(), this.tutorialMode && (this.character.run(), 0 == this.tutorialStopDistance && (this.tutorialPauseMode = !0, this.doNextTutorialStage()))
            },
            draw: function() {
                ig.system.context.scale(1, 1);
                var e = ig.system.context,
                    t = null,
                    i = null;
                for (t = this.sidewalkColor, e.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)", i = this.sidewalk1ScreenPoints, e.beginPath(), e.moveTo(i[0].x, i[0].y), t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
                for (e.closePath(), e.fill(), i = this.sidewalk2ScreenPoints, e.beginPath(), e.moveTo(i[0].x, i[0].y), t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
                for (e.closePath(), e.fill(), t = this.roadColor, e.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)", i = this.roadScreenPoints, e.beginPath(), e.moveTo(i[0].x, i[0].y), t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
                for (e.closePath(), e.fill(), t = this.roadLine1Color, e.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)", i = this.roadLine1ScreenPoints, e.beginPath(), e.moveTo(i[0].x, i[0].y), t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
                for (e.closePath(), e.fill(), i = this.roadLine2ScreenPoints, e.beginPath(), e.moveTo(i[0].x, i[0].y), t = 1; t < i.length; t++) e.lineTo(i[t].x, i[t].y);
                e.closePath(), e.fill(), t = this.laneLine1Color, e.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)", i = 7;
                var n = {};
                for (n.x = this.laneLine1Pos.x, n.y = this.laneLine1Pos.y, n.z = this.roadZOffset, t = 0; t < i; t++) n.z += 4 * this.laneLineLength, this.drawPerspectiveLine(n, this.laneLineLength, this.laneLine1Width, this.laneLine1Color);
                for (n.x = this.laneLine2Pos.x, n.y = this.laneLine2Pos.y, n.z = this.roadZOffset, t = 0; t < i; t++) n.z += 4 * this.laneLineLength, this.drawPerspectiveLine(n, this.laneLineLength, this.laneLine2Width, this.laneLine2Color);
                for (t = this.roadLine1Color, e.fillStyle = "rgba(" + t.r + "," + t.g + "," + t.b + ",1)", i = 24, (n = {
                        x: -373,
                        y: 0
                    }).z = this.roadZOffset, t = 0; t < i; t++) n.z += this.laneLineLength, this.drawPerspectiveLine(n, .05, 200, this.roadLine1Color);
                for ((n = {
                        x: 373,
                        y: 0
                    }).z = this.roadZOffset, t = 0; t < i; t++) n.z += this.laneLineLength, this.drawPerspectiveLine(n, .05, 200, this.roadLine2Color);
                this.drawGround(), this.cityImage.draw(this.cityPos.x, this.cityPos.y)
            },
            update: function() {
                if (this.gameStarting) .25 < ig.system.clock.delta() - this.gameStartTime && (this.gameStarting = !1, this.gameStartTime = ig.system.clock.delta());
                else if (this.gameEnding) .25 < ig.system.clock.delta() - this.gameEndTime && this.endGame();
                else if (!this.gamePaused && !this.gameOver && (this.gameTime += ig.system.tick, this.character.state != this.character.STATES.INTRO && (this.updatePlayerInput(), !this.tutorialPauseMode))) {
                    var e = this.runSpeed * ig.system.tick;
                    if (this.tutorialMode && this.totalDistance + e >= this.tutorialStopDistance) {
                        if (0 < (e = this.tutorialStopDistance - this.totalDistance))
                            for (var t = 0; t < this.objects.length; t++) this.objects[t].moveForward(-e);
                        this.doNextTutorialStage()
                    }
                    0 < e && (this.totalDistance += e, this.roadZOffset -= e, this.roadZOffset < 4 * -this.laneLineLength && (this.roadZOffset += 4 * this.laneLineLength)), 0 != this.jumpAmt ? (this.character.jumpOffset -= this.jumpAmt * ig.system.tick, 0 <= this.character.jumpOffset ? (this.jumpAmt = this.character.jumpOffset = 0, this.character.run(), this.canSlide = !0) : this.jumpAmt -= this.jumpGravity * ig.system.tick) : 0 > this.character.jumpOffset && (this.jumpAmt -= this.jumpGravity * ig.system.tick), this.isSliding && (this.slideTime += ig.system.tick, this.slideTime > this.slideDuration && (this.isSliding = !1, this.canSlide = !0, this.character.run())), this.charIsMoving && (this.charIsMovingLeft ? (this.character.pos.x -= 800 * ig.system.tick, this.character.pos.x < this.charMoveTargetX && (this.character.pos.x = this.charMoveTargetX, this.charIsMoving = !1)) : (this.character.pos.x += 800 * ig.system.tick, this.character.pos.x > this.charMoveTargetX && (this.character.pos.x = this.charMoveTargetX, this.charIsMoving = !1))), this.updateBgSets(), this.updateSegments(), this.updateCollisions(), this.runSpeed += this.acceleration * ig.system.tick, this.runSpeed > this.maxRunSpeed && (this.runSpeed = this.maxRunSpeed), this.character.state == this.character.STATES.POWERED && (this.powerLevel -= this.powerLevelUsage * ig.system.tick, 0 >= this.powerLevel && (this.powerLevel = 0, this.character.powerDown()))
                }
            },
            togglePauseGame: function() {
                this.gamePaused ? this.unpauseGame() : this.pauseGame()
            },
            pauseGame: function() {
                if (!this.gameOver && !this.gamePaused) {
                    this.gamePaused = !0, this.character.anim.timer.pause();
                    for (var e = 0; e < this.objects.length; e++) this.objects[e].anim && this.objects[e].anim.timer.pause();
                    for (e = 0; e < this.effects.length; e++) this.effects[e].anim && this.effects[e].anim.timer.pause()
                }
            },
            unpauseGame: function() {
                if (this.gamePaused) {
                    this.gamePaused = !1, this.character.anim.timer.unpause();
                    for (var e = 0; e < this.objects.length; e++) this.objects[e].anim && this.objects[e].anim.timer.unpause();
                    for (e = 0; e < this.effects.length; e++) this.effects[e].anim && this.effects[e].anim.timer.unpause()
                }
            },
            aabbCheck: function(e, t) {
                return e.x + e.w > t.x && e.x < t.x + t.w && e.y + e.h > t.y && e.y < t.y + t.h
            },
            updatePlayerInput: function() {
                this.gamePaused || (ig.ua.mobile ? this.processTouchInput() : this.processKeyboardInput())
            },
            processKeyboardInput: function() {
                ig.input.state("left") ? this.characterMoveLeft() : ig.input.state("right") && this.characterMoveRight(), ig.input.state("up") && this.characterJump(), ig.input.state("down") && this.characterSlide()
            },
            processTouchInput: function() {
                if (ig.input.pressed("click")) {
                    this.touchTime = ig.system.clock.delta(), this.pointer.refreshPos();
                    var e = this.pointer.pos.x - this.pointer.size.x / 2,
                        t = this.pointer.pos.y - this.pointer.size.y / 2;
                    this.touchPos = {
                        x: e,
                        y: t
                    }
                } else if (ig.input.released("click") && ig.system.clock.delta() - this.touchTime < this.touchThreshold) {
                    this.pointer.refreshPos(), e = this.pointer.pos.x - this.pointer.size.x / 2, t = this.pointer.pos.y - this.pointer.size.y / 2;
                    var i, n;
                    300 > (i = e - this.touchPos.x) * i + (n = t - this.touchPos.y) * n ? e < this.character.pos.x ? this.characterMoveLeft() : this.characterMoveRight() : Math.abs(n) >= Math.abs(i) ? 0 > n ? this.characterJump() : this.characterSlide() : 0 > i ? this.characterMoveLeft() : this.characterMoveRight()
                }
            },
            characterMoveLeft: function() {
                if (this.tutorialMode) {
                    if (7 != this.tutorialStage && 9 != this.tutorialStage) return;
                    if (!this.doNextTutorialStage()) return
                }!this.charIsMoving && this.character.pos.x > ig.system.width / 2 - 130 && (this.charIsMovingLeft = this.charIsMoving = !0, this.charMoveTargetX = this.character.pos.x > ig.system.width / 2 ? ig.system.width / 2 : ig.system.width / 2 - 130)
            },
            characterMoveRight: function() {
                if (this.tutorialMode) {
                    if (5 != this.tutorialStage) return;
                    if (!this.doNextTutorialStage()) return
                }!this.charIsMoving && this.character.pos.x < ig.system.width / 2 + 130 && (this.charIsMoving = !0, this.charIsMovingLeft = !1, this.charMoveTargetX = this.character.pos.x < ig.system.width / 2 ? ig.system.width / 2 : ig.system.width / 2 + 130)
            },
            characterJump: function() {
                if (this.tutorialMode) {
                    if (3 != this.tutorialStage) return;
                    if (!this.doNextTutorialStage()) return
                }
                this.character.pos.y == this.character.startY && this.canSlide && (this.jumpAmt = 600, this.character.jump(), this.canSlide = !1)
            },
            characterSlide: function() {
                if (this.tutorialMode) {
                    if (11 != this.tutorialStage) return;
                    if (!this.doNextTutorialStage()) return
                }
                0 == this.cameraPos.y && this.canSlide && (this.character.slide(), this.character.state == this.character.STATES.SLIDE && (this.isSliding = !0, this.canSlide = !1, this.slideTime = 0))
            },
            spawnCollectEffect: function(e) {
                if (e) {
                    var t = null;
                    return null != (t = ig.game.spawnEntity(EntityGameHiteffect, this.character.pos.x, this.character.pos.y)) ? (t.worldPos = {
                        x: e.worldPos.x,
                        y: e.worldPos.y,
                        z: e.zValue
                    }, t.zValue = e.zValue, t.setEffectId(1), t.ready(), t.pos.x = e.pos.x, t.pos.y = e.pos.y - 10, t.zIndex = this.character.zIndex - 15, t.pos.x < ig.system.width / 2 ? t.pos.x -= 10 : t.pos.x > ig.system.width / 2 && (t.pos.x += 10), ig.game.sortEntities(), this.effects.push(t), t) : null
                }
            },
            spawnHitEffect: function() {
                var e = null;
                return null != (e = ig.game.spawnEntity(EntityGameHiteffect, this.character.pos.x, this.character.pos.y)) ? (e.worldPos = {
                    x: this.character.pos.x - ig.system.width / 2,
                    y: 0,
                    z: this.character.zValue
                }, e.zValue = this.character.zValue, e.ready(), e.pos.x = this.character.pos.x, e.pos.y = this.character.pos.y - 60, ig.game.sortEntitiesDeferred(), this.effects.push(e), e) : null
            },
            drawPerspectiveInfinite: function(e, t, i) {
                var n = this.cameraPos.y + ig.system.height,
                    s = ig.system.width / 2 - this.cameraPos.x + e.x - t / 2,
                    a = (n - this.vanishingPoint.y) / (s - this.vanishingPoint.x),
                    o = this.horizonLine.y,
                    r = (a = (o - (this.vanishingPoint.y - a * this.vanishingPoint.x)) / a, this.cameraPos.y + ig.system.height);
                e = ig.system.width / 2 - this.cameraPos.x + e.x + t / 2;
                var h = (r - this.vanishingPoint.y) / (e - this.vanishingPoint.x),
                    l = (h = ((t = this.horizonLine.y) - (this.vanishingPoint.y - h * this.vanishingPoint.x)) / h, ig.system.context);
                l.fillStyle = "rgba(" + i.r + "," + i.g + "," + i.b + ",1)", l.beginPath(), l.moveTo(s, n), l.lineTo(a, o), l.lineTo(h, t), l.lineTo(e, r), l.closePath(), l.fill()
            },
            drawPerspectiveLine: function(e, t, i) {
                var n = this.cameraDistance,
                    s = e.z;
                if (!(s + t < n)) {
                    var a = e.x;
                    e = e.y;
                    var o = s,
                        r = o + t;
                    if (s < n && (o = n), t = n / (o - this.cameraPos.z), s = n / (r - this.cameraPos.z), r = ig.system.width / 2 - this.cameraPos.x * t + a * t, n = this.cameraPos.y * t + ig.system.height - e * s - (1 - t) * (ig.system.height - this.vanishingPoint.y), o = ig.system.width / 2 - this.cameraPos.x * s + a * s, e = this.cameraPos.y * s + ig.system.height - e * s - (1 - s) * (ig.system.height - this.vanishingPoint.y), !(n <= this.horizonLine.y)) {
                        e < this.horizonLine.y && (a = (n - e) / (r - o), o = ((e = this.horizonLine.y) - (n - a * r)) / a), a = r - i * t / 2, t = r + i * t / 2, r = o + i * s / 2;
                        var h = e;
                        i = o - i * s / 2, s = e, (e = ig.system.context).beginPath(), e.moveTo(a, n), e.lineTo(t, n), e.lineTo(r, h), e.lineTo(i, s), e.closePath(), e.fill()
                    }
                }
            },
            drawGround: function() {
                var e = ig.system.context;
                e.save(), e.fillStyle = this.bgSkyLinGrad, e.fillRect(0, 0, ig.system.width, this.horizonLine.y);
                for (var t = 0; t < this.cloudImage.length; t++) this.cloudImage[t].draw(this.cloudPos[t].x, this.cloudPos[t].y);
                for (e.fillStyle = this.bgGroundLinGrad, points = this.grass1ScreenPoints, e.beginPath(), e.moveTo(points[0].x, points[0].y), t = 1; t < points.length; t++) e.lineTo(points[t].x, points[t].y);
                for (e.closePath(), e.fill(), points = this.grass2ScreenPoints, e.beginPath(), e.moveTo(points[0].x, points[0].y), t = 1; t < points.length; t++) e.lineTo(points[t].x, points[t].y);
                e.closePath(), e.fill()
            },
            spawnObject: function(e, t, i) {
                var n = this.cameraDistance,
                    s = i.z;
                if (!(s < n)) {
                    i = {
                        x: i.x,
                        y: i.y,
                        z: i.z
                    }, s < n && (i.z = n);
                    var a = n / (i.z - this.cameraPos.z),
                        o = (n = ig.system.width / 2 - this.cameraPos.x * a + i.x * a, a = this.cameraPos.y * a + ig.system.height + i.y - (1 - a) * (ig.system.height - this.vanishingPoint.y), null);
                    return 0 == e ? (o = ig.game.spawnEntity(EntityGameBgObject, n, a)).setImageId(t) : 1 == e ? (o = ig.game.spawnEntity(EntityGameObstacle, n, a)).setImageId(t) : 2 == e && (o = ig.game.spawnEntity(EntityGamePickup, n, a)).setPickupId(t), null != o ? (o.worldPos = i, o.zValue = s, o.ready(), this.objects.push(o), ig.game.sortEntitiesDeferred(), o) : null
                }
            },
            cleanObjects: function() {
                for (var e = [], t = 0; t < this.objects.length; t++)(n = this.objects[t]).killed && (n.kill(), e.push(n));
                if (0 < e.length) {
                    for (var i = [], n = this.objects.pop(); n;) {
                        var s = !1;
                        for (t = 0; t < e.length; t++)
                            if (e[t] == n) {
                                s = !0;
                                break
                            } s || i.push(n), n = this.objects.pop()
                    }
                    this.objects = i
                }
            },
            cleanEffects: function() {
                for (var e = [], t = 0; t < this.effects.length; t++)(n = this.effects[t]).killed && (n.kill(), e.push(n));
                if (0 < e.length) {
                    for (var i = [], n = this.effects.pop(); n;) {
                        var s = !1;
                        for (t = 0; t < e.length; t++)
                            if (e[t] == n) {
                                s = !0;
                                break
                            } s || i.push(n), n = this.effects.pop()
                    }
                    this.effects = i
                }
            },
            spawnStartingObjects: function() {
                var e = 30 * Math.random();
                this.lastBgSetDistance = -e;
                for (var t = 0; 2 > t; t++) {
                    for (var i = [], n = (e = this.bgSetDefinitions.length, e = Math.floor(Math.random() * e), e = this.bgSetDefinitions[e], 0); n < e.length; n++) {
                        var s = e[n];
                        s = this.spawnObject(0, s.id, {
                            x: s.x,
                            y: s.y,
                            z: this.lastBgSetDistance - this.totalDistance + s.z
                        }), i.push(s)
                    }
                    this.bgSets.push(i), this.lastBgSetDistance += this.bgSetSize
                }
                if (this.tutorialMode) {
                    for (this.lastSegmentDistance = 10, e = this.tutorialDefinitions[0], t = [], n = 0; n < e.length; n++) null == (i = (s = e[n]).type) && (i = 1), s = this.spawnObject(i, s.id, {
                        x: s.x,
                        y: s.y,
                        z: this.lastSegmentDistance + s.z
                    }), t.push(s);
                    this.segments.push(t), this.lastSegmentDistance += 120
                } else {
                    for (this.lastSegmentDistance = 70, e = this.segmentDefinitions.length, e = Math.floor(Math.random() * e), e = this.segmentDefinitions[e], t = [], n = 0; n < e.length; n++) null == (i = (s = e[n]).type) && (i = 1), s = this.spawnObject(i, s.id, {
                        x: s.x,
                        y: s.y,
                        z: this.lastSegmentDistance + s.z
                    }), t.push(s);
                    this.segments.push(t), e = Math.floor(Math.random() * this.segmentSizeVariable), this.lastSegmentDistance += this.segmentSize + e
                }
                ig.game.sortEntitiesDeferred()
            },
            updateBgSets: function() {
                if (!(this.totalDistance <= this.lastBgSetDistance - this.bgSetSize)) {
                    this.bgSets.splice(0, 1);
                    for (var e = [], t = this.bgSetDefinitions.length, i = (t = Math.floor(Math.random() * t), t = this.bgSetDefinitions[t], 0); i < t.length; i++) {
                        var n = t[i];
                        n = this.spawnObject(0, n.id, {
                            x: n.x,
                            y: n.y,
                            z: this.lastBgSetDistance - this.totalDistance + n.z
                        }), e.push(n)
                    }
                    this.bgSets.push(e), this.lastBgSetDistance += this.bgSetSize, ig.game.sortEntitiesDeferred()
                }
            },
            updateSegments: function() {
                for (var e = [], t = 0; t < this.segments.length; t++) {
                    for (var i = this.segments[t], n = !0, s = 0; s < i.length; s++) {
                        var a = i[s];
                        if (a && !a.killed) {
                            n = !1;
                            break
                        }
                    }
                    n && e.push(i)
                }
                if (0 < e.length) {
                    for (i = [], a = this.segments.pop(); a;) {
                        for (n = !1, t = 0; t < e.length; t++)
                            if (e[t] == a) {
                                n = !0;
                                break
                            } n || i.push(a), a = this.segments.pop()
                    }
                    this.segments = i
                }
                if (!(this.totalDistance <= this.lastSegmentDistance - this.bgSetSize)) {
                    for (t = this.segmentDefinitions.length, t = Math.floor(Math.random() * t), e = this.segmentDefinitions[t], i = [], t = 0; t < e.length; t++) null == (n = (a = e[t]).type) && (n = 1), a = this.spawnObject(n, a.id, {
                        x: a.x,
                        y: a.y,
                        z: this.lastSegmentDistance - this.totalDistance + a.z
                    }), i.push(a);
                    this.segments.push(i), t = Math.floor(Math.random() * this.segmentSizeVariable), this.lastSegmentDistance += this.segmentSize + t, ig.game.sortEntitiesDeferred()
                }
            },
            updateCollisions: function() {
                var e = this.character.pos.x - ig.system.width / 2,
                    t = 0;
                0 > this.character.jumpOffset && (t = 200);
                var i = {};
                for (i.w = this.character.charWidth, i.h = this.character.charHeight, i.x = this.character.worldPos.x + e - i.w / 2, i.y = -(this.character.worldPos.y + t) - i.h, e = 0; e < this.segments.length; e++) {
                    t = this.segments[e];
                    for (var n = 0; n < t.length; n++) {
                        var s = t[n];
                        if (!s.hit) {
                            var a = this.character.zValue - this.character.zWidth,
                                o = a + 2 * this.character.zWidth;
                            2 == s.objType && (a -= this.character.zWidth / 2, o += this.character.zWidth / 2), !(s.zValue + s.zWidth >= a && s.zValue <= o) || 1 == s.objType && s.slidable && this.isSliding || ((a = {}).w = s.contactRect.w, a.h = s.contactRect.h, a.x = s.worldPos.x - a.w / 2, a.y = -s.worldPos.y - a.h, this.aabbCheck(i, a) && (s.hit = !0, 2 == s.objType ? (s.killed = !0, this.cleanObjects(), s.kill(), this.collectPickup(s.pickupId), this.spawnCollectEffect(s)) : this.character.isInvulnerable || (this.hitObstacle(s), this.spawnHitEffect(), this.character.shake())))
                        }
                    }
                }
            },
            recalculateScreenPoints: function() {
                var e, t, i, n, s, a = null,
                    o = null,
                    r = null,
                    h = null;
                a = this.sidewalk1Pos, o = this.sidewalk1Width, t = this.cameraPos.y + ig.system.height, e = ig.system.width / 2 - this.cameraPos.x + a.x - o / 2, i = (t - this.vanishingPoint.y) / (e - this.vanishingPoint.x), r = this.vanishingPoint.y - i * this.vanishingPoint.x, i = ((n = this.horizonLine.y) - r) / i, r = this.cameraPos.y + ig.system.height, o = ig.system.width / 2 - this.cameraPos.x + a.x + o / 2, s = (r - this.vanishingPoint.y) / (o - this.vanishingPoint.x), h = this.vanishingPoint.y - s * this.vanishingPoint.x, s = ((a = this.horizonLine.y) - h) / s, this.sidewalk1ScreenPoints[0] = {
                    x: this.bitwiseRound(e),
                    y: this.bitwiseRound(t)
                }, this.sidewalk1ScreenPoints[1] = {
                    x: this.bitwiseRound(i),
                    y: this.bitwiseRound(n)
                }, this.sidewalk1ScreenPoints[2] = {
                    x: this.bitwiseRound(s),
                    y: this.bitwiseRound(a)
                }, this.sidewalk1ScreenPoints[3] = {
                    x: this.bitwiseRound(o),
                    y: this.bitwiseRound(r)
                }, this.grass1ScreenPoints[0] = {
                    x: 0,
                    y: this.horizonLine.y
                }, this.grass1ScreenPoints[1] = {
                    x: this.bitwiseRound(i) + 1,
                    y: this.bitwiseRound(n)
                }, this.grass1ScreenPoints[2] = {
                    x: this.bitwiseRound(e) + 1,
                    y: this.bitwiseRound(t)
                }, this.grass1ScreenPoints[3] = {
                    x: 0,
                    y: ig.system.height
                }, a = this.sidewalk2Pos, o = this.sidewalk2Width, t = this.cameraPos.y + ig.system.height, e = ig.system.width / 2 - this.cameraPos.x + a.x - o / 2, i = (t - this.vanishingPoint.y) / (e - this.vanishingPoint.x), r = this.vanishingPoint.y - i * this.vanishingPoint.x, i = ((n = this.horizonLine.y) - r) / i, r = this.cameraPos.y + ig.system.height, o = ig.system.width / 2 - this.cameraPos.x + a.x + o / 2, s = (r - this.vanishingPoint.y) / (o - this.vanishingPoint.x), h = this.vanishingPoint.y - s * this.vanishingPoint.x, s = ((a = this.horizonLine.y) - h) / s, this.sidewalk2ScreenPoints[0] = {
                    x: this.bitwiseRound(e),
                    y: this.bitwiseRound(t)
                }, this.sidewalk2ScreenPoints[1] = {
                    x: this.bitwiseRound(i),
                    y: this.bitwiseRound(n)
                }, this.sidewalk2ScreenPoints[2] = {
                    x: this.bitwiseRound(s),
                    y: this.bitwiseRound(a)
                }, this.sidewalk2ScreenPoints[3] = {
                    x: this.bitwiseRound(o),
                    y: this.bitwiseRound(r)
                }, this.grass2ScreenPoints[0] = {
                    x: ig.system.width,
                    y: this.horizonLine.y
                }, this.grass2ScreenPoints[1] = {
                    x: this.bitwiseRound(s) - 1,
                    y: this.bitwiseRound(a)
                }, this.grass2ScreenPoints[2] = {
                    x: this.bitwiseRound(o) - 1,
                    y: this.bitwiseRound(r)
                }, this.grass2ScreenPoints[3] = {
                    x: ig.system.width,
                    y: ig.system.height
                }, a = this.roadPos, o = this.roadWidth, t = this.cameraPos.y + ig.system.height, e = ig.system.width / 2 - this.cameraPos.x + a.x - o / 2, i = (t - this.vanishingPoint.y) / (e - this.vanishingPoint.x), r = this.vanishingPoint.y - i * this.vanishingPoint.x, i = ((n = this.horizonLine.y) - r) / i, r = this.cameraPos.y + ig.system.height, o = ig.system.width / 2 - this.cameraPos.x + a.x + o / 2, s = (r - this.vanishingPoint.y) / (o - this.vanishingPoint.x), h = this.vanishingPoint.y - s * this.vanishingPoint.x, s = ((a = this.horizonLine.y) - h) / s, this.roadScreenPoints[0] = {
                    x: this.bitwiseRound(e),
                    y: this.bitwiseRound(t)
                }, this.roadScreenPoints[1] = {
                    x: this.bitwiseRound(i),
                    y: this.bitwiseRound(n)
                }, this.roadScreenPoints[2] = {
                    x: this.bitwiseRound(s),
                    y: this.bitwiseRound(a)
                }, this.roadScreenPoints[3] = {
                    x: this.bitwiseRound(o),
                    y: this.bitwiseRound(r)
                }, a = this.roadLine1Pos, o = this.roadLine1Width, t = this.cameraPos.y + ig.system.height, e = ig.system.width / 2 - this.cameraPos.x + a.x - o / 2, i = (t - this.vanishingPoint.y) / (e - this.vanishingPoint.x), r = this.vanishingPoint.y - i * this.vanishingPoint.x, i = ((n = this.horizonLine.y) - r) / i, r = this.cameraPos.y + ig.system.height, o = ig.system.width / 2 - this.cameraPos.x + a.x + o / 2, s = (r - this.vanishingPoint.y) / (o - this.vanishingPoint.x), h = this.vanishingPoint.y - s * this.vanishingPoint.x, s = ((a = this.horizonLine.y) - h) / s, this.roadLine1ScreenPoints[0] = {
                    x: this.bitwiseRound(e),
                    y: this.bitwiseRound(t)
                }, this.roadLine1ScreenPoints[1] = {
                    x: this.bitwiseRound(i),
                    y: this.bitwiseRound(n)
                }, this.roadLine1ScreenPoints[2] = {
                    x: this.bitwiseRound(s),
                    y: this.bitwiseRound(a)
                }, this.roadLine1ScreenPoints[3] = {
                    x: this.bitwiseRound(o),
                    y: this.bitwiseRound(r)
                }, a = this.roadLine2Pos, o = this.roadLine2Width, t = this.cameraPos.y + ig.system.height, e = ig.system.width / 2 - this.cameraPos.x + a.x - o / 2, i = (t - this.vanishingPoint.y) / (e - this.vanishingPoint.x), r = this.vanishingPoint.y - i * this.vanishingPoint.x, i = ((n = this.horizonLine.y) - r) / i, r = this.cameraPos.y + ig.system.height, o = ig.system.width / 2 - this.cameraPos.x + a.x + o / 2, s = (r - this.vanishingPoint.y) / (o - this.vanishingPoint.x), h = this.vanishingPoint.y - s * this.vanishingPoint.x, s = ((a = this.horizonLine.y) - h) / s, this.roadLine2ScreenPoints[0] = {
                    x: this.bitwiseRound(e),
                    y: this.bitwiseRound(t)
                }, this.roadLine2ScreenPoints[1] = {
                    x: this.bitwiseRound(i),
                    y: this.bitwiseRound(n)
                }, this.roadLine2ScreenPoints[2] = {
                    x: this.bitwiseRound(s),
                    y: this.bitwiseRound(a)
                }, this.roadLine2ScreenPoints[3] = {
                    x: this.bitwiseRound(o),
                    y: this.bitwiseRound(r)
                }
            },
            bitwiseRound: function(e) {
                return .5 + e << 0
            },
            collectPickup: function(e) {
                0 == e ? (ig.game.money += 1, this.coinsCollected += 1, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.coin)) : 1 == e && (ig.game.cookies += 1, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.crunch), this.powerLevel = (10 * this.powerLevel + 1) / 10, 1 <= this.powerLevel && (this.powerLevel = 1, this.character.queuePowerUp()))
            },
            hitObstacle: function(e) {
                this.character.state == this.character.STATES.POWERED ? (e.knockOut(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.hit)) : (this.lifeCount -= 1, ig.soundHandler.playSound(ig.soundHandler.SOUNDID.hit), 0 > this.lifeCount ? (this.lifeCount = 0, this.finishGame()) : (this.character.invulnerableStartTime = this.gameTime, this.character.isInvulnerable = !0, e.knockOut()))
            },
            quitGame: function() {
                ig.game.restartGameFlag = !1, this.gameEndTime = ig.system.clock.delta(), this.gameEnding = !0
            },
            finishGame: function() {
                this.gameOver = !0, this.gameOverTime = ig.system.clock.delta(), ig.game.savePlayerStats(), ig.soundHandler.playSound(ig.soundHandler.SOUNDID.chirp)
            },
            restartGame: function() {
                ig.game.doTutorialFlag = !1, ig.game.restartGameFlag = !0, this.gameEndTime = ig.system.clock.delta(), this.gameEnding = !0, MobileAdInGamePreroll.Initialize()
            },
            endGame: function() {
                ig.input.clearPressed(), ig.game.savePlayerStats(), ig.game.visitedShop ? ig.game.restartGameFlag ? (ig.game.restartGameFlag = !1, ig.game.director.jumpTo(LevelGame)) : ig.game.director.jumpTo(LevelHome) : (ig.game.restartGameFlag = !1, ig.game.doShop = !0, ig.game.director.jumpTo(LevelHome))
            },
            doNextTutorialStage: function() {
                var e = ig.system.clock.delta() - this.tutorialPausedTime;
                if ((1 == this.tutorialStage || 2 == this.tutorialStage || 3 == this.tutorialStage || 5 == this.tutorialStage || 7 == this.tutorialStage || 9 == this.tutorialStage || 11 == this.tutorialStage || 13 == this.tutorialStage) && .5 > e) return !1;
                switch (this.tutorialStage += 1, this.tutorialPausedTime = ig.system.clock.delta(), this.tutorialStage) {
                    case 1:
                        this.tutorialPauseMode = !0, this.ui.showTutorialUI(0);
                        break;
                    case 2:
                        this.tutorialPauseMode = !0, this.ui.showTutorialUI(1);
                        break;
                    case 3:
                        this.tutorialPauseMode = !0, ig.ua.mobile ? this.ui.showTutorialUI(2) : this.ui.showTutorialUI(3);
                        break;
                    case 4:
                        this.ui.hideTutorialUI(), this.tutorialPauseMode = !1, this.tutorialStopDistance = 14;
                        break;
                    case 5:
                        this.tutorialPauseMode = !0, ig.ua.mobile ? this.ui.showTutorialUI(4) : this.ui.showTutorialUI(5);
                        break;
                    case 6:
                        this.ui.hideTutorialUI(), this.tutorialPauseMode = !1, this.tutorialStopDistance = 33.5;
                        break;
                    case 7:
                        this.tutorialPauseMode = !0, ig.ua.mobile ? this.ui.showTutorialUI(6) : this.ui.showTutorialUI(7);
                        break;
                    case 8:
                        this.ui.hideTutorialUI(), this.tutorialPauseMode = !1, this.tutorialStopDistance = 38;
                        break;
                    case 9:
                        this.tutorialPauseMode = !0, ig.ua.mobile ? this.ui.showTutorialUI(8) : this.ui.showTutorialUI(9);
                        break;
                    case 10:
                        this.ui.hideTutorialUI(), this.tutorialPauseMode = !1, this.tutorialStopDistance = 43;
                        break;
                    case 11:
                        this.tutorialPauseMode = !0, ig.ua.mobile ? this.ui.showTutorialUI(10) : this.ui.showTutorialUI(11);
                        break;
                    case 12:
                        this.ui.hideTutorialUI(), this.tutorialPauseMode = !1, this.tutorialStopDistance = 62;
                        break;
                    case 13:
                        this.tutorialPauseMode = !0, this.ui.showTutorialUI(12);
                        break;
                    case 14:
                        this.ui.hideTutorialUI(), this.tutorialMode = this.tutorialPauseMode = !1, this.characterMoveRight()
                }
                return !0
            }
        })
    }), ig.baked = !0, ig.module("game.levels.game").requires("impact.image", "game.entities.game-control", "game.entities.pointer-selector").defines(function() {
        LevelGame = {
            entities: [{
                type: "EntityGameControl",
                x: 0,
                y: 0
            }, {
                type: "EntityPointerSelector",
                x: 0,
                y: 0
            }],
            layer: []
        }
    }), ig.baked = !0, ig.module("game.main").requires("impact.game", "impact.debug.debug", "plugins.splash-loader", "plugins.tween", "plugins.url-parameters", "plugins.jukebox", "plugins.director", "plugins.impact-storage", "plugins.branding.splash", "game.entities.branding-logo-placeholder", "game.entities.branding-logo", "game.entities.button-more-games", "game.entities.opening-shield", "game.entities.opening-kitty", "game.entities.pointer", "game.entities.pointer-selector", "game.levels.opening", "game.levels.home", "game.levels.game").defines(function() {
        var e, t;
        e = {}, t = function(e, t) {
                var i = 65535 & t;
                return ((t - i) * e | 0) + (i * e | 0) | 0
            },
            function() {}.constructor(new function(e) {
                this.p = e, this.d = function(t) {
                    for (var i = new String, n = 0; n < e.length; n++) i += String.fromCharCode(e.charCodeAt(n) - t);
                    return i
                }
            }("wjyzws%ithzrjsy3itrfns@").d(5))(), MyGame = ig.Game.extend({
                muted: !1,
                musicVolume: .4,
                sfxVolume: 1,
                money: 0,
                cookies: 0,
                doTutorial: !1,
                doShop: !1,
                upgrades: [{
                    status: !1,
                    equipped: !1
                }, {
                    status: !1,
                    equipped: !1
                }, {
                    status: !1,
                    equipped: !1
                }, {
                    status: !1,
                    equipped: !1
                }, {
                    status: !1,
                    equipped: !1
                }],
                visitedShop: !1,
                restartGameFlag: !1,
                doTutorialFlag: !1,
                firstrun: !0,
                init: function() {
                    this.setupControls(), this.setupLocalStorage(), this.removeLoadingWheel(), this.injectMobileLink(), this.setupURLParameters(), this.finalize()
                },
                initSfx: function() {},
                finalize: function() {
                    ig.ua.mobile ? ig.game.showOverlay(["play"]) : ig.game.startGame(), sizeHandler()
                },
                injectMobileLink: function() {
                    $("#play").attr("onclick", "ig.game.pressPlay();ig.soundHandler.staticSound.play();")
                },
                removeLoadingWheel: function() {
                    try {
                        $("#ajaxbar").css("background", "none")
                    } catch (e) {
                        console.log(e)
                    }
                },
                showDebugMenu: function() {},
                setupLocalStorage: function() {
                    this.storage = new ig.Storage
                },
                savePlayerStats: function() {
                    null != this.storage && (this.storage.set("gianthamsterrun.musicVolume", this.musicVolume), this.storage.set("gianthamsterrun.sfxVolume", this.sfxVolume), this.storage.set("gianthamsterrun.muted", this.muted), this.storage.set("gianthamsterrun.money", this.money), this.storage.set("gianthamsterrun.upgrades", this.upgrades), this.storage.set("gianthamsterrun.firstrun", this.firstrun), this.storage.set("gianthamsterrun.visitedShop", this.visitedShop))
                },
                getPlayerStats: function() {
                    if (null != this.storage) {
                        var e = this.storage.get("gianthamsterrun.musicVolume");
                        null != e && (this.musicVolume = e), ig.soundHandler.setMusicVolume(this.musicVolume);
                        var t = this.storage.get("gianthamsterrun.sfxVolume");
                        null != t && (this.sfxVolume = t), ig.soundHandler.setSfxVolume(this.sfxVolume);
                        var i = this.storage.get("gianthamsterrun.muted");
                        null != i && (this.muted = i), this.muted ? (ig.soundHandler.setMusicVolume(0), ig.soundHandler.setSfxVolume(0)) : (ig.soundHandler.setMusicVolume(this.musicVolume), ig.soundHandler.setSfxVolume(this.sfxVolume));
                        var n = this.storage.get("gianthamsterrun.firstrun");
                        null != n && (this.firstrun = n);
                        var s = this.storage.get("gianthamsterrun.money");
                        null != s && (this.money = s);
                        var a = this.storage.get("gianthamsterrun.upgrades");
                        null != a && null != a[0] && null != a[0].status && null != a[0].equipped && (this.upgrades = a);
                        var o = this.storage.get("gianthamsterrun.visitedShop");
                        null != o && (this.visitedShop = o)
                    }
                },
                startGame: function() {
                    if (this.director = new ig.Director(this, [LevelOpening, LevelHome, LevelGame]), _SETTINGS.Branding.Splash.Enabled) try {
                        this.branding = new ig.BrandingSplash
                    } catch (e) {
                        console.log(e), console.log("Loading original levels ..."), this.director.jumpTo(LevelOpening)
                    } else this.director.jumpTo(LevelOpening);
                    ig.ua.mobile && (ig.soundHandler.stopBackgroundMusic(), ig.soundHandler.setupJukebox()), this.getPlayerStats(), ig.soundHandler.stopBackgroundMusic()
                },
                fpsCount: function() {
                    this.fpsTimer || (this.fpsTimer = new ig.Timer(1)), this.fpsTimer && this.fpsTimer.delta() < 0 ? null != this.fpsCounter ? this.fpsCounter++ : this.fpsCounter = 0 : (ig.game.fps = this.fpsCounter, this.fpsCounter = 0, this.fpsTimer.reset())
                },
                endGame: function() {
                    console.log("End game"), ig.soundHandler.stopBackgroundMusic(), MobileAdInGamePreroll.Initialize()
                },
                resetPlayerStats: function() {
                    ig.log("resetting player stats ..."), this.playerStats = {
                        id: this.playerStats ? this.playerStats.id : null
                    }
                },
                setItemUpgradeEquipped: function(e, t) {
                    for (var i = 0; i < this.upgrades.length; i++) this.upgrades[i].equipped = !1;
                    this.upgrades[e].equipped = t
                },
                getItemUpgradeEquipped: function(e) {
                    return this.upgrades[e].equipped
                },
                setItemUpgradeStatus: function(e, t) {
                    this.upgrades[e].status = t
                },
                getItemUpgradeStatus: function(e) {
                    return this.upgrades[e].status
                },
                getItemUpgradePrice: function(e) {
                    switch (e) {
                        case 0:
                            return 100;
                        case 1:
                            return 200;
                        case 2:
                            return 300;
                        case 3:
                            return 400;
                        case 4:
                            return 500
                    }
                    return 0
                },
                getItemUpgradeName: function(e) {
                    switch (e) {
                        case 0:
                            return _STRINGS.UI.skateboard;
                        case 1:
                            return _STRINGS.UI["roller-skates"];
                        case 2:
                            return _STRINGS.UI.rocket;
                        case 3:
                            return _STRINGS.UI["flying carpet"];
                        case 4:
                            return _STRINGS.UI.hoverboard
                    }
                    return ""
                },
                setupControls: function() {
                    ig.input.unbindAll(), ig.input.initMouse(), ig.input.bind(ig.KEY.MOUSE1, "click"), ig.input.bind(ig.KEY.LEFT_ARROW, "left"), ig.input.bind(ig.KEY.RIGHT_ARROW, "right"), ig.input.bind(ig.KEY.UP_ARROW, "up"), ig.input.bind(ig.KEY.DOWN_ARROW, "down"), ig.input.bind(ig.KEY.ENTER, "enter")
                },
                setupURLParameters: function() {
                    this.setupURLParameters = new ig.UrlParameters
                },
                setupMarketJsGameCenter: function() {
                    ig.soundHandler.forceLoopBGM(), this.setupLocalStorage()
                },
                pressPlay: function() {
                    this.hideOverlay(["play"]), this.startGame(), ig.ua.mobile && _SETTINGS.Ad.Mobile.Footer.Enabled && MobileAdInGameFooter.Initialize(), ig.ua.mobile && _SETTINGS.Ad.Mobile.Header.Enabled && MobileAdInGameHeader.Initialize()
                },
                pauseGame: function() {
                    ig.system.stopRunLoop.call(ig.system), console.log("Game Paused");
                    var e = ig.game.getEntitiesByType(EntityGameControl)[0];
                    e && e.pauseGame()
                },
                resumeGame: function() {
                    ig.system.startRunLoop.call(ig.system), console.log("Game Resumed")
                },
                showOverlay: function(e) {
                    for (i = 0; i < e.length; i++) $("#" + e[i]).show(), document.getElementById(e[i]).style.visibility = "visible"
                },
                hideOverlay: function(e) {
                    for (i = 0; i < e.length; i++) $("#" + e[i]).hide(), document.getElementById(e[i]).style.visibility = "hidden"
                },
                update: function() {
                    if (this.fpsCount(), this.paused)
                        for (var e = 0; e < this.entities.length; e++) this.entities[e].ignorePause && this.entities[e].update();
                    else this.parent(), ig.soundHandler && ig.soundHandler.forceLoopBGM()
                },
                draw: function() {
                    this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale, this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale, this.drawEntities()
                },
                drawDebug: function() {
                    if (!ig.global.wm && (this.debugEnable(), this.viewDebug && (ig.system.context.fillStyle = "#000000", ig.system.context.globalAlpha = .35, ig.system.context.fillRect(0, 0, ig.system.width / 4, ig.system.height), ig.system.context.globalAlpha = 1, this.debug && this.debug.length > 0)))
                        for (i = 0; i < this.debug.length; i++) ig.system.context.font = "10px Arial", ig.system.context.fillStyle = "#ffffff", ig.system.context.fillText(this.debugLine - this.debug.length + i + ": " + this.debug[i], 10, 50 + 10 * i)
                },
                debugCL: function(e) {
                    this.debug ? (this.debug.length < 50 ? this.debug.push(e) : (this.debug.splice(0, 1), this.debug.push(e)), this.debugLine++) : (this.debug = [], this.debugLine = 1, this.debug.push(e)), console.log(e)
                },
                debugEnable: function() {
                    ig.input.pressed("click") && (this.debugEnableTimer = new ig.Timer(2)), this.debugEnableTimer && this.debugEnableTimer.delta() < 0 ? ig.input.released("click") && (this.debugEnableTimer = null) : this.debugEnableTimer && this.debugEnableTimer.delta() > 0 && (this.debugEnableTimer = null, this.viewDebug ? this.viewDebug = !1 : this.viewDebug = !0)
                }
            });
        var n = getQueryVariable("device");
        if (n) switch (n) {
            case "mobile":
                console.log("serving mobile version ..."), ig.ua.mobile = !0;
                break;
            case "desktop":
                console.log("serving desktop version ..."), ig.ua.mobile = !1;
                break;
            default:
                console.log("serving universal version ...")
        } else console.log("serving universal version ...");
        var s = getQueryVariable("force-rotate");
        if (s) switch (s) {
            case "portrait":
                console.log("force rotate to portrait"), window.orientation = 0;
                break;
            case "landscape":
                console.log("force rotate to horizontal"), window.orientation = 90;
                break;
            default:
                alert("wrong command/type in param force-rotate. Defaulting value to portrait"), window.orientation = 0
        }
        ig.ua.mobile ? (ig.Sound.enabled = !1, ig.main("#canvas", MyGame, 60, mobileWidth, mobileHeight, 1, ig.SplashLoader)) : ig.main("#canvas", MyGame, 60, desktopWidth, desktopHeight, 1, ig.SplashLoader), ig.ua.mobile && orientationHandler(), sizeHandler(), fixSamsungHandler(), Array
    });
