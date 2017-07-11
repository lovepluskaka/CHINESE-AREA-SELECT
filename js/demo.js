/*
jQWidgets v4.5.4 (2017-June)
Copyright (c) 2011-2017 jQWidgets.
License: http://jqwidgets.com/license/
*/
! function(a) {
    a.jqx.jqxWidget("jqxMenu", "", {}), a.extend(a.jqx._jqxMenu.prototype, {
        defineInstance: function() { var b = { items: new Array, mode: "horizontal", width: null, height: null, minimizeWidth: "auto", easing: "easeInOutSine", animationShowDuration: 200, animationHideDuration: 200, autoCloseInterval: 0, animationHideDelay: 100, animationShowDelay: 100, menuElements: new Array, autoSizeMainItems: !1, autoCloseOnClick: !0, autoCloseOnMouseLeave: !0, enableRoundedCorners: !0, disabled: !1, autoOpenPopup: !0, enableHover: !0, autoOpen: !0, autoGenerate: !0, clickToOpen: !1, showTopLevelArrows: !1, touchMode: "auto", source: null, popupZIndex: 17e3, rtl: !1, keyboardNavigation: !1, lockFocus: !1, title: "", events: ["shown", "closed", "itemclick", "initialized", "open", "close"] }; return this === a.jqx._jqxMenu.prototype ? b : (a.extend(!0, this, b), b) },
        createInstance: function(b) {
            var c = this;
            if (this.host.attr("role", "menubar"), a.jqx.utilities.resize(this.host, function() { c.refresh() }, !1, "popup" != this.mode), "auto" != this.minimizeWidth && null != this.minimizeWidth && this.width && -1 == this.width.toString().indexOf("%") && a(window).resize(function() { c.refresh() }), this.host.css("outline", "none"), this.source && null != this.source) {
                var d = this.loadItems(this.source);
                this.element.innerHTML = d
            }
            if (this._tmpHTML = this.element.innerHTML, this.element.innerHTML.indexOf("UL")) {
                var e = this.host.find("ul:first");
                e.length > 0 && this._createMenu(e[0])
            }
            this.host.data("autoclose", {}), this._render(), this._setSize(), a.jqx.browser.msie && a.jqx.browser.version < 8 && this.host.attr("hideFocus", !0)
        },
        focus: function() {
            try {
                if ("popup" === this.mode && this.keyboardNavigation) { this.host.closest("div.jqx-menu-wrapper").focus() }
                if (this.keyboardNavigation) {
                    this.host.focus();
                    var b = this,
                        c = function() {
                            if (a.jqx.isHidden(a(b.items[0].element))) {
                                var c = b._nextVisibleItem(b.items[0], 0);
                                c && (a(c.element).addClass(b.toThemeProperty("jqx-fill-state-focus")), b.activeItem = c)
                            } else a(b.items[0].element).addClass(b.toThemeProperty("jqx-fill-state-focus")), b.activeItem = b.items[0]
                        };
                    this.activeItem ? a.jqx.isHidden(a(this.activeItem.element)) ? (a(this.activeItem.element).removeClass(this.toThemeProperty("jqx-fill-state-focus")), c()) : a(this.activeItem.element).addClass(this.toThemeProperty("jqx-fill-state-focus")) : c()
                }
            } catch (a) {}
        },
        loadItems: function(b, c) {
            if (null != b) {
                if (0 == b.length) return "";
                var d = this;
                this.items = new Array;
                var e = '<ul class="jqx-menu-ul">';
                return c && (e = '<ul class="jqx-menu-ul" style="width:' + c + ';">'), a.map(b, function(a) {
                    if (void 0 == a) return null;
                    e += d._parseItem(a)
                }), e += "</ul>"
            }
        },
        _parseItem: function(a) {
            var b = "";
            if (void 0 == a) return null;
            var c = a.label;
            !a.label && a.html && (c = a.html), c || (c = "Item"), "string" == typeof a && (c = a);
            void 0 != a.selected && a.selected;
            var d = !1;
            return void 0 != a.disabled && a.disabled && (d = !0), b += "<li", d && (b += ' item-disabled="true" '), a.label && !a.html && (b += ' item-label="' + c + '" '), null != a.value && (b += ' item-value="' + a.value + '" '), void 0 != a.id && (b += ' id="' + a.id + '" '), b += ">" + c, a.items && (a.subMenuWidth ? b += this.loadItems(a.items, a.subMenuWidth) : b += this.loadItems(a.items)), b += "</li>"
        },
        _setSize: function() { null != this.width && -1 != this.width.toString().indexOf("%") ? this.host.width(this.width) : null != this.width && -1 != this.width.toString().indexOf("px") ? this.host.width(this.width) : void 0 == this.width || isNaN(this.width) || this.host.width(this.width), null != this.height && -1 != this.height.toString().indexOf("%") ? this.host.height(this.height) : null != this.height && -1 != this.height.toString().indexOf("px") ? this.host.height(this.height) : void 0 == this.height || isNaN(this.height) || this.host.height(this.height), null === this.height && this.host.height("auto"); if (null != this.minimizeWidth && "popup" != this.mode) { var b = a(window).width(); if (!a.jqx.response) { var c = !1; if (navigator.userAgent.match(/Windows|Linux|MacOS/)) { navigator.userAgent.indexOf("Windows Phone") >= 0 || navigator.userAgent.indexOf("WPDesktop") >= 0 || navigator.userAgent.indexOf("IEMobile") >= 0 || navigator.userAgent.indexOf("ZuneWP7") >= 0 || (c = !0) } var d = this.minimizeWidth; if (c && "auto" == this.minimizeWidth) return } if ("auto" == this.minimizeWidth && a.jqx.response) { var e = new a.jqx.response; "Phone" != e.device.type && "Tablet" != e.device.type || this.minimized || this.minimize() } else b < d && !this.minimized ? this.minimize() : this.minimized && b >= d && this.restore() } },
        minimize: function() {
            if (!this.minimized) {
                var b = this;
                this.host.addClass(this.toThemeProperty("jqx-menu-minimized")), this.minimized = !0, this._tmpMode = this.mode, this.mode = "simple";
                var c = this.host.closest("div.jqx-menu-wrapper");
                if (c.remove(), a("#menuWrapper" + this.element.id).remove(), a.each(this.items, function() {
                        var b = this;
                        a(b.element);
                        a(b.subMenuElement).closest("div.jqx-menu-popup").remove()
                    }), this.source) {
                    var d = this.loadItems(this.source);
                    this.element.innerHTML = d, this._tmpHTML = this.element.innerHTML
                }
                if (this.element.innerHTML = this._tmpHTML, this.element.innerHTML.indexOf("UL")) {
                    var e = this.host.find("ul:first");
                    e.length > 0 && this._createMenu(e[0])
                }
                this._render();
                var f = this.host.find("ul:first");
                f.wrap('<div class="jqx-menu-wrapper" style="z-index:' + this.popupZIndex + '; padding: 0px; display: none; margin: 0px; height: auto; width: auto; position: absolute; top: 0; left: 0; display: block; visibility: visible;"></div>');
                var c = f.closest("div.jqx-menu-wrapper");
                c[0].id = "menuWrapper" + this.element.id, c.detach(), c.appendTo(a(document.body)), c.addClass(this.toThemeProperty("jqx-widget")), c.addClass(this.toThemeProperty("jqx-menu")), c.addClass(this.toThemeProperty("jqx-menu-minimized")), c.addClass(this.toThemeProperty("jqx-widget-header")), f.children().hide(), c.hide(), c.find("ul").addClass(this.toThemeProperty("jqx-menu-ul-minimized")), this.minimizedItem = a("<div></div>"), this.minimizedItem.addClass(this.toThemeProperty("jqx-item")), this.minimizedItem.addClass(this.toThemeProperty("jqx-menu-item-top")), this.addHandler(c, "keydown", function(a) { return b.handleKeyDown(a) }), this.minimizedItem.addClass(this.toThemeProperty("jqx-menu-minimized-button")), this.minimizedItem.prependTo(this.host), this.titleElement = a("<div>" + this.title + "</div>"), this.titleElement.addClass(this.toThemeProperty("jqx-item")), this.titleElement.addClass(this.toThemeProperty("jqx-menu-title")), this.titleElement.prependTo(this.host), a("<div style='clear:both;'></div>").insertAfter(this.minimizedItem), b.minimizedHidden = !0;
                var g = function(a) { b.minimizedHidden = !0, b.minimizedItem.show(); var d = !1; "right" == b.minimizedItem.css("float") && (d = !0), c.animate({ left: d ? b.host.coord().left + b.host.width() + c.width() : -c.outerWidth(), opacity: 0 }, b.animationHideDuration, function() { c.find("ul:first").children().hide(), c.hide() }) },
                    h = function(a) {
                        if (b.minimizedHidden) {
                            c.find("ul:first").children().show(), b.minimizedHidden = !1, c.show(), c.css("opacity", 0), c.css("left", -c.outerWidth());
                            var d = !1,
                                e = c.width();
                            "right" == b.minimizedItem.css("float") && (c.css("left", b.host.coord().left + b.host.width() + e), d = !0), c.css("top", b.host.coord().top + b.host.height()), c.animate({ left: d ? b.host.coord().left + b.host.width() - e : b.host.coord().left, opacity: .95 }, b.animationShowDuration, function() {})
                        } else g();
                        b._raiseEvent("2", { type: "mouse", item: b.minimizedItem[0], event: a }), b._setSize()
                    };
                this.addHandler(a(window), "orientationchange.jqxmenu" + this.element.id, function(a) {
                    setTimeout(function() {
                        if (!b.minimizedHidden) {
                            var a = c.width(),
                                d = !1,
                                a = c.width();
                            "right" == b.minimizedItem.css("float") && (d = !0), c.css("top", b.host.coord().top + b.host.height()), c.css({ left: d ? b.host.coord().left + b.host.width() - a : b.host.coord().left })
                        }
                    }, 25)
                }), this.addHandler(this.minimizedItem, "click", function(a) { h(a) })
            }
        },
        restore: function() {
            if (this.minimized) {
                this.host.find("ul").removeClass(this.toThemeProperty("jqx-menu-ul-minimized")), this.host.removeClass(this.toThemeProperty("jqx-menu-minimized")), this.minimized = !1, this.mode = this._tmpMode, this.minimizedItem && this.minimizedItem.remove();
                if (a("#menuWrapper" + this.element.id).remove(), this.source) {
                    var b = this.loadItems(this.source);
                    this.element.innerHTML = b, this._tmpHTML = b
                }
                if (this.element.innerHTML = this._tmpHTML, this.element.innerHTML.indexOf("UL")) {
                    var c = this.host.find("ul:first");
                    c.length > 0 && this._createMenu(c[0])
                }
                this._setSize(), this._render()
            }
        },
        isTouchDevice: function() { if (void 0 != this._isTouchDevice) return this._isTouchDevice; var b = a.jqx.mobile.isTouchDevice(); return 1 == this.touchMode ? b = !0 : 0 == this.touchMode && (b = !1), b && (this.host.addClass(this.toThemeProperty("jqx-touch")), a(".jqx-menu-item").addClass(this.toThemeProperty("jqx-touch"))), this._isTouchDevice = b, b },
        refresh: function(a) { a || this._setSize() },
        resize: function(a, b) { this.width = a, this.height = b, this.refresh() },
        _closeAll: function(b) {
            var c = null != b ? b.data : this,
                d = c.items;
            if (a.each(d, function() {
                    var a = this;
                    1 == a.hasItems && a.isOpen && c._closeItem(c, a)
                }), "popup" == c.mode && null != b) { c._isRightClick(b) || c.close() }
        },
        closeItem: function(b) {
            if (null == b) return !1;
            var c = b,
                d = document.getElementById(c),
                e = this;
            return a.each(e.items, function() {
                var a = this;
                1 == a.isOpen && a.element == d && (e._closeItem(e, a), a.parentId && e.closeItem(a.parentId))
            }), !0
        },
        openItem: function(b) {
            if (null == b) return !1;
            var c = b,
                d = document.getElementById(c),
                e = this;
            return a.each(e.items, function() {
                var a = this;
                0 == a.isOpen && a.element == d && (e._openItem(e, a), a.parentId && e.openItem(a.parentId))
            }), !0
        },
        _getClosedSubMenuOffset: function(b) {
            var c = a(b.subMenuElement),
                d = -c.outerHeight(),
                e = -c.outerWidth(),
                f = 0 == b.level && "horizontal" == this.mode;
            switch (f ? e = 0 : d = 0, b.openVerticalDirection) {
                case "up":
                case "center":
                    d = c.outerHeight()
            }
            switch (b.openHorizontalDirection) {
                case this._getDir("left"):
                case "center":
                    e = f ? 0 : c.outerWidth()
            }
            return { left: e, top: d }
        },
        _closeItem: function(b, c, d, e) {
            if (null == b || null == c) return !1;
            var f = a(c.subMenuElement),
                g = 0 == c.level && "horizontal" == this.mode,
                h = this._getClosedSubMenuOffset(c),
                i = h.top,
                j = h.left,
                k = (a(c.element), f.closest("div.jqx-menu-popup"));
            if (null != k) {
                var l = b.animationHideDelay;
                1 == e && (l = 0), f.data("timer") && null != f.data("timer").show && (clearTimeout(f.data("timer").show), f.data("timer").show = null);
                var m = function() {
                    c.isOpen = !1, g ? f.stop().animate({ top: i }, b.animationHideDuration, function() {
                        a(c.element).removeClass(b.toThemeProperty("jqx-fill-state-pressed")), a(c.element).removeClass(b.toThemeProperty("jqx-menu-item-top-selected")), a(c.element).removeClass(b.toThemeProperty("jqx-rc-b-expanded")), k.removeClass(b.toThemeProperty("jqx-rc-t-expanded"));
                        var d = a(c.arrow);
                        d.length > 0 && b.showTopLevelArrows && (d.removeClass(), "down" == c.openVerticalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-down")), d.addClass(b.toThemeProperty("jqx-icon-arrow-down"))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-up")), d.addClass(b.toThemeProperty("jqx-icon-arrow-up")))), a.jqx.aria(a(c.element), "aria-expanded", !1), k.css({ display: "none" }), 0 == b.animationHideDuration && f.css({ top: i }), b._raiseEvent("1", c)
                    }) : (a.jqx.browser.msie, f.stop().animate({ left: j }, b.animationHideDuration, function() {
                        if (0 == b.animationHideDuration && f.css({ left: j }), c.level > 0) {
                            a(c.element).removeClass(b.toThemeProperty("jqx-fill-state-pressed")), a(c.element).removeClass(b.toThemeProperty("jqx-menu-item-selected"));
                            var d = a(c.arrow);
                            d.length > 0 && (d.removeClass(), "left" != c.openHorizontalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("right"))), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("right")))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("left"))), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("left")))))
                        } else {
                            a(c.element).removeClass(b.toThemeProperty("jqx-fill-state-pressed")), a(c.element).removeClass(b.toThemeProperty("jqx-menu-item-top-selected"));
                            var d = a(c.arrow);
                            d.length > 0 && (d.removeClass(), "left" != c.openHorizontalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-top-" + b._getDir("right"))), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("right")))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-top-" + b._getDir("left"))), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("left")))))
                        }
                        a.jqx.aria(a(c.element), "aria-expanded", !1), k.css({ display: "none" }), b._raiseEvent("1", c)
                    }))
                };
                if (l > 0 ? f.data("timer") && (f.data("timer").hide = setTimeout(function() { m() }, l)) : m(), void 0 != d && d) {
                    var n = f.children();
                    a.each(n, function() {
                        if (b.menuElements[this.id] && b.menuElements[this.id].isOpen) {
                            a(b.menuElements[this.id].subMenuElement);
                            b._closeItem(b, b.menuElements[this.id], !0, !0)
                        }
                    })
                }
            }
        },
        getSubItems: function(b, c) {
            if (null == b) return !1;
            var d = this,
                e = new Array;
            null != c && a.extend(e, c);
            var f = b,
                g = this.menuElements[f],
                h = a(g.subMenuElement),
                i = h.find(".jqx-menu-item");
            return a.each(i, function() {
                e[this.id] = d.menuElements[this.id];
                var b = d.getSubItems(this.id, e);
                a.extend(e, b)
            }), e
        },
        disable: function(b, c) {
            if (null != b) {
                var d = b,
                    e = this;
                if (this.menuElements[d]) {
                    var f = this.menuElements[d];
                    f.disabled = c;
                    var g = a(f.element);
                    f.element.disabled = c, a.each(g.children(), function() { this.disabled = c }), c ? (g.addClass(e.toThemeProperty("jqx-menu-item-disabled")), g.addClass(e.toThemeProperty("jqx-fill-state-disabled"))) : (g.removeClass(e.toThemeProperty("jqx-menu-item-disabled")), g.removeClass(e.toThemeProperty("jqx-fill-state-disabled")))
                }
            }
        },
        getItem: function(a) { if (this.menuElements[a]) { return this.menuElements[a] } return null },
        disableItem: function(a) { this.disable(a, !0) },
        hideItem: function(b) {
            if (this.menuElements[b]) {
                var c = this.menuElements[b];
                a(c.element).hide()
            }
        },
        showItem: function(b) {
            if (this.menuElements[b]) {
                var c = this.menuElements[b];
                a(c.element).show()
            }
        },
        enableItem: function(a) { this.disable(a, !1) },
        _setItemProperty: function(a, b, c) {
            if (null != a) {
                var d = a;
                if (this.menuElements[d]) {
                    var e = this.menuElements[d];
                    e[b] && (e[b] = c)
                }
            }
        },
        setItemOpenDirection: function(b, c, d) {
            if (null != b) {
                var e = b,
                    f = this,
                    g = a.jqx.browser.msie && a.jqx.browser.version < 8;
                if (this.menuElements[e]) {
                    var h = this.menuElements[e];
                    if (null != c && (h.openHorizontalDirection = c, h.hasItems && h.level > 0)) {
                        var i = a(h.element);
                        if (void 0 != i) {
                            var j = a(h.arrow);
                            null == h.arrow && (j = a('<span id="arrow' + i[0].id + '"></span>'), g ? j.appendTo(i) : j.prependTo(i), h.arrow = j[0]), j.removeClass(), "left" == h.openHorizontalDirection ? (j.addClass(f.toThemeProperty("jqx-menu-item-arrow-" + f._getDir("left"))), j.addClass(f.toThemeProperty("jqx-icon-arrow-" + f._getDir("left")))) : (j.addClass(f.toThemeProperty("jqx-menu-item-arrow-" + f._getDir("right"))), j.addClass(f.toThemeProperty("jqx-icon-arrow-" + f._getDir("right")))), j.css("visibility", "inherit"), g ? (j.css("display", "inline-block"), j.css("float", "none")) : (j.css("display", "block"), j.css("float", "right"))
                        }
                    }
                    if (null != d) {
                        h.openVerticalDirection = d;
                        var j = a(h.arrow),
                            i = a(h.element);
                        if (!f.showTopLevelArrows) return;
                        void 0 != i && (null == h.arrow && (j = a('<span id="arrow' + i[0].id + '"></span>'), g ? j.appendTo(i) : j.prependTo(i), h.arrow = j[0]), j.removeClass(), "down" == h.openVerticalDirection ? (j.addClass(f.toThemeProperty("jqx-menu-item-arrow-down")), j.addClass(f.toThemeProperty("jqx-icon-arrow-down"))) : (j.addClass(f.toThemeProperty("jqx-menu-item-arrow-up")), j.addClass(f.toThemeProperty("jqx-icon-arrow-up"))), j.css("visibility", "inherit"), g ? (j.css("display", "inline-block"), j.css("float", "none")) : (j.css("display", "block"), j.css("float", "right")))
                    }
                }
            }
        },
        _getSiblings: function(a) { for (var b = new Array, c = 0, d = 0; d < this.items.length; d++) this.items[d] != a && this.items[d].parentId == a.parentId && this.items[d].hasItems && (b[c++] = this.items[d]); return b },
        _openItem: function(b, c, d) {
            if (null == b || null == c) return !1;
            if (c.isOpen) return !1;
            if (c.disabled) return !1;
            if (b.disabled) return !1;
            var e = b.popupZIndex;
            void 0 != d && (e = d);
            var f = b.animationHideDuration;
            b.animationHideDuration = 0, b._closeItem(b, c, !0, !0), b.animationHideDuration = f, a(c.element).focus();
            var g = [5, 5],
                h = a(c.subMenuElement);
            null != h && h.stop(), h.data("timer") && null != h.data("timer").hide && clearTimeout(h.data("timer").hide);
            var i = h.closest("div.jqx-menu-popup"),
                j = a(c.element),
                k = 0 == c.level ? this._getOffset(c.element) : j.position();
            if (c.level > 0 && this.hasTransform) {
                var l = parseInt(j.coord().top) - parseInt(this._getOffset(c.element).top);
                k.top += l
            }
            0 == c.level && "popup" == this.mode && (k = j.coord());
            var m = 0 == c.level && "horizontal" == this.mode,
                n = m ? k.left : null != this.menuElements[c.parentId] && null != this.menuElements[c.parentId].subMenuElement ? parseInt(a(a(this.menuElements[c.parentId].subMenuElement).closest("div.jqx-menu-popup")).outerWidth()) - g[0] : parseInt(h.outerWidth());
            if (i.css({ visibility: "visible", display: "block", left: n, top: m ? k.top + j.outerHeight() : k.top, zIndex: e }), h.css("display", "block"), "horizontal" != this.mode && 0 == c.level) {
                var o = this._getOffset(this.element);
                i.css("left", -1 + o.left + this.host.outerWidth()), h.css("left", -h.outerWidth())
            } else {
                var p = this._getClosedSubMenuOffset(c);
                h.css("left", p.left), h.css("top", p.top)
            }
            i.css({ height: parseInt(h.outerHeight()) + parseInt(g[1]) + "px" });
            var q = 0,
                r = 0;
            switch (c.openVerticalDirection) {
                case "up":
                    if (m) {
                        h.css("top", h.outerHeight()), q = g[1];
                        var s = parseInt(h.parent().css("padding-bottom"));
                        isNaN(s) && (s = 0), s > 0 && i.addClass(this.toThemeProperty("jqx-menu-popup-clear")), h.css("top", h.outerHeight() - s), i.css({ display: "block", top: k.top - i.outerHeight(), zIndex: e })
                    } else q = g[1], h.css("top", h.outerHeight()), i.css({ display: "block", top: k.top - i.outerHeight() + g[1] + j.outerHeight(), zIndex: e });
                    break;
                case "center":
                    m ? (h.css("top", 0), i.css({ display: "block", top: k.top - i.outerHeight() / 2 + g[1], zIndex: e })) : (h.css("top", 0), i.css({ display: "block", top: k.top + j.outerHeight() / 2 - i.outerHeight() / 2 + g[1], zIndex: e }))
            }
            switch (c.openHorizontalDirection) {
                case this._getDir("left"):
                    m ? i.css({ left: k.left - (i.outerWidth() - j.outerWidth() - g[0]) }) : (r = 0, h.css("left", i.outerWidth()), i.css({ left: k.left - i.outerWidth() + 2 * c.level }));
                    break;
                case "center":
                    m ? i.css({ left: k.left - (i.outerWidth() / 2 - j.outerWidth() / 2 - g[0] / 2) }) : (i.css({ left: k.left - (i.outerWidth() / 2 - j.outerWidth() / 2 - g[0] / 2) }), h.css("left", i.outerWidth()))
            }
            if (m) { if (parseInt(h.css("top")) == q) return void(c.isOpen = !0) } else if (parseInt(h.css("left")) == r) return void c.isOpen;
            a.each(b._getSiblings(c), function() { b._closeItem(b, this, !0, !0) });
            var t = a.data(b.element, "animationHideDelay");
            b.animationHideDelay = t, this.autoCloseInterval > 0 && (null != this.host.data("autoclose") && null != this.host.data("autoclose").close && clearTimeout(this.host.data("autoclose").close), null != this.host.data("autoclose") && (this.host.data("autoclose").close = setTimeout(function() { b._closeAll() }, this.autoCloseInterval))), h.data("timer") && (h.data("timer").show = setTimeout(function() {
                if (null != i)
                    if (m) {
                        h.stop(), h.css("left", r), a.jqx.browser.msie, j.addClass(b.toThemeProperty("jqx-fill-state-pressed")), j.addClass(b.toThemeProperty("jqx-menu-item-top-selected")), "down" == c.openVerticalDirection ? (a(c.element).addClass(b.toThemeProperty("jqx-rc-b-expanded")), i.addClass(b.toThemeProperty("jqx-rc-t-expanded"))) : (a(c.element).addClass(b.toThemeProperty("jqx-rc-t-expanded")), i.addClass(b.toThemeProperty("jqx-rc-b-expanded")));
                        var d = a(c.arrow);
                        d.length > 0 && b.showTopLevelArrows && (d.removeClass(), "down" == c.openVerticalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-down-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-down"))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-up-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-up")))), 0 == b.animationShowDuration ? (h.css({ top: q }), c.isOpen = !0, b._raiseEvent("0", c), a.jqx.aria(a(c.element), "aria-expanded", !0)) : h.animate({ top: q }, b.animationShowDuration, b.easing, function() { c.isOpen = !0, a.jqx.aria(a(c.element), "aria-expanded", !0), b._raiseEvent("0", c) })
                    } else {
                        if (h.stop(), h.css("top", q), a.jqx.browser.msie, c.level > 0) {
                            j.addClass(b.toThemeProperty("jqx-fill-state-pressed")), j.addClass(b.toThemeProperty("jqx-menu-item-selected"));
                            var d = a(c.arrow);
                            d.length > 0 && (d.removeClass(), "left" != c.openHorizontalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("right") + "-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("right")))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("left") + "-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("left")))))
                        } else {
                            j.addClass(b.toThemeProperty("jqx-fill-state-pressed")), j.addClass(b.toThemeProperty("jqx-menu-item-top-selected"));
                            var d = a(c.arrow);
                            d.length > 0 && (d.removeClass(), "left" != c.openHorizontalDirection ? (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("right") + "-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("right")))) : (d.addClass(b.toThemeProperty("jqx-menu-item-arrow-" + b._getDir("left") + "-selected")), d.addClass(b.toThemeProperty("jqx-icon-arrow-" + b._getDir("left")))))
                        }
                        a.jqx.browser.msie, 0 == b.animationShowDuration ? (h.css({ left: r }), b._raiseEvent("0", c), c.isOpen = !0, a.jqx.aria(a(c.element), "aria-expanded", !0)) : h.animate({ left: r }, b.animationShowDuration, b.easing, function() { b._raiseEvent("0", c), c.isOpen = !0, a.jqx.aria(a(c.element), "aria-expanded", !0) })
                    }
            }, this.animationShowDelay))
        },
        _getDir: function(a) {
            switch (a) {
                case "left":
                    return this.rtl ? "right" : "left";
                case "right":
                    return this.rtl ? "left" : "right"
            }
            return "left"
        },
        _applyOrientation: function(b, c) {
            var d = this,
                e = 0;
            if (d.host.removeClass(d.toThemeProperty("jqx-menu-horizontal")), d.host.removeClass(d.toThemeProperty("jqx-menu-vertical")), d.host.removeClass(d.toThemeProperty("jqx-menu")), d.host.removeClass(d.toThemeProperty("jqx-widget")), d.host.addClass(d.toThemeProperty("jqx-widget")), d.host.addClass(d.toThemeProperty("jqx-menu")), void 0 != b && void 0 != c && "popup" == c) {
                if (d.host.parent().length > 0 && d.host.parent().parent().length > 0 && d.host.parent().parent()[0] == document.body) {
                    var f = a.data(document.body, "jqxMenuOldHost" + d.element.id);
                    if (null != f) {
                        var g = d.host.closest("div.jqx-menu-wrapper");
                        g.remove(), g.appendTo(f), d.host.css("display", "block"), d.host.css("visibility", "visible"), g.css("display", "block"), g.css("visibility", "visible")
                    }
                }
            } else void 0 == b && void 0 == c && a.data(document.body, "jqxMenuOldHost" + d.element.id, d.host.parent()[0]);
            switch (d.autoOpenPopup ? "popup" == d.mode ? (d.addHandler(a(document), "contextmenu." + d.element.id, function(a) { return !1 }), d.addHandler(a(document), "mousedown.menu" + d.element.id, function(a) { d._openContextMenu(a) })) : (d.removeHandler(a(document), "contextmenu." + d.element.id), d.removeHandler(a(document), "mousedown.menu" + d.element.id)) : (d.removeHandler(a(document), "contextmenu." + d.element.id), d.removeHandler(a(document), "mousedown.menu" + d.element.id), d.addHandler(a(document), "contextmenu." + d.element.id, function(a) { if (a.target && a.target.className.indexOf && a.target.className.indexOf("jqx-menu") >= 0) return !1 })), d.rtl && d.host.addClass(d.toThemeProperty("jqx-rtl")), d.mode) {
                case "horizontal":
                    d.host.addClass(d.toThemeProperty("jqx-widget-header")), d.host.addClass(d.toThemeProperty("jqx-menu-horizontal")), a.each(d.items, function() {
                        var b = this;
                        $element = a(b.element);
                        var c = a(b.arrow);
                        if (c.removeClass(), b.hasItems && b.level > 0) {
                            var c = a('<span style="border: none; background-color: transparent;" id="arrow' + $element[0].id + '"></span>');
                            c.prependTo($element), c.css("float", d._getDir("right")), c.addClass(d.toThemeProperty("jqx-menu-item-arrow-" + d._getDir("right"))), c.addClass(d.toThemeProperty("jqx-icon-arrow-" + d._getDir("right"))), b.arrow = c[0]
                        }
                        if (0 == b.level) {
                            if (a(b.element).css("float", d._getDir("left")), !b.ignoretheme && b.hasItems && d.showTopLevelArrows) {
                                var c = a('<span style="border: none; background-color: transparent;" id="arrow' + $element[0].id + '"></span>'),
                                    f = a.jqx.browser.msie && a.jqx.browser.version < 8;
                                null == b.arrow ? f ? c.appendTo($element) : c.prependTo($element) : c = a(b.arrow), "down" == b.openVerticalDirection ? (c.addClass(d.toThemeProperty("jqx-menu-item-arrow-down")), c.addClass(d.toThemeProperty("jqx-icon-arrow-down"))) : (c.addClass(d.toThemeProperty("jqx-menu-item-arrow-up")), c.addClass(d.toThemeProperty("jqx-icon-arrow-up"))), c.css("visibility", "inherit"), f ? c.css("display", "inline-block") : (c.css("display", "block"), c.css("float", "right")), b.arrow = c[0]
                            } else if (!b.ignoretheme && b.hasItems && !d.showTopLevelArrows && null != b.arrow) {
                                var c = a(b.arrow);
                                c.remove(), b.arrow = null
                            }
                            e = Math.max(e, $element.height())
                        }
                    });
                    break;
                case "vertical":
                case "popup":
                case "simple":
                    if (d.host.addClass(d.toThemeProperty("jqx-menu-vertical")), a.each(d.items, function() {
                            var b = this;
                            if ($element = a(b.element), b.hasItems && !b.ignoretheme) {
                                if (b.arrow && a(b.arrow).remove(), "simple" == d.mode) return !0;
                                var c = a('<span style="border: none; background-color: transparent;" id="arrow' + $element[0].id + '"></span>');
                                c.prependTo($element), c.css("float", "right"), 0 == b.level ? (c.addClass(d.toThemeProperty("jqx-menu-item-arrow-top-" + d._getDir("right"))), c.addClass(d.toThemeProperty("jqx-icon-arrow-" + d._getDir("right")))) : (c.addClass(d.toThemeProperty("jqx-menu-item-arrow-" + d._getDir("right"))), c.addClass(d.toThemeProperty("jqx-icon-arrow-" + d._getDir("right")))), b.arrow = c[0]
                            }
                            $element.css("float", "none")
                        }), "popup" == d.mode) {
                        d.host.addClass(d.toThemeProperty("jqx-widget-content")), d.host.wrap('<div tabindex=0 class="jqx-menu-wrapper" style="z-index:' + d.popupZIndex + '; border: none; background-color: transparent; padding: 0px; margin: 0px; position: absolute; top: 0; left: 0; display: block; visibility: visible;"></div>');
                        var g = d.host.closest("div.jqx-menu-wrapper");
                        d.host.addClass(d.toThemeProperty("jqx-popup")), g[0].id = "menuWrapper" + d.element.id, g.appendTo(a(document.body)), d.addHandler(g, "keydown", function(a) { return d.handleKeyDown(a) })
                    } else d.host.addClass(d.toThemeProperty("jqx-widget-header"));
                    if ("popup" == d.mode) {
                        var h = d.host.height();
                        d.host.css("position", "absolute"), d.host.css("top", "0"), d.host.css("left", "0"), "simple" != d.mode && (d.host.height(h), d.host.css("display", "none"))
                    }
            }
            var i = d.isTouchDevice();
            d.autoCloseOnClick && (d.removeHandler(a(document), "mousedown.menu" + d.element.id, d._closeAfterClick), d.addHandler(a(document), "mousedown.menu" + d.element.id, d._closeAfterClick, d), i && (d.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + ".menu" + d.element.id, d._closeAfterClick, d), d.addHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + ".menu" + d.element.id, d._closeAfterClick, d)))
        },
        _getBodyOffset: function() {
            var b = 0,
                c = 0;
            return "0px" != a("body").css("border-top-width") && (b = parseInt(a("body").css("border-top-width")), isNaN(b) && (b = 0)), "0px" != a("body").css("border-left-width") && (c = parseInt(a("body").css("border-left-width")), isNaN(c) && (c = 0)), { left: c, top: b }
        },
        _getOffset: function(b) {
            var c = a.jqx.mobile.isSafariMobileBrowser(),
                d = a(b).coord(!0),
                e = d.top,
                f = d.left;
            "0px" != a("body").css("border-top-width") && (e = parseInt(e) + this._getBodyOffset().top), "0px" != a("body").css("border-left-width") && (f = parseInt(f) + this._getBodyOffset().left);
            var g = a.jqx.mobile.isWindowsPhone(),
                h = a.jqx.mobile.isTouchDevice();
            if (this.hasTransform || null != c && c || g || h) { return { left: a.jqx.mobile.getLeftPos(b), top: a.jqx.mobile.getTopPos(b) } }
            return { left: f, top: e }
        },
        _isRightClick: function(a) { var b; if (!a) var a = window.event; return a.which ? b = 3 == a.which : a.button && (b = 2 == a.button), b },
        _openContextMenu: function(a) {
            var b = this;
            b._isRightClick(a) && b.open(parseInt(a.clientX) + 5, parseInt(a.clientY) + 5)
        },
        close: function() {
            var b = this;
            a.data(this.element, "contextMenuOpened" + this.element.id) && (this.host, a.each(b.items, function() {
                var a = this;
                a.hasItems && b._closeItem(b, a)
            }), a.each(b.items, function() {
                var b = this;
                1 == b.isOpen && ($submenu = a(b.subMenuElement), $submenu.closest("div.jqx-menu-popup").hide(this.animationHideDuration))
            }), this.host.hide(this.animationHideDuration), a.data(b.element, "contextMenuOpened" + this.element.id, !1), b._raiseEvent("1", b), b._raiseEvent("5"))
        },
        open: function(b, c) {
            if ("popup" == this.mode) {
                var d = 0;
                "block" == this.host.css("display") && (this.close(), d = this.animationHideDuration);
                var e = this;
                void 0 != b && null != b || (b = 0), void 0 != c && null != c || (c = 0), setTimeout(function() { e.host.show(e.animationShowDuration), e.host.css("visibility", "visible"), a.data(e.element, "contextMenuOpened" + e.element.id, !0), e._raiseEvent("0", e), e._raiseEvent("4", { left: b, top: c }), e.host.css("z-index", 9999), void 0 != b && void 0 != c && e.host.css({ left: b, top: c }), e.focus() }, d)
            }
        },
        _renderHover: function(a, b, c) {
            var d = this;
            b.ignoretheme || (this.addHandler(a, "mouseenter", function() { d.hoveredItem = b, b.disabled || b.separator || !d.enableHover || d.disabled || (b.level > 0 ? (a.addClass(d.toThemeProperty("jqx-fill-state-hover")), a.addClass(d.toThemeProperty("jqx-menu-item-hover"))) : (a.addClass(d.toThemeProperty("jqx-fill-state-hover")), a.addClass(d.toThemeProperty("jqx-menu-item-top-hover")))) }), this.addHandler(a, "mouseleave", function() { b.disabled || b.separator || !d.enableHover || d.disabled || (b.level > 0 ? (a.removeClass(d.toThemeProperty("jqx-fill-state-hover")), a.removeClass(d.toThemeProperty("jqx-menu-item-hover"))) : (a.removeClass(d.toThemeProperty("jqx-fill-state-hover")), a.removeClass(d.toThemeProperty("jqx-menu-item-top-hover")))) }))
        },
        _closeAfterClick: function(b) {
            var c = null != b ? b.data : this,
                d = !1;
            c.autoCloseOnClick && (a.each(a(b.target).parents(), function() { if (this.className.indexOf && -1 != this.className.indexOf("jqx-menu")) return d = !0, !1 }), d || (b.data = c, c._closeAll(b)))
        },
        _autoSizeHorizontalMenuItems: function() {
            var b = this;
            if (b.autoSizeMainItems && "horizontal" == this.mode) {
                var c = this.maxHeight;
                parseInt(c) > parseInt(this.host.height()) && (c = parseInt(this.host.height())), c = parseInt(this.host.height()), a.each(this.items, function() {
                    var d = this;
                    if ($element = a(d.element), 0 == d.level && c > 0) {
                        var e = $element.children().length > 0 ? parseInt($element.children().height()) : $element.height(),
                            f = b.host.find("ul:first"),
                            g = parseInt(f.css("padding-top")),
                            h = parseInt(f.css("margin-top")),
                            i = c - 2 * (h + g),
                            j = parseInt(i) / 2 - e / 2,
                            k = parseInt(j),
                            l = parseInt(j);
                        if ($element.css("padding-top", k), $element.css("padding-bottom", l), parseInt($element.outerHeight()) > i) { $element.css("padding-top", k - 1), k -= 1 }
                    }
                })
            }
            a.each(this.items, function() {
                var b = this;
                if ($element = a(b.element), b.hasItems && b.level > 0 && b.arrow) {
                    var c = a(b.arrow),
                        d = a(b.element).height();
                    d > 15 && c.css("margin-top", (d - 15) / 2)
                }
            })
        },
        _nextVisibleItem: function(a, b) {
            if (null == a || void 0 == a) return null;
            for (var c = a; null != c;)
                if (c = c.nextItem, this._isVisible(c) && !c.disabled && "separator" !== c.type) { if (this.minimized) return c; if (void 0 != b && c && c.level != b) continue; return c }
            return null
        },
        _prevVisibleItem: function(a, b) {
            if (null == a || void 0 == a) return null;
            for (var c = a; null != c;)
                if (c = c.prevItem, this._isVisible(c) && !c.disabled && "separator" !== c.type) { if (this.minimized) return c; if (void 0 != b && c && c.level != b) continue; return c }
            return null
        },
        _parentItem: function(b) { if (null == b || void 0 == b) return null; var c = b.parentElement; if (!c) return null; var d = null; return a.each(this.items, function() { if (this.element == c) return d = this, !1 }), d },
        _isElementVisible: function(b) { return null != b && ("none" != a(b).css("display") && "hidden" != a(b).css("visibility")) },
        _isVisible: function(a) { if (null == a || void 0 == a) return !1; if (!this._isElementVisible(a.element)) return !1; var b = this._parentItem(a); if (null == b) return !0; if (this.minimized) return !0; if (null != b) { if (!this._isElementVisible(b.element)) return !1; if (!b.isOpen && !this.minimized) return !1; for (; null != b;) { if (null != (b = this._parentItem(b)) && !this._isElementVisible(b.element)) return !1; if (null != b && !b.isOpen) return !1 } } return !0 },
        _render: function(b, c) {
            this.disabled && (this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled")), this.host.addClass(this.toThemeProperty("jqx-menu-disabled"))), void 0 == this.host.attr("tabindex") && this.host.attr("tabindex", 0);
            var d = this.popupZIndex,
                e = [5, 5],
                f = this;
            a.data(f.element, "animationHideDelay", f.animationHideDelay);
            var g = this.isTouchDevice(),
                h = g && (a.jqx.mobile.isWindowsPhone() || navigator.userAgent.indexOf("Touch") >= 0);
            if (-1 != navigator.platform.toLowerCase().indexOf("win"))
                if (navigator.userAgent.indexOf("Windows Phone") >= 0 || navigator.userAgent.indexOf("WPDesktop") >= 0 || navigator.userAgent.indexOf("IEMobile") >= 0 || navigator.userAgent.indexOf("ZuneWP7") >= 0) this.touchDevice = !0;
                else if (navigator.userAgent.indexOf("Touch") >= 0) {
                var i = "MSPointerDown" in window;
                (i || a.jqx.mobile.isWindowsPhone() || navigator.userAgent.indexOf("ARM") >= 0) && (!0, h = !0, f.clickToOpen = !0, f.autoCloseOnClick = !1, f.enableHover = !1)
            }
            a.data(document.body, "menuel", this), this.hasTransform = a.jqx.utilities.hasTransform(this.host), this._applyOrientation(b, c), this.removeHandler(this.host, "blur"), this.removeHandler(this.host, "focus"), this.addHandler(this.host, "blur", function(b) {
                if (f.keyboardNavigation && f.activeItem) {
                    if ("popup" === f.mode && document.activeElement && document.activeElement.className.indexOf("jqx-menu-wrapper") >= 0) return;
                    a(f.activeItem.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = null
                }
            }), this.addHandler(this.host, "focus", function(b) {
                if (f.keyboardNavigation && !f.activeItem)
                    if (f.hoveredItem) a(f.hoveredItem.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = f.hoveredItem;
                    else {
                        var c = function() {
                            if (a.jqx.isHidden(a(f.items[0].element))) {
                                var b = f._nextVisibleItem(f.items[0], 0);
                                b && (a(b.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = b)
                            } else a(f.items[0].element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = f.items[0]
                        };
                        f.activeItem ? a.jqx.isHidden(a(f.activeItem.element)) ? (a(f.activeItem.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), c()) : a(f.activeItem.element).addClass(f.toThemeProperty("jqx-fill-state-focus")) : c()
                    }
            }), this.removeHandler(this.host, "keydown"), f.handleKeyDown = function(b) {
                if (!f.keyboardNavigation) return !0;
                if ("input" === b.target.nodeName.toLowerCase()) return !0;
                var c = null,
                    d = null;
                a.each(f.items, function() { return !!this.disabled || (this.element.className.indexOf("pressed") >= 0 && (d = this), this.element.className.indexOf("focus") >= 0 ? (c = this, !1) : void 0) }), !c && d && (c = d), c || (a(f.items[0].element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = f.items[0], c = f.activeItem);
                if (27 == b.keyCode) {
                    if (b.data = f, f._closeAll(b), c)
                        for (var e = c; null != e;) e.parentItem ? e = e.parentItem : (a(f.activeItem.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = e, a(f.activeItem.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), e = e.parentItem);
                    !0
                }
                if (13 == b.keyCode && c) {
                    !0, f._raiseEvent("2", { item: c.element, event: b, type: "keyboard" });
                    var g = null != c.anchor ? a(c.anchor) : null;
                    if (null != g && g.length > 0) {
                        var h = g.attr("href"),
                            i = g.attr("target");
                        null != h && (null != i ? window.open(h, i) : window.location = h)
                    }
                    b.preventDefault(), b.stopPropagation(), a(c.element).focus()
                }
                var j = function(a) { if (null == a) return new Array; for (var b = new Array, c = 0, d = 0; d < f.items.length; d++) f.items[d].parentId == a.parentId && (b[c++] = f.items[d]); return b },
                    k = "";
                switch (b.keyCode) {
                    case 40:
                        k = "down";
                        break;
                    case 38:
                        k = "up";
                        break;
                    case 39:
                        k = "right";
                        break;
                    case 37:
                        k = "left"
                }
                if (c && "left" === c.openHorizontalDirection && "left" === k && (k = "right"), c && "left" === c.openHorizontalDirection && "right" === k && (k = "left"), c && "top" === c.openVerticalDirection && "top" === k && (k = "bottom"), c && "top" === c.openVerticalDirection && "bottom" === k && (k = "top"), f.rtl && ("right" === k ? k = "left" : "left" === k && (k = "right")), "right" === k && !f.minimized) {
                    if (b.altKey && (0 != c.level && c.hasItems || "horizontal" != f.mode)) f._openItem(f, c);
                    else {
                        var l = f._nextVisibleItem(c, 0),
                            m = f._nextVisibleItem(c),
                            n = j(m);
                        l || (l = m), l && (l.parentId === c.parentId && 0 == l.level && "horizontal" == f.mode || m.id == n[0].id && 0 != m.level) && (m.id == n[0].id && (0 != c.level || 0 == c.level && "horizontal" != f.mode) && (l = m), a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l)
                    }
                    b.preventDefault(), b.stopPropagation()
                }
                if ("left" === k && !f.minimized) {
                    if (b.altKey && (0 != c.level && "horizontal" !== f.mode || c.level > 1 && "horizontal" === f.mode || 1 == c.level && c.hasItems && "horizontal" === f.mode)) c.hasItems ? f._closeItem(f, c) : c.parentItem && (f._closeItem(f, c.parentItem), a(c.parentItem.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = c.parentItem);
                    else {
                        var l = f._prevVisibleItem(c, 0),
                            o = c.parentItem;
                        l && l.parentId === c.parentId && 0 == l.level && "horizontal" == f.mode ? (a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l) : o && 0 == o.level && "horizontal" == f.mode || !o || o.level != c.level - 1 || (a(o.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = o)
                    }
                    b.preventDefault(), b.stopPropagation()
                }
                if ("down" === k) {
                    if (b.altKey) 0 == c.level && c.hasItems && f._openItem(f, c), f.minimized && f.minimizedHidden && f.minimizedItem.trigger("click");
                    else {
                        var l = f._nextVisibleItem(c, c.level),
                            n = j(l);
                        if (f.minimized && l) a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l;
                        else if (l && (l.parentId === c.parentId || l.id == n[0].id && "horizontal" == f.mode) && (0 == l.level && "horizontal" == f.mode || (a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l)), "horizontal" === f.mode && 0 === c.level && c.isOpen && c.hasItems) {
                            var l = f._nextVisibleItem(c);
                            a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l
                        }
                    }
                    b.preventDefault(), b.stopPropagation()
                } else if ("up" === k) {
                    if (b.altKey) c.parentItem && 0 == c.parentItem.level ? (f._closeItem(f, c.parentItem), a(c.parentItem.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = c.parentItem) : null === c.parentItem && 0 === c.level && "horizontal" === f.mode && f._closeItem(f, c), f.minimized && (f.minimizedHidden || f.minimizedItem.trigger("click"));
                    else {
                        var l = f._prevVisibleItem(c, c.level),
                            n = j(c);
                        if (f.minimized && l) a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l;
                        else if (l && (l.parentId === c.parentId || l.id == c.parentId && 0 == l.level && "horizontal" == f.mode)) 0 == l.level && "horizontal" === f.mode && 0 === c.level || (a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l);
                        else if (c && c.id == n[0].id && c.parentItem && 0 === c.parentItem.level && "horizontal" === f.mode) {
                            var l = c.parentItem;
                            a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l
                        }
                    }
                    b.preventDefault(), b.stopPropagation()
                }
                if (9 == b.keyCode) {
                    var l = b.shiftKey ? f._prevVisibleItem(c) : f._nextVisibleItem(c);
                    if (l) a(l.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = l, b.preventDefault(), b.stopPropagation();
                    else if (f.lockFocus) {
                        for (var n = new Array, p = 0, q = 0; q < f.items.length; q++) f.items[q] != c && f.items[q].parentId == c.parentId && (n[p++] = f.items[q]);
                        n.length > 0 && (b.shiftKey ? (a(n[n.length - 1].element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = n[n.length - 1]) : (a(n[0].element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = n[0]), a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus"))), b.preventDefault(), b.stopPropagation()
                    } else c && (a(c.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = null)
                }
            }, this.addHandler(this.host, "keydown", function(a) { f.handleKeyDown(a) }), f.enableRoundedCorners && this.host.addClass(f.toThemeProperty("jqx-rc-all")), a.each(this.items, function() {
                var b = this,
                    c = a(b.element);
                if (c.attr("role", "menuitem"), f.enableRoundedCorners && c.addClass(f.toThemeProperty("jqx-rc-all")), f.removeHandler(c, "click"), f.addHandler(c, "click", function(c) {
                        if (!b.disabled && !f.disabled && (f.keyboardNavigation && (f.activeItem && a(f.activeItem.element).removeClass(f.toThemeProperty("jqx-fill-state-focus")), f.activeItem = b, a(b.element).addClass(f.toThemeProperty("jqx-fill-state-focus")), f.minimized && c.stopPropagation()), f._raiseEvent("2", { type: "mouse", item: b.element, event: c }), f.autoOpen ? !f.autoCloseOnClick || g || f.clickToOpen || b.closeOnClick && (c.data = f, f._closeAll(c)) : b.level > 0 && (!f.autoCloseOnClick || g || f.clickToOpen || (c.data = f, f._closeAll(c))), g && f.autoCloseOnClick && (c.data = f, b.hasItems || f._closeAll(c)), "A" != c.target.tagName && "a" != c.target.tagName)) {
                            var d = null != b.anchor ? a(b.anchor) : null;
                            if (null != d && d.length > 0) {
                                var e = d.attr("href"),
                                    h = d.attr("target");
                                null != e && (null != h ? window.open(e, h) : window.location = e)
                            }
                        }
                    }), f.removeHandler(c, "mouseenter"), f.removeHandler(c, "mouseleave"), h || "simple" == f.mode || f._renderHover(c, b, g), null != b.subMenuElement) {
                    var i = a(b.subMenuElement);
                    if ("simple" == f.mode) return i.show(), !0;
                    i.wrap('<div class="jqx-menu-popup ' + f.toThemeProperty("jqx-menu-popup") + '" style="border: none; background-color: transparent; z-index:' + d + '; padding: 0px; margin: 0px; position: absolute; top: 0; left: 0; display: block; visibility: hidden;"><div style="background-color: transparent; border: none; position:absolute; overflow:hidden; left: 0; top: 0; right: 0; width: 100%; height: 100%;"></div></div>'), i.css({ overflow: "hidden", position: "absolute", left: 0, display: "inherit", top: -i.outerHeight() }), i.data("timer", {}), b.level > 0 ? i.css("left", -i.outerWidth()) : "horizontal" == f.mode && i.css("left", 0), d++;
                    var j = a(b.subMenuElement).closest("div.jqx-menu-popup").css({ width: parseInt(a(b.subMenuElement).outerWidth()) + parseInt(e[0]) + "px", height: parseInt(a(b.subMenuElement).outerHeight()) + parseInt(e[1]) + "px" }),
                        k = c.closest("div.jqx-menu-popup");
                    if (k.length > 0) {
                        var l = i.css("margin-left"),
                            m = i.css("margin-right"),
                            n = i.css("padding-left"),
                            o = i.css("padding-right");
                        j.appendTo(k), i.css("margin-left", l), i.css("margin-right", m), i.css("padding-left", n), i.css("padding-right", o)
                    } else {
                        var l = i.css("margin-left"),
                            m = i.css("margin-right"),
                            n = i.css("padding-left"),
                            o = i.css("padding-right");
                        j.appendTo(a(document.body)), i.css("margin-left", l), i.css("margin-right", m), i.css("padding-left", n), i.css("padding-right", o)
                    }
                    f.clickToOpen ? (f.removeHandler(c, "mousedown"), f.addHandler(c, "mousedown", function(a) { clearTimeout(i.data("timer").hide), null != i && i.stop(), 0 != b.level || b.isOpen || (a.data = f, f._closeAll(a)), b.isOpen ? f._closeItem(f, b, !0) : f._openItem(f, b) })) : ((g || h) && (f.removeHandler(c, a.jqx.mobile.getTouchEventName("touchstart")), f.addHandler(c, a.jqx.mobile.getTouchEventName("touchstart"), function(a) { return clearTimeout(i.data("timer").hide), null != i && i.stop(), 0 != b.level || b.isOpen || "popup" == f.mode || (a.data = f, f._closeAll(a)), b.isOpen ? f._closeItem(f, b, !0) : f._openItem(f, b), !1 })), h || (f.addHandler(c, "mouseenter", function() { if ((f.autoOpen || b.level > 0 && !f.autoOpen) && clearTimeout(i.data("timer").hide), b.parentId && 0 != b.parentId && f.menuElements[b.parentId]) { if (!f.menuElements[b.parentId].isOpen) return } return (f.autoOpen || b.level > 0 && !f.autoOpen) && f._openItem(f, b), !1 }), f.addHandler(c, "mousedown", function() { f.autoOpen || 0 != b.level || (clearTimeout(i.data("timer").hide), null != i && i.stop(), b.isOpen ? f._closeItem(f, b, !0) : f._openItem(f, b)) }), f.addHandler(c, "mouseleave", function(c) {
                        if (f.autoCloseOnMouseLeave) {
                            clearTimeout(i.data("timer").hide);
                            var d = a(b.subMenuElement),
                                e = { left: parseInt(c.pageX), top: parseInt(c.pageY) },
                                g = { left: parseInt(d.coord().left), top: parseInt(d.coord().top), width: parseInt(d.outerWidth()), height: parseInt(d.outerHeight()) },
                                h = !0;
                            g.left - 5 <= e.left && e.left <= g.left + g.width + 5 && g.top <= e.top && e.top <= g.top + g.height && (h = !1), h && f._closeItem(f, b, !0)
                        }
                    }), f.removeHandler(j, "mouseenter"), f.addHandler(j, "mouseenter", function() { clearTimeout(i.data("timer").hide) }), f.removeHandler(j, "mouseleave"), f.addHandler(j, "mouseleave", function(a) { f.autoCloseOnMouseLeave && (clearTimeout(i.data("timer").hide), clearTimeout(i.data("timer").show), null != i && i.stop(), f._closeItem(f, b, !0)) })))
                }
            }), "simple" == this.mode && this._renderSimpleMode(), this._autoSizeHorizontalMenuItems(), this._raiseEvent("3", this)
        },
        _renderSimpleMode: function() { this.host.show() },
        createID: function() { var a = Math.random() + ""; for (a = a.replace(".", ""), a = "99" + a, a /= 1; this.items[a];) a = Math.random() + "", a = a.replace(".", ""), a /= 1; return "menuItem" + a },
        _createMenu: function(b, c) {
            if (null != b) {
                void 0 == c && (c = !0), null == c && (c = !0);
                a(b).addClass("jqx-menu-ul");
                var d = a(b).find("li"),
                    e = 0;
                this.itemMapping = new Array;
                for (var f = 0; f < d.length; f++) {
                    var g = d[f],
                        h = a(g);
                    if (-1 != g.className.indexOf("jqx-menu") || 0 != this.autoGenerate) {
                        var i = g.id;
                        i || (i = this.createID()), c && (g.id = i, this.items[e] = new a.jqx._jqxMenu.jqxMenuItem, this.menuElements[i] = this.items[e]), e += 1;
                        var j = 0,
                            k = this;
                        h.children().each(function() { return c || (this.className = "", k.autoGenerate && (a(k.items[e - 1].subMenuElement)[0].className = "", k.minimized || a(k.items[e - 1].subMenuElement).addClass(k.toThemeProperty("jqx-widget-content")), a(k.items[e - 1].subMenuElement).addClass(k.toThemeProperty("jqx-menu-dropdown")), a(k.items[e - 1].subMenuElement).addClass(k.toThemeProperty("jqx-popup")))), -1 != this.className.indexOf("jqx-menu-dropdown") ? (c && (k.items[e - 1].subMenuElement = this), !1) : !k.autoGenerate || "ul" != this.tagName && "UL" != this.tagName ? void 0 : (c && (k.items[e - 1].subMenuElement = this), this.className = "", k.minimized || a(this).addClass(k.toThemeProperty("jqx-widget-content")), a(this).addClass(k.toThemeProperty("jqx-menu-dropdown")), a(this).addClass(k.toThemeProperty("jqx-popup")), a(this).attr("role", "menu"), k.rtl ? a(this).addClass(k.toThemeProperty("jqx-rc-l")) : a(this).addClass(k.toThemeProperty("jqx-rc-r")), a(this).addClass(k.toThemeProperty("jqx-rc-b")), !1) });
                        h.parents().each(function() { return -1 != this.className.indexOf("jqx-menu-item") ? (j = this.id, !1) : !k.autoGenerate || "li" != this.tagName && "LI" != this.tagName ? void 0 : (j = this.id, !1) });
                        var l = !1,
                            m = g.getAttribute("type"),
                            n = g.getAttribute("ignoretheme") || g.getAttribute("data-ignoretheme");
                        if (n ? "true" != n && 1 != n || (n = !0) : n = !1, m) { if ("separator" == m) var l = !0 } else m = g.type;
                        l || (m = j ? "sub" : "top");
                        var o = this.items[e - 1];
                        if (c) {
                            o.id = i, o.parentId = j, o.type = m, o.separator = l, o.element = d[f];
                            var p = h.children("a");
                            o.disabled = "true" == g.getAttribute("item-disabled"), o.level = h.parents("li").length, o.anchor = p.length > 0 ? p : null, o.anchor && a(o.anchor).attr("tabindex", -1)
                        }
                        o.ignoretheme = n;
                        var q = this.menuElements[j];
                        null != q && (q.ignoretheme && (o.ignoretheme = q.ignoretheme, n = q.ignoretheme), o.parentItem = q, o.parentElement = q.element), this.autoGenerate && ("separator" == m ? (h.removeClass(), h.addClass(this.toThemeProperty("jqx-menu-item-separator")), h.attr("role", "separator")) : n || (h[0].className.indexOf("jqx-grid-menu-item-touch") >= 0 ? h[0].className = this.toThemeProperty("jqx-grid-menu-item-touch") : h[0].className = "", this.rtl && h.addClass(this.toThemeProperty("jqx-rtl")), o.level > 0 && !k.minimized ? (h.addClass(this.toThemeProperty("jqx-item")), h.addClass(this.toThemeProperty("jqx-menu-item"))) : (h.addClass(this.toThemeProperty("jqx-item")), h.addClass(this.toThemeProperty("jqx-menu-item-top"))))), o.disabled && (h.addClass(k.toThemeProperty("jqx-menu-item-disabled")), h.addClass(k.toThemeProperty("jqx-fill-state-disabled"))), this.itemMapping[f] = { element: d[f], item: o }, this.itemMapping["id" + d[f].id] = this.itemMapping[f], c && !n && (o.hasItems = h.find("li").length > 0, o.hasItems && o.element && (a.jqx.aria(a(o.element), "aria-haspopup", !0), o.subMenuElement.id || (o.subMenuElement.id = a.jqx.utilities.createId()), a.jqx.aria(a(o.element), "aria-owns", o.subMenuElement.id)))
                    }
                }
                for (var r = 0; r < d.length; r++) {
                    var s = d[r];
                    if (this.itemMapping["id" + s.id]) {
                        var o = this.itemMapping["id" + s.id].item;
                        if (!o) continue;
                        o.prevItem = null, o.nextItem = null, r > 0 && this.itemMapping["id" + d[r - 1].id] && (o.prevItem = this.itemMapping["id" + d[r - 1].id].item), r < d.length - 1 && this.itemMapping["id" + d[r + 1].id] && (o.nextItem = this.itemMapping["id" + d[r + 1].id].item)
                    }
                }
            }
        },
        destroy: function() {
            var b = this;
            a.jqx.utilities.resize(b.host, null, !0);
            var c = b.host.closest("div.jqx-menu-wrapper");
            b.removeHandler(c, "keydown"), c.remove(), b.removeHandler(a("#menuWrapper" + b.element.id), "keydown"), a("#menuWrapper" + b.element.id).remove(), b.removeHandler(b.host, "keydown"), b.removeHandler(b.host, "focus"), b.removeHandler(b.host, "blur"), b.removeHandler(a(document), "mousedown.menu" + b.element.id, b._closeAfterClick), b.removeHandler(a(document), "mouseup.menu" + b.element.id, b._closeAfterClick), b.removeHandler(a(document), "contextmenu." + b.element.id), b.removeHandler(b.host, "contextmenu." + b.element.id), a.data(document.body, "jqxMenuOldHost" + b.element.id, null), b.isTouchDevice() && b.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchstart") + ".menu" + b.element.id, b._closeAfterClick, this), a(window).off && a(window).off("resize.menu" + b.element.id), a.each(b.items, function() {
                var c = this,
                    d = a(c.element);
                b.removeHandler(d, "click"), b.removeHandler(d, "selectstart"), b.removeHandler(d, "mouseenter"), b.removeHandler(d, "mouseleave"), b.removeHandler(d, "mousedown"), b.removeHandler(d, "mouseleave"), a(c.subMenuElement).closest("div.jqx-menu-popup").remove(), delete this.subMenuElement, delete this.element
            }), a.data(document.body, "menuel", null), delete b.menuElements, b.items = new Array, delete b.items;
            var d = a.data(b.element, "jqxMenu");
            d && delete d.instance, b.host.removeClass(), b.host.remove(), delete b.host, delete b.element
        },
        _raiseEvent: function(b, c) {
            void 0 == c && (c = { owner: null });
            var d = this.events[b];
            args = c, args.owner = this;
            var e = new a.Event(d);
            return "2" == b && (args = c.item, args.owner = this, args.clickType = c.type, a.extend(e, c.event), e.type = "itemclick"), e.owner = this, e.args = args, this.host.trigger(e)
        },
        propertiesChangedHandler: function(b, c, d) {
            if (d.width && d.height && 2 == Object.keys(d).length && (b._setSize(), "popup" === b.mode)) {
                this.host.closest("div.jqx-menu-wrapper")[c](d);
                var e = this.host[0].id;
                a("#" + e)[c](d)
            }
        },
        propertyChangedHandler: function(b, c, d, e) {
            if (void 0 != this.isInitialized && 0 != this.isInitialized && !(b.batchUpdate && b.batchUpdate.width && b.batchUpdate.height && 2 == Object.keys(b.batchUpdate).length) && ("disabled" == c && (b.disabled ? (b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled")), b.host.addClass(b.toThemeProperty("jqx-menu-disabled"))) : (b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled")), b.host.removeClass(b.toThemeProperty("jqx-menu-disabled")))), e != d))
                if ("touchMode" == c && (this._isTouchDevice = null, b._render(e, d)), "width" !== c && "height" !== c) {
                    if ("source" == c && null != b.source) {
                        var f = b.loadItems(b.source);
                        b.element.innerHTML = f;
                        var g = b.host.find("ul:first");
                        g.length > 0 && (b.refresh(), b._createMenu(g[0]), b._render())
                    }
                    "autoCloseOnClick" == c ? 0 == e ? b.removeHandler(a(document), "mousedown.menu" + this.element.id, b._closeAll) : b.addHandler(a(document), "mousedown.menu" + this.element.id, b, b._closeAll) : "mode" == c || "width" == c || "height" == c || "showTopLevelArrows" == c ? (b.refresh(), "mode" == c ? b._render(e, d) : b._applyOrientation()) : "theme" == c && a.jqx.utilities.setTheme(d, e, b.host)
                } else if (b._setSize(), "popup" === b.mode) {
                var h = this.host.closest("div.jqx-menu-wrapper");
                h[c](e);
                var i = this.host[0].id;
                a("#" + i)[c](e)
            }
        }
    })
}(jqxBaseFramework),
function(a) { a.jqx._jqxMenu.jqxMenuItem = function(a, b, c) { return { id: a, parentId: b, parentItem: null, anchor: null, type: c, disabled: !1, level: 0, isOpen: !1, hasItems: !1, element: null, subMenuElement: null, arrow: null, openHorizontalDirection: "right", openVerticalDirection: "down", closeOnClick: !0 } } }(jqxBaseFramework);