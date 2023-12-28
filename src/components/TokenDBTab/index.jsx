
import { useSpring, animated } from '@react-spring/web'




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
                    allToken.length
                }
                {
                    JSON.stringify(allToken)
                }
            </div>


        </animated.div>
    )
}

export default TokenDBTab