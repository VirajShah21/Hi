import { Container, HStack, VStack } from '../Hi/Components/Stacks';
import { ExampleViewer, MajorIcon, PrimaryHeading, PrimaryText, SecondaryHeading } from './PageComponents';
import { Button, Text } from '../Hi/Components/Basics';
import { HColor } from '../Hi/Colors';

export default class BasicComponents extends Container {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new MajorIcon('text').padding().rounded(),
                    new Text('Basic Components')
                        .padding()
                        .rounded()
                        .font('xxl')
                        .bold()
                        .margin({ top: 25 })
                        .foreground('black')
                )
                    .backgroundImage('assets/BasicComponents.png')
                    .stretch()
                    .padding({ bottom: 50 })
                    .foreground('white'),

                new PrimaryHeading('Overview'),

                new PrimaryText(
                    'The basic components are used quite often during webapp development. These components include buttons and simple text elements. They are highly configurable just like any View, but they work right out of the box.'
                ),

                new PrimaryHeading('Text Component'),

                new PrimaryText(
                    'The Text components is very important for application development. It is responsible for rendering all strings of text within your app.'
                ),

                new ExampleViewer(new Text('Designed in Philadelphia.')).margin({ top: 25 }),

                new PrimaryHeading('Button Components'),

                new PrimaryText('Buttons allow for interactivity.'),

                new ExampleViewer(new Button(new Text('Designed in Philadelphia.'))).margin({ top: 25 }),

                new PrimaryText('Common Modifiers'),

                new SecondaryHeading('Padding'),

                new ExampleViewer(
                    new HStack(
                        new Text('1').padding().background(HColor('orange')).describe('Default padding'),
                        new Text('2').padding(20).background(HColor('green')).describe('20px padding'),
                        new Text('3')
                            .padding({ top: 10, right: 10, bottom: 25, left: 25 })
                            .background(HColor('indigo'))
                            .describe('10px 10px 25px 25px')
                    ).padding(50)
                ).margin({ top: 25 }),

                new SecondaryHeading('Background/Foreground'),

                new ExampleViewer(
                    new VStack(
                        new Text('Designed').background('black').foreground(HColor('blue')),
                        new Text('in').foreground(HColor('orange')),
                        new Text('Philadelphia').background(HColor('green')).foreground(HColor('gray6'))
                    ).padding(20)
                ).margin({ top: 25 }),

                new SecondaryHeading('Roundedness'),

                new ExampleViewer(
                    new VStack(
                        new Text('Barely Round').background(HColor('blue')).rounded(5).padding().margin(),
                        new Text('Just Round Enough').background(HColor('blue')).rounded().padding().margin(),
                        new Text('Very Round').background(HColor('blue')).rounded(20).padding().margin(),
                        new Text('Too Round').background(HColor('blue')).rounded('100%').padding().margin()
                    )
                )
            )
        );
    }
}
