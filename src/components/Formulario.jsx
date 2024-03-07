import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { PDFDownloadLink, Page, Text, View, Document, Image, StyleSheet } from "@react-pdf/renderer";
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
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    textTransform: "uppercase",
    textAlign: "center",
    border: 1,
    padding: 8,
    marginBottom: 12,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "#e2dede",
    gap: 8,
  },
  date: {
    textAlign: "right",
    fontSize: 10,
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
    width: 40,
    height: 50,
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 10,
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
  total: {
    flexDirection: 'row',
    marginLeft: 240,
    gap: 120
  }
});

const MyDocument = ({ form, destinosSelecionados, somaDiarias, somaQntDeDiarias, periodoInicio, periodoFinal }) => (
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
          {form && (
            <>
              <Text style={[styles.text,]}>
                Setor: {form.setor}
              </Text>
              <Text style={[styles.text,]}>
                Beneficiário: {form.beneficiario}
              </Text>
              <Text style={[styles.text,]}>
                Cargo/Função: {form.cargo_funcao}
              </Text>
              <Text style={[styles.text,]}>
                Matrícula: {form.matricula}
              </Text>
              <Text style={[styles.text,]}>
                Banco: {form.banco}
              </Text>
              <Text style={[styles.text,]}>
                Agência: {form.agencia}
              </Text>
              <Text style={[styles.text,]}>
                Conta corrente: {form.conta_corrente}
              </Text>
              <Text style={[styles.text,]}>
                Lotação: {form.lotacao}
              </Text>
              <Text style={[styles.text]}>
                Período: Início: {periodoInicio ? format(periodoInicio, 'dd/MM/yyyy') : 'N/A'} Término: {periodoFinal ? format(periodoFinal, 'dd/MM/yyyy') : 'N/A'}
              </Text>
              <Text style={[styles.text,]}>
                Motivação: {form.motivacao}
              </Text>
              <Text style={[styles.text,]}>
                Observação: {form.observacao}
              </Text>
              <Text style={[styles.text,]}>
                Objetivo: {form.objetivo}
              </Text>
            </>
          )}

        </View>

        <Text style={[styles.text, { textAlign: 'center' }, { paddingTop: 20 }, {fontWeight: 'bold'}]}> Destinos Selecionados: </Text>

        <View style={[styles.table]}>

          <View style={[styles.tableColumn,]}>
            <Text style={[styles.text,]}>Destino</Text>
            {destinosSelecionados.map((destino, index) => (
              <View key={index} style={[styles.tableRow,]}>
                <Text style={styles.text}>{destino.municipio}</Text>
              </View>
            ))}
            <Text style={[styles.text, { fontWeight: "bold" }]}> </Text>
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
            <Text style={[styles.text,]}>Valor Total</Text>
            {destinosSelecionados.map((destino, index) => (
              <View key={index} style={[styles.tableRow,]}>
                <Text style={styles.text}>{destino.totalDiarias.toFixed(2)}</Text>
              </View>
            ))}
            
          </View>
          
        </View>
        <View style={styles.total}>
          
          <Text style={[styles.text, { fontWeight: "bold" }]}> Total: {somaQntDeDiarias} </Text>
          <Text style={[styles.text, { fontWeight: "bold" }]}> Total: {somaDiarias.toFixed(2)} </Text>
          </View>
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
  const [somaQntDeDiarias, setSomaQntDeDiarias] = useState(0)

  const [saldo, setSaldo] = React.useState(0);
  const [saldoMetade, setSaldoMetade] = React.useState(0);
  const [periodoInicio, setPeriodoInicio] = useState(null);
  const [periodoFinal, setPeriodoFinal] = useState(null);


  const handleDateChange = (field, event) => {
    const value = new Date(event.target.value);
    if (field === 'periodo_inicio') {
      setPeriodoInicio(value);
    } else if (field === 'periodo_final') {
      setPeriodoFinal(value);
    }
  };

  useEffect(() => {
    if (periodoInicio && periodoFinal) {
      if (periodoFinal.getTime() < periodoInicio.getTime()) {
        alert("A data de término não pode ser anterior à data de início.");
        return;
      }

      const diferencaTempo = Math.abs(periodoFinal - periodoInicio);
      const quantidadeDias = Math.ceil(diferencaTempo / (1000 * 60 * 60 * 24));

      const calcPeriodo = quantidadeDias + 1;
      const calcMetade = calcPeriodo / 2;

      setSaldo(calcPeriodo);
      setSaldoMetade(calcMetade);
    }
  }, [periodoInicio, periodoFinal]);



  const onSubmit = (data) => {
    setForm(data);

  };


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
          <h1>SOLICITAÇÃO DE DIÁRIA</h1>
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
                          name="periodo_inicio"
                          id="periodo_inicio"
                          onChange={(e) => handleDateChange('periodo_inicio', e)}
                        />
                        <div>
                          <input
                            type="date"
                            name="periodo_final"
                            id="periodo_final"
                            onChange={(e) => handleDateChange('periodo_final', e)}
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
                    setSomaQntDeDiarias={setSomaQntDeDiarias}
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
                    {!(periodoInicio && periodoFinal) ? (
                      <div className='errorMessage'>
                        <p>Selecione o período.</p>
                      </div>
                    ) : !(destinosSelecionados.length > 0) ? (
                      <p>Selecione algum destino.</p>
                    ) : !(somaQntDeDiarias <= saldo && somaQntDeDiarias >= saldoMetade) ? (
                      <div className='errorMessage'>
                        <p>Erro: Verifique se a quantidade de diárias não excedeu ao período.</p>
                      </div>
                    ) : (
                      <PDFDownloadLink
                        document={<MyDocument
                          form={form}
                          somaDiarias={somaDiarias}
                          somaQntDeDiarias={somaQntDeDiarias}
                          tipoCargo={tipoCargo}
                          tipoViagem={tipoViagem}
                          municipioSelecionado={municipioSelecionado}
                          numeroDiarias={numeroDiarias}
                          destinosSelecionados={destinosSelecionados}
                          periodoInicio={periodoInicio}
                          periodoFinal={periodoFinal}
                        />}
                        fileName="form.pdf"
                        className="pdfButton"
                      >
                        {({ blob, url, loading, error }) =>
                          loading ? "Carregando documento..." : "Gerar PDF"
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