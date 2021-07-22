import { StateObject, sizing, HumanEvent } from '../human';
import View from '../View';
import { HISizingValue } from '../Types/sizing';

export class TextContent extends View {
    public override body: HTMLSpanElement;

    public readonly text = StateObject(
        {
            value: '',
        },
        () => {
            this.body.innerText = this.text.value;
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

export class ClickButton extends View {
    public override body: HTMLButtonElement;

    constructor(...children: View[]) {
        super('button', ...children);
        this.body.className = 'hi-button';
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
        this.addClass('hi-inline-code');
    }
}

export class BlockCode extends View {
    public override body: HTMLPreElement;

    constructor(text: string) {
        super('pre');
        this.body.innerText = text;
        this.addClass('hi-block-code');
    }
}
