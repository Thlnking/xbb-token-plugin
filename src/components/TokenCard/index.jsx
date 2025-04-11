
import { Card, CardHeader, CardBody, Chip } from "@nextui-org/react";
import styles from "./style.module.css";


const TokenCard = ({ token, actionComponent }) => {
    return (
        <>
            <Card className={`max-w-[550px] ${styles.card}`}
            >
                <CardHeader className="justify-between">
                    <div className="flex gap-5">
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">{token?.userName || 'unKnow'}</h4>
                            <h5 className="text-small text-blue-600 ">{token?.corpName || 'unKnow'}</h5>
                        </div>
                    </div>
                    {
                        token?.xbbAccessToken &&
                        actionComponent
                    }
                </CardHeader>


                <CardBody className="px-4 py-3 pt-0 text-small text-default-400 flex flex-row justify-left items-center gap-1">
                    {token?.env && <Chip color="warning" size="sm" radius="full" className="flex-shrink-0">{token?.env}</Chip>}
                    {token?.location &&
                        <Chip color="secondary" size="sm" radius="full" className="flex-shrink-0">
                            {token?.location}
                        </Chip>
                    }
                    {
                        token?.userId &&
                        <Chip color="success" size="sm" radius="full" className="flex-shrink-0">
                            {token?.userId}
                        </Chip>
                    }
                </CardBody>
            </Card>
        </>
    )
}

export default TokenCard