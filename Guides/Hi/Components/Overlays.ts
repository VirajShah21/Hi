import { HColor, rgba } from '../Colors';
import { ClickButton, TextContent } from './Basics';
import InputField, { TextField } from './Inputs';
import { VStack, HStack, ScrollView } from './Stacks';
import View from '../View';
import { IonIcon } from './Graphics';

export class Overlay extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.background(HColor('background').alpha(0.25))
            .foreground(HColor('foreground'))
            .width('100vw')
            .height('100vh')
            .zIndex(100)
            .fixed()
            .setTop(0)
            .setLeft(0)
            .blur();
        document.body.appendChild(this.body);
    }
}

export class AlertOverlay extends Overlay {
    constructor(message: string) {
        super(
            new VStack(
                new TextContent(message).padding().font('small').lineHeight('200%'),
                new HStack(
                    new ClickButton(new TextContent('Cancel'))
                        .background(rgba(255, 255, 255, 0.5))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-cancel-button'),
                    new ClickButton(new TextContent('Ok'))
                        .background(rgba(255, 255, 255, 0.5))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-confirm-button')
                ).padding()
            )
                .stretchHeight()
                .width('50%')
        );
        this.body.style.display = 'flex';
        this.width('100vw').height('100vh').position('fixed').zIndex(100).setTop(0).setLeft(0).blur();
    }

    whenConfirmed(callback: () => void): this {
        (this.getViewsByClass('hi-alert-overlay-confirm-button')[0] as ClickButton).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-alert-overlay-cancel-button')[0] as ClickButton).whenClicked(callback);
        return this;
    }
}

export class PromptOverlay extends Overlay {
    constructor(prompt: string) {
        super(
            new VStack(
                new TextContent(prompt).padding().font('small'),
                new TextField().addClass('hi-prompt-input'),
                new HStack(
                    new ClickButton(new TextContent('Cancel'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-cancel-button'),
                    new ClickButton(new TextContent('Ok'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-confirm-button')
                ).padding()
            )
        );
    }

    whenConfirmed(callback: (response: string) => void): this {
        (this.getViewsByClass('hi-prompt-overlay-confirm-button')[0] as ClickButton).whenClicked(() => {
            callback((this.getViewsByClass('hi-prompt-input')[0] as InputField).attributes.value);
        });
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-prompt-overlay-cancel-button')[0] as ClickButton).whenClicked(callback);
        return this;
    }
}

export class AgreementOverlay extends Overlay {
    constructor(title: string, icon: string, ...agreementContents: View[]) {
        super(
            new VStack(
                new IonIcon(icon).font('lg'),
                new TextContent(title).padding().font('xl'),
                new ScrollView(...agreementContents).height(100),
                new HStack(
                    new ClickButton(new TextContent('Decline'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-cancel-button'),
                    new ClickButton(new TextContent('Agree'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-confirm-button')
                )
            )
        );
    }

    whenConfirmed(callback: () => void): this {
        (this.getViewsByClass('hi-agreement-overlay-confirm-button')[0] as ClickButton).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-agreement-overlay-cancel-button')[0] as ClickButton).whenClicked(callback);
        return this;
    }
}
