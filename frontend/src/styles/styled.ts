import styled from 'styled-components';
import { colors } from '@styles/ZelloTheme';

export const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Color = styled.input<{ colorName: string; isSelected: boolean }>`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ colorName }) => colors[colorName as keyof typeof colors]};
    box-shadow: ${({ theme }) => theme.shadow.btn};
    border: ${({ isSelected }) => (isSelected ? `3px solid rgba(246, 245, 248, 0.6)` : ``)};
    cursor: pointer;
`;

export const ScaledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: ${({ theme }) => theme.layout.maxWidth};
    height: ${({ theme }) => theme.layout.maxHeight};
    transform: scale(${({ theme }) => theme.layout.sectionScale});
`;

export const VideoProperty = styled.video`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const Guide = styled(Center)`
    ${({ theme }) => theme.layout.sketchBook};
    flex-direction: column;
    height: 420px;
    > div {
        margin-top: 40px;
        color: ${({ theme }) => theme.color.primaryLight};
        font-size: ${({ theme }) => theme.typo.h3};
        font-weight: 600;
        white-space: pre-line;
    }
`;
