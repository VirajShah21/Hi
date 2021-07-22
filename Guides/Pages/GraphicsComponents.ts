import { HColor } from '../Hi/Colors';
import { ClickButton, TextContent } from '../Hi/Components/Basics';
import { Icon, Image } from '../Hi/Components/Graphics';
import { AlertOverlay } from '../Hi/Components/Overlays';
import { Container, HStack, VStack } from '../Hi/Components/Stacks';
import { Spacer } from '../Hi/Components/Whitespace';
import { ExampleViewer, MajorIcon, PrimaryHeading, SecondaryHeading } from './PageComponents';

export default class GraphicsComponent extends Container {
    constructor() {
        super(
            new VStack(
                new VStack(
                    new MajorIcon('images-outline').blur().rounded(),
                    new TextContent('Graphics Components').font('xxl').bold().margin({ top: 25 }).blur().rounded()
                )
                    .stretchWidth()
                    .backgroundImage('assets/GraphicsComponents.png')
                    .foreground('white')
                    .padding(),

                new PrimaryHeading('Icons'),

                new ExampleViewer(
                    new VStack(
                        new HStack(
                            new Icon('battery-full').padding().foreground(HColor('green')),
                            new Icon('battery-half').padding().foreground(HColor('yellow')),
                            new Icon('battery-dead').padding().foreground(HColor('red')),
                            new Icon('battery-charging').padding()
                        ),
                        new HStack(
                            new Icon('battery-full-sharp').padding().foreground(HColor('green')),
                            new Icon('battery-half-sharp').padding().foreground(HColor('yellow')),
                            new Icon('battery-half-sharp').padding().foreground(HColor('red')),
                            new Icon('battery-charging-sharp').padding()
                        )
                    )
                        .font('xxl')
                        .padding(25)
                ).margin({ top: 25 }),

                new PrimaryHeading('Instagram Component?'),

                new ExampleViewer(
                    new VStack(
                        new Image(
                            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
                        )
                            .width({ max: '100%' })
                            .margin({ bottom: 10 }),
                        new HStack(
                            new ClickButton(
                                new Icon('heart-outline')
                                    .describe('Icon Name: heart-outline')
                                    .font('xl')
                                    .foreground(HColor('red'))
                                    .id('like-button')
                            ).whenClicked(ev => {
                                const likeButton = ev.view.getViewById('like-button');
                                likeButton.body.setAttribute(
                                    'name',
                                    likeButton.body.getAttribute('name').indexOf('outline') > 0
                                        ? 'heart'
                                        : 'heart-outline'
                                );
                            }),
                            new ClickButton(
                                new Icon('chatbubble-outline')
                                    .describe('Icon Name: chatbubble-outline')
                                    .font('xl')
                                    .id('comment-button')
                            ).whenClicked(_ => new AlertOverlay('Messages are disabled for this post.')),
                            new ClickButton(
                                new Icon('bookmark-outline')
                                    .describe('Icon Name: bookmark-outline')
                                    .font('xl')
                                    .foreground(HColor('orange'))
                                    .id('bookmark-button')
                            ).whenClicked(ev => {
                                const bookmarkButton = ev.view.getViewById('bookmark-button');
                                bookmarkButton.body.setAttribute(
                                    'name',
                                    bookmarkButton.body.getAttribute('name').indexOf('outline') > 0
                                        ? 'bookmark'
                                        : 'bookmark-outline'
                                );
                            }),
                            new ClickButton(
                                new Icon('share-outline')
                                    .describe('Icon Name: share-outline')
                                    .font('xl')
                                    .id('share-button')
                            ),
                            new Spacer(),
                            new TextContent('@jimmyferminphotography').font('md').foreground('gray')
                        ).stretch()
                    )
                        .margin()
                        .padding()
                        .background(HColor('gray6'))
                        .rounded()
                ).width({ max: '80%' })
            )
        );
    }
}
