import { ReactNode } from 'react';
import classnames from 'classnames';
import './styles.scss'

type QuestionProps = {
    content: string;
    author: {
        name: string,
        avatar: string
    },
    children?: ReactNode,
    isAnswered: boolean;
    isHihlighted: boolean;
}

export function Question({
    content, 
    author,
    children,
    isAnswered,
    isHihlighted
}: QuestionProps) {
    return (
        <div 
            className={classnames(
                'question',
                { answered: isAnswered },
                { highlighted: isHihlighted && !isAnswered }
            )}
        >
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>
                <div className="question-actions">
                    {children}
                </div>
            </footer>
        </div>
    )
}