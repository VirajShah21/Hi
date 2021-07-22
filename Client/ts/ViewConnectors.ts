import { ClickButton } from './Components/Basics';
import InputField from './Components/Inputs';

export class FormConnector {
    public action: string;
    public inputViews: Record<string, InputField>;

    constructor(action: string) {
        this.action = action;
        this.inputViews = {};
    }

    post(callback: (response: Record<string, unknown>) => void): void {
        const body: Record<string, string> = {};

        for (const key in this.inputViews) body[key] = this.inputViews[key].attributes.value;

        fetch(this.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body),
        })
            .then(data => data.json())
            .then(callback);
    }

    connectInput(name: string, field: InputField): this {
        this.inputViews[name] = field;
        return this;
    }

    connectSubmitButton(button: ClickButton, callback: (response: Record<string, unknown>) => void): this {
        button.whenClicked(() => {
            this.post(callback);
        });
        return this;
    }
}
