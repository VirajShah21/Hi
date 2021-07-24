import GuidesApp from './GuidesApp';
import { ViewController } from './Hi/ViewController';

new ViewController({
    main: new GuidesApp(),
})
    .bind()
    .navigateTo();
