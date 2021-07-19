define("Hi/Colors", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HumanColorSwatch = exports.rgba = exports.rgb = exports.HColor = void 0;
    function HColor(color, mode = 'light') {
        if (mode === 'light') {
            return exports.HumanColorSwatch.light[color];
        }
        else {
            throw new Error("HColor(..., 'dark') does not work yet.");
        }
    }
    exports.HColor = HColor;
    function rgb(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }
    exports.rgb = rgb;
    function rgba(r, g, b, a) {
        return `rgb(${r}, ${g}, ${b}, ${a})`;
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
            gray3: rgb(199, 199, 204),
            gray6: rgb(242, 242, 247),
        },
    };
});
define("Hi/Types/sizing", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Hi/Types/states", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Hi/human", ["require", "exports", "Hi/View"], function (require, exports, View_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sizing = exports.ViewController = exports.StateObject = void 0;
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
    const ViewControllerData = {
        /**
         * @deprecated
         */
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
            ViewControllerData.controllers.forEach(controller => {
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
define("Hi/View", ["require", "exports", "Hi/human"], function (require, exports, human_1) {
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
            this.children = human_1.StateObject(this.$children, () => {
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
                if (child.body.id == id)
                    return child;
                const childResult = child.getViewById(id);
                if (childResult)
                    return childResult;
            }
        }
        getModelData() {
            return {
                children: this.$children.map(child => child.getModelData()),
            };
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
        animate(configuration) {
            const from = configuration.from || 0;
            const to = configuration.to || from + 100;
            const interval = configuration.interval || 50;
            let curr = from;
            const intervalPointer = setInterval(() => {
                if (curr >= to)
                    clearInterval(intervalPointer);
                else
                    configuration.adapter(this, curr);
                curr++;
            }, interval);
            return this;
        }
        background(color) {
            this.body.style.background = color;
            return this;
        }
        blur(radius = 5) {
            this.body.style.backdropFilter = `blur(${human_1.sizing(radius)})`;
            this.body.style.webkitBackdropFilter = `blur(${human_1.sizing(radius)})`;
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
                    this.body.style.fontSize = human_1.sizing(fontClass.size);
                if (Object.prototype.hasOwnProperty.call(fontClass, 'color'))
                    this.foreground(fontClass.color);
            }
            return this;
        }
        foreground(color) {
            this.body.style.color = color;
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
            this.body.id = idName;
            return this;
        }
        grow() {
            this.addClass('hi-grow');
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
                this.body.style.borderWidth = human_1.sizing(options.size);
            if (options.color)
                this.body.style.borderColor = options.color;
            if (options.style)
                this.body.style.borderStyle = options.style;
            return this;
        }
        borderTop(options) {
            if (options.size != undefined)
                this.body.style.borderTopWidth = human_1.sizing(options.size);
            if (options.color)
                this.body.style.borderTopColor = options.color;
            if (options.style)
                this.body.style.borderTopStyle = options.style;
            return this;
        }
        borderRight(options) {
            if (options.size != undefined)
                this.body.style.borderRightWidth = human_1.sizing(options.size);
            if (options.color)
                this.body.style.borderRightColor = options.color;
            if (options.style)
                this.body.style.borderRightStyle = options.style;
            return this;
        }
        borderBottom(options) {
            if (options.size != undefined)
                this.body.style.borderBottomWidth = human_1.sizing(options.size);
            if (options.color)
                this.body.style.borderBottomColor = options.color;
            if (options.style)
                this.body.style.borderBottomStyle = options.style;
            return this;
        }
        borderLeft(options) {
            if (options.size != undefined)
                this.body.style.borderLeftWidth = human_1.sizing(options.size);
            if (options.color)
                this.body.style.borderLeftColor = options.color;
            if (options.style)
                this.body.style.borderLeftStyle = options.style;
            return this;
        }
        padding(amount) {
            if (amount != undefined) {
                if (typeof amount == 'number' || typeof amount == 'string')
                    this.body.style.padding = human_1.sizing(amount);
                else if (typeof amount == 'object') {
                    if (amount.top)
                        this.body.style.paddingTop = human_1.sizing(amount.top);
                    if (amount.right)
                        this.body.style.paddingRight = human_1.sizing(amount.right);
                    if (amount.bottom)
                        this.body.style.paddingBottom = human_1.sizing(amount.bottom);
                    if (amount.left)
                        this.body.style.paddingLeft = human_1.sizing(amount.left);
                }
            }
            else
                this.body.style.padding = '10px';
            return this;
        }
        margin(amount) {
            if (amount != undefined) {
                if (typeof amount == 'number' || typeof amount == 'string')
                    this.body.style.margin = human_1.sizing(amount);
                else if (typeof amount == 'object') {
                    if (amount.top != undefined)
                        this.body.style.marginTop = human_1.sizing(amount.top);
                    if (amount.right != undefined)
                        this.body.style.marginRight = human_1.sizing(amount.right);
                    if (amount.bottom != undefined)
                        this.body.style.marginBottom = human_1.sizing(amount.bottom);
                    if (amount.left != undefined)
                        this.body.style.marginLeft = human_1.sizing(amount.left);
                }
            }
            else
                this.body.style.margin = '10px';
            return this;
        }
        rounded(amount) {
            if (amount != undefined) {
                if (typeof amount === 'string' || typeof amount === 'number') {
                    this.body.style.borderRadius = human_1.sizing(amount);
                }
                else {
                    if (amount.top) {
                        if (amount.top.left != undefined)
                            this.body.style.borderTopLeftRadius = human_1.sizing(amount.top.left);
                        if (amount.top.right != undefined)
                            this.body.style.borderTopRightRadius = human_1.sizing(amount.top.right);
                    }
                    if (amount.bottom) {
                        if (amount.bottom.left != undefined)
                            this.body.style.borderBottomLeftRadius = human_1.sizing(amount.bottom.left);
                        if (amount.bottom.right != undefined)
                            this.body.style.borderBottomRightRadius = human_1.sizing(amount.bottom.right);
                    }
                }
            }
            else
                this.body.style.borderRadius = '10px';
            return this;
        }
        width(frameWidth) {
            if (typeof frameWidth == 'string' || typeof frameWidth == 'number')
                this.body.style.width = human_1.sizing(frameWidth);
            else {
                if (frameWidth.min)
                    this.body.style.minWidth = human_1.sizing(frameWidth.min);
                if (frameWidth.max)
                    this.body.style.maxWidth = human_1.sizing(frameWidth.max);
                if (frameWidth.default)
                    this.body.style.width = human_1.sizing(frameWidth.default);
            }
            return this;
        }
        height(frameHeight) {
            if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
                this.body.style.height = human_1.sizing(frameHeight);
            else {
                if (frameHeight.min)
                    this.body.style.minWidth = human_1.sizing(frameHeight.min);
                if (frameHeight.max)
                    this.body.style.maxWidth = human_1.sizing(frameHeight.max);
                if (frameHeight.default)
                    this.body.style.width = human_1.sizing(frameHeight.default);
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
            this.body.style.bottom = human_1.sizing(offset);
            return this;
        }
        setTop(offset) {
            this.body.style.top = human_1.sizing(offset);
            return this;
        }
        setLeft(offset) {
            this.body.style.left = human_1.sizing(offset);
            return this;
        }
        setRight(offset) {
            this.body.style.right = human_1.sizing(offset);
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
    }
    exports.default = View;
});
define("Hi/Components/Stacks", ["require", "exports", "Hi/View"], function (require, exports, View_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = exports.HIFullScreenView = exports.ScrollView = exports.HStack = exports.ZStack = exports.VStack = exports.Group = void 0;
    class Group extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-group');
        }
    }
    exports.Group = Group;
    class VStack extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-vstack');
        }
    }
    exports.VStack = VStack;
    class ZStack extends View_2.default {
        /**
         * Creates an instance of ZStack.
         * @param {View[]} children The children of this ZStack.
         *
         * @memberOf ZStack
         */
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-zstack');
        }
    }
    exports.ZStack = ZStack;
    class HStack extends View_2.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-hstack');
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
            this.body.className = 'hi-screen';
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
define("Hi/Components/Basics", ["require", "exports", "Hi/human", "Hi/View"], function (require, exports, human_2, View_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockCode = exports.InlineCode = exports.Button = exports.Text = void 0;
    class Text extends View_3.default {
        constructor(text) {
            super('span');
            this.text = human_2.StateObject({
                value: '',
            }, () => {
                this.body.innerText = this.text.value;
            });
            this.text.value = text;
        }
        lineHeight(height) {
            this.body.style.lineHeight = human_2.sizing(height);
            return this;
        }
    }
    exports.Text = Text;
    class Button extends View_3.default {
        constructor(...children) {
            super('button', ...children);
            this.body.className = 'hi-button';
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
    exports.Button = Button;
    class InlineCode extends View_3.default {
        constructor(text) {
            super('code');
            this.body.innerText = text;
            this.addClass('hi-inline-code');
        }
    }
    exports.InlineCode = InlineCode;
    class BlockCode extends View_3.default {
        constructor(text) {
            super('pre');
            this.body.innerText = text;
            this.addClass('hi-block-code');
        }
    }
    exports.BlockCode = BlockCode;
});
define("Hi/Components/Graphics", ["require", "exports", "Hi/human", "Hi/View"], function (require, exports, human_3, View_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Image = exports.Canvas = exports.Icon = void 0;
    class Icon extends View_4.default {
        constructor(name) {
            super('ion-icon');
            this.body.setAttribute('name', name);
        }
    }
    exports.Icon = Icon;
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
    class Image extends View_4.default {
        constructor(source, altText) {
            super('img');
            this.data = human_3.StateObject({
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
    exports.Image = Image;
});
define("Hi/Components/Inputs", ["require", "exports", "Hi/human", "Hi/View"], function (require, exports, human_4, View_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextBox = exports.DropdownOption = exports.PasswordField = exports.TextField = void 0;
    class InputField extends View_5.default {
        constructor(placeholder) {
            super('input');
            this.attributes = human_4.StateObject({
                value: '',
                placeholder: '',
            }, () => {
                this.body.setAttribute('value', this.attributes.value);
                this.body.setAttribute('placeholder', this.attributes.placeholder);
            });
            this.addClass('hi-inputfield');
            this.attributes.value = '';
            this.attributes.placeholder = placeholder || '';
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
    /**
     * A dropdown list which allows the user to select an option
     * based on predefined values.
     *
     * @class DropdownMenu
     * @extends {View}
     */
    // class DropdownMenu extends View {
    //     public selected: any;
    //     public body: HTMLSelectElement;
    //     /**
    //      * Creates an instance of DropdownMenu.
    //      * @param {any} options The list of options to include in the dropdown menu.
    //      *
    //      * @memberOf DropdownMenu
    //      */
    //     constructor(...options: DropdownOption[]) {
    //         super('select', ...options);
    //         this.selected = StateString(this.body.value, () => {
    //             this.body.value = this.selected;
    //         });
    //         this.body.addEventListener('change', () => {
    //             this.selected = this.body.value;
    //         });
    //         this.addClass('hi-dropdown-menu');
    //     }
    //     /**
    //      * Binds an action to this DropdownMenu for when the selected
    //      * value is changed.
    //      *
    //      * @param {(value: string) => voids} action The action to be called when changed.
    //      * @returns This DropdownMenu.
    //      *
    //      * @memberOf DropdownMenu
    //      */
    //     whenChanged(action: (value: string) => void) {
    //         this.body.addEventListener('change', () => {
    //             this.selected = this.body.value;
    //             action(this.selected);
    //         });
    //         return this;
    //     }
    // }
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
            this.addClass('hi-textbox');
        }
    }
    exports.TextBox = TextBox;
});
define("Hi/Components/Whitespace", ["require", "exports", "Hi/View"], function (require, exports, View_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LineBreak = exports.Spacer = void 0;
    class Spacer extends View_6.default {
        constructor() {
            super('div');
            this.body.className = 'hi-spacer';
            this.body.innerHTML = '&nbsp;';
        }
    }
    exports.Spacer = Spacer;
    class LineBreak extends View_6.default {
        constructor() {
            super('br');
        }
    }
    exports.LineBreak = LineBreak;
});
define("Sidebar", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Inputs", "Hi/Components/Stacks", "Hi/Components/Whitespace", "Hi/human"], function (require, exports, Colors_1, Basics_1, Graphics_1, Inputs_1, Stacks_1, Whitespace_1, human_5) {
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
    class Sidebar extends Stacks_1.VStack {
        constructor() {
            super(new Inputs_1.TextField('Search')
                .stretchWidth()
                .border({ color: Colors_1.HColor('gray6') })
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
                    .sort((a, b) => Sidebar.menuSearchScore(query, a.keywords) -
                    Sidebar.menuSearchScore(query, b.keywords))
                    .map(item => item.view));
            }), new Stacks_1.VStack(...Sidebar.menuItems.map(item => item.view)).stretchWidth().id('menu-items-list'));
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
            keywords: SmartKeywords(['basic components']),
        },
    ];
    function MenuButton(iconName, title, navigateTo) {
        const btn = new Basics_1.Button(new Stacks_1.HStack(new Graphics_1.Icon(iconName).font({ size: 25 }), new Basics_1.Text(title).padding(), new Whitespace_1.Spacer()))
            .stretchWidth()
            .padding(5)
            .rounded()
            .font('sm');
        btn.whenMouseOver(() => {
            btn.background(Colors_1.HColor('gray6'));
        })
            .whenMouseOut(() => {
            btn.background('none');
        })
            .whenClicked(() => {
            human_5.ViewController.navigateTo(navigateTo);
            btn.root().getViewById('title').text.value = title;
        });
        return btn;
    }
});
define("Hi/Components/Overlays", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Inputs", "Hi/Components/Stacks", "Hi/View", "Hi/Components/Graphics"], function (require, exports, Colors_2, Basics_2, Inputs_2, Stacks_2, View_7, Graphics_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AgreementOverlay = exports.PromptOverlay = exports.AlertOverlay = exports.Overlay = void 0;
    class Overlay extends View_7.default {
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
            super(new Stacks_2.VStack(new Basics_2.Text(message).padding().font('small').lineHeight('200%'), new Stacks_2.HStack(new Basics_2.Button(new Basics_2.Text('Cancel'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-alert-overlay-cancel-button'), new Basics_2.Button(new Basics_2.Text('Ok'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-alert-overlay-confirm-button')).padding())
                .stretchHeight()
                .width('50%'));
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
            super(new Stacks_2.VStack(new Basics_2.Text(prompt).padding().font('small'), new Inputs_2.TextField().addClass('hi-prompt-input'), new Stacks_2.HStack(new Basics_2.Button(new Basics_2.Text('Cancel'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-prompt-overlay-cancel-button'), new Basics_2.Button(new Basics_2.Text('Ok'))
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
            super(new Stacks_2.VStack(new Graphics_2.Icon(icon).font('lg'), new Basics_2.Text(title).padding().font('xl'), new Stacks_2.ScrollView(...agreementContents).height(100), new Stacks_2.HStack(new Basics_2.Button(new Basics_2.Text('Decline'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-agreement-overlay-cancel-button'), new Basics_2.Button(new Basics_2.Text('Agree'))
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
define("SignupViewer", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Inputs", "Hi/Components/Overlays", "Hi/Components/Stacks", "Hi/Components/Whitespace", "Hi/ViewConnectors"], function (require, exports, Colors_3, Basics_3, Graphics_3, Inputs_3, Overlays_1, Stacks_3, Whitespace_2, ViewConnectors_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SignupViewer extends Stacks_3.VStack {
        constructor() {
            const fname = new Inputs_3.TextField('First Name')
                .padding()
                .rounded(0)
                .rounded({ top: { left: 10 } })
                .borderBottom({ style: 'none' })
                .borderRight({ style: 'none' })
                .noOutline();
            const middleInitial = new Inputs_3.TextField('M.I.')
                .padding()
                .rounded(0)
                .borderBottom({ style: 'none' })
                .width(50)
                .noOutline();
            const lname = new Inputs_3.TextField('Last Name')
                .padding()
                .rounded(0)
                .rounded({ top: { right: 10 } })
                .borderLeft({ style: 'none' })
                .borderBottom({ style: 'none' })
                .noOutline();
            const email = new Inputs_3.TextField('Email').padding().rounded(0).stretch().noOutline();
            const password = new Inputs_3.PasswordField()
                .padding()
                .rounded(0)
                .stretch()
                .borderTop({ style: 'none' })
                .borderRight({ style: 'none' })
                .noOutline();
            const confirmPassword = new Inputs_3.PasswordField()
                .placeholder('Confirm Plassword')
                .padding()
                .rounded(0)
                .stretch()
                .borderTop({ style: 'none' })
                .noOutline();
            const signupButton = new Basics_3.Button(new Stacks_3.HStack(new Graphics_3.Icon('chevron-forward-circle-outline').font('lg'), new Whitespace_2.Spacer(), new Basics_3.Text('Sign Up')))
                .stretch()
                .padding()
                .border({ size: 0, style: 'solid', color: 'silver' })
                .borderBottom({ size: 1 })
                .borderRight({ size: 1 })
                .rounded(0)
                .rounded({ bottom: { right: 10 } });
            new ViewConnectors_1.FormConnector('/register')
                .connectInput('fname', fname)
                .connectInput('mi', middleInitial)
                .connectInput('lname', lname)
                .connectInput('email', email)
                .connectInput('password', password)
                .connectInput('confirmPassword', confirmPassword)
                .connectSubmitButton(signupButton, response => {
                console.log(response);
            });
            super(new Stacks_3.VStack(new Stacks_3.HStack(fname, middleInitial, lname).stretch(), new Stacks_3.HStack(email).stretch(), new Stacks_3.HStack(password, confirmPassword).stretch(), new Stacks_3.HStack(new Basics_3.Button(new Stacks_3.HStack(new Graphics_3.Icon('backspace').font('lg'), new Whitespace_2.Spacer(), new Basics_3.Text('Clear')))
                .stretch()
                .padding()
                .border({ size: 0, style: 'solid', color: 'silver' })
                .borderLeft({ size: 1 })
                .borderBottom({ size: 1 })
                .borderRight({ size: 1 })
                .rounded(0)
                .rounded({ bottom: { left: 10 } })
                .foreground('black'), new Basics_3.Button(new Stacks_3.HStack(new Graphics_3.Icon('shield-checkmark-outline').font('lg'), new Whitespace_2.Spacer(), new Basics_3.Text('Terms and Conditions')))
                .id('tac-button')
                .stretch()
                .border({ size: 0, style: 'solid', color: 'silver' })
                .borderBottom({ size: 1 })
                .borderRight({ size: 1 })
                .rounded(0)
                .padding()
                .foreground(Colors_3.HColor('gray'))
                .whenClicked(termsButtonEv => {
                new Overlays_1.AgreementOverlay('Terms & Conditions', 'shield-outline', new Basics_3.Text('No Terms and Services have been provided yet.'))
                    .whenConfirmed(() => {
                    termsButtonEv.view.foreground(Colors_3.HColor('green'));
                })
                    .whenCancelled(() => {
                    termsButtonEv.view.foreground(Colors_3.HColor('red'));
                });
            }), signupButton).stretch()), new Basics_3.Text('Accounts are only meant for clients. If you are a client, please register and your account will be activated upon client verification. Otherwise, please do not fill out this form, as the account will not be activated.')
                .font('sm')
                .lineHeight('150%')
                .foreground(Colors_3.HColor('gray'))
                .width('50%')
                .margin({ top: 50 }));
        }
    }
    exports.default = SignupViewer;
});
define("Pages/PageComponents", ["require", "exports", "Hi/Colors", "Hi/Components/Basics", "Hi/Components/Graphics", "Hi/Components/Stacks", "Hi/View"], function (require, exports, Colors_4, Basics_4, Graphics_4, Stacks_4, View_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExampleViewer = exports.HTMLContent = exports.FileTreeItem = exports.ImageCaption = exports.SubtleText = exports.PrimaryText = exports.SecondaryHeading = exports.PrimaryHeading = exports.MajorIcon = void 0;
    class MajorIcon extends Graphics_4.Icon {
        constructor(name) {
            super(name);
            this.font(75).margin({ top: 50 });
        }
    }
    exports.MajorIcon = MajorIcon;
    class PrimaryHeading extends Basics_4.Text {
        constructor(text) {
            super(text);
            this.margin({ top: 25 }).font('xl');
        }
    }
    exports.PrimaryHeading = PrimaryHeading;
    class SecondaryHeading extends Basics_4.Text {
        constructor(text) {
            super(text);
            this.margin({ top: 50 }).font('lg');
        }
    }
    exports.SecondaryHeading = SecondaryHeading;
    class PrimaryText extends Basics_4.Text {
        constructor(text) {
            super(text);
            this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
        }
    }
    exports.PrimaryText = PrimaryText;
    class SubtleText extends Basics_4.Text {
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
    class FileTreeItem extends Stacks_4.HStack {
        constructor(iconName, itemName, depth = 0) {
            const icon = new Graphics_4.Icon(iconName).padding(5);
            super(icon, new Basics_4.Text(itemName));
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
    class ExampleViewer extends Stacks_4.HStack {
        constructor(...children) {
            super(new Stacks_4.VStack(...children), new Stacks_4.VStack());
            this.border({ size: 4, style: 'dashed', color: Colors_4.HColor('green') });
        }
    }
    exports.ExampleViewer = ExampleViewer;
});
define("Pages/GettingStarted", ["require", "exports", "Hi/Components/Graphics", "Hi/Components/Stacks", "Hi/Components/Basics", "Hi/Components/Whitespace", "Hi/Colors", "Pages/PageComponents"], function (require, exports, Graphics_5, Stacks_5, Basics_5, Whitespace_3, Colors_5, PageComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GettingStarted extends Stacks_5.Container {
        constructor() {
            super(new Stacks_5.VStack(new Graphics_5.Image('https://images.unsplash.com/photo-1533745848184-3db07256e163?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80').stretchWidth(), new PageComponents_1.ImageCaption('Photo by Belinda Fewings'), new PageComponents_1.MajorIcon('accessibility-outline'), new PageComponents_1.PrimaryHeading('Human Interface?').font('xl'), new PageComponents_1.PrimaryText('If you are brand new to Hi MVC then this is where you should begin. Hi MVC (Human Interface Model View Controller) is an MVC which replicates an Apple-like experience on the web. It utilizes the human interface guidelines developed by Apple and implements them on the web while providing powerful frontend and backend tools.'), new PageComponents_1.PrimaryText('The Human Interface Design is the user interface guide defined by Apple for all of their software. The components are made to integrate with iOS/macOS devices along with porting the UI to other platforms'), new PageComponents_1.PrimaryText('The stacking system used by SwiftUI is also ported for the web for perfect alignment... always'), new PageComponents_1.SubtleText('Please note that this project is under heavy development and is due to many changes.'), new PageComponents_1.MajorIcon('cloud-download-outline'), new PageComponents_1.PrimaryHeading('Downloading HI MVC').font('xl'), new PageComponents_1.PrimaryText('Visit the github repository to download the source code. You will want to compile your entire project using the TypeScript compiler, so you should not precompile any of the HI components.'), new Basics_5.Button(new Stacks_5.HStack(new Graphics_5.Icon('logo-github').font('xl'), new Basics_5.Text('Github Repository').font('md').margin({ left: 10 }))), new PageComponents_1.MajorIcon('hammer-outline'), new PageComponents_1.PrimaryHeading('Installation').font('xl'), new PageComponents_1.SecondaryHeading('Step 1: SCSS Compilation').font('lg'), new PageComponents_1.PrimaryText('This process has been made simple for you. To compile the scss, you will need to open your terminal and navigate to the directory of the HI github repository. Then you should navigate to the "Client" folder.'), new PageComponents_1.PrimaryText('In the "Client" directory, there will be makefile. Run the command "make scss" to compile the scss files into standard CSS. It will then compile into Client/build/hi.css and Client/build/hi.css.map'), new PageComponents_1.PrimaryText('Copy the file to your static directory'), new PageComponents_1.SubtleText('This process assumes you have SASS install globally on your system.'), new PageComponents_1.SecondaryHeading('Step 2: Configure TypeScript').font('lg'), new PageComponents_1.PrimaryText('TypeScript accepts its configuration as a tsconfig.json file. You want the contents of the file to contain the following:'), new Graphics_5.Image('assets/getting-started/tsconfig.png').margin({ top: 25 }), new PageComponents_1.SecondaryHeading('Step 3: Configure Directory Structure'), new Stacks_5.HStack(new Whitespace_3.Spacer(), new Stacks_5.VStack(new PageComponents_1.FileTreeItem('folder-outline', 'css').iconColor(Colors_5.HColor('blue')), new PageComponents_1.FileTreeItem('logo-css3', 'hi.css', 1).iconColor(Colors_5.HColor('blue')), new PageComponents_1.FileTreeItem('map-outline', 'hi.css.map', 1).iconColor(Colors_5.HColor('green')), new PageComponents_1.FileTreeItem('text-outline', 'fonts').iconColor(Colors_5.HColor('teal')), new PageComponents_1.FileTreeItem('logo-html5', 'index.html').iconColor(Colors_5.HColor('orange')))
                .alignStart()
                .rounded()
                .padding()
                .background(Colors_5.HColor('gray6'))
                .margin({ top: 25, right: 25 }), new Stacks_5.VStack(new PageComponents_1.PrimaryText('Take the compiled css code and put it in its own CSS directory. Make sure to also copy the *.css.map file. The copy the fonts directory for typeface support.')
                .padding(0)
                .textStart(), new PageComponents_1.PrimaryText('You will also want to make sure to include an index.html file. This file will should be opened in the browser and will include all the imports.')
                .padding(0)
                .textStart()).width('50%'), new Whitespace_3.Spacer()), new PageComponents_1.SecondaryHeading('Step 4: ')));
        }
    }
    exports.default = GettingStarted;
});
define("Pages/SizingTypes", ["require", "exports", "Hi/Components/Stacks", "Hi/Components/Graphics", "Hi/Components/Basics", "Pages/PageComponents", "Hi/Colors", "Hi/Components/Whitespace"], function (require, exports, Stacks_6, Graphics_6, Basics_6, PageComponents_2, Colors_6, Whitespace_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TypeDefinitionDocumentation = void 0;
    class TypeDefinitionDocumentation extends Stacks_6.VStack {
        constructor(expansion, description, examples) {
            super(new Stacks_6.HStack(new Graphics_6.Icon('code-working-outline').font('lg').padding(), new Basics_6.Text('Type Definition').padding().width(200).textStart(), new Basics_6.BlockCode(expansion).padding().margin(0).textStart(), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart(), new Stacks_6.HStack(new Graphics_6.Icon('information-outline').font('lg').padding(), new Basics_6.Text('Description').padding().width(200).textStart(), new PageComponents_2.HTMLContent('span', description).textStart().margin(0).padding().width(400), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart(), new Stacks_6.HStack(new Graphics_6.Icon('code-slash-outline').font('lg').padding(), new Basics_6.Text('Example').padding().width(200).textStart(), new Basics_6.BlockCode(examples).textStart().margin(0).padding().width(400), new Whitespace_4.Spacer())
                .stretchWidth()
                .alignStart());
        }
    }
    exports.TypeDefinitionDocumentation = TypeDefinitionDocumentation;
    class SizingTypes extends Stacks_6.Container {
        constructor() {
            super(new Stacks_6.VStack(new Stacks_6.VStack(new PageComponents_2.MajorIcon('cube-outline').padding().rounded().blur(), new Basics_6.Text('Sizing Type Definitions')
                .blur()
                .padding()
                .rounded()
                .font('xxl')
                .bold()
                .margin({ top: 25 }))
                .backgroundImage('https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')
                .stretch()
                .padding({ bottom: 50 })
                .foreground('white'), new PageComponents_2.ImageCaption('Photo by Jeremy Zero'), new PageComponents_2.PrimaryHeading('Type Definitions Overview'), new PageComponents_2.PrimaryText('For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'), new PageComponents_2.SubtleText('Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'), new Stacks_6.HStack(new Graphics_6.Image('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50), new PageComponents_2.PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation('string | number', 'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.', `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '7em';
const buttonWidth: HISizingValue = 'calc(50vw - 10px)'

new Button(
    new Image('assets/bird.png')
        .width(imageWidth)
        .height(imageHeight)
).width(buttonWidth);
`)
                .margin({ top: 25 })
                .padding()
                .padding({ left: 200, right: 200 })
                .rounded(), new Stacks_6.Container(new Basics_6.Button(new Graphics_6.Image('https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80', 'Image of an African Gray Parrot')
                .width(100)
                .height('7em')).width('calc(50vw - 10px)')), new Stacks_6.HStack(new Graphics_6.Image('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50), new PageComponents_2.PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
                .padding({ left: 200, right: 200 })
                .rounded(), new Stacks_6.Container(new Stacks_6.HStack(new Stacks_6.VStack(new Basics_6.Text('Left Panel'))
                .width({
                min: 400,
                default: 550,
                max: 700,
            })
                .background(Colors_6.HColor('red')), new Stacks_6.VStack(new Basics_6.Text('Right Panel')).width({ min: 200, max: 1000 }).background(Colors_6.HColor('blue')))), new Stacks_6.HStack(new Graphics_6.Image('https://image.flaticon.com/icons/png/512/204/204599.png').height(50), new PageComponents_2.PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })).margin({ top: 25 }), new TypeDefinitionDocumentation(`HISizingValue | {
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
                .padding({ left: 200, right: 200 })
                .rounded(), new Stacks_6.HStack(new Basics_6.Text('Hello World').background('white').padding(5)).background('black').padding({
                top: 10,
                right: '5vw',
                bottom: '15pt',
                left: '10vw',
            })));
        }
    }
    exports.default = SizingTypes;
});
define("Pages/BasicComponents", ["require", "exports", "Hi/Components/Stacks", "Pages/PageComponents", "Hi/Components/Basics", "Hi/Colors"], function (require, exports, Stacks_7, PageComponents_3, Basics_7, Colors_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BasicComponents extends Stacks_7.Container {
        constructor() {
            super(new Stacks_7.VStack(new Stacks_7.VStack(new PageComponents_3.MajorIcon('text').padding().rounded(), new Basics_7.Text('Basic Components')
                .padding()
                .rounded()
                .font('xxl')
                .bold()
                .margin({ top: 25 })
                .foreground('black'))
                .backgroundImage('assets/BasicComponents.png')
                .stretch()
                .padding({ bottom: 50 })
                .foreground('white'), new PageComponents_3.PrimaryHeading('Overview'), new PageComponents_3.PrimaryText('The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'), new PageComponents_3.PrimaryHeading('Text Component'), new PageComponents_3.PrimaryText('The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'), new Stacks_7.HStack(new Basics_7.Text('Hello World'))
                .border({ size: 4, style: 'dotted', color: Colors_7.HColor('green') })
                .width(200)
                .height(200)));
        }
    }
    exports.default = BasicComponents;
});
define("GuidesApp", ["require", "exports", "Hi/Colors", "Hi/Components/Stacks", "Hi/human", "Hi/Components/Basics", "Sidebar", "SignupViewer", "Pages/GettingStarted", "Pages/SizingTypes", "Pages/BasicComponents"], function (require, exports, Colors_8, Stacks_8, human_6, Basics_8, Sidebar_1, SignupViewer_1, GettingStarted_1, SizingTypes_1, BasicComponents_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GuidesApp extends Stacks_8.HIFullScreenView {
        constructor() {
            super(new Stacks_8.HStack(new Sidebar_1.default()
                .alignStart()
                .stretchHeight()
                .padding(20)
                .borderRight({ size: 1, style: 'solid', color: Colors_8.HColor('gray6') })
                .width({
                min: 300,
                max: 300,
                default: 300,
            }), new Stacks_8.VStack(new Stacks_8.HStack(new Basics_8.Text('Title').id('title'))
                .width({
                min: 'calc(100vw - 300px)',
                default: 'calc(100vw - 300px)',
                max: 'calc(100vw - 300px)',
            })
                .padding(20)
                .borderBottom({
                size: 1,
                style: 'solid',
                color: Colors_8.HColor('gray6'),
            })
                .position('fixed')
                .background(Colors_8.rgba(255, 255, 255, 0.5))
                .blur(25)
                .zIndex(10), new MessageViewer().id('portfolio-viewer').stretch())
                .stretchHeight()
                .width({
                min: 'calc(100vw - 300px)',
                default: 'calc(100vw - 300px)',
                max: 'calc(100vw - 300px)',
            })
                .alignStart()).stretch());
            this.portfolioViewerController = new human_6.ViewController({
                signup: new SignupViewer_1.default().stretch().padding({ top: 60 }),
                gettingStarted: new GettingStarted_1.default().stretch().padding({ top: 60 }),
                sizingTypes: new SizingTypes_1.default().stretch().padding({ top: 60 }),
                basicComponents: new BasicComponents_1.default().stretch().padding({ top: 60 }),
            });
            const portfolioViewer = this.getViewById('portfolio-viewer');
            if (portfolioViewer)
                this.portfolioViewerController.bind(portfolioViewer.body);
        }
    }
    exports.default = GuidesApp;
    class MessageViewer extends Stacks_8.ScrollView {
        constructor() {
            super(new Stacks_8.VStack(new Basics_8.Text('Select a menu item').foreground(Colors_8.HColor('gray'))).stretch());
        }
    }
});
define("guides", ["require", "exports", "GuidesApp", "Hi/human"], function (require, exports, GuidesApp_1, human_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new human_7.ViewController({
        main: new GuidesApp_1.default(),
    })
        .bind()
        .navigateTo();
});
define("Hi/Components/Statuses", ["require", "exports", "Hi/View"], function (require, exports, View_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressLine = void 0;
    class ProgressLine extends View_9.default {
        constructor() {
            super('div');
            this.progress = 0;
            this.body.className = 'hi-progress-line';
        }
        async resize(percent) {
            return new Promise(resolve => {
                const interval = setInterval(() => {
                    this.progress += 0.1;
                    if (this.progress >= percent) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 5);
            });
        }
    }
    exports.ProgressLine = ProgressLine;
});
//# sourceMappingURL=guides.js.map