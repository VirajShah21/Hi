import { StateObject } from '@Hi/Types/states';
import View from '@Hi/View';

export default class BlockCode extends View {
    public override body: HTMLPreElement;
    public state = StateObject(
        {
            code: '',
        },
        () => {
            this.body.innerText = this.state.code;
        }
    );

    constructor(text: string) {
        super('pre');
        this.state.code = text;
        this.body.style.fontFamily = 'monospace';
    }

    write(text: string): this {
        this.state.code += text;
        return this;
    }

    overwrite(text: string): this {
        this.state.code = text;
        return this;
    }
}
