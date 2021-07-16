import { StateObject, HumanEvent } from '../human';
import View from '../View';

export default class InputField extends View {
    public override body: HTMLInputElement;

    public readonly attributes = StateObject(
        {
            value: '',
            placeholder: '',
        },
        () => {
            this.body.setAttribute('value', this.attributes.value);
            this.body.setAttribute('placeholder', this.attributes.placeholder);
        }
    );

    constructor(placeholder: string) {
        super('input');
        this.addClass('hi-inputfield');
        this.attributes.value = '';
        this.attributes.placeholder = placeholder || '';
        this.body.addEventListener('input', () => {
            this.attributes.value = this.body.value;
        });
    }

    whenFocused(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('focusin', browserEvent => {
            callback({
                view: this,
                type: 'Focus',
                browserEvent,
            });
        });
        return this;
    }

    whenUnfocused(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('focusout', browserEvent => {
            callback({
                view: this,
                type: 'Unfocus',
                browserEvent,
            });
        });
        return this;
    }

    whenChanged(callback: (event: HumanEvent) => void): this {
        this.body.addEventListener('input', browserEvent => {
            callback({
                view: this,
                type: 'Change',
                browserEvent,
            });
        });
        return this;
    }

    noOutline(): this {
        this.body.style.outline = 'none';
        return this;
    }
}

export class TextField extends InputField {
    constructor(placeholder?: string) {
        super(placeholder);
        this.body.type = 'text';
        this.addClass('hi-textfield');
    }
}

export class PasswordField extends InputField {
    constructor() {
        super('Password');
        this.body.type = 'password';
        this.addClass('hi-passwordfield');
    }

    placeholder(newPlaceholder: string): this {
        this.body.placeholder = newPlaceholder;
        return this;
    }
}

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

export class DropdownOption extends View {
    public value: string;
    public text: string;

    constructor(text: string, value: string) {
        super('option');
        this.value = value;
        this.text = text;
        this.addClass('hi-dropdown-option');
    }
}

export class TextBox extends View {
    public override body: HTMLTextAreaElement;
    public value: string;

    constructor(placeholder: string) {
        super('textarea');
        this.body.placeholder = placeholder;
        this.body.addEventListener('change', () => {
            this.value = this.body.value;
        });
        this.value = '';
        this.addClass('hi-textbox');
    }
}
