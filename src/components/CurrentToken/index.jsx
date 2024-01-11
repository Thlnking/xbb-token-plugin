
import { useState } from "react";

import { Button, ButtonGroup } from "@nextui-org/react";
import TokenCard from "../TokenCard";
import TokenDBManager from "../../class/TokenDBManager";


const saveCurrentToken = (token) => {
    console.log('[ saveCurrentToken ] >', token)
    const tokenDbManager = new TokenDBManager();
    tokenDbManager.saveToken(token);
}

const ActionButtonGroup = ({ token, saveCurrentTokenCallback }) => {

    const [isFollowed, setIsFollowed] = useState(false);
    return (
        <ButtonGroup>
            <Button
                onPress={() => setIsFollowed(!isFollowed)}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                复制
            </Button>
            <Button
                onClick={() => {
                    saveCurrentToken(token);
                    saveCurrentTokenCallback();
                }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                保存
            </Button>
        </ButtonGroup>
    )
}


const CurrentToken = ({ currentToken, refreshAllToken }) => {
    return (
        <>
            <TokenCard token={currentToken} actionComponent={
                <ActionButtonGroup token={currentToken} saveCurrentTokenCallback={refreshAllToken} />
            } />
        </>
    )
}

export default CurrentToken