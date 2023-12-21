import * as stylex from '@stylexjs/stylex';
import { contentAppStyles } from '../styles/content';
import { useState } from 'react';

console.log('[ stylex, contentAppStyles ] >', stylex, contentAppStyles)


const ContentApp = () => {

    const [fold, setFold] = useState(true);

    const boxClick = (e) => {
        console.log('[ e ] >', e)
        e.stopPropagation();
        setFold(!fold);
    }


    return (
        <div
            onClick={boxClick}
            {
            ...stylex.props(contentAppStyles.container, contentAppStyles.lineGradient, fold ? contentAppStyles.fold : contentAppStyles.unfold)
            }>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                {
                ...stylex.props(contentAppStyles.box)
                }
            >
                你好
            </div>
        </div>
    );
}



export default ContentApp;