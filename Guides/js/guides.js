define("Hi/Colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ColorConfiguration = exports.HumanColorSwatch = exports.rgba = exports.rgb = exports.HColor = exports.RGBAModel = void 0;
    class RGBAModel {
        constructor(r, g, b, a = 1) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        toString() {
            if (this.a != 1)
                return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        }
    }
    exports.RGBAModel = RGBAModel;
    RGBAModel.WHITE = new RGBAModel(255, 255, 255);
    RGBAModel.BLACK = new RGBAModel(0, 0, 0);
    function HColor(color) {
        if (exports.ColorConfiguration.theme === 'light') {
            return exports.HumanColorSwatch.light[color];
        }
        else {
            return exports.HumanColorSwatch.dark[color];
        }
    }
    exports.HColor = HColor;
    function rgb(r, g, b) {
        return new RGBAModel(r, g, b);
    }
    exports.rgb = rgb;
    function rgba(r, g, b, a) {
        return new RGBAModel(r, g, b, a);
    }
    exports.rgba = rgba;
    exports.HumanColorSwatch = {
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
    exports.ColorConfiguration = {
        swatch: exports.HumanColorSwatch,
        theme: 'light',
    };
});
define("Hi/Types/sizing", ["require", "exports", "Hi/human"], function (require, exports, human_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SizingValues = void 0;
    exports.SizingValues = {
        BORDER_RADIUS: {
            xxs: human_1.sizing(3),
            xs: human_1.sizing(6),
            sm: human_1.sizing(9),
            lg: human_1.sizing(15),
            xl: human_1.sizing(18),
            xxl: human_1.sizing(21),
        },
        PADDING: {
            xxs: human_1.sizing(3),
            xs: human_1.sizing(6),
            sm: human_1.sizing(9),
            md: human_1.sizing(12),
            lg: human_1.sizing(15),
            xl: human_1.sizing(18),
            xxl: human_1.sizing(21),
        },
        FONT: {
            xxs: human_1.sizing(3),
            xs: human_1.sizing(6),
            sm: human_1.sizing(9),
            md: human_1.sizing(12),
            lg: human_1.sizing(15),
            xl: human_1.sizing(18),
            xxl: human_1.sizing(21),
        },
    };
});
define("Hi/Types/states", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Hi/human", ["require", "exports", "Hi/View"], function (require, exports, View_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sizing = exports.ViewController = exports.ViewControllerData = exports.StateObject = void 0;
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
        if (!onChange)
            throw new Error(`State object (${JSON.stringify(obj, null, 2)}) must have a handler. Otherwise leave as native object.`);
        const handler = {
            get(target, property, receiver) {
                try {
                    return new Proxy(target[property], handler);
                }
                catch (err) {
                    return Reflect.get(target, property, receiver);
                }
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
    exports.StateObject = StateObject;
    exports.ViewControllerData = {
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
            exports.ViewControllerData.controllers.push(this);
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
            if (!(screen instanceof View_1.default))
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
        /**
         * Adds this ViewController to the ViewControllerData controllerMap.
         *
         * @param {string} controllerName The name of the controller.
         * @returns {this}
         *
         * @memberOf ViewController
         */
        mapTo(controllerName) {
            exports.ViewControllerData.controllerMap[controllerName] = this;
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
            return exports.ViewControllerData.controllerMap[controllerName];
        }
        signal(data) {
            for (let screen in this.screens)
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
            const controller = exports.ViewControllerData.controllers.find(currentController => {
                return Object.prototype.hasOwnProperty.call(currentController.screens, name);
            });
            if (controller)
                controller.navigateTo(name);
            else
                console.warn(`Could not navigate to ${name}`);
            return controller;
        }
        /**
         * @static
         * @returns A JSON map of all the screens on all of the controllers.
         *
         * @memberOf ViewController
         */
        static allScreens() {
            const screens = {};
            exports.ViewControllerData.controllers.forEach(controller => {
                for (const screen in controller.screens)
                    screens[screen] = controller.screens[screen];
            });
            return screens;
        }
    }
    exports.ViewController = ViewController;
    function sizing(size) {
        if (typeof size == 'number')
            return `${size}px`;
        return size;
    }
    exports.sizing = sizing;
});
define("Hi/Types/styles", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Hi/View", ["require", "exports", "Hi/human"], function (require, exports, human_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * The base class for all Human Interface views.
     *
     * @export
     * @abstract
     * @class View
     */
    class View {
        constructor(element, ...children) {
            this.$children = [];
            this.body = document.createElement(element);
            this.addClass('hi-view');
            this.children = human_2.StateObject(this.$children, () => {
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
            this.body = null;
            this.parent = null;
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
            this.body.style.backdropFilter = `blur(${human_2.sizing(radius)})`;
            this.body.style.webkitBackdropFilter = `blur(${human_2.sizing(radius)})`;
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
            if (typeof fontClass == 'string')
                this.addClass(`font-${fontClass}`);
            else if (typeof fontClass == 'number')
                this.body.style.fontSize = `${fontClass}pt`;
            else if (typeof fontClass == 'object') {
                if (Object.prototype.hasOwnProperty.call(fontClass, 'family'))
                    this.body.style.fontFamily = fontClass.family;
                if (Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                    ['number', 'string'].indexOf(typeof fontClass.size) >= 0)
                    this.body.style.fontSize = human_2.sizing(fontClass.size);
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
        hide() {
            const original = this.body.style.display;
            this.unhide = () => {
                this.body.style.display = original;
                return this;
            };
            this.body.style.display = 'none';
            return this;
        }
        unhide() {
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
                if (child) {
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
                this.body.style.borderWidth = human_2.sizing(options.size);
            if (options.color)
                this.body.style.borderColor = options.color.toString();
            if (options.style)
                this.body.style.borderStyle = options.style;
            return this;
        }
        borderTop(options) {
            if (options.size != undefined)
                this.body.style.borderTopWidth = human_2.sizing(options.size);
            if (options.color)
                this.body.style.borderTopColor = options.color.toString();
            if (options.style)
                this.body.style.borderTopStyle = options.style;
            return this;
        }
        borderRight(options) {
            if (options.size != undefined)
                this.body.style.borderRightWidth = human_2.sizing(options.size);
            if (options.color)
                this.body.style.borderRightColor = options.color.toString();
            if (options.style)
                this.body.style.borderRightStyle = options.style;
            return this;
        }
        borderBottom(options) {
            if (options.size != undefined)
                this.body.style.borderBottomWidth = human_2.sizing(options.size);
            if (options.color)
                this.body.style.borderBottomColor = options.color.toString();
            if (options.style)
                this.body.style.borderBottomStyle = options.style;
            return this;
        }
        borderLeft(options) {
            if (options.size != undefined)
                this.body.style.borderLeftWidth = human_2.sizing(options.size);
            if (options.color)
                this.body.style.borderLeftColor = options.color.toString();
            if (options.style)
                this.body.style.borderLeftStyle = options.style;
            return this;
        }
        padding(amount) {
            if (amount != undefined) {
                if (typeof amount == 'number' || typeof amount == 'string')
                    this.body.style.padding = human_2.sizing(amount);
                else if (typeof amount == 'object') {
                    if (amount.top)
                        this.body.style.paddingTop = human_2.sizing(amount.top);
                    if (amount.right)
                        this.body.style.paddingRight = human_2.sizing(amount.right);
                    if (amount.bottom)
                        this.body.style.paddingBottom = human_2.sizing(amount.bottom);
                    if (amount.left)
                        this.body.style.paddingLeft = human_2.sizing(amount.left);
                }
            }
            else
                this.body.style.padding = '10px';
            return this;
        }
        margin(amount) {
            if (amount != undefined) {
                if (typeof amount == 'number' || typeof amount == 'string')
                    this.body.style.margin = human_2.sizing(amount);
                else if (typeof amount == 'object') {
                    if (amount.top != undefined)
                        this.body.style.marginTop = human_2.sizing(amount.top);
                    if (amount.right != undefined)
                        this.body.style.marginRight = human_2.sizing(amount.right);
                    if (amount.bottom != undefined)
                        this.body.style.marginBottom = human_2.sizing(amount.bottom);
                    if (amount.left != undefined)
                        this.body.style.marginLeft = human_2.sizing(amount.left);
                }
            }
            else
                this.body.style.margin = '10px';
            return this;
        }
        rounded(amount) {
            if (amount != undefined) {
                if (typeof amount === 'string' || typeof amount === 'number') {
                    this.body.style.borderRadius = human_2.sizing(amount);
                }
                else {
                    if (amount.top) {
                        if (amount.top.left != undefined)
                            this.body.style.borderTopLeftRadius = human_2.sizing(amount.top.left);
                        if (amount.top.right != undefined)
                            this.body.style.borderTopRightRadius = human_2.sizing(amount.top.right);
                    }
                    if (amount.bottom) {
                        if (amount.bottom.left != undefined)
                            this.body.style.borderBottomLeftRadius = human_2.sizing(amount.bottom.left);
                        if (amount.bottom.right != undefined)
                            this.body.style.borderBottomRightRadius = human_2.sizing(amount.bottom.right);
                    }
                }
            }
            else
                this.body.style.borderRadius = '10px';
            return this;
        }
        width(frameWidth) {
            if (typeof frameWidth == 'string' || typeof frameWidth == 'number')
                this.body.style.width = human_2.sizing(frameWidth);
            else {
                if (frameWidth.min)
                    this.body.style.minWidth = human_2.sizing(frameWidth.min);
                if (frameWidth.max)
                    this.body.style.maxWidth = human_2.sizing(frameWidth.max);
                if (frameWidth.default)
                    this.body.style.width = human_2.sizing(frameWidth.default);
            }
            return this;
        }
        height(frameHeight) {
            if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
                this.body.style.height = human_2.sizing(frameHeight);
            else {
                if (frameHeight.min)
                    this.body.style.minWidth = human_2.sizing(frameHeight.min);
                if (frameHeight.max)
                    this.body.style.maxWidth = human_2.sizing(frameHeight.max);
                if (frameHeight.default)
                    this.body.style.width = human_2.sizing(frameHeight.default);
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
            this.body.style.bottom = human_2.sizing(offset);
            return this;
        }
        setTop(offset) {
            this.body.style.top = human_2.sizing(offset);
            return this;
        }
        setLeft(offset) {
            this.body.style.left = human_2.sizing(offset);
            return this;
        }
        setRight(offset) {
            this.body.style.right = human_2.sizing(offset);
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
        handle(data) { }
    }
    exports.default = View;
});
define("Hi/Components/Stacks", ["require", "exports", "Hi/View"], function (require, exports, View_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = exports.HIFullScreenView = exports.ScrollView = exports.HStack = exports.ZStack = exports.VStack = exports.Stack = exports.Group = void 0;
    class Group extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.body.style.alignItems = 'center';
            this.body.style.justifyContent = 'center';
            this.body.style.textAlign = 'center';
            this.body.style.boxSizing = 'border-box';
        }
    }
    exports.Group = Group;
    class Stack extends Group {
        constructor(...children) {
            super(...children);
            this.body.style.display = 'flex';
        }
    }
    exports.Stack = Stack;
    class VStack extends Stack {
        constructor(...children) {
            super(...children);
            this.body.style.flexDirection = 'column';
        }
    }
    exports.VStack = VStack;
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
                this.body.style.gridArea = '1/1/1/1';
            });
        }
    }
    exports.ZStack = ZStack;
    class HStack extends Stack {
        constructor(...children) {
            super(...children);
            this.body.style.flexDirection = 'row';
        }
    }
    exports.HStack = HStack;
    class ScrollView extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.body.style.overflowY = 'scroll';
        }
    }
    exports.ScrollView = ScrollView;
    class HIFullScreenView extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.width('100vw').height('100vh');
        }
    }
    exports.HIFullScreenView = HIFullScreenView;
    class Container extends View_2.default {
        constructor(...children) {
            super('div', ...children);
        }
    }
    exports.Container = Container;
});
define("Hi/Components/Basics", ["require", "exports", "Hi/human", "Hi/View", "Hi/Types/sizing", "Hi/Colors"], function (require, exports, human_3, View_3, sizing_1, Colors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockCode = exports.InlineCode = exports.ClickButton = exports.RadioGroup = exports.RadioButton = exports.Checkbox = exports.Hyperlink = exports.TextContent = void 0;
    class TextContent extends View_3.default {
        constructor(text) {
            super('span');
            this.text = human_3.StateObject({
                value: '',
            }, () => {
                this.body.textContent = this.text.value;
            });
            this.text.value = text;
        }
        lineHeight(height) {
            this.body.style.lineHeight = human_3.sizing(height);
            return this;
        }
    }
    exports.TextContent = TextContent;
    class Hyperlink extends View_3.default {
        constructor(text) {
            super('a');
            this.text = human_3.StateObject({
                value: '',
            }, () => {
                this.body.textContent = this.text.value;
            });
            this.text.value = text;
        }
    }
    exports.Hyperlink = Hyperlink;
    class Checkbox extends View_3.default {
        constructor() {
            super('ion-icon');
            this.state = human_3.StateObject({ checked: false }, () => {
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
    exports.Checkbox = Checkbox;
    class RadioButton extends View_3.default {
        constructor() {
            super('ion-icon');
            this.state = human_3.StateObject({ selected: false }, () => {
                this.body.setAttribute('name', this.state.selected ? 'radio-button-on' : 'radio-button-off');
            });
            this.body.setAttribute('name', 'radio-button-off');
            this.body.addEventListener('click', ev => {
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
    exports.RadioButton = RadioButton;
    class RadioGroup {
        constructor(...radioButtons) {
            this.radios = radioButtons;
            this.radios.forEach(radio => {
                radio.whenClicked(ev => {
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
    exports.RadioGroup = RadioGroup;
    class ClickButton extends View_3.default {
        constructor(...children) {
            super('button', ...children);
            this.body.style.border = 'none';
            this.body.style.color = Colors_1.HColor('blue').toString();
            this.body.style.background = 'none';
            this.body.style.borderRadius = sizing_1.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.padding = `${sizing_1.SizingValues.PADDING.xxs} ${sizing_1.SizingValues.PADDING.sm} ${sizing_1.SizingValues.PADDING.xxs} ${sizing_1.SizingValues.PADDING.sm}`;
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
    exports.ClickButton = ClickButton;
    class InlineCode extends View_3.default {
        constructor(text) {
            super('code');
            this.body.innerText = text;
            this.body.style.fontFamily = 'monospace';
        }
    }
    exports.InlineCode = InlineCode;
    class BlockCode extends View_3.default {
        constructor(text) {
            super('pre');
            this.body.innerText = text;
            this.body.style.fontFamily = 'monospace';
        }
    }
    exports.BlockCode = BlockCode;
});
define("Hi/Components/Graphics", ["require", "exports", "Hi/human", "Hi/View"], function (require, exports, human_4, View_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ImageContent = exports.Canvas = exports.IonIcon = void 0;
    class IonIcon extends View_4.default {
        constructor(name) {
            super('ion-icon');
            this.body.setAttribute('name', name);
        }
    }
    exports.IonIcon = IonIcon;
    class Canvas extends View_4.default {
        constructor() {
            super('canvas');
            this.context = this.body.getContext('2d');
        }
        width(size) {
            this.body.width = size;
            return this;
        }
        height(size) {
            this.body.height = size;
            return this;
        }
        moveTo(x, y) {
            this.context.moveTo(x, y);
            return this;
        }
        lineTo(x, y) {
            this.context.lineTo(x, y);
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
        fillRect(x1, y1, x2, y2) {
            this.context.fillRect(x1, y1, x2, y2);
            return this;
        }
    }
    exports.Canvas = Canvas;
    class ImageContent extends View_4.default {
        constructor(source, altText) {
            super('img');
            this.data = human_4.StateObject({
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
    exports.ImageContent = ImageContent;
});
define("Hi/Components/Inputs", ["require", "exports", "Hi/human", "Hi/Types/sizing", "Hi/View"], function (require, exports, human_5, sizing_2, View_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextBox = exports.DropdownOption = exports.PasswordField = exports.TextField = void 0;
    class InputField extends View_5.default {
        constructor(placeholder) {
            super('input');
            this.attributes = human_5.StateObject({
                value: '',
                placeholder: '',
            }, () => {
                this.body.setAttribute('value', this.attributes.value);
                this.body.setAttribute('placeholder', this.attributes.placeholder);
            });
            this.attributes.value = '';
            this.attributes.placeholder = placeholder || '';
            this.body.style.border = '1px solid silver';
            this.body.style.borderRadius = sizing_2.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.padding = sizing_2.SizingValues.PADDING.xxs;
            this.body.style.margin = '0';
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
    exports.default = InputField;
    class TextField extends InputField {
        constructor(placeholder) {
            super(placeholder);
            this.body.type = 'text';
            this.addClass('hi-textfield');
        }
    }
    exports.TextField = TextField;
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
    exports.PasswordField = PasswordField;
    class DropdownOption extends View_5.default {
        constructor(text, value) {
            super('option');
            this.value = value;
            this.text = text;
            this.addClass('hi-dropdown-option');
        }
    }
    exports.DropdownOption = DropdownOption;
    class TextBox extends View_5.default {
        constructor(placeholder) {
            super('textarea');
            this.body.placeholder = placeholder;
            this.body.addEventListener('change', () => {
                this.value = this.body.value;
            });
            this.value = '';
            this.body.style.borderRadius = sizing_2.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.border = '1px solid silver';
            this.body.style.textAlign = 'left';
            this.body.style.padding = sizing_2.SizingValues.PADDING.xxs;
        }
    }
    exports.TextBox = TextBox;
});
define("Hi/Components/Overlays", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Inputs", "Hi/Components/Stacks", "Hi/View", "Hi/Components/Graphics"], function (require, exports, Colors_2, Basics_1, Inputs_1, Stacks_1, View_6, Graphics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AgreementOverlay = exports.PromptOverlay = exports.AlertOverlay = exports.Overlay = void 0;
    class Overlay extends View_6.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-overlay');
            this.background(Colors_2.rgba(255, 255, 255, 0.25));
            document.body.appendChild(this.body);
        }
    }
    exports.Overlay = Overlay;
    class AlertOverlay extends Overlay {
        constructor(message) {
            super(new Stacks_1.VStack(new Basics_1.TextContent(message).padding().font('small').lineHeight('200%'), new Stacks_1.HStack(new Basics_1.ClickButton(new Basics_1.TextContent('Cancel'))
                .background(Colors_2.rgba(255, 255, 255, 0.5))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-alert-overlay-cancel-button'), new Basics_1.ClickButton(new Basics_1.TextContent('Ok'))
                .background(Colors_2.rgba(255, 255, 255, 0.5))
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
    exports.AlertOverlay = AlertOverlay;
    class PromptOverlay extends Overlay {
        constructor(prompt) {
            super(new Stacks_1.VStack(new Basics_1.TextContent(prompt).padding().font('small'), new Inputs_1.TextField().addClass('hi-prompt-input'), new Stacks_1.HStack(new Basics_1.ClickButton(new Basics_1.TextContent('Cancel'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-prompt-overlay-cancel-button'), new Basics_1.ClickButton(new Basics_1.TextContent('Ok'))
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
    exports.PromptOverlay = PromptOverlay;
    class AgreementOverlay extends Overlay {
        constructor(title, icon, ...agreementContents) {
            super(new Stacks_1.VStack(new Graphics_1.IonIcon(icon).font('lg'), new Basics_1.TextContent(title).padding().font('xl'), new Stacks_1.ScrollView(...agreementContents).height(100), new Stacks_1.HStack(new Basics_1.ClickButton(new Basics_1.TextContent('Decline'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-agreement-overlay-cancel-button'), new Basics_1.ClickButton(new Basics_1.TextContent('Agree'))
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
    exports.AgreementOverlay = AgreementOverlay;
});
define("Hi/Components/Whitespace", ["require", "exports", "Hi/View"], function (require, exports, View_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineBreak = exports.Spacer = void 0;
    class Spacer extends View_7.default {
        constructor() {
            super('div');
            this.body.innerHTML = '&nbsp;';
            this.body.style.flexGrow = '1';
            this.body.style.width = 'auto';
            this.body.style.height = 'auto';
        }
    }
    exports.Spacer = Spacer;
    class LineBreak extends View_7.default {
        constructor() {
            super('br');
        }
    }
    exports.LineBreak = LineBreak;
});
define("Sidebar", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Inputs", "Hi/Components/Overlays", "Hi/Components/Stacks", "Hi/Components/Whitespace", "Hi/human", "Hi/human"], function (require, exports, Colors_3, Basics_2, Graphics_2, Inputs_2, Overlays_1, Stacks_2, Whitespace_1, human_6, human_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    class Sidebar extends Stacks_2.VStack {
        constructor() {
            super(new SearchField(), new Stacks_2.VStack(...Sidebar.menuItems.map(item => item.view), new Whitespace_1.Spacer()).stretchWidth().id('menu-items-list'));
            this.alignStart()
                .stretchHeight()
                .padding(20)
                .borderRight({ size: 1, style: 'solid', color: Colors_3.HColor('gray5') })
                .width({
                min: 300,
                max: 300,
                default: 300,
            });
        }
        handle() {
            this.border({ color: Colors_3.HColor('gray5') });
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
    exports.default = Sidebar;
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
    class SearchField extends Inputs_2.TextField {
        constructor() {
            super('Search');
            this.stretchWidth()
                .border({ color: Colors_3.HColor('gray5') })
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
            });
        }
        handle(data) {
            if (data == 'color') {
                this.background(Colors_3.HColor('background')).foreground(Colors_3.HColor('foreground'));
                this.border({ color: Colors_3.HColor('gray5') });
            }
        }
    }
    function MenuButton(iconName, title, navigateTo) {
        return new Basics_2.ClickButton(new Stacks_2.HStack(new Graphics_2.IonIcon(iconName).font({ size: 25 }), new Basics_2.TextContent(title).padding(), new Whitespace_1.Spacer()))
            .stretchWidth()
            .padding(5)
            .rounded()
            .font('sm')
            .whenMouseOver(ev => {
            ev.view.background(Colors_3.HColor('gray6'));
        })
            .whenMouseOut(ev => {
            ev.view.background('none');
        })
            .whenClicked(ev => {
            human_6.ViewController.navigateTo(navigateTo);
            ev.view.root().getViewById('title').text.value = title;
        });
    }
    function SettingsButton() {
        return new Basics_2.ClickButton(new Stacks_2.HStack(new Graphics_2.IonIcon('settings-outline').font({ size: 25 }), new Basics_2.TextContent('Preferences').padding(), new Whitespace_1.Spacer()))
            .stretchWidth()
            .padding(5)
            .rounded()
            .font('sm')
            .whenMouseOver(ev => ev.view.background(Colors_3.HColor('gray6')))
            .whenMouseOut(ev => {
            ev.view.background('none');
        })
            .whenClicked(() => {
            new SettingsOverlay();
        });
    }
    class SettingsOverlay extends Overlays_1.Overlay {
        constructor() {
            super(new Stacks_2.VStack(new Basics_2.TextContent('Color Mode').font('xl'), new Stacks_2.HStack(new Stacks_2.HStack(new Basics_2.RadioButton()
                .padding()
                .id('light-radio-button')
                .whenClicked(() => {
                this.settings.color = 'light';
            }), new Basics_2.TextContent('Light')).padding(), new Stacks_2.HStack(new Basics_2.RadioButton()
                .padding()
                .id('dark-radio-button')
                .whenClicked(() => {
                this.settings.color = 'dark';
            }), new Basics_2.TextContent('Dark')).padding()).stretchWidth(), new Stacks_2.HStack(new Basics_2.ClickButton(new Stacks_2.VStack(new Graphics_2.IonIcon('close-circle-outline'), new Basics_2.TextContent('Close').font('sm'))).whenClicked(ev => {
                this.destroy();
            }))).stretch());
            this.settings = human_6.StateObject({
                color: 'light',
            }, prop => {
                if (prop == 'color') {
                    if (this.settings.color == 'light') {
                        this.lightRadio.setSelected(true);
                        this.darkRadio.setSelected(false);
                        Colors_3.ColorConfiguration.theme = 'light';
                    }
                    else {
                        this.lightRadio.setSelected(false);
                        this.darkRadio.setSelected(true);
                        Colors_3.ColorConfiguration.theme = 'dark';
                    }
                    for (const controller of human_7.ViewControllerData.controllers) {
                        controller.signal('color');
                    }
                }
            });
            this.lightRadio = this.getViewById('light-radio-button');
            this.darkRadio = this.getViewById('dark-radio-button');
            new Basics_2.RadioGroup(this.lightRadio, this.darkRadio);
        }
    }
});
define("Pages/PageComponents", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Stacks", "Hi/View"], function (require, exports, Colors_4, Basics_3, Graphics_3, Stacks_3, View_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTMLContent = exports.FileTreeItem = exports.ImageCaption = exports.SubtleText = exports.PrimaryText = exports.SecondaryHeading = exports.PrimaryHeading = exports.MajorIcon = void 0;
    class MajorIcon extends Graphics_3.IonIcon {
        constructor(name) {
            super(name);
            this.font(75).margin({ top: 50 });
        }
    }
    exports.MajorIcon = MajorIcon;
    class PrimaryHeading extends Basics_3.TextContent {
        constructor(text) {
            super(text);
            this.margin({ top: 25 }).font('xl');
        }
    }
    exports.PrimaryHeading = PrimaryHeading;
    class SecondaryHeading extends Basics_3.TextContent {
        constructor(text) {
            super(text);
            this.margin({ top: 50 }).font('lg');
        }
    }
    exports.SecondaryHeading = SecondaryHeading;
    class PrimaryText extends Basics_3.TextContent {
        constructor(text) {
            super(text);
            this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
        }
    }
    exports.PrimaryText = PrimaryText;
    class SubtleText extends Basics_3.TextContent {
        constructor(text) {
            super(text);
            this.padding({ left: 200, right: 200 })
                .margin({ top: 25 })
                .lineHeight('150%')
                .font('sm')
                .foreground(Colors_4.HColor('gray'));
        }
    }
    exports.SubtleText = SubtleText;
    class ImageCaption extends SubtleText {
        constructor(text) {
            super(text);
            this.padding().margin(0).lineHeight('110%');
        }
    }
    exports.ImageCaption = ImageCaption;
    class FileTreeItem extends Stacks_3.HStack {
        constructor(iconName, itemName, depth = 0) {
            const icon = new Graphics_3.IonIcon(iconName).padding(5);
            super(icon, new Basics_3.TextContent(itemName));
            this.padding({ left: 15 * depth });
            this.icon = icon;
        }
        iconColor(color) {
            this.icon.foreground(color);
            return this;
        }
    }
    exports.FileTreeItem = FileTreeItem;
    class HTMLContent extends View_8.default {
        constructor(wrapper, html) {
            super(wrapper);
            this.body.innerHTML = html;
        }
    }
    exports.HTMLContent = HTMLContent;
});
define("Pages/GettingStarted", ["require", "exports", "Hi/Components/Graphics", "Hi/Components/Stacks", "Hi/Components/Basics", "Hi/Components/Whitespace", "Hi/Colors", "Pages/PageComponents"], function (require, exports, Graphics_4, Stacks_4, Basics_4, Whitespace_2, Colors_5, PageComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GettingStarted extends Stacks_4.Container {
        constructor() {
            super(new Stacks_4.VStack(new Graphics_4.ImageContent('https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80').stretchWidth(), new PageComponents_1.ImageCaption('Photo by Belinda Fewings'), new PageComponents_1.MajorIcon('accessibility-outline'), new PageComponents_1.PrimaryHeading('Human Interface?').font('xl'), new PageComponents_1.PrimaryText('If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'), new PageComponents_1.PrimaryText('The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'), new PageComponents_1.PrimaryText('The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'), new PageComponents_1.SubtleText('Please note that this project is under heavy development and is due to many changes.'), new PageComponents_1.MajorIcon('cloud-download-outline'), new PageComponents_1.PrimaryHeading('Downloading HI MVC').font('xl'), new PageComponents_1.PrimaryText('Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'), new Basics_4.ClickButton(new Stacks_4.HStack(new Graphics_4.IonIcon('logo-github').font('xl'), new Basics_4.TextContent('Github Repository').font('md').margin({ left: 10 }))), new PageComponents_1.MajorIcon('hammer-outline'), new PageComponents_1.PrimaryHeading('Installation').font('xl'), new PageComponents_1.SecondaryHeading('Step 1: SCSS Compilation').font('lg'), new PageComponents_1.PrimaryText('This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'), new PageComponents_1.PrimaryText('In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'), new PageComponents_1.PrimaryText('Copy the file to your static directory'), new PageComponents_1.SubtleText('This process assumes you have SASS install globally on your system.'), new PageComponents_1.SecondaryHeading('Step 2: Configure TypeScript').font('lg'), new PageComponents_1.PrimaryText('TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'), new Graphics_4.ImageContent('assets/getting-started/tsconfig.png').margin({ top: 25 }), new PageComponents_1.SecondaryHeading('Step 3: Configure Directory Structure'), new Stacks_4.HStack(new Whitespace_2.Spacer(), new Stacks_4.VStack(new PageComponents_1.FileTreeItem('folder-outline', 'css').iconColor(Colors_5.HColor('blue')), new PageComponents_1.FileTreeItem('logo-css3', 'hi.css', 1).iconColor(Colors_5.HColor('blue')), new PageComponents_1.FileTreeItem('map-outline', 'hi.css.map', 1).iconColor(Colors_5.HColor('green')), new PageComponents_1.FileTreeItem('text-outline', 'fonts').iconColor(Colors_5.HColor('teal')), new PageComponents_1.FileTreeItem('logo-html5', 'index.html').iconColor(Colors_5.HColor('orange')))
                .alignStart()
                .rounded()
                .padding()
                .background(Colors_5.HColor('gray6'))
                .margin({ top: 25, right: 25 }), new Stacks_4.VStack(new PageComponents_1.PrimaryText('Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.')
                .padding(0)
                .textStart(), new PageComponents_1.PrimaryText('You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.')
                .padding(0)
                .textStart()).width('50%'), new Whitespace_2.Spacer()), new PageComponents_1.SecondaryHeading('Step 4: ')));
        }
    }
    exports.default = GettingStarted;
});
define("Hi/Components/DevKit", ["require", "exports", "Hi/Colors", "Hi/human", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Overlays", "Hi/Components/Stacks", "Hi/Components/Whitespace"], function (require, exports, Colors_6, human_8, Basics_5, Graphics_5, Overlays_2, Stacks_5, Whitespace_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Preview = void 0;
    class Preview extends Stacks_5.VStack {
        constructor(content) {
            super(new Stacks_5.HStack(Preview.OptionButton('toggle-contrast-button', 'contrast-outline').whenClicked(() => {
                this.viewerSettings.contrastToggle = !this.viewerSettings.contrastToggle;
            }), Preview.OptionButton('filter-properties-button', 'filter-circle-outline').whenClicked(() => {
                const overlay = new Overlays_2.Overlay(new Stacks_5.VStack(new Stacks_5.VStack(new Stacks_5.HStack(new Basics_5.Checkbox()
                    .padding(5)
                    .setChecked(this.viewerSettings.propertyFilters.dimensions)
                    .whenClicked(() => {
                    this.viewerSettings.propertyFilters.dimensions =
                        !this.viewerSettings.propertyFilters.dimensions;
                }), new Basics_5.TextContent('Dimensions')), new Stacks_5.HStack(new Basics_5.Checkbox()
                    .padding(5)
                    .setChecked(this.viewerSettings.propertyFilters.padding)
                    .whenClicked(() => {
                    this.viewerSettings.propertyFilters.padding =
                        !this.viewerSettings.propertyFilters.padding;
                }), new Basics_5.TextContent('Padding')), new Stacks_5.HStack(new Basics_5.Checkbox().padding(5), new Basics_5.TextContent('Description')))
                    .alignStart()
                    .textStart(), new Stacks_5.HStack(new Basics_5.ClickButton(new Graphics_5.IonIcon('close-circle-outline').font('lg'))
                    .margin({ top: 50 })
                    .whenClicked(() => overlay.destroy()))));
            }))
                .rounded({ top: { left: 10, right: 10 }, bottom: { left: 0, right: 0 } })
                .background(Colors_6.HColor('gray5'))
                .addClass('preview-options'), new Stacks_5.VStack(content)
                .border({ size: 4, style: 'dashed', color: Colors_6.HColor('gray5') })
                .borderTop({ style: 'solid' })
                .addClass('preview-canvas'), new Stacks_5.VStack(new Stacks_5.HStack(new Whitespace_3.Spacer(), new Stacks_5.HStack(Preview.dimensionSub('width').padding(), new Basics_5.TextContent(' by '), Preview.dimensionSub('height').padding()).id('component-dimensions'), new Whitespace_3.Spacer(), new Stacks_5.VStack(new Basics_5.TextContent('•').id('component-padding').font('lg'), new Basics_5.TextContent('Padding').font('sm').foreground(Colors_6.HColor('gray')))
                .padding()
                .id('component-padding-wrapper'), new Whitespace_3.Spacer()), new Stacks_5.HStack(new Stacks_5.VStack(new Basics_5.TextContent('•').id('component-name').font('lg'), new Basics_5.TextContent('Component').font('sm').foreground(Colors_6.HColor('gray'))).padding(), new Stacks_5.VStack(new Basics_5.TextContent('•').id('component-id').font('lg'), new Basics_5.TextContent('ID').font('sm').foreground(Colors_6.HColor('gray'))).padding()), new Basics_5.TextContent('Description').font('sm').foreground(Colors_6.HColor('gray')), new Basics_5.TextContent('•').id('component-description')).padding());
            this.dimensions = human_8.StateObject({
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
            this.componentInfo = human_8.StateObject({
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
            this.viewerSettings = human_8.StateObject({
                contrastToggle: false,
                propertyFilters: {
                    dimensions: true,
                    padding: true,
                    description: true,
                },
            }, property => {
                if (property == 'contrastToggle')
                    this.getViewById('toggle-contrast-button')?.foreground(Colors_6.HColor(this.viewerSettings.contrastToggle ? 'green' : 'gray'));
                if (property == 'dimensions')
                    if (this.viewerSettings.propertyFilters.dimensions)
                        this.getViewById('component-dimensions').unhide();
                    else
                        this.getViewById('component-dimensions').hide();
                if (property == 'padding')
                    if (this.viewerSettings.propertyFilters.padding)
                        this.getViewById('component-padding-wrapper').unhide();
                    else
                        this.getViewById('component-padding-wrapper').hide();
            });
            Preview.enableHover(content, this);
        }
        handle(data) {
            if (data == 'color') {
                this.getViewsByClass('preview-canvas').forEach(canvas => canvas.border({ color: Colors_6.HColor('gray5') }));
                this.getViewsByClass('preview-options').forEach(wrapper => wrapper.background(Colors_6.HColor('gray5')));
            }
        }
        static enableHover(view, exampleViewer) {
            view.whenMouseOver(ev => {
                exampleViewer.dimensions.width = view.body.clientWidth;
                exampleViewer.dimensions.height = view.body.clientHeight;
                exampleViewer.componentInfo.name = view.constructor.name;
                exampleViewer.componentInfo.id = view.body.id;
                exampleViewer.componentInfo.description = view.description;
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
            return new Stacks_5.VStack(new Basics_5.TextContent('•').id(`component-${axis}`).font('lg'), new Basics_5.TextContent(axis == 'width' ? 'Width' : 'Height').font('sm').foreground(Colors_6.HColor('gray')));
        }
        static OptionButton(id, icon) {
            return new Basics_5.ClickButton(new Graphics_5.IonIcon(icon).font('lg').foreground(Colors_6.HColor('gray')).id(id))
                .padding({
                top: 0,
                bottom: 0,
                left: 5,
                right: 5,
            })
                .whenMouseOver(ev => {
                ev.view.background(Colors_6.rgba(0, 0, 0, 0.1));
            })
                .whenMouseOut(ev => {
                ev.view.background('none');
            });
        }
    }
    exports.Preview = Preview;
});
define("Pages/SizingTypes", ["require", "exports", "Hi/Components/Stacks", "Hi/Components/Graphics", "Hi/Components/Basics", "Pages/PageComponents", "Hi/Colors", "Hi/Components/Whitespace", "Hi/Components/DevKit"], function (require, exports, Stacks_6, Graphics_6, Basics_6, PageComponents_2, Colors_7, Whitespace_4, DevKit_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeDefinitionDocumentation = void 0;
    class TypeDefinitionDocumentation extends Stacks_6.VStack {
        constructor(expansion, description, examples) {
            super(new Stacks_6.HStack(new Graphics_6.IonIcon('code-working-outline').font('lg').padding(), new Basics_6.TextContent('Type Definition').padding().width(200).textStart(), new Basics_6.BlockCode(expansion).padding().margin(0).textStart(), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart(), new Stacks_6.HStack(new Graphics_6.IonIcon('information-outline').font('lg').padding(), new Basics_6.TextContent('Description').padding().width(200).textStart(), new PageComponents_2.HTMLContent('span', description).textStart().margin(0).padding().width(400), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart(), new Stacks_6.HStack(new Graphics_6.IonIcon('code-slash-outline').font('lg').padding(), new Basics_6.TextContent('Example').padding().width(200).textStart(), new Stacks_6.ScrollView(new Basics_6.BlockCode(examples).textStart().margin(0).padding().width(400)), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart());
        }
    }
    exports.TypeDefinitionDocumentation = TypeDefinitionDocumentation;
    class SizingTypes extends Stacks_6.Container {
        constructor() {
            super(new Stacks_6.VStack(new Stacks_6.VStack(new PageComponents_2.MajorIcon('cube-outline').padding().rounded().blur(), new Basics_6.TextContent('Sizing Type Definitions')
                .blur()
                .padding()
                .rounded()
                .font('xxl')
                .bold()
                .margin({ top: 25 }))
                .backgroundImage('https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')
                .stretch()
                .padding({ bottom: 50 })
                .foreground(Colors_7.RGBAModel.WHITE), new PageComponents_2.ImageCaption('Photo by Jeremy Zero'), new PageComponents_2.PrimaryHeading('Type Definitions Overview'), new PageComponents_2.PrimaryText('For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'), new PageComponents_2.SubtleText('Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'), new Stacks_6.HStack(new Graphics_6.ImageContent('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50), new PageComponents_2.PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation('string | number', 'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.', `const imageWidth: HISizingValue = 100; // '100px'
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
                .rounded(), new DevKit_1.Preview(new Basics_6.ClickButton(new Graphics_6.ImageContent('https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 'Image of an African Gray Parrot')
                .width(100)
                .height('7em')).width('calc(50vw - 10px)')), new Stacks_6.HStack(new Graphics_6.ImageContent('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50), new PageComponents_2.PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
                .rounded(), new DevKit_1.Preview(new Stacks_6.HStack(new Stacks_6.VStack(new Basics_6.TextContent('Left Panel'))
                .width({
                min: 100,
                default: 200,
                max: 300,
            })
                .background(Colors_7.HColor('red')), new Stacks_6.VStack(new Basics_6.TextContent('Right Panel'))
                .width({ min: 300, max: 500 })
                .background(Colors_7.HColor('blue')))).width({ max: '100%' }), new Stacks_6.HStack(new Graphics_6.ImageContent('https://image.flaticon.com/icons/png/512/204/204599.png').height(50), new PageComponents_2.PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
                .rounded(), new DevKit_1.Preview(new Stacks_6.HStack(new Basics_6.TextContent('Hello World').background(Colors_7.RGBAModel.WHITE).padding(5))
                .background(Colors_7.RGBAModel.BLACK)
                .padding({
                top: 10,
                right: '5vw',
                bottom: '15pt',
                left: '10vw',
            }))));
        }
    }
    exports.default = SizingTypes;
});
define("Pages/BasicComponents", ["require", "exports", "Hi/Components/Stacks", "Pages/PageComponents", "Hi/Components/Basics", "Hi/Colors", "Hi/Components/DevKit"], function (require, exports, Stacks_7, PageComponents_3, Basics_7, Colors_8, DevKit_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BasicComponents extends Stacks_7.Container {
        constructor() {
            super(new Stacks_7.VStack(new Stacks_7.VStack(new PageComponents_3.MajorIcon('text').padding().rounded(), new Basics_7.TextContent('Basic Components')
                .padding()
                .rounded()
                .font('xxl')
                .bold()
                .margin({ top: 25 })
                .foreground(Colors_8.RGBAModel.BLACK))
                .backgroundImage('assets/BasicComponents.png')
                .stretch()
                .padding({ bottom: 50 })
                .foreground(Colors_8.RGBAModel.WHITE), new PageComponents_3.PrimaryHeading('Overview'), new PageComponents_3.PrimaryText('The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'), new PageComponents_3.PrimaryHeading('Text Component'), new PageComponents_3.PrimaryText('The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'), new DevKit_2.Preview(new Basics_7.TextContent('Designed in Philadelphia.')).margin({ top: 25 }), new PageComponents_3.PrimaryHeading('Button Components'), new PageComponents_3.PrimaryText('Buttons allow for interactivity.'), new DevKit_2.Preview(new Basics_7.ClickButton(new Basics_7.TextContent('Designed in Philadelphia.'))).margin({ top: 25 }), new PageComponents_3.PrimaryText('Common Modifiers'), new PageComponents_3.SecondaryHeading('Padding'), new DevKit_2.Preview(new Stacks_7.HStack(new Basics_7.TextContent('1').padding().background(Colors_8.HColor('orange')).describe('Default padding'), new Basics_7.TextContent('2').padding(20).background(Colors_8.HColor('green')).describe('20px padding'), new Basics_7.TextContent('3')
                .padding({ top: 10, right: 10, bottom: 25, left: 25 })
                .background(Colors_8.HColor('indigo'))
                .describe('10px 10px 25px 25px')).padding(50)).margin({ top: 25 }), new PageComponents_3.SecondaryHeading('Background/Foreground'), new DevKit_2.Preview(new Stacks_7.VStack(new Basics_7.TextContent('Designed').background(Colors_8.RGBAModel.BLACK).foreground(Colors_8.HColor('blue')), new Basics_7.TextContent('in').foreground(Colors_8.HColor('orange')), new Basics_7.TextContent('Philadelphia').background(Colors_8.HColor('green')).foreground(Colors_8.HColor('gray6'))).padding(20)).margin({ top: 25 }), new PageComponents_3.SecondaryHeading('Roundedness'), new DevKit_2.Preview(new Stacks_7.VStack(new Basics_7.TextContent('Barely Round').background(Colors_8.HColor('blue')).rounded(5).padding().margin(), new Basics_7.TextContent('Just Round Enough').background(Colors_8.HColor('blue')).rounded().padding().margin(), new Basics_7.TextContent('Very Round').background(Colors_8.HColor('blue')).rounded(20).padding().margin(), new Basics_7.TextContent('Too Round').background(Colors_8.HColor('blue')).rounded('100%').padding().margin()))));
        }
    }
    exports.default = BasicComponents;
});
define("Pages/GraphicsComponents", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/DevKit", "Hi/Components/Graphics", "Hi/Components/Overlays", "Hi/Components/Stacks", "Hi/Components/Whitespace", "Pages/PageComponents"], function (require, exports, Colors_9, Basics_8, DevKit_3, Graphics_7, Overlays_3, Stacks_8, Whitespace_5, PageComponents_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GraphicsComponent extends Stacks_8.Container {
        constructor() {
            super(new Stacks_8.VStack(new Stacks_8.VStack(new PageComponents_4.MajorIcon('images-outline').blur().rounded(), new Basics_8.TextContent('Graphics Components').font('xxl').bold().margin({ top: 25 }).blur().rounded())
                .stretchWidth()
                .backgroundImage('assets/GraphicsComponents.png')
                .foreground(Colors_9.RGBAModel.WHITE)
                .padding(), new PageComponents_4.PrimaryHeading('Icons'), new DevKit_3.Preview(new Stacks_8.VStack(new Stacks_8.HStack(new Graphics_7.IonIcon('battery-full').padding().foreground(Colors_9.HColor('green')), new Graphics_7.IonIcon('battery-half').padding().foreground(Colors_9.HColor('yellow')), new Graphics_7.IonIcon('battery-dead').padding().foreground(Colors_9.HColor('red')), new Graphics_7.IonIcon('battery-charging').padding()), new Stacks_8.HStack(new Graphics_7.IonIcon('battery-full-sharp').padding().foreground(Colors_9.HColor('green')), new Graphics_7.IonIcon('battery-half-sharp').padding().foreground(Colors_9.HColor('yellow')), new Graphics_7.IonIcon('battery-half-sharp').padding().foreground(Colors_9.HColor('red')), new Graphics_7.IonIcon('battery-charging-sharp').padding()))
                .font('xxl')
                .padding(25)).margin({ top: 25 }), new PageComponents_4.PrimaryHeading('Instagram Component?'), new DevKit_3.Preview(new Stacks_8.VStack(new Graphics_7.ImageContent('https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80')
                .width({ max: '100%' })
                .margin({ bottom: 10 }), new Stacks_8.HStack(new Basics_8.ClickButton(new Graphics_7.IonIcon('heart-outline')
                .describe('Icon Name: heart-outline')
                .font('xl')
                .foreground(Colors_9.HColor('red'))
                .id('like-button')).whenClicked(ev => {
                const likeButton = ev.view.getViewById('like-button');
                likeButton.body.setAttribute('name', likeButton.body.getAttribute('name').indexOf('outline') > 0
                    ? 'heart'
                    : 'heart-outline');
            }), new Basics_8.ClickButton(new Graphics_7.IonIcon('chatbubble-outline')
                .describe('Icon Name: chatbubble-outline')
                .font('xl')
                .id('comment-button')).whenClicked(() => new Overlays_3.AlertOverlay('Messages are disabled for this post.')), new Basics_8.ClickButton(new Graphics_7.IonIcon('bookmark-outline')
                .describe('Icon Name: bookmark-outline')
                .font('xl')
                .foreground(Colors_9.HColor('orange'))
                .id('bookmark-button')).whenClicked(ev => {
                const bookmarkButton = ev.view.getViewById('bookmark-button');
                bookmarkButton.body.setAttribute('name', bookmarkButton.body.getAttribute('name').indexOf('outline') > 0
                    ? 'bookmark'
                    : 'bookmark-outline');
            }), new Basics_8.ClickButton(new Graphics_7.IonIcon('share-outline')
                .describe('Icon Name: share-outline')
                .font('xl')
                .id('share-button')), new Whitespace_5.Spacer(), new Basics_8.TextContent('@jimmyferminphotography').font('md').foreground(Colors_9.HColor('gray'))).stretch())
                .margin()
                .padding()
                .background(Colors_9.HColor('gray6'))
                .rounded()).width({ max: '80%' })));
        }
    }
    exports.default = GraphicsComponent;
});
define("GuidesApp", ["require", "exports", "Hi/Colors", "Hi/Components/Stacks", "Hi/human", "Hi/Components/Basics", "Sidebar", "Pages/GettingStarted", "Pages/SizingTypes", "Pages/BasicComponents", "Pages/GraphicsComponents"], function (require, exports, Colors_10, Stacks_9, human_9, Basics_9, Sidebar_1, GettingStarted_1, SizingTypes_1, BasicComponents_1, GraphicsComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GuidesApp extends Stacks_9.HIFullScreenView {
        constructor() {
            super(new Stacks_9.HStack(new Sidebar_1.default(), new Stacks_9.VStack(new Titlebar().id('titlebar'), new MessageViewer().id('portfolio-viewer').stretch())
                .stretchHeight()
                .width({
                min: 'calc(100vw - 300px)',
                default: 'calc(100vw - 300px)',
                max: 'calc(100vw - 300px)',
            })
                .alignStart()).stretch());
            this.portfolioViewerController = new human_9.ViewController({
                gettingStarted: new GettingStarted_1.default().stretch().padding({ top: 60 }),
                sizingTypes: new SizingTypes_1.default().stretch().padding({ top: 60 }),
                basicComponents: new BasicComponents_1.default().stretch().padding({ top: 60 }),
                graphicsComponents: new GraphicsComponents_1.default().stretch().padding({ top: 60 }),
            });
            const portfolioViewer = this.getViewById('portfolio-viewer');
            if (portfolioViewer)
                this.portfolioViewerController.bind(portfolioViewer.body);
        }
        handle(data) {
            console.log('Handling guides app');
            if (data == 'color') {
                if (Colors_10.ColorConfiguration.theme == 'dark') {
                    this.background(Colors_10.RGBAModel.BLACK).foreground(Colors_10.RGBAModel.WHITE);
                    this.getViewById('titlebar').background(Colors_10.rgba(0, 0, 0, 0.5)).foreground(Colors_10.RGBAModel.WHITE);
                }
                else {
                    this.background(Colors_10.RGBAModel.WHITE).foreground(Colors_10.RGBAModel.BLACK);
                    this.getViewById('titlebar').background(Colors_10.rgba(255, 255, 255, 0.5)).foreground(Colors_10.RGBAModel.BLACK);
                }
            }
            for (const screenName in this.portfolioViewerController.screens)
                this.portfolioViewerController.screens[screenName].signal(data);
        }
    }
    exports.default = GuidesApp;
    class Titlebar extends Stacks_9.HStack {
        constructor() {
            super(new Basics_9.TextContent('Title').id('title'));
            this.width({
                min: 'calc(100vw - 300px)',
                default: 'calc(100vw - 300px)',
                max: 'calc(100vw - 300px)',
            })
                .padding(20)
                .borderBottom({
                size: 1,
                style: 'solid',
                color: Colors_10.HColor('gray5'),
            })
                .position('fixed')
                .background(Colors_10.rgba(255, 255, 255, 0.5))
                .blur(25)
                .zIndex(10);
        }
        handle(data) {
            if (data == 'color')
                this.border({ color: Colors_10.HColor('gray5') });
        }
    }
    class MessageViewer extends Stacks_9.ScrollView {
        constructor() {
            super(new Stacks_9.VStack(new Basics_9.TextContent('Select a menu item').foreground(Colors_10.HColor('gray'))).stretch());
        }
    }
});
define("guides", ["require", "exports", "GuidesApp", "Hi/human"], function (require, exports, GuidesApp_1, human_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new human_10.ViewController({
        main: new GuidesApp_1.default(),
    })
        .bind()
        .navigateTo();
});
define("Hi/ViewConnectors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FormConnector = void 0;
    class FormConnector {
        constructor(action) {
            this.action = action;
            this.inputViews = {};
        }
        post(callback) {
            const body = {};
            for (const key in this.inputViews)
                body[key] = this.inputViews[key].attributes.value;
            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(body),
            })
                .then(data => data.json())
                .then(callback);
        }
        connectInput(name, field) {
            this.inputViews[name] = field;
            return this;
        }
        connectSubmitButton(button, callback) {
            button.whenClicked(() => {
                this.post(callback);
            });
            return this;
        }
    }
    exports.FormConnector = FormConnector;
});
//# sourceMappingURL=guides.js.map