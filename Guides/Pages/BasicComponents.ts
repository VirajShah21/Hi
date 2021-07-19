import { Container, HStack, VStack } from '../Hi/Components/Stacks';
import { ExampleViewer, MajorIcon, PrimaryHeading, PrimaryText } from './PageComponents';
import { Text } from '../Hi/Components/Basics';
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

                new ExampleViewer(new Text('Hello World')).width(200).height(200)
            )
        );
    }
}
