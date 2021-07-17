import { HColor } from '../Hi/Colors';
import { Text } from '../Hi/Components/Basics';
import { Icon } from '../Hi/Components/Graphics';
import { HStack } from '../Hi/Components/Stacks';

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
