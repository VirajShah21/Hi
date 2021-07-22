import { HColor, rgba } from '../Colors';
import { StateObject } from '../human';
import View from '../View';
import { TextContent, ClickButton, Checkbox } from './Basics';
import { IonIcon } from './Graphics';
import { Overlay } from './Overlays';
import { VStack, HStack } from './Stacks';
import { Spacer } from './Whitespace';

export class Preview extends VStack {
    public readonly dimensions = StateObject(
        {
            width: 0,
            height: 0,
            padding: '',
        },
        property => {
            if (property == 'width' || property == 'height')
                (this.getViewById(`component-${property}`) as TextContent).text.value =
                    (property == 'width' ? this.dimensions.width : this.dimensions.height) + '';
            else if (property == 'padding')
                (this.getViewById('component-padding') as TextContent).text.value = this.dimensions.padding || '•';
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
                    (this.getViewById('component-name') as TextContent).text.value = this.componentInfo.name || '•';
                    break;
                case 'id':
                    (this.getViewById('component-id') as TextContent).text.value = this.componentInfo.id || '•';
                    break;
                case 'description':
                    (this.getViewById('component-description') as TextContent).text.value =
                        this.componentInfo.description || '•';
                    break;
            }
        }
    );

    public readonly viewerSettings = StateObject(
        {
            contrastToggle: false,
            propertyFilters: {
                dimensions: true,
                padding: true,
                description: true,
            },
        },
        property => {
            if (property == 'contrastToggle')
                this.getViewById('toggle-contrast-button')?.foreground(
                    HColor(this.viewerSettings.contrastToggle ? 'green' : 'gray')
                );

            if (property == 'dimensions')
                if (this.viewerSettings.propertyFilters.dimensions) this.getViewById('component-dimensions').unhide();
                else this.getViewById('component-dimensions').hide();
        }
    );

    constructor(content: View) {
        super(
            new HStack(
                new ClickButton(
                    new IonIcon('contrast-outline').font('lg').foreground(HColor('gray')).id('toggle-contrast-button')
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
                    }),
                new ClickButton(
                    new IonIcon('filter-circle-outline')
                        .font('lg')
                        .foreground(HColor('gray'))
                        .id('filter-properties-button')
                )
                    .padding({ top: 0, bottom: 0, left: 5, right: 5 })
                    .whenMouseOver(ev => {
                        ev.view.background(rgba(0, 0, 0, 0.1));
                    })
                    .whenMouseOut(ev => {
                        ev.view.background('none');
                    })
                    .whenClicked(ev => {
                        const overlay: Overlay = new Overlay(
                            new VStack(
                                new VStack(
                                    new HStack(
                                        new Checkbox()
                                            .padding(5)
                                            .setChecked(this.viewerSettings.propertyFilters.dimensions)
                                            .whenClicked(ev => {
                                                this.viewerSettings.propertyFilters.dimensions =
                                                    !this.viewerSettings.propertyFilters.dimensions;
                                            }),
                                        new TextContent('Dimensions')
                                    ),
                                    new HStack(new Checkbox().padding(5), new TextContent('Padding')),
                                    new HStack(new Checkbox().padding(5), new TextContent('Description'))
                                )
                                    .alignStart()
                                    .textStart(),

                                new HStack(
                                    new ClickButton(new IonIcon('close-circle-outline').font('lg'))
                                        .margin({ top: 50 })
                                        .whenClicked(ev => overlay.destroy())
                                )
                            )
                        );
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
                    new HStack(dimension('width').padding(), new TextContent(' by '), dimension('height').padding()).id(
                        'component-dimensions'
                    ),
                    new Spacer(),
                    new VStack(
                        new TextContent('•').id('component-padding').font('lg'),
                        new TextContent('Padding').font('sm').foreground(HColor('gray'))
                    ).padding(),
                    new Spacer()
                ),
                new HStack(
                    new VStack(
                        new TextContent('•').id('component-name').font('lg'),
                        new TextContent('Component').font('sm').foreground(HColor('gray'))
                    ).padding(),
                    new VStack(
                        new TextContent('•').id('component-id').font('lg'),
                        new TextContent('ID').font('sm').foreground(HColor('gray'))
                    ).padding()
                ),
                new TextContent('Description').font('sm').foreground(HColor('gray')),
                new TextContent('•').id('component-description')
            ).padding()
        );

        function enableHover(view: View, exampleViewer: Preview) {
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

function dimension(axis: 'width' | 'height') {
    return new VStack(
        new TextContent('•').id(`component-${axis}`).font('lg'),
        new TextContent(axis == 'width' ? 'Width' : 'Height').font('sm').foreground(HColor('gray'))
    );
}
