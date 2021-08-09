/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Client/ts/Colors.ts":
/*!*****************************!*\
  !*** ./Client/ts/Colors.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RGBAModel": () => (/* binding */ RGBAModel),
/* harmony export */   "HColor": () => (/* binding */ HColor),
/* harmony export */   "rgb": () => (/* binding */ rgb),
/* harmony export */   "rgba": () => (/* binding */ rgba),
/* harmony export */   "HumanColorSwatch": () => (/* binding */ HumanColorSwatch),
/* harmony export */   "changeTheme": () => (/* binding */ changeTheme),
/* harmony export */   "whichTheme": () => (/* binding */ whichTheme),
/* harmony export */   "getAverageRGB": () => (/* binding */ getAverageRGB)
/* harmony export */ });
/* harmony import */ var _ViewController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewController */ "./Client/ts/ViewController.ts");

class RGBAModel {
    constructor(r, g, b, a = 1) {
        if (r < 0)
            r = 0;
        else if (r > 255)
            r = 255;
        if (g < 0)
            g = 0;
        else if (g > 255)
            g = 255;
        if (b < 0)
            b = 0;
        else if (b > 255)
            b = 255;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    red(r) {
        if (r < 0)
            r = 0;
        else if (r > 255)
            r = 255;
        this.r = r;
        return this;
    }
    green(g) {
        if (g < 0)
            g = 0;
        else if (g > 255)
            g = 255;
        this.g = g;
        return this;
    }
    blue(b) {
        if (b < 0)
            b = 0;
        else if (b > 255)
            b = 255;
        this.b = b % 256;
        return this;
    }
    alpha(a) {
        this.a = a;
        return this;
    }
    toString() {
        if (this.a != 1)
            return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    static copy(rgba) {
        return new RGBAModel(rgba.r, rgba.g, rgba.b, rgba.a);
    }
}
RGBAModel.WHITE = new RGBAModel(255, 255, 255);
RGBAModel.BLACK = new RGBAModel(0, 0, 0);
function HColor(color) {
    if (colorTheme === 'light') {
        return RGBAModel.copy(HumanColorSwatch.light[color]);
    }
    else {
        return RGBAModel.copy(HumanColorSwatch.dark[color]);
    }
}
function rgb(r, g, b) {
    return new RGBAModel(r, g, b);
}
function rgba(r, g, b, a) {
    return new RGBAModel(r, g, b, a);
}
const HumanColorSwatch = {
    light: {
        blue: rgb(0, 122, 255),
        brown: rgb(162, 132, 94),
        cyan: rgb(50, 173, 230),
        green: rgb(52, 199, 89),
        indigo: rgb(88, 86, 214),
        mint: rgb(0, 199, 190),
        orange: rgb(255, 149, 0),
        pink: rgb(255, 45, 85),
        purple: rgb(175, 82, 222),
        red: rgb(255, 59, 48),
        teal: rgb(48, 176, 199),
        yellow: rgb(255, 204, 0),
        gray: rgb(142, 142, 147),
        gray2: rgb(174, 174, 178),
        gray3: rgb(199, 199, 204),
        gray4: rgb(209, 209, 214),
        gray5: rgb(229, 229, 234),
        gray6: rgb(242, 242, 247),
        foreground: rgb(0, 0, 0),
        background: rgb(255, 255, 255),
    },
    dark: {
        blue: rgb(10, 132, 255),
        brown: rgb(172, 142, 104),
        cyan: rgb(100, 210, 255),
        green: rgb(48, 209, 88),
        indigo: rgb(94, 92, 230),
        mint: rgb(102, 212, 207),
        orange: rgb(255, 159, 10),
        pink: rgb(255, 55, 95),
        purple: rgb(191, 90, 242),
        red: rgb(255, 69, 58),
        teal: rgb(64, 200, 224),
        yellow: rgb(255, 214, 10),
        gray: rgb(142, 142, 147),
        gray2: rgb(99, 99, 102),
        gray3: rgb(72, 72, 74),
        gray4: rgb(58, 58, 60),
        gray5: rgb(44, 44, 46),
        gray6: rgb(28, 28, 30),
        foreground: rgb(255, 255, 255),
        background: rgb(0, 0, 0),
    },
};
let colorTheme = (() => {
    const tmp = localStorage.getItem('hi://theme');
    if (tmp == 'light' || tmp == 'dark')
        return tmp;
    return 'light';
})();
function changeTheme(theme) {
    colorTheme = theme;
    _ViewController__WEBPACK_IMPORTED_MODULE_0__.ViewControllerData.controllers.forEach(controller => controller.signal('color'));
    localStorage.setItem('hi://theme', colorTheme);
}
function whichTheme() {
    return colorTheme;
}
/**
 * From: https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript
 *
 * @export
 * @param {any} imgEl
 * @returns
 */
function getAverageRGB(imgEl) {
    const blockSize = 5, // only visit every 5 pixels
    canvas = document.createElement('canvas'), context = canvas.getContext && canvas.getContext('2d'), rgb = new RGBAModel(0, 0, 0);
    let data, i = -4, count = 0;
    if (!context) {
        return rgb;
    }
    const height = (canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height);
    const width = (canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width);
    context.drawImage(imgEl, 0, 0);
    try {
        data = context.getImageData(0, 0, width, height);
    }
    catch (e) {
        /* security error, img on diff domain */
        return rgb;
    }
    const length = data.data.length;
    while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
    }
    // ~~ used to floor values
    rgb.r = ~~(rgb.r / count);
    rgb.g = ~~(rgb.g / count);
    rgb.b = ~~(rgb.b / count);
    return rgb;
}


/***/ }),

/***/ "./Client/ts/Components/Basics.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/Basics.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FontWeight": () => (/* binding */ FontWeight),
/* harmony export */   "TextContent": () => (/* binding */ TextContent),
/* harmony export */   "Hyperlink": () => (/* binding */ Hyperlink),
/* harmony export */   "Checkbox": () => (/* binding */ Checkbox),
/* harmony export */   "RadioButton": () => (/* binding */ RadioButton),
/* harmony export */   "RadioGroup": () => (/* binding */ RadioGroup),
/* harmony export */   "ClickButton": () => (/* binding */ ClickButton),
/* harmony export */   "InlineCode": () => (/* binding */ InlineCode),
/* harmony export */   "BlockCode": () => (/* binding */ BlockCode)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");
/* harmony import */ var _Types_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Types/states */ "./Client/ts/Types/states.ts");




var FontWeight;
(function (FontWeight) {
    FontWeight[FontWeight["UltraLight"] = 100] = "UltraLight";
    FontWeight[FontWeight["Light"] = 200] = "Light";
    FontWeight[FontWeight["DemiLight"] = 300] = "DemiLight";
    FontWeight[FontWeight["Regular"] = 400] = "Regular";
    FontWeight[FontWeight["Medium"] = 500] = "Medium";
    FontWeight[FontWeight["DemiBold"] = 600] = "DemiBold";
    FontWeight[FontWeight["Bold"] = 700] = "Bold";
    FontWeight[FontWeight["Heavy"] = 800] = "Heavy";
    FontWeight[FontWeight["UltraHeavy"] = 900] = "UltraHeavy";
})(FontWeight || (FontWeight = {}));
class TextContent extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(text) {
        super('span');
        this.text = (0,_Types_states__WEBPACK_IMPORTED_MODULE_3__.StateObject)({
            value: '',
        }, () => {
            this.body.textContent = this.text.value;
        });
        this.text.value = text;
    }
    lineHeight(height) {
        this.body.style.lineHeight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.sizing)(height);
        return this;
    }
    weight(fontWeight) {
        this.body.style.fontWeight = `${fontWeight}`;
        return this;
    }
}
class Hyperlink extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(text) {
        super('a');
        this.text = (0,_Types_states__WEBPACK_IMPORTED_MODULE_3__.StateObject)({
            value: '',
        }, () => {
            this.body.textContent = this.text.value;
        });
        this.text.value = text;
    }
}
class Checkbox extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('ion-icon');
        this.state = (0,_Types_states__WEBPACK_IMPORTED_MODULE_3__.StateObject)({ checked: false }, () => {
            this.body.setAttribute('name', this.state.checked ? 'checkbox' : 'square-outline');
        });
        this.body.setAttribute('name', 'square-outline');
        this.body.addEventListener('click', () => {
            this.state.checked = !this.state.checked;
        });
    }
    setChecked(value) {
        this.state.checked = value;
        return this;
    }
    isChecked() {
        return this.state.checked;
    }
    toggle() {
        this.state.checked = !this.state.checked;
        return this.state.checked;
    }
    whenClicked(callback) {
        this.body.addEventListener('click', (browserEvent) => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
}
class RadioButton extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('ion-icon');
        this.state = (0,_Types_states__WEBPACK_IMPORTED_MODULE_3__.StateObject)({ selected: false }, () => {
            this.body.setAttribute('name', this.state.selected ? 'radio-button-on' : 'radio-button-off');
        });
        this.body.setAttribute('name', 'radio-button-off');
        this.body.addEventListener('click', () => {
            this.state.selected = !this.state.selected;
        });
    }
    setSelected(value) {
        this.state.selected = value;
        return this;
    }
    isSelected() {
        return this.state.selected;
    }
    toggle() {
        this.state.selected = !this.state.selected;
        return this;
    }
    whenClicked(callback) {
        this.body.addEventListener('click', (browserEvent) => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
}
class RadioGroup {
    constructor(...radioButtons) {
        this.radios = radioButtons;
        this.radios.forEach(radio => {
            radio.whenClicked(() => {
                this.radios.forEach(otherRadio => {
                    if (otherRadio != radio)
                        otherRadio.setSelected(false);
                });
            });
        });
    }
    getSelected() {
        for (const radio of this.radios)
            if (radio.isSelected())
                return radio;
        return null;
    }
}
class ClickButton extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = (0,_Colors__WEBPACK_IMPORTED_MODULE_2__.HColor)('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = _Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm} ${_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm}`;
    }
    whenClicked(callback) {
        this.body.addEventListener('click', browserEvent => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
    noOutline() {
        this.body.style.outline = 'none';
        return this;
    }
}
class InlineCode extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(text) {
        super('code');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }
    write(text) {
        this.body.innerText += text;
        return this;
    }
    overwrite(text) {
        this.body.innerText = text;
        return this;
    }
}
class BlockCode extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(text) {
        super('pre');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }
    write(text) {
        this.body.innerText += text;
        return this;
    }
    overwrite(text) {
        this.body.innerText = text;
        return this;
    }
}


/***/ }),

/***/ "./Client/ts/Components/DevKit.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/DevKit.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Preview": () => (/* binding */ Preview)
/* harmony export */ });
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Basics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Graphics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Overlays__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Overlays */ "./Client/ts/Components/Overlays.ts");
/* harmony import */ var _Stacks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Whitespace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Whitespace */ "./Client/ts/Components/Whitespace.ts");







class Preview extends _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack {
    constructor(content) {
        super(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(Preview.OptionButton('toggle-contrast-button', 'contrast-outline').whenClicked(() => {
            this.viewerSettings.contrastToggle = !this.viewerSettings.contrastToggle;
        }), Preview.OptionButton('filter-properties-button', 'filter-circle-outline').whenClicked(() => {
            const overlay = new _Overlays__WEBPACK_IMPORTED_MODULE_4__.Overlay(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.Checkbox()
                .padding(5)
                .setChecked(this.viewerSettings.propertyFilters.dimensions)
                .whenClicked(() => {
                this.viewerSettings.propertyFilters.dimensions =
                    !this.viewerSettings.propertyFilters.dimensions;
            }), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Dimensions')), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.Checkbox()
                .padding(5)
                .setChecked(this.viewerSettings.propertyFilters.padding)
                .whenClicked(() => {
                this.viewerSettings.propertyFilters.padding =
                    !this.viewerSettings.propertyFilters.padding;
            }), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Padding')), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.Checkbox().padding(5), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Description')))
                .alignStart()
                .textStart(), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.ClickButton(new _Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('close-circle-outline').font('lg'))
                .margin({ top: 50 })
                .whenClicked(() => overlay.destroy()))));
        }))
            .rounded({ top: { left: 10, right: 10 }, bottom: { left: 0, right: 0 } })
            .background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5'))
            .addClass('preview-options'), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(content)
            .border({ size: 4, style: 'dashed', color: (0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') })
            .borderTop({ style: 'solid' })
            .addClass('preview-canvas'), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer(), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(Preview.dimensionSub('width').padding(), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent(' by '), Preview.dimensionSub('height').padding()).id('component-dimensions'), new _Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer(), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('•').id('component-padding').font('lg'), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Padding').font('sm').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')))
            .padding()
            .id('component-padding-wrapper'), new _Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer()), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('•').id('component-name').font('lg'), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Component').font('sm').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).padding(), new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('•').id('component-id').font('lg'), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('ID').font('sm').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).padding()), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Description').font('sm').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('•').id('component-description')).padding());
        this.dimensions = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            width: 0,
            height: 0,
            padding: '',
        }, property => {
            if (property == 'width' || property == 'height')
                this.getViewById(`component-${property}`).text.value =
                    (property == 'width' ? this.dimensions.width : this.dimensions.height) + '';
            else if (property == 'padding')
                this.getViewById('component-padding').text.value = this.dimensions.padding || '•';
        });
        this.componentInfo = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            name: '',
            id: '',
            description: '',
            padding: '',
            margin: '',
        }, property => {
            switch (property) {
                case 'name':
                    this.getViewById('component-name').text.value = this.componentInfo.name || '•';
                    break;
                case 'id':
                    this.getViewById('component-id').text.value = this.componentInfo.id || '•';
                    break;
                case 'description':
                    this.getViewById('component-description').text.value =
                        this.componentInfo.description || '•';
                    break;
            }
        });
        this.viewerSettings = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            contrastToggle: false,
            propertyFilters: {
                dimensions: true,
                padding: true,
                description: true,
            },
        }, property => {
            if (property == 'contrastToggle')
                this.getViewById('toggle-contrast-button')?.foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)(this.viewerSettings.contrastToggle ? 'green' : 'gray'));
            if (property == 'dimensions')
                if (this.viewerSettings.propertyFilters.dimensions)
                    this.getViewById('component-dimensions').nullify();
                else
                    this.getViewById('component-dimensions').dnull();
            if (property == 'padding')
                if (this.viewerSettings.propertyFilters.padding)
                    this.getViewById('component-padding-wrapper').nullify();
                else
                    this.getViewById('component-padding-wrapper').dnull();
        });
        Preview.enableHover(content, this);
    }
    handle(data) {
        if (data == 'color') {
            this.getViewsByClass('preview-canvas').forEach(canvas => canvas.border({ color: (0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') }));
            this.getViewsByClass('preview-options').forEach(wrapper => wrapper.background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5')));
        }
    }
    static enableHover(view, exampleViewer) {
        view.whenMouseOver(ev => {
            exampleViewer.dimensions.width = view.body.clientWidth;
            exampleViewer.dimensions.height = view.body.clientHeight;
            exampleViewer.componentInfo.name = view.constructor.name;
            exampleViewer.componentInfo.id = view.body.id;
            exampleViewer.componentInfo.description = view.description || '';
            const computedStyles = window.getComputedStyle(view.body);
            const paddings = [
                computedStyles.paddingTop,
                computedStyles.paddingRight,
                computedStyles.paddingBottom,
                computedStyles.paddingLeft,
            ];
            if (paddings[0] == paddings[1] && paddings[1] == paddings[2] && paddings[2] == paddings[3])
                exampleViewer.dimensions.padding = paddings[0];
            else if (paddings[0] == paddings[2] && paddings[1] == paddings[3])
                exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]}`;
            else
                exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]} ${paddings[2]} ${paddings[3]}`;
            if (exampleViewer.viewerSettings.contrastToggle)
                view.body.style.filter = 'brightness(50%)';
            ev.browserEvent.stopPropagation();
        }).whenMouseOut(() => {
            if (exampleViewer.viewerSettings.contrastToggle)
                view.body.style.filter = 'brightness(100%)';
        });
        view.forChild(child => {
            this.enableHover(child, exampleViewer);
        });
    }
    static dimensionSub(axis) {
        return new _Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('•').id(`component-${axis}`).font('lg'), new _Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent(axis == 'width' ? 'Width' : 'Height').font('sm').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')));
    }
    static OptionButton(id, icon) {
        return new _Basics__WEBPACK_IMPORTED_MODULE_2__.ClickButton(new _Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon(icon).font('lg').foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')).id(id))
            .padding({
            top: 0,
            bottom: 0,
            left: 5,
            right: 5,
        })
            .whenMouseOver(ev => {
            ev.view.background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(0, 0, 0, 0.1));
        })
            .whenMouseOut(ev => {
            ev.view.background('none');
        });
    }
}


/***/ }),

/***/ "./Client/ts/Components/Graphics.ts":
/*!******************************************!*\
  !*** ./Client/ts/Components/Graphics.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IonIcon": () => (/* binding */ IonIcon),
/* harmony export */   "Canvas": () => (/* binding */ Canvas),
/* harmony export */   "SpriteGeometryFunction": () => (/* binding */ SpriteGeometryFunction),
/* harmony export */   "Sprite": () => (/* binding */ Sprite),
/* harmony export */   "ImageContent": () => (/* binding */ ImageContent)
/* harmony export */ });
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");


class IonIcon extends _View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(name) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}
class Canvas extends _View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super('canvas');
        this.context = this.body.getContext('2d');
        this.sprites = [];
    }
    addSprites(...sprites) {
        sprites.forEach(sprite => this.sprites.push(sprite));
        return this;
    }
    drawSprites() {
        this.sprites.forEach(sprite => {
            console.log('Drawing New Sprite', sprite);
            const widthFilter = sprite.geometry.find(e => e.func == SpriteGeometryFunction.Width);
            const heightFilter = sprite.geometry.find(e => e.func == SpriteGeometryFunction.Height);
            let spriteWidth = (widthFilter ? widthFilter.args[0] : this.body.width);
            let spriteHeight = (heightFilter ? heightFilter.args[0] : this.body.height);
            let scaleX = spriteWidth / 100;
            let scaleY = spriteHeight / 100;
            let x = sprite.x;
            let y = sprite.y;
            sprite.geometry.forEach(geo => {
                console.log('Drawing new geometry', geo, 'with scale', scaleX, scaleY);
                const args = geo.args || [];
                switch (geo.func) {
                    case SpriteGeometryFunction.Width:
                        spriteWidth = args[0];
                        scaleX = spriteWidth / 100;
                        break;
                    case SpriteGeometryFunction.Height:
                        spriteHeight = args[0];
                        scaleY = spriteHeight / 100;
                        break;
                    case SpriteGeometryFunction.Line:
                        this.line(x + args[0] * scaleX, y + args[1] * scaleY, x + args[2] * scaleX, y + args[3] * scaleY);
                        break;
                    case SpriteGeometryFunction.Stroke:
                        this.stroke();
                        break;
                    case SpriteGeometryFunction.Font:
                        this.font(args[0]);
                        break;
                    case SpriteGeometryFunction.FillText:
                        this.fillText(args[0], x + args[1] * scaleX, y + args[2] * scaleY);
                        break;
                    case SpriteGeometryFunction.StrokeText:
                        this.strokeText(args[0], x + args[1] * scaleX, y + args[2] * scaleY);
                        break;
                    case SpriteGeometryFunction.FillStyle:
                        this.fillStyle(args[0]);
                        break;
                    case SpriteGeometryFunction.FillRect:
                        this.fillRect(x + args[0] * scaleX, y + args[1] * scaleY, args[2] * scaleX, args[3] * scaleY);
                        break;
                }
            });
        });
        return this;
    }
    width(size) {
        this.body.width = size;
        return this;
    }
    height(size) {
        this.body.height = size;
        return this;
    }
    line(x1, y1, x2, y2) {
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        return this;
    }
    stroke() {
        this.context.stroke();
        return this;
    }
    font(fontstr) {
        this.context.font = fontstr;
        return this;
    }
    fillText(text, x, y) {
        this.context.fillText(text, x, y);
        return this;
    }
    strokeText(text, x, y) {
        this.context.strokeText(text, x, y);
        return this;
    }
    fillStyle(style) {
        this.context.fillStyle = style;
        return this;
    }
    fillRect(x1, y1, width, height) {
        this.context.fillRect(x1, y1, width, height);
        return this;
    }
}
var SpriteGeometryFunction;
(function (SpriteGeometryFunction) {
    SpriteGeometryFunction[SpriteGeometryFunction["Width"] = 0] = "Width";
    SpriteGeometryFunction[SpriteGeometryFunction["Height"] = 1] = "Height";
    SpriteGeometryFunction[SpriteGeometryFunction["Line"] = 2] = "Line";
    SpriteGeometryFunction[SpriteGeometryFunction["Stroke"] = 3] = "Stroke";
    SpriteGeometryFunction[SpriteGeometryFunction["Font"] = 4] = "Font";
    SpriteGeometryFunction[SpriteGeometryFunction["FillText"] = 5] = "FillText";
    SpriteGeometryFunction[SpriteGeometryFunction["StrokeText"] = 6] = "StrokeText";
    SpriteGeometryFunction[SpriteGeometryFunction["FillStyle"] = 7] = "FillStyle";
    SpriteGeometryFunction[SpriteGeometryFunction["FillRect"] = 8] = "FillRect";
    SpriteGeometryFunction[SpriteGeometryFunction["LoadImage"] = 9] = "LoadImage";
})(SpriteGeometryFunction || (SpriteGeometryFunction = {}));
class Sprite {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.geometry = [];
    }
    width(size) {
        this.geometry.push({
            func: SpriteGeometryFunction.Width,
            args: [size],
        });
        return this;
    }
    height(size) {
        this.geometry.push({
            func: SpriteGeometryFunction.Height,
            args: [size],
        });
        return this;
    }
    line(x1, y1, x2, y2) {
        this.geometry.push({
            func: SpriteGeometryFunction.Line,
            args: [x1, y1, x2, y2],
        });
        return this;
    }
    stroke() {
        this.geometry.push({ func: SpriteGeometryFunction.Stroke });
        return this;
    }
    font(fontstr) {
        this.geometry.push({ func: SpriteGeometryFunction.Font, args: [fontstr] });
        return this;
    }
    fillText(text, x, y) {
        this.geometry.push({
            func: SpriteGeometryFunction.FillText,
            args: [text, x, y],
        });
        return this;
    }
    strokeText(text, x, y) {
        this.geometry.push({
            func: SpriteGeometryFunction.StrokeText,
            args: [text, x, y],
        });
        return this;
    }
    fillStyle(style) {
        this.geometry.push({
            func: SpriteGeometryFunction.FillStyle,
            args: [style],
        });
        return this;
    }
    fillRect(x1, y1, width, height) {
        this.geometry.push({
            func: SpriteGeometryFunction.FillRect,
            args: [x1, y1, width, height],
        });
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
}
class ImageContent extends _View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(source, altText) {
        super('img');
        this.data = (0,_Types_states__WEBPACK_IMPORTED_MODULE_0__.StateObject)({
            source: '',
            altText: '',
        }, p => {
            if (p == 'source')
                this.body.src = this.data.source;
            else if (p == 'altText')
                this.body.alt = this.data.altText;
        });
        this.data.source = source;
        if (altText)
            this.data.altText = altText;
    }
}


/***/ }),

/***/ "./Client/ts/Components/Inputs.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/Inputs.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputField),
/* harmony export */   "TextField": () => (/* binding */ TextField),
/* harmony export */   "PasswordField": () => (/* binding */ PasswordField),
/* harmony export */   "DropdownOption": () => (/* binding */ DropdownOption),
/* harmony export */   "TextBox": () => (/* binding */ TextBox)
/* harmony export */ });
/* harmony import */ var _Types_sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Colors */ "./Client/ts/Colors.ts");




class InputField extends _View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(placeholder) {
        super('input');
        this.attributes = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            value: '',
            placeholder: '',
        }, () => {
            this.body.value = this.attributes.value; // ! Cannot use setAttribute for assigning input element's value
            this.body.placeholder = this.attributes.placeholder;
        });
        this.attributes.value = '';
        this.attributes.placeholder = placeholder || '';
        this.body.style.margin = '0';
        this.body.style.boxSizing = 'border-box';
        this.body.style.borderRadius = _Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.BORDER_RADIUS.xs;
        this.body.style.border = `1px solid ${(0,_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('gray5')}`;
        this.body.style.textAlign = 'left';
        this.body.style.padding = _Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.PADDING.xs;
        this.body.style.boxSizing = 'border-box';
        this.body.addEventListener('input', () => {
            this.attributes.value = this.body.value;
        });
    }
    whenFocused(callback) {
        this.body.addEventListener('focusin', browserEvent => {
            callback({
                view: this,
                type: 'Focus',
                browserEvent,
            });
        });
        return this;
    }
    whenUnfocused(callback) {
        this.body.addEventListener('focusout', browserEvent => {
            callback({
                view: this,
                type: 'Unfocus',
                browserEvent,
            });
        });
        return this;
    }
    whenChanged(callback) {
        this.body.addEventListener('input', browserEvent => {
            callback({
                view: this,
                type: 'Change',
                browserEvent,
            });
        });
        return this;
    }
    noOutline() {
        this.body.style.outline = 'none';
        return this;
    }
}
class TextField extends InputField {
    constructor(placeholder) {
        super(placeholder || '');
        this.body.type = 'text';
        this.addClass('hi-textfield');
    }
}
class PasswordField extends InputField {
    constructor() {
        super('Password');
        this.body.type = 'password';
        this.addClass('hi-passwordfield');
    }
    placeholder(newPlaceholder) {
        this.body.placeholder = newPlaceholder;
        return this;
    }
}
class DropdownOption extends _View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(text, value) {
        super('option');
        this.value = value;
        this.text = text;
        this.addClass('hi-dropdown-option');
    }
}
class TextBox extends _View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(placeholder) {
        super('textarea');
        this.body.placeholder = placeholder;
        this.body.addEventListener('change', () => {
            this.value = this.body.value;
        });
    }
}


/***/ }),

/***/ "./Client/ts/Components/Overlays.ts":
/*!******************************************!*\
  !*** ./Client/ts/Components/Overlays.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Overlay": () => (/* binding */ Overlay),
/* harmony export */   "AlertOverlay": () => (/* binding */ AlertOverlay),
/* harmony export */   "PromptOverlay": () => (/* binding */ PromptOverlay),
/* harmony export */   "AgreementOverlay": () => (/* binding */ AgreementOverlay)
/* harmony export */ });
/* harmony import */ var _Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Basics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Inputs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Inputs */ "./Client/ts/Components/Inputs.ts");
/* harmony import */ var _Stacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");
/* harmony import */ var _Graphics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Graphics */ "./Client/ts/Components/Graphics.ts");






class Overlay extends _View__WEBPACK_IMPORTED_MODULE_4__.default {
    constructor(...children) {
        super('div', ...children);
        this.background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background').alpha(0.25))
            .foreground((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('foreground'))
            .width('100vw')
            .height('100vh')
            .zIndex(100)
            .fixed()
            .setTop(0)
            .setLeft(0)
            .blur();
        document.body.appendChild(this.body);
    }
}
class AlertOverlay extends Overlay {
    constructor(message) {
        super(new _Stacks__WEBPACK_IMPORTED_MODULE_3__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent(message).padding().font('small').lineHeight('200%'), new _Stacks__WEBPACK_IMPORTED_MODULE_3__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Cancel'))
            .background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(255, 255, 255, 0.5))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-alert-overlay-cancel-button'), new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Ok'))
            .background((0,_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(255, 255, 255, 0.5))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-alert-overlay-confirm-button')).padding())
            .stretchHeight()
            .width('50%'));
        this.body.style.display = 'flex';
        this.width('100vw').height('100vh').position('fixed').zIndex(100).setTop(0).setLeft(0).blur();
    }
    whenConfirmed(callback) {
        this.getViewsByClass('hi-alert-overlay-confirm-button')[0].whenClicked(callback);
        return this;
    }
    whenCancelled(callback) {
        this.getViewsByClass('hi-alert-overlay-cancel-button')[0].whenClicked(callback);
        return this;
    }
}
class PromptOverlay extends Overlay {
    constructor(prompt) {
        super(new _Stacks__WEBPACK_IMPORTED_MODULE_3__.VStack(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent(prompt).padding().font('small'), new _Inputs__WEBPACK_IMPORTED_MODULE_2__.TextField().addClass('hi-prompt-input'), new _Stacks__WEBPACK_IMPORTED_MODULE_3__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Cancel'))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-prompt-overlay-cancel-button'), new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Ok'))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-prompt-overlay-confirm-button')).padding()));
    }
    whenConfirmed(callback) {
        this.getViewsByClass('hi-prompt-overlay-confirm-button')[0].whenClicked(() => {
            callback(this.getViewsByClass('hi-prompt-input')[0].attributes.value);
        });
        return this;
    }
    whenCancelled(callback) {
        this.getViewsByClass('hi-prompt-overlay-cancel-button')[0].whenClicked(callback);
        return this;
    }
}
class AgreementOverlay extends Overlay {
    constructor(title, icon, ...agreementContents) {
        super(new _Stacks__WEBPACK_IMPORTED_MODULE_3__.VStack(new _Graphics__WEBPACK_IMPORTED_MODULE_5__.IonIcon(icon).font('lg'), new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent(title).padding().font('xl'), new _Stacks__WEBPACK_IMPORTED_MODULE_3__.ScrollView(...agreementContents).height(100), new _Stacks__WEBPACK_IMPORTED_MODULE_3__.HStack(new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Decline'))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-agreement-overlay-cancel-button'), new _Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Agree'))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-agreement-overlay-confirm-button'))));
    }
    whenConfirmed(callback) {
        this.getViewsByClass('hi-agreement-overlay-confirm-button')[0].whenClicked(callback);
        return this;
    }
    whenCancelled(callback) {
        this.getViewsByClass('hi-agreement-overlay-cancel-button')[0].whenClicked(callback);
        return this;
    }
}


/***/ }),

/***/ "./Client/ts/Components/Stacks.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/Stacks.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Group": () => (/* binding */ Group),
/* harmony export */   "Stack": () => (/* binding */ Stack),
/* harmony export */   "VStack": () => (/* binding */ VStack),
/* harmony export */   "ZStack": () => (/* binding */ ZStack),
/* harmony export */   "HStack": () => (/* binding */ HStack),
/* harmony export */   "ScrollView": () => (/* binding */ ScrollView),
/* harmony export */   "HIFullScreenView": () => (/* binding */ HIFullScreenView),
/* harmony export */   "Container": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");

class Group extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.body.style.textAlign = 'center';
        this.body.style.boxSizing = 'border-box';
    }
}
class Stack extends Group {
    constructor(...children) {
        super(...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }
}
class VStack extends Stack {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'column';
    }
}
class ZStack extends Stack {
    /**
     * Creates an instance of ZStack.
     * @param {View[]} children The children of this ZStack.
     *
     * @memberOf ZStack
     */
    constructor(...children) {
        super(...children);
        this.body.style.display = 'grid';
        this.body.style.textAlign = 'center';
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.$children.forEach(child => {
            child.body.style.gridArea = '1/1/1/1';
        });
    }
}
class HStack extends Stack {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'row';
    }
}
class ScrollView extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
        this.body.style.boxSizing = 'border-box';
    }
}
class HIFullScreenView extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.width('100vw').height('100vh');
    }
}
class Container extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
    }
}


/***/ }),

/***/ "./Client/ts/Components/Whitespace.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/Whitespace.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Spacer": () => (/* binding */ Spacer),
/* harmony export */   "LineBreak": () => (/* binding */ LineBreak)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");

class Spacer extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('div');
        this.body.innerHTML = '&nbsp;';
        this.body.style.flexGrow = '1';
        this.body.style.width = 'auto';
        this.body.style.height = 'auto';
        this.body.style.fontSize = '1px';
    }
}
class LineBreak extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('br');
    }
}


/***/ }),

/***/ "./Client/ts/Types/sizing.ts":
/*!***********************************!*\
  !*** ./Client/ts/Types/sizing.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SizingValues": () => (/* binding */ SizingValues),
/* harmony export */   "sizing": () => (/* binding */ sizing)
/* harmony export */ });
const SizingValues = {
    BORDER_RADIUS: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },
    PADDING: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },
    FONT: {
        xxs: sizing(3),
        xs: sizing(6),
        sm: sizing(9),
        md: sizing(12),
        lg: sizing(15),
        xl: sizing(18),
        xxl: sizing(21),
    },
};
function sizing(size) {
    if (typeof size == 'number')
        return `${size}px`;
    return size;
}


/***/ }),

/***/ "./Client/ts/Types/states.ts":
/*!***********************************!*\
  !*** ./Client/ts/Types/states.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateObject": () => (/* binding */ StateObject),
/* harmony export */   "CheckoutState": () => (/* binding */ CheckoutState)
/* harmony export */ });
/**
 * Constructs a proxy object for a state object.
 *
 * @export
 * @template T The state object to observe. (Cannot be a number or string).
 * @param {T} obj The object to observe.
 * @param {(property?: string) => void} onChange The action to trigger once a property on the object is changed.
 * @returns {StateProxy<T>} The observable object.
 */
function StateObject(obj, onChange) {
    const handler = {
        get(target, property, receiver) {
            return Reflect.get(target, property, receiver);
        },
        defineProperty(target, property, descriptor) {
            const result = Reflect.defineProperty(target, property, descriptor);
            onChange(property);
            return result;
        },
        deleteProperty(target, property) {
            const result = Reflect.deleteProperty(target, property);
            onChange(property);
            return result;
        },
    };
    return new Proxy(obj, handler);
}
function CheckoutState(proxy) {
    return proxy.$;
}


/***/ }),

/***/ "./Client/ts/View.ts":
/*!***************************!*\
  !*** ./Client/ts/View.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PStatus": () => (/* binding */ PStatus),
/* harmony export */   "default": () => (/* binding */ View)
/* harmony export */ });
/* harmony import */ var _Types_sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Types/states */ "./Client/ts/Types/states.ts");


/**
 * Status codes for the parent to use
 *
 * @export
 * @enum {number}
 */
var PStatus;
(function (PStatus) {
    PStatus[PStatus["Visible"] = 0] = "Visible";
    PStatus[PStatus["Invisible"] = 1] = "Invisible";
    PStatus[PStatus["Destroyed"] = 2] = "Destroyed";
    PStatus[PStatus["Null"] = 0] = "Null";
})(PStatus || (PStatus = {}));
/**
 * The base class for all Human Interface views.
 *
 * @export
 * @abstract
 * @class View
 */
class View {
    constructor(element, ...children) {
        this.pstatus = PStatus.Visible;
        this.$children = [];
        this.body = document.createElement(element);
        this.addClass('hi-view');
        this.children = (0,_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)(this.$children, () => {
            this.buildChildren();
        });
        children.forEach(child => {
            this.$children.push(child);
        });
        this.buildChildren();
    }
    getViewsByClass(className) {
        const results = [];
        if (this.$children) {
            for (const child of this.$children) {
                if (child.getClassList().indexOf(className) >= 0)
                    results.push(child);
                child.getViewsByClass(className).forEach(view => {
                    results.push(view);
                });
            }
        }
        return results;
    }
    getViewById(id) {
        for (const child of this.$children) {
            if (child.identifier == id)
                return child;
            const childResult = child.getViewById(id);
            if (childResult)
                return childResult;
        }
        return null;
    }
    getModelData() {
        return {
            viewName: this.constructor.name,
            name: `${this.constructor.name}${this.body.id.trim().length > 0 ? `#${this.body.id.trim()}` : ''}.${this.getClassList().join('.')}`,
            id: this.body.id,
            classList: this.getClassList(),
            children: this.$children.map(child => child.getModelData()),
        };
    }
    describe(description) {
        this.description = description;
        return this;
    }
    destroy() {
        // Remove from parent
        if (this.parent && this.parent.$children)
            this.parent.$children.splice(this.parent.children.indexOf(this), 1);
        this.body.remove();
        // Clear all instance variables
        this.parent = undefined;
    }
    addChildren(...children) {
        children.forEach(child => {
            this.children.push(child);
        });
        return this;
    }
    backgroundImage(url) {
        this.body.style.background = `url(${url})`;
        this.body.style.backgroundSize = 'cover';
        return this;
    }
    background(color) {
        this.body.style.background = color.toString();
        return this;
    }
    blur(radius = 5) {
        this.body.style.backdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        this.body.style.webkitBackdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        return this;
    }
    bold() {
        this.body.style.fontWeight = 'bolder';
        return this;
    }
    addClass(classname) {
        this.body.className += ` ${classname}`;
        this.body.className = this.body.className.trim();
        return this;
    }
    getClassList() {
        const classString = this.body.className;
        return classString.split(' ').filter(className => {
            return className.trim() != '';
        });
    }
    fixed() {
        this.body.style.position = 'fixed';
        return this;
    }
    font(fontClass) {
        if (typeof fontClass == 'string' && Object.prototype.hasOwnProperty.call(_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.FONT, fontClass)) {
            this.body.style.fontSize = _Types_sizing__WEBPACK_IMPORTED_MODULE_0__.SizingValues.FONT[fontClass];
        }
        else if (typeof fontClass == 'string') {
            this.body.style.font = fontClass;
        }
        else if (typeof fontClass == 'number')
            this.body.style.fontSize = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(fontClass);
        else if (typeof fontClass == 'object') {
            if (Object.prototype.hasOwnProperty.call(fontClass, 'family'))
                this.body.style.fontFamily = fontClass.family;
            if (Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                ['number', 'string'].indexOf(typeof fontClass.size) >= 0)
                this.body.style.fontSize = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(fontClass.size);
            if (Object.prototype.hasOwnProperty.call(fontClass, 'color'))
                this.foreground(fontClass.color);
        }
        return this;
    }
    foreground(color) {
        this.body.style.color = color.toString();
        return this;
    }
    forChild(iteratee) {
        for (const child of this.$children)
            iteratee(child);
        return this;
    }
    inline() {
        this.body.style.display = 'inline-flex';
        return this;
    }
    relative() {
        this.body.style.position = 'relative';
        return this;
    }
    removeClass(classname) {
        const classes = this.getClassList();
        if (classes.indexOf(classname) >= 0)
            classes.splice(classes.indexOf(classname), 1);
        this.body.className = classes.join(' ');
        return this;
    }
    removeAllChildren() {
        this.$children.splice(0, this.children.length);
        return this.buildChildren();
    }
    buildChildren() {
        this.body.innerHTML = '';
        this.$children.forEach(child => {
            if (child && child.pstatus == PStatus.Visible) {
                child.parent = this;
                this.body.appendChild(child.body);
            }
        });
        return this;
    }
    root() {
        if (this.parent)
            return this.parent.root();
        return this;
    }
    title(text) {
        this.body.title = text;
        return this;
    }
    id(idName) {
        this.identifier = idName;
        return this;
    }
    grow() {
        this.body.style.flexGrow = '1';
        return this;
    }
    glow(color) {
        this.body.style.filter = `drop-shadow(0 0px 20px ${color})`;
        return this;
    }
    zIndex(index) {
        this.body.style.zIndex = `${index}`;
        return this;
    }
    // * Alignment
    alignEnd() {
        this.body.style.alignItems = 'flex-end';
        this.body.style.justifyContent = 'flex-end';
        return this;
    }
    alignMiddle() {
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        return this;
    }
    alignStart() {
        this.body.style.alignItems = 'flex-start';
        this.body.style.justifyContent = 'flex-start';
        return this;
    }
    // * Text Alignment
    textStart() {
        this.body.style.textAlign = 'left';
        return this;
    }
    textCenter() {
        this.body.style.textAlign = 'center';
        return this;
    }
    textEnd() {
        this.body.style.textAlign = 'right';
        return this;
    }
    // * Frame Modifiers
    stretchWidth() {
        this.body.style.width = '100%';
        return this;
    }
    stretchHeight() {
        this.body.style.height = '100%';
        return this;
    }
    stretch() {
        return this.stretchWidth().stretchHeight();
    }
    border(options) {
        if (options.size != undefined)
            this.body.style.borderWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderColor = options.color.toString();
        if (options.style)
            this.body.style.borderStyle = options.style;
        return this;
    }
    borderTop(options) {
        if (options.size != undefined)
            this.body.style.borderTopWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderTopColor = options.color.toString();
        if (options.style)
            this.body.style.borderTopStyle = options.style;
        return this;
    }
    borderRight(options) {
        if (options.size != undefined)
            this.body.style.borderRightWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderRightColor = options.color.toString();
        if (options.style)
            this.body.style.borderRightStyle = options.style;
        return this;
    }
    borderBottom(options) {
        if (options.size != undefined)
            this.body.style.borderBottomWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderBottomColor = options.color.toString();
        if (options.style)
            this.body.style.borderBottomStyle = options.style;
        return this;
    }
    borderLeft(options) {
        if (options.size != undefined)
            this.body.style.borderLeftWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(options.size);
        if (options.color)
            this.body.style.borderLeftColor = options.color.toString();
        if (options.style)
            this.body.style.borderLeftStyle = options.style;
        return this;
    }
    padding(amount) {
        if (amount != undefined) {
            if (typeof amount == 'number' || typeof amount == 'string')
                this.body.style.padding = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount);
            else if (typeof amount == 'object') {
                if (amount.top)
                    this.body.style.paddingTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top);
                if (amount.right)
                    this.body.style.paddingRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.right);
                if (amount.bottom)
                    this.body.style.paddingBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom);
                if (amount.left)
                    this.body.style.paddingLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.left);
            }
        }
        else
            this.body.style.padding = '10px';
        return this;
    }
    margin(amount) {
        if (amount != undefined) {
            if (typeof amount == 'number' || typeof amount == 'string')
                this.body.style.margin = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount);
            else if (typeof amount == 'object') {
                if (amount.top != undefined)
                    this.body.style.marginTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top);
                if (amount.right != undefined)
                    this.body.style.marginRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.right);
                if (amount.bottom != undefined)
                    this.body.style.marginBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom);
                if (amount.left != undefined)
                    this.body.style.marginLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.left);
            }
        }
        else
            this.body.style.margin = '10px';
        return this;
    }
    rounded(amount) {
        if (amount != undefined) {
            if (typeof amount === 'string' || typeof amount === 'number') {
                this.body.style.borderRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount);
            }
            else {
                if (amount.top) {
                    if (amount.top.left != undefined)
                        this.body.style.borderTopLeftRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top.left);
                    if (amount.top.right != undefined)
                        this.body.style.borderTopRightRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.top.right);
                }
                if (amount.bottom) {
                    if (amount.bottom.left != undefined)
                        this.body.style.borderBottomLeftRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom.left);
                    if (amount.bottom.right != undefined)
                        this.body.style.borderBottomRightRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount.bottom.right);
                }
            }
        }
        else
            this.body.style.borderRadius = '10px';
        return this;
    }
    width(frameWidth) {
        if (typeof frameWidth == 'string' || typeof frameWidth == 'number')
            this.body.style.width = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth);
        else {
            if (frameWidth.min)
                this.body.style.minWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.min);
            if (frameWidth.max)
                this.body.style.maxWidth = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.max);
            if (frameWidth.default)
                this.body.style.width = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameWidth.default);
        }
        return this;
    }
    height(frameHeight) {
        if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
            this.body.style.height = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight);
        else {
            if (frameHeight.min)
                this.body.style.minHeight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.min);
            if (frameHeight.max)
                this.body.style.maxHeight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.max);
            if (frameHeight.default)
                this.body.style.height = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(frameHeight.default);
        }
        return this;
    }
    // * Position Modifiers
    absolute() {
        this.body.style.position = 'absolute';
        return this;
    }
    position(value) {
        this.body.style.position = value;
        return this;
    }
    block() {
        this.body.style.display = 'block';
        return this;
    }
    flex() {
        this.body.style.display = 'flex';
        return this;
    }
    setBottom(offset) {
        this.body.style.bottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setTop(offset) {
        this.body.style.top = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setLeft(offset) {
        this.body.style.left = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    setRight(offset) {
        this.body.style.right = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(offset);
        return this;
    }
    opacity(o) {
        this.body.style.opacity = `${o}`;
        return this;
    }
    nullify() {
        this.body.remove();
        this.pstatus = PStatus.Null;
        return this;
    }
    dnull() {
        this.pstatus = PStatus.Visible;
        this.parent.buildChildren();
        return this;
    }
    // * Mouse Hover Event Modifiers
    whenMouseOver(callback) {
        this.body.addEventListener('mouseover', browserEvent => {
            callback({
                view: this,
                type: 'MouseOver',
                browserEvent,
            });
        });
        return this;
    }
    whenMouseOut(callback) {
        this.body.addEventListener('mouseout', browserEvent => {
            callback({
                view: this,
                type: 'MouseOut',
                browserEvent,
            });
        });
        return this;
    }
    signal(data) {
        this.handle(data);
        this.$children.forEach(child => {
            child.signal(data);
        });
    }
    handle(data) {
        if (data == '') {
            console.warn('Caught an empty signal');
            console.trace();
        }
    }
}


/***/ }),

/***/ "./Client/ts/ViewController.ts":
/*!*************************************!*\
  !*** ./Client/ts/ViewController.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewControllerData": () => (/* binding */ ViewControllerData),
/* harmony export */   "ViewController": () => (/* binding */ ViewController)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./View */ "./Client/ts/View.ts");

const ViewControllerData = {
    controllers: [],
    controllerMap: {},
};
/**
 * The controller which manages all the views on the scrren.
 *
 * @export
 * @class ViewController
 */
class ViewController {
    /**
     * Creates an instance of ViewController.
     * @param {Record<string, View>} screens The screen map
     *
     * @memberOf ViewController
     */
    constructor(screens) {
        this.screens = screens;
        ViewControllerData.controllers.push(this);
    }
    /**
     * Navigate to a specified (or main) view on this ViewController.
     *
     * @param {string} [name='main'] The name of the view to navigate to. If no name is specified, then the default view (main) is used.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    navigateTo(name = 'main') {
        if (typeof name != 'string')
            throw new Error(`ViewController.navigateTo: Parameter name (1) should be of type string, instead got ${typeof name}`);
        if (!Object.prototype.hasOwnProperty.call(this.screens, name))
            throw new Error(`ViewController.navigateTo: ViewController does not have a screen named ${name}`);
        this.binding.innerHTML = '';
        this.binding.appendChild(this.screens[name].body);
        this.visibleScreen = name;
        return this;
    }
    /**
     * Adds a screen to the navigator.
     *
     * @param {string} name The name (or alias) of the screen.
     * @param {View} screen The screen object.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    addNavigator(name, screen) {
        if (typeof name != 'string')
            throw new Error(`ViewController.addNavigator: Parameter name (1) should be of type string, instead got ${typeof name}`);
        if (!(screen instanceof _View__WEBPACK_IMPORTED_MODULE_0__.default))
            throw new Error(`ViewController.addNavigator: Parameter screen (2) should be of type View, instead got ${typeof screen}.\nValue: ${typeof screen == 'object' ? JSON.stringify(screen, null, 4) : screen}`);
        this.screens[name] = screen;
        return this;
    }
    /**
     * Binds the ViewController to a specified DOM element.
     *
     * @param {HTMLElement} [element=document.body] The DOM element to bind the controller to. If no element is provided then the document body is used instead.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    bind(element = document.body) {
        this.binding = element;
        return this;
    }
    whenResized(handler) {
        window.addEventListener('resize', ev => handler({ type: 'Resize', view: this.screens[this.visibleScreen], browserEvent: ev }));
        return this;
    }
    /**
     * Adds this ViewController to the ViewControllerData controllerMap.
     *
     * @param {string} controllerName The name of the controller.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    mapTo(controllerName) {
        ViewControllerData.controllerMap[controllerName] = this;
        return this;
    }
    /**
     * Gets a speified controller from the controller map.
     *
     * @param {string} controllerName The name of the controller to get.
     * @returns {ViewController} The requested view controller.
     *
     * @memberOf ViewController
     */
    getController(controllerName) {
        return ViewControllerData.controllerMap[controllerName];
    }
    signal(data) {
        for (const screen in this.screens)
            this.screens[screen].signal(data);
    }
    /**
     * Changes the background image of the document body.
     *
     * @static
     * @param {string} path The path to set the image to.
     *
     * @memberOf ViewController
     */
    static wallpaper(path) {
        if (typeof path != 'string')
            throw new Error(`ViewController.wallpaper: Parameter path (1) should be of of type string, instead got ${typeof path}.`);
        document.body.style.backgroundImage = `url(${path})`;
    }
    /**
     * Automatically finds a view controller with a specified screen and navigates that controller to the specified screen.
     *
     * @static
     * @param {string} [name='main'] The name of the screen to navigate to.
     * If no screen name is provided the the first controller with a screen
     * named "main" will be selected and will be navigated to its main screen.
     * @returns {ViewController} The view controller which was selected for navigation.
     *
     * @memberOf ViewController
     */
    static navigateTo(name = 'main') {
        const controller = ViewControllerData.controllers.find(currentController => {
            return Object.prototype.hasOwnProperty.call(currentController.screens, name);
        });
        if (controller) {
            controller.navigateTo(name);
            controller.visibleScreen = name;
            return controller;
        }
        else {
            console.warn(`Could not navigate to ${name}`);
            return null;
        }
    }
    /**
     * @static
     * @returns A JSON map of all the screens on all of the controllers.
     *
     * @memberOf ViewController
     */
    static allScreens() {
        const screens = {};
        ViewControllerData.controllers.forEach(controller => {
            for (const screen in controller.screens)
                screens[screen] = controller.screens[screen];
        });
        return screens;
    }
}
document.body.style.margin = '0';


/***/ }),

/***/ "./Guides/GuidesApp.ts":
/*!*****************************!*\
  !*** ./Guides/GuidesApp.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GuidesApp)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Sidebar */ "./Guides/Sidebar.ts");
/* harmony import */ var _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/GettingStarted */ "./Guides/Pages/GettingStarted.ts");
/* harmony import */ var _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/SizingTypes */ "./Guides/Pages/SizingTypes.ts");
/* harmony import */ var _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Pages/BasicComponents */ "./Guides/Pages/BasicComponents.ts");
/* harmony import */ var _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Pages/GraphicsComponents */ "./Guides/Pages/GraphicsComponents.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");









class GuidesApp extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.HIFullScreenView {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.HStack(new _Sidebar__WEBPACK_IMPORTED_MODULE_3__.default(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.VStack(new Titlebar().id('titlebar'), new MessageViewer().id('portfolio-viewer').stretch())
            .stretchHeight()
            .width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .alignStart()).stretch());
        this.portfolioViewerController = new _Hi_ViewController__WEBPACK_IMPORTED_MODULE_8__.ViewController({
            gettingStarted: new _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_4__.default().stretch().padding({ top: 60 }),
            sizingTypes: new _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_5__.default().stretch(),
            basicComponents: new _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_6__.default().stretch(),
            graphicsComponents: new _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_7__.default().stretch(),
        });
        this.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background')).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('foreground'));
        const portfolioViewer = this.getViewById('portfolio-viewer');
        if (portfolioViewer)
            this.portfolioViewerController.bind(portfolioViewer.body);
    }
    handle(data) {
        console.log('Handling guides app');
        if (data == 'color') {
            if ((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.whichTheme)() == 'dark') {
                this.background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.BLACK).foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE);
                this.getViewById('titlebar').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(0, 0, 0, 0.5)).foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE);
            }
            else {
                this.background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE).foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.BLACK);
                this.getViewById('titlebar').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(255, 255, 255, 0.5)).foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.BLACK);
            }
        }
        for (const screenName in this.portfolioViewerController.screens)
            this.portfolioViewerController.screens[screenName].signal(data);
    }
}
class Titlebar extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.HStack {
    constructor() {
        super(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Title').id('title'));
        this.width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .padding(20)
            .borderBottom({
            size: 1,
            style: 'solid',
            color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5'),
        })
            .position('fixed')
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background').alpha(0.25))
            .blur(25)
            .zIndex(10);
    }
    handle(data) {
        if (data == 'color')
            this.border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') });
    }
}
class MessageViewer extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.ScrollView {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Select a menu item').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).stretch());
    }
}


/***/ }),

/***/ "./Guides/Pages/BasicComponents.ts":
/*!*****************************************!*\
  !*** ./Guides/Pages/BasicComponents.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicComponents)
/* harmony export */ });
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");





class BasicComponents extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('text').padding().rounded(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Basic Components').padding().rounded().font('xxl').bold().margin({ top: 25 }))
            .backgroundImage('assets/BasicComponents.png')
            .stretch()
            .padding({ bottom: 50 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Overview'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Text Component'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Designed in Philadelphia.')).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Button Components'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Buttons allow for interactivity.'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.ClickButton(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Designed in Philadelphia.'))).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Common Modifiers'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Padding'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('1').padding().background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('orange')).describe('Default padding'), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('2').padding(20).background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('green')).describe('20px padding'), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('3')
            .padding({ top: 10, right: 10, bottom: 25, left: 25 })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('indigo'))
            .describe('10px 10px 25px 25px')).padding(50)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Background/Foreground'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Designed').background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.RGBAModel.BLACK).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('blue')), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('in').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('orange')), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Philadelphia').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('green')).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('gray6'))).padding(20)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Roundedness'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Barely Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('blue')).rounded(5).padding().margin(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Just Round Enough').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('blue')).rounded().padding().margin(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Very Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('blue')).rounded(20).padding().margin(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Too Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_3__.HColor)('blue')).rounded('100%').padding().margin()))));
    }
}


/***/ }),

/***/ "./Guides/Pages/GettingStarted.ts":
/*!****************************************!*\
  !*** ./Guides/Pages/GettingStarted.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GettingStarted)
/* harmony export */ });
/* harmony import */ var _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/Whitespace */ "./Client/ts/Components/Whitespace.ts");
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");






class GettingStarted extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.Container {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.VStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_0__.ImageContent('https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80').stretchWidth(), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.ImageCaption('Photo by Belinda Fewings'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.MajorIcon('accessibility-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryHeading('Human Interface?').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SubtleText('Please note that this project is under heavy development and is due to many changes.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.MajorIcon('cloud-download-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryHeading('Downloading HI MVC').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.ClickButton(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_0__.IonIcon('logo-github').font('xl'), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Github Repository').font('md').margin({ left: 10 }))), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.MajorIcon('hammer-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryHeading('Installation').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SecondaryHeading('Step 1: SCSS Compilation').font('lg'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('Copy the file to your static directory'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SubtleText('This process assumes you have SASS install globally on your system.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SecondaryHeading('Step 2: Configure TypeScript').font('lg'), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_0__.ImageContent('assets/getting-started/tsconfig.png').margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SecondaryHeading('Step 3: Configure Directory Structure'), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.HStack(new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_3__.Spacer(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.VStack(new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.FileTreeItem('folder-outline', 'css').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('blue')), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.FileTreeItem('logo-css3', 'hi.css', 1).iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('blue')), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.FileTreeItem('map-outline', 'hi.css.map', 1).iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('green')), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.FileTreeItem('text-outline', 'fonts').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('teal')), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.FileTreeItem('logo-html5', 'index.html').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('orange')))
            .alignStart()
            .rounded()
            .padding()
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('gray6'))
            .margin({ top: 25, right: 25 }), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_1__.VStack(new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.')
            .padding(0)
            .textStart(), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.PrimaryText('You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.')
            .padding(0)
            .textStart()).width('50%'), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_3__.Spacer()), new _PageComponents__WEBPACK_IMPORTED_MODULE_5__.SecondaryHeading('Step 4: ')));
    }
}


/***/ }),

/***/ "./Guides/Pages/GraphicsComponents.ts":
/*!********************************************!*\
  !*** ./Guides/Pages/GraphicsComponents.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GraphicsComponent)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");
/* harmony import */ var _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Hi_Components_Overlays__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Overlays */ "./Client/ts/Components/Overlays.ts");
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/Whitespace */ "./Client/ts/Components/Whitespace.ts");
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");








class GraphicsComponent extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.Container {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _PageComponents__WEBPACK_IMPORTED_MODULE_7__.MajorIcon('images-outline').blur().rounded(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Graphics Components').font('xxl').bold().margin({ top: 25 }).blur().rounded())
            .stretchWidth()
            .backgroundImage('assets/GraphicsComponents.png')
            .foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE)
            .padding(), new _PageComponents__WEBPACK_IMPORTED_MODULE_7__.PrimaryHeading('Icons'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_2__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-full').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-half').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('yellow')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-dead').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-charging').padding()), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-full-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-half-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('yellow')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-half-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red')), new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('battery-charging-sharp').padding()))
            .font('xxl')
            .padding(25)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_7__.PrimaryHeading('Instagram Component?'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_2__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.ImageContent('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80')
            .width({ max: '100%' })
            .margin({ bottom: 10 }), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('heart-outline')
            .describe('Icon Name: heart-outline')
            .font('xl')
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red'))
            .id('like-button')).whenClicked(ev => {
            const likeButton = ev.view.getViewById('like-button');
            likeButton?.body.setAttribute('name', likeButton?.body.getAttribute('name').indexOf('outline') > 0
                ? 'heart'
                : 'heart-outline');
        }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('chatbubble-outline')
            .describe('Icon Name: chatbubble-outline')
            .font('xl')
            .id('comment-button')).whenClicked(() => new _Hi_Components_Overlays__WEBPACK_IMPORTED_MODULE_4__.AlertOverlay('Messages are disabled for this post.')), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('bookmark-outline')
            .describe('Icon Name: bookmark-outline')
            .font('xl')
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('orange'))
            .id('bookmark-button')).whenClicked(ev => {
            const bookmarkButton = ev.view.getViewById('bookmark-button');
            if (bookmarkButton) {
                bookmarkButton.body.setAttribute('name', bookmarkButton.body.getAttribute('name').indexOf('outline') > 0
                    ? 'bookmark'
                    : 'bookmark-outline');
            }
        }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_3__.IonIcon('share-outline')
            .describe('Icon Name: share-outline')
            .font('xl')
            .id('share-button')), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('@jimmyferminphotography').font('md').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).stretch())
            .margin()
            .padding()
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))
            .rounded()).width({ max: '80%' })));
    }
}


/***/ }),

/***/ "./Guides/Pages/PageComponents.ts":
/*!****************************************!*\
  !*** ./Guides/Pages/PageComponents.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MajorIcon": () => (/* binding */ MajorIcon),
/* harmony export */   "PrimaryHeading": () => (/* binding */ PrimaryHeading),
/* harmony export */   "SecondaryHeading": () => (/* binding */ SecondaryHeading),
/* harmony export */   "PrimaryText": () => (/* binding */ PrimaryText),
/* harmony export */   "SubtleText": () => (/* binding */ SubtleText),
/* harmony export */   "ImageCaption": () => (/* binding */ ImageCaption),
/* harmony export */   "FileTreeItem": () => (/* binding */ FileTreeItem),
/* harmony export */   "HTMLContent": () => (/* binding */ HTMLContent)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");





class MajorIcon extends _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__.IonIcon {
    constructor(name) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}
class PrimaryHeading extends _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent {
    constructor(text) {
        super(text);
        this.margin({ top: 25 }).font('xl');
    }
}
class SecondaryHeading extends _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent {
    constructor(text) {
        super(text);
        this.margin({ top: 50 }).font('lg');
    }
}
class PrimaryText extends _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent {
    constructor(text) {
        super(text);
        this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
    }
}
class SubtleText extends _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent {
    constructor(text) {
        super(text);
        this.padding({ left: 200, right: 200 })
            .margin({ top: 25 })
            .lineHeight('150%')
            .font('sm')
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'));
    }
}
class ImageCaption extends SubtleText {
    constructor(text) {
        super(text);
        this.padding().margin(0).lineHeight('110%');
    }
}
class FileTreeItem extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_3__.HStack {
    constructor(iconName, itemName, depth = 0) {
        const icon = new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__.IonIcon(iconName).padding(5);
        super(icon, new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }
    iconColor(color) {
        this.icon.foreground(color);
        return this;
    }
}
class HTMLContent extends _Hi_View__WEBPACK_IMPORTED_MODULE_4__.default {
    constructor(wrapper, html) {
        super(wrapper);
        this.body.innerHTML = html;
    }
}


/***/ }),

/***/ "./Guides/Pages/SizingTypes.ts":
/*!*************************************!*\
  !*** ./Guides/Pages/SizingTypes.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeDefinitionDocumentation": () => (/* binding */ TypeDefinitionDocumentation),
/* harmony export */   "default": () => (/* binding */ SizingTypes)
/* harmony export */ });
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Whitespace */ "./Client/ts/Components/Whitespace.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");







class TypeDefinitionDocumentation extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack {
    constructor(expansion, description, examples) {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.IonIcon('code-working-outline').font('lg').padding(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Type Definition').padding().width(200).textStart(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.BlockCode(expansion).padding().margin(0).textStart(), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_5__.Spacer())
            .stretchWidth()
            .alignStart(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.IonIcon('information-outline').font('lg').padding(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Description').padding().width(200).textStart(), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.HTMLContent('span', description).textStart().margin(0).padding().width(400), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_5__.Spacer())
            .stretchWidth()
            .alignStart(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.IonIcon('code-slash-outline').font('lg').padding(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Example').padding().width(200).textStart(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.ScrollView(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.BlockCode(examples).textStart().margin(0).padding().width(400)), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_5__.Spacer())
            .stretchWidth()
            .alignStart());
    }
}
class SizingTypes extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.Container {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.MajorIcon('cube-outline').padding().rounded().blur(), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Sizing Type Definitions')
            .blur()
            .padding()
            .rounded()
            .font('xxl')
            .bold()
            .margin({ top: 25 }))
            .backgroundImage('https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')
            .stretch()
            .padding({ bottom: 50 })
            .foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.RGBAModel.WHITE), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.ImageCaption('Photo by Jeremy Zero'), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.PrimaryHeading('Type Definitions Overview'), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.PrimaryText('For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.SubtleText('Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.ImageContent('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation('string | number', 'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.', `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '7em';
const buttonWidth: HISizingValue = 'calc(50vw - 10px)'

new ClickButton(
    new ImageContent('assets/bird.png')
        .width(imageWidth)
        .height(imageHeight)
).width(buttonWidth);
`)
            .margin({ top: 25 })
            .padding()
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_6__.Preview(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.ClickButton(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.ImageContent('https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 'Image of an African Gray Parrot')
            .width(100)
            .height('7em')).width('calc(50vw - 10px)')), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.ImageContent('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
    min?: HISizingValue;
    max?: HISizingValue;
    default?: HISizingValue;
}`, 'Used to determine the sizing bounds of a View. This includes the minimum size, maxmimum size and default size (ex: min-width, max-height, etc).', `new HStack(
    new VStack(
        new Text('Left Panel')
    )
        .width({
            min: 400,
            default: 550,
            max: 700
        })
        .background(HColor('red')),

    new VStack(
        new Text('Right Panel')
    )
        .width({
            min: 200,
            max: 1000
        })
        .background(HColor('blue'))
)`)
            .margin({ top: 25 })
            .padding()
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_6__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Left Panel'))
            .width({
            min: 100,
            default: 200,
            max: 300,
        })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('red')), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Right Panel'))
            .width({ min: 300, max: 500 })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.HColor)('blue')))).width({ max: '100%' }), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_1__.ImageContent('https://image.flaticon.com/icons/png/512/204/204599.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_3__.PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
    top?: HISizingValue;
    right?: HISizingValue;
    bottom?: HISizingValue;
    left?: HISizingValue;
}`, 'Used to determine the sizing of styles pertaining to the edges of a View. This can be used for padding, margin, and the like.', `new HStack(
    new Text('Hello World').background('white').padding(5)
)
    .background('black')
    .padding({
        top: 10,
        right: '5vw',
        bottom: '15pt',
        left: '10vw'
    })`)
            .margin({ top: 25 })
            .padding()
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_6__.Preview(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_0__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_2__.TextContent('Hello World').background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.RGBAModel.WHITE).padding(5))
            .background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_4__.RGBAModel.BLACK)
            .padding({
            top: 10,
            right: '5vw',
            bottom: '15pt',
            left: '10vw',
        }))));
    }
}


/***/ }),

/***/ "./Guides/Sidebar.ts":
/*!***************************!*\
  !*** ./Guides/Sidebar.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sidebar)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/Basics */ "./Client/ts/Components/Basics.ts");
/* harmony import */ var _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Graphics */ "./Client/ts/Components/Graphics.ts");
/* harmony import */ var _Hi_Components_Inputs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/Inputs */ "./Client/ts/Components/Inputs.ts");
/* harmony import */ var _Hi_Components_Overlays__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Overlays */ "./Client/ts/Components/Overlays.ts");
/* harmony import */ var _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/Stacks */ "./Client/ts/Components/Stacks.ts");
/* harmony import */ var _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/Whitespace */ "./Client/ts/Components/Whitespace.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");









function SmartKeywords(keywords) {
    const results = [];
    keywords = keywords.map(word => word.trim().toLowerCase());
    for (const keyword of keywords) {
        if (keyword.indexOf(' ') >= 0)
            keyword.split(' ').forEach(word => {
                results.push(word);
            });
        else
            results.push(keyword);
    }
    return keywords;
}
class Sidebar extends _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack {
    constructor() {
        super(new SearchField(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(...Sidebar.menuItems.map(item => item.view), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer()).stretchWidth().id('menu-items-list'));
        this.alignStart()
            .stretchHeight()
            .padding(20)
            .borderRight({ size: 1, style: 'solid', color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') })
            .width({
            min: 300,
            max: 300,
            default: 300,
        });
    }
    handle() {
        this.border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') });
    }
    static menuSearchScore(query, keywords) {
        const queryWords = query.split(' ');
        let score = 0;
        for (const word of queryWords) {
            if (keywords.indexOf(word) >= 0)
                score++;
            else
                keywords.forEach(keyword => {
                    if (keyword.indexOf(word) >= 0)
                        score += 0.25;
                });
        }
        return score;
    }
}
Sidebar.menuItems = [
    {
        view: MenuButton('hand-right-outline', 'Getting Started', 'gettingStarted'),
        keywords: SmartKeywords(['getting started']),
    },
    {
        view: MenuButton('cube-outline', 'Sizing Types', 'sizingTypes'),
        keywords: SmartKeywords(['sizing types', 'type']),
    },
    {
        view: MenuButton('code-working-outline', 'State Types', 'stateTypes'),
        keywords: SmartKeywords(['state types', 'type']),
    },
    {
        view: MenuButton('brush-outline', 'Style Types', 'styleTypes'),
        keywords: SmartKeywords(['style types', 'type']),
    },
    {
        view: MenuButton('text-outline', 'Basic Components', 'basicComponents'),
        keywords: SmartKeywords(['basic components', 'text', 'button', 'padding', 'round', 'rounded', 'margin']),
    },
    {
        view: MenuButton('images-outline', 'Graphics Components', 'graphicsComponents'),
        keywords: SmartKeywords(['graphics', 'graphic', 'images', 'icons']),
    },
    {
        view: SettingsButton(),
        keywords: SmartKeywords(['settings', 'preferences', 'light', 'dark', 'mode']),
    },
];
class SearchField extends _Hi_Components_Inputs__WEBPACK_IMPORTED_MODULE_3__.TextField {
    constructor() {
        super('Search');
        this.stretchWidth()
            .border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') })
            .margin({ bottom: 20 })
            .whenChanged(ev => {
            const target = ev.view.parent?.getViewById('menu-items-list');
            const query = ev.view.attributes.value.trim().toLowerCase();
            target.removeAllChildren();
            target.addChildren(...Sidebar.menuItems
                .filter(item => {
                const score = Sidebar.menuSearchScore(query, item.keywords);
                return score != 0 && score / query.split(' ').length >= 0.25;
            })
                .sort((a, b) => Sidebar.menuSearchScore(query, a.keywords) - Sidebar.menuSearchScore(query, b.keywords))
                .map(item => item.view));
        })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background'))
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('foreground'));
    }
    handle(data) {
        if (data == 'color') {
            this.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background')).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('foreground'));
            this.border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') });
        }
    }
}
function MenuButton(iconName, title, navigateTo) {
    return new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__.IonIcon(iconName).font({ size: 25 }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent(title).padding(), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => {
        ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'));
    })
        .whenMouseOut(ev => {
        ev.view.background('none');
    })
        .whenClicked(ev => {
        _Hi_ViewController__WEBPACK_IMPORTED_MODULE_8__.ViewController.navigateTo(navigateTo);
        ev.view.root().getViewById('title').text.value = title;
    });
}
function SettingsButton() {
    return new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__.IonIcon('settings-outline').font({ size: 25 }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Preferences').padding(), new _Hi_Components_Whitespace__WEBPACK_IMPORTED_MODULE_6__.Spacer()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6')))
        .whenMouseOut(ev => {
        ev.view.background('none');
    })
        .whenClicked(() => {
        new SettingsOverlay();
    });
}
class SettingsOverlay extends _Hi_Components_Overlays__WEBPACK_IMPORTED_MODULE_4__.Overlay {
    constructor() {
        super(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Color Mode').font('xl'), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.RadioButton()
            .padding()
            .id('light-radio-button')
            .whenClicked(() => {
            this.settings.color = 'light';
        }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Light')).padding(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.RadioButton()
            .padding()
            .id('dark-radio-button')
            .whenClicked(() => {
            this.settings.color = 'dark';
        }), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Dark')).padding()).stretchWidth(), new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.HStack(new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.ClickButton(new _Hi_Components_Stacks__WEBPACK_IMPORTED_MODULE_5__.VStack(new _Hi_Components_Graphics__WEBPACK_IMPORTED_MODULE_2__.IonIcon('close-circle-outline'), new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.TextContent('Close').font('sm'))).whenClicked(() => {
            this.destroy();
        }))).stretch());
        this.settings = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_7__.StateObject)({
            color: 'light',
        }, prop => {
            if (prop == 'color') {
                if (this.settings.color == 'light') {
                    this.lightRadio.setSelected(true);
                    this.darkRadio.setSelected(false);
                    (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.changeTheme)('light');
                }
                else {
                    this.lightRadio.setSelected(false);
                    this.darkRadio.setSelected(true);
                    (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.changeTheme)('dark');
                }
            }
        });
        this.lightRadio = this.getViewById('light-radio-button');
        this.darkRadio = this.getViewById('dark-radio-button');
        this.radioGroup = new _Hi_Components_Basics__WEBPACK_IMPORTED_MODULE_1__.RadioGroup(this.lightRadio, this.darkRadio);
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./Guides/guides.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GuidesApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GuidesApp */ "./Guides/GuidesApp.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");


new _Hi_ViewController__WEBPACK_IMPORTED_MODULE_1__.ViewController({
    main: new _GuidesApp__WEBPACK_IMPORTED_MODULE_0__.default(),
})
    .bind()
    .navigateTo();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map