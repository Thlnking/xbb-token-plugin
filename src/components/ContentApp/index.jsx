import * as stylex from '@stylexjs/stylex';
import { contentAppStyles } from '/src/styles/content';
import { useState } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import TokenInfo from '/src/class/TokenInfo';
import './style.css';

console.log('[ stylex, contentAppStyles ] >', stylex, contentAppStyles)



const buttonGroup = [
    {
        label: '提取Token到剪贴板',
        func: () => {
            TokenInfo.copyCurrentTokenInfoToClipboard();
            console.log('[ 提取Token到剪贴板 ] >')
        }
    },
    {
        label: '生成登录脚本到剪贴板',
        func: () => {
            TokenInfo.copyScriptToClipboard();
            console.log('[ 生成登录脚本到剪贴板 ] >')
        }
    },
    {
        label: '保存当前Token',
        func: () => {
            console.log('[ 保存当前Token ] >', TokenInfo.getCurrentTokenInfo())
        }
    },
]



const ContentApp = () => {

    const [fold, setFold] = useState(false);

    const boxClick = (e) => {
        console.log('[ e ] >', e)
        e.stopPropagation();
        setFold(!fold);
    }


    return (
        <div
            onClick={boxClick}
            {...stylex.props(contentAppStyles.container, contentAppStyles.transparentBg, fold ? contentAppStyles.fold : contentAppStyles.unfold)}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                {...stylex.props(contentAppStyles.box,)}
            >
                <ButtonGroup
                >
                    {
                        buttonGroup.map((item, index) => {
                            return (
                                <Button
                                    key={index}
                                    {...stylex.props(contentAppStyles.gradientButton)}
                                    onClick={item.func}
                                >{item.label}</Button>
                            )
                        })
                    }
                </ButtonGroup>

            </div>
        </div >
    );
}



export default ContentApp;