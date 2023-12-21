
import { useState } from "react";

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, ButtonGroup } from "@nextui-org/react";
import { stylex } from "@stylexjs/stylex";
import { cardStyles } from "./style";


const TokenInput = () => {

    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <>

            <Card className="max-w-[550px]"
                {
                ...stylex.props(cardStyles.card)
                }
            >
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                        </div>
                    </div>
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
                </CardHeader>
                <CardBody className="px-4 py-0 h-36 text-small text-default-400">
                </CardBody>
            </Card>
        </>
    )
}

export default TokenInput