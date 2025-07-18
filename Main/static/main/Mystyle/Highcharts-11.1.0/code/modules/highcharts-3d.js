/*
 Highcharts JS v11.1.0 (2023-06-05)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
'use strict'; (function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (D) { a(D); a.Highcharts = D; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function D(a, A, w, I) { a.hasOwnProperty(A) || (a[A] = I.apply(null, w), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: A, module: a[A] } }))) } a = a ? a._modules :
        {}; D(a, "Core/Math3D.js", [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, A) {
            function w(a, h, g, c) {
                var n = h.options.chart.options3d; const k = C(c, g ? h.inverted : !1), t = { x: h.plotWidth / 2, y: h.plotHeight / 2, z: n.depth / 2, vd: C(n.depth, 1) * C(n.viewDistance, 0) }, v = h.scale3d || 1; c = J * n.beta * (k ? -1 : 1); n = J * n.alpha * (k ? -1 : 1); var G = Math.cos(n), l = Math.cos(-c), m = Math.sin(n), y = Math.sin(-c); g || (t.x += h.plotLeft, t.y += h.plotTop); return a.map(function (c) {
                    var g = (k ? c.y : c.x) - t.x; var a = (k ? c.x : c.y) - t.y; c = (c.z || 0) - t.z; g = {
                        x: l * g - y * c,
                        y: -m * y * g + G * a - l * m * c, z: G * y * g + m * a + G * l * c
                    }; a = q(g, t, t.vd); a.x = a.x * v + t.x; a.y = a.y * v + t.y; a.z = g.z * v + t.z; return { x: k ? a.y : a.x, y: k ? a.x : a.y, z: a.z }
                })
            } function q(a, h, g) { h = 0 < g && g < Number.POSITIVE_INFINITY ? g / (a.z + h.z + g) : 1; return { x: a.x * h, y: a.y * h } } function k(a) { let h = 0, g, c; for (g = 0; g < a.length; g++)c = (g + 1) % a.length, h += a[g].x * a[c].y - a[c].x * a[g].y; return h / 2 } const { deg2rad: J } = a, { pick: C } = A; return {
                perspective: w, perspective3D: q, pointCameraDistance: function (a, h) {
                    var g = h.options.chart.options3d, c = h.plotWidth / 2; h = h.plotHeight / 2;
                    g = C(g.depth, 1) * C(g.viewDistance, 0) + g.depth; return Math.sqrt(Math.pow(c - C(a.plotX, a.x), 2) + Math.pow(h - C(a.plotY, a.y), 2) + Math.pow(g - C(a.plotZ, a.z), 2))
                }, shapeArea: k, shapeArea3D: function (a, h, g) { return k(w(a, h, g)) }
            }
        }); D(a, "Core/Renderer/SVG/SVGElement3D.js", [a["Core/Color/Color.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, A, w) {
            const { parse: q } = a, { defined: k, merge: J, objectEach: C, pick: L } = w, h = {
                base: {
                    initArgs: function (a) {
                        const c = this, g = c.renderer, h = g[c.pathType + "Path"](a), k = h.zIndexes;
                        c.parts.forEach(function (a) { const n = { "class": "highcharts-3d-" + a, zIndex: k[a] || 0 }; g.styledMode && ("top" === a ? n.filter = "url(#highcharts-brighter)" : "side" === a && (n.filter = "url(#highcharts-darker)")); c[a] = g.path(h[a]).attr(n).add(c) }); c.attr({ "stroke-linejoin": "round", zIndex: k.group }); c.originalDestroy = c.destroy; c.destroy = c.destroyParts; c.forcedSides = h.forcedSides
                    }, singleSetterForParts: function (a, c, h, k, t, v) {
                        const g = {}; k = [null, null, k || "attr", t, v]; const n = h && h.zIndexes; h ? (n && n.group && this.attr({ zIndex: n.group }),
                            C(h, function (c, k) { g[k] = {}; g[k][a] = c; n && (g[k].zIndex = h.zIndexes[k] || 0) }), k[1] = g) : (g[a] = c, k[0] = g); return this.processParts.apply(this, k)
                    }, processParts: function (a, c, h, k, t) { const g = this; g.parts.forEach(function (n) { c && (a = L(c[n], !1)); if (!1 !== a) g[n][h](a, k, t) }); return g }, destroyParts: function () { this.processParts(null, null, "destroy"); return this.originalDestroy() }
                }
            }; h.cuboid = J(h.base, {
                parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, c, h, q) {
                    if ("string" === typeof a && "undefined" !== typeof c) {
                        const g =
                            a; a = {}; a[g] = c
                    } return a.shapeArgs || k(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : A.prototype.attr.call(this, a, void 0, h, q)
                }, animate: function (a, c, n) {
                    if (k(a.x) && k(a.y)) { a = this.renderer[this.pathType + "Path"](a); const g = a.forcedSides; this.singleSetterForParts("d", null, a, "animate", c, n); this.attr({ zIndex: a.zIndexes.group }); g !== this.forcedSides && (this.forcedSides = g, this.renderer.styledMode || h.cuboid.fillSetter.call(this, this.fill)) } else A.prototype.animate.call(this,
                        a, c, n); return this
                }, fillSetter: function (a) { this.forcedSides = this.forcedSides || []; this.singleSetterForParts("fill", null, { front: a, top: q(a).brighten(0 <= this.forcedSides.indexOf("top") ? 0 : .1).get(), side: q(a).brighten(0 <= this.forcedSides.indexOf("side") ? 0 : -.1).get() }); this.color = this.fill = a; return this }
            }); return h
        }); D(a, "Core/Renderer/SVG/SVGRenderer3D.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGElement3D.js"],
        a["Core/Renderer/SVG/SVGRenderer.js"], a["Core/Utilities.js"]], function (a, A, w, I, k, J, C, L) {
            const { animObject: h } = a, { parse: g } = A, { charts: c, deg2rad: n } = w, { perspective: q, shapeArea: t } = I, { defined: v, extend: G, merge: l, pick: m } = L, y = Math.cos, K = Math.sin, H = Math.PI, N = 4 * (Math.sqrt(2) - 1) / 3 / (H / 2); class E extends C {
                static compose(f) {
                    f = f.prototype; const a = E.prototype; f.elements3d = J; f.arc3d = a.arc3d; f.arc3dPath = a.arc3dPath; f.cuboid = a.cuboid; f.cuboidPath = a.cuboidPath; f.element3d = a.element3d; f.face3d = a.face3d; f.polyhedron = a.polyhedron;
                    f.toLinePath = a.toLinePath; f.toLineSegments = a.toLineSegments
                } static curveTo(a, c, b, p, e, u, d, x) {
                    let f = [], z = u - e; return u > e && u - e > Math.PI / 2 + .0001 ? (f = f.concat(this.curveTo(a, c, b, p, e, e + Math.PI / 2, d, x)), f = f.concat(this.curveTo(a, c, b, p, e + Math.PI / 2, u, d, x))) : u < e && e - u > Math.PI / 2 + .0001 ? (f = f.concat(this.curveTo(a, c, b, p, e, e - Math.PI / 2, d, x)), f = f.concat(this.curveTo(a, c, b, p, e - Math.PI / 2, u, d, x))) : [["C", a + b * Math.cos(e) - b * N * z * Math.sin(e) + d, c + p * Math.sin(e) + p * N * z * Math.cos(e) + x, a + b * Math.cos(u) + b * N * z * Math.sin(u) + d, c + p * Math.sin(u) -
                        p * N * z * Math.cos(u) + x, a + b * Math.cos(u) + d, c + p * Math.sin(u) + x]]
                } toLinePath(a, c) { const b = []; a.forEach(function (a) { b.push(["L", a.x, a.y]) }); a.length && (b[0][0] = "M", c && b.push(["Z"])); return b } toLineSegments(a) { let f = [], b = !0; a.forEach(function (a) { f.push(b ? ["M", a.x, a.y] : ["L", a.x, a.y]); b = !b }); return f } face3d(a) {
                    const f = this, b = this.createElement("path"); b.vertexes = []; b.insidePlotArea = !1; b.enabled = !0; b.attr = function (b) {
                        if ("object" === typeof b && (v(b.enabled) || v(b.vertexes) || v(b.insidePlotArea))) {
                            this.enabled = m(b.enabled,
                                this.enabled); this.vertexes = m(b.vertexes, this.vertexes); this.insidePlotArea = m(b.insidePlotArea, this.insidePlotArea); delete b.enabled; delete b.vertexes; delete b.insidePlotArea; var e = q(this.vertexes, c[f.chartIndex], this.insidePlotArea); const a = f.toLinePath(e, !0); e = t(e); b.d = a; b.visibility = this.enabled && 0 < e ? "inherit" : "hidden"
                        } return k.prototype.attr.apply(this, arguments)
                    }; b.animate = function (b) {
                        if ("object" === typeof b && (v(b.enabled) || v(b.vertexes) || v(b.insidePlotArea))) {
                            this.enabled = m(b.enabled, this.enabled);
                            this.vertexes = m(b.vertexes, this.vertexes); this.insidePlotArea = m(b.insidePlotArea, this.insidePlotArea); delete b.enabled; delete b.vertexes; delete b.insidePlotArea; var e = q(this.vertexes, c[f.chartIndex], this.insidePlotArea); const a = f.toLinePath(e, !0); e = t(e); e = this.enabled && 0 < e ? "visible" : "hidden"; b.d = a; this.attr("visibility", e)
                        } return k.prototype.animate.apply(this, arguments)
                    }; return b.attr(a)
                } polyhedron(a) {
                    const f = this, b = this.g(), c = b.destroy; this.styledMode || b.attr({ "stroke-linejoin": "round" }); b.faces =
                        []; b.destroy = function () { for (let e = 0; e < b.faces.length; e++)b.faces[e].destroy(); return c.call(this) }; b.attr = function (e, a, d, x) { if ("object" === typeof e && v(e.faces)) { for (; b.faces.length > e.faces.length;)b.faces.pop().destroy(); for (; b.faces.length < e.faces.length;)b.faces.push(f.face3d().add(b)); for (let a = 0; a < e.faces.length; a++)f.styledMode && delete e.faces[a].fill, b.faces[a].attr(e.faces[a], null, d, x); delete e.faces } return k.prototype.attr.apply(this, arguments) }; b.animate = function (e, a, d) {
                            if (e && e.faces) {
                                for (; b.faces.length >
                                    e.faces.length;)b.faces.pop().destroy(); for (; b.faces.length < e.faces.length;)b.faces.push(f.face3d().add(b)); for (let x = 0; x < e.faces.length; x++)b.faces[x].animate(e.faces[x], a, d); delete e.faces
                            } return k.prototype.animate.apply(this, arguments)
                        }; return b.attr(a)
                } element3d(a, c) { const b = this.g(); G(b, this.elements3d[a]); b.initArgs(c); return b } cuboid(a) { return this.element3d("cuboid", a) } cuboidPath(a) {
                    function f(e) {
                        return 0 === d && 1 < e && 6 > e ? { x: B[e].x, y: B[e].y + 10, z: B[e].z } : B[0].x === B[7].x && 4 <= e ? {
                            x: B[e].x + 10, y: B[e].y,
                            z: B[e].z
                        } : 0 === M && 2 > e || 5 < e ? { x: B[e].x, y: B[e].y, z: B[e].z + 10 } : B[e]
                    } function b(d) { return B[d] } let p = a.x || 0, e = a.y || 0, u = a.z || 0, d = a.height || 0; var x = a.width || 0; let M = a.depth || 0, z = c[this.chartIndex]; let P, g, h = z.options.chart.options3d.alpha, k = 0, B = [{ x: p, y: e, z: u }, { x: p + x, y: e, z: u }, { x: p + x, y: e + d, z: u }, { x: p, y: e + d, z: u }, { x: p, y: e + d, z: u + M }, { x: p + x, y: e + d, z: u + M }, { x: p + x, y: e, z: u + M }, { x: p, y: e, z: u + M }], n = []; B = q(B, z, a.insidePlotArea); var r = function (d, e, a) {
                        let x = [[], -1], u = d.map(b), c = e.map(b); d = d.map(f); e = e.map(f); 0 > t(u) ? x = [u, 0] :
                            0 > t(c) ? x = [c, 1] : a && (n.push(a), x = 0 > t(d) ? [u, 0] : 0 > t(e) ? [c, 1] : [u, 0]); return x
                    }; var l = r([3, 2, 1, 0], [7, 6, 5, 4], "front"); a = l[0]; P = l[1]; l = r([1, 6, 7, 0], [4, 5, 2, 3], "top"); x = l[0]; g = l[1]; l = r([1, 2, 5, 6], [0, 7, 4, 3], "side"); r = l[0]; l = l[1]; 1 === l ? k += 1E6 * (z.plotWidth - p) : l || (k += 1E6 * p); k += 10 * (!g || 0 <= h && 180 >= h || 360 > h && 357.5 < h ? z.plotHeight - e : 10 + e); 1 === P ? k += 100 * u : P || (k += 100 * (1E3 - u)); return { front: this.toLinePath(a, !0), top: this.toLinePath(x, !0), side: this.toLinePath(r, !0), zIndexes: { group: Math.round(k) }, forcedSides: n, isFront: P, isTop: g }
                } arc3d(a) {
                    function c(a) {
                        let d =
                            !1, b = {}, c; a = l(a); for (c in a) -1 !== e.indexOf(c) && (b[c] = a[c], delete a[c], d = !0); return d ? [b, a] : !1
                    } const b = this.g(), f = b.renderer, e = "x y r innerR start end depth".split(" "); a = l(a); a.alpha = (a.alpha || 0) * n; a.beta = (a.beta || 0) * n; b.top = f.path(); b.side1 = f.path(); b.side2 = f.path(); b.inn = f.path(); b.out = f.path(); b.onAdd = function () { const e = b.parentGroup, d = b.attr("class"); b.top.add(b);["out", "inn", "side1", "side2"].forEach(function (a) { b[a].attr({ "class": d + " highcharts-3d-side" }).add(e) }) };["addClass", "removeClass"].forEach(function (e) {
                        b[e] =
                        function () { const d = arguments;["top", "out", "inn", "side1", "side2"].forEach(function (a) { b[a][e].apply(b[a], d) }) }
                    }); b.setPaths = function (e) { const d = b.renderer.arc3dPath(e), a = 100 * d.zTop; b.attribs = e; b.top.attr({ d: d.top, zIndex: d.zTop }); b.inn.attr({ d: d.inn, zIndex: d.zInn }); b.out.attr({ d: d.out, zIndex: d.zOut }); b.side1.attr({ d: d.side1, zIndex: d.zSide1 }); b.side2.attr({ d: d.side2, zIndex: d.zSide2 }); b.zIndex = a; b.attr({ zIndex: a }); e.center && (b.top.setRadialReference(e.center), delete e.center) }; b.setPaths(a); b.fillSetter =
                        function (e) { const d = g(e).brighten(-.1).get(); this.fill = e; this.side1.attr({ fill: d }); this.side2.attr({ fill: d }); this.inn.attr({ fill: d }); this.out.attr({ fill: d }); this.top.attr({ fill: e }); return this };["opacity", "translateX", "translateY", "visibility"].forEach(function (e) { b[e + "Setter"] = function (d, e) { b[e] = d;["out", "inn", "side1", "side2", "top"].forEach(function (a) { b[a].attr(e, d) }) } }); b.attr = function (e) {
                            let d, a; "object" === typeof e && (a = c(e)) && (d = a[0], arguments[0] = a[1], G(b.attribs, d), b.setPaths(b.attribs)); return k.prototype.attr.apply(b,
                                arguments)
                        }; b.animate = function (e, d, a) {
                            let x = this.attribs, f, u, p = "data-" + Math.random().toString(26).substring(2, 9); delete e.center; delete e.z; delete e.alpha; delete e.beta; u = h(m(d, this.renderer.globalAnimation)); u.duration && (d = c(e), b[p] = 0, e[p] = 1, b[p + "Setter"] = w.noop, d && (f = d[0], u.step = function (e, d) { function a(e) { return x[e] + (m(f[e], x[e]) - x[e]) * d.pos } d.prop === p && d.elem.setPaths(l(x, { x: a("x"), y: a("y"), r: a("r"), innerR: a("innerR"), start: a("start"), end: a("end"), depth: a("depth") })) }), d = u); return k.prototype.animate.call(this,
                                e, d, a)
                        }; b.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); return k.prototype.destroy.call(this) }; b.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; b.show = function (e) { this.top.show(e); this.out.show(e); this.inn.show(e); this.side1.show(e); this.side2.show(e) }; return b
                } arc3dPath(a) {
                    function c(e) { e %= 2 * Math.PI; e > Math.PI && (e = 2 * Math.PI - e); return e } var b = a.x || 0, f = a.y || 0, e = a.start || 0, u =
                        (a.end || 0) - .00001, d = a.r || 0, x = a.innerR || 0, M = a.depth || 0, z = a.alpha || 0, g = a.beta || 0, h = Math.cos(e); const k = Math.sin(e); a = Math.cos(u); var n = Math.sin(u); const B = d * Math.cos(g); d *= Math.cos(z); const l = x * Math.cos(g), r = x * Math.cos(z); x = M * Math.sin(g); const m = M * Math.sin(z); M = [["M", b + B * h, f + d * k]]; M = M.concat(E.curveTo(b, f, B, d, e, u, 0, 0)); M.push(["L", b + l * a, f + r * n]); M = M.concat(E.curveTo(b, f, l, r, u, e, 0, 0)); M.push(["Z"]); var q = 0 < g ? Math.PI / 2 : 0; g = 0 < z ? 0 : Math.PI / 2; q = e > -q ? e : u > -q ? -q : e; const v = u < H - g ? u : e < H - g ? H - g : u, t = 2 * H - g; z = [["M",
                            b + B * y(q), f + d * K(q)]]; z = z.concat(E.curveTo(b, f, B, d, q, v, 0, 0)); u > t && e < t ? (z.push(["L", b + B * y(v) + x, f + d * K(v) + m]), z = z.concat(E.curveTo(b, f, B, d, v, t, x, m)), z.push(["L", b + B * y(t), f + d * K(t)]), z = z.concat(E.curveTo(b, f, B, d, t, u, 0, 0)), z.push(["L", b + B * y(u) + x, f + d * K(u) + m]), z = z.concat(E.curveTo(b, f, B, d, u, t, x, m)), z.push(["L", b + B * y(t), f + d * K(t)]), z = z.concat(E.curveTo(b, f, B, d, t, v, 0, 0))) : u > H - g && e < H - g && (z.push(["L", b + B * Math.cos(v) + x, f + d * Math.sin(v) + m]), z = z.concat(E.curveTo(b, f, B, d, v, u, x, m)), z.push(["L", b + B * Math.cos(u), f + d * Math.sin(u)]),
                                z = z.concat(E.curveTo(b, f, B, d, u, v, 0, 0))); z.push(["L", b + B * Math.cos(v) + x, f + d * Math.sin(v) + m]); z = z.concat(E.curveTo(b, f, B, d, v, q, x, m)); z.push(["Z"]); g = [["M", b + l * h, f + r * k]]; g = g.concat(E.curveTo(b, f, l, r, e, u, 0, 0)); g.push(["L", b + l * Math.cos(u) + x, f + r * Math.sin(u) + m]); g = g.concat(E.curveTo(b, f, l, r, u, e, x, m)); g.push(["Z"]); h = [["M", b + B * h, f + d * k], ["L", b + B * h + x, f + d * k + m], ["L", b + l * h + x, f + r * k + m], ["L", b + l * h, f + r * k], ["Z"]]; b = [["M", b + B * a, f + d * n], ["L", b + B * a + x, f + d * n + m], ["L", b + l * a + x, f + r * n + m], ["L", b + l * a, f + r * n], ["Z"]]; n = Math.atan2(m,
                                    -x); f = Math.abs(u + n); a = Math.abs(e + n); e = Math.abs((e + u) / 2 + n); f = c(f); a = c(a); e = c(e); e *= 1E5; u = 1E5 * a; f *= 1E5; return { top: M, zTop: 1E5 * Math.PI + 1, out: z, zOut: Math.max(e, u, f), inn: g, zInn: Math.max(e, u, f), side1: h, zSide1: .99 * f, side2: b, zSide2: .99 * u }
                }
            } return E
        }); D(a, "Core/Chart/Chart3D.js", [a["Core/Color/Color.js"], a["Core/Defaults.js"], a["Core/Math3D.js"], a["Core/Utilities.js"]], function (a, A, w, I) {
            const { parse: k } = a, { defaultOptions: q } = A, { perspective: C, shapeArea3D: L } = w, { addEvent: h, isArray: g, merge: c, pick: n, wrap: O } = I; var t;
            (function (a) {
                function t(e) { this.is3d() && "scatter" === e.options.type && (e.options.type = "scatter3d") } function l() {
                    if (this.chart3d && this.is3d()) {
                        const a = this.renderer; var e = this.options.chart.options3d; const d = this.chart3d.get3dFrame(), b = this.plotLeft, f = this.plotLeft + this.plotWidth, c = this.plotTop, g = this.plotTop + this.plotHeight; e = e.depth; const h = b - (d.left.visible ? d.left.size : 0), p = f + (d.right.visible ? d.right.size : 0), n = c - (d.top.visible ? d.top.size : 0), l = g + (d.bottom.visible ? d.bottom.size : 0), m = 0 - (d.front.visible ?
                            d.front.size : 0), r = e + (d.back.visible ? d.back.size : 0), F = this.hasRendered ? "animate" : "attr"; this.chart3d.frame3d = d; this.frameShapes || (this.frameShapes = { bottom: a.polyhedron().add(), top: a.polyhedron().add(), left: a.polyhedron().add(), right: a.polyhedron().add(), back: a.polyhedron().add(), front: a.polyhedron().add() }); this.frameShapes.bottom[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: d.bottom.frontFacing ? -1E3 : 1E3, faces: [{
                                    fill: k(d.bottom.color).brighten(.1).get(), vertexes: [{ x: h, y: l, z: m },
                                    { x: p, y: l, z: m }, { x: p, y: l, z: r }, { x: h, y: l, z: r }], enabled: d.bottom.visible
                                }, { fill: k(d.bottom.color).brighten(.1).get(), vertexes: [{ x: b, y: g, z: e }, { x: f, y: g, z: e }, { x: f, y: g, z: 0 }, { x: b, y: g, z: 0 }], enabled: d.bottom.visible }, { fill: k(d.bottom.color).brighten(-.1).get(), vertexes: [{ x: h, y: l, z: m }, { x: h, y: l, z: r }, { x: b, y: g, z: e }, { x: b, y: g, z: 0 }], enabled: d.bottom.visible && !d.left.visible }, { fill: k(d.bottom.color).brighten(-.1).get(), vertexes: [{ x: p, y: l, z: r }, { x: p, y: l, z: m }, { x: f, y: g, z: 0 }, { x: f, y: g, z: e }], enabled: d.bottom.visible && !d.right.visible },
                                { fill: k(d.bottom.color).get(), vertexes: [{ x: p, y: l, z: m }, { x: h, y: l, z: m }, { x: b, y: g, z: 0 }, { x: f, y: g, z: 0 }], enabled: d.bottom.visible && !d.front.visible }, { fill: k(d.bottom.color).get(), vertexes: [{ x: h, y: l, z: r }, { x: p, y: l, z: r }, { x: f, y: g, z: e }, { x: b, y: g, z: e }], enabled: d.bottom.visible && !d.back.visible }]
                            }); this.frameShapes.top[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-top", zIndex: d.top.frontFacing ? -1E3 : 1E3, faces: [{
                                    fill: k(d.top.color).brighten(.1).get(), vertexes: [{ x: h, y: n, z: r }, { x: p, y: n, z: r }, { x: p, y: n, z: m }, {
                                        x: h,
                                        y: n, z: m
                                    }], enabled: d.top.visible
                                }, { fill: k(d.top.color).brighten(.1).get(), vertexes: [{ x: b, y: c, z: 0 }, { x: f, y: c, z: 0 }, { x: f, y: c, z: e }, { x: b, y: c, z: e }], enabled: d.top.visible }, { fill: k(d.top.color).brighten(-.1).get(), vertexes: [{ x: h, y: n, z: r }, { x: h, y: n, z: m }, { x: b, y: c, z: 0 }, { x: b, y: c, z: e }], enabled: d.top.visible && !d.left.visible }, { fill: k(d.top.color).brighten(-.1).get(), vertexes: [{ x: p, y: n, z: m }, { x: p, y: n, z: r }, { x: f, y: c, z: e }, { x: f, y: c, z: 0 }], enabled: d.top.visible && !d.right.visible }, {
                                    fill: k(d.top.color).get(), vertexes: [{
                                        x: h,
                                        y: n, z: m
                                    }, { x: p, y: n, z: m }, { x: f, y: c, z: 0 }, { x: b, y: c, z: 0 }], enabled: d.top.visible && !d.front.visible
                                }, { fill: k(d.top.color).get(), vertexes: [{ x: p, y: n, z: r }, { x: h, y: n, z: r }, { x: b, y: c, z: e }, { x: f, y: c, z: e }], enabled: d.top.visible && !d.back.visible }]
                            }); this.frameShapes.left[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-left", zIndex: d.left.frontFacing ? -1E3 : 1E3, faces: [{ fill: k(d.left.color).brighten(.1).get(), vertexes: [{ x: h, y: l, z: m }, { x: b, y: g, z: 0 }, { x: b, y: g, z: e }, { x: h, y: l, z: r }], enabled: d.left.visible && !d.bottom.visible },
                                { fill: k(d.left.color).brighten(.1).get(), vertexes: [{ x: h, y: n, z: r }, { x: b, y: c, z: e }, { x: b, y: c, z: 0 }, { x: h, y: n, z: m }], enabled: d.left.visible && !d.top.visible }, { fill: k(d.left.color).brighten(-.1).get(), vertexes: [{ x: h, y: l, z: r }, { x: h, y: n, z: r }, { x: h, y: n, z: m }, { x: h, y: l, z: m }], enabled: d.left.visible }, { fill: k(d.left.color).brighten(-.1).get(), vertexes: [{ x: b, y: c, z: e }, { x: b, y: g, z: e }, { x: b, y: g, z: 0 }, { x: b, y: c, z: 0 }], enabled: d.left.visible }, {
                                    fill: k(d.left.color).get(), vertexes: [{ x: h, y: l, z: m }, { x: h, y: n, z: m }, { x: b, y: c, z: 0 }, {
                                        x: b, y: g,
                                        z: 0
                                    }], enabled: d.left.visible && !d.front.visible
                                }, { fill: k(d.left.color).get(), vertexes: [{ x: h, y: n, z: r }, { x: h, y: l, z: r }, { x: b, y: g, z: e }, { x: b, y: c, z: e }], enabled: d.left.visible && !d.back.visible }]
                            }); this.frameShapes.right[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-right", zIndex: d.right.frontFacing ? -1E3 : 1E3, faces: [{ fill: k(d.right.color).brighten(.1).get(), vertexes: [{ x: p, y: l, z: r }, { x: f, y: g, z: e }, { x: f, y: g, z: 0 }, { x: p, y: l, z: m }], enabled: d.right.visible && !d.bottom.visible }, {
                                    fill: k(d.right.color).brighten(.1).get(),
                                    vertexes: [{ x: p, y: n, z: m }, { x: f, y: c, z: 0 }, { x: f, y: c, z: e }, { x: p, y: n, z: r }], enabled: d.right.visible && !d.top.visible
                                }, { fill: k(d.right.color).brighten(-.1).get(), vertexes: [{ x: f, y: c, z: 0 }, { x: f, y: g, z: 0 }, { x: f, y: g, z: e }, { x: f, y: c, z: e }], enabled: d.right.visible }, { fill: k(d.right.color).brighten(-.1).get(), vertexes: [{ x: p, y: l, z: m }, { x: p, y: n, z: m }, { x: p, y: n, z: r }, { x: p, y: l, z: r }], enabled: d.right.visible }, { fill: k(d.right.color).get(), vertexes: [{ x: p, y: n, z: m }, { x: p, y: l, z: m }, { x: f, y: g, z: 0 }, { x: f, y: c, z: 0 }], enabled: d.right.visible && !d.front.visible },
                                { fill: k(d.right.color).get(), vertexes: [{ x: p, y: l, z: r }, { x: p, y: n, z: r }, { x: f, y: c, z: e }, { x: f, y: g, z: e }], enabled: d.right.visible && !d.back.visible }]
                            }); this.frameShapes.back[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: d.back.frontFacing ? -1E3 : 1E3, faces: [{ fill: k(d.back.color).brighten(.1).get(), vertexes: [{ x: p, y: l, z: r }, { x: h, y: l, z: r }, { x: b, y: g, z: e }, { x: f, y: g, z: e }], enabled: d.back.visible && !d.bottom.visible }, {
                                    fill: k(d.back.color).brighten(.1).get(), vertexes: [{ x: h, y: n, z: r }, { x: p, y: n, z: r }, {
                                        x: f, y: c,
                                        z: e
                                    }, { x: b, y: c, z: e }], enabled: d.back.visible && !d.top.visible
                                }, { fill: k(d.back.color).brighten(-.1).get(), vertexes: [{ x: h, y: l, z: r }, { x: h, y: n, z: r }, { x: b, y: c, z: e }, { x: b, y: g, z: e }], enabled: d.back.visible && !d.left.visible }, { fill: k(d.back.color).brighten(-.1).get(), vertexes: [{ x: p, y: n, z: r }, { x: p, y: l, z: r }, { x: f, y: g, z: e }, { x: f, y: c, z: e }], enabled: d.back.visible && !d.right.visible }, { fill: k(d.back.color).get(), vertexes: [{ x: b, y: c, z: e }, { x: f, y: c, z: e }, { x: f, y: g, z: e }, { x: b, y: g, z: e }], enabled: d.back.visible }, {
                                    fill: k(d.back.color).get(),
                                    vertexes: [{ x: h, y: l, z: r }, { x: p, y: l, z: r }, { x: p, y: n, z: r }, { x: h, y: n, z: r }], enabled: d.back.visible
                                }]
                            }); this.frameShapes.front[F]({
                                "class": "highcharts-3d-frame highcharts-3d-frame-front", zIndex: d.front.frontFacing ? -1E3 : 1E3, faces: [{ fill: k(d.front.color).brighten(.1).get(), vertexes: [{ x: h, y: l, z: m }, { x: p, y: l, z: m }, { x: f, y: g, z: 0 }, { x: b, y: g, z: 0 }], enabled: d.front.visible && !d.bottom.visible }, {
                                    fill: k(d.front.color).brighten(.1).get(), vertexes: [{ x: p, y: n, z: m }, { x: h, y: n, z: m }, { x: b, y: c, z: 0 }, { x: f, y: c, z: 0 }], enabled: d.front.visible &&
                                        !d.top.visible
                                }, { fill: k(d.front.color).brighten(-.1).get(), vertexes: [{ x: h, y: n, z: m }, { x: h, y: l, z: m }, { x: b, y: g, z: 0 }, { x: b, y: c, z: 0 }], enabled: d.front.visible && !d.left.visible }, { fill: k(d.front.color).brighten(-.1).get(), vertexes: [{ x: p, y: l, z: m }, { x: p, y: n, z: m }, { x: f, y: c, z: 0 }, { x: f, y: g, z: 0 }], enabled: d.front.visible && !d.right.visible }, { fill: k(d.front.color).get(), vertexes: [{ x: f, y: c, z: 0 }, { x: b, y: c, z: 0 }, { x: b, y: g, z: 0 }, { x: f, y: g, z: 0 }], enabled: d.front.visible }, {
                                    fill: k(d.front.color).get(), vertexes: [{ x: p, y: l, z: m }, {
                                        x: h, y: l,
                                        z: m
                                    }, { x: h, y: n, z: m }, { x: p, y: n, z: m }], enabled: d.front.visible
                                }]
                            })
                    }
                } function m() { this.styledMode && [{ name: "darker", slope: .6 }, { name: "brighter", slope: 1.4 }].forEach(function (e) { this.renderer.definition({ tagName: "filter", attributes: { id: "highcharts-" + e.name }, children: [{ tagName: "feComponentTransfer", children: [{ tagName: "feFuncR", attributes: { type: "linear", slope: e.slope } }, { tagName: "feFuncG", attributes: { type: "linear", slope: e.slope } }, { tagName: "feFuncB", attributes: { type: "linear", slope: e.slope } }] }] }) }, this) } function v() {
                    const e =
                        this.options; this.is3d() && (e.series || []).forEach(function (a) { "scatter" === (a.type || e.chart.type || e.chart.defaultSeriesType) && (a.type = "scatter3d") })
                } function K() {
                    const a = this.options.chart.options3d; if (this.chart3d && this.is3d()) {
                        a && (a.alpha = a.alpha % 360 + (0 <= a.alpha ? 0 : 360), a.beta = a.beta % 360 + (0 <= a.beta ? 0 : 360)); const e = this.inverted, d = this.clipBox, b = this.margin, f = e ? "x" : "y", c = e ? "height" : "width", g = e ? "width" : "height"; d[e ? "y" : "x"] = -(b[3] || 0); d[f] = -(b[0] || 0); d[c] = this.chartWidth + (b[3] || 0) + (b[1] || 0); d[g] = this.chartHeight +
                            (b[0] || 0) + (b[2] || 0); this.scale3d = 1; !0 === a.fitToPlot && (this.scale3d = this.chart3d.getScale(a.depth)); this.chart3d.frame3d = this.chart3d.get3dFrame()
                    }
                } function H() { this.is3d() && (this.isDirtyBox = !0) } function w() { this.chart3d && this.is3d() && (this.chart3d.frame3d = this.chart3d.get3dFrame()) } function E() { this.chart3d || (this.chart3d = new p(this)) } function f(a) { return this.is3d() || a.apply(this, [].slice.call(arguments, 1)) } function F(a) {
                    let e = this.series.length; if (this.is3d()) for (; e--;)a = this.series[e], a.translate(),
                        a.render(); else a.call(this)
                } function b(a) { a.apply(this, [].slice.call(arguments, 1)); this.is3d() && (this.container.className += " highcharts-3d-chart") } class p {
                    constructor(a) { this.frame3d = void 0; this.chart = a } get3dFrame() {
                        const a = this.chart; var b = a.options.chart.options3d, d = b.frame, f = a.plotLeft; const c = a.plotLeft + a.plotWidth, g = a.plotTop; var h = a.plotTop + a.plotHeight; const p = b.depth; var l = function (b) { b = L(b, a); return .5 < b ? 1 : -.5 > b ? -1 : 0 }, m = l([{ x: f, y: h, z: p }, { x: c, y: h, z: p }, { x: c, y: h, z: 0 }, { x: f, y: h, z: 0 }]), k = l([{
                            x: f,
                            y: g, z: 0
                        }, { x: c, y: g, z: 0 }, { x: c, y: g, z: p }, { x: f, y: g, z: p }]), F = l([{ x: f, y: g, z: 0 }, { x: f, y: g, z: p }, { x: f, y: h, z: p }, { x: f, y: h, z: 0 }]), r = l([{ x: c, y: g, z: p }, { x: c, y: g, z: 0 }, { x: c, y: h, z: 0 }, { x: c, y: h, z: p }]); const H = l([{ x: f, y: h, z: 0 }, { x: c, y: h, z: 0 }, { x: c, y: g, z: 0 }, { x: f, y: g, z: 0 }]); l = l([{ x: f, y: g, z: p }, { x: c, y: g, z: p }, { x: c, y: h, z: p }, { x: f, y: h, z: p }]); let q = !1, t = !1, v = !1, K = !1;[].concat(a.xAxis, a.yAxis, a.zAxis).forEach(function (a) { a && (a.horiz ? a.opposite ? t = !0 : q = !0 : a.opposite ? K = !0 : v = !0) }); const y = function (a, b, d) {
                            const e = ["size", "color", "visible"],
                            f = {}; for (let b = 0; b < e.length; b++) { const d = e[b]; for (let b = 0; b < a.length; b++)if ("object" === typeof a[b]) { const e = a[b][d]; if ("undefined" !== typeof e && null !== e) { f[d] = e; break } } } a = d; !0 === f.visible || !1 === f.visible ? a = f.visible : "auto" === f.visible && (a = 0 < b); return { size: n(f.size, 1), color: n(f.color, "none"), frontFacing: 0 < b, visible: a }
                        }; d = {
                            axes: {}, bottom: y([d.bottom, d.top, d], m, q), top: y([d.top, d.bottom, d], k, t), left: y([d.left, d.right, d.side, d], F, v), right: y([d.right, d.left, d.side, d], r, K), back: y([d.back, d.front, d], l, !0),
                            front: y([d.front, d.back, d], H, !1)
                        }; "auto" === b.axisLabelPosition ? (r = function (a, b) { return a.visible !== b.visible || a.visible && b.visible && a.frontFacing !== b.frontFacing }, b = [], r(d.left, d.front) && b.push({ y: (g + h) / 2, x: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }), r(d.left, d.back) && b.push({ y: (g + h) / 2, x: f, z: p, xDir: { x: 0, y: 0, z: -1 } }), r(d.right, d.front) && b.push({ y: (g + h) / 2, x: c, z: 0, xDir: { x: 0, y: 0, z: 1 } }), r(d.right, d.back) && b.push({ y: (g + h) / 2, x: c, z: p, xDir: { x: -1, y: 0, z: 0 } }), m = [], r(d.bottom, d.front) && m.push({ x: (f + c) / 2, y: h, z: 0, xDir: { x: 1, y: 0, z: 0 } }),
                            r(d.bottom, d.back) && m.push({ x: (f + c) / 2, y: h, z: p, xDir: { x: -1, y: 0, z: 0 } }), k = [], r(d.top, d.front) && k.push({ x: (f + c) / 2, y: g, z: 0, xDir: { x: 1, y: 0, z: 0 } }), r(d.top, d.back) && k.push({ x: (f + c) / 2, y: g, z: p, xDir: { x: -1, y: 0, z: 0 } }), F = [], r(d.bottom, d.left) && F.push({ z: (0 + p) / 2, y: h, x: f, xDir: { x: 0, y: 0, z: -1 } }), r(d.bottom, d.right) && F.push({ z: (0 + p) / 2, y: h, x: c, xDir: { x: 0, y: 0, z: 1 } }), h = [], r(d.top, d.left) && h.push({ z: (0 + p) / 2, y: g, x: f, xDir: { x: 0, y: 0, z: -1 } }), r(d.top, d.right) && h.push({ z: (0 + p) / 2, y: g, x: c, xDir: { x: 0, y: 0, z: 1 } }), f = function (b, d, e) {
                                if (0 ===
                                    b.length) return null; if (1 === b.length) return b[0]; const f = C(b, a, !1); let c = 0; for (let a = 1; a < f.length; a++)e * f[a][d] > e * f[c][d] ? c = a : e * f[a][d] === e * f[c][d] && f[a].z < f[c].z && (c = a); return b[c]
                            }, d.axes = { y: { left: f(b, "x", -1), right: f(b, "x", 1) }, x: { top: f(k, "y", -1), bottom: f(m, "y", 1) }, z: { top: f(h, "y", -1), bottom: f(F, "y", 1) } }) : d.axes = {
                                y: { left: { x: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }, right: { x: c, z: 0, xDir: { x: 0, y: 0, z: 1 } } }, x: { top: { y: g, z: 0, xDir: { x: 1, y: 0, z: 0 } }, bottom: { y: h, z: 0, xDir: { x: 1, y: 0, z: 0 } } }, z: {
                                    top: {
                                        x: v ? c : f, y: g, xDir: v ? { x: 0, y: 0, z: 1 } :
                                            { x: 0, y: 0, z: -1 }
                                    }, bottom: { x: v ? c : f, y: h, xDir: v ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } }
                                }
                            }; return d
                    } getScale(a) {
                        const b = this.chart, d = b.plotLeft, e = b.plotWidth + d, f = b.plotTop, c = b.plotHeight + f, g = d + b.plotWidth / 2, h = f + b.plotHeight / 2; var p = Number.MAX_VALUE, l = -Number.MAX_VALUE, n = Number.MAX_VALUE, m = -Number.MAX_VALUE; let k, F = 1; k = [{ x: d, y: f, z: 0 }, { x: d, y: f, z: a }];[0, 1].forEach(function (a) { k.push({ x: e, y: k[a].y, z: k[a].z }) });[0, 1, 2, 3].forEach(function (a) { k.push({ x: k[a].x, y: c, z: k[a].z }) }); k = C(k, b, !1); k.forEach(function (a) {
                            p = Math.min(p,
                                a.x); l = Math.max(l, a.x); n = Math.min(n, a.y); m = Math.max(m, a.y)
                        }); d > p && (F = Math.min(F, 1 - Math.abs((d + g) / (p + g)) % 1)); e < l && (F = Math.min(F, (e - g) / (l - g))); f > n && (F = 0 > n ? Math.min(F, (f + h) / (-n + f + h)) : Math.min(F, 1 - (f + h) / (n + h) % 1)); c < m && (F = Math.min(F, Math.abs((c - h) / (m - h)))); return F
                    }
                } a.Composition = p; a.defaultOptions = { chart: { options3d: { enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, axisLabelPosition: null, frame: { visible: "default", size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {} } } } }; a.compose = function (e,
                    p) {
                        const d = e.prototype; p = p.prototype; d.is3d = function () { return !(!this.options.chart.options3d || !this.options.chart.options3d.enabled) }; d.propsRequireDirtyBox.push("chart.options3d"); d.propsRequireUpdateSeries.push("chart.options3d"); p.matrixSetter = function () { let a; if (1 > this.pos && (g(this.start) || g(this.end))) { const b = this.start || [1, 0, 0, 1, 0, 0], d = this.end || [1, 0, 0, 1, 0, 0]; a = []; for (let e = 0; 6 > e; e++)a.push(this.pos * d[e] + (1 - this.pos) * b[e]) } else a = this.end; this.elem.attr(this.prop, a, null, !0) }; c(!0, q, a.defaultOptions);
                    h(e, "init", E); h(e, "addSeries", t); h(e, "afterDrawChartBox", l); h(e, "afterGetContainer", m); h(e, "afterInit", v); h(e, "afterSetChartSize", K); h(e, "beforeRedraw", H); h(e, "beforeRender", w); O(d, "isInsidePlot", f); O(d, "renderSeries", F); O(d, "setClassName", b)
                }
            })(t || (t = {})); ""; return t
        }); D(a, "Core/Axis/ZAxis.js", [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function (a, A) {
            function q(a) { return new g(this, a) } function I() {
                const a = this.options.zAxis = L(this.options.zAxis || {}); this.is3d() && (this.zAxis = [], a.forEach((a, c) => { this.addZAxis(a).setScale() }))
            } const { addEvent: k, merge: J, pick: C, splat: L } = A, h = []; class g extends a {
                constructor() { super(...arguments); this.isZAxis = !0 } static compose(a) { A.pushUnique(h, a) && (k(a, "afterGetAxes", I), a = a.prototype, a.addZAxis = q, a.collectionsWithInit.zAxis = [a.addZAxis], a.collectionsWithUpdate.push("zAxis")) } init(a, g) { this.isZAxis = !0; super.init(a, g, "zAxis") } getSeriesExtremes() {
                    const a = this.chart; this.hasVisibleSeries = !1; this.dataMin = this.dataMax = this.ignoreMinPadding = this.ignoreMaxPadding = void 0;
                    this.stacking && this.stacking.buildStacks(); this.series.forEach(c => { if (c.visible || !a.options.chart.ignoreHiddenSeries) this.hasVisibleSeries = !0, c = c.zData, c.length && (this.dataMin = Math.min(C(this.dataMin, c[0]), Math.min.apply(null, c)), this.dataMax = Math.max(C(this.dataMax, c[0]), Math.max.apply(null, c))) })
                } setAxisSize() { const a = this.chart; super.setAxisSize(); this.width = this.len = a.options.chart.options3d && a.options.chart.options3d.depth || 0; this.right = a.chartWidth - this.width - this.left } setOptions(a) {
                    a = J({
                        offset: 0,
                        lineWidth: 0
                    }, a); super.setOptions(a)
                }
            } return g
        }); D(a, "Core/Axis/Axis3DDefaults.js", [], function () { return { labels: { position3d: "offset", skew3d: !1 }, title: { position3d: null, skew3d: null } } }); D(a, "Core/Axis/Tick3DComposition.js", [a["Core/Utilities.js"]], function (a) {
            function q(a) { const h = this.axis.axis3D; h && k(a.pos, h.fix3dPosition(a.pos)) } function w(a) {
                var h = this.axis.axis3D; const g = a.apply(this, [].slice.call(arguments, 1)); if (h) {
                    const a = g[0], n = g[1]; if ("M" === a[0] && "L" === n[0]) return h = [h.fix3dPosition({
                        x: a[1],
                        y: a[2], z: 0
                    }), h.fix3dPosition({ x: n[1], y: n[2], z: 0 })], this.axis.chart.renderer.toLineSegments(h)
                } return g
            } const { addEvent: I, extend: k, wrap: J } = a, C = []; return { compose: function (k) { a.pushUnique(C, k) && (I(k, "afterGetLabelPosition", q), J(k.prototype, "getMarkPath", w)) } }
        }); D(a, "Core/Axis/Axis3DComposition.js", [a["Core/Axis/Axis3DDefaults.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Axis/Tick3DComposition.js"], a["Core/Utilities.js"]], function (a, A, w, I, k) {
            function q() {
                const a = this.chart, c = this.options; a.is3d &&
                    a.is3d() && "colorAxis" !== this.coll && (c.tickWidth = K(c.tickWidth, 0), c.gridLineWidth = K(c.gridLineWidth, 1))
            } function C(a) { this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos) } function L() { this.axis3D || (this.axis3D = new E(this)) } function h(a) { return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1)) } function g(a) {
                if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments,
                    1)); var f = arguments, b = f[2]; const c = []; f = this.getPlotLinePath({ value: f[1] }); b = this.getPlotLinePath({ value: b }); if (f && b) for (let a = 0; a < f.length; a += 2) { const e = f[a], d = f[a + 1], g = b[a], h = b[a + 1]; "M" === e[0] && "L" === d[0] && "M" === g[0] && "L" === h[0] && c.push(e, d, h, ["L", g[1], g[2]], ["Z"]) } return c
            } function c(a) {
                var f = this.axis3D; const b = this.chart; var c = a.apply(this, [].slice.call(arguments, 1)); if ("colorAxis" === this.coll || !b.chart3d || !b.is3d() || null === c) return c; var e = b.options.chart.options3d; const g = this.isZAxis ? b.plotWidth :
                    e.depth; e = b.chart3d.frame3d; const d = c[0], h = c[1]; c = []; "M" === d[0] && "L" === h[0] && (f = [f.swapZ({ x: d[1], y: d[2], z: 0 }), f.swapZ({ x: d[1], y: d[2], z: g }), f.swapZ({ x: h[1], y: h[2], z: 0 }), f.swapZ({ x: h[1], y: h[2], z: g })], this.horiz ? (this.isZAxis ? (e.left.visible && c.push(f[0], f[2]), e.right.visible && c.push(f[1], f[3])) : (e.front.visible && c.push(f[0], f[2]), e.back.visible && c.push(f[1], f[3])), e.top.visible && c.push(f[0], f[1]), e.bottom.visible && c.push(f[2], f[3])) : (e.front.visible && c.push(f[0], f[2]), e.back.visible && c.push(f[1], f[3]),
                        e.left.visible && c.push(f[0], f[1]), e.right.visible && c.push(f[2], f[3])), c = v(c, this.chart, !1)); return b.renderer.toLineSegments(c)
            } function n(a, c) {
                var b = this.chart, f = this.ticks, e = this.gridGroup; if (this.categories && b.frameShapes && b.is3d() && e && c && c.label) {
                    e = e.element.childNodes[0].getBBox(); const a = b.frameShapes.left.getBBox(); var g = b.options.chart.options3d; b = { x: b.plotWidth / 2, y: b.plotHeight / 2, z: g.depth / 2, vd: K(g.depth, 1) * K(g.viewDistance, 0) }; g = c.pos; const h = f[g - 1]; f = f[g + 1]; let l, p; 0 !== g && h && h.label && h.label.xy &&
                        (l = G({ x: h.label.xy.x, y: h.label.xy.y, z: null }, b, b.vd)); f && f.label && f.label.xy && (p = G({ x: f.label.xy.x, y: f.label.xy.y, z: null }, b, b.vd)); f = { x: c.label.xy.x, y: c.label.xy.y, z: null }; f = G(f, b, b.vd); return Math.abs(l ? f.x - l.x : p ? p.x - f.x : e.x - a.x)
                } return a.apply(this, [].slice.call(arguments, 1))
            } function O(a) { const f = a.apply(this, [].slice.call(arguments, 1)); return this.axis3D ? this.axis3D.fix3dPosition(f, !0) : f } const { deg2rad: t } = A, { perspective: v, perspective3D: G, shapeArea: l } = w, { addEvent: m, merge: y, pick: K, wrap: H } = k, N = [];
            class E {
                static compose(f, l) { I.compose(l); k.pushUnique(N, f) && (y(!0, f.defaultOptions, a), f.keepProps.push("axis3D"), m(f, "init", L), m(f, "afterSetOptions", q), m(f, "drawCrosshair", C), f = f.prototype, H(f, "getLinePath", h), H(f, "getPlotBandPath", g), H(f, "getPlotLinePath", c), H(f, "getSlotWidth", n), H(f, "getTitlePosition", O)) } constructor(a) { this.axis = a } fix3dPosition(a, c) {
                    const b = this.axis; var f = b.chart; if ("colorAxis" === b.coll || !f.chart3d || !f.is3d()) return a; var e = t * f.options.chart.options3d.alpha, g = t * f.options.chart.options3d.beta,
                        d = K(c && b.options.title.position3d, b.options.labels.position3d); c = K(c && b.options.title.skew3d, b.options.labels.skew3d); const h = f.chart3d.frame3d; var k = f.plotLeft; const n = f.plotWidth + k, m = f.plotTop, H = f.plotHeight + m; let q = f = 0; var y = { x: 0, y: 1, z: 0 }; let E = !1; a = b.axis3D.swapZ({ x: a.x, y: a.y, z: 0 }); if (b.isZAxis) if (b.opposite) { if (null === h.axes.z.top) return {}; q = a.y - m; a.x = h.axes.z.top.x; a.y = h.axes.z.top.y; k = h.axes.z.top.xDir; E = !h.top.frontFacing } else {
                            if (null === h.axes.z.bottom) return {}; q = a.y - H; a.x = h.axes.z.bottom.x;
                            a.y = h.axes.z.bottom.y; k = h.axes.z.bottom.xDir; E = !h.bottom.frontFacing
                        } else if (b.horiz) if (b.opposite) { if (null === h.axes.x.top) return {}; q = a.y - m; a.y = h.axes.x.top.y; a.z = h.axes.x.top.z; k = h.axes.x.top.xDir; E = !h.top.frontFacing } else { if (null === h.axes.x.bottom) return {}; q = a.y - H; a.y = h.axes.x.bottom.y; a.z = h.axes.x.bottom.z; k = h.axes.x.bottom.xDir; E = !h.bottom.frontFacing } else if (b.opposite) { if (null === h.axes.y.right) return {}; f = a.x - n; a.x = h.axes.y.right.x; a.z = h.axes.y.right.z; k = h.axes.y.right.xDir; k = { x: k.z, y: k.y, z: -k.x } } else {
                            if (null ===
                                h.axes.y.left) return {}; f = a.x - k; a.x = h.axes.y.left.x; a.z = h.axes.y.left.z; k = h.axes.y.left.xDir
                        } "chart" !== d && ("flap" === d ? b.horiz ? (g = Math.sin(e), e = Math.cos(e), b.opposite && (g = -g), E && (g = -g), y = { x: k.z * g, y: e, z: -k.x * g }) : k = { x: Math.cos(g), y: 0, z: Math.sin(g) } : "ortho" === d ? b.horiz ? (y = Math.cos(e), d = Math.sin(g) * y, e = -Math.sin(e), g = -y * Math.cos(g), y = { x: k.y * g - k.z * e, y: k.z * d - k.x * g, z: k.x * e - k.y * d }, e = 1 / Math.sqrt(y.x * y.x + y.y * y.y + y.z * y.z), E && (e = -e), y = { x: e * y.x, y: e * y.y, z: e * y.z }) : k = { x: Math.cos(g), y: 0, z: Math.sin(g) } : b.horiz ? y = {
                            x: Math.sin(g) *
                                Math.sin(e), y: Math.cos(e), z: -Math.cos(g) * Math.sin(e)
                        } : k = { x: Math.cos(g), y: 0, z: Math.sin(g) }); a.x += f * k.x + q * y.x; a.y += f * k.y + q * y.y; a.z += f * k.z + q * y.z; f = v([a], b.chart)[0]; c && (0 > l(v([a, { x: a.x + k.x, y: a.y + k.y, z: a.z + k.z }, { x: a.x + y.x, y: a.y + y.y, z: a.z + y.z }], b.chart)) && (k = { x: -k.x, y: -k.y, z: -k.z }), a = v([{ x: a.x, y: a.y, z: a.z }, { x: a.x + k.x, y: a.y + k.y, z: a.z + k.z }, { x: a.x + y.x, y: a.y + y.y, z: a.z + y.z }], b.chart), f.matrix = [a[1].x - a[0].x, a[1].y - a[0].y, a[2].x - a[0].x, a[2].y - a[0].y, f.x, f.y], f.matrix[4] -= f.x * f.matrix[0] + f.y * f.matrix[2], f.matrix[5] -=
                            f.x * f.matrix[1] + f.y * f.matrix[3]); return f
                } swapZ(a, c) { const b = this.axis; return b.isZAxis ? (c = c ? 0 : b.chart.plotLeft, { x: c + a.z, y: a.y, z: a.x - c }) : a }
            } return E
        }); D(a, "Core/Series/Series3D.js", [a["Core/Math3D.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a, A, w) {
            const { perspective: q } = a, { addEvent: k, extend: J, merge: C, pick: L, isNumber: h } = w; class g extends A {
                translate() { super.translate.apply(this, arguments); this.chart.is3d() && this.translate3dPoints() } translate3dPoints() {
                    var a = this.options, g = this.chart,
                    k = L(this.zAxis, g.options.zAxis[0]); let t = [], v, w, l = []; this.zPadding = (a.stacking ? h(a.stack) ? a.stack : 0 : this.index || 0) * (a.depth || 0 + (a.groupZPadding || 1)); for (w = 0; w < this.data.length; w++)a = this.data[w], k && k.translate ? (v = k.logarithmic && k.val2lin ? k.val2lin(a.z) : a.z, a.plotZ = k.translate(v), a.isInside = a.isInside ? v >= k.min && v <= k.max : !1) : a.plotZ = this.zPadding, a.axisXpos = a.plotX, a.axisYpos = a.plotY, a.axisZpos = a.plotZ, t.push({ x: a.plotX, y: a.plotY, z: a.plotZ }), l.push(a.plotX || 0); this.rawPointsX = l; g = q(t, g, !0); for (w = 0; w <
                        this.data.length; w++)a = this.data[w], k = g[w], a.plotX = k.x, a.plotY = k.y, a.plotZ = k.z
                }
            } g.defaultOptions = C(A.defaultOptions); k(A, "afterTranslate", function () { this.chart.is3d() && this.translate3dPoints() }); J(A.prototype, { translate3dPoints: g.prototype.translate3dPoints }); return g
        }); D(a, "Series/Area3D/Area3DSeries.js", [a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, A, w) {
            function q(a) {
                const g = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d()) return g; var c =
                    J.getGraphPath, h = this.options; const q = Math.round(this.yAxis.getThreshold(h.threshold)); let t = []; if (this.rawPointsX) for (let a = 0; a < this.points.length; a++)t.push({ x: this.rawPointsX[a], y: h.stacking ? this.points[a].yBottom : q, z: this.zPadding }); h = this.chart.options.chart.options3d; t = k(t, this.chart, !0).map(a => ({ plotX: a.x, plotY: a.y, plotZ: a.z })); this.group && h && h.depth && h.beta && (this.markerGroup && (this.markerGroup.add(this.group), this.markerGroup.attr({ translateX: 0, translateY: 0 })), this.group.attr({
                        zIndex: Math.max(1,
                            270 < h.beta || 90 > h.beta ? h.depth - Math.round(this.zPadding || 0) : Math.round(this.zPadding || 0))
                    })); t.reversed = !0; c = c.call(this, t, !0, !0); c[0] && "M" === c[0][0] && (c[0] = ["L", c[0][1], c[0][2]]); this.areaPath && (c = this.areaPath.splice(0, this.areaPath.length / 2).concat(c), c.xMap = this.areaPath.xMap, this.areaPath = c); return g
            } const { perspective: k } = a, { seriesTypes: { line: { prototype: J } } } = A, { wrap: C } = w, L = []; return { compose: function (a) { w.pushUnique(L, a) && C(a.prototype, "getGraphPath", q) } }
        }); D(a, "Series/Column3D/Column3DComposition.js",
            [a["Series/Column/ColumnSeries.js"], a["Core/Series/Series.js"], a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function (a, A, w, I, k, J) {
                function q(a, c) { const g = a.series, h = { totalStacks: 0 }; let k, l = 1; g.forEach(function (a) { k = v(a.options.stack, c ? 0 : g.length - 1 - a.index); h[k] ? h[k].series.push(a) : (h[k] = { series: [a], position: l }, l++) }); h.totalStacks = l + 1; return h } function L(a) {
                    const c = a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d && this.chart.is3d() &&
                        (c.stroke = this.options.edgeColor || c.fill, c["stroke-width"] = v(this.options.edgeWidth, 1)); return c
                } function h(a, c, g) { const h = this.chart.is3d && this.chart.is3d(); h && (this.options.inactiveOtherPoints = !0); a.call(this, c, g); h && (this.options.inactiveOtherPoints = !1) } function g(a, ...c) { return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : a.apply(this, c) } const { prototype: c } = a, { perspective: n } = w, { addEvent: D, extend: t, pick: v, wrap: G } = J; G(c, "translate", function (a) {
                    a.apply(this, [].slice.call(arguments,
                        1)); this.chart.is3d() && this.translate3dShapes()
                }); G(A.prototype, "justifyDataLabel", function (a) { return arguments[2].outside3dPlot ? !1 : a.apply(this, [].slice.call(arguments, 1)) }); c.translate3dPoints = function () { }; c.translate3dShapes = function () {
                    let a = this, c = a.chart, g = a.options, h = g.depth, k = (g.stacking ? g.stack || 0 : a.index) * (h + (g.groupZPadding || 1)), q = a.borderWidth % 2 ? .5 : 0, v; c.inverted && !a.yAxis.reversed && (q *= -1); !1 !== g.grouping && (k = 0); k += g.groupZPadding || 1; a.data.forEach(function (f) {
                        f.outside3dPlot = null; if (null !==
                            f.y) {
                                const b = t({ x: 0, y: 0, width: 0, height: 0 }, f.shapeArgs || {}); var g = f.tooltipPos; let l;[["x", "width"], ["y", "height"]].forEach(e => { l = b[e[0]] - q; 0 > l && (b[e[1]] += b[e[0]] + q, b[e[0]] = -q, l = 0); l + b[e[1]] > a[e[0] + "Axis"].len && 0 !== b[e[1]] && (b[e[1]] = a[e[0] + "Axis"].len - b[e[0]]); if (0 !== b[e[1]] && (b[e[0]] >= a[e[0] + "Axis"].len || b[e[0]] + b[e[1]] <= q)) { for (const a in b) b[a] = "y" === a ? -9999 : 0; f.outside3dPlot = !0 } }); "roundedRect" === f.shapeType && (f.shapeType = "cuboid"); f.shapeArgs = t(b, { z: k, depth: h, insidePlotArea: !0 }); v = {
                                    x: b.x + b.width /
                                        2, y: b.y, z: k + h / 2
                                }; c.inverted && (v.x = b.height, v.y = f.clientX || 0); f.plot3d = n([v], c, !0, !1)[0]; g && (g = n([{ x: g[0], y: g[1], z: k + h / 2 }], c, !0, !1)[0], f.tooltipPos = [g.x, g.y])
                        }
                    }); a.z = k
                }; G(c, "animate", function (a) {
                    if (this.chart.is3d()) {
                        const a = this.yAxis, c = this, g = this.yAxis.reversed; arguments[1] ? c.data.forEach(function (c) { null !== c.y && (c.height = c.shapeArgs.height, c.shapey = c.shapeArgs.y, c.shapeArgs.height = 1, g || (c.shapeArgs.y = c.stackY ? c.plotY + a.translate(c.stackY) : c.plotY + (c.negative ? -c.height : c.height))) }) : (c.data.forEach(function (a) {
                            if (null !==
                                a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic)) a.graphic[a.outside3dPlot ? "attr" : "animate"](a.shapeArgs, c.options.animation)
                        }), this.drawDataLabels())
                    } else a.apply(this, [].slice.call(arguments, 1))
                }); G(c, "plotGroup", function (a, c, g, h, k, n) {
                    "dataLabelsGroup" !== c && "markerGroup" !== c && this.chart.is3d() && (this[c] && delete this[c], n && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(n)), this[c] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()),
                        this[c].survive = !0, "group" === c && (arguments[3] = "visible"))); return a.apply(this, Array.prototype.slice.call(arguments, 1))
                }); G(c, "setVisible", function (a, c) { const g = this; g.chart.is3d() && g.data.forEach(function (a) { a.visible = a.options.visible = c = "undefined" === typeof c ? !v(g.visible, a.visible) : c; g.options.data[g.data.indexOf(a)] = a.options; a.graphic && a.graphic.attr({ visibility: c ? "visible" : "hidden" }) }); a.apply(this, Array.prototype.slice.call(arguments, 1)) }); D(a, "afterInit", function () {
                    if (this.chart.is3d()) {
                        let h =
                            this.options; var a = h.grouping, c = h.stacking; let k = this.yAxis.options.reversedStacks; var g = 0; if ("undefined" === typeof a || a) { a = q(this.chart, c); g = h.stack || 0; for (c = 0; c < a[g].series.length && a[g].series[c] !== this; c++); g = 10 * (a.totalStacks - a[g].position) + (k ? c : -c); this.xAxis.reversed || (g = 10 * a.totalStacks - g) } h.depth = h.depth || 25; this.z = this.z || 0; h.zIndex = g
                    }
                }); G(c, "pointAttribs", L); G(c, "setState", h); G(c.pointClass.prototype, "hasNewShapeType", g); I.seriesTypes.columnRange && (w = I.seriesTypes.columnrange.prototype, G(w,
                    "pointAttribs", L), G(w, "setState", h), G(w.pointClass.prototype, "hasNewShapeType", g), w.plotGroup = c.plotGroup, w.setVisible = c.setVisible); G(A.prototype, "alignDataLabel", function (a, c, g, h, k) {
                        const l = this.chart; h.outside3dPlot = c.outside3dPlot; if (l.is3d() && this.is("column")) {
                            var m = this.options; const a = v(h.inside, !!this.options.stacking), g = l.options.chart.options3d, b = c.pointWidth / 2 || 0; m = { x: k.x + b, y: k.y, z: this.z + m.depth / 2 }; l.inverted && (a && (k.width = 0, m.x += c.shapeArgs.height / 2), 90 <= g.alpha && 270 >= g.alpha && (m.y +=
                                c.shapeArgs.width)); m = n([m], l, !0, !1)[0]; k.x = m.x - b; k.y = c.outside3dPlot ? -9E9 : m.y
                        } a.apply(this, [].slice.call(arguments, 1))
                    }); G(k.prototype, "getStackBox", function (a, c) {
                        const g = a.apply(this, [].slice.call(arguments, 1)), h = this.axis.chart, { width: k } = c; if (h.is3d() && this.base) {
                            var l = +this.base.split(",")[0], m = h.series[l]; l = h.options.chart.options3d; m && m instanceof I.seriesTypes.column && (m = { x: g.x + (h.inverted ? g.height : k / 2), y: g.y, z: m.options.depth / 2 }, h.inverted && (g.width = 0, 90 <= l.alpha && 270 >= l.alpha && (m.y += k)),
                                m = n([m], h, !0, !1)[0], g.x = m.x - k / 2, g.y = m.y)
                        } return g
                    }); ""; return a
            }); D(a, "Series/Pie3D/Pie3DPoint.js", [a["Core/Series/SeriesRegistry.js"]], function (a) { ({ seriesTypes: { pie: { prototype: { pointClass: a } } } } = a); const q = a.prototype.haloPath; class w extends a { constructor() { super(...arguments); this.series = void 0 } haloPath() { var a; return (null === (a = this.series) || void 0 === a ? 0 : a.chart.is3d()) ? [] : q.apply(this, arguments) } } return w }); D(a, "Series/Pie3D/Pie3DSeries.js", [a["Core/Globals.js"], a["Series/Pie3D/Pie3DPoint.js"],
            a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, A, w, I) {
                const { deg2rad: k } = a; ({ seriesTypes: { pie: a } } = w); const { extend: q, pick: C } = I; class D extends a {
                    addPoint() { super.addPoint.apply(this, arguments); this.chart.is3d() && this.update(this.userOptions, !0) } animate(a) {
                        if (this.chart.is3d()) {
                            let c = this.options.animation; var g = this.center; let h = this.group, k = this.markerGroup; !0 === c && (c = {}); a ? (h.oldtranslateX = C(h.oldtranslateX, h.translateX), h.oldtranslateY = C(h.oldtranslateY, h.translateY), g = {
                                translateX: g[0],
                                translateY: g[1], scaleX: .001, scaleY: .001
                            }, h.attr(g), k && (k.attrSetters = h.attrSetters, k.attr(g))) : (g = { translateX: h.oldtranslateX, translateY: h.oldtranslateY, scaleX: 1, scaleY: 1 }, h.animate(g, c), k && k.animate(g, c))
                        } else super.animate.apply(this, arguments)
                    } drawDataLabels() {
                        if (this.chart.is3d()) {
                            const a = this.chart.options.chart.options3d; this.data.forEach(function (g) {
                                const c = g.shapeArgs, h = c.r, q = (c.start + c.end) / 2; g = g.labelPosition; const t = g.connectorPosition, v = -h * (1 - Math.cos((c.alpha || a.alpha) * k)) * Math.sin(q),
                                    w = h * (Math.cos((c.beta || a.beta) * k) - 1) * Math.cos(q);[g.natural, t.breakAt, t.touchingSliceAt].forEach(function (a) { a.x += w; a.y += v })
                            })
                        } super.drawDataLabels.apply(this, arguments)
                    } pointAttribs(a) { const g = super.pointAttribs.apply(this, arguments), c = this.options; this.chart.is3d() && !this.chart.styledMode && (g.stroke = c.edgeColor || a.color || this.color, g["stroke-width"] = C(c.edgeWidth, 1)); return g } translate() {
                        super.translate.apply(this, arguments); if (this.chart.is3d()) {
                            var a = this, g = a.options, c = g.depth || 0, n = a.chart.options.chart.options3d,
                            q = n.alpha, t = n.beta, v = g.stacking ? (g.stack || 0) * c : a._i * c; v += c / 2; !1 !== g.grouping && (v = 0); a.data.forEach(function (h) { var l = h.shapeArgs; h.shapeType = "arc3d"; l.z = v; l.depth = .75 * c; l.alpha = q; l.beta = t; l.center = a.center; l = (l.end + l.start) / 2; h.slicedTranslation = { translateX: Math.round(Math.cos(l) * g.slicedOffset * Math.cos(q * k)), translateY: Math.round(Math.sin(l) * g.slicedOffset * Math.cos(q * k)) } })
                        }
                    } drawTracker() {
                        super.drawTracker.apply(this, arguments); this.chart.is3d() && this.points.forEach(function (a) {
                            a.graphic && ["out",
                                "inn", "side1", "side2"].forEach(g => { a.graphic && (a.graphic[g].element.point = a) })
                        })
                    }
                } q(D.prototype, { pointClass: A }); ""; return D
            }); D(a, "Series/Pie3D/Pie3DComposition.js", [a["Series/Pie3D/Pie3DPoint.js"], a["Series/Pie3D/Pie3DSeries.js"], a["Core/Series/SeriesRegistry.js"]], function (a, A, w) { w.seriesTypes.pie.prototype.pointClass.prototype.haloPath = a.prototype.haloPath; w.seriesTypes.pie = A }); D(a, "Series/Scatter3D/Scatter3DPoint.js", [a["Series/Scatter/ScatterSeries.js"], a["Core/Utilities.js"]], function (a, A) {
                const { defined: q } =
                    A; class D extends a.prototype.pointClass { constructor() { super(...arguments); this.series = this.options = void 0 } applyOptions() { super.applyOptions.apply(this, arguments); q(this.z) || (this.z = 0); return this } } return D
            }); D(a, "Series/Scatter3D/Scatter3DSeries.js", [a["Core/Math3D.js"], a["Series/Scatter3D/Scatter3DPoint.js"], a["Series/Scatter/ScatterSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, A, w, D, k) {
                const { pointCameraDistance: q } = a, { extend: C, merge: I } = k; class h extends w {
                    constructor() {
                        super(...arguments);
                        this.points = this.options = this.data = void 0
                    } pointAttribs(a) { const c = super.pointAttribs.apply(this, arguments); this.chart.is3d() && a && (c.zIndex = q(a, this.chart)); return c }
                } h.defaultOptions = I(w.defaultOptions, { tooltip: { pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" } }); C(h.prototype, { axisTypes: ["xAxis", "yAxis", "zAxis"], directTouch: !0, parallelArrays: ["x", "y", "z"], pointArrayMap: ["x", "y", "z"], pointClass: A }); D.registerSeriesType("scatter3d", h); ""; return h
            }); D(a, "masters/highcharts-3d.src.js",
                [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGRenderer3D.js"], a["Core/Chart/Chart3D.js"], a["Core/Axis/ZAxis.js"], a["Core/Axis/Axis3DComposition.js"], a["Series/Area3D/Area3DSeries.js"]], function (a, A, w, D, k, J) { A.compose(a.SVGRenderer); w.compose(a.Chart, a.Fx); D.compose(a.Chart); k.compose(a.Axis, a.Tick); J.compose(a.seriesTypes.area) })
});
//# sourceMappingURL=highcharts-3d.js.map