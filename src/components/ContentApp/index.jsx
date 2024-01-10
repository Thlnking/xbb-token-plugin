import * as stylex from '@stylexjs/stylex';
import { contentAppStyles } from '/src/styles/content';
import { useState } from 'react';
import TokenInfo from '/src/class/TokenInfo';
import MessageSender from '../../class/MessageSender';
import { useEffect } from 'react';

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
            console.log('[ 保存当前Token ] >', TokenInfo.getCurrentTokenInfo())
            setTimeout(() => {
                message.send({
                    user: 'content',
                    action: 'saveToken',
                    data: TokenInfo.getCurrentTokenInfo()
                });
            }, 3000)
        }
    },
]





const ContentApp = () => {

    const [fold, setFold] = useState(false);

    const boxClick = (e) => {
        e.stopPropagation();
        setFold(!fold);
    }

    useEffect(() => {
        message.send({
            user: 'content',
            action: 'currentToken',
            data: TokenInfo.getCurrentTokenInfo() || '没有获取到 token'
        });

        console.log('%c [  TokenInfo.getCurrentTokenInfo() ]-63', 'font-size:13px; background:pink; color:#bf2c9f;', TokenInfo.getCurrentTokenInfo())
    }, [])


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
                <div
                    {...stylex.props(contentAppStyles.gradientButtonGroup)}
                >
                    {
                        buttonGroup.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    {...stylex.props(contentAppStyles.gradientButton)}
                                    onClick={item.func}
                                >{item.label}</button>
                            )
                        })
                    }
                </div>

            </div>
        </div >
    );
}



export default ContentApp;