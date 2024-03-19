import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useForm } from "react-hook-form";
import { FaTrashAlt } from 'react-icons/fa';
import { format } from "date-fns";
import { PDFDownloadLink, Page, Text, View, Document, Image, StyleSheet } from "@react-pdf/renderer";
//import Diarias from "./Diarias";
import "../App.css";
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

const MyDocument = ({ form, destinosSelecionados, somaDiarias, somaQntDeDiarias, periodoInicio, periodoFinal, tipoCargo }) => (
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
                <Text style={styles.content}>{tipoCargo}</Text>
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


export const Formulario = () => {
  const { register, handleSubmit } = useForm();
  const [form, setForm] = useState(null);
  const [tipoCargo, setTipoCargo] = useState('DIRETOR(A) GERAL');
  console.log(tipoCargo)
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [showMunicipiosSelect, setShowMunicipiosSelect] = useState(false);
  const [destinosSelecionados, setDestinosSelecionados] = useState([]);
  const [somaDiarias, setSomaDiarias] = useState(0);
  const [somaQntDeDiarias, setSomaQntDeDiarias] = useState(0);
  const [periodoInicio, setPeriodoInicio] = useState(null);
  const [periodoFinal, setPeriodoFinal] = useState(null);
  const [saldo, setSaldo] = useState(0);
  const [saldoMetade, setSaldoMetade] = useState(0);
  const [numeroDiarias, setNumeroDiarias] = useState('');

  // Fetch data
  useEffect(() => {
    const getContent = async () => {
      try {
        const response = await fetch('http://192.168.100.54:3006/papeleta');
        const data = await response.json();

        const municipiosPA = data
          .filter(municipio => municipio.estado === "PA")
          .map(municipio => ({
            value: municipio.nome,
            label: municipio.nome,
            servidor: parseFloat(municipio.servidor),
            diretor: parseFloat(municipio.diretor)
          }));

        setMunicipios(municipiosPA);
     

        const uniqueEstados = data.reduce((acc, municipio) => {
          if (!acc[municipio.estado]) {
            acc[municipio.estado] = {
              value: municipio.estado,
              label: municipio.estado,
              servidor: parseFloat(municipio.servidor),
              diretor: parseFloat(municipio.diretor)
            };
          }
          return acc;
        }, {});

        setEstados(Object.values(uniqueEstados));
      } catch (error) {
        console.log('Erro');
      }
    };
    getContent();
  }, []);

  // Handle Estado
  useEffect(() => {
    if (estadoSelecionado && estadoSelecionado.value === 'PA') {
      setShowMunicipiosSelect(true);
    } else {
      setShowMunicipiosSelect(false);
      setMunicipioSelecionado(null);
    }
  }, [estadoSelecionado]);

  // Handle Data
  const handleDateChange = (field, event) => {
    const value = new Date(event.target.value);
    if (field === 'periodo_inicio') {
      setPeriodoInicio(value);
    } else if (field === 'periodo_final') {
      setPeriodoFinal(value);
    }
  };

  const handleTipoCargoChange = (event) => {
    setTipoCargo(event.target.value);
  };

  const handleEstadoChange = (selectedOption) => {
    setEstadoSelecionado(selectedOption);
  };

  const handleMunicipioChange = (selectedOption) => {
    setMunicipioSelecionado(selectedOption);
  };

  const handleNumeroDiariasChange = (event) => {
    setNumeroDiarias(event.target.value);
  };


  useEffect(() => {
    const totalDiarias = destinosSelecionados.reduce((total, destino) => total + destino.totalDiarias, 0);
    setSomaDiarias(totalDiarias);
  
    const totalQntDiarias = destinosSelecionados.reduce((total, destino) => total + parseFloat(destino.numeroDiarias), 0);
    setSomaQntDeDiarias(totalQntDiarias);
  }, [destinosSelecionados]);

  // Calcular Saldo
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

  // Handle Submit
  const onSubmit = (data) => {
    setForm(data);
  };

  // Calcular diárias
  useEffect(() => {
    const total = destinosSelecionados.reduce((total, destino) => total + destino.totalDiarias, 0);
    setSomaDiarias(total);

    const totalQnt = destinosSelecionados.reduce((total, destino) => total + parseFloat(destino.numeroDiarias), 0);
    setSomaQntDeDiarias(totalQnt);
  }, [destinosSelecionados]);

  // Adicionar novo destino
  const adicionarDestino = () => {
    if (estadoSelecionado) {
      let valorDiaria = 0;

      if (municipioSelecionado) {
        valorDiaria = tipoCargo === 'DIRETORIA GERAL' ? municipioSelecionado.diretor : municipioSelecionado.servidor;
      } else {
        const estado = estados.find(estado => estado.value === estadoSelecionado.value);
        if (estado) {
          valorDiaria = tipoCargo === 'DIRETORIA GERAL' ? estado.diretor : estado.servidor;
        }
      }

      const totalDiarias = parseFloat(numeroDiarias) * valorDiaria;

      const novoDestino = {
        municipio: municipioSelecionado ? municipioSelecionado.value : estadoSelecionado.value,
        numeroDiarias: numeroDiarias,
        totalDiarias: totalDiarias,
      };

      setDestinosSelecionados([...destinosSelecionados, novoDestino]);
    }
  };

  // Remover destino
  const removerDestino = (index) => {
    const novosDestinos = [...destinosSelecionados];
    novosDestinos.splice(index, 1);
    setDestinosSelecionados(novosDestinos);
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
          <h2>SOLICITAÇÃO DE DIÁRIA</h2>
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
                      <label htmlFor="tipoCargo">Cargo Beneficiário:</label>
                      <div>
                        <select id="tipoCargo" name="tipoCargo" value={tipoCargo} onChange={handleTipoCargoChange}>
                          <option value ='DIRETORIA GERAL'>DIRETOR(A) GERAL</option>
                          <option value ='DIRETOR(A) ADMINSTRATIVO E FINANCEIRO'>DIRETOR(A) ADMINSTRATIVO E FINANCEIRO</option>
                          <option value ='DIRETOR(A) DE DEFESA E INSPEÇÃO ANIMAL'>DIRETOR(A) DE DEFESA E INSPEÇÃO ANIMAL</option>
                          <option value ='DIRETOR(A) DE DEFESA E INSPEÇÃO VEGETAL'>DIRETOR(A) DE DEFESA E INSPEÇÃO VEGETAL</option>
                          <option value ='Coordenador(a)'>Coordenador(a)</option>
                          <option value ='Gerente'>Gerente</option>
                          <option value ='FEA - Médico Veterinário'>FEA - Médico Veterinário</option>
                          <option value ='FEA - Eng. Agrônomo'>FEA - Eng. Agrônomo</option>
                          <option value ='FEA - Eng. Florestal'>FEA - Eng. Florestal</option>
                          <option value ='AFA'>AFA</option>
                          <option value ='ADA'>ADA</option>
                          <option value ='A. de Campo'>A. de Campo</option>
                          <option value ='A. de Barreira'>A. de Barreira</option>
                          <option value ='Administrador(a)'>Administrador(a)</option>
                          <option value ='Contador(a)'>Contador(a)</option>
                          <option value ='Estatístico(a)'>Estatístico(a)</option>
                          <option value ='Pedagogo(a)'>Pedagogo(a)</option>
                          <option value ='Psicólogo(a)'> Psicólogo(a)</option>
                          <option value ='Assistente social'>Assistente social</option>
                          <option value ='Engenheiro(a) Químico(a)'>Engenheiro(a) Químico(a)</option>
                          <option value ='Arquiteto(a)'>Arquiteto(a)</option>
                          <option value ='Engenheiro(a) Civil'>Engenheiro(a) Civil</option>
                          <option value ='Analista de sistemas'>Analista de sistemas</option>
                          <option value ='Procurador(a)'>Procurador(a)</option>
                          <option value ='Advogado(a)'>Advogado(a)</option>
                          <option value ='Assistente Técnico Administrativo'>Assistente Técnico Administrativo</option>
                          <option value ='Assistente de Informática'>Assistente de Informática</option>
                          <option value ='Assistente Administrativo'>Assistente Administrativo</option>
                          <option value ='Técnico de Laboratório'>Técnico de Laboratório</option>
                          <option value ='Auxiliar Operacional'>Auxiliar Operacional</option>
                          <option value ='Auxiliar de Laboratório'>Auxiliar de Laboratório</option>
                          <option value ='Motorista'>Motorista</option>
                          <option value ='Colaborador eventual'>Colaborador eventual</option>
                        </select>
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
                  <div className="">
                    <label htmlFor="">Objetivo:</label>
                    <div>
                      <textarea
                        type="text"
                        name="objetivo"
                        id="objetivo:"
                        {...register("objetivo")}
                        cols="40"
                        rows="10"
                        padding="10"
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
                </div>
                <div className="second_section">
                  <div className='form_table'>
                   

                    <div className='destinoDiv'>
                      <label htmlFor="estado">Estado:</label>
                      <Select
                        id="estado"
                        value={estadoSelecionado}
                        onChange={handleEstadoChange}
                        options={estados}
                      />
                    </div>

                    {showMunicipiosSelect && (
                      <div className='destinoDiv'>
                        <label htmlFor="municipios">Municípios:</label>
                        <Select

                          id="municipios"
                          value={municipioSelecionado}
                          onChange={handleMunicipioChange}
                          options={municipios}

                        />
                      </div>
                    )}

                    <div className='numerodiarias'>
                      <label htmlFor="numeroDiarias">Número de Diárias:</label>
                      <div>
                        <input
                          type="number"
                          id="numeroDiarias"
                          value={numeroDiarias}
                          onChange={handleNumeroDiariasChange}

                        />
                      </div>
                    </div>
                  </div>

                  <div className="btn-destino">
                    <button onClick={adicionarDestino} className='btn-destino-hover'> ADICIONAR DESTINO</button>
                  </div>

                  <div className='result-container'>
                    <h4>Resultado:</h4>
                    {destinosSelecionados.map((destino, index) => (
                      <div className='result-box' key={index} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff', padding: '12px' }}>
                        <p>Município: {destino.municipio}</p>
                        <p>Número de Diárias: {destino.numeroDiarias}</p>
                        <p>Total Diárias: R${destino.totalDiarias.toFixed(2)}</p>
                        <button onClick={() => removerDestino(index)}>
                          <FaTrashAlt className='trashIcon' /></button>
                      </div>
                    ))}
                    <h4>Total de diárias:</h4>
                    <p>{somaQntDeDiarias}</p>
                    <h4>Total:</h4>
                    <p>R${somaDiarias.toFixed(2) || 0}</p>
                  </div>
                  <div className="generatePDF">
                    {!(periodoInicio && periodoFinal) ? (
                      <div className='errorMessage'>
                        <small>Selecione o período.</small>
                      </div>
                    ) : !(destinosSelecionados.length > 0) ? (
                      <small>Selecione algum destino.</small>
                    ) : !(somaQntDeDiarias <= saldo && somaQntDeDiarias >= saldoMetade) ? (
                      <div className='errorMessage'>
                        <small>Erro: Verifique se a quantidade de diárias não excedeu ao período.</small>
                      </div>
                    ) : (
                      <PDFDownloadLink
                        document={<MyDocument
                          form={form}
                          somaDiarias={somaDiarias}
                          somaQntDeDiarias={somaQntDeDiarias}
                          tipoCargo={tipoCargo}
                          municipioSelecionado={municipioSelecionado}
                          numeroDiarias={numeroDiarias}
                          destinosSelecionados={destinosSelecionados}
                          periodoInicio={periodoInicio}
                          periodoFinal={periodoFinal}
                        />}
                        fileName="Diária.pdf"
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