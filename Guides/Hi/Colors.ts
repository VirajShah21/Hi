export type HumanColorName =
    | 'blue'
    | 'brown'
    | 'cyan'
    | 'green'
    | 'indigo'
    | 'mint'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'
    | 'gray'
    // | 'gray2'
    | 'gray3'
    // | 'gray4'
    // | 'gray5'
    | 'gray6';

export class RGBAModel {
    public static readonly WHITE = new RGBAModel(255, 255, 255);
    public static readonly BLACK = new RGBAModel(0, 0, 0);

    public r: number;
    public g: number;
    public b: number;
    public a: number;

    constructor(r: number, g: number, b: number, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() {
        if (this.a != 1) return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}

export function HColor(color: HumanColorName, mode = 'light'): RGBAModel {
    if (mode === 'light') {
        return HumanColorSwatch.light[color];
    } else {
        throw new Error("HColor(..., 'dark') does not work yet.");
    }
}

export function rgb(r: number, g: number, b: number): RGBAModel {
    return new RGBAModel(r, g, b);
}

export function rgba(r: number, g: number, b: number, a: number): RGBAModel {
    return new RGBAModel(r, g, b, a);
}

export const HumanColorSwatch = {
    light: {
        blue: rgb(0, 122, 255),
        brown: rgb(162, 132, 94),
        cyan: rgb(50, 173, 230),
        green: rgb(52, 199, 89),
        indigo: rgb(88, 86, 214),
        mint: rgb(0, 199, 190),
        orange: rgb(255, 149, 0),
        pink: rgb(255, 45, 85),
        purple: rgb(175, 82, 222),
        red: rgb(255, 59, 48),
        teal: rgb(48, 176, 199),
        yellow: rgb(255, 204, 0),
        gray: rgb(142, 142, 147),
        gray3: rgb(199, 199, 204),
        gray6: rgb(242, 242, 247),
    },
};

export const ColorConfiguration = {
    swatch: HumanColorSwatch,
    theme: 'light',
};
