define("Types/sizing", ["require", "exports", "human"], function (require, exports, human_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SizingValues = void 0;
    exports.SizingValues = {
        BORDER_RADIUS: {
            xxs: human_1.sizing(3),
            xs: human_1.sizing(6),
            sm: human_1.sizing(9),
            md: human_1.sizing(12),
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
define("Types/states", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Types/styles", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("View", ["require", "exports", "human", "Types/sizing"], function (require, exports, human_2, sizing_1) {
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
            if (typeof fontClass == 'string' && sizing_1.SizingValues.FONT.hasOwnProperty(fontClass)) {
                this.body.style.fontSize = sizing_1.SizingValues.FONT[fontClass];
            }
            else if (typeof fontClass == 'string') {
                this.body.style.font = fontClass;
            }
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
        handle(data) {
            // Should be overrideen by children
        }
    }
    exports.default = View;
});
define("human", ["require", "exports", "View"], function (require, exports, View_1) {
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
define("Colors", ["require", "exports", "human"], function (require, exports, human_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.whichTheme = exports.changeTheme = exports.HumanColorSwatch = exports.rgba = exports.rgb = exports.HColor = exports.RGBAModel = void 0;
    class RGBAModel {
        constructor(r, g, b, a = 1) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        red(r) {
            this.r = r;
            return this;
        }
        green(g) {
            this.g = g;
            return this;
        }
        blue(b) {
            this.b = b;
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
    exports.RGBAModel = RGBAModel;
    RGBAModel.WHITE = new RGBAModel(255, 255, 255);
    RGBAModel.BLACK = new RGBAModel(0, 0, 0);
    function HColor(color) {
        if (colorTheme === 'light') {
            return RGBAModel.copy(exports.HumanColorSwatch.light[color]);
        }
        else {
            return RGBAModel.copy(exports.HumanColorSwatch.dark[color]);
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
    var colorTheme = (() => {
        let tmp = localStorage.getItem('hi://theme');
        if (tmp == 'light' || tmp == 'dark')
            return tmp;
        return 'light';
    })();
    function changeTheme(theme) {
        colorTheme = theme;
        human_3.ViewControllerData.controllers.forEach(controller => controller.signal('color'));
        localStorage.setItem('hi://theme', colorTheme);
    }
    exports.changeTheme = changeTheme;
    function whichTheme() {
        return colorTheme;
    }
    exports.whichTheme = whichTheme;
});
define("Components/Basics", ["require", "exports", "human", "View", "Types/sizing", "Colors"], function (require, exports, human_4, View_2, sizing_2, Colors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockCode = exports.InlineCode = exports.ClickButton = exports.RadioGroup = exports.RadioButton = exports.Checkbox = exports.Hyperlink = exports.TextContent = void 0;
    class TextContent extends View_2.default {
        constructor(text) {
            super('span');
            this.text = human_4.StateObject({
                value: '',
            }, () => {
                this.body.textContent = this.text.value;
            });
            this.text.value = text;
        }
        lineHeight(height) {
            this.body.style.lineHeight = human_4.sizing(height);
            return this;
        }
    }
    exports.TextContent = TextContent;
    class Hyperlink extends View_2.default {
        constructor(text) {
            super('a');
            this.text = human_4.StateObject({
                value: '',
            }, () => {
                this.body.textContent = this.text.value;
            });
            this.text.value = text;
        }
    }
    exports.Hyperlink = Hyperlink;
    class Checkbox extends View_2.default {
        constructor() {
            super('ion-icon');
            this.state = human_4.StateObject({ checked: false }, () => {
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
    class RadioButton extends View_2.default {
        constructor() {
            super('ion-icon');
            this.state = human_4.StateObject({ selected: false }, () => {
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
    class ClickButton extends View_2.default {
        constructor(...children) {
            super('button', ...children);
            this.body.style.border = 'none';
            this.body.style.color = Colors_1.HColor('blue').toString();
            this.body.style.background = 'none';
            this.body.style.borderRadius = sizing_2.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.padding = `${sizing_2.SizingValues.PADDING.xxs} ${sizing_2.SizingValues.PADDING.sm} ${sizing_2.SizingValues.PADDING.xxs} ${sizing_2.SizingValues.PADDING.sm}`;
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
    class InlineCode extends View_2.default {
        constructor(text) {
            super('code');
            this.body.innerText = text;
            this.body.style.fontFamily = 'monospace';
        }
    }
    exports.InlineCode = InlineCode;
    class BlockCode extends View_2.default {
        constructor(text) {
            super('pre');
            this.body.innerText = text;
            this.body.style.fontFamily = 'monospace';
        }
    }
    exports.BlockCode = BlockCode;
});
define("Components/Inputs", ["require", "exports", "human", "Types/sizing", "View"], function (require, exports, human_5, sizing_3, View_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextBox = exports.DropdownOption = exports.PasswordField = exports.TextField = void 0;
    class InputField extends View_3.default {
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
            this.body.style.borderRadius = sizing_3.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.padding = sizing_3.SizingValues.PADDING.xxs;
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
    class DropdownOption extends View_3.default {
        constructor(text, value) {
            super('option');
            this.value = value;
            this.text = text;
            this.addClass('hi-dropdown-option');
        }
    }
    exports.DropdownOption = DropdownOption;
    class TextBox extends View_3.default {
        constructor(placeholder) {
            super('textarea');
            this.body.placeholder = placeholder;
            this.body.addEventListener('change', () => {
                this.value = this.body.value;
            });
            this.value = '';
            this.body.style.borderRadius = sizing_3.SizingValues.BORDER_RADIUS.xxs;
            this.body.style.border = '1px solid silver';
            this.body.style.textAlign = 'left';
            this.body.style.padding = sizing_3.SizingValues.PADDING.xxs;
        }
    }
    exports.TextBox = TextBox;
});
define("ViewConnectors", ["require", "exports"], function (require, exports) {
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
define("Components/Graphics", ["require", "exports", "human", "View"], function (require, exports, human_6, View_4) {
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
            this.data = human_6.StateObject({
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
define("Components/Stacks", ["require", "exports", "View"], function (require, exports, View_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = exports.HIFullScreenView = exports.ScrollView = exports.HStack = exports.ZStack = exports.VStack = exports.Stack = exports.Group = void 0;
    class Group extends View_5.default {
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
    class ScrollView extends View_5.default {
        constructor(...children) {
            super('div', ...children);
            this.body.style.overflowY = 'scroll';
        }
    }
    exports.ScrollView = ScrollView;
    class HIFullScreenView extends View_5.default {
        constructor(...children) {
            super('div', ...children);
            this.width('100vw').height('100vh');
        }
    }
    exports.HIFullScreenView = HIFullScreenView;
    class Container extends View_5.default {
        constructor(...children) {
            super('div', ...children);
        }
    }
    exports.Container = Container;
});
define("Components/Overlays", ["require", "exports", "Colors", "Components/Basics", "Components/Inputs", "Components/Stacks", "View", "Components/Graphics"], function (require, exports, Colors_2, Basics_1, Inputs_1, Stacks_1, View_6, Graphics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AgreementOverlay = exports.PromptOverlay = exports.AlertOverlay = exports.Overlay = void 0;
    class Overlay extends View_6.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-overlay');
            this.background(Colors_2.HColor('background').alpha(0.25));
            this.foreground(Colors_2.HColor('foreground'));
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
define("Components/Whitespace", ["require", "exports", "View"], function (require, exports, View_7) {
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
define("Components/DevKit", ["require", "exports", "Colors", "human", "Components/Basics", "Components/Graphics", "Components/Overlays", "Components/Stacks", "Components/Whitespace"], function (require, exports, Colors_3, human_7, Basics_2, Graphics_2, Overlays_1, Stacks_2, Whitespace_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Preview = void 0;
    class Preview extends Stacks_2.VStack {
        constructor(content) {
            super(new Stacks_2.HStack(Preview.OptionButton('toggle-contrast-button', 'contrast-outline').whenClicked(() => {
                this.viewerSettings.contrastToggle = !this.viewerSettings.contrastToggle;
            }), Preview.OptionButton('filter-properties-button', 'filter-circle-outline').whenClicked(() => {
                const overlay = new Overlays_1.Overlay(new Stacks_2.VStack(new Stacks_2.VStack(new Stacks_2.HStack(new Basics_2.Checkbox()
                    .padding(5)
                    .setChecked(this.viewerSettings.propertyFilters.dimensions)
                    .whenClicked(() => {
                    this.viewerSettings.propertyFilters.dimensions =
                        !this.viewerSettings.propertyFilters.dimensions;
                }), new Basics_2.TextContent('Dimensions')), new Stacks_2.HStack(new Basics_2.Checkbox()
                    .padding(5)
                    .setChecked(this.viewerSettings.propertyFilters.padding)
                    .whenClicked(() => {
                    this.viewerSettings.propertyFilters.padding =
                        !this.viewerSettings.propertyFilters.padding;
                }), new Basics_2.TextContent('Padding')), new Stacks_2.HStack(new Basics_2.Checkbox().padding(5), new Basics_2.TextContent('Description')))
                    .alignStart()
                    .textStart(), new Stacks_2.HStack(new Basics_2.ClickButton(new Graphics_2.IonIcon('close-circle-outline').font('lg'))
                    .margin({ top: 50 })
                    .whenClicked(() => overlay.destroy()))));
            }))
                .rounded({ top: { left: 10, right: 10 }, bottom: { left: 0, right: 0 } })
                .background(Colors_3.HColor('gray5'))
                .addClass('preview-options'), new Stacks_2.VStack(content)
                .border({ size: 4, style: 'dashed', color: Colors_3.HColor('gray5') })
                .borderTop({ style: 'solid' })
                .addClass('preview-canvas'), new Stacks_2.VStack(new Stacks_2.HStack(new Whitespace_1.Spacer(), new Stacks_2.HStack(Preview.dimensionSub('width').padding(), new Basics_2.TextContent(' by '), Preview.dimensionSub('height').padding()).id('component-dimensions'), new Whitespace_1.Spacer(), new Stacks_2.VStack(new Basics_2.TextContent('•').id('component-padding').font('lg'), new Basics_2.TextContent('Padding').font('sm').foreground(Colors_3.HColor('gray')))
                .padding()
                .id('component-padding-wrapper'), new Whitespace_1.Spacer()), new Stacks_2.HStack(new Stacks_2.VStack(new Basics_2.TextContent('•').id('component-name').font('lg'), new Basics_2.TextContent('Component').font('sm').foreground(Colors_3.HColor('gray'))).padding(), new Stacks_2.VStack(new Basics_2.TextContent('•').id('component-id').font('lg'), new Basics_2.TextContent('ID').font('sm').foreground(Colors_3.HColor('gray'))).padding()), new Basics_2.TextContent('Description').font('sm').foreground(Colors_3.HColor('gray')), new Basics_2.TextContent('•').id('component-description')).padding());
            this.dimensions = human_7.StateObject({
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
            this.componentInfo = human_7.StateObject({
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
            this.viewerSettings = human_7.StateObject({
                contrastToggle: false,
                propertyFilters: {
                    dimensions: true,
                    padding: true,
                    description: true,
                },
            }, property => {
                if (property == 'contrastToggle')
                    this.getViewById('toggle-contrast-button')?.foreground(Colors_3.HColor(this.viewerSettings.contrastToggle ? 'green' : 'gray'));
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
                this.getViewsByClass('preview-canvas').forEach(canvas => canvas.border({ color: Colors_3.HColor('gray5') }));
                this.getViewsByClass('preview-options').forEach(wrapper => wrapper.background(Colors_3.HColor('gray5')));
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
            return new Stacks_2.VStack(new Basics_2.TextContent('•').id(`component-${axis}`).font('lg'), new Basics_2.TextContent(axis == 'width' ? 'Width' : 'Height').font('sm').foreground(Colors_3.HColor('gray')));
        }
        static OptionButton(id, icon) {
            return new Basics_2.ClickButton(new Graphics_2.IonIcon(icon).font('lg').foreground(Colors_3.HColor('gray')).id(id))
                .padding({
                top: 0,
                bottom: 0,
                left: 5,
                right: 5,
            })
                .whenMouseOver(ev => {
                ev.view.background(Colors_3.rgba(0, 0, 0, 0.1));
            })
                .whenMouseOut(ev => {
                ev.view.background('none');
            });
        }
    }
    exports.Preview = Preview;
});
//# sourceMappingURL=hi.js.map