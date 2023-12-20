import * as stylex from '@stylexjs/stylex';
import { contentAppStyles } from '../styles/content';

console.log('[ stylex, contentAppStyles ] >', stylex, contentAppStyles)


const ContentApp = () => {
    return (
        <div {
            ...stylex.props(contentAppStyles.container, contentAppStyles.lineGradient)
        }>
        </div>
    );
}



export default ContentApp;