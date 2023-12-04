import { QuizReply, QuizReplyType } from "./quizReply.model";
import { PartialWithoutMethods } from "@utils/types";

// TODO: user 정보에서 socketId 정보는 제외하자.
export interface QuizReplyRequest {
  type: QuizReplyType;
  content: string;
}

export interface StartRoundEmitRequest {
  roundType: QuizReplyType;
  quizReply: PartialWithoutMethods<QuizReply>;
  curRound: number;
  maxRound: number;
  limitTime: number;

  // constructor(
  //     roundType: QuizReplyType,
  //     quizReply: PartialWithoutMethods<QuizReply>,
  //     curRound: number,
  //     maxRound: number,
  //     limitTime: number,
  // ) {
  //     this.roundType = roundType;
  //     this.quizReply = quizReply;
  //     this.curRound = curRound;
  //     this.maxRound = maxRound;
  //     this.limitTime = limitTime;
  // }
}

export class SubmitQuizReplyRequest {
  quizReply: QuizReplyRequest;

  constructor(quizReply: QuizReplyRequest) {
    this.quizReply = quizReply;
  }
}

export class SubmitQuizReplyEmitRequest {
  submittedQuizReplyCount: number;

  constructor(submittedQuizReplyCount: number) {
    this.submittedQuizReplyCount = submittedQuizReplyCount;
  }
}

export class CompleteGameEmitRequest {
  gameResultId: string;
  quizReplyLists: Array<Array<PartialWithoutMethods<QuizReply>>>;

  constructor(
    gameResultId: string,
    quizReplyLists: Array<Array<PartialWithoutMethods<QuizReply>>>
  ) {
    this.gameResultId = gameResultId;
    this.quizReplyLists = quizReplyLists;
  }
}

export class WatchResultSketchbookRequest {
  bookIdx: number;

  constructor(bookIdx: number) {
    this.bookIdx = bookIdx;
  }
}

export class WatchResultSketchbookEmitRequest {
  bookIdx: number;
  isWatched: boolean;

  constructor(bookIdx: number, isWatched: boolean) {
    this.bookIdx = bookIdx;
    this.isWatched = isWatched;
  }
}
