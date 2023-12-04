import { PartialWithoutMethods } from '@utils/types';
import { User } from './user.model';

export type QuizReplyType = 'ANSWER' | 'DRAW';

export class QuizReply {
    author: User | undefined; // undefined 일 시 Random 생성된 제시어
    content: string | undefined;
    type: QuizReplyType;

    constructor(type: QuizReplyType, content: string | undefined, author?: User) {
        this.type = type;
        this.content = content;
        this.author = author;
    }

    getType(): QuizReplyType {
        return this.type;
    }

    isEmptyAnswerTypeQuizReply(): boolean {
        return this.type === 'ANSWER' && this.content === undefined;
    }

    static createByJson(json: PartialWithoutMethods<QuizReply>): QuizReply {
        return new QuizReply(json.type, json.content, json.author);
    }

    static createEmptyQuizReply(type: QuizReplyType, author: User): QuizReply {
        return new QuizReply(type, undefined, author);
    }
}
