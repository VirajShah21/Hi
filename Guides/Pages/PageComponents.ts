import { HColor } from '../Hi/Colors';
import { BlockCode, Text } from '../Hi/Components/Basics';
import { Icon } from '../Hi/Components/Graphics';
import { HStack, VStack } from '../Hi/Components/Stacks';
import { StateObject } from '../Hi/human';
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

function dimension(axis: 'width' | 'height') {
    return new VStack(
        new Text('•').id(`component-${axis}`).font('lg'),
        new Text(axis == 'width' ? 'Width' : 'Height').font('sm').foreground(HColor('gray'))
    );
}
export class ExampleViewer extends VStack {
    public readonly dimensions = StateObject(
        {
            width: 0,
            height: 0,
        },
        property => {
            (this.getViewById(`component-${property}`) as Text).text.value =
                (property == 'width' ? this.dimensions.width : this.dimensions.height) + '';
        }
    );

    public readonly componentInfo = StateObject(
        {
            name: '',
            id: '',
        },
        property => {
            switch (property) {
                case 'name':
                    (this.getViewById('component-name') as Text).text.value = this.componentInfo.name;
                    break;
                case 'id':
                    (this.getViewById('component-id') as Text).text.value = this.componentInfo.id;
                    break;
            }
        }
    );

    constructor(content: View) {
        super(
            new VStack(content).border({ size: 4, style: 'dashed', color: HColor('green') }),
            new VStack(
                new HStack(dimension('width').padding(), new Text(' by '), dimension('height').padding()),
                new HStack(
                    new VStack(
                        new Text('•').id('component-name').font('lg'),
                        new Text('Component').font('sm').foreground(HColor('gray'))
                    ).padding(),
                    new VStack(
                        new Text('•').id('component-id').font('lg'),
                        new Text('ID').font('sm').foreground(HColor('gray'))
                    ).padding()
                )
            ).padding()
        );

        function enableHover(view: View, exampleViewer: ExampleViewer) {
            view.whenMouseOver(ev => {
                exampleViewer.dimensions.width = ev.view.body.clientWidth || '•';
                exampleViewer.dimensions.height = ev.view.body.clientHeight || '•';
                exampleViewer.componentInfo.name = ev.view.constructor.name || '•';
                exampleViewer.componentInfo.id = ev.view.body.id || '•';
            });
            view.forChild(child => {
                enableHover(child, exampleViewer);
            });
        }

        enableHover(content, this);
    }
}
