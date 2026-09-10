var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
var DB = "ShowCueDB", VER = 4;
var lyricAutoScroll = false, lyricScrollTimer = null;
var db, state = { sets: [], current: null, selected: null, library: { audio: [], video: [] } }, editing = null, currentAudio = null, master = 1, muted = false, objectUrls = [], tvOn = false, settings = { padLayout: 50, finishMode: "stop", theme: "dark", padSize: "big", defaultColor: "#a991d7", volumeSync: true };
var TARGET_LUFS = -16, $ = function (id) { return document.getElementById(id); }, uid = function () { var _a; return ((_a = crypto.randomUUID) === null || _a === void 0 ? void 0 : _a.call(crypto)) || Date.now() + "-" + Math.random(); }, clamp = function (n, a, b) { return Math.max(a, Math.min(b, n)); }, ext = function (n) { return (String(n).split(".").pop() || "").toLowerCase(); }, esc = function (x) { return String(x !== null && x !== void 0 ? x : "").replace(/[&<>"']/g, function (m) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]); }); }, fmtTime = function (s) { s = Number.isFinite(s) ? s : 0; return "".concat(Math.floor(s / 60), ":").concat(String(Math.floor(s % 60)).padStart(2, "0")); };
function openDB() { return new Promise(function (res, rej) { var r = indexedDB.open(DB, VER); r.onupgradeneeded = function () { var d = r.result; if (!d.objectStoreNames.contains("data"))
    d.createObjectStore("data"); }; r.onsuccess = function () { db = r.result; res(); }; r.onerror = function () { return rej(r.error); }; }); }
var get = function (k) { return new Promise(function (res, rej) { var r = db.transaction("data").objectStore("data").get(k); r.onsuccess = function () { return res(r.result); }; r.onerror = function () { return rej(r.error); }; }); }, put = function (k, v) { return new Promise(function (res, rej) { var r = db.transaction("data", "readwrite").objectStore("data").put(v, k); r.onsuccess = function () { return res(); }; r.onerror = function () { return rej(r.error); }; }); };
function save() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, put("sets", state.sets)];
            case 1:
                _a.sent();
                return [4 /*yield*/, put("library", state.library)];
            case 2:
                _a.sent();
                return [4 /*yield*/, put("settings", settings)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    }); });
}
function boot() {
    return __awaiter(this, void 0, void 0, function () { var _a, _b, _c, _d, _e; return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, openDB()];
            case 1:
                _f.sent();
                _a = state;
                return [4 /*yield*/, get("sets")];
            case 2:
                _a.sets = (_f.sent()) || [];
                _b = state;
                return [4 /*yield*/, get("library")];
            case 3:
                _b.library = (_f.sent()) || { audio: [], video: [] };
                _d = (_c = Object).assign;
                _e = [settings];
                return [4 /*yield*/, get("settings")];
            case 4:
                settings = _d.apply(_c, _e.concat([(_f.sent()) || {}]));
                if (!!state.sets.length) return [3 /*break*/, 6];
                state.sets = [{ id: uid(), name: "My First Show", pads: Array.from({ length: Math.min(settings.padLayout, 12) }, function () { return ({ id: uid(), name: "", color: settings.defaultColor, mode: "restart" }); }) }];
                return [4 /*yield*/, save()];
            case 5:
                _f.sent();
                _f.label = 6;
            case 6:
                state.current = state.sets[0].id;
                applySettings();
                render();
                renderLyrics();
                renderSetlists();
                renderVolume();
                setTimeout(refreshTvUi, 0);
                return [2 /*return*/];
        }
    }); });
}
function currentSet() { return state.sets.find(function (s) { return s.id === state.current; }); }
function selectedPad() { var s = currentSet(); return (s === null || s === void 0 ? void 0 : s.pads.find(function (p) { return p.id === state.selected; })) || (s === null || s === void 0 ? void 0 : s.pads.find(function (p) { return p.audioBlob || p.audioName; })) || (s === null || s === void 0 ? void 0 : s.pads[0]); }
function applySettings() { $("padLayout").value = settings.padLayout; $('finishMode').value = settings.finishMode; $('displayTheme').value = settings.theme; $('padSize').value = settings.padSize; document.body.classList.toggle("light", settings.theme === "light"); document.documentElement.style.setProperty("--padMin", settings.padSize === "small" ? "108px" : "148px"); document.body.classList.toggle("pads-big", settings.padSize !== "small"); document.body.classList.toggle("pads-small", settings.padSize === "small"); }
function render() { var s = currentSet(); if (!s)
    return; $('setTitle').textContent = s.name; $('padCount').textContent = "".concat(s.pads.length, " / 50"); $('cueGrid').innerHTML = ""; s.pads.slice(0, Number(settings.padLayout) || 50).forEach(function (p, i) { return $('cueGrid').appendChild(makePad(p, i)); }); if (!s.pads.length) {
    $('cueGrid').innerHTML = '<div class="empty" style="grid-column:1/-1">No pads yet.</div>';
} }
function makePad(p, i) {
    var _this = this;
    var el = document.createElement("div");
    el.className = "pad" + (p.id === state.selected ? " selected" : "");
    el.style.background = p.color || settings.defaultColor;
    el.dataset.id = p.id;
    el.draggable = true;
    el.innerHTML = "<div><div class=\"num\">".concat(i + 1, "</div><div class=\"kind\">").concat(p.audioName ? '<span class="badge">AUDIO</span>' : '').concat(p.videoName ? '<span class="badge">VIDEO</span>' : '').concat(p.tvPhotoName ? '<span class="badge">PHOTO</span>' : '', "</div></div><div><div class=\"name\">").concat(esc(p.name || "Empty Pad"), "</div><div class=\"file\">").concat(esc(p.audioName || "Use Edit to add track"), "</div><div class=\"actions\"><button class=\"go\" data-play>\u25B6</button><button data-edit>\u270E</button></div></div>");
    var dragging = false;
    el.addEventListener("pointerdown", function (e) { if (e.target.closest("button"))
        return; dragging = false; try {
        el.setPointerCapture(e.pointerId);
    }
    catch (_a) { } });
    el.addEventListener("pointermove", function (e) { if (!dragging && e.buttons && Math.abs(e.movementX) + Math.abs(e.movementY) > 3) {
        if (Math.abs(e.movementX) > Math.abs(e.movementY)) {
            dragging = true;
            dragId = p.id;
            el.style.opacity = ".65";
            document.body.style.cursor = "grabbing";
        }
    } });
    el.addEventListener("pointerup", function (e) { return __awaiter(_this, void 0, void 0, function () { var target_1, s, a, b, q; var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!dragging) return [3 /*break*/, 3];
                target_1 = (_a = document.elementFromPoint(e.clientX, e.clientY)) === null || _a === void 0 ? void 0 : _a.closest(".pad");
                if (!(target_1 && target_1 !== el)) return [3 /*break*/, 2];
                s = currentSet(), a = s.pads.findIndex(function (x) { return x.id === dragId; }), b = s.pads.findIndex(function (x) { return x.id === target_1.dataset.id; });
                if (!(a >= 0 && b >= 0)) return [3 /*break*/, 2];
                q = s.pads.splice(a, 1)[0];
                s.pads.splice(b, 0, q);
                return [4 /*yield*/, save()];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                dragging = false;
                dragId = null;
                el.style.opacity = "";
                document.body.style.cursor = "";
                render();
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    }); }); });
    ["pointercancel", "pointerleave"].forEach(function (ev) { return el.addEventListener(ev, function () { if (ev === "pointercancel") {
        dragging = false;
        dragId = null;
        el.style.opacity = "";
        document.body.style.cursor = "";
    } }); });
    el.addEventListener("dragstart", function (e) { dragging = true; dragId = p.id; e.dataTransfer.effectAllowed = "move"; });
    el.addEventListener("dragover", function (e) { return e.preventDefault(); });
    el.addEventListener("drop", function (e) { return __awaiter(_this, void 0, void 0, function () { var s, a, b, q; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                if (!dragId || dragId === p.id)
                    return [2 /*return*/];
                s = currentSet(), a = s.pads.findIndex(function (x) { return x.id === dragId; }), b = s.pads.findIndex(function (x) { return x.id === p.id; });
                q = s.pads.splice(a, 1)[0];
                s.pads.splice(b, 0, q);
                return [4 /*yield*/, save()];
            case 1:
                _a.sent();
                dragging = false;
                dragId = null;
                render();
                return [2 /*return*/];
        }
    }); }); });
    el.querySelector("[data-play]").onclick = function (e) { e.stopPropagation(); selectPad(p); playPad(p, el); };
    el.querySelector("[data-edit]").onclick = function (e) { e.stopPropagation(); openPad(p); };
    el.onclick = function (e) { if (!e.target.closest("button") && !dragging)
        playPad(p, el); };
    return el;
}
var dragId = null;
function selectPad(p) { state.selected = p.id; renderLyrics(); if (tvOn)
    updateTvOutput(p, true); refreshTvUi(); document.querySelectorAll(".pad").forEach(function (x) { return x.classList.toggle("selected", x.dataset.id === p.id); }); }
function fileToData(file) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { return res({ name: file.name, type: file.type || "application/octet-stream", data: r.result }); }; r.onerror = function () { return rej(r.error); }; r.readAsDataURL(file); }); }
function dataToBlob(x) {
    return __awaiter(this, void 0, void 0, function () { var r; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (x === null || x === void 0 ? void 0 : x.blob)
                    return [2 /*return*/, x.blob];
                return [4 /*yield*/, fetch(x.data)];
            case 1:
                r = _a.sent();
                return [4 /*yield*/, r.blob()];
            case 2: return [2 /*return*/, _a.sent()];
        }
    }); });
}
function audioLike(f) { var _a; return ((_a = f === null || f === void 0 ? void 0 : f.type) === null || _a === void 0 ? void 0 : _a.startsWith("audio/")) || ["mp3", "wav", "m4a", "aac", "flac", "ogg", "oga", "opus", "aiff", "aif", "caf", "amr", "m4b", "mpga", "webm"].includes(ext(f === null || f === void 0 ? void 0 : f.name)); }
function videoLike(f) { var _a; return ((_a = f === null || f === void 0 ? void 0 : f.type) === null || _a === void 0 ? void 0 : _a.startsWith("video/")) || ext(f === null || f === void 0 ? void 0 : f.name) === "mp4"; }
function analyse(blob) {
    return __awaiter(this, void 0, void 0, function () { var AC, ac, b, _a, _b, sum, n, c, d, step, i, rms, db_1, _c; return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                AC = window.AudioContext || window.webkitAudioContext;
                if (!AC)
                    return [2 /*return*/, 0];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 5, , 6]);
                ac = new AC();
                _b = (_a = ac).decodeAudioData;
                return [4 /*yield*/, blob.arrayBuffer()];
            case 2: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
            case 3:
                b = _d.sent();
                sum = 0, n = 0;
                for (c = 0; c < b.numberOfChannels; c++) {
                    d = b.getChannelData(c), step = Math.max(1, Math.floor(d.length / 160000));
                    for (i = 0; i < d.length; i += step) {
                        sum += d[i] * d[i];
                        n++;
                    }
                }
                rms = Math.sqrt(sum / Math.max(1, n)), db_1 = 20 * Math.log10(Math.max(rms, 1e-7));
                return [4 /*yield*/, ac.close()];
            case 4:
                _d.sent();
                return [2 /*return*/, clamp(TARGET_LUFS - (db_1 + 3), -12, 12)];
            case 5:
                _c = _d.sent();
                return [2 /*return*/, 0];
            case 6: return [2 /*return*/];
        }
    }); });
}
function importTracks(files) {
    return __awaiter(this, void 0, void 0, function () {
        var added, _i, _a, f, x;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    added = 0;
                    _i = 0, _a = __spreadArray([], files, true);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    f = _a[_i];
                    if (!audioLike(f)) return [3 /*break*/, 3];
                    _b = { id: uid(), name: f.name, type: f.type || "application/octet-stream" };
                    return [4 /*yield*/, blobFromFile(f)];
                case 2:
                    x = (_b.blob = _c.sent(), _b);
                    state.library.audio.push(x);
                    added++;
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, save()];
                case 5:
                    _c.sent();
                    renderLibrary();
                    toast("".concat(added, " audio file").concat(added === 1 ? "" : "s", " imported."));
                    return [2 /*return*/];
            }
        });
    });
}
function importVideos(files) {
    return __awaiter(this, void 0, void 0, function () {
        var added, _i, _a, f, x;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    added = 0;
                    _i = 0, _a = __spreadArray([], files, true);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    f = _a[_i];
                    if (!videoLike(f)) return [3 /*break*/, 3];
                    _b = { id: uid(), name: f.name, type: f.type || "application/octet-stream" };
                    return [4 /*yield*/, blobFromFile(f)];
                case 2:
                    x = (_b.blob = _c.sent(), _b);
                    state.library.video.push(x);
                    added++;
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, save()];
                case 5:
                    _c.sent();
                    renderLibrary();
                    toast("".concat(added, " video file").concat(added === 1 ? "" : "s", " imported."));
                    return [2 /*return*/];
            }
        });
    });
}
function openLibrary(type, p) { editing = (p === null || p === void 0 ? void 0 : p.id) || null; $('libraryTitle').textContent = type === "audio" ? "Choose Audio Track" : "Choose Video"; $('libraryModal').dataset.type = type; $('libraryModal').dataset.pad = (p === null || p === void 0 ? void 0 : p.id) || ""; renderLibrary(); $('libraryModal').classList.add("open"); }
function renderLibrary() { var type = $('libraryModal').dataset.type || "audio", list = $('libraryList'); list.innerHTML = ""; var arr = state.library[type] || []; if (!arr.length) {
    list.innerHTML = '<div class="hint">No imported files yet. Use Menu → Import Track / Import Video.</div>';
    return;
} arr.forEach(function (x) { var d = document.createElement("div"); d.className = "libitem"; d.innerHTML = "<div><b>".concat(esc(x.name), "</b><br><small>").concat(esc(x.type || "file"), "</small></div><button class=\"btn primary\">Use</button>"); d.querySelector("button").onclick = function () { return attachLibrary(type, x); }; list.appendChild(d); }); }
function attachLibrary(type, x) {
    return __awaiter(this, void 0, void 0, function () { var s, p, blob, _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                s = currentSet(), p = s.pads.find(function (q) { return q.id === $('libraryModal').dataset.pad; });
                if (!p) {
                    $('libraryModal').classList.remove("open");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, dataToBlob(x)];
            case 1:
                blob = _b.sent();
                if (!(type === "audio")) return [3 /*break*/, 4];
                p.audioBlob = blob;
                p.audioName = x.name;
                p.audioType = x.type;
                _a = p;
                return [4 /*yield*/, analyse(blob)];
            case 2:
                _a.gainDb = _b.sent();
                $('libraryModal').dataset.type = "video";
                $('libraryTitle').textContent = "Choose Video (optional)";
                renderLibrary();
                toast("Audio attached. Analysing BPM and Key…");
                return [4 /*yield*/, applyAudioMeta(p)];
            case 3:
                _b.sent();
                toast("Audio attached. BPM and Key detected. Choose a video or close.");
                return [3 /*break*/, 6];
            case 4:
                p.videoBlob = blob;
                p.videoName = x.name;
                p.videoType = x.type;
                $('libraryModal').classList.remove("open");
                return [4 /*yield*/, save()];
            case 5:
                _b.sent();
                render();
                if (p.audioBlob)
                    applyAudioMeta(p);
                toast("Video attached to cue.");
                _b.label = 6;
            case 6: return [4 /*yield*/, save()];
            case 7:
                _b.sent();
                render();
                return [2 /*return*/];
        }
    }); });
}
function openPad(p) {
    if (p === void 0) { p = null; }
    editing = (p === null || p === void 0 ? void 0 : p.id) || null;
    $('modalTitle').textContent = p ? "Edit Cue" : "Add Cue";
    $('pName').value = (p === null || p === void 0 ? void 0 : p.name) || "New Cue";
    $('pColor').value = (p === null || p === void 0 ? void 0 : p.color) || settings.defaultColor;
    $('pMode').value = (p === null || p === void 0 ? void 0 : p.mode) || "restart";
    $('pLyrics').value = (p === null || p === void 0 ? void 0 : p.lyrics) || "";
    $('pTrim').value = (p === null || p === void 0 ? void 0 : p.trimDb) || 0;
    $('trimVal').textContent = (p === null || p === void 0 ? void 0 : p.trimDb) || 0;
    $('pAudio').value = "";
    $('pVideo').value = "";
    $('fileInfo').textContent = p ? "".concat(p.audioName || "No audio").concat(p.videoName ? " • " + p.videoName : "") : "No files selected";
    $('deletePad').style.display = p ? "block" : "none";
    $('padModal').classList.add("open");
}
$('pTrim').oninput = function (e) { return $('trimVal').textContent = e.target.value; };
$('pVideo').onchange = function (e) { if (__spreadArray([], e.target.files, true).some(function (f) { return !videoLike(f); }))
    toast("One or more video files are not recognised by the browser."); };
function savePad() {
    return __awaiter(this, void 0, void 0, function () {
        var s, old, base, af, vf, _i, af_1, f, b, _a, _b, _c, _d, _e;
        var _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    s = currentSet(), old = editing ? s.pads.find(function (x) { return x.id === editing; }) : null;
                    if (!old && s.pads.length >= 50) {
                        toast("Maximum 50 pads per setlist.");
                        return [2 /*return*/];
                    }
                    base = old || { id: uid(), mode: "restart", trimDb: 0 };
                    base.name = $('pName').value.trim() || "Cue";
                    base.color = $('pColor').value;
                    base.mode = $('pMode').value;
                    base.lyrics = $('pLyrics').value;
                    base.trimDb = Number($('pTrim').value) || 0;
                    af = __spreadArray([], $('pAudio').files, true).filter(audioLike), vf = $('pVideo').files[0];
                    if (!(af.length && !old)) return [3 /*break*/, 6];
                    _i = 0, af_1 = af;
                    _g.label = 1;
                case 1:
                    if (!(_i < af_1.length)) return [3 /*break*/, 5];
                    f = af_1[_i];
                    return [4 /*yield*/, blobFromFile(f)];
                case 2:
                    b = _g.sent();
                    _b = (_a = s.pads).push;
                    _f = { id: uid(), name: f.name.replace(/\.[^.]+$/, ""), color: base.color, mode: base.mode, lyrics: base.lyrics, trimDb: base.trimDb, audioBlob: b, audioName: f.name, audioType: f.type };
                    return [4 /*yield*/, analyse(b)];
                case 3:
                    _b.apply(_a, [(_f.gainDb = _g.sent(), _f)]);
                    _g.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    if (!af[0]) return [3 /*break*/, 9];
                    _c = base;
                    return [4 /*yield*/, blobFromFile(af[0])];
                case 7:
                    _c.audioBlob = _g.sent();
                    base.audioName = af[0].name;
                    base.audioType = af[0].type;
                    _d = base;
                    return [4 /*yield*/, analyse(base.audioBlob)];
                case 8:
                    _d.gainDb = _g.sent();
                    _g.label = 9;
                case 9:
                    if (!vf) return [3 /*break*/, 11];
                    _e = base;
                    return [4 /*yield*/, blobFromFile(vf)];
                case 10:
                    _e.videoBlob = _g.sent();
                    base.videoName = vf.name;
                    base.videoType = vf.type;
                    _g.label = 11;
                case 11:
                    if (!old)
                        s.pads.push(base);
                    _g.label = 12;
                case 12:
                    state.selected = base.id;
                    return [4 /*yield*/, save()];
                case 13:
                    _g.sent();
                    $('padModal').classList.remove("open");
                    render();
                    renderLyrics();
                    toast("Cue saved.");
                    return [2 /*return*/];
            }
        });
    });
}
function blobFromFile(f) {
    return __awaiter(this, void 0, void 0, function () { var buf; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, f.arrayBuffer()];
            case 1:
                buf = _a.sent();
                return [2 /*return*/, new Blob([buf], { type: f.type || "application/octet-stream" })];
        }
    }); });
}
$('savePad').onclick = savePad;
$('cancelModal').onclick = function () { return $('padModal').classList.remove("open"); };
$('deletePad').onclick = function () { return __awaiter(_this, void 0, void 0, function () { var s; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            if (!editing)
                return [2 /*return*/];
            s = currentSet();
            s.pads = s.pads.filter(function (p) { return p.id !== editing; });
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            $('padModal').classList.remove("open");
            render();
            renderLyrics();
            return [2 /*return*/];
    }
}); }); };
var tvWin = null;
function tvWindowAlive() { return tvWin && !tvWin.closed; }
function tvOutputHtml() { return "<!doctype html><html><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>ShowCue TV Output</title><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#000}body{display:flex;align-items:center;justify-content:center}#stage{width:100vw;height:100vh;background:#000;display:flex;align-items:center;justify-content:center}#stage video,#stage img{width:100%;height:100%;object-fit:contain;display:block}#msg{color:#fff;font:22px -apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif;text-align:center;padding:30px}</style></head><body><div id=\"stage\"><div id=\"msg\">ShowCue TV Output<br><small style=\"font-size:14px;opacity:.65\">Waiting for a cue\u2026</small></div></div><script>var media=null,url=null;function clear(){if(media){try{media.pause()}catch(e){}if(media.parentNode)media.parentNode.removeChild(media);media=null}if(url){URL.revokeObjectURL(url);url=null}}function show(m){clear();var stage=document.getElementById('stage');media=document.createElement(m.kind==='video'?'video':'img');media.src=url=URL.createObjectURL(m.blob);media.controls=false;media.autoplay=m.kind==='video';media.playsInline=true;stage.innerHTML='';stage.appendChild(media);if(m.kind==='video'){media.loop=false;media.muted=true;var pr=media.play();if(pr&&pr.catch)pr.catch(function(){})}}addEventListener('message',function(e){var m=e.data||{};if(m.cmd==='show'&&m.blob)show(m);if(m.cmd==='clear'){clear();document.getElementById('stage').innerHTML='<div id=\"msg\">Waiting for a cue\u2026</div>'}if(m.cmd==='sync'&&media&&m.time!=null){try{if(Math.abs(media.currentTime-m.time)>.45)media.currentTime=m.time}catch(e){}}if(m.cmd==='pause'&&media&&media.pause)media.pause();if(m.cmd==='play'&&media&&media.play){var pr=media.play();if(pr&&pr.catch)pr.catch(function(){})}if(m.cmd==='fullscreen'){try{var r=document.documentElement.requestFullscreen;if(r)r.call(document.documentElement)}catch(e){}}});if(window.opener&&window.opener.postMessage)window.opener.postMessage({cmd:'ready'},'*');</script></body></html>"; }
window.addEventListener('message', function (e) { var _a; if (e.source === tvWin && ((_a = e.data) === null || _a === void 0 ? void 0 : _a.cmd) === 'ready')
    updateTvOutput(selectedPad(), true); });
function openTvOutput() { if (!tvWindowAlive()) {
    tvWin = window.open('about:blank', 'ShowCueTV', 'popup=yes,width=1280,height=720');
    if (!tvWin) {
        toast("The TV Output window was blocked. Allow pop-ups for ShowCue.");
        return false;
    }
    tvWin.document.open();
    tvWin.document.write(tvOutputHtml());
    tvWin.document.close();
}
else {
    try {
        tvWin.focus();
    }
    catch (_a) { }
} if (selectedPad())
    updateTvOutput(selectedPad(), false); return true; }
function sendTv(msg) { if (tvWindowAlive())
    try {
        tvWin.postMessage(msg, '*');
    }
    catch (_a) { } }
function clearTvOutput() { sendTv({ cmd: 'clear' }); }
function updateTvOutput(p, autoplay) {
    if (autoplay === void 0) { autoplay = true; }
    if (!tvOn || !p) {
        if (!p)
            clearTvOutput();
        return;
    }
    if (p.tvPhotoBlob) {
        sendTv({ cmd: 'show', kind: 'image', blob: p.tvPhotoBlob });
        return;
    }
    if (p.videoBlob) {
        sendTv({ cmd: 'show', kind: 'video', blob: p.videoBlob });
        if (!autoplay)
            sendTv({ cmd: 'pause' });
        return;
    }
    clearTvOutput();
}
function stopAll() { if (currentAudio) {
    try {
        currentAudio.pause();
    }
    catch (_a) { }
    if (currentAudio.ctx)
        currentAudio.ctx.close().catch(function () { });
    currentAudio = null;
} document.querySelectorAll(".pad.playing").forEach(function (x) { return x.classList.remove("playing"); }); clearTvOutput(); $('nowPlaying').textContent = "Ready"; $('playIcon').innerHTML = '<path d="M8 5v14l11-7L8 5Z"/>'; updateSeek(); }
function showVideo(p, autoplay) {
    if (autoplay === void 0) { autoplay = true; }
    updateTvOutput(p, autoplay);
}
function playPad(p, el) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, url, a_1, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!p)
                        return [2 /*return*/];
                    if (!((currentAudio === null || currentAudio === void 0 ? void 0 : currentAudio.padId) === p.id)) return [3 /*break*/, 7];
                    if (!currentAudio.paused) return [3 /*break*/, 5];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, currentAudio.play()];
                case 2:
                    _b.sent();
                    if (tvOn && p.videoBlob) {
                        showVideo(p, true);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    toast("Could not resume this audio file.");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    currentAudio.pause();
                    _b.label = 6;
                case 6: return [2 /*return*/];
                case 7:
                    stopAll();
                    selectPad(p);
                    if (!p.audioBlob) {
                        if (tvOn && (p.tvPhotoBlob || p.videoBlob)) {
                            openTvOutput();
                            updateTvOutput(p, true);
                            toast("TV media cue shown.");
                        }
                        else
                            toast("No audio attached. Tap Edit on this pad to add a track.");
                        return [2 /*return*/];
                    }
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 10, , 11]);
                    url = URL.createObjectURL(p.audioBlob);
                    objectUrls.push(url);
                    a_1 = new Audio();
                    a_1.preload = "auto";
                    a_1.src = url;
                    a_1.padId = p.id;
                    a_1.baseGain = clamp(Math.pow(10, ((p.gainDb || 0) + (p.trimDb || 0)) / 20), 0, 1);
                    a_1.volume = muted ? 0 : clamp(a_1.baseGain * master, 0, 1);
                    currentAudio = a_1;
                    el === null || el === void 0 ? void 0 : el.classList.add("playing");
                    $('nowPlaying').textContent = p.name || p.audioName || "Playing";
                    renderLyrics();
                    if (lyricAutoScroll)
                        startLyricAutoScroll();
                    if (p.audioBlob && (!p.bpm || !p.key))
                        applyAudioMeta(p).catch(function () { });
                    $('playIcon').innerHTML = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
                    a_1.ontimeupdate = function () { updateSeek(); if (tvOn && p.videoBlob && tvWindowAlive())
                        sendTv({ cmd: "sync", time: a_1.currentTime }); };
                    a_1.onloadedmetadata = updateSeek;
                    a_1.onended = function () {
                        el === null || el === void 0 ? void 0 : el.classList.remove("playing");
                        var s = currentSet(), i = s.pads.findIndex(function (x) { return x.id === p.id; });
                        if (settings.finishMode === "next" && s.pads[i + 1]) {
                            var n_1 = s.pads[i + 1];
                            var ne = __spreadArray([], document.querySelectorAll('.pad'), true).find(function (x) { return x.dataset.id === n_1.id; });
                            playPad(n_1, ne);
                        }
                        else {
                            currentAudio = null;
                            renderLyrics();
                            $('playIcon').innerHTML = '<path d="M8 5v14l11-7L8 5Z"/>';
                            clearTvOutput();
                        }
                    };
                    // Start directly from the user gesture. This is the most reliable iOS/Safari path.
                    return [4 /*yield*/, a_1.play()];
                case 9:
                    // Start directly from the user gesture. This is the most reliable iOS/Safari path.
                    _b.sent();
                    if (tvOn && (p.videoBlob || p.tvPhotoBlob))
                        showVideo(p, true);
                    return [3 /*break*/, 11];
                case 10:
                    err_1 = _b.sent();
                    console.error(err_1);
                    el === null || el === void 0 ? void 0 : el.classList.remove("playing");
                    currentAudio = null;
                    $('playIcon').innerHTML = '<path d="M8 5v14l11-7L8 5Z"/>';
                    toast("This audio file could not be played on this device/browser.");
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function updateSeek() { var a = currentAudio; if (!a) {
    $('seek').value = 0;
    $('elapsed').textContent = "0:00";
    $('duration').textContent = "0:00";
    return;
} var d = a.duration || 0; $('seek').max = d || 1; $('seek').value = a.currentTime || 0; $('elapsed').textContent = fmtTime(a.currentTime); $('duration').textContent = fmtTime(d); }
function pVideoForCurrent() { var s = currentSet(); var p = s === null || s === void 0 ? void 0 : s.pads.find(function (x) { return x.id === (currentAudio === null || currentAudio === void 0 ? void 0 : currentAudio.padId); }); return !!((p === null || p === void 0 ? void 0 : p.videoBlob) && tvWindowAlive()); }
$('seek').oninput = function () { if (currentAudio) {
    currentAudio.currentTime = Number($('seek').value);
    if (tvOn && pVideoForCurrent())
        sendTv({ cmd: "sync", time: currentAudio.currentTime });
} };
$('playBtn').onclick = function () { var p = selectedPad(); if (!p) {
    toast('Select a cue first.');
    return;
} selectPad(p); var idx = currentSet().pads.findIndex(function (x) { return x.id === p.id; }); var el = __spreadArray([], document.querySelectorAll('.pad'), true).find(function (x) { return x.dataset.id === p.id; }) || null; playPad(p, el); };
$('stopBtn').onclick = stopAll;
$('rewindBtn').onclick = function () { if (currentAudio) {
    currentAudio.currentTime = 0;
    updateSeek();
    if (tvOn && pVideoForCurrent())
        sendTv({ cmd: 'sync', time: 0 });
} };
$('nextBtn').onclick = function () { var s = currentSet(), p = selectedPad(), i = s.pads.findIndex(function (x) { return x.id === (p === null || p === void 0 ? void 0 : p.id); }); if (s.pads[i + 1]) {
    var n = s.pads[i + 1], visibleIndex = i + 1 < Number(settings.padLayout) ? i + 1 : -1;
    selectPad(n);
    var el = visibleIndex >= 0 ? __spreadArray([], document.querySelectorAll('.pad'), true)[visibleIndex] : null;
    el === null || el === void 0 ? void 0 : el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    playPad(n, el);
} };
if ($('masterVolume'))
    $('masterVolume').oninput = function (e) { return setVol(Number(e.target.value) / 100); };
function setVol(v) { master = clamp(v, 0, 1); if ($('masterVolume'))
    $('masterVolume').value = Math.round(master * 100); if (currentAudio) {
    currentAudio.volume = muted ? 0 : clamp((currentAudio.baseGain || 1) * master, 0, 1);
} renderVolume(); setTimeout(refreshTvUi, 0); }
$('volumeIcon').onclick = function () { muted = !muted; $('volumeIcon').classList.toggle('muted', muted); $('volumeIcon').style.opacity = muted ? .55 : 1; $('volumeIcon').classList.toggle('muted', muted); $('muteBtn').style.opacity = muted ? .55 : 1; if (currentAudio)
    currentAudio.volume = muted ? 0 : clamp((currentAudio.baseGain || 1) * master, 0, 1); };
$('muteBtn').onclick = function () { muted = !muted; $('volumeIcon').classList.toggle('muted', muted); $('muteBtn').style.opacity = muted ? .55 : 1; if (currentAudio) {
    currentAudio.volume = muted ? 0 : clamp((currentAudio.baseGain || 1) * master, 0, 1);
} };
function renderVolume() { var pct = Math.round(master * 100); $('volPct').textContent = pct + "%"; var heights = [5, 7, 9, 11, 13, 15, 17, 19, 21, 23]; $('volBars').innerHTML = heights.map(function (h, i) { return "<span class=\"vbar ".concat(i < pct / 10 ? "" : "off", "\" style=\"height:").concat(h, "px\"></span>"); }).join(""); }
function refreshTvUi() { var on = tvOn; $('tvStatus').textContent = on ? "ON" : "OFF"; $('tvPowerBtn').textContent = on ? "📺 TV Output: ON" : "📺 TV Output: OFF"; $('tvBtn').classList.toggle("active", on); $('tvBtn').setAttribute('aria-expanded', $('tvDrop').classList.contains('open') ? 'true' : 'false'); var p = selectedPad(); $('tvNowTitle').textContent = (p === null || p === void 0 ? void 0 : p.name) || "No cue selected"; $('tvNowInfo').textContent = on ? ((p === null || p === void 0 ? void 0 : p.tvPhotoBlob) ? "Static photo active" : (p === null || p === void 0 ? void 0 : p.videoBlob) ? "Video active" : "No photo/video attached to this cue") : "TV Output is OFF."; }
$('tvBtn').onclick = function (e) { e.stopPropagation(); $('tvDrop').classList.toggle('open'); refreshTvUi(); };
$('tvPowerBtn').onclick = function (e) { e.stopPropagation(); tvOn = !tvOn; if (tvOn) {
    openTvOutput();
    updateTvOutput(selectedPad(), true);
}
else
    clearTvOutput(); refreshTvUi(); };
$('tvOutputBtn').onclick = function (e) { e.stopPropagation(); if (!tvOn)
    tvOn = true; openTvOutput(); updateTvOutput(selectedPad(), true); refreshTvUi(); $('tvDrop').classList.remove('open'); };
$('tvFullscreenBtn').onclick = function (e) { e.stopPropagation(); if (!tvOn)
    tvOn = true; if (openTvOutput()) {
    sendTv({ cmd: 'fullscreen' });
    updateTvOutput(selectedPad(), true);
} refreshTvUi(); $('tvDrop').classList.remove('open'); };
$('tvPhotoUploadBtn').onclick = function (e) { e.stopPropagation(); var p = selectedPad(); if (!p) {
    toast("Select a cue pad first.");
    return;
} $('tvPhotoFile').click(); };
$('tvVideoUploadBtn').onclick = function (e) { e.stopPropagation(); var p = selectedPad(); if (!p) {
    toast("Select a cue pad first.");
    return;
} $('tvVideoFile').click(); };
$('tvHomeBtn').onclick = function (e) { e.stopPropagation(); $('tvDrop').classList.remove('open'); $('tvBtn').classList.remove('active'); $('tvBtn').setAttribute('aria-expanded', 'false'); $('view-home').classList.add('active'); document.querySelectorAll('.view').forEach(function (v) { if (v.id !== 'view-home')
    v.classList.remove('active'); }); document.querySelectorAll('.navbtn[data-view]').forEach(function (b) { return b.classList.remove('active'); }); $('homeBtn').classList.add('active'); };
$('tvPhotoFile').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { var f, p, _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            f = e.target.files[0];
            e.target.value = '';
            p = selectedPad();
            if (!f || !p)
                return [2 /*return*/];
            if (!f.type.startsWith('image/')) {
                toast("Please choose an image file.");
                return [2 /*return*/];
            }
            _a = p;
            return [4 /*yield*/, blobFromFile(f)];
        case 1:
            _a.tvPhotoBlob = _b.sent();
            p.tvPhotoName = f.name;
            p.tvPhotoType = f.type;
            return [4 /*yield*/, save()];
        case 2:
            _b.sent();
            if (tvOn) {
                openTvOutput();
                updateTvOutput(p, true);
            }
            render();
            refreshTvUi();
            toast("Static photo attached to the selected cue.");
            return [2 /*return*/];
    }
}); }); };
$('tvVideoFile').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { var f, p, _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            f = e.target.files[0];
            e.target.value = '';
            p = selectedPad();
            if (!f || !p)
                return [2 /*return*/];
            if (!videoLike(f)) {
                toast("Please choose a supported video file.");
                return [2 /*return*/];
            }
            _a = p;
            return [4 /*yield*/, blobFromFile(f)];
        case 1:
            _a.videoBlob = _b.sent();
            p.videoName = f.name;
            p.videoType = f.type;
            return [4 /*yield*/, save()];
        case 2:
            _b.sent();
            if (tvOn) {
                openTvOutput();
                updateTvOutput(p, true);
            }
            render();
            refreshTvUi();
            toast("Video attached to the selected cue.");
            return [2 /*return*/];
    }
}); }); };
$('closeVideo').onclick = function () { return $('videoModal').classList.remove('open'); };
function goHome() { showView('home'); $('menuDrop').classList.remove('open'); $('tvDrop').classList.remove('open'); $('tvBtn').classList.remove('active'); $('tvBtn').setAttribute('aria-expanded', 'false'); $('homeBtn').classList.add('active'); }
$('menuBtn').onclick = function (e) { e.stopPropagation(); $('menuDrop').classList.toggle('open'); $('tvDrop').classList.remove('open'); };
$('settingsBtn').onclick = function (e) { e.stopPropagation(); $('menuDrop').classList.remove('open'); $('tvDrop').classList.remove('open'); showView('settings'); };
document.addEventListener('click', function (e) { if (!e.target.closest('.menuWrap')) {
    $('menuDrop').classList.remove('open');
    $('tvDrop').classList.remove('open');
} });
document.querySelectorAll('[data-view]').forEach(function (b) { return b.onclick = function () { return showView(b.dataset.view); }; });
$('setlistHomeBtn').onclick = goHome;
$('settingsHomePageBtn').onclick = goHome;
$('exitTopBtn').onclick = function () { stopAll(); try {
    window.open('', '_self');
    window.close();
}
catch (_a) { } setTimeout(function () { if (!document.hidden)
    location.replace('about:blank'); }, 120); };
$('lyricsHomeBtn').onclick = goHome;
$('menuHomeBtn').onclick = function (e) { e.stopPropagation(); goHome(); };
function showView(n) { document.querySelectorAll('.view').forEach(function (v) { return v.classList.toggle('active', v.id === 'view-' + n); }); document.querySelectorAll('.navbtn[data-view]').forEach(function (b) { return b.classList.toggle('active', b.dataset.view === n); }); }
$('newSet').onclick = function () { $('newSetName').value = ''; $('newSetPads').value = 12; $('newSetModal').classList.add('open'); };
$('cancelNewSet').onclick = function () { return $('newSetModal').classList.remove('open'); };
$('createSet').onclick = function () { return __awaiter(_this, void 0, void 0, function () { var name, count, s; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            name = $('newSetName').value.trim() || 'New Setlist', count = clamp(parseInt($('newSetPads').value) || 1, 1, 50);
            s = { id: uid(), name: name, pads: Array.from({ length: count }, function () { return ({ id: uid(), name: "", color: settings.defaultColor, mode: "restart" }); }) };
            state.sets.push(s);
            state.current = s.id;
            state.selected = s.pads[0].id;
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            $('newSetModal').classList.remove('open');
            render();
            renderSetlists();
            showView('home');
            return [2 /*return*/];
    }
}); }); };
function renderSetlists() {
    var _this = this;
    var wrap = $('setlistCards');
    wrap.innerHTML = state.sets.map(function (s) { return "<div class=\"setting\"><h3>".concat(esc(s.name), "</h3><p>").concat(s.pads.length, " pads</p><button class=\"btn primary\" data-open=\"").concat(s.id, "\">Open</button> <button class=\"btn\" data-rename=\"").concat(s.id, "\">Rename</button> <button class=\"btn danger\" data-delete=\"").concat(s.id, "\">Delete</button></div>"); }).join('');
    wrap.querySelectorAll('[data-open]').forEach(function (b) { return b.onclick = function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                stopAll();
                state.current = b.dataset.open;
                state.selected = (_a = currentSet().pads[0]) === null || _a === void 0 ? void 0 : _a.id;
                return [4 /*yield*/, save()];
            case 1:
                _b.sent();
                render();
                renderLyrics();
                showView('home');
                return [2 /*return*/];
        }
    }); }); }; });
    wrap.querySelectorAll('[data-rename]').forEach(function (b) { return b.onclick = function () { return __awaiter(_this, void 0, void 0, function () { var s, n; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                s = state.sets.find(function (x) { return x.id === b.dataset.rename; }), n = prompt('New setlist name:', s.name);
                if (!n) return [3 /*break*/, 2];
                s.name = n;
                return [4 /*yield*/, save()];
            case 1:
                _a.sent();
                render();
                renderSetlists();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    }); }); }; });
    wrap.querySelectorAll('[data-delete]').forEach(function (b) { return b.onclick = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (state.sets.length < 2) {
                    toast('Keep at least one setlist.');
                    return [2 /*return*/];
                }
                if (!confirm('Delete this setlist?')) return [3 /*break*/, 2];
                state.sets = state.sets.filter(function (x) { return x.id !== b.dataset.delete; });
                state.current = state.sets[0].id;
                return [4 /*yield*/, save()];
            case 1:
                _a.sent();
                render();
                renderSetlists();
                renderLyrics();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    }); }); }; });
}
function renderLyrics() { var _a; var s = currentSet(), list = $("lyricsList"); if (!s || !list)
    return; var wasAuto = lyricAutoScroll; if (lyricScrollTimer) {
    cancelAnimationFrame(lyricScrollTimer);
    clearInterval(lyricScrollTimer);
    lyricScrollTimer = null;
} list.innerHTML = ""; s.pads.forEach(function (p, i) { var b = document.createElement("button"); b.className = "lyricitem" + (p.id === state.selected ? " active" : "") + ((currentAudio === null || currentAudio === void 0 ? void 0 : currentAudio.padId) === p.id ? " playing" : ""); b.innerHTML = "<b>".concat(i + 1, ". ").concat(esc(p.name || "Empty Pad"), "</b><br><span style=\"font-size:11px\">").concat(p.lyrics ? "Lyrics / notes" : "No lyrics", "</span>"); b.onclick = function () { selectPad(p); var el = __spreadArray([], document.querySelectorAll(".pad"), true).find(function (x) { return x.dataset.id === p.id; }) || null; playPad(p, el); resetLyricScroll(); }; list.appendChild(b); }); var p = selectedPad(); $("lyricsTitle").textContent = (p === null || p === void 0 ? void 0 : p.name) || "Select a cue"; $("lyricsCue").textContent = p ? "Cue ".concat(s.pads.indexOf(p) + 1) : "No cue selected"; $("lyricsBody").textContent = (p === null || p === void 0 ? void 0 : p.lyrics) || "No lyrics or notes saved for this cue."; $("lyricsFileName").textContent = (p === null || p === void 0 ? void 0 : p.lyricsFileName) || ""; $("lyricsMeta").textContent = "Key ".concat((p === null || p === void 0 ? void 0 : p.key) || "—", " \u2022 BPM ").concat((p === null || p === void 0 ? void 0 : p.bpm) || "—").concat(((_a = p === null || p === void 0 ? void 0 : p.keyChanges) === null || _a === void 0 ? void 0 : _a.length) ? " \u2022 ".concat(p.keyChanges.map(function (x) { return x.to + " @ " + fmtTime(x.time); }).join(", ")) : ""); if (wasAuto)
    startLyricAutoScroll();
else
    updateLyricScrollUi(); }
function resetLyricScroll() { var stage = $("lyricstage"); if (stage)
    stage.scrollTop = 0; }
function lyricSpeedFactor() { var _a; var v = Number(((_a = $("lyricsScrollSpeed")) === null || _a === void 0 ? void 0 : _a.value) || 5); return v <= 5 ? 0.35 + ((v - 1) / 4) * 0.65 : 1 + ((v - 5) / 5) * 1.2; }
function updateLyricScrollUi() { var b = $("lyricsAutoScrollBtn"), m = $("lyricsManualScrollBtn"), v = $("lyricsScrollSpeed"), n = $("lyricsScrollSpeedValue"), s = $("lyricsScrollStatus"); if (!b)
    return; var x = Number((v === null || v === void 0 ? void 0 : v.value) || 5); if (n)
    n.textContent = x; if (s)
    s.textContent = lyricAutoScroll ? (x === 5 ? "Track Sync" : "Speed ".concat(x)) : "Manual"; b.textContent = lyricAutoScroll ? "⏸ Stop Auto Scroll" : "▶ Auto Scroll"; b.classList.toggle("primary", lyricAutoScroll); m.classList.toggle("primary", !lyricAutoScroll); }
function stopLyricAutoScroll(ui) {
    if (ui === void 0) { ui = true; }
    lyricAutoScroll = false;
    if (lyricScrollTimer) {
        cancelAnimationFrame(lyricScrollTimer);
        clearInterval(lyricScrollTimer);
        lyricScrollTimer = null;
    }
    if (ui)
        updateLyricScrollUi();
}
function startLyricAutoScroll() { var stage = $("lyricstage"); if (!stage)
    return; lyricAutoScroll = true; if (lyricScrollTimer) {
    cancelAnimationFrame(lyricScrollTimer);
    clearInterval(lyricScrollTimer);
} var tick = function () { if (!lyricAutoScroll) {
    lyricScrollTimer = null;
    return;
} var max = Math.max(0, stage.scrollHeight - stage.clientHeight); if (max > 0) {
    var dur = currentAudio === null || currentAudio === void 0 ? void 0 : currentAudio.duration;
    var progress = void 0;
    if (Number.isFinite(dur) && dur > 0) {
        progress = clamp((currentAudio.currentTime || 0) / dur, 0, 1) * lyricSpeedFactor();
        stage.scrollTop = Math.min(max, max * progress);
    }
    else {
        stage.scrollTop = Math.min(max, stage.scrollTop + 2.4 * lyricSpeedFactor());
    }
    if (stage.scrollTop >= max - 1) {
        stopLyricAutoScroll();
        return;
    }
} lyricScrollTimer = requestAnimationFrame(tick); }; lyricScrollTimer = requestAnimationFrame(tick); updateLyricScrollUi(); }
function estimateBpmAndKey(blob) {
    return __awaiter(this, void 0, void 0, function () { function keyFor(startSec, lenSec) { var chroma = Array(12).fill(0), a = Math.floor(startSec * sr_1), z = Math.min(d_1.length, Math.floor((startSec + lenSec) * sr_1)), win = Math.min(4096, Math.floor(sr_1 * .1)), hop = Math.max(1024, Math.floor(sr_1 * .2)); var bases = []; for (var pc = 0; pc < 12; pc++) {
        var f = 440 * Math.pow(2, (pc - 9) / 12);
        bases.push(f);
    } for (var pos = a; pos < z; pos += hop) {
        var n = Math.min(win, z - pos);
        for (var pc = 0; pc < 12; pc++) {
            var re = 0, im = 0;
            for (var k = 0; k < n; k += 2) {
                var x = d_1[pos + k], t = k / sr_1, ph = 2 * Math.PI * bases[pc] * t;
                re += x * Math.cos(ph);
                im -= x * Math.sin(ph);
            }
            chroma[pc] += Math.hypot(re, im);
        }
    } var idx = 0; for (var i = 1; i < 12; i++)
        if (chroma[i] > chroma[idx])
            idx = i; return chroma[idx] > 0 ? names_1[idx] : null; } var AC, ac, buf, sr_1, d_1, duration, _a, _b, step, energies, i, sum, end, j, peaks, i, e, bpm, names_1, key, changes, prev, t, k, _c; return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 4, , 5]);
                AC = window.AudioContext || window.webkitAudioContext;
                if (!AC)
                    return [2 /*return*/, {}];
                ac = new AC();
                _b = (_a = ac).decodeAudioData;
                return [4 /*yield*/, blob.arrayBuffer()];
            case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
            case 2:
                buf = _d.sent(), sr_1 = buf.sampleRate, d_1 = buf.getChannelData(0), duration = buf.duration;
                step = Math.max(1, Math.floor(sr_1 * .02)), energies = [];
                for (i = 0; i < d_1.length; i += step) {
                    sum = 0, end = Math.min(d_1.length, i + step);
                    for (j = i; j < end; j++)
                        sum += d_1[j] * d_1[j];
                    energies.push(Math.sqrt(sum / Math.max(1, end - i)));
                }
                peaks = 0;
                for (i = 2; i < energies.length - 2; i++) {
                    e = energies[i];
                    if (e > energies[i - 1] * 1.18 && e > energies[i - 2] * 1.18 && e > energies[i + 1] * 1.05 && e > energies[i + 2] * 1.05)
                        peaks++;
                }
                bpm = duration > 8 ? Math.round(clamp(peaks / (duration / 60), 55, 180)) : null;
                names_1 = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
                key = keyFor(0, Math.min(45, duration)), changes = [];
                if (duration > 60) {
                    prev = key;
                    for (t = 45; t < duration; t += 30) {
                        k = keyFor(t, Math.min(30, duration - t));
                        if (k && prev && k !== prev) {
                            changes.push({ time: Math.round(t), from: prev, to: k });
                            prev = k;
                        }
                    }
                }
                return [4 /*yield*/, ac.close()];
            case 3:
                _d.sent();
                return [2 /*return*/, { bpm: bpm, key: key, keyChanges: changes }];
            case 4:
                _c = _d.sent();
                return [2 /*return*/, {}];
            case 5: return [2 /*return*/];
        }
    }); });
}
function applyAudioMeta(p) {
    return __awaiter(this, void 0, void 0, function () { var meta; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(p === null || p === void 0 ? void 0 : p.audioBlob))
                    return [2 /*return*/];
                return [4 /*yield*/, estimateBpmAndKey(p.audioBlob)];
            case 1:
                meta = _a.sent();
                if (meta.bpm)
                    p.bpm = meta.bpm;
                if (meta.key)
                    p.key = meta.key;
                if (meta.keyChanges)
                    p.keyChanges = meta.keyChanges;
                return [4 /*yield*/, save()];
            case 2:
                _a.sent();
                renderLyrics();
                return [2 /*return*/];
        }
    }); });
}
function importLyricsFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var p, text, name_1, pdfjs, pdf, _a, _b, pages, i, page, content, e_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    p = selectedPad();
                    if (!p) {
                        toast('Select a cue first.');
                        return [2 /*return*/];
                    }
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 15, , 16]);
                    text = '';
                    name_1 = file.name || '';
                    if (!(file.type === 'application/pdf' || ext(name_1) === 'pdf')) return [3 /*break*/, 11];
                    if (!!window.pdfjsLib) return [3 /*break*/, 3];
                    return [4 /*yield*/, new Promise(function (resolve, reject) { var sc = document.createElement('script'); sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.js'; sc.onload = resolve; sc.onerror = reject; document.head.appendChild(sc); })];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    pdfjs = window.pdfjsLib;
                    if (!pdfjs)
                        throw Error('PDF reader unavailable.');
                    pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js';
                    _b = (_a = pdfjs).getDocument;
                    _c = {};
                    return [4 /*yield*/, file.arrayBuffer()];
                case 4: return [4 /*yield*/, _b.apply(_a, [(_c.data = _d.sent(), _c)]).promise];
                case 5:
                    pdf = _d.sent();
                    pages = [];
                    i = 1;
                    _d.label = 6;
                case 6:
                    if (!(i <= pdf.numPages)) return [3 /*break*/, 10];
                    return [4 /*yield*/, pdf.getPage(i)];
                case 7:
                    page = _d.sent();
                    return [4 /*yield*/, page.getTextContent()];
                case 8:
                    content = _d.sent();
                    pages.push(content.items.map(function (x) { return x.str; }).join(' '));
                    _d.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 6];
                case 10:
                    text = pages.join('\n\n');
                    return [3 /*break*/, 13];
                case 11: return [4 /*yield*/, file.text()];
                case 12:
                    text = _d.sent();
                    if (ext(name_1) === 'rtf')
                        text = text.replace(/\\[a-z]+\d* ?/gi, '').replace(/[{}]/g, '');
                    _d.label = 13;
                case 13:
                    if (!text.trim())
                        throw Error('No readable text found.');
                    p.lyrics = text;
                    p.lyricsFileName = name_1;
                    return [4 /*yield*/, save()];
                case 14:
                    _d.sent();
                    renderLyrics();
                    toast('Lyrics imported to the selected cue.');
                    return [3 /*break*/, 16];
                case 15:
                    e_1 = _d.sent();
                    console.error(e_1);
                    toast('Could not read that lyrics file on this device. TXT/MD/RTF are supported locally; PDF uses the browser PDF reader.');
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
$('importLyricsBtn').onclick = function () { if (!selectedPad()) {
    toast('Select a cue first.');
    return;
} $('lyricsImportModal').classList.add('open'); };
$('closeLyricsImport').onclick = function () { return $('lyricsImportModal').classList.remove('open'); };
$('lyricsManualImportBtn').onclick = function () { var p = selectedPad(); if (!p)
    return; $('lyricsImportModal').classList.remove('open'); $('lyricsManualCueHint').textContent = "Lyrics for: ".concat(p.name || 'Selected cue'); $('lyricsManualText').value = p.lyrics || ''; $('lyricsManualModal').classList.add('open'); };
$('cancelLyricsManual').onclick = function () { return $('lyricsManualModal').classList.remove('open'); };
$('saveLyricsManual').onclick = function () { return __awaiter(_this, void 0, void 0, function () { var p; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            p = selectedPad();
            if (!p)
                return [2 /*return*/];
            p.lyrics = $('lyricsManualText').value.trim();
            p.lyricsFileName = 'Manual lyrics';
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            $('lyricsManualModal').classList.remove('open');
            renderLyrics();
            toast('Lyrics saved to the selected cue.');
            return [2 /*return*/];
    }
}); }); };
$('lyricsPdfImportBtn').onclick = function () { $('lyricsImportModal').classList.remove('open'); $('lyricsFile').click(); };
$('lyricsFile').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            if (!e.target.files[0]) return [3 /*break*/, 2];
            return [4 /*yield*/, importLyricsFile(e.target.files[0])];
        case 1:
            _a.sent();
            _a.label = 2;
        case 2:
            e.target.value = '';
            return [2 /*return*/];
    }
}); }); };
$('lyricsAutoScrollBtn').onclick = function () { return lyricAutoScroll ? stopLyricAutoScroll() : startLyricAutoScroll(); };
$('lyricsManualScrollBtn').onclick = function () { return stopLyricAutoScroll(); };
$('lyricsScrollSpeed').oninput = function () { updateLyricScrollUi(); if (lyricAutoScroll)
    startLyricAutoScroll(); };
$('lyricstage').addEventListener('wheel', function () { if (lyricAutoScroll)
    stopLyricAutoScroll(); }, { passive: true });
$('lyricstage').addEventListener('touchstart', function () { if (lyricAutoScroll)
    stopLyricAutoScroll(); }, { passive: true });
$('lyricsPlayBtn').onclick = function () { var p = selectedPad(); if (p) {
    var el = __spreadArray([], document.querySelectorAll('.pad'), true).find(function (x) { return x.dataset.id === p.id; }) || null;
    playPad(p, el);
    if (lyricAutoScroll)
        startLyricAutoScroll();
} };
$('lyricsStopBtn').onclick = function () { stopAll(); stopLyricAutoScroll(); };
$('padLayout').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { var s; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            settings.padLayout = Number(e.target.value);
            s = currentSet();
            while (s.pads.length < settings.padLayout && s.pads.length < 50)
                s.pads.push({ id: uid(), name: "", color: settings.defaultColor, mode: "restart" });
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            render();
            return [2 /*return*/];
    }
}); }); };
$('finishMode').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            settings.finishMode = e.target.value;
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); };
$('displayTheme').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            settings.theme = e.target.value;
            applySettings();
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            return [2 /*return*/];
    }
}); }); };
$('padSize').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            settings.padSize = e.target.value;
            applySettings();
            return [4 /*yield*/, save()];
        case 1:
            _a.sent();
            render();
            return [2 /*return*/];
    }
}); }); };
$('matchAll').onclick = function () { return __awaiter(_this, void 0, void 0, function () { var s, n, _i, _a, p, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            s = currentSet();
            $('matchStatus').textContent = 'Matching tracks…';
            n = 0;
            _i = 0, _a = s.pads;
            _c.label = 1;
        case 1:
            if (!(_i < _a.length)) return [3 /*break*/, 4];
            p = _a[_i];
            if (!p.audioBlob) return [3 /*break*/, 3];
            _b = p;
            return [4 /*yield*/, analyse(p.audioBlob)];
        case 2:
            _b.gainDb = _c.sent();
            n++;
            _c.label = 3;
        case 3:
            _i++;
            return [3 /*break*/, 1];
        case 4: return [4 /*yield*/, save()];
        case 5:
            _c.sent();
            $('matchStatus').textContent = "Matched ".concat(n, " track").concat(n === 1 ? '' : 's', " for playback.");
            toast('Volume sync complete.');
            return [2 /*return*/];
    }
}); }); };
$('persistBtn').onclick = function () { return __awaiter(_this, void 0, void 0, function () { var ok; var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            if (!((_a = navigator.storage) === null || _a === void 0 ? void 0 : _a.persist)) return [3 /*break*/, 2];
            return [4 /*yield*/, navigator.storage.persist()];
        case 1:
            ok = _b.sent();
            $('storageStatus').textContent = ok ? 'Persistent storage requested.' : 'Browser did not grant persistent storage.';
            _b.label = 2;
        case 2: return [2 /*return*/];
    }
}); }); };
$('clearData').onclick = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            if (!confirm('Delete all ShowCue setlists and imported media from this browser?')) return [3 /*break*/, 3];
            return [4 /*yield*/, put('sets', [])];
        case 1:
            _a.sent();
            return [4 /*yield*/, put('library', { audio: [], video: [] })];
        case 2:
            _a.sent();
            location.reload();
            _a.label = 3;
        case 3: return [2 /*return*/];
    }
}); }); };
$('importTrack').onclick = function () { $('trackFiles').click(); $('menuDrop').classList.remove('open'); };
$('trackFiles').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, importTracks(e.target.files)];
        case 1:
            _a.sent();
            e.target.value = '';
            return [2 /*return*/];
    }
}); }); };
$('importVideo').onclick = function () { $('videoFiles').click(); $('menuDrop').classList.remove('open'); };
$('videoFiles').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, importVideos(e.target.files)];
        case 1:
            _a.sent();
            e.target.value = '';
            return [2 /*return*/];
    }
}); }); };
$('closeLibrary').onclick = function () { return $('libraryModal').classList.remove('open'); };
$('manualBtn').onclick = function () { $('manualModal').classList.add('open'); $('menuDrop').classList.remove('open'); };
$('closeManual').onclick = function () { return $('manualModal').classList.remove('open'); };
function exportPlaylist() {
    return __awaiter(this, void 0, void 0, function () { var payload, _i, _a, s, ns, _b, _c, p, q, f, _d, f, _e, f, _f, blob, a; var _g; return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                payload = { app: 'ShowCue', version: 5, exported: new Date().toISOString(), settings: settings, sets: [] };
                _i = 0, _a = state.sets;
                _h.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 12];
                s = _a[_i];
                ns = __assign(__assign({}, s), { pads: [] });
                _b = 0, _c = s.pads;
                _h.label = 2;
            case 2:
                if (!(_b < _c.length)) return [3 /*break*/, 10];
                p = _c[_b];
                q = __assign({}, p);
                if (!p.audioBlob) return [3 /*break*/, 4];
                f = new File([p.audioBlob], p.audioName || 'audio');
                _d = q;
                return [4 /*yield*/, fileToData(f)];
            case 3:
                _d.audioData = _h.sent();
                delete q.audioBlob;
                _h.label = 4;
            case 4:
                if (!p.videoBlob) return [3 /*break*/, 6];
                f = new File([p.videoBlob], p.videoName || 'video');
                _e = q;
                return [4 /*yield*/, fileToData(f)];
            case 5:
                _e.videoData = _h.sent();
                delete q.videoBlob;
                _h.label = 6;
            case 6:
                if (!p.tvPhotoBlob) return [3 /*break*/, 8];
                f = new File([p.tvPhotoBlob], p.tvPhotoName || 'photo');
                _f = q;
                return [4 /*yield*/, fileToData(f)];
            case 7:
                _f.tvPhotoData = _h.sent();
                delete q.tvPhotoBlob;
                _h.label = 8;
            case 8:
                ns.pads.push(q);
                _h.label = 9;
            case 9:
                _b++;
                return [3 /*break*/, 2];
            case 10:
                payload.sets.push(ns);
                _h.label = 11;
            case 11:
                _i++;
                return [3 /*break*/, 1];
            case 12:
                blob = new Blob([JSON.stringify(payload)], { type: 'application/json' }), a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = (((_g = currentSet()) === null || _g === void 0 ? void 0 : _g.name) || 'ShowCue-Playlist') + '.showcue.json';
                a.click();
                setTimeout(function () { return URL.revokeObjectURL(a.href); }, 1000);
                return [2 /*return*/];
        }
    }); });
}
function importPlaylist(file) {
    return __awaiter(this, void 0, void 0, function () { var txt, p, _i, _a, s, _b, _c, q, _d, _e, _f; var _g; return __generator(this, function (_h) {
        switch (_h.label) {
            case 0: return [4 /*yield*/, file.text()];
            case 1:
                txt = _h.sent(), p = JSON.parse(txt);
                if (!(p === null || p === void 0 ? void 0 : p.sets))
                    throw Error('Invalid ShowCue playlist');
                _i = 0, _a = p.sets;
                _h.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 12];
                s = _a[_i];
                _b = 0, _c = s.pads || [];
                _h.label = 3;
            case 3:
                if (!(_b < _c.length)) return [3 /*break*/, 11];
                q = _c[_b];
                if (!q.audioData) return [3 /*break*/, 5];
                _d = q;
                return [4 /*yield*/, dataToBlob(q.audioData)];
            case 4:
                _d.audioBlob = _h.sent();
                _h.label = 5;
            case 5:
                if (!q.videoData) return [3 /*break*/, 7];
                _e = q;
                return [4 /*yield*/, dataToBlob(q.videoData)];
            case 6:
                _e.videoBlob = _h.sent();
                _h.label = 7;
            case 7:
                if (!q.tvPhotoData) return [3 /*break*/, 9];
                _f = q;
                return [4 /*yield*/, dataToBlob(q.tvPhotoData)];
            case 8:
                _f.tvPhotoBlob = _h.sent();
                _h.label = 9;
            case 9:
                delete q.audioData;
                delete q.videoData;
                delete q.tvPhotoData;
                _h.label = 10;
            case 10:
                _b++;
                return [3 /*break*/, 3];
            case 11:
                _i++;
                return [3 /*break*/, 2];
            case 12:
                state.sets = p.sets;
                settings = Object.assign(settings, p.settings || {});
                state.current = (_g = state.sets[0]) === null || _g === void 0 ? void 0 : _g.id;
                return [4 /*yield*/, save()];
            case 13:
                _h.sent();
                applySettings();
                render();
                renderSetlists();
                renderLyrics();
                toast('Playlist loaded.');
                return [2 /*return*/];
        }
    }); });
}
$('exportPlaylist').onclick = function () { exportPlaylist().catch(function (e) { return toast('Could not export playlist.'); }); $('menuDrop').classList.remove('open'); };
$('loadPlaylist').onclick = function () { $('playlistFile').click(); $('menuDrop').classList.remove('open'); };
$('playlistFile').onchange = function (e) { return __awaiter(_this, void 0, void 0, function () { var err_2; return __generator(this, function (_a) {
    switch (_a.label) {
        case 0:
            if (!e.target.files[0]) return [3 /*break*/, 4];
            _a.label = 1;
        case 1:
            _a.trys.push([1, 3, , 4]);
            return [4 /*yield*/, importPlaylist(e.target.files[0])];
        case 2:
            _a.sent();
            return [3 /*break*/, 4];
        case 3:
            err_2 = _a.sent();
            toast('Invalid ShowCue playlist file.');
            return [3 /*break*/, 4];
        case 4:
            e.target.value = '';
            return [2 /*return*/];
    }
}); }); };
if ('serviceWorker' in navigator)
    navigator.serviceWorker.register('sw.js').catch(function () { });
boot().catch(function (e) { console.error(e); toast('ShowCue could not open its local database.'); });
