import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import Diarias from "./Diarias";
import "../App.css";
import logo from "../../public/images/brasao-para.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFF',
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    border: 1,
    padding: 8,
    marginBottom: 12,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: '#c0bbbb',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
  subtext: {
    fontSize: 12,
    marginBottom: 32,
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  tableCell: {
    margin: 'auto',
    padding: 5,
  },
});

const MyDocument = ({ form, destinosSelecionados, somaDiarias }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.imageContainer} />
      <Text style={styles.title}>GOVERNO DO ESTADO DO PARÁ</Text>
      <Text style={styles.title}>AGÊNCIA DE DEFESA AGROPECUÁRIA DO PARÁ</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Papeleta de despesa</Text>
        <Text style={styles.subtext}>
          Senhor Diretor, solicitamos as necessárias providências de V. Sa.,
          para realização de despesas, conforme discriminação abaixo
        </Text>
        <Text style={styles.text}>Setor: {form.setor}</Text>
        <Text style={styles.text}>Beneficiário: {form.beneficiario}</Text>
        <Text style={styles.text}>Cargo/Função: {form.cargo_funcao}</Text>
        <Text style={styles.text}>Destinos Selecionados:</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Município</Text>
            <Text style={styles.tableCell}>Número de Diárias</Text>
            <Text style={styles.tableCell}>Valor Total</Text>
          </View>
          {destinosSelecionados.map((destino, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{destino.municipio}</Text>
              <Text style={styles.tableCell}>{destino.numeroDiarias}</Text>
              <Text style={styles.tableCell}>{destino.totalDiarias}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.text}>Total: {somaDiarias}</Text>
      </View>
    </Page>
  </Document>
);

export const Formulario = () => {
  const { register, handleSubmit } = useForm();
  const [form, setForm] = React.useState(null);

  // Componentes Diarias.jsx
  const [tipoCargo, setTipoCargo] = useState('1');
  const [tipoViagem, setTipoViagem] = useState('1');
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [numeroDiarias, setNumeroDiarias] = useState('');
  const [totalDiarias, setTotalDiarias] = useState(0);
  const [destinosSelecionados, setDestinosSelecionados] = useState([]);
  const [somaDiarias, setSomaDiarias] = useState(0);
  console.log(totalDiarias)

  const onSubmit = (data) => setForm(data);

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
                  <div className="form_table">
                    <div>
                      <label htmlFor="setor">Setor Solicitante: </label>
                      <div>
                        <input
                          type="text"
                          name="setor_solicitante"
                          id="setor"
                          {...register("setor")}
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
                          {...register("beneficiario")}
                        />
                      </div>
                    </div>
                   
                    <div>
                      <label htmlFor="cargo-funcao">Cargo/Função</label>
                      <div>
                        <input
                          type="text"
                          name="cargo_funcao"
                          id="cargo_funcao"
                          {...register("cargo_funcao")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form_table">
                    <div>
                      <label htmlFor="">Matrícula</label>
                      <div>
                        <input
                          type="number"
                          name="matricula"
                          id="matricula"
                          {...register("matricula")}
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
                          {...register("banco")}
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
                          {...register("agencia")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form_table">
                    <div>
                      <label htmlFor="">Conta Corrente: </label>
                      <div>
                        <input
                          type="text"
                          name="conta_corrente"
                          id="conta_corrente"
                          {...register("conta_corrente")}
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
                          {...register("municipio_lotacao")}
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
                          {...register("periodo")}
                        />
                      </div>
                    </div>

                  </div>
                  <div className="form_table">
                  <div>
                      <label htmlFor="">Motivação:</label>
                      <div>
                        <textarea
                          type="text"
                          name="motivacao"
                          id="motivacao:"
                          {...register("motivacao:")}
                          cols="40" rows="10"
                        />
                      </div>
                    </div>
                    <div>
                    <label htmlFor="">Observação:</label>
                    <div>
                      <textarea
                        name="observacao"
                        id="observacao"
                        {...register("observacao")}
                        cols="40" rows="10"
                      />
                    </div>
                  </div>
                  </div>
                  
                </div>
                <div className="second_section">
                  <Diarias
                    setSomaDiarias={setSomaDiarias}
                    tipoCargo={tipoCargo}
                    setTipoCargo={setTipoCargo}
                    tipoViagem={tipoViagem}
                    setTipoViagem={setTipoViagem}
                    municipioSelecionado={municipioSelecionado}
                    setMunicipioSelecionado={setMunicipioSelecionado}
                    numeroDiarias={numeroDiarias}
                    setNumeroDiarias={setNumeroDiarias}
                    totalDiarias={totalDiarias}
                    setTotalDiarias={setTotalDiarias}
                    destinosSelecionados={destinosSelecionados}
                    setDestinosSelecionados={setDestinosSelecionados}
                  />
                  <div className="generatePDF">
                    {form && (
                      <PDFDownloadLink
                        document={<MyDocument
                          form={form}
                          somaDiarias={somaDiarias}
                          tipoCargo={tipoCargo}
                          tipoViagem={tipoViagem}
                          municipioSelecionado={municipioSelecionado}
                          numeroDiarias={numeroDiarias}
                          destinosSelecionados={destinosSelecionados}
                        />}
                        fileName="form.pdf"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Carregando documento..." : "Baixar PDF"
                        }
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
