import { rgba } from '../Colors';
import { Button, Text } from './Basics';
import InputField, { TextField } from './Inputs';
import { VStack, HStack, ScrollView } from './Stacks';
import View from '../View';
import { LineBreak } from './Whitespace';
import { Icon } from './Graphics';

export abstract class Overlay extends View {
    constructor(...children: View[]) {
        super('div', ...children);
        this.addClass('hi-overlay');
        this.background(rgba(255, 255, 255, 0.25));
        document.body.appendChild(this.body);
    }
}

export class AlertOverlay extends Overlay {
    constructor(message: string) {
        super(
            new VStack(
                new Text(message).padding().font('small').lineHeight('200%'),
                new HStack(
                    new Button(new Text('Cancel'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-cancel-button'),
                    new Button(new Text('Ok'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-alert-overlay-confirm-button')
                ).padding()
            )
                .stretchHeight()
                .width('50%')
        );
    }

    whenConfirmed(callback: () => void): this {
        (this.getViewsByClass('hi-alert-overlay-confirm-button')[0] as Button).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-alert-overlay-cancel-button')[0] as Button).whenClicked(callback);
        return this;
    }
}

export class PromptOverlay extends Overlay {
    constructor(prompt: string) {
        super(
            new VStack(
                new Text(prompt).padding().font('small'),
                new TextField().addClass('hi-prompt-input'),
                new HStack(
                    new Button(new Text('Cancel'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-cancel-button'),
                    new Button(new Text('Ok'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-prompt-overlay-confirm-button')
                ).padding()
            )
        );
    }

    whenConfirmed(callback: (response: string) => void): this {
        (this.getViewsByClass('hi-prompt-overlay-confirm-button')[0] as Button).whenClicked(() => {
            callback((this.getViewsByClass('hi-prompt-input')[0] as InputField).attributes.value);
        });
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-prompt-overlay-cancel-button')[0] as Button).whenClicked(callback);
        return this;
    }
}

export class AgreementOverlay extends Overlay {
    constructor(title: string, icon: string, ...agreementContents: View[]) {
        super(
            new VStack(
                new Icon(icon).font('lg'),
                new Text(title).padding().font('xl'),
                new ScrollView(...agreementContents).height(100),
                new HStack(
                    new Button(new Text('Decline'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-cancel-button'),
                    new Button(new Text('Agree'))
                        .whenClicked(() => {
                            this.destroy();
                        })
                        .addClass('hi-agreement-overlay-confirm-button')
                )
            )
        );
    }

    whenConfirmed(callback: () => void): this {
        (this.getViewsByClass('hi-agreement-overlay-confirm-button')[0] as Button).whenClicked(callback);
        return this;
    }

    whenCancelled(callback: () => void): this {
        (this.getViewsByClass('hi-agreement-overlay-cancel-button')[0] as Button).whenClicked(callback);
        return this;
    }
}
