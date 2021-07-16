import { HColor } from '../HumanInterface/Colors';
import { Button, Text } from '../HumanInterface/Components/Basics';
import { Icon } from '../HumanInterface/Components/Graphics';
import { TextField, PasswordField } from '../HumanInterface/Components/Inputs';
import { AgreementOverlay, AlertOverlay } from '../HumanInterface/Components/Overlays';
import { VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';
import { FormConnector } from '../HumanInterface/ViewConnectors';

export default class SignupViewer extends VStack {
    constructor() {
        const fname = new TextField('First Name')
            .padding()
            .rounded(0)
            .rounded({ top: { left: 10 } })
            .borderBottom({ style: 'none' })
            .borderRight({ style: 'none' })
            .noOutline();

        const middleInitial = new TextField('M.I.')
            .padding()
            .rounded(0)
            .borderBottom({ style: 'none' })
            .width(50)
            .noOutline();

        const lname = new TextField('Last Name')
            .padding()
            .rounded(0)
            .rounded({ top: { right: 10 } })
            .borderLeft({ style: 'none' })
            .borderBottom({ style: 'none' })
            .noOutline();

        const email = new TextField('Email').padding().rounded(0).stretch().noOutline();

        const password = new PasswordField()
            .padding()
            .rounded(0)
            .stretch()
            .borderTop({ style: 'none' })
            .borderRight({ style: 'none' })
            .noOutline();

        const confirmPassword = new PasswordField()
            .placeholder('Confirm Plassword')
            .padding()
            .rounded(0)
            .stretch()
            .borderTop({ style: 'none' })
            .noOutline();

        const signupButton = new Button(
            new HStack(new Icon('chevron-forward-circle-outline').font('lg'), new Spacer(), new Text('Sign Up'))
        )
            .stretch()
            .padding()
            .border({ size: 0, style: 'solid', color: 'silver' })
            .borderBottom({ size: 1 })
            .borderRight({ size: 1 })
            .rounded(0)
            .rounded({ bottom: { right: 10 } });

        new FormConnector('/register')
            .connectInput('fname', fname)
            .connectInput('mi', middleInitial)
            .connectInput('lname', lname)
            .connectInput('email', email)
            .connectInput('password', password)
            .connectInput('confirmPassword', confirmPassword)
            .connectSubmitButton(signupButton, response => {
                console.log(response);
            });

        super(
            new VStack(
                new HStack(fname, middleInitial, lname).stretch(),
                new HStack(email).stretch(),
                new HStack(password, confirmPassword).stretch(),
                new HStack(
                    new Button(new HStack(new Icon('backspace').font('lg'), new Spacer(), new Text('Clear')))
                        .stretch()
                        .padding()
                        .border({ size: 0, style: 'solid', color: 'silver' })
                        .borderLeft({ size: 1 })
                        .borderBottom({ size: 1 })
                        .borderRight({ size: 1 })
                        .rounded(0)
                        .rounded({ bottom: { left: 10 } })
                        .foreground('black'),
                    new Button(
                        new HStack(
                            new Icon('shield-checkmark-outline').font('lg'),
                            new Spacer(),
                            new Text('Terms and Conditions')
                        )
                    )
                        .id('tac-button')
                        .stretch()
                        .border({ size: 0, style: 'solid', color: 'silver' })
                        .borderBottom({ size: 1 })
                        .borderRight({ size: 1 })
                        .rounded(0)
                        .padding()
                        .foreground(HColor('gray'))
                        .whenClicked(termsButtonEv => {
                            new AgreementOverlay(
                                'Terms & Conditions',
                                'shield-outline',
                                new Text('No Terms and Services have been provided yet.')
                            )
                                .whenConfirmed(() => {
                                    termsButtonEv.view.foreground(HColor('green'));
                                })
                                .whenCancelled(() => {
                                    termsButtonEv.view.foreground(HColor('red'));
                                });
                        }),

                    signupButton
                ).stretch()
            ),

            new Text(
                'Accounts are only meant for clients. If you are a client, please register and your account will be activated upon client verification. Otherwise, please do not fill out this form, as the account will not be activated.'
            )
                .font('sm')
                .lineHeight('150%')
                .foreground(HColor('gray'))
                .width('50%')
                .margin({ top: 50 })
        );
    }
}
