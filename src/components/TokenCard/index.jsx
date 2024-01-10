
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import { stylex } from "@stylexjs/stylex";
import { cardStyles } from "./style";


const TokenCard = ({ token, actionComponent }) => {
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
                            <h4 className="text-small font-semibold leading-none text-default-600">{token?.userName}</h4>
                            <h5 className="text-small tracking-tight text-default-200">{token?.corpName}</h5>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <Chip color="primary" size="sm" radius="full" className="flex-shrink-0">{token?.env}</Chip>
                                <Chip color="primary" size="sm" radius="full" className="flex-shrink-0">{token?.location}</Chip>
                            </div>
                        </div>
                    </div>
                    {
                        actionComponent
                    }
                </CardHeader>
                <CardBody className="px-4 py-3 pt-0 text-small text-default-400 flex flex-row justify-left items-center gap-1">
                    <Chip color="primary" size="sm" radius="full" className="flex-shrink-0">{token?.corpid}</Chip>
                    <Chip color="primary" size="sm" radius="full" className="flex-shrink-0">{token?.userId}</Chip>
                </CardBody>
            </Card>
        </>
    )
}

export default TokenCard