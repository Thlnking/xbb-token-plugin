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
        width: '510px',
        height: '45px',
        marginLeft: "-255px",
        zIndex: 99999,
        borderRadius: '0 0 15px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        ":after": {
            content: '""',
            position: 'absolute',
            bottom: '-20px',
            width: '25px',
            height: '20px',
            background: 'linear-gradient(to bottom, #48cae4, #caf0f8)',
            clipPath: 'polygon(51% 46%, 0 0, 100% 0)'
        }
    },
    fold: {
        top: '-45px'
    },
    unfold: {
        top: '0px'
    },
    transparentBg: {
        background: 'transparent'
    },
    gradientButtonGroup: {
        background: ' #00b4d8',
        border: 'none !important',
        borderRadius: '23px !important',
    },

    gradientButton: {
        color: 'white !important',
        width: '170px',
        background: 'transparent !important',
        height: '35px !important',
        border: 'none !important',
        cursor: 'pointer',
        borderRadius: '23px !important',
        transition: 'all 0.5s',
        ":hover": {
            background: '#00b4ac !important',
            color: '#ffffff !important',
        }
    },
    lineGradient: {
        background: 'linear-gradient(to bottom, #00b4d8, #48cae4)',
    },


    box: {
        width: '100%',
        height: '100%',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease-in-out',
    },
});


console.log('[ contentAppStyles ] >', contentAppStyles)

export {
    contentAppStyles
};