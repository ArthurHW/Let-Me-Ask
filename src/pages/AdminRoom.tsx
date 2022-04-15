import { useNavigate, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { ref, remove, update } from 'firebase/database';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id
    const navigate = useNavigate();

    const { questions, title } = useRoom(roomId)

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
            await remove(ref(database, `rooms/${roomId}/questions/${questionId}`))
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string,  isAnswered: boolean) {
        if (isAnswered) {
            await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
                isAnswered: false,
            })
            return;
        }

        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isAnswered: true,
            isHighlighted: false
        })
        
    }

    async function handleHighlightQuestion(questionId: string) {
        await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
            isHighlighted: true
        })
    }

    async function handleEndRoom() {
        update(ref(database, `rooms/${roomId}`), {
            endedAt: new Date()
        })

        navigate('/');
    }

    return  (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Let Me Ask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>
                            Encerrar sala
                        </Button>
                    </div>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} {questions.length === 1 ? 'pergunta' : 'perguntas'}</span> }
                </div>
                
                <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHihlighted={question.isHighlighted}
                            >
                                <button
                                    type="button"
                                    onClick={()  => handleCheckQuestionAsAnswered(question.id, question.isAnswered)}
                                >
                                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                                </button>
                                {!question.isAnswered && (
                                    <button
                                        type="button"
                                        onClick={()  => handleHighlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="Dar destaque à pergunta" />
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={()  => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}