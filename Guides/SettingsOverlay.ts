import { changeTheme } from '@Hi/Colors';
import ClickButton from '@Hi/Components/ClickButton';
import HStack from '@Hi/Components/HStack';
import IonIcon from '@Hi/Components/IonIcon';
import Overlay from '@Hi/Components/Overlay';
import RadioButton from '@Hi/Components/RadioButton';
import RadioGroup from '@Hi/Components/RadioGroup';
import TextView from '@Hi/Components/TextView';
import VStack from '@Hi/Components/VStack';
import { StateObject } from '@Hi/Types/states';

export default class SettingsOverlay extends Overlay {
    public settings = StateObject(
        {
            color: 'light',
        },
        prop => {
            if (prop == 'color') {
                if (this.settings.color == 'light') {
                    this.lightRadio.setSelected(true);
                    this.darkRadio.setSelected(false);
                    changeTheme('light');
                } else {
                    this.lightRadio.setSelected(false);
                    this.darkRadio.setSelected(true);
                    changeTheme('dark');
                }
            }
        }
    );

    private lightRadio: RadioButton;
    private darkRadio: RadioButton;
    private radioGroup: RadioGroup;

    constructor() {
        super(
            new VStack(
                new TextView('Color Mode').font('xl'),
                new HStack(
                    new HStack(
                        new RadioButton()
                            .padding()
                            .id('light-radio-button')
                            .whenClicked(() => {
                                this.settings.color = 'light';
                            }),
                        new TextView('Light')
                    ).padding(),
                    new HStack(
                        new RadioButton()
                            .padding()
                            .id('dark-radio-button')
                            .whenClicked(() => {
                                this.settings.color = 'dark';
                            }),
                        new TextView('Dark')
                    ).padding()
                ).stretchWidth(),
                new HStack(
                    new ClickButton(
                        new VStack(new IonIcon('close-circle-outline'), new TextView('Close').font('sm'))
                    ).whenClicked(() => {
                        this.destroy();
                    })
                )
            ).stretch()
        );

        this.lightRadio = this.getViewById('light-radio-button') as RadioButton;
        this.darkRadio = this.getViewById('dark-radio-button') as RadioButton;
        this.radioGroup = new RadioGroup(this.lightRadio, this.darkRadio);
    }
}
