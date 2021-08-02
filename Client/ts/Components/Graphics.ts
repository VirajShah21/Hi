import { StateObject } from '../Types/states';
import View from '../View';

export class IonIcon extends View {
    constructor(name: string) {
        super('ion-icon');
        this.body.setAttribute('name', name);
    }
}

export interface CanvasContext {
    width: (size: number) => this;
    height: (size: number) => this;
    line: (x1: number, y1: number, x2: number, y2: number) => this;
    stroke: () => this;
    font: (fontstr: string) => this;
    fillText: (text: string, x: number, y: number) => this;
    strokeText: (text: string, x: number, y: number) => this;
    fillStyle: (style: string) => this;
    fillRect: (x1: number, y1: number, width: number, height: number) => this;
}

export class Canvas extends View implements CanvasContext {
    context: CanvasRenderingContext2D;
    override body: HTMLCanvasElement;
    sprites: Sprite[];

    constructor() {
        super('canvas');
        this.context = this.body.getContext('2d');
        this.sprites = [];
    }

    addSprites(...sprites: Sprite[]): this {
        sprites.forEach(sprite => this.sprites.push(sprite));
        return this;
    }

    drawSprites(): this {
        this.sprites.forEach(sprite => {
            console.log('Drawing New Sprite', sprite);
            const widthFilter = sprite.geometry.find(e => e.func == SpriteGeometryFunction.Width);
            const heightFilter = sprite.geometry.find(e => e.func == SpriteGeometryFunction.Height);

            let spriteWidth = (widthFilter ? widthFilter.args[0] : this.body.width) as number;
            let spriteHeight = (heightFilter ? heightFilter.args[0] : this.body.height) as number;

            let scaleX = spriteWidth / 100;
            let scaleY = spriteHeight / 100;

            let x = sprite.x;
            let y = sprite.y;

            sprite.geometry.forEach(geo => {
                console.log('Drawing new geometry', geo, 'with scale', scaleX, scaleY);
                const args: unknown[] = geo.args || [];
                switch (geo.func) {
                    case SpriteGeometryFunction.Width:
                        spriteWidth = args[0] as number;
                        scaleX = spriteWidth / 100;
                        break;
                    case SpriteGeometryFunction.Height:
                        spriteHeight = args[0] as number;
                        scaleY = spriteHeight / 100;
                        break;
                    case SpriteGeometryFunction.Line:
                        this.line(
                            x + (args[0] as number) * scaleX,
                            y + (args[1] as number) * scaleY,
                            x + (args[2] as number) * scaleX,
                            y + (args[3] as number) * scaleY
                        );
                        break;
                    case SpriteGeometryFunction.Stroke:
                        this.stroke();
                        break;
                    case SpriteGeometryFunction.Font:
                        this.font(args[0] as string);
                        break;
                    case SpriteGeometryFunction.FillText:
                        this.fillText(
                            args[0] as string,
                            x + (args[1] as number) * scaleX,
                            y + (args[2] as number) * scaleY
                        );
                        break;
                    case SpriteGeometryFunction.StrokeText:
                        this.strokeText(
                            args[0] as string,
                            x + (args[1] as number) * scaleX,
                            y + (args[2] as number) * scaleY
                        );
                        break;
                    case SpriteGeometryFunction.FillStyle:
                        this.fillStyle(args[0] as string);
                        break;
                    case SpriteGeometryFunction.FillRect:
                        this.fillRect(
                            x + (args[0] as number) * scaleX,
                            y + (args[1] as number) * scaleY,
                            (args[2] as number) * scaleX,
                            (args[3] as number) * scaleY
                        );
                        break;
                }
            });
        });
        return this;
    }

    override width(size: number): this {
        this.body.width = size;
        return this;
    }

    override height(size: number): this {
        this.body.height = size;
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number): this {
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
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

    fillRect(x1: number, y1: number, width: number, height: number): this {
        this.context.fillRect(x1, y1, width, height);
        return this;
    }
}

export enum SpriteGeometryFunction {
    Width,
    Height,
    Line,
    Stroke,
    Font,
    FillText,
    StrokeText,
    FillStyle,
    FillRect,
    LoadImage,
}

export class Sprite implements CanvasContext {
    public geometry: { func: SpriteGeometryFunction; args?: unknown[] }[];
    public x: number = 0;
    public y: number = 0;

    constructor() {
        this.geometry = [];
    }

    width(size: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Width,
            args: [size],
        });
        return this;
    }

    height(size: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Height,
            args: [size],
        });
        return this;
    }

    line(x1: number, y1: number, x2: number, y2: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.Line,
            args: [x1, y1, x2, y2],
        });
        return this;
    }

    stroke() {
        this.geometry.push({ func: SpriteGeometryFunction.Stroke });
        return this;
    }

    font(fontstr: string): this {
        this.geometry.push({ func: SpriteGeometryFunction.Font, args: [fontstr] });
        return this;
    }

    fillText(text: string, x: number, y: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillText,
            args: [text, x, y],
        });
        return this;
    }

    strokeText(text: string, x: number, y: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.StrokeText,
            args: [text, x, y],
        });
        return this;
    }

    fillStyle(style: string): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillStyle,
            args: [style],
        });
        return this;
    }

    fillRect(x1: number, y1: number, width: number, height: number): this {
        this.geometry.push({
            func: SpriteGeometryFunction.FillRect,
            args: [x1, y1, width, height],
        });
        return this;
    }

    setX(x: number): this {
        this.x = x;
        return this;
    }

    setY(y: number): this {
        this.y = y;
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
