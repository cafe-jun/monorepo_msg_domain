import React from 'react';
import styled from 'styled-components';
import girlWithPencil from '@assets/girl-with-pencil.png';
import { useRecoilValue } from 'recoil';
import { userState, userStateType } from '@atoms/user';
import Card from '@components/Card';
import GameModeItem from '@components/GameModeItem';
import GameStartButton from '@components/GameStartButton';

function GameModeList({ emitStartGame }: { emitStartGame: () => void }) {
    const user = useRecoilValue<userStateType>(userState);

    const modes = [
        {
            title: 'CUSTOM WORD',
            description: '나만의 단어로 시작해보세요!',
            illustration: girlWithPencil,
        },
    ];

    return (
        <Card>
            <CardInner>
                {modes.map((mode, idx) => (
                    <GameModeItem mode={mode} key={mode.title} isSelected={idx === 0} />
                ))}
                {user.isHost ? (
                    <GameStartButton emitStartGame={emitStartGame} />
                ) : (
                    <TextWrapper>
                        <span>*</span> 게임 시작을 기다리고 있어요... <span>*</span>
                    </TextWrapper>
                )}
            </CardInner>
        </Card>
    );
}

export default GameModeList;

const CardInner = styled.div`
    padding: 20px 18px;
    height: 616px;
    display: flex;
    flex-direction: column;
`;

const TextWrapper = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.typo.h5};
    line-height: 26px;
    text-align: center;
    letter-spacing: -0.045em;
    color: ${({ theme }) => theme.color.white};
    margin: auto;
    margin-bottom: 16px;

    background: ${({ theme }) => theme.gradation.yellowPurple};
    -webkit-background-clip: text;
    -webkit-text-stroke: 1px transparent;

    span {
        font-family: 'Sniglet', cursive;
        font-weight: 800;
        letter-spacing: -0.05em;
    }
`;
