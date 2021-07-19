import { Container, HStack, VStack } from '../Hi/Components/Stacks';
import { Icon, Image } from '../Hi/Components/Graphics';
import { BlockCode, Button, Text } from '../Hi/Components/Basics';
import { HTMLContent, ImageCaption, MajorIcon, PrimaryHeading, PrimaryText, SubtleText } from './PageComponents';
import { HColor } from '../Hi/Colors';
import { Spacer } from '../Hi/Components/Whitespace';

export class TypeDefinitionDocumentation extends VStack {
    constructor(expansion: string, description: string, examples: string) {
        super(
            new HStack(
                new Icon('code-working-outline').font('lg').padding(),
                new Text('Type Definition').padding().width(200).textStart(),
                new BlockCode(expansion).padding().margin(0).textStart(),
                new Spacer()
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new Icon('information-outline').font('lg').padding(),
                new Text('Description').padding().width(200).textStart(),
                new HTMLContent('span', description).textStart().margin(0).padding().width(400),
                new Spacer()
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new Icon('code-slash-outline').font('lg').padding(),
                new Text('Example').padding().width(200).textStart(),
                new BlockCode(examples).textStart().margin(0).padding().width(400),
                new Spacer()
            )
                .stretchWidth()
                .alignStart()
        );
    }
}

export default class SizingTypes extends Container {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new MajorIcon('cube-outline').padding().rounded().blur(),
                    new Text('Sizing Type Definitions')
                        .blur()
                        .padding()
                        .rounded()
                        .font('xxl')
                        .bold()
                        .margin({ top: 25 })
                )
                    .backgroundImage(
                        'https://images.unsplash.com/photo-1622605831571-261139449967?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                    )
                    .stretch()
                    .padding({ bottom: 50 })
                    .foreground('white'),
                new ImageCaption('Photo by Jeremy Zero'),

                new PrimaryHeading('Type Definitions Overview'),

                new PrimaryText(
                    'For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'
                ),
                new SubtleText(
                    'Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'
                ),

                new HStack(
                    new Image('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50),
                    new PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })
                ).margin({ top: 25 }),

                new TypeDefinitionDocumentation(
                    'string | number',
                    'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.',
                    `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '7em';
const buttonWidth: HISizingValue = 'calc(50vw - 10px)'

new Button(
    new Image('assets/bird.png')
        .width(imageWidth)
        .height(imageHeight)
).width(buttonWidth);
`
                )
                    .margin({ top: 25 })
                    .padding()
                    .padding({ left: 200, right: 200 })
                    .rounded(),

                new Container(
                    new Button(
                        new Image(
                            'https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
                            'Image of an African Gray Parrot'
                        )
                            .width(100)
                            .height('7em')
                    ).width('calc(50vw - 10px)')
                ),

                new HStack(
                    new Image('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50),
                    new PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })
                ).margin({ top: 25 }),

                new TypeDefinitionDocumentation(
                    `HISizingValue | {
    min?: HISizingValue;
    max?: HISizingValue;
    default?: HISizingValue;
}`,
                    'Used to determine the sizing bounds of a View. This includes the minimum size, maxmimum size and default size (ex: min-width, max-height, etc).',
                    `new HStack(
    new VStack(
        new Text('Left Panel')
    )
        .width({
            min: 400,
            default: 550,
            max: 700
        })
        .background(HColor('red')),

    new VStack(
        new Text('Right Panel')
    )
        .width({
            min: 200,
            max: 1000
        })
        .background(HColor('blue'))
)`
                )
                    .margin({ top: 25 })
                    .padding()
                    .padding({ left: 200, right: 200 })
                    .rounded(),

                new Container(
                    new HStack(
                        new VStack(new Text('Left Panel'))
                            .width({
                                min: 400,
                                default: 550,
                                max: 700,
                            })
                            .background(HColor('red')),

                        new VStack(new Text('Right Panel')).width({ min: 200, max: 1000 }).background(HColor('blue'))
                    )
                ),

                new HStack(
                    new Image('https://image.flaticon.com/icons/png/512/204/204599.png').height(50),
                    new PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })
                ).margin({ top: 25 }),

                new TypeDefinitionDocumentation(
                    `HISizingValue | {
    top?: HISizingValue;
    right?: HISizingValue;
    bottom?: HISizingValue;
    left?: HISizingValue;
}`,
                    'Used to determine the sizing of styles pertaining to the edges of a View. This can be used for padding, margin, and the like.',
                    `new HStack(
    new Text('Hello World').background('white').padding(5)
)
    .background('black')
    .padding({
        top: 10,
        right: '5vw',
        bottom: '15pt',
        left: '10vw'
    })`
                )
                    .margin({ top: 25 })
                    .padding()
                    .padding({ left: 200, right: 200 })
                    .rounded(),

                new HStack(new Text('Hello World').background('white').padding(5)).background('black').padding({
                    top: 10,
                    right: '5vw',
                    bottom: '15pt',
                    left: '10vw',
                })
            )
        );
    }
}
