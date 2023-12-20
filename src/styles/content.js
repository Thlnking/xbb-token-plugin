import * as stylex from '@stylexjs/stylex';

const contentAppStyles = stylex.create({
    container: {
        position: "fixed",
        top: 0,
        left: '50%',
        fontSize: 16,
        lineHeight: 1.5,
        color: 'rgb(60,60,60)',
        backgroundColor: 'white',
        width: '520px',
        height: '55px',
        marginLeft: "-260px",
        zIndex: 1000,
        borderRadius: '0 0 15px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ":after": {
            content: '""',
            position: 'absolute',
            borderLeftColor: 'transparent',
            borderLeftWidth: '15px',
            borderLeftStyle: 'solid',
            bottom: '-12px',
            width: 0,
            height: 0,
            borderRight: '15px solid transparent',
            borderTopWidth: '12px',
            borderTopStyle: 'solid',
            borderTopColor: '#a8e4f1',
        }
    },
    lineGradient: {
        background: 'linear-gradient(to bottom, #48cae4, #a8e4f1)',
    },
    highlighted: {
        color: 'rebeccapurple',
    },
});


console.log('[ contentAppStyles ] >', contentAppStyles)

export {
    contentAppStyles
};