import React from "react";
import { useForm } from "react-hook-form";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Diarias from "./Diarias";
import "../App.css";


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFF'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5
  }
});

const MyDocument = ({form}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>GOVERNO DO ESTADO DO PARÁ</Text>
      <Text style={styles.title}>ADEPARA</Text>
      <View style={styles.section}>
        <Text>Setor: {form.setor}</Text>
        <Text>Beneficiário: {form.beneficiario}</Text>
        <Text>Cargo/Função: {form.cago_funcao}</Text>
      </View>

    </Page>
  </Document>
);

export const Formulario = () => {
  const { register, handleSubmit } = useForm();
  
  const [form, setForm] = React.useState(null);

  const onSubmit = data => setForm(data);

  return (
    <div>
      <div className="header">
        <header>
          <div className="logo">
            <img src="../images/logo-adepara.png" alt="" />
          </div>
        </header>
      </div>
      <div className="main-container">
        <div className="title">
          <h1>ASSUNTO: SOLICITAÇÃO DE DIÁRIA</h1>
        </div>
        <div className="content">
          <div className="description">
            <p>
              Solicitamos a liberação de diária, conforme dados descritos
              abaixo, declarando que me responsabilizo administrativamente por
              ter conferido que o servidor designado para a ação não possui
              pendências de relatórios de viagem e suprimentos de fundos deste
              exercício junto à GECON, não se encontrando inscrito em diversos
              responsáveis, e que no período desta ação não estará em gozo de
              férias ou outro tipo de licença previsível.
            </p>
            <p>
              Para tanto, segue o documento de identificação com foto e a
              declaração de diária em anexo.
            </p>
          </div>
        </div>

        <div className="formulario">
          
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div id="content-id">
                <div className="dados_form">
                  <div className="first_section">
                    <div>
                      <label htmlFor="setor">Setor Solicitante: </label>
                      <div>
                        <input
                          type="text"
                          name="setor_solicitante"
                          id="setor"
                          {...register("setor", )}
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="beneficiario">Beneficiário: </label>
                      <div>
                        <input
                          type="text"
                          name="beneficiario"
                          id="beneficiario"
                          {...register("beneficiario", )}
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Cargo/Função</label>
                      <div>
                        <input
                          type="text"
                          name="cargo_funcao"
                          id="cargo_funcao"
                          {...register("cargo_funcao", )}
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Matrícula</label>
                      <div>
                        <input
                          type="number"
                          name="matricula"
                          id="matricula"
                          {...register("matricula", )}
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Banco</label>
                      <div>
                        <input
                          type="text"
                          name="banco"
                          id="banco"
                          {...register("banco", )}
                        />
                       
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Agência: </label>
                      <div>
                        <input
                          type="text"
                          name="agencia"
                          id="agencia"
                          {...register("agencia", )}
                        />
                       
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Conta Corrente: </label>
                      <div>
                        <input
                          type="text"
                          name="conta_corrente"
                          id="conta_corrente"
                          {...register("conta_corrente", )}
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Município de Lotação</label>
                      <div>
                        <input
                          type="text"
                          name="municipio_lotacao"
                          id="municipio_lotacao"
                          {...register("municipio_lotacao",) }
                        />
                        
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Motivação:</label>
                      <div>
                        <input
                          type="text"
                          name="motivacao"
                          id="motivacao:"
                          {...register("motivacao:", )}
                        />
                       
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Período:</label>
                      <div>
                        <input
                          type="text"
                          name="periodo"
                          id="periodo"
                          {...register("periodo", )}
                        />
                       
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Observação:</label>
                      <div>
                        <input
                          type="text"
                          name="observacao"
                          id="observacao"
                          {...register("observacao", )}
                        />
                        
                      </div>
                    </div>
                  </div>
                  <div className="second_section">
                    <Diarias />
                    <div className="generatePDF">
                     <input type="submit" />
                    {form && (
                      <PDFDownloadLink document={<MyDocument form={form} />} fileName="form.pdf">
                      {({ blob, url, loading, error }) => (loading ? 'Carregando documento...' : 'Baixar PDF')}
                    </PDFDownloadLink>
                    )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

  );
};
