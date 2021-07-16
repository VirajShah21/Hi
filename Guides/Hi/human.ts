import { HISizingValue } from './Types/sizing';
import { StateProxy } from './Types/states';
import View from './View';

/**
 * Constructs a proxy object for a state object.
 *
 * @export
 * @template T The state object to observe. (Cannot be a number or string).
 * @param {T} obj The object to observe.
 * @param {(property?: string) => void} onChange The action to trigger once a property on the object is changed.
 * @returns {StateProxy<T>} The observable object.
 */
export function StateObject<T extends Record<string, unknown> | unknown[]>(
    obj: T,
    onChange: (property?: string) => void
): StateProxy<T> {
    if (!onChange)
        throw new Error(
            `State object (${JSON.stringify(obj, null, 2)}) must have a handler. Otherwise leave as native object.`
        );

    const handler = {
        get(target: T, property: string, receiver: unknown): unknown {
            try {
                return new Proxy((target as Record<string, Record<string, unknown> | unknown[]>)[property], handler);
            } catch (err) {
                return Reflect.get(target, property, receiver);
            }
        },
        defineProperty(target: T, property: string, descriptor: PropertyDescriptor) {
            const result = Reflect.defineProperty(target, property, descriptor);
            onChange(property);
            return result;
        },
        deleteProperty(target: T, property: string) {
            const result = Reflect.deleteProperty(target, property);
            onChange(property);
            return result;
        },
    };

    return new Proxy(obj, handler);
}

const ViewControllerData = {
    /**
     * @deprecated
     */
    controllers: [] as ViewController[],
    controllerMap: {} as Record<string, ViewController>,
};

/**
 * The controller which manages all the views on the scrren.
 *
 * @export
 * @class ViewController
 */
export class ViewController {
    public screens: Record<string, View>;
    public binding: HTMLElement;

    /**
     * Creates an instance of ViewController.
     * @param {Record<string, View>} screens The screen map
     *
     * @memberOf ViewController
     */
    constructor(screens: Record<string, View>) {
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
    navigateTo(name = 'main'): this {
        if (typeof name != 'string')
            throw new Error(
                `ViewController.navigateTo: Parameter name (1) should be of type string, instead got ${typeof name}`
            );
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
    addNavigator(name: string, screen: View): this {
        if (typeof name != 'string')
            throw new Error(
                `ViewController.addNavigator: Parameter name (1) should be of type string, instead got ${typeof name}`
            );
        if (!(screen instanceof View))
            throw new Error(
                `ViewController.addNavigator: Parameter screen (2) should be of type View, instead got ${typeof screen}.\nValue: ${
                    typeof screen == 'object' ? JSON.stringify(screen, null, 4) : screen
                }`
            );
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
    bind(element: HTMLElement = document.body): this {
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
    mapTo(controllerName: string): this {
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
    getController(controllerName: string): ViewController | undefined {
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
    static wallpaper(path: string): void {
        if (typeof path != 'string')
            throw new Error(
                `ViewController.wallpaper: Parameter path (1) should be of of type string, instead got ${typeof path}.`
            );
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
    static navigateTo(name = 'main'): ViewController {
        const controller = ViewControllerData.controllers.find(currentController => {
            return Object.prototype.hasOwnProperty.call(currentController.screens, name);
        });
        if (controller) controller.navigateTo(name);
        else console.warn(`Could not navigate to ${name}`);
        return controller;
    }

    /**
     * @static
     * @returns A JSON map of all the screens on all of the controllers.
     *
     * @memberOf ViewController
     */
    static allScreens(): Record<string, View> {
        const screens: Record<string, View> = {};
        ViewControllerData.controllers.forEach(controller => {
            for (const screen in controller.screens) screens[screen] = controller.screens[screen];
        });
        return screens;
    }
}

export interface HumanEvent {
    view: View;
    type: string;
    browserEvent: Event;
}

export function sizing(size: HISizingValue): string {
    if (typeof size == 'number') return `${size}px`;
    return size;
}
