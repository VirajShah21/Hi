import View from '@Hi/View';

export default class BlockCode extends View {
    public override body: HTMLPreElement;

    constructor(text: string) {
        super('pre');
        this.body.innerText = text;
        this.body.style.fontFamily = 'monospace';
    }

    write(text: string): this {
        this.body.innerText += text;
        return this;
    }

    overwrite(text: string): this {
        this.body.innerText = text;
        return this;
    }
}
