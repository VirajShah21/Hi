import View from '../View';

export class Group extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';
        this.body.style.textAlign = 'center';
        this.body.style.boxSizing = 'border-box';
    }
}

export abstract class Stack extends Group {
    constructor(...children: View[]) {
        super(...children);
        this.body.style.display = 'flex';
    }
}

export class VStack extends Stack {
    constructor(...children: View[]) {
        super(...children);
        this.body.style.flexDirection = 'column';
    }
}

export class ZStack extends Stack {
    /**
     * Creates an instance of ZStack.
     * @param {View[]} children The children of this ZStack.
     *
     * @memberOf ZStack
     */
    constructor(...children: View[]) {
        super(...children);
        this.body.style.display = 'grid';
        this.body.style.textAlign = 'center';
        this.body.style.alignItems = 'center';
        this.body.style.justifyContent = 'center';

        this.$children.forEach(child => {
            child.body.style.gridArea = '1/1/1/1';
        });
    }
}

export class HStack extends Stack {
    constructor(...children: View[]) {
        super(...children);
        this.body.style.flexDirection = 'row';
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
        this.width('100vw').height('100vh');
    }
}

export class Container extends View {
    constructor(...children: View[]) {
        super('div', ...children);
    }
}
