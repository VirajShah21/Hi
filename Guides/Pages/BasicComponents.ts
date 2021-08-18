import { HColor, RGBAModel } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import { Container } from '@Hi/Components/Container';
import { Preview } from '@Hi/Components/DevKit';
import HStack from '@Hi/Components/HStack';
import TextContent from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { MajorIcon, PrimaryHeading, PrimaryText, SecondaryHeading } from './PageComponents';

export default class BasicComponents extends Container {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new MajorIcon('text').padding().rounded(),
                    new TextContent('Basic Components').padding().rounded().font('xxl').bold().margin({ top: 25 })
                )
                    .backgroundImage('assets/BasicComponents.png')
                    .stretch()
                    .padding({ bottom: 50 }),

                new PrimaryHeading('Overview'),

                new PrimaryText(
                    'The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'
                ),

                new PrimaryHeading('Text Component'),

                new PrimaryText(
                    'The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'
                ),

                new Preview(new TextContent('Designed in Philadelphia.')).margin({ top: 25 }),

                new PrimaryHeading('Button Components'),

                new PrimaryText('Buttons allow for interactivity.'),

                new Preview(new ClickButton(new TextContent('Designed in Philadelphia.'))).margin({ top: 25 }),

                new PrimaryText('Common Modifiers'),

                new SecondaryHeading('Padding'),

                new Preview(
                    new HStack(
                        new TextContent('1').padding().background(HColor('orange')).describe('Default padding'),
                        new TextContent('2').padding(20).background(HColor('green')).describe('20px padding'),
                        new TextContent('3')
                            .padding({ top: 10, right: 10, bottom: 25, left: 25 })
                            .background(HColor('indigo'))
                            .describe('10px 10px 25px 25px')
                    ).padding(50)
                ).margin({ top: 25 }),

                new SecondaryHeading('Background/Foreground'),

                new Preview(
                    new VStack(
                        new TextContent('Designed').background(RGBAModel.BLACK).foreground(HColor('blue')),
                        new TextContent('in').foreground(HColor('orange')),
                        new TextContent('Philadelphia').background(HColor('green')).foreground(HColor('gray6'))
                    ).padding(20)
                ).margin({ top: 25 }),

                new SecondaryHeading('Roundedness'),

                new Preview(
                    new VStack(
                        new TextContent('Barely Round').background(HColor('blue')).rounded(5).padding().margin(),
                        new TextContent('Just Round Enough').background(HColor('blue')).rounded().padding().margin(),
                        new TextContent('Very Round').background(HColor('blue')).rounded(20).padding().margin(),
                        new TextContent('Too Round').background(HColor('blue')).rounded('100%').padding().margin()
                    )
                )
            )
        );
    }
}
