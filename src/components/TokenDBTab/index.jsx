
import { useSpring, animated } from '@react-spring/web'

import { Button, ButtonGroup } from "@nextui-org/react";
import TokenCard from '../TokenCard'



const ActionButtonGroup = ({ token }) => {
    return (
        <ButtonGroup>
            <Button
                onPress={() => { }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                复制{token?.userName}
            </Button>
            <Button
                onPress={() => { }}
                className="text-tiny text-white bg-black/10"
                variant="flat"
                color="default"
                radius="lg"
                size="sm"
            >
                保存
            </Button>
            <Button
                onPress={() => { }}
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
    allToken
}) => {
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
            <div

            >
                {
                    allToken.map((token, index) => {
                        return (
                            <TokenCard key={index} token={token} actionComponent={
                                <ActionButtonGroup token={token} />
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