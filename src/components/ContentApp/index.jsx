import * as stylex from '@stylexjs/stylex';
import { contentAppStyles } from '/src/styles/content';
import { useState } from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import TokenInfo from '/src/class/TokenInfo';
import './style.css';
import MessageSender from '../../class/MessageSender';

console.log('[ stylex, contentAppStyles ] >', stylex, contentAppStyles)

const message = new MessageSender('content');

const buttonGroup = [
    {
        label: '提取Token到剪贴板',
        func: () => {
            TokenInfo.copyCurrentTokenInfoToClipboard();
        }
    },
    {
        label: '生成登录脚本到剪贴板',
        func: () => {
            TokenInfo.copyScriptToClipboard();
        }
    },
    {
        label: '保存当前Token',
        func: () => {
            setInterval(() => {
                console.log('[ 保存当前Token ] >', TokenInfo.getCurrentTokenInfo())
                message.send({
                    user: 'content',
                    action: 'saveToken',
                    data: TokenInfo.getCurrentTokenInfo()
                });

            }, 1000)
        }
    },
]



const ContentApp = () => {

    const [fold, setFold] = useState(false);

    const boxClick = (e) => {
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