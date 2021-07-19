import { HColor } from '../Hi/Colors';
import { BlockCode, Text } from '../Hi/Components/Basics';
import { Icon } from '../Hi/Components/Graphics';
import { HStack, VStack } from '../Hi/Components/Stacks';
import View from '../Hi/View';

export class MajorIcon extends Icon {
    constructor(name: string) {
        super(name);
        this.font(75).margin({ top: 50 });
    }
}

export class PrimaryHeading extends Text {
    constructor(text: string) {
        super(text);
        this.margin({ top: 25 }).font('xl');
    }
}

export class SecondaryHeading extends Text {
    constructor(text: string) {
        super(text);
        this.margin({ top: 50 }).font('lg');
    }
}

export class PrimaryText extends Text {
    constructor(text: string) {
        super(text);
        this.padding({ left: 200, right: 200 }).margin({ top: 25 }).lineHeight('200%').font('md');
    }
}

export class SubtleText extends Text {
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
    private readonly icon: Icon;

    constructor(iconName: string, itemName: string, depth = 0) {
        const icon = new Icon(iconName).padding(5);
        super(icon, new Text(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }

    iconColor(color: string): this {
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

export class ExampleViewer extends HStack {
    constructor(...children: View[]) {
        super(new VStack(...children), new VStack());
        this.border({ size: 4, style: 'dashed', color: HColor('green') });
    }
}
