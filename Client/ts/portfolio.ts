import { ViewController } from './HumanInterface/human';
import PortfolioApp from './Views/PortfolioApp';

new ViewController({
    main: new PortfolioApp(),
})
    .bind()
    .navigateTo();
