import styles from '/src/styles/content.module.css';
import { useState } from 'react';
import TokenInfo from '/src/class/TokenInfo';
import MessageSender from '../../class/MessageSender';
import { useEffect } from 'react';

const message = new MessageSender('content');

const buttonGroup = [
    {
        label: '提取Token到剪贴板',
        func: () => {
            TokenInfo.copyCurrentTokenInfoToClipboard();
        }
    },
    {
        label: '复制脚本到剪贴板',
        func: () => {
            TokenInfo.copyScriptToClipboard();
        }
    },
    // {
    //     label: '保存当前Token',
    //     func: () => {
    //         console.log('[ 保存当前Token ] >', TokenInfo.getCurrentTokenInfo())
    //         setTimeout(() => {
    //             message.send({
    //                 user: 'content',
    //                 action: 'saveToken',
    //                 data: TokenInfo.getCurrentTokenInfo()
    //             });
    //         }, 3000)
    //     }
    // },
]





const ContentApp = () => {

    const [fold, setFold] = useState(true);

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
            className={`${styles.container} ${styles.transparentBg} ${fold ? styles.fold : styles.unfold}`}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                }}
                className={styles.box}
            >
                <div
                    className={styles.gradientButtonGroup}
                >
                    {
                        buttonGroup.map((item, index) => {
                            return (
                                <button
                                    key={index}
                                    className={styles.gradientButton}
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