import { StateObject, sizing, HumanEvent } from '../human';
import View from '../View';
import { HISizingValue, SizingValues } from '../Types/sizing';
import { HColor } from '../Colors';

export class TextContent extends View {
    public override body: HTMLSpanElement;

    public readonly text = StateObject(
        {
            value: '',
        },
        () => {
            this.body.textContent = this.text.value;
        }
    );

    constructor(text: string) {
        super('span');
        this.text.value = text;
    }

    lineHeight(height: HISizingValue): this {
        this.body.style.lineHeight = sizing(height);
        return this;
    }
}

export class Hyperlink extends View {
    public readonly text = StateObject(
        {
            value: '',
        },
        () => {
            this.body.textContent = this.text.value;
        }
    );

    constructor(text: string) {
        super('a');
        this.text.value = text;
    }
}

export class Checkbox extends View {
    public readonly state = StateObject({ checked: false }, () => {
        this.body.setAttribute('name', this.state.checked ? 'checkbox' : 'square-outline');
    });

    constructor() {
        super('ion-icon');
        this.body.setAttribute('name', 'square-outline');
        this.body.addEventListener('click', () => {
            this.state.checked = !this.state.checked;
        });
    }

    setChecked(value: boolean): this {
        this.state.checked = value;
        return this;
    }

    isChecked(): boolean {
        return this.state.checked;
    }

    toggle(): boolean {
        this.state.checked = !this.state.checked;
        return this.state.checked;
    }

    whenClicked(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('click', (browserEvent: Event) => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
}

export class RadioButton extends View {
    public readonly state = StateObject({ selected: false }, () => {
        this.body.setAttribute('name', this.state.selected ? 'radio-button-on' : 'radio-button-off');
    });

    constructor() {
        super('ion-icon');
        this.body.setAttribute('name', 'radio-button-off');
        this.body.addEventListener('click', ev => {
            this.state.selected = !this.state.selected;
        });
    }

    setSelected(value: boolean): this {
        this.state.selected = value;
        return this;
    }

    isSelected(): boolean {
        return this.state.selected;
    }

    toggle(): this {
        this.state.selected = !this.state.selected;
        return this;
    }

    whenClicked(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('click', (browserEvent: Event) => {
            callback({
                type: 'Click',
                view: this,
                browserEvent,
            });
        });
        return this;
    }
}

export class RadioGroup {
    public radios: RadioButton[];

    constructor(...radioButtons: RadioButton[]) {
        this.radios = radioButtons;
        this.radios.forEach(radio => {
            radio.whenClicked(ev => {
                this.radios.forEach(otherRadio => {
                    if (otherRadio != radio) otherRadio.setSelected(false);
                });
            });
        });
    }

    getSelected(): RadioButton | null {
        for (const radio of this.radios) if (radio.isSelected()) return radio;
        return null;
    }
}

export class ClickButton extends View {
    public override body: HTMLButtonElement;

    constructor(...children: View[]) {
        super('button', ...children);
        this.body.style.border = 'none';
        this.body.style.color = HColor('blue').toString();
        this.body.style.background = 'none';
        this.body.style.borderRadius = SizingValues.BORDER_RADIUS.xxs;
        this.body.style.padding = `${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm} ${SizingValues.PADDING.xxs} ${SizingValues.PADDING.sm}`;
    }

    whenClicked(callback: (ev: HumanEvent) => void): this {
        this.body.addEventListener('click', browserEvent => {
            callback({
                type: 'Click',
                view: this,
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

export class InlineCode extends View {
    public override body: HTMLElement; // ! HTMLCodeElement DOES NOT EXIST !

    constructor(text: string) {
        super('code');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }
}

export class BlockCode extends View {
    public override body: HTMLPreElement;

    constructor(text: string) {
        super('pre');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }
}
