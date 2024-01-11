import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import CurrentToken from "../CurrentToken";
import TokenInput from "../TokenInput";
import TokenDBManager from "../../class/TokenDBManager";

console.log("[ useSpring, animated ] >", useSpring, animated.div);
const saveCurrentToken = (token) => {
    console.log('[ saveCurrentToken ] >', token)
    const tokenDbManager = new TokenDBManager();
    tokenDbManager.saveToken(token);
}
const CurrentTokenTab = ({ currentToken, refreshAllToken, setInputToken }) => {
    const springs = useSpring({
        from: { x: -80 },
        to: { x: 0 },
    });
    console.log("[ springs ] >", springs);

    useEffect(() => {
        console.log("[ useEffect ] >", springs);
    }, [springs]);

    return (
        <animated.div
            style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
                ...springs,
            }}
        >
            <CurrentToken
                currentToken={currentToken}
                refreshAllToken={refreshAllToken}
            />
            <TokenInput
                saveToken={(token) => {
                    console.log("[ saveToken ] >", token);
                    saveCurrentToken(token);
                    refreshAllToken();
                }}
                setInputToken={(token) => {
                    console.log("[ setInputToken ] >", token);
                    setInputToken(token);
                }}

                refreshAllToken={refreshAllToken}
            />
        </animated.div>
    );
};

export default CurrentTokenTab;
