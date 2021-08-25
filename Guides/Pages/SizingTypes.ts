import { HColor, RGBAModel } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import { Container } from '@Hi/Components/Container';
import { Preview } from '@Hi/Components/DevKit';
import HStack from '@Hi/Components/HStack';
import ImageView from '@Hi/Components/ImageView';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { ImageCaption, PrimaryHeading, PrimaryText, SubtleText } from './Components/DisplayText';
import MajorIcon from './Components/MajorIcon';
import { TypeDefinitionDocumentation } from './Components/TypeDefinitionDocumentation';

export default class SizingTypes extends Container {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new MajorIcon('cube-outline').padding().rounded().blur(),
                    new TextView('Sizing Type Definitions')
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
                    .foreground(RGBAModel.WHITE),
                ImageCaption('Photo by Jeremy Zero'),

                PrimaryHeading('Type Definitions Overview'),

                PrimaryText(
                    'For ease of use and IntelliSense optimization, type definitions have been provided for sizing metrics. Each type allows for different kinds of input.'
                ),
                SubtleText(
                    'Type definitions are used strictly for TypeScript prior to compilation. They are not implementations of new data structures.'
                ),

                new HStack(
                    new ImageView('https://image.flaticon.com/icons/png/512/4053/4053768.png').height(50),
                    PrimaryHeading('HISizingValue').margin(0).padding({ left: 10 })
                ).margin({ top: 25 }),

                new TypeDefinitionDocumentation(
                    'string | number',
                    'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.',
                    `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '7em';
const buttonWidth: HISizingValue = 'calc(50vw - 10px)'

new ClickButton(
    new ImageView('assets/bird.png')
        .width(imageWidth)
        .height(imageHeight)
).width(buttonWidth);
`
                )
                    .margin({ top: 25 })
                    .padding()
                    .rounded(),

                new Preview(
                    new ClickButton(
                        new ImageView(
                            'https://images.unsplash.com/photo-1579723985163-28f30af7093b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
                            'Image of an African Gray Parrot'
                        )
                            .width(100)
                            .height('7em')
                    ).width('calc(50vw - 10px)')
                ),

                new HStack(
                    new ImageView('https://image.flaticon.com/icons/png/512/2000/2000792.png').height(50),
                    PrimaryHeading('HISizeBounds').margin(0).padding({ left: 10 })
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
                    .rounded(),

                new Preview(
                    new HStack(
                        new VStack(new TextView('Left Panel'))
                            .width({
                                min: 100,
                                default: 200,
                                max: 300,
                            })
                            .background(HColor('red')),

                        new VStack(new TextView('Right Panel')).width({ min: 300, max: 500 }).background(HColor('blue'))
                    )
                ).width({ max: '100%' }),

                new HStack(
                    new ImageView('https://image.flaticon.com/icons/png/512/204/204599.png').height(50),
                    PrimaryHeading('HIEdgeSizingValue').margin(0).padding({ left: 10 })
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
                    .rounded(),

                new Preview(
                    new HStack(new TextView('Hello World').background(RGBAModel.WHITE).padding(5))
                        .background(RGBAModel.BLACK)
                        .padding({
                            top: 10,
                            right: '5vw',
                            bottom: '15pt',
                            left: '10vw',
                        })
                )
            )
        );
    }
}
