import { StateObject } from '../Types/states';
import View from '../View';

export class IonIcon extends View {
    constructor(name: string) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}

export class Canvas extends View {
    context: CanvasRenderingContext2D;
    override body: HTMLCanvasElement;

    constructor() {
        super('canvas');
        this.context = this.body.getContext('2d');
    }

    override width(size: number): this {
        this.body.width = size;
        return this;
    }

    override height(size: number): this {
        this.body.height = size;
        return this;
    }

    moveTo(x: number, y: number): this {
        this.context.moveTo(x, y);
        return this;
    }

    lineTo(x: number, y: number): this {
        this.context.lineTo(x, y);
        return this;
    }

    stroke(): this {
        this.context.stroke();
        return this;
    }

    override font(fontstr: string): this {
        this.context.font = fontstr;
        return this;
    }

    fillText(text: string, x: number, y: number): this {
        this.context.fillText(text, x, y);
        return this;
    }

    strokeText(text: string, x: number, y: number): this {
        this.context.strokeText(text, x, y);
        return this;
    }

    fillStyle(style: string): this {
        this.context.fillStyle = style;
        return this;
    }

    fillRect(x1: number, y1: number, x2: number, y2: number): this {
        this.context.fillRect(x1, y1, x2, y2);
        return this;
    }
}

export class ImageContent extends View {
    public override body: HTMLImageElement;
    public data = StateObject(
        {
            source: '',
            altText: '',
        },
        p => {
            if (p == 'source') this.body.src = this.data.source;
            else if (p == 'altText') this.body.alt = this.data.altText;
        }
    );

    constructor(source: string, altText?: string) {
        super('img');
        this.data.source = source;
        if (altText) this.data.altText = altText;
    }
}
