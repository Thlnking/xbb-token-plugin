
import { useSpring, animated } from '@react-spring/web'


const TokenDBTab = () => {

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
            <div>TokenDBTab</div>
        </animated.div>
    )
}

export default TokenDBTab