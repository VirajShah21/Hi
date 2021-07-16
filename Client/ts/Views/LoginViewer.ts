import { HColor } from '../HumanInterface/Colors';
import { Button, Text } from '../HumanInterface/Components/Basics';
import { Icon } from '../HumanInterface/Components/Graphics';
import { TextField, PasswordField } from '../HumanInterface/Components/Inputs';
import { VStack, HStack } from '../HumanInterface/Components/Stacks';
import { Spacer } from '../HumanInterface/Components/Whitespace';
import { FormConnector } from '../HumanInterface/ViewConnectors';

export default class LoginViewer extends VStack {
    constructor() {
        const email = new TextField('Email')
            .padding()
            .rounded(0)
            .rounded({ top: { left: 10, right: 10 } })
            .noOutline();

        const password = new PasswordField()
            .padding()
            .rounded(0)
            .border({ size: 0, style: 'solid', color: 'silver' })
            .borderLeft({ size: 1 })
            .borderRight({ size: 1 })
            .noOutline();

        const login = new Button(
            new HStack(new Icon('chevron-forward-circle-outline').font('md'), new Spacer(), new Text('Login'))
        )
            .stretch()
            .padding()
            .border({ size: 1, style: 'solid', color: 'silver' })
            .borderLeft({ size: 0 })
            .rounded(0)
            .rounded({ bottom: { right: 10 } });

        new FormConnector('/login')
            .connectInput('email', email)
            .connectInput('password', password)
            .connectSubmitButton(login, response => {
                console.log(response);
                const success = response.status === 'success';
                const error = response.error;
                const target = this.getViewById('server-response') as Text;
                const message = error ? (error as Error).message : undefined || 'Error';
                target.foreground(success ? HColor('green') : HColor('red')).text.value = message;
            });

        super(
            new Text('').id('server-response').foreground(HColor('red')),
            new VStack(
                email,
                password,
                new HStack(
                    new Button(new HStack(new Icon('backspace').font('md'), new Spacer(), new Text('Clear')))
                        .padding()
                        .rounded(0)
                        .rounded({ bottom: { left: 10 } })
                        .border({ size: 1, style: 'solid', color: 'silver' })
                        .foreground('gray')
                        .stretch(),
                    login
                ).stretch()
            )
        );
    }
}
