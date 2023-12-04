export const slideVariants = {
    enter: ({ direction, xValue }: { direction: number; xValue: number }) => {
        return {
            x: direction * xValue,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: ({ direction, xValue }: { direction: number; xValue: number }) => {
        return {
            zIndex: 0,
            x: direction * xValue * -1,
            opacity: 0,
        };
    },
};

export const flipVariants = {
    enter: (direction: number) => {
        return {
            opacity: 0,
            rotateX: direction < 0 ? -120 : 0,
            backgroundColor: direction < 0 ? '#A8B2C2' : '#F6F5F8',
        };
    },
    center: {
        zIndex: 2,
        opacity: 1,
        rotateX: 0,
        backgroundColor: '#F6F5F8',
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            opacity: 0,
            rotateX: direction > 0 ? -120 : 0,
            backgroundColor: direction > 0 ? '#A8B2C2' : '#F6F5F8',
        };
    },
};

export const countDownContainerVariants = {
    enter: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

export const countDownVariants = {
    enter: {
        scale: 1,
    },
    animate: {
        scale: 15,
        transition: {
            scale: { duration: 1.7 },
        },
    },
};

export const opacityVariants = {
    enter: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            opacity: { duration: 0.5 },
        },
    },
    exit: {
        opacity: 0,
    },
};
