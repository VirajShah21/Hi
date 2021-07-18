import { Container, HStack, VStack } from '../Hi/Components/Stacks';
import { Icon, Image } from '../Hi/Components/Graphics';
import { BlockCode, InlineCode, Text } from '../Hi/Components/Basics';
import { HTMLContent, ImageCaption, MajorIcon, PrimaryHeading, PrimaryText, SubtleText } from './PageComponents';
import { Spacer } from '../Hi/Components/Whitespace';
import { HColor } from '../Hi/Colors';

export class TypeDefinitionDocumentation extends VStack {
    constructor(expansion: string, description: string, examples: string) {
        super(
            new HStack(
                new Icon('code-working-outline').font('lg').padding(),
                new Text('Type Definition').padding().width(200).textStart(),
                new BlockCode(expansion).padding().margin(0)
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new Icon('information-outline').font('lg').padding(),
                new Text('Description').padding().width(200).textStart(),
                new HTMLContent('span', description).textStart().margin(0).padding().width(400)
            )
                .stretchWidth()
                .alignStart(),
            new HStack(
                new Icon('code-slash-outline').font('lg').padding(),
                new Text('Example').padding().width(200).textStart(),
                new BlockCode(examples).textStart().margin(0).padding().width(400)
            )
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

                new PrimaryHeading('HISizingValue'),

                new TypeDefinitionDocumentation(
                    'string | number',
                    'Any sizing value acceptable via HTML <strong>and</strong> CSS rules. If the value is a <code>string</code> then the explicitly provided value will be used. If a number is provided, then the default units are pixels.',
                    `const imageWidth: HISizingValue = 100; // '100px'
const imageHeight: HISizingValue = '200px';
const divWidth: HISizingValue = 'auto'`
                ).padding({ left: 200, right: 200 })
            )
        );
    }
}
