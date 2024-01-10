
import { useState } from "react";

import { Button, ButtonGroup } from "@nextui-org/react";
import TokenCard from "../TokenCard";


const ActionButtonGroup = ({ token }) => {

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
                onPress={() => setIsFollowed(!isFollowed)}
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


const CurrentToken = ({ currentToken }) => {

    return (
        <>
            <TokenCard token={currentToken} actionComponent={
                <ActionButtonGroup token={currentToken} />
            } />
        </>
    )
}

export default CurrentToken