import View from './View';

export const ViewControllerData = {
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
    public visibleScreen: string;

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

    whenResized(handler: (ev: HumanEvent) => void): this {
        window.addEventListener('resize', ev =>
            handler({ type: 'Resize', view: this.screens[this.visibleScreen], browserEvent: ev })
        );
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

    signal(data: string): void {
        for (const screen in this.screens) this.screens[screen].signal(data);
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
        if (controller) {
            controller.navigateTo(name);
            controller.visibleScreen = name;
        } else console.warn(`Could not navigate to ${name}`);

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

document.body.style.margin = '0';
