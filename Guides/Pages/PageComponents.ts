import { HColor, rgba } from '../Hi/Colors';
import { BlockCode, Button, Text } from '../Hi/Components/Basics';
import { Icon } from '../Hi/Components/Graphics';
import { TextField } from '../Hi/Components/Inputs';
import { HStack, VStack } from '../Hi/Components/Stacks';
import { Spacer } from '../Hi/Components/Whitespace';
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
            padding: '',
        },
        property => {
            if (property == 'width' || property == 'height')
                (this.getViewById(`component-${property}`) as Text).text.value =
                    (property == 'width' ? this.dimensions.width : this.dimensions.height) + '';
            else if (property == 'padding')
                (this.getViewById('component-padding') as Text).text.value = this.dimensions.padding || '•';
        }
    );

    public readonly componentInfo = StateObject(
        {
            name: '',
            id: '',
            description: '',
            padding: '',
            margin: '',
        },
        property => {
            switch (property) {
                case 'name':
                    (this.getViewById('component-name') as Text).text.value = this.componentInfo.name || '•';
                    break;
                case 'id':
                    (this.getViewById('component-id') as Text).text.value = this.componentInfo.id || '•';
                    break;
                case 'description':
                    (this.getViewById('component-description') as Text).text.value =
                        this.componentInfo.description || '•';
                    break;
            }
        }
    );

    public readonly viewerSettings = StateObject(
        {
            contrastToggle: false,
        },
        () => {
            this.getViewById('enable-contrast-button')?.foreground(
                HColor(this.viewerSettings.contrastToggle ? 'green' : 'gray')
            );
        }
    );

    constructor(content: View) {
        super(
            new HStack(
                new Button(
                    new Icon('contrast-outline').font('lg').foreground(HColor('gray')).id('enable-contrast-button')
                )
                    .padding({
                        top: 0,
                        bottom: 0,
                        left: 5,
                        right: 5,
                    })
                    .whenMouseOver(ev => {
                        ev.view.background(rgba(0, 0, 0, 0.1));
                    })
                    .whenMouseOut(ev => {
                        ev.view.background('none');
                    })
                    .whenClicked(ev => {
                        this.viewerSettings.contrastToggle = !this.viewerSettings.contrastToggle;
                    })
            )
                .rounded({ top: { left: 10, right: 10 }, bottom: { left: 0, right: 0 } })
                .background(HColor('gray6')),
            new VStack(content)
                .border({ size: 4, style: 'dashed', color: HColor('gray6') })
                .borderTop({ style: 'solid' }),
            new VStack(
                new HStack(
                    new Spacer(),
                    dimension('width').padding(),
                    new Text(' by '),
                    dimension('height').padding(),
                    new Spacer(),
                    new VStack(
                        new Text('•').id('component-padding').font('lg'),
                        new Text('Padding').font('sm').foreground(HColor('gray'))
                    ).padding(),
                    new Spacer()
                ),
                new HStack(
                    new VStack(
                        new Text('•').id('component-name').font('lg'),
                        new Text('Component').font('sm').foreground(HColor('gray'))
                    ).padding(),
                    new VStack(
                        new Text('•').id('component-id').font('lg'),
                        new Text('ID').font('sm').foreground(HColor('gray'))
                    ).padding()
                ),
                new Text('Description').font('sm').foreground(HColor('gray')),
                new Text('•').id('component-description')
            ).padding()
        );

        function enableHover(view: View, exampleViewer: ExampleViewer) {
            view.whenMouseOver(ev => {
                exampleViewer.dimensions.width = view.body.clientWidth;
                exampleViewer.dimensions.height = view.body.clientHeight;
                exampleViewer.componentInfo.name = view.constructor.name;
                exampleViewer.componentInfo.id = view.body.id;
                exampleViewer.componentInfo.description = view.description;
                let computedStyles = window.getComputedStyle(view.body);

                let paddings = [
                    computedStyles.paddingTop,
                    computedStyles.paddingRight,
                    computedStyles.paddingBottom,
                    computedStyles.paddingLeft,
                ];

                if (paddings[0] == paddings[1] && paddings[1] == paddings[2] && paddings[2] == paddings[3])
                    exampleViewer.dimensions.padding = paddings[0];
                else if (paddings[0] == paddings[2] && paddings[1] == paddings[3])
                    exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]}`;
                else exampleViewer.dimensions.padding = `${paddings[0]} ${paddings[1]} ${paddings[2]} ${paddings[3]}`;

                if (exampleViewer.viewerSettings.contrastToggle) view.body.style.filter = 'brightness(50%)';

                ev.browserEvent.stopPropagation();
            }).whenMouseOut(() => {
                if (exampleViewer.viewerSettings.contrastToggle) view.body.style.filter = 'brightness(100%)';
            });

            view.forChild(child => {
                enableHover(child, exampleViewer);
            });
        }

        enableHover(content, this);
    }
}
