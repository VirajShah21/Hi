import View from '../View';

export class Spacer extends View {
    constructor() {
        super('div');
        this.body.className = 'hi-spacer';
        this.body.innerHTML = '&nbsp;';
    }
}

export class LineBreak extends View {
    constructor() {
        super('br');
    }
}
