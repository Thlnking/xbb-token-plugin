import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import CurrentToken from '../CurrentToken'
import TokenInput from '../TokenInput'

console.log('[ useSpring, animated ] >', useSpring, animated.div)


const CurrentTokenTab = () => {

    const springs = useSpring({
        from: { x: -80 },
        to: { x: 0 },
    })
    console.log('[ springs ] >', springs)

    useEffect(() => {
        console.log('[ useEffect ] >', springs)
    }, [springs])

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
            <CurrentToken />
            <TokenInput />
        </animated.div>
    )
}


export default CurrentTokenTab;