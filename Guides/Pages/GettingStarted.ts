import { VStack } from '../Hi/Components/Stacks';
import {Title} from './PageComponents';

export default class GettingStarted extends VStack {
    constructor() {
        super(
            new Title("Getting Started")
        )
    }
}