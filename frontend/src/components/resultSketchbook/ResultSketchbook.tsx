import { useEffect } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { Center } from '@styles/styled';
import { useRecoilValue } from 'recoil';
import { canOneMoreGameState, gameResultIdState, isStartedState } from '@atoms/result';
import { lobbyIdState } from '@atoms/game';
import { ReactComponent as ShareIcon } from '@assets/icons/share-icon.svg';
import resultInSound from '@assets/sounds/result-in.wav';
import { networkServiceInstance as NetworkService } from '@services/socketService';
import useMovePage from '@hooks/useMovePage';
import useCheckGuidePage from '@hooks/useCheckGuidePage';
import useCopyClipBoard from '@hooks/useCopyClipboard';
import useSoundEffect from '@hooks/useSoundEffect';
import SketchbookCard from '@components/SketchbookCard';
import ResultGuide from '@components/resultSketchbook/ResultGuide';
import QuizResultContent from '@components/resultSketchbook/QuizResultContent';
import QuizAuthor from '@components/resultSketchbook/QuizAuthor';
import CurSketchbookPage from '@components/resultSketchbook/CurSketchbookPage';
import SketchbookAuthor from '@components/resultSketchbook/SketchbookAuthor';
import OneMoreGameButton from '@components/resultSketchbook/OneMoreGameButton';
import useResultSketchbook from '@hooks/useResultSketchbook';
import useResultSocket from '@hooks/socket/useResultSocket';

function ResultSketchbook({ isForShareResult }: { isForShareResult: boolean }) {
    const [setPage] = useMovePage();
    const lobbyId = useRecoilValue(lobbyIdState);
    const gameResultId = useRecoilValue(gameResultIdState);

    const isStarted = useRecoilValue(isStartedState);
    const canOneMoreGame = useRecoilValue(canOneMoreGameState);

    const { checkIsNotGuidePage } = useCheckGuidePage();
    const [_, onCopy] = useCopyClipBoard();
    const { playSoundEffect } = useSoundEffect();
    const { emitWatchResultSketchBook, emitOneMoreGame } = useResultSocket(isForShareResult);
    useResultSketchbook(isForShareResult);

    useEffect(() => {
        if (!isForShareResult) playSoundEffect(resultInSound);

        NetworkService.on('back-to-lobby', () => {
            setPage(`/lobby?id=${lobbyId}&new=false`);
        });

        return () => {
            NetworkService.off('back-to-lobby');
        };
    }, []);

    const copyGameResultIdOnClipboard = () => {
        const gameResultShareUrl = `${window.location.origin}/share-result/${gameResultId}`;
        void onCopy(gameResultShareUrl);
        toast('🖇 클립보드에 복사되었습니다.');
    };

    return (
        <>
            <SketchbookCard
                center={
                    <>
                        <QuizResultContent />
                        {!isForShareResult && <ResultGuide />}
                    </>
                }
                right={
                    checkIsNotGuidePage() && (
                        <>
                            <QuizAuthor />
                            <CurSketchbookPage isForShareResult={isForShareResult} />
                        </>
                    )
                }
            />
            <OutsideOfCard>
                {!isStarted && (
                    <>
                        <SketchbookAuthor
                            isForShareResult={isForShareResult}
                            emitWatchResultSketchBook={emitWatchResultSketchBook}
                        />
                        <ButtonWrapper>
                            {(isForShareResult || canOneMoreGame) && (
                                <button
                                    onClick={copyGameResultIdOnClipboard}
                                    aria-label={'게임 결과 페이지 링크 복사'}
                                >
                                    <ShareIcon />
                                </button>
                            )}
                            <OneMoreGameButton
                                isForShareResult={isForShareResult}
                                emitOneMoreGame={emitOneMoreGame}
                            />
                        </ButtonWrapper>
                    </>
                )}
            </OutsideOfCard>
        </>
    );
}

export default ResultSketchbook;

const OutsideOfCard = styled(Center)`
    width: 100%;
    height: 65px;
    position: relative;
    margin-top: 26px;
    color: ${({ theme }) => theme.color.whiteT2};
    font-size: ${({ theme }) => theme.typo.h2};

    svg {
        margin: 0 28px;
        transform: scale(1.3) translateY(5px);
        cursor: pointer;
    }

    > span {
        font-weight: 600;
    }
`;

const ButtonWrapper = styled(Center)`
    display: flex;
    position: absolute;
    right: 0;
`;
