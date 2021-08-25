import View from '@Hi/View';

export class HTMLContent extends View {
    constructor(wrapper: string, html: string) {
        super(wrapper);
        this.body.innerHTML = html;
    }
}
