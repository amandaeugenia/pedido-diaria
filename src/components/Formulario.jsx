import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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

const getFormattedDate = () => {
  const currentDate = new Date();
  return format(currentDate, "dd/MM/yyyy HH:mm:ss");
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFF",
    paddingRight: 20,
  },
  section: {
    margin: 20,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 10,
    textTransform: "uppercase",
    textAlign: "center",
    border: 1,
    padding: 8,
    marginBottom: 12,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#e2dede",
    border: "none",
    gap: 8,
  },
  date: {
    textAlign: "right",
    fontSize: 12,
    marginBottom: 8,
  },
  text: {
    textTransform: "uppercase",
    fontSize: 10,
    marginTop: 4,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 10,
    marginBottom: 20,
  },
  imageContainer: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: "auto",
  },
  container: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",

    marginLeft: 14,
    padding: 10,
  },
  table: {
    display: "table",
    flexDirection: "row",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    justifyContent: "space-around",
    margin: 10,
    gap: 10,
    padding: 4,
  },
  tableHeader: {
    fontWeight: 'bold',
    
  },
  tableColumn: {
    flexDirection: "column",
    borderRightColor: "#bfbfbf",
    borderRightWidth: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
    flex: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 10,
  },
});

const MyDocument = ({ form, destinosSelecionados, somaDiarias }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.imageContainer} />

      <Text style={styles.title}>GOVERNO DO ESTADO DO PARÁ</Text>
      <Text style={styles.title}>AGÊNCIA DE DEFESA AGROPECUÁRIA DO PARÁ</Text>
      <View style={styles.section}>
        <Text style={styles.date}>{getFormattedDate()}</Text>
        <Text style={styles.subtitle}>Papeleta de despesa</Text>
        <Text style={styles.subtext}>
          Senhor Diretor, solicitamos as necessárias providências de V. Sa.,
          para realização de despesas, conforme discriminação abaixo
        </Text>
        <View style={styles.container}>
          <Text style={[styles.text,]}>
            Setor: {form.setor}
          </Text>
          <Text style={[styles.text,]}>
            Beneficiário: {form.beneficiario}
          </Text>
          <Text style={[styles.text,]}>
            Cargo/Função: {form.cargo_funcao}
          </Text>
          <Text style={[styles.text, ]}>
            Matrícula: {form.matricula}
          </Text>
          <Text style={[styles.text, ]}>
            Banco: {form.banco}
          </Text>
          <Text style={[styles.text, ]}>
            Agência: {form.agencia}
          </Text>
          <Text style={[styles.text,]}>
            Conta corrente: {form.conta_corrente}
          </Text>
          <Text style={[styles.text, ]}>
            Lotação: {form.lotacao}
          </Text>
          <Text style={[styles.text, ]}>
            Período: Início: {form.periodo_inicio} Término: {form.periodo_final}
          </Text>
          <Text style={[styles.text, ]}>
            Motivação: {form.motivacao}
          </Text>
          <Text style={[styles.text,]}>
            Observação: {form.observacao}
          </Text>
          <Text style={[styles.text,]}>
            Objetivo: {form.objetivo}
          </Text>
        </View>
        <Text
            style={[styles.text, { textAlign: 'center' }, { paddingTop: 20 }]}
          >
            Destinos Selecionados:
          </Text>
        <View style={[styles.table, ] }>
  <View style={[styles.tableColumn,] }>
    <Text style={[styles.text, ]}>Município</Text>
    {destinosSelecionados.map((destino, index) => (
      <View key={index} style={[styles.tableRow,]}>
        <Text style={styles.text}>{destino.municipio}</Text>
      </View>
    ))}
  </View>

  <View style={styles.tableColumn}>
    <Text style={[styles.text,]}>Número de Diárias</Text>
    {destinosSelecionados.map((destino, index) => (
      <View key={index} style={[styles.tableRow,]}>
        <Text style={styles.text}>{destino.numeroDiarias}</Text>
      </View>
    ))}
  </View>

  <View style={[styles.tableColumn, { borderRightColor: 'white' }]}>
    <Text style={[styles.text, ]}>Valor Total</Text>
    {destinosSelecionados.map((destino, index) => (
      <View key={index} style={[styles.tableRow,]}>
        <Text style={styles.text}>{destino.totalDiarias}</Text>
      </View>
    ))}
  </View>
</View>
        <Text style={[styles.text, { fontWeight: "bold" }]}>
          Total: {somaDiarias}
        </Text>
      </View>
    </Page>
  </Document>
);

export const Formulario = () => {
  const { register, handleSubmit } = useForm();
  const [form, setForm] = React.useState(null);

  // Componentes Diarias.jsx
  const [tipoCargo, setTipoCargo] = useState("1");
  const [tipoViagem, setTipoViagem] = useState("1");
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [numeroDiarias, setNumeroDiarias] = useState("");
  const [totalDiarias, setTotalDiarias] = useState(0);
  const [destinosSelecionados, setDestinosSelecionados] = useState([]);
  const [somaDiarias, setSomaDiarias] = useState(0);
  console.log(totalDiarias);

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
                      <label htmlFor="">Lotação</label>
                      <div>
                        <input
                          type="text"
                          name="lotacao"
                          id="lotacao"
                          {...register("lotacao")}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Período:</label>
                      <div>
                        <input
                          type="date"
                          date
                          name="periodo_inicio"
                          id="periodo_inicio"
                          {...register("periodo_inicio")}           
                        />
                        <div>
                          <input
                            type="date"
                            name="periodo_final"
                            id="periodo_final"
                            {...register("periodo_final")}
                          />
                        </div>
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
                          {...register("motivacao")}
                          cols="40"
                          rows="10"
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
                          cols="40"
                          rows="10"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Objetivo:</label>
                    <div>
                      <textarea
                        type="text"
                        name="objetivo"
                        id="objetivo:"
                        {...register("objetivo")}
                        cols="90"
                        rows="10"
                      />
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
                        document={
                          <MyDocument
                            form={form}
                            somaDiarias={somaDiarias}
                            tipoCargo={tipoCargo}
                            tipoViagem={tipoViagem}
                            municipioSelecionado={municipioSelecionado}
                            numeroDiarias={numeroDiarias}
                            destinosSelecionados={destinosSelecionados}
                          />
                        }
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
