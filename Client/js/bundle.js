define("HumanInterface/Colors", ["require", "exports"], function (require, exports) {
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
define("HumanInterface/Types/sizing", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("HumanInterface/Types/states", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("HumanInterface/human", ["require", "exports", "HumanInterface/View"], function (require, exports, View_1) {
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
define("HumanInterface/Types/styles", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("HumanInterface/View", ["require", "exports", "HumanInterface/human"], function (require, exports, human_1) {
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
define("HumanInterface/Components/Basics", ["require", "exports", "HumanInterface/human", "HumanInterface/View"], function (require, exports, human_2, View_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlockCode = exports.InlineCode = exports.Button = exports.Text = void 0;
    class Text extends View_2.default {
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
    class Button extends View_2.default {
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
    class InlineCode extends View_2.default {
        constructor(text) {
            super('code');
            this.body.innerText = text;
            this.addClass('hi-inline-code');
        }
    }
    exports.InlineCode = InlineCode;
    class BlockCode extends View_2.default {
        constructor(text) {
            super('pre');
            this.body.innerText = text;
            this.addClass('hi-block-code');
        }
    }
    exports.BlockCode = BlockCode;
});
define("HumanInterface/Components/Inputs", ["require", "exports", "HumanInterface/human", "HumanInterface/View"], function (require, exports, human_3, View_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TextBox = exports.DropdownOption = exports.PasswordField = exports.TextField = void 0;
    class InputField extends View_3.default {
        constructor(placeholder) {
            super('input');
            this.attributes = human_3.StateObject({
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
            this.addClass('hi-textbox');
        }
    }
    exports.TextBox = TextBox;
});
define("HumanInterface/ViewConnectors", ["require", "exports"], function (require, exports) {
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
define("HumanInterface/Components/Graphics", ["require", "exports", "HumanInterface/human", "HumanInterface/View"], function (require, exports, human_4, View_4) {
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
    exports.Image = Image;
});
define("HumanInterface/Components/Stacks", ["require", "exports", "HumanInterface/View"], function (require, exports, View_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Container = exports.HIFullScreenView = exports.ScrollView = exports.HStack = exports.ZStack = exports.VStack = exports.Group = void 0;
    class Group extends View_5.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-group');
        }
    }
    exports.Group = Group;
    class VStack extends View_5.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-vstack');
        }
    }
    exports.VStack = VStack;
    class ZStack extends View_5.default {
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
    class HStack extends View_5.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-hstack');
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
            this.body.className = 'hi-screen';
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
define("HumanInterface/Components/Whitespace", ["require", "exports", "HumanInterface/View"], function (require, exports, View_6) {
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
define("HumanInterface/Components/Overlays", ["require", "exports", "HumanInterface/Colors", "HumanInterface/Components/Basics", "HumanInterface/Components/Inputs", "HumanInterface/Components/Stacks", "HumanInterface/View", "HumanInterface/Components/Graphics"], function (require, exports, Colors_1, Basics_1, Inputs_1, Stacks_1, View_7, Graphics_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AgreementOverlay = exports.PromptOverlay = exports.AlertOverlay = exports.Overlay = void 0;
    class Overlay extends View_7.default {
        constructor(...children) {
            super('div', ...children);
            this.addClass('hi-overlay');
            this.background(Colors_1.rgba(255, 255, 255, 0.25));
            document.body.appendChild(this.body);
        }
    }
    exports.Overlay = Overlay;
    class AlertOverlay extends Overlay {
        constructor(message) {
            super(new Stacks_1.VStack(new Basics_1.Text(message).padding().font('small').lineHeight('200%'), new Stacks_1.HStack(new Basics_1.Button(new Basics_1.Text('Cancel'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-alert-overlay-cancel-button'), new Basics_1.Button(new Basics_1.Text('Ok'))
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
            super(new Stacks_1.VStack(new Basics_1.Text(prompt).padding().font('small'), new Inputs_1.TextField().addClass('hi-prompt-input'), new Stacks_1.HStack(new Basics_1.Button(new Basics_1.Text('Cancel'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-prompt-overlay-cancel-button'), new Basics_1.Button(new Basics_1.Text('Ok'))
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
            super(new Stacks_1.VStack(new Graphics_1.Icon(icon).font('lg'), new Basics_1.Text(title).padding().font('xl'), new Stacks_1.ScrollView(...agreementContents).height(100), new Stacks_1.HStack(new Basics_1.Button(new Basics_1.Text('Decline'))
                .whenClicked(() => {
                this.destroy();
            })
                .addClass('hi-agreement-overlay-cancel-button'), new Basics_1.Button(new Basics_1.Text('Agree'))
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
define("HumanInterface/Components/Statuses", ["require", "exports", "HumanInterface/View"], function (require, exports, View_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProgressLine = void 0;
    class ProgressLine extends View_8.default {
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
//# sourceMappingURL=bundle.js.map