import { RGBAModel } from '@Hi/Colors';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import TextView from '@Hi/Components/TextView';

export class FileTreeItem extends HStack {
    private readonly icon: IonIcon;

    constructor(iconName: string, itemName: string, depth = 0) {
        const icon = new IonIcon(iconName).padding(5);
        super(icon, new TextView(itemName));
        this.padding({ left: 15 * depth });
        this.icon = icon;
    }

    iconColor(color: RGBAModel): this {
        this.icon.foreground(color);
        return this;
    }
}
