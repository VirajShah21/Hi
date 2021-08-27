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

/***/ "./Client/ts/Components/AlertOverlay.ts":
/*!**********************************************!*\
  !*** ./Client/ts/Components/AlertOverlay.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AlertOverlay)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _HStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Overlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Overlay */ "./Client/ts/Components/Overlay.ts");
/* harmony import */ var _TextView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _VStack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./VStack */ "./Client/ts/Components/VStack.ts");






class AlertOverlay extends _Overlay__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor(message) {
        super(new _VStack__WEBPACK_IMPORTED_MODULE_5__.default(new _TextView__WEBPACK_IMPORTED_MODULE_4__.default(message).padding().font('small').lineHeight('200%'), new _HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _TextView__WEBPACK_IMPORTED_MODULE_4__.default('Cancel'))
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background').alpha(0.5))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-alert-overlay-cancel-button'), new _ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _TextView__WEBPACK_IMPORTED_MODULE_4__.default('Ok'))
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background').alpha(0.5))
            .whenClicked(() => {
            this.destroy();
        })
            .addClass('hi-alert-overlay-confirm-button')).padding()).stretch());
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


/***/ }),

/***/ "./Client/ts/Components/BlockCode.ts":
/*!*******************************************!*\
  !*** ./Client/ts/Components/BlockCode.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockCode)
/* harmony export */ });
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");


class BlockCode extends _Hi_View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(text) {
        super('pre');
        this.state = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__.StateObject)({
            code: '',
        }, () => {
            this.body.innerText = this.state.code;
        });
        this.state.code = text;
        this.body.style.fontFamily = 'monospace';
    }
    write(text) {
        this.state.code += text;
        return this;
    }
    overwrite(text) {
        this.state.code = text;
        return this;
    }
}


/***/ }),

/***/ "./Client/ts/Components/ClickButton.ts":
/*!*********************************************!*\
  !*** ./Client/ts/Components/ClickButton.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClickButton)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");



class ClickButton extends _Hi_View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(...children) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xxs} ${_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.sm}`;
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


/***/ }),

/***/ "./Client/ts/Components/Container.ts":
/*!*******************************************!*\
  !*** ./Client/ts/Components/Container.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Container": () => (/* binding */ Container)
/* harmony export */ });
/* harmony import */ var _View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../View */ "./Client/ts/View.ts");

class Container extends _View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
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
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _ClickButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _HStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _IonIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Spacer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _TextView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _VStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./VStack */ "./Client/ts/Components/VStack.ts");








// ! Fix all errors with null/dnull and implement a workaround
class Preview extends _VStack__WEBPACK_IMPORTED_MODULE_7__.default {
    constructor(content) {
        super(new _HStack__WEBPACK_IMPORTED_MODULE_3__.default(Preview.OptionButton('toggle-contrast-button', 'contrast-outline').whenClicked(() => {
            this.viewerSettings.contrastToggle = !this.viewerSettings.contrastToggle;
        }))
            .rounded({ top: { left: 10, right: 10 }, bottom: { left: 0, right: 0 } })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5'))
            .addClass('preview-options'), new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(content)
            .border({ size: 4, style: 'dashed', color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') })
            .borderTop({ style: 'solid' })
            .addClass('preview-canvas'), new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _HStack__WEBPACK_IMPORTED_MODULE_3__.default(new _Spacer__WEBPACK_IMPORTED_MODULE_5__.default(), new _HStack__WEBPACK_IMPORTED_MODULE_3__.default(Preview.dimensionSub('width').padding(), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default(' by '), Preview.dimensionSub('height').padding()).id('component-dimensions'), new _Spacer__WEBPACK_IMPORTED_MODULE_5__.default(), new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('•').id('component-padding').font('lg'), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('Padding').font('sm').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')))
            .padding()
            .id('component-padding-wrapper'), new _Spacer__WEBPACK_IMPORTED_MODULE_5__.default()), new _HStack__WEBPACK_IMPORTED_MODULE_3__.default(new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('•').id('component-name').font('lg'), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('Component').font('sm').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).padding(), new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('•').id('component-id').font('lg'), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('ID').font('sm').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).padding()), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('Description').font('sm').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('•').id('component-description')).padding());
        this.dimensions = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
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
        this.componentInfo = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
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
        this.viewerSettings = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            contrastToggle: false,
        }, property => {
            if (property == 'contrastToggle')
                this.getViewById('toggle-contrast-button')?.foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)(this.viewerSettings.contrastToggle ? 'green' : 'gray'));
        });
        Preview.enableHover(content, this);
    }
    handle(data) {
        if (data == 'color') {
            this.getViewsByClass('preview-canvas').forEach(canvas => canvas.border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') }));
            this.getViewsByClass('preview-options').forEach(wrapper => wrapper.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5')));
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
        return new _VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _TextView__WEBPACK_IMPORTED_MODULE_6__.default('•').id(`component-${axis}`).font('lg'), new _TextView__WEBPACK_IMPORTED_MODULE_6__.default(axis == 'width' ? 'Width' : 'Height').font('sm').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')));
    }
    static OptionButton(id, icon) {
        return new _ClickButton__WEBPACK_IMPORTED_MODULE_2__.default(new _IonIcon__WEBPACK_IMPORTED_MODULE_4__.default(icon).font('lg').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray')).id(id))
            .padding({
            top: 0,
            bottom: 0,
            left: 5,
            right: 5,
        })
            .whenMouseOver(ev => {
            ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.rgba)(0, 0, 0, 0.1));
        })
            .whenMouseOut(ev => {
            ev.view.background('none');
        });
    }
}


/***/ }),

/***/ "./Client/ts/Components/Group.ts":
/*!***************************************!*\
  !*** ./Client/ts/Components/Group.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Group)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class Group extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.body.style.textAlign = 'center';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/HIFullScreenView.ts":
/*!**************************************************!*\
  !*** ./Client/ts/Components/HIFullScreenView.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HIFullScreenView)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class HIFullScreenView extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.width('100vw').height('100vh');
    }
}


/***/ }),

/***/ "./Client/ts/Components/HStack.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/HStack.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HStack)
/* harmony export */ });
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stack */ "./Client/ts/Components/Stack.ts");

class HStack extends _Stack__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'row';
    }
}


/***/ }),

/***/ "./Client/ts/Components/ImageView.ts":
/*!*******************************************!*\
  !*** ./Client/ts/Components/ImageView.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageView)
/* harmony export */ });
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");


class ImageView extends _Hi_View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(source, altText) {
        super('img');
        this.data = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__.StateObject)({
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

/***/ "./Client/ts/Components/InputField.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/InputField.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");




class InputField extends _Hi_View__WEBPACK_IMPORTED_MODULE_3__.default {
    constructor(placeholder) {
        super('input');
        this.attributes = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_2__.StateObject)({
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
        this.body.style.borderRadius = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.BORDER_RADIUS.xs;
        this.body.style.border = `1px solid ${(0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5')}`;
        this.body.style.textAlign = 'left';
        this.body.style.padding = _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_1__.SizingValues.PADDING.xs;
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


/***/ }),

/***/ "./Client/ts/Components/IonIcon.ts":
/*!*****************************************!*\
  !*** ./Client/ts/Components/IonIcon.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IonIcon)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class IonIcon extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(name) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}


/***/ }),

/***/ "./Client/ts/Components/Overlay.ts":
/*!*****************************************!*\
  !*** ./Client/ts/Components/Overlay.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Overlay)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");


class Overlay extends _Hi_View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor(...children) {
        super('div', ...children);
        this.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('background').alpha(0.25))
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('foreground'))
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


/***/ }),

/***/ "./Client/ts/Components/RadioButton.ts":
/*!*********************************************!*\
  !*** ./Client/ts/Components/RadioButton.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RadioButton)
/* harmony export */ });
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");


class RadioButton extends _Hi_View__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super('ion-icon');
        this.state = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_0__.StateObject)({ selected: false }, () => {
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


/***/ }),

/***/ "./Client/ts/Components/RadioGroup.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/RadioGroup.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RadioGroup)
/* harmony export */ });
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


/***/ }),

/***/ "./Client/ts/Components/ScrollView.ts":
/*!********************************************!*\
  !*** ./Client/ts/Components/ScrollView.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollView": () => (/* binding */ ScrollView)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class ScrollView extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/Spacer.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/Spacer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Spacer)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class Spacer extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor() {
        super('div');
        this.body.innerHTML = '&nbsp;';
        this.body.style.flexGrow = '1';
        this.body.style.width = 'auto';
        this.body.style.height = 'auto';
        this.body.style.fontSize = '1px';
    }
}


/***/ }),

/***/ "./Client/ts/Components/Stack.ts":
/*!***************************************!*\
  !*** ./Client/ts/Components/Stack.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stack)
/* harmony export */ });
/* harmony import */ var _Group__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Group */ "./Client/ts/Components/Group.ts");

class Stack extends _Group__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.display = 'flex';
        this.body.style.boxSizing = 'border-box';
    }
}


/***/ }),

/***/ "./Client/ts/Components/TextField.ts":
/*!*******************************************!*\
  !*** ./Client/ts/Components/TextField.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextField)
/* harmony export */ });
/* harmony import */ var _InputField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputField */ "./Client/ts/Components/InputField.ts");

class TextField extends _InputField__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(placeholder) {
        super(placeholder || '');
        this.body.type = 'text';
        this.addClass('hi-textfield');
    }
}


/***/ }),

/***/ "./Client/ts/Components/TextView.ts":
/*!******************************************!*\
  !*** ./Client/ts/Components/TextView.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextView),
/* harmony export */   "FontWeight": () => (/* binding */ FontWeight)
/* harmony export */ });
/* harmony import */ var _Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Types/sizing */ "./Client/ts/Types/sizing.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");



class TextView extends _Hi_View__WEBPACK_IMPORTED_MODULE_2__.default {
    constructor(text) {
        super('span');
        this.text = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_1__.StateObject)({
            value: '',
        }, () => {
            this.body.textContent = this.text.value;
        });
        this.text.value = text;
    }
    lineHeight(height) {
        this.body.style.lineHeight = (0,_Hi_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(height);
        return this;
    }
    weight(fontWeight) {
        this.body.style.fontWeight = `${fontWeight}`;
        return this;
    }
}
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


/***/ }),

/***/ "./Client/ts/Components/VStack.ts":
/*!****************************************!*\
  !*** ./Client/ts/Components/VStack.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VStack)
/* harmony export */ });
/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Stack */ "./Client/ts/Components/Stack.ts");

class VStack extends _Stack__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(...children) {
        super(...children);
        this.body.style.flexDirection = 'column';
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
/* harmony export */   "sizing": () => (/* binding */ sizing),
/* harmony export */   "edgeSizing": () => (/* binding */ edgeSizing)
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
        xxs: sizing(5),
        xs: sizing(10),
        sm: sizing(12),
        md: sizing(15),
        lg: sizing(18),
        xl: sizing(25),
        xxl: sizing(30),
    },
};
function sizing(size) {
    if (typeof size == 'number')
        return `${size}px`;
    return size;
}
function edgeSizing(size) {
    if (typeof size == 'string' || typeof size == 'number')
        return { top: sizing(size), right: sizing(size), bottom: sizing(size), left: sizing(size) };
    else {
        const obj = {};
        if (size.top)
            obj.top = sizing(size.top);
        if (size.right)
            obj.right = sizing(size.right);
        if (size.bottom)
            obj.bottom = sizing(size.bottom);
        if (size.left)
            obj.left = sizing(size.left);
        return obj;
    }
}


/***/ }),

/***/ "./Client/ts/Types/states.ts":
/*!***********************************!*\
  !*** ./Client/ts/Types/states.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StateObject": () => (/* binding */ StateObject)
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
 * The base class for all Human Interface views and components.
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
    /**
     * Retrieves a list of all child Views with the specified class name.
     *
     * @param className The classname of all the views to query.
     * @returns An array of Views with a matching classname.
     */
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
    /**
     * Retrieve the first child View with a specified ID.
     *
     * @param {string} id The ID of the View to query.
     * @returns {(View | null)} A View, if one with the corresponding ID is found. Null otherwise.
     *
     * @memberOf View
     */
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
    /**
     * Retrieve the raw data of the DOM structure of this View.
     *
     * @returns {ModelData} The ModelData object associated with this View.
     *
     * @memberOf View
     */
    getModelData() {
        return {
            viewName: this.constructor.name,
            name: `${this.constructor.name}${this.body.id.trim().length > 0 ? `#${this.body.id.trim()}` : ''}.${this.getClassList().join('.')}`,
            id: this.body.id,
            classList: this.getClassList(),
            children: this.$children.map(child => child.getModelData()),
        };
    }
    /**
     * Describes a View. The description is not displayed, but rather used internally or to store data.
     *
     * @param {string} description The description of to assign to this View.
     * @returns {this}
     *
     * @memberOf View
     */
    describe(description) {
        this.description = description;
        return this;
    }
    /**
     * Destroys this View. The View will be completely destroyed and cannot be rebuilt.
     *
     *
     * @memberOf View
     */
    destroy() {
        // Remove from parent
        if (this.parent && this.parent.$children)
            this.parent.$children.splice(this.parent.children.indexOf(this), 1);
        this.body.remove();
        // Clear all instance variables
        this.parent = undefined;
    }
    /**
     * Adds a list of children after all the children of this View.
     *
     * @param {...View[]} children The children to add.
     * @returns {this}
     *
     * @memberOf View
     */
    addChildren(...children) {
        children.forEach(child => {
            this.children.push(child);
        });
        return this;
    }
    /**
     * Assigns a background image to a View via url
     *
     * @param {string} url The URL of the image to display as the background image.
     * @returns {this}
     *
     * @memberOf View
     */
    backgroundImage(url) {
        this.body.style.background = `url(${url})`;
        this.body.style.backgroundSize = 'cover';
        return this;
    }
    /**
     * Assigns the background color of a View
     *
     * @param {(RGBAModel | 'none')} color The RGB color of the image, or 'none' for a transparent background.
     * @returns {this}
     *
     * @memberOf View
     */
    background(color) {
        this.body.style.background = color.toString();
        return this;
    }
    /**
     * Blurs the background of a View.
     *
     * @param {number} [radius=25] The blur radius to apply.
     * @returns {this}
     *
     * @memberOf View
     */
    blur(radius = 25) {
        this.body.style.backdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        this.body.style.webkitBackdropFilter = `blur(${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(radius)})`;
        return this;
    }
    /**
     * Makes all text bold.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    bold() {
        this.body.style.fontWeight = 'bolder';
        return this;
    }
    /**
     * Adds a class to the class list of a View. This is also applied to the HTMLElement
     *
     * @param {string} classname The classname (or multiple classnames delimited by spaces).
     * @returns {this}
     *
     * @memberOf View
     */
    addClass(classname) {
        this.body.className += ` ${classname}`;
        this.body.className = this.body.className.trim();
        return this;
    }
    /**
     * Retrieves a list of the classnames assigned to this View.
     *
     * @returns {string[]} An array of classname strings.
     *
     * @memberOf View
     */
    getClassList() {
        const classString = this.body.className;
        return classString.split(' ').filter(className => {
            return className.trim() != '';
        });
    }
    /**
     * Fixes a View in place. Scroll events will not affect the physical location of the View relative to the top-left corner of the window.
     * For titlebars (and similar), a z-index should also be assigned to the View.
     *
     * @returns {this}
     *
     * @memberOf View
     */
    fixed() {
        this.body.style.position = 'fixed';
        return this;
    }
    /**
     * Add font details to a View.
     *
     * @param {(string | number | HIFont | HISizingName)} fontClass The font data to provide to View's styling.
     * If a sizing value is provided ("xxs" to "xxl") then the sizing value is used.
     * All other strings are assigned to the styles font property (ex: "Arial" or "15px Arial")
     * @returns {this}
     *
     * @memberOf View
     */
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
    /**
     * Set a foreground color for the current View. This is used font setting font-color,
     * icon color and border colors.
     *
     * @param {RGBAModel} color The color to assign to the foreground.
     * @returns {this}
     *
     * @memberOf View
     */
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
    root(stopAtView) {
        let root = this.parent;
        if (root == undefined)
            return this;
        if (stopAtView) {
            while (root.parent != undefined) {
                if (stopAtView(root))
                    return root;
                else
                    root = root.parent;
            }
        }
        else
            while (root.parent != undefined)
                root = root.parent;
        return root;
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
    glow(color, size = 10) {
        this.body.style.filter = `drop-shadow(0 0 ${(0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(size)} ${color.toString()})`;
        return this;
    }
    zIndex(index) {
        this.body.style.zIndex = `${index}`;
        return this;
    }
    resizable(axis) {
        if (!axis)
            this.body.style.resize = 'both';
        else
            switch (axis) {
                case 'h':
                    this.body.style.resize = 'horizontal';
                    break;
                case 'v':
                    this.body.style.resize = 'vertical';
                    break;
                default:
                    this.body.style.resize = axis;
            }
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
            const mapping = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.edgeSizing)(amount);
            if (mapping.top)
                this.body.style.paddingTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.top);
            if (mapping.right)
                this.body.style.paddingRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.right);
            if (mapping.bottom)
                this.body.style.paddingBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.bottom);
            if (mapping.left)
                this.body.style.paddingLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.left);
        }
        else
            this.body.style.padding = '10px';
        return this;
    }
    margin(amount) {
        if (amount != undefined) {
            const mapping = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.edgeSizing)(amount);
            if (mapping.top != undefined)
                this.body.style.marginTop = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.top);
            if (mapping.right != undefined)
                this.body.style.marginRight = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.right);
            if (mapping.bottom != undefined)
                this.body.style.marginBottom = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.bottom);
            if (mapping.left != undefined)
                this.body.style.marginLeft = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(mapping.left);
        }
        else
            this.body.style.margin = '10px';
        return this;
    }
    rounded(amount) {
        if (amount != undefined) {
            if (typeof amount === 'string' || typeof amount === 'number')
                this.body.style.borderRadius = (0,_Types_sizing__WEBPACK_IMPORTED_MODULE_0__.sizing)(amount);
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
    // * Mouse Hover Event Modifiers
    whenMouseOver(callback) {
        this.body.addEventListener('mouseover', browserEvent => callback({
            view: this,
            type: 'MouseOver',
            browserEvent,
        }));
        return this;
    }
    whenMouseOut(callback) {
        this.body.addEventListener('mouseout', browserEvent => callback({
            view: this,
            type: 'MouseOut',
            browserEvent,
        }));
        return this;
    }
    signal(data) {
        this.handle(data);
        this.$children.forEach(child => child.signal(data));
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
 * A ViewController wrapper for a specific wrapper element.
 *
 * @export
 * @class ViewController
 */
class ViewController {
    constructor(screens) {
        this.screens = screens;
        ViewControllerData.controllers.push(this);
    }
    /**
     * Navigates to a screen with a specified name.
     *
     * @param {string} [name='main'] The name of the screen to navigate to. "main" is implicitly passed to this parameter if not specified.
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
     * Adds a screen to the navigator wrapper.
     *
     * @param {string} name The name of the new screen.
     * @param {View} screen The view which the screen is attached to.
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
     * Binds the ViewController to a specified HTMLElement.
     *
     * @param {HTMLElement} [element=document.body] The pre-loaded HTML element to bind to.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    bind(element = document.body) {
        this.binding = element;
        return this;
    }
    /**
     * Adds an event listener for the "resize" event; when the window is resized.
     *
     * @param {(ev: HumanEvent) => void} handler The event handler.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    whenResized(handler) {
        window.addEventListener('resize', ev => handler({ type: 'Resize', view: this.screens[this.visibleScreen], browserEvent: ev }));
        return this;
    }
    /**
     * Maps this controller to a specified name in the ViewController registry.
     *
     * @param {string} controllerName The name of this controller in the registry.
     * @returns {this}
     *
     * @memberOf ViewController
     */
    mapTo(controllerName) {
        ViewControllerData.controllerMap[controllerName] = this;
        return this;
    }
    /**
     * Statically access a controller via the controller's name in the registry.
     *
     * @static
     * @param {string} controllerName The name of the controller to query.
     * @returns {(ViewController | undefined)} The requested ViewController. If a controller with the name is not specified, then this method will return undefined.
     *
     * @memberOf ViewController
     */
    static getController(controllerName) {
        return ViewControllerData.controllerMap[controllerName];
    }
    /**
     * Send a signal to every screen attached to this ViewController.
     *
     * @param {string} data The data to signal.
     *
     * @memberOf ViewController
     */
    signal(data) {
        for (const screen in this.screens)
            this.screens[screen].signal(data);
    }
    /**
     * Automatically navigates to the first found screen with the specified name on any ViewController.
     *
     * @static
     * @param {string} [name='main'] The screen name to navigate to.
     * @returns {(ViewController | null)} The requested ViewController. If no controller is found, then null is returned.
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
     * Puts all screens into a single contained object.
     *
     * @static
     * @returns {Record<string, View>} An object mapping screen names to the screen.
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
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar */ "./Guides/Sidebar.ts");
/* harmony import */ var _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pages/GettingStarted */ "./Guides/Pages/GettingStarted.ts");
/* harmony import */ var _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/SizingTypes */ "./Guides/Pages/SizingTypes.ts");
/* harmony import */ var _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/BasicComponents */ "./Guides/Pages/BasicComponents.ts");
/* harmony import */ var _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/GraphicsComponents */ "./Guides/Pages/GraphicsComponents.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");
/* harmony import */ var _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/HIFullScreenView */ "./Client/ts/Components/HIFullScreenView.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _MessageViewer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./MessageViewer */ "./Guides/MessageViewer.ts");
/* harmony import */ var _Titlebar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Titlebar */ "./Guides/Titlebar.ts");












class GuidesApp extends _Hi_Components_HIFullScreenView__WEBPACK_IMPORTED_MODULE_7__.default {
    constructor() {
        super(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_8__.default(new _Sidebar__WEBPACK_IMPORTED_MODULE_1__.default(), new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_9__.default(new _Titlebar__WEBPACK_IMPORTED_MODULE_11__.default().id('titlebar'), new _MessageViewer__WEBPACK_IMPORTED_MODULE_10__.default().id('portfolio-viewer').stretch())
            .stretchHeight()
            .width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .alignStart()).stretch());
        this.portfolioViewerController = new _Hi_ViewController__WEBPACK_IMPORTED_MODULE_6__.ViewController({
            gettingStarted: new _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_2__.default().stretch().padding({ top: 60 }),
            sizingTypes: new _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_3__.default().stretch(),
            basicComponents: new _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_4__.default().stretch(),
            graphicsComponents: new _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_5__.default().stretch(),
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


/***/ }),

/***/ "./Guides/MessageViewer.ts":
/*!*********************************!*\
  !*** ./Guides/MessageViewer.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MessageViewer)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ScrollView */ "./Client/ts/Components/ScrollView.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");




class MessageViewer extends _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_1__.ScrollView {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_3__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__.default('Select a menu item').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).stretch());
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
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Container */ "./Client/ts/Components/Container.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Components/DisplayText */ "./Guides/Pages/Components/DisplayText.ts");
/* harmony import */ var _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/MajorIcon */ "./Guides/Pages/Components/MajorIcon.ts");









class BasicComponents extends _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__.Container {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_8__.default('text').padding().rounded(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Basic Components').padding().rounded().font('xxl').bold().margin({ top: 25 }))
            .backgroundImage('assets/BasicComponents.png')
            .stretch()
            .padding({ bottom: 50 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryHeading)('Overview'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryText)('The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryHeading)('Text Component'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryText)('The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Designed in Philadelphia.')).margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryHeading)('Button Components'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryText)('Buttons allow for interactivity.'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Designed in Philadelphia.'))).margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.PrimaryText)('Common Modifiers'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.SecondaryHeading)('Padding'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('1').padding().background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('orange')).describe('Default padding'), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('2').padding(20).background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')).describe('20px padding'), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('3')
            .padding({ top: 10, right: 10, bottom: 25, left: 25 })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('indigo'))
            .describe('10px 10px 25px 25px')).padding(50)).margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.SecondaryHeading)('Background/Foreground'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Designed').background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.BLACK).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('in').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('orange')), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Philadelphia').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')).foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))).padding(20)).margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_7__.SecondaryHeading)('Roundedness'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Barely Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')).rounded(5).padding().margin(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Just Round Enough').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')).rounded().padding().margin(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Very Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')).rounded(20).padding().margin(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Too Round').background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')).rounded('100%').padding().margin()))));
    }
}


/***/ }),

/***/ "./Guides/Pages/Components/DisplayText.ts":
/*!************************************************!*\
  !*** ./Guides/Pages/Components/DisplayText.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrimaryHeading": () => (/* binding */ PrimaryHeading),
/* harmony export */   "SecondaryHeading": () => (/* binding */ SecondaryHeading),
/* harmony export */   "PrimaryText": () => (/* binding */ PrimaryText),
/* harmony export */   "SubtleText": () => (/* binding */ SubtleText),
/* harmony export */   "ImageCaption": () => (/* binding */ ImageCaption)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");


function PrimaryHeading(text) {
    return new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__.default(text).margin({ top: 25 }).font('xl');
}
function SecondaryHeading(text) {
    return new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__.default(text).margin({ top: 50 }).font('lg');
}
function PrimaryText(text) {
    return new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__.default(text).padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
}
function SubtleText(text) {
    return new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__.default(text)
        .padding({ left: 200, right: 200 })
        .margin({ top: 25 })
        .lineHeight('150%')
        .font('sm')
        .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'));
}
function ImageCaption(text) {
    return new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_1__.default(text).padding().margin(0).lineHeight('110%');
}


/***/ }),

/***/ "./Guides/Pages/Components/FileTreeItem.ts":
/*!*************************************************!*\
  !*** ./Guides/Pages/Components/FileTreeItem.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileTreeItem": () => (/* binding */ FileTreeItem)
/* harmony export */ });
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");



class FileTreeItem extends _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(iconName, itemName, depth = 0) {
        const icon = new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_1__.default(iconName).padding(5);
        super(icon, new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__.default(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }
    iconColor(color) {
        this.icon.foreground(color);
        return this;
    }
}


/***/ }),

/***/ "./Guides/Pages/Components/HTMLContent.ts":
/*!************************************************!*\
  !*** ./Guides/Pages/Components/HTMLContent.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTMLContent": () => (/* binding */ HTMLContent)
/* harmony export */ });
/* harmony import */ var _Hi_View__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/View */ "./Client/ts/View.ts");

class HTMLContent extends _Hi_View__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(wrapper, html) {
        super(wrapper);
        this.body.innerHTML = html;
    }
}


/***/ }),

/***/ "./Guides/Pages/Components/MajorIcon.ts":
/*!**********************************************!*\
  !*** ./Guides/Pages/Components/MajorIcon.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MajorIcon)
/* harmony export */ });
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");

class MajorIcon extends _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_0__.default {
    constructor(name) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}


/***/ }),

/***/ "./Guides/Pages/Components/TypeDefinitionDocumentation.ts":
/*!****************************************************************!*\
  !*** ./Guides/Pages/Components/TypeDefinitionDocumentation.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TypeDefinitionDocumentation": () => (/* binding */ TypeDefinitionDocumentation)
/* harmony export */ });
/* harmony import */ var _Hi_Components_BlockCode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Components/BlockCode */ "./Client/ts/Components/BlockCode.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/ScrollView */ "./Client/ts/Components/ScrollView.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _HTMLContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./HTMLContent */ "./Guides/Pages/Components/HTMLContent.ts");








class TypeDefinitionDocumentation extends _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default {
    constructor(expansion, description, examples) {
        super(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_2__.default('code-working-outline').font('lg').padding(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Type Definition').padding().width(200).textStart(), new _Hi_Components_BlockCode__WEBPACK_IMPORTED_MODULE_0__.default(expansion).padding().margin(0).textStart(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default())
            .stretchWidth()
            .alignStart(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_2__.default('information-outline').font('lg').padding(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Description').padding().width(200).textStart(), new _HTMLContent__WEBPACK_IMPORTED_MODULE_7__.HTMLContent('span', description).textStart().margin(0).padding().width(400), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default())
            .stretchWidth()
            .alignStart(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_2__.default('code-slash-outline').font('lg').padding(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Example').padding().width(200).textStart(), new _Hi_Components_ScrollView__WEBPACK_IMPORTED_MODULE_3__.ScrollView(new _Hi_Components_BlockCode__WEBPACK_IMPORTED_MODULE_0__.default(examples).textStart().margin(0).padding().width(400)), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default())
            .stretchWidth()
            .alignStart());
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
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Container */ "./Client/ts/Components/Container.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/ImageView */ "./Client/ts/Components/ImageView.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/DisplayText */ "./Guides/Pages/Components/DisplayText.ts");
/* harmony import */ var _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Components/FileTreeItem */ "./Guides/Pages/Components/FileTreeItem.ts");
/* harmony import */ var _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Components/MajorIcon */ "./Guides/Pages/Components/MajorIcon.ts");












class GettingStarted extends _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__.Container {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_4__.default('https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80').stretchWidth(), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.ImageCaption)('Photo by Belinda Fewings'), new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_11__.default('accessibility-outline'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryHeading)('Human Interface?').font('xl'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SubtleText)('Please note that this project is under heavy development and is due to many changes.'), new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_11__.default('cloud-download-outline'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryHeading)('Downloading HI MVC').font('xl'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'), new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_5__.default('logo-github').font('xl'), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__.default('Github Repository').font('md').margin({ left: 10 }))), new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_11__.default('hammer-outline'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryHeading)('Installation').font('xl'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SecondaryHeading)('Step 1: SCSS Compilation').font('lg'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('Copy the file to your static directory'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SubtleText)('This process assumes you have SASS install globally on your system.'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SecondaryHeading)('Step 2: Configure TypeScript').font('lg'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'), new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_4__.default('assets/getting-started/tsconfig.png').margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SecondaryHeading)('Step 3: Configure Directory Structure'), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_3__.default(new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_6__.default(), new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__.default(new _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__.FileTreeItem('folder-outline', 'css').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')), new _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__.FileTreeItem('logo-css3', 'hi.css', 1).iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')), new _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__.FileTreeItem('map-outline', 'hi.css.map', 1).iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')), new _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__.FileTreeItem('text-outline', 'fonts').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('teal')), new _Components_FileTreeItem__WEBPACK_IMPORTED_MODULE_10__.FileTreeItem('logo-html5', 'index.html').iconColor((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('orange')))
            .alignStart()
            .rounded()
            .padding()
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))
            .margin({ top: 25, right: 25 }), new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__.default((0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.')
            .padding(0)
            .textStart(), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.PrimaryText)('You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.')
            .padding(0)
            .textStart()).width('50%'), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_6__.default()), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_9__.SecondaryHeading)('Step 4: ')));
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
/* harmony import */ var _Hi_Components_AlertOverlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/AlertOverlay */ "./Client/ts/Components/AlertOverlay.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/Container */ "./Client/ts/Components/Container.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/ImageView */ "./Client/ts/Components/ImageView.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Components_DisplayText__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Components/DisplayText */ "./Guides/Pages/Components/DisplayText.ts");
/* harmony import */ var _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Components/MajorIcon */ "./Guides/Pages/Components/MajorIcon.ts");













class GraphicsComponent extends _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_3__.Container {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_10__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_10__.default(new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_12__.default('images-outline').blur().rounded(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_9__.default('Graphics Components').font('xxl').bold().margin({ top: 25 }).blur().rounded())
            .stretchWidth()
            .backgroundImage('assets/GraphicsComponents.png')
            .foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE)
            .padding(), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_11__.PrimaryHeading)('Icons'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_10__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_5__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-full').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-half').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('yellow')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-dead').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-charging').padding()), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_5__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-full-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('green')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-half-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('yellow')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-half-sharp').padding().foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red')), new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('battery-charging-sharp').padding()))
            .font('xxl')
            .padding(25)).margin({ top: 25 }), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_11__.PrimaryHeading)('Instagram Component?'), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_4__.Preview(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_10__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_6__.default('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80')
            .width({ max: '100%' })
            .margin({ bottom: 10 }), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_5__.default(new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('heart-outline')
            .describe('Icon Name: heart-outline')
            .font('xl')
            .foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red'))
            .id('like-button')).whenClicked(ev => {
            const likeButton = ev.view.getViewById('like-button');
            likeButton?.body.setAttribute('name', likeButton?.body.getAttribute('name').indexOf('outline') > 0
                ? 'heart'
                : 'heart-outline');
        }), new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('chatbubble-outline')
            .describe('Icon Name: chatbubble-outline')
            .font('xl')
            .id('comment-button')).whenClicked(() => new _Hi_Components_AlertOverlay__WEBPACK_IMPORTED_MODULE_1__.default('Messages are disabled for this post.')), new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('bookmark-outline')
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
        }), new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_7__.default('share-outline')
            .describe('Icon Name: share-outline')
            .font('xl')
            .id('share-button')), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_8__.default(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_9__.default('@jimmyferminphotography').font('md').foreground((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray'))).stretch())
            .margin()
            .padding()
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6'))
            .rounded()).width({ max: '80%' })));
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
/* harmony export */   "default": () => (/* binding */ SizingTypes)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/Container */ "./Client/ts/Components/Container.ts");
/* harmony import */ var _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/DevKit */ "./Client/ts/Components/DevKit.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/ImageView */ "./Client/ts/Components/ImageView.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/DisplayText */ "./Guides/Pages/Components/DisplayText.ts");
/* harmony import */ var _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Components/MajorIcon */ "./Guides/Pages/Components/MajorIcon.ts");
/* harmony import */ var _Components_TypeDefinitionDocumentation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Components/TypeDefinitionDocumentation */ "./Guides/Pages/Components/TypeDefinitionDocumentation.ts");











class SizingTypes extends _Hi_Components_Container__WEBPACK_IMPORTED_MODULE_2__.Container {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Components_MajorIcon__WEBPACK_IMPORTED_MODULE_9__.default('cube-outline').padding().rounded().blur(), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Sizing Type Definitions')
            .blur()
            .padding()
            .rounded()
            .font('xxl')
            .bold()
            .margin({ top: 25 }))
            .backgroundImage('https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')
            .stretch()
            .padding({ bottom: 50 })
            .foreground(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.ImageCaption)('Photo by Jeremy Zero'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.PrimaryHeading)('Type Definitions Overview'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.PrimaryText)('For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.SubtleText)('Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_5__.default('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.PrimaryHeading)('HISizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new _Components_TypeDefinitionDocumentation__WEBPACK_IMPORTED_MODULE_10__.TypeDefinitionDocumentation('string | number', 'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.', `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '7em';
const buttonWidth: HISizingValue = 'calc(50vw - 10px)'

new ClickButton(
    new ImageView('assets/bird.png')
        .width(imageWidth)
        .height(imageHeight)
).width(buttonWidth);
`)
            .margin({ top: 25 })
            .padding()
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_5__.default('https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 'Image of an African Gray Parrot')
            .width(100)
            .height('7em')).width('calc(50vw - 10px)')), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_5__.default('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.PrimaryHeading)('HISizeBounds').margin(0).padding({ left: 10 })).margin({ top: 25 }), new _Components_TypeDefinitionDocumentation__WEBPACK_IMPORTED_MODULE_10__.TypeDefinitionDocumentation(`HISizingValue | {
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
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Left Panel'))
            .width({
            min: 100,
            default: 200,
            max: 300,
        })
            .background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('red')), new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_7__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Right Panel')).width({ min: 300, max: 500 }).background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('blue')))).width({ max: '100%' }), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_ImageView__WEBPACK_IMPORTED_MODULE_5__.default('https://image.flaticon.com/icons/png/512/204/204599.png').height(50), (0,_Components_DisplayText__WEBPACK_IMPORTED_MODULE_8__.PrimaryHeading)('HIEdgeSizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new _Components_TypeDefinitionDocumentation__WEBPACK_IMPORTED_MODULE_10__.TypeDefinitionDocumentation(`HISizingValue | {
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
            .rounded(), new _Hi_Components_DevKit__WEBPACK_IMPORTED_MODULE_3__.Preview(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_4__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_6__.default('Hello World').background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.WHITE).padding(5))
            .background(_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.RGBAModel.BLACK)
            .padding({
            top: 10,
            right: '5vw',
            bottom: '15pt',
            left: '10vw',
        }))));
    }
}


/***/ }),

/***/ "./Guides/SearchField.ts":
/*!*******************************!*\
  !*** ./Guides/SearchField.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchField)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_TextField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/TextField */ "./Client/ts/Components/TextField.ts");
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Sidebar */ "./Guides/Sidebar.ts");



class SearchField extends _Hi_Components_TextField__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super('Search');
        this.stretchWidth()
            .border({ color: (0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray5') })
            .margin({ bottom: 20 })
            .whenChanged(ev => {
            const target = ev.view.parent?.getViewById('menu-items-list');
            const query = ev.view.attributes.value.trim().toLowerCase();
            target.removeAllChildren();
            target.addChildren(..._Sidebar__WEBPACK_IMPORTED_MODULE_2__.default.menuItems.filter(item => {
                const score = _Sidebar__WEBPACK_IMPORTED_MODULE_2__.default.menuSearchScore(query, item.keywords);
                return score != 0 && score / query.split(' ').length >= 0.25;
            })
                .sort((a, b) => _Sidebar__WEBPACK_IMPORTED_MODULE_2__.default.menuSearchScore(query, a.keywords) - _Sidebar__WEBPACK_IMPORTED_MODULE_2__.default.menuSearchScore(query, b.keywords))
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


/***/ }),

/***/ "./Guides/SettingsOverlay.ts":
/*!***********************************!*\
  !*** ./Guides/SettingsOverlay.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsOverlay)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Overlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Overlay */ "./Client/ts/Components/Overlay.ts");
/* harmony import */ var _Hi_Components_RadioButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/RadioButton */ "./Client/ts/Components/RadioButton.ts");
/* harmony import */ var _Hi_Components_RadioGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/RadioGroup */ "./Client/ts/Components/RadioGroup.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Hi_Types_states__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @Hi/Types/states */ "./Client/ts/Types/states.ts");










class SettingsOverlay extends _Hi_Components_Overlay__WEBPACK_IMPORTED_MODULE_4__.default {
    constructor() {
        super(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__.default(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__.default('Color Mode').font('xl'), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_RadioButton__WEBPACK_IMPORTED_MODULE_5__.default()
            .padding()
            .id('light-radio-button')
            .whenClicked(() => {
            this.settings.color = 'light';
        }), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__.default('Light')).padding(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_RadioButton__WEBPACK_IMPORTED_MODULE_5__.default()
            .padding()
            .id('dark-radio-button')
            .whenClicked(() => {
            this.settings.color = 'dark';
        }), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__.default('Dark')).padding()).stretchWidth(), new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_8__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('close-circle-outline'), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_7__.default('Close').font('sm'))).whenClicked(() => {
            this.destroy();
        }))).stretch());
        this.settings = (0,_Hi_Types_states__WEBPACK_IMPORTED_MODULE_9__.StateObject)({
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
        this.radioGroup = new _Hi_Components_RadioGroup__WEBPACK_IMPORTED_MODULE_6__.default(this.lightRadio, this.darkRadio);
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
/* harmony import */ var _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/ClickButton */ "./Client/ts/Components/ClickButton.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @Hi/Components/IonIcon */ "./Client/ts/Components/IonIcon.ts");
/* harmony import */ var _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @Hi/Components/Spacer */ "./Client/ts/Components/Spacer.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");
/* harmony import */ var _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @Hi/Components/VStack */ "./Client/ts/Components/VStack.ts");
/* harmony import */ var _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @Hi/ViewController */ "./Client/ts/ViewController.ts");
/* harmony import */ var _SearchField__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SearchField */ "./Guides/SearchField.ts");
/* harmony import */ var _SettingsOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SettingsOverlay */ "./Guides/SettingsOverlay.ts");










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
class Sidebar extends _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default {
    constructor() {
        super(new _SearchField__WEBPACK_IMPORTED_MODULE_8__.default(), new _Hi_Components_VStack__WEBPACK_IMPORTED_MODULE_6__.default(...Sidebar.menuItems.map(item => item.view), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()).stretchWidth().id('menu-items-list'));
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
function MenuButton(iconName, title, navigateTo) {
    return new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default(iconName).font({ size: 25 }), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default(title).padding(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()))
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
        _Hi_ViewController__WEBPACK_IMPORTED_MODULE_7__.ViewController.navigateTo(navigateTo);
        ev.view.root().getViewById('title').text.value = title;
    });
}
function SettingsButton() {
    return new _Hi_Components_ClickButton__WEBPACK_IMPORTED_MODULE_1__.default(new _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_2__.default(new _Hi_Components_IonIcon__WEBPACK_IMPORTED_MODULE_3__.default('settings-outline').font({ size: 25 }), new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_5__.default('Preferences').padding(), new _Hi_Components_Spacer__WEBPACK_IMPORTED_MODULE_4__.default()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => ev.view.background((0,_Hi_Colors__WEBPACK_IMPORTED_MODULE_0__.HColor)('gray6')))
        .whenMouseOut(ev => {
        ev.view.background('none');
    })
        .whenClicked(() => {
        new _SettingsOverlay__WEBPACK_IMPORTED_MODULE_9__.default();
    });
}


/***/ }),

/***/ "./Guides/Titlebar.ts":
/*!****************************!*\
  !*** ./Guides/Titlebar.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Titlebar)
/* harmony export */ });
/* harmony import */ var _Hi_Colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Hi/Colors */ "./Client/ts/Colors.ts");
/* harmony import */ var _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @Hi/Components/HStack */ "./Client/ts/Components/HStack.ts");
/* harmony import */ var _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @Hi/Components/TextView */ "./Client/ts/Components/TextView.ts");



class Titlebar extends _Hi_Components_HStack__WEBPACK_IMPORTED_MODULE_1__.default {
    constructor() {
        super(new _Hi_Components_TextView__WEBPACK_IMPORTED_MODULE_2__.default('Title').id('title'));
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