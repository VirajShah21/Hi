import { HColor, RGBAModel } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextContent from '@Hi/Components/TextView';
import View from '@Hi/View';

export class MajorIcon extends IonIcon {
    constructor(name: string) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}

export class PrimaryHeading extends TextContent {
    constructor(text: string) {
        super(text);
        this.margin({ top: 25 }).font('xl');
    }
}

export class SecondaryHeading extends TextContent {
    constructor(text: string) {
        super(text);
        this.margin({ top: 50 }).font('lg');
    }
}

export class PrimaryText extends TextContent {
    constructor(text: string) {
        super(text);
        this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
    }
}

export class SubtleText extends TextContent {
    constructor(text: string) {
        super(text);
        this.padding({ left: 200, right: 200 })
            .margin({ top: 25 })
            .lineHeight('150%')
            .font('sm')
            .foreground(HColor('gray'));
    }
}

export class ImageCaption extends SubtleText {
    constructor(text: string) {
        super(text);
        this.padding().margin(0).lineHeight('110%');
    }
}

export class FileTreeItem extends HStack {
    private readonly icon: IonIcon;

    constructor(iconName: string, itemName: string, depth = 0) {
        const icon = new IonIcon(iconName).padding(5);
        super(icon, new TextContent(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }

    iconColor(color: RGBAModel): this {
        this.icon.foreground(color);
        return this;
    }
}

export class HTMLContent extends View {
    constructor(wrapper: string, html: string) {
        super(wrapper);
        this.body.innerHTML = html;
    }
}
