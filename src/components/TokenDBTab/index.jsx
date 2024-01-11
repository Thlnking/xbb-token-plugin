
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react'

import { Button, ButtonGroup } from "@nextui-org/react";
import TokenCard from '../TokenCard'
import TokenInfo from '../../class/TokenInfo';
import TokenDBManager from '../../class/TokenDBManager';
import SearchInput from './SearchInput';



const ActionButtonGroup = ({ token, deleteTokenCallback, setToken }) => {
    return (
        <ButtonGroup>
            <Button
                onClick={() => {
                    TokenInfo.copyTokenInfoToClipboard(token);
                }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                Token
            </Button>
            <Button
                onClick={() => {
                    TokenInfo.copyTokenScriptToClipboard(token);
                }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                脚本
            </Button>
            <Button
                onClick={() => {
                    setToken(token)
                }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                使用
            </Button>
            <Button
                onClick={() => {
                    const tokenDbManager = new TokenDBManager();
                    tokenDbManager.deleteToken(token);
                    deleteTokenCallback();
                }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                删除
            </Button>
        </ButtonGroup>
    )
}



const TokenDBTab = ({
    allToken,
    refreshAllToken,
    setToken
}) => {

    const [searchKey, setSearchKey] = useState('')

    const springs = useSpring({
        from: { x: -80 },
        to: { x: 0 },
    })

    return (
        <animated.div
            style={
                {
                    width: '100%',
                    height: '100%',
                    borderRadius: 8,
                    ...springs
                }
            }
        >
            <div>
                <SearchInput onValueChange={
                    (value) => {
                        console.log('%c [ allToken ]-99', 'font-size:13px; background:pink; color:#bf2c9f;', allToken, value)
                        setSearchKey(value)
                    }
                } />
                {
                    allToken.filter(item => {
                        console.log('%c [ item ]-104', 'font-size:13px; background:pink; color:#bf2c9f;', item)
                        return item.corpName && item.corpName.includes(searchKey.replaceAll(/\s+/g, ''))
                    }).map((token, index) => {
                        return (
                            <TokenCard key={index} token={token} actionComponent={
                                <ActionButtonGroup setToken={setToken} token={token} deleteTokenCallback={refreshAllToken} />
                            } />
                        )
                    }
                    )
                }
            </div>


        </animated.div>
    )
}

export default TokenDBTab