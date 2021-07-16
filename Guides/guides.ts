import GuidesApp from './GuidesApp';
import { ViewController } from './Hi/human';

new ViewController({
    main: new GuidesApp(),
})
    .bind()
    .navigateTo();
