import View from '../View';

export class Group extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.addClass('hi-group');
    }
}

export class VStack extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.addClass('hi-vstack');
    }
}

export class ZStack extends View {
    /**
     * Creates an instance of ZStack.
     * @param {View[]} children The children of this ZStack.
     *
     * @memberOf ZStack
     */
    constructor(...children: View[]) {
        super('div', ...children);
        this.addClass('hi-zstack');
    }
}

export class HStack extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.addClass('hi-hstack');
    }
}

export class ScrollView extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.style.overflowY = 'scroll';
    }
}

export class HIFullScreenView extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.className = 'hi-screen';
    }
}

export class Container extends View {
    constructor(...children: View[]) {
        super('div', ...children);
    }
}
