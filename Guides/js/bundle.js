/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Guides/GuidesApp.ts":
/*!*****************************!*\
  !*** ./Guides/GuidesApp.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GuidesApp)
/* harmony export */ });
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _Sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sidebar */ "./Guides/Sidebar.ts");
/* harmony import */ var _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Pages/GettingStarted */ "./Guides/Pages/GettingStarted.ts");
/* harmony import */ var _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Pages/SizingTypes */ "./Guides/Pages/SizingTypes.ts");
/* harmony import */ var _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Pages/BasicComponents */ "./Guides/Pages/BasicComponents.ts");
/* harmony import */ var _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pages/GraphicsComponents */ "./Guides/Pages/GraphicsComponents.ts");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());









class GuidesApp extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _Sidebar__WEBPACK_IMPORTED_MODULE_1__.default(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Titlebar().id('titlebar'), new MessageViewer().id('portfolio-viewer').stretch())
            .stretchHeight()
            .width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .alignStart()).stretch());
        this.portfolioViewerController = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
            gettingStarted: new _Pages_GettingStarted__WEBPACK_IMPORTED_MODULE_2__.default().stretch().padding({ top: 60 }),
            sizingTypes: new _Pages_SizingTypes__WEBPACK_IMPORTED_MODULE_3__.default().stretch(),
            basicComponents: new _Pages_BasicComponents__WEBPACK_IMPORTED_MODULE_4__.default().stretch(),
            graphicsComponents: new _Pages_GraphicsComponents__WEBPACK_IMPORTED_MODULE_5__.default().stretch(),
        });
        this.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('background')).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('foreground'));
        const portfolioViewer = this.getViewById('portfolio-viewer');
        if (portfolioViewer)
            this.portfolioViewerController.bind(portfolioViewer.body);
    }
    handle(data) {
        console.log('Handling guides app');
        if (data == 'color') {
            if (Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())() == 'dark') {
                this.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
                this.getViewById('titlebar').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(0, 0, 0, 0.5)).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
            }
            else {
                this.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
                this.getViewById('titlebar').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(255, 255, 255, 0.5)).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
            }
        }
        for (const screenName in this.portfolioViewerController.screens)
            this.portfolioViewerController.screens[screenName].signal(data);
    }
}
class Titlebar extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Title').id('title'));
        this.width({
            min: 'calc(100vw - 300px)',
            default: 'calc(100vw - 300px)',
            max: 'calc(100vw - 300px)',
        })
            .padding(20)
            .borderBottom({
            size: 1,
            style: 'solid',
            color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5'),
        })
            .position('fixed')
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('background').alpha(0.25))
            .blur(25)
            .zIndex(10);
    }
    handle(data) {
        if (data == 'color')
            this.border({ color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5') });
    }
}
class MessageViewer extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Select a menu item').foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray'))).stretch());
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





class BasicComponents extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('text').padding().rounded(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Basic Components').padding().rounded().font('xxl').bold().margin({ top: 25 }))
            .backgroundImage('assets/BasicComponents.png')
            .stretch()
            .padding({ bottom: 50 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Overview'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Text Component'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Designed in Philadelphia.')).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Button Components'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Buttons allow for interactivity.'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Designed in Philadelphia.'))).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Common Modifiers'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Padding'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('1').padding().background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('orange')).describe('Default padding'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('2').padding(20).background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('green')).describe('20px padding'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('3')
            .padding({ top: 10, right: 10, bottom: 25, left: 25 })
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('indigo'))
            .describe('10px 10px 25px 25px')).padding(50)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Background/Foreground'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Designed').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('in').foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('orange')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Philadelphia').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('green')).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray6'))).padding(20)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Roundedness'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Barely Round').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')).rounded(5).padding().margin(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Just Round Enough').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')).rounded().padding().margin(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Very Round').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')).rounded(20).padding().margin(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Too Round').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')).rounded('100%').padding().margin()))));
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");






class GettingStarted extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80').stretchWidth(), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.ImageCaption('Photo by Belinda Fewings'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('accessibility-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Human Interface?').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SubtleText('Please note that this project is under heavy development and is due to many changes.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('cloud-download-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Downloading HI MVC').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('logo-github').font('xl'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Github Repository').font('md').margin({ left: 10 }))), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('hammer-outline'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Installation').font('xl'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Step 1: SCSS Compilation').font('lg'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Copy the file to your static directory'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SubtleText('This process assumes you have SASS install globally on your system.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Step 2: Configure TypeScript').font('lg'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('assets/getting-started/tsconfig.png').margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Step 3: Configure Directory Structure'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.FileTreeItem('folder-outline', 'css').iconColor(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.FileTreeItem('logo-css3', 'hi.css', 1).iconColor(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.FileTreeItem('map-outline', 'hi.css.map', 1).iconColor(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('green')), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.FileTreeItem('text-outline', 'fonts').iconColor(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('teal')), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.FileTreeItem('logo-html5', 'index.html').iconColor(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('orange')))
            .alignStart()
            .rounded()
            .padding()
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray6'))
            .margin({ top: 25, right: 25 }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.')
            .padding(0)
            .textStart(), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.')
            .padding(0)
            .textStart()).width('50%'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SecondaryHeading('Step 4: ')));
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Overlays'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");








class GraphicsComponent extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('images-outline').blur().rounded(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Graphics Components').font('xxl').bold().margin({ top: 25 }).blur().rounded())
            .stretchWidth()
            .backgroundImage('assets/GraphicsComponents.png')
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
            .padding(), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Icons'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-full').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('green')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-half').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('yellow')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-dead').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('red')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-charging').padding()), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-full-sharp').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('green')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-half-sharp').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('yellow')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-half-sharp').padding().foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('red')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('battery-charging-sharp').padding()))
            .font('xxl')
            .padding(25)).margin({ top: 25 }), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Instagram Component?'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80')
            .width({ max: '100%' })
            .margin({ bottom: 10 }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('heart-outline')
            .describe('Icon Name: heart-outline')
            .font('xl')
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('red'))
            .id('like-button')).whenClicked(ev => {
            const likeButton = ev.view.getViewById('like-button');
            likeButton.body.setAttribute('name', likeButton.body.getAttribute('name').indexOf('outline') > 0
                ? 'heart'
                : 'heart-outline');
        }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('chatbubble-outline')
            .describe('Icon Name: chatbubble-outline')
            .font('xl')
            .id('comment-button')).whenClicked(() => new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Overlays'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Messages are disabled for this post.')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('bookmark-outline')
            .describe('Icon Name: bookmark-outline')
            .font('xl')
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('orange'))
            .id('bookmark-button')).whenClicked(ev => {
            const bookmarkButton = ev.view.getViewById('bookmark-button');
            bookmarkButton.body.setAttribute('name', bookmarkButton.body.getAttribute('name').indexOf('outline') > 0
                ? 'bookmark'
                : 'bookmark-outline');
        }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('share-outline')
            .describe('Icon Name: share-outline')
            .font('xl')
            .id('share-button')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('@jimmyferminphotography').font('md').foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray'))).stretch())
            .margin()
            .padding()
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray6'))
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/View'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());





class MajorIcon extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(name) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}
class PrimaryHeading extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(text) {
        super(text);
        this.margin({ top: 25 }).font('xl');
    }
}
class SecondaryHeading extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(text) {
        super(text);
        this.margin({ top: 50 }).font('lg');
    }
}
class PrimaryText extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(text) {
        super(text);
        this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
    }
}
class SubtleText extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(text) {
        super(text);
        this.padding({ left: 200, right: 200 })
            .margin({ top: 25 })
            .lineHeight('150%')
            .font('sm')
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray'));
    }
}
class ImageCaption extends SubtleText {
    constructor(text) {
        super(text);
        this.padding().margin(0).lineHeight('110%');
    }
}
class FileTreeItem extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(iconName, itemName, depth = 0) {
        const icon = new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(iconName).padding(5);
        super(icon, new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }
    iconColor(color) {
        this.icon.foreground(color);
        return this;
    }
}
class HTMLContent extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/View'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _PageComponents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageComponents */ "./Guides/Pages/PageComponents.ts");
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());







class TypeDefinitionDocumentation extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor(expansion, description, examples) {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('code-working-outline').font('lg').padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Type Definition').padding().width(200).textStart(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(expansion).padding().margin(0).textStart(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())())
            .stretchWidth()
            .alignStart(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('information-outline').font('lg').padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Description').padding().width(200).textStart(), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.HTMLContent('span', description).textStart().margin(0).padding().width(400), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())())
            .stretchWidth()
            .alignStart(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('code-slash-outline').font('lg').padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Example').padding().width(200).textStart(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(examples).textStart().margin(0).padding().width(400)), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())())
            .stretchWidth()
            .alignStart());
    }
}
class SizingTypes extends Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.MajorIcon('cube-outline').padding().rounded().blur(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Sizing Type Definitions')
            .blur()
            .padding()
            .rounded()
            .font('xxl')
            .bold()
            .margin({ top: 25 }))
            .backgroundImage('https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')
            .stretch()
            .padding({ bottom: 50 })
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.ImageCaption('Photo by Jeremy Zero'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('Type Definitions Overview'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryText('For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.SubtleText('Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation('string | number', 'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.', `const imageWidth: HISizingValue = 100; // '100px'
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
            .rounded(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 'Image of an African Gray Parrot')
            .width(100)
            .height('7em')).width('calc(50vw - 10px)')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
            .rounded(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Left Panel'))
            .width({
            min: 100,
            default: 200,
            max: 300,
        })
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('red')), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Right Panel'))
            .width({ min: 300, max: 500 })
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('blue')))).width({ max: '100%' }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('https://image.flaticon.com/icons/png/512/204/204599.png').height(50), new _PageComponents__WEBPACK_IMPORTED_MODULE_1__.PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
            .rounded(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/DevKit'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Hello World').background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).padding(5))
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module '../Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Inputs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Overlays'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Types/states'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());









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
class Sidebar extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new SearchField(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(...Sidebar.menuItems.map(item => item.view), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()).stretchWidth().id('menu-items-list'));
        this.alignStart()
            .stretchHeight()
            .padding(20)
            .borderRight({ size: 1, style: 'solid', color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5') })
            .width({
            min: 300,
            max: 300,
            default: 300,
        });
    }
    handle() {
        this.border({ color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5') });
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
class SearchField extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Inputs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super('Search');
        this.stretchWidth()
            .border({ color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5') })
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
            .background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('background'))
            .foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('foreground'));
    }
    handle(data) {
        if (data == 'color') {
            this.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('background')).foreground(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('foreground'));
            this.border({ color: Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray5') });
        }
    }
}
function MenuButton(iconName, title, navigateTo) {
    return new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(iconName).font({ size: 25 }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(title).padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => {
        ev.view.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray6'));
    })
        .whenMouseOut(ev => {
        ev.view.background('none');
    })
        .whenClicked(ev => {
        Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(navigateTo);
        ev.view.root().getViewById('title').text.value = title;
    });
}
function SettingsButton() {
    return new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('settings-outline').font({ size: 25 }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Preferences').padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Whitespace'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()))
        .stretchWidth()
        .padding(5)
        .rounded()
        .font('sm')
        .whenMouseOver(ev => ev.view.background(Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('gray6')))
        .whenMouseOut(ev => {
        ev.view.background('none');
    })
        .whenClicked(() => {
        new SettingsOverlay();
    });
}
class SettingsOverlay extends Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Overlays'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()) {
    constructor() {
        super(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Color Mode').font('xl'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
            .padding()
            .id('light-radio-button')
            .whenClicked(() => {
            this.settings.color = 'light';
        }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Light')).padding(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
            .padding()
            .id('dark-radio-button')
            .whenClicked(() => {
            this.settings.color = 'dark';
        }), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Dark')).padding()).stretchWidth(), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Stacks'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Graphics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('close-circle-outline'), new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('Close').font('sm'))).whenClicked(() => {
            this.destroy();
        }))).stretch());
        this.settings = Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Types/states'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
            color: 'light',
        }, prop => {
            if (prop == 'color') {
                if (this.settings.color == 'light') {
                    this.lightRadio.setSelected(true);
                    this.darkRadio.setSelected(false);
                    Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('light');
                }
                else {
                    this.lightRadio.setSelected(false);
                    this.darkRadio.setSelected(true);
                    Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Colors'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())('dark');
                }
            }
        });
        this.lightRadio = this.getViewById('light-radio-button');
        this.darkRadio = this.getViewById('dark-radio-button');
        this.radioGroup = new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/Components/Basics'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this.lightRadio, this.darkRadio);
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
Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());


new Object(function webpackMissingModule() { var e = new Error("Cannot find module './Hi/ViewController'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())({
    main: new _GuidesApp__WEBPACK_IMPORTED_MODULE_0__.default(),
})
    .bind()
    .navigateTo();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map