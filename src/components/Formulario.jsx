import React from 'react'
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'
import '../App.css'
import Diarias from './Diarias'


export const Formulario = () => {

    const form = useForm();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log('Form submitted', data)
    }

   
  

  return (
    <div>
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
          <div className="description">
            <p>Solicitamos a liberação de diária (a), conforme dados descritos abaixo, declarando que me responsabilizo administrativamente por ter conferido que o servidor designado para a ação não possui pendências de relatórios de viagem e suprimentos de fundos deste exercício junto à GECON, não se encontrando inscrito em diversos responsáveis, e que no período desta ação não estará em gozo de férias ou outro tipo de licença previsível.</p>
            <p>Para tanto, segue o documento de identificação com foto e a declaração de diária em anexo.</p>
          </div>
        </div>
        <div className="form_section">
          <div className="formulario">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
              <div className="dados_form">
                  <div>
                    <label htmlFor="setor">Setor Solicitante: </label>
                    <div>
                      <input type="text" name="setor_solicitante" id="setor" {...register("setor",
                      {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="beneficiario">Beneficiário: </label>
                    <div>
                      <input type="text" name="beneficiario" id="beneficiario" {...register("beneficiario", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.beneficiario?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Cargo/Função</label>
                    <div>
                      <input type="text" name="cargo_funcao" id="cargo_funcao" {...register("cargo_funcao", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Matrícula</label>
                    <div>
                      <input type="number" name="matricula" id="matricula" {...register("matricula", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Banco</label>
                    <div>
                      <input type="text" name="banco" id="banco" {...register("banco", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Agência: </label>
                    <div>
                      <input type="text" name="agencia" id="agencia" {...register("agencia", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Conta Corrente: </label>
                    <div>
                      <input type="text" name="conta_corrente" id="conta_corrente" {...register("conta_corrente", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Município de Lotação</label>
                    <div>
                      <input type="text" name="municipio_lotacao" id="municipio_lotacao" {...register("municipio_lotacao", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.setor?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Motivação:</label>
                    <div>
                      <input type="text" name="motivacao" id="motivacao:" {...register("motivacao:", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.motivacao?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Período:</label>
                    <div>
                      <input type="text" name="periodo" id="periodo" {...register("periodo", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.periodo?.message}</p>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Observação:</label>
                    <div>
                      <input type="text" name="observacao" id="observacao" {...register("observacao", {required: 'Campo inválido'})}/>
                      <p className='error'>{errors.observacao?.message}</p>
                    </div>
                  </div>
              </div>
          <Diarias />
          
            </form>
            
          </div>
          
        </div>
      </div>
      </div>
  )
}
 