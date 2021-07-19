import { StateObject, sizing, HumanEvent } from './human';
import { HIEdgeSizingValue, HICornerSizingValue, HISizeBounds, HISizingValue } from './Types/sizing';
import { StateProxy } from './Types/states';
import { HIFont, HIBorderProperties } from './Types/styles';

/**
 * The base class for all Human Interface views.
 *
 * @export
 * @abstract
 * @class View
 */
export default abstract class View {
    public body: HTMLElement;
    public parent?: View;

    public readonly children: StateProxy<View[]>;
    private readonly $children: View[] = [];

    constructor(element: string, ...children: View[]) {
        this.body = document.createElement(element);
        this.addClass('hi-view');
        this.children = StateObject(this.$children, () => {
            this.buildChildren();
        });
        children.forEach(child => {
            this.$children.push(child);
        });
        this.buildChildren();
    }

    getViewsByClass(className: string): View[] {
        const results = [];
        if (this.$children) {
            for (const child of this.$children) {
                if (child.getClassList().indexOf(className) >= 0) results.push(child);
                child.getViewsByClass(className).forEach(view => {
                    results.push(view);
                });
            }
        }
        return results;
    }

    getViewById(id: string): View | void {
        for (const child of this.$children) {
            if (child.body.id == id) return child;
            const childResult = child.getViewById(id);
            if (childResult) return childResult;
        }
    }

    destroy(): void {
        // Remove from parent
        if (this.parent && this.parent.$children) this.parent.$children.splice(this.parent.children.indexOf(this), 1);
        this.body.remove();

        // Clear all instance variables
        this.body = null;
        this.parent = null;
    }

    addChildren(...children: View[]): this {
        children.forEach(child => {
            this.children.push(child);
        });
        return this;
    }

    backgroundImage(url: string): this {
        this.body.style.background = `url(${url})`;
        this.body.style.backgroundSize = 'cover';
        return this;
    }

    animate(configuration: {
        from?: number;
        to?: number;
        interval: number;
        adapter: (view: View, parameter: number) => void;
    }): this {
        const from = configuration.from || 0;
        const to = configuration.to || from + 100;
        const interval = configuration.interval || 50;
        let curr = from;
        const intervalPointer = setInterval(() => {
            if (curr >= to) clearInterval(intervalPointer);
            else configuration.adapter(this, curr);
            curr++;
        }, interval);
        return this;
    }

    background(color: string): this {
        this.body.style.background = color;
        return this;
    }

    blur(radius = 5): this {
        (this.body.style as unknown as Record<string, string>).backdropFilter = `blur(${sizing(radius)})`;
        (this.body.style as unknown as Record<string, string>).webkitBackdropFilter = `blur(${sizing(radius)})`;
        return this;
    }

    bold(): this {
        this.body.style.fontWeight = 'bolder';
        return this;
    }

    addClass(classname: string): this {
        this.body.className += ` ${classname}`;
        this.body.className = this.body.className.trim();
        return this;
    }

    getClassList(): string[] {
        const classString = this.body.className;
        return classString.split(' ').filter(className => {
            return className.trim() != '';
        });
    }

    fixed(): this {
        this.body.style.position = 'fixed';
        return this;
    }

    font(fontClass: string | number | HIFont): this {
        if (typeof fontClass == 'string') this.addClass(`font-${fontClass}`);
        else if (typeof fontClass == 'number') this.body.style.fontSize = `${fontClass}pt`;
        else if (typeof fontClass == 'object') {
            if (Object.prototype.hasOwnProperty.call(fontClass, 'family'))
                this.body.style.fontFamily = fontClass.family;
            if (
                Object.prototype.hasOwnProperty.call(fontClass, 'size') &&
                ['number', 'string'].indexOf(typeof fontClass.size) >= 0
            )
                this.body.style.fontSize = sizing(fontClass.size);
            if (Object.prototype.hasOwnProperty.call(fontClass, 'color')) this.foreground(fontClass.color);
        }
        return this;
    }

    foreground(color: string): this {
        this.body.style.color = color;
        return this;
    }

    forChild(iteratee: (child: View) => void): this {
        for (const child of this.$children) iteratee(child);
        return this;
    }

    inline(): this {
        this.body.style.display = 'inline-flex';
        return this;
    }

    hide(): this {
        const original = this.body.style.display;

        this.unhide = () => {
            this.body.style.display = original;
            return this;
        };

        this.body.style.display = 'none';
        return this;
    }

    unhide(): this {
        return this;
    }

    relative(): this {
        this.body.style.position = 'relative';
        return this;
    }

    removeClass(classname: string): this {
        const classes = this.getClassList() as string[];
        if (classes.indexOf(classname) >= 0) classes.splice(classes.indexOf(classname), 1);
        this.body.className = classes.join(' ');
        return this;
    }

    removeAllChildren(): this {
        this.$children.splice(0, this.children.length);
        return this.buildChildren();
    }

    buildChildren(): this {
        this.body.innerHTML = '';
        this.$children.forEach(child => {
            if (child) {
                child.parent = this;
                this.body.appendChild(child.body);
            }
        });
        return this;
    }

    root(): View {
        if (this.parent) return this.parent.root();
        return this;
    }

    title(text: string): this {
        this.body.title = text;
        return this;
    }

    id(idName: string): this {
        this.body.id = idName;
        return this;
    }

    grow(): this {
        this.addClass('hi-grow');
        return this;
    }

    glow(color: string): this {
        this.body.style.filter = `drop-shadow(0 0px 20px ${color})`;
        return this;
    }

    zIndex(index: number): this {
        this.body.style.zIndex = `${index}`;
        return this;
    }

    // * Alignment

    alignEnd(): this {
        this.body.style.alignItems = 'flex-end';
        this.body.style.justifyContent = 'flex-end';
        return this;
    }

    alignMiddle(): this {
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        return this;
    }

    alignStart(): this {
        this.body.style.alignItems = 'flex-start';
        this.body.style.justifyContent = 'flex-start';
        return this;
    }

    // * Text Alignment

    textStart(): this {
        this.body.style.textAlign = 'left';
        return this;
    }

    textCenter(): this {
        this.body.style.textAlign = 'center';
        return this;
    }

    textEnd(): this {
        this.body.style.textAlign = 'right';
        return this;
    }

    // * Frame Modifiers

    stretchWidth(): this {
        this.body.style.width = '100%';
        return this;
    }

    stretchHeight(): this {
        this.body.style.height = '100%';
        return this;
    }

    stretch(): this {
        return this.stretchWidth().stretchHeight();
    }

    border(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderWidth = sizing(options.size);
        if (options.color) this.body.style.borderColor = options.color;
        if (options.style) this.body.style.borderStyle = options.style;

        return this;
    }

    borderTop(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderTopWidth = sizing(options.size);
        if (options.color) this.body.style.borderTopColor = options.color;
        if (options.style) this.body.style.borderTopStyle = options.style;

        return this;
    }

    borderRight(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderRightWidth = sizing(options.size);
        if (options.color) this.body.style.borderRightColor = options.color;
        if (options.style) this.body.style.borderRightStyle = options.style;

        return this;
    }

    borderBottom(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderBottomWidth = sizing(options.size);
        if (options.color) this.body.style.borderBottomColor = options.color;
        if (options.style) this.body.style.borderBottomStyle = options.style;

        return this;
    }

    borderLeft(options: HIBorderProperties): this {
        if (options.size != undefined) this.body.style.borderLeftWidth = sizing(options.size);
        if (options.color) this.body.style.borderLeftColor = options.color;
        if (options.style) this.body.style.borderLeftStyle = options.style;

        return this;
    }

    padding(amount?: HIEdgeSizingValue): this {
        if (amount != undefined) {
            if (typeof amount == 'number' || typeof amount == 'string') this.body.style.padding = sizing(amount);
            else if (typeof amount == 'object') {
                if (amount.top) this.body.style.paddingTop = sizing(amount.top);
                if (amount.right) this.body.style.paddingRight = sizing(amount.right);
                if (amount.bottom) this.body.style.paddingBottom = sizing(amount.bottom);
                if (amount.left) this.body.style.paddingLeft = sizing(amount.left);
            }
        } else this.body.style.padding = '10px';
        return this;
    }

    margin(amount?: HIEdgeSizingValue): this {
        if (amount != undefined) {
            if (typeof amount == 'number' || typeof amount == 'string') this.body.style.margin = sizing(amount);
            else if (typeof amount == 'object') {
                if (amount.top != undefined) this.body.style.marginTop = sizing(amount.top);
                if (amount.right != undefined) this.body.style.marginRight = sizing(amount.right);
                if (amount.bottom != undefined) this.body.style.marginBottom = sizing(amount.bottom);
                if (amount.left != undefined) this.body.style.marginLeft = sizing(amount.left);
            }
        } else this.body.style.margin = '10px';
        return this;
    }

    rounded(amount?: HICornerSizingValue): this {
        if (amount != undefined) {
            if (typeof amount === 'string' || typeof amount === 'number') {
                this.body.style.borderRadius = sizing(amount);
            } else {
                if (amount.top) {
                    if (amount.top.left != undefined) this.body.style.borderTopLeftRadius = sizing(amount.top.left);
                    if (amount.top.right != undefined) this.body.style.borderTopRightRadius = sizing(amount.top.right);
                }
                if (amount.bottom) {
                    if (amount.bottom.left != undefined)
                        this.body.style.borderBottomLeftRadius = sizing(amount.bottom.left);
                    if (amount.bottom.right != undefined)
                        this.body.style.borderBottomRightRadius = sizing(amount.bottom.right);
                }
            }
        } else this.body.style.borderRadius = '10px';

        return this;
    }

    width(frameWidth: HISizeBounds): this {
        if (typeof frameWidth == 'string' || typeof frameWidth == 'number') this.body.style.width = sizing(frameWidth);
        else {
            if (frameWidth.min) this.body.style.minWidth = sizing(frameWidth.min);
            if (frameWidth.max) this.body.style.maxWidth = sizing(frameWidth.max);
            if (frameWidth.default) this.body.style.width = sizing(frameWidth.default);
        }

        return this;
    }

    height(frameHeight: HISizeBounds): this {
        if (typeof frameHeight == 'string' || typeof frameHeight == 'number')
            this.body.style.height = sizing(frameHeight);
        else {
            if (frameHeight.min) this.body.style.minWidth = sizing(frameHeight.min);
            if (frameHeight.max) this.body.style.maxWidth = sizing(frameHeight.max);
            if (frameHeight.default) this.body.style.width = sizing(frameHeight.default);
        }

        return this;
    }

    // * Position Modifiers

    absolute(): this {
        this.body.style.position = 'absolute';
        return this;
    }

    position(value: 'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'): this {
        this.body.style.position = value;
        return this;
    }

    block(): this {
        this.body.style.display = 'block';
        return this;
    }

    flex(): this {
        this.body.style.display = 'flex';
        return this;
    }

    setBottom(offset: HISizingValue): this {
        this.body.style.bottom = sizing(offset);
        return this;
    }

    setTop(offset: HISizingValue): this {
        this.body.style.top = sizing(offset);
        return this;
    }

    setLeft(offset: HISizingValue): this {
        this.body.style.left = sizing(offset);
        return this;
    }

    setRight(offset: HISizingValue): this {
        this.body.style.right = sizing(offset);
        return this;
    }

    // * Mouse Hover Event Modifiers

    whenMouseOver(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('mouseover', browserEvent => {
            callback({
                view: this,
                type: 'MouseOver',
                browserEvent,
            });
        });
        return this;
    }

    whenMouseOut(callback: (ev: HumanEvent) => void): this {
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