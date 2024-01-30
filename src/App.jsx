
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
 

  return (
    <>
     <div className="header">
      <header>
        <div className='logo'>
        <img src="../images/logo-adepara.png" alt="" />
        </div>        
      </header>
      </div>
      <div className="main-container">
          <div className="title">
            <h1>ASSUNTO: SOLICITAÇÃO DE DIÁRIA</h1>
          </div>
          <div className='content'>
            <p>Solicitamos a liberação de diária (a), conforme dados descritos abaixo, declarando que me responsabilizo administrativamente por ter conferido que o servidor designado para a ação não possui pendências de relatórios de viagem e suprimentos de fundos deste exercício junto à GECON, não se encontrando inscrito em diversos responsáveis, e que no período desta ação não estará em gozo de férias ou outro tipo de licença previsível.</p>
            <p>Para tanto, segue o documento de identificação com foto e a declaração de diária em anexo.</p>
          </div>
          <div className="form_section">
            <form action="">
              
              <div>
                <label htmlFor="setor">Setor Solicitante: </label>
                <input type="text" name="setor_solicitante" id="setor" />
              </div>
              <div>
                <label htmlFor="beneficiario">Beneficiário: </label>
                <input type="text" name="beneficiario" id="beneficiario" />
              </div>
              <div>
                <label htmlFor="">Cargo/Função</label>
                <input type="text" name="cargo_funcao" id="cargo_funcao" />
              </div>
              <div>
                <label htmlFor="">Matrícula</label>
                <input type="number" name="matricula" id="matricula" />
              </div>
              <div>
                <label htmlFor="">Banco</label>
                <input type="number" name="banco" id="banco" />
              </div>
              <div>
                <label htmlFor="">Agnência: </label>
                <input type="text" name="agencia" id="agencia" />
              </div>
              <div>
                <label htmlFor="">Conta Corrente: </label>
                <input type="number" name="conta_corrente" id="conta_corrente" />
              </div>
              <div>
                <label htmlFor="">Município de Lotação</label>
                <input type="text" name="beneficiario" id="beneficiario" />
              </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default App
