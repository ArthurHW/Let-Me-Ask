import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

export function Home() {
  return (
    <div>
        <aside>
            <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
            <strong>Cire salas de Q&anp;A ao vivo</strong>
            <p>Tire as dúvidas da sua audiência em tempo real</p>
        </aside>
        <main>
            <div>
                <img src={logoImg} alt="Letmeask" />
                <button>
                    <img src={googleIconImg} alt="Logo do Google" />
                    Crie a sua sala com o Google
                </button>
                <div>ou entre em uma sala</div>
                <form action="">
                    <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                    />
                    <button type="submit">
                        Entrar na sala
                    </button>
                </form>
            </div>
        </main>
    </div>
  )
}

export default Home