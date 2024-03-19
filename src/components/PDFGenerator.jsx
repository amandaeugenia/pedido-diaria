import React from 'react';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { format } from 'date-fns';
import logo from "../../public/images/brasao-para.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFF",
    paddingRight: 20,
    fontSize: 10
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
    textTransform: 'uppercase'
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
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 8,
    justifyContent: 'space-around'
  },
  content: {
    flex: 7,
    fontSize: 10,
    paddingLeft: 8,
    marginLeft: 2,
    textTransform: 'uppercase',
  },
  leftLabel: {
    flex: 2,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'left', 
    borderRightWidth: 1,
    borderRightColor: "#000",
    marginRight: 20
  },
  total: {
    flexDirection: 'row',
    marginLeft: 240,
    gap: 120
  },

});

const MyDocument = ({ form, destinosSelecionados, somaDiarias, somaQntDeDiarias, periodoInicio, periodoFinal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={logo} style={styles.imageContainer} />

      <Text style={styles.title}>GOVERNO DO ESTADO DO PARÁ</Text>
      <Text style={styles.title}>AGÊNCIA DE DEFESA AGROPECUÁRIA DO PARÁ</Text>
      <View style={styles.section}>
        <Text style={styles.date}>{format(new Date(), 'dd/MM/yyyy')}</Text>
        <Text style={styles.subtitle}>Papeleta de despesa</Text>
        <Text style={styles.subtext}>
        Solicitamos a liberação de diária (a), conforme dados descritos abaixo, declarando que me responsabilizo 
        administrativamente por ter conferido que o servidor designado para a ação não possui pendências de relatórios de 
        viagem e suprimentos de fundos deste exercício junto à GECON, não se encontrando inscrito em diversos responsáveis, e 
        que no período desta ação não estará em gozo de férias ou outro tipo de licença previsível.
        Para tanto, segue o documento de identificação com foto e a declaração de diária em anexo
        </Text>
        <View style={styles.container}>
          {form && (
            <>
            <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Beneficiário:</Text>
                <Text style={styles.content}>{form.beneficiario}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Setor</Text>
                <Text style={styles.content}>{form.setor}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Cargo/Função</Text>
                <Text style={styles.content}>{form.cargo_funcao}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Matrícula</Text>
                <Text style={styles.content}>{form.matricula}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Banco</Text>
                <Text style={styles.content}>{form.banco}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Agência</Text>
                <Text style={styles.content}>{form.agencia}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Conta corrente</Text>
                <Text style={styles.content}>{form.conta_corrente}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Lotação</Text>
                <Text style={styles.content}>{form.lotacao}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Período</Text>
                <Text style={styles.content}>
                  DE: {periodoInicio ? format(periodoInicio, 'dd/MM/yyyy') : 'N/A'} <br></br>
                  ATÉ: {periodoFinal ? format(periodoFinal, 'dd/MM/yyyy') : 'N/A'}
                </Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Objetivo</Text>
                <Text style={styles.content}>{form.objetivo}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.leftLabel}>Observação</Text>
                <Text style={styles.content}>{form.observacao}</Text>
                </View>
            </>
          )}
        </View>

        <Text style={[styles.text, { textAlign: 'center' }, { paddingTop: 20 }, {fontWeight: 'bold'}]}> Destinos Selecionados: </Text>

        <View style={styles.table}>
          <View style={styles.tableColumn}>
            <Text style={styles.text}>Destino</Text>
            {destinosSelecionados.map((destino, index) => (
              <Text key={index} style={styles.text}>{destino.municipio}</Text>
            ))}
          </View>
          <View style={styles.tableColumn}>
            <Text style={styles.text}>Número de Diárias</Text>
            {destinosSelecionados.map((destino, index) => (
              <Text key={index} style={styles.text}>{destino.numeroDiarias}</Text>
            ))}
          </View>
          <View style={styles.tableColumn}>
            <Text style={styles.text}>Valor Total</Text>
            {destinosSelecionados.map((destino, index) => (
              <Text key={index} style={styles.text}>{destino.totalDiarias.toFixed(2)}</Text>
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

export default MyDocument;

