import { HColor } from '../HumanInterface/Colors';
import { Button, Text } from '../HumanInterface/Components/Basics';
import { Icon, Image } from '../HumanInterface/Components/Graphics';
import { VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';

export default class AboutMeViewer extends VStack {
    constructor() {
        super(
            new HStack(
                new Spacer(),
                new Image('/assets/me.jpg', 'A portrait of me')
                    .width(250)
                    .rounded(25)
                    .border({ size: 2, style: 'solid', color: HColor('blue') })
                    .margin({ top: 400 }),
                new Spacer()
            )
                .backgroundImage(
                    'https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
                )
                .stretch()
                .height(400)
                .margin({ bottom: 200 }),
            new Spacer(),
            new HStack(new Text('I am ').padding({ right: 10 }), new Text('Viraj Shah').bold(), new Spacer())
                .font('xxl')
                .margin({ bottom: 25 })
                .padding(15),
            new Text(
                "I am a computer programmer from Plainsboro, NJ (near Princeton). Nowadays I'm put up in Philadelphia, PA."
            ).textStart(),
            new HStack(
                new Spacer(),
                new Icon('mail-outline').font('xxl').padding(),
                new Button(new Text('viraj@virajshah.org')).font('sm'),
                new Spacer(),
                new Icon('call-outline').font('xxl').padding(),
                new Button(new Text('(609) 751 7703')).font('sm'),
                new Spacer(),
                new Icon('logo-github').font('xxl').padding(),
                new Button(new Text('VirajShah21')).font('sm'),
                new Spacer(),
                new Icon('logo-linkedin').font('xxl').padding(),
                new Button(new Text('Viraj Shah')).font('sm'),
                new Spacer()
            )
                .stretchWidth()
                .padding()
                .padding({ top: 50 })
        );
    }
}
