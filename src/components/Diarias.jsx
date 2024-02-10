import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Diarias = () => {
  const [tipoCargo, setTipoCargo] = useState('1');
  const [tipoViagem, setTipoViagem] = useState('1');
  const [grupoViagem, setGrupoViagem] = useState();
  const [numeroDiarias, setNumeroDiarias] = useState();
  const [municipios, setMunicipios] = useState([]);
  const [totalDiarias, setTotalDiarias] = useState(0);

  const contentRef = useRef(null);

  const calcularDiaria = () => {
    let valorDiaria = 0;

    if (tipoCargo === '1') { // Servidor
      if (tipoViagem === '1') { // Intermunicipal
        valorDiaria = (grupoViagem === 'A') ? 167.05 : 237.38;
      } else if (tipoViagem === '2') { // Interestadual
        valorDiaria = 422.02;
      }
    } else if (tipoCargo === '2') { // Diretor
      if (tipoViagem === '1') { // Intermunicipal
        valorDiaria = (grupoViagem === 'A') ? 211.01 : 276.07;
      } else if (tipoViagem === '2') { // Interestadual
        valorDiaria = 474.77;
      }
    }

    return parseFloat(numeroDiarias) ? valorDiaria * parseFloat(numeroDiarias) : 0;
  };

  useEffect(() => {
    const totalDiarias = calcularDiaria();
    setTotalDiarias(totalDiarias);
  }, [tipoCargo, tipoViagem, grupoViagem, numeroDiarias]);

  const handleGrupoChange = (e) => {
    setGrupoViagem(e.target.value);

    const listaMunicipios = obterListaMunicipios(e.target.value);
    setMunicipios(listaMunicipios);
  };

  const obterListaMunicipios = (grupo) => {
    switch (grupo) {
      case 'A':
        return ['ANANINDEUA', 'MARITUBA', 'BENEVIDES', 'CASTANHAL', 'COLARES', 'CURUÇÁ', 'IGARAPÉ-AÇU', 'INHANGAPI', 'MAGALHÃES BARATA', 'MARACANÃ', 'MARAPANIM', 'MOSQUEIRO (DISTRITO)', 'SANTA IZABEL DO PARÁ', 'SANTA BÁRBARA DO PARÁ', 'SANTO ANTONIO DO TAUÁ', 'SÃO FRANCISCO DO PARÁ', 'TERRA ALTA', 'VIGIA'];
      case 'B':
        return ['ABAETETUBA', 'ABEL FIGUEIREDO', 'ACARÁ', 'AFUÁ', 'ÁGUA AZUL DO NORTE', 'ALENQUER', 'ALMEIRIM', 'ALTAMIRA', 'ANAJÁS', 'AUGUSTO CORRÊA', 'AURORA DO PARÁ', 'AVEIRO', 'BAGRE', 'BAIÃO', 'BANNACH', 'BARCARENA', 'BELÉM', 'BOM JESUS DO TOCANTINS', 'BONITO', 'BRAGANÇA', 'BRASIL NOVO', 'BREJO GRANDE DO ARAGUAIA', 'BREU BRANCO', 'BREVES', 'BUJARU', 'CACHOEIRA DO ARARI', 'CAMETÁ', 'CAPANEMA', 'CAPITÃO POÇO', 'CHAVES', 'COLARES', 'CONCEIÇÃO DO ARAGUAIA', 'CONCÓRDIA DO PARÁ', 'CUMARÚ DO NORTE', 'CURIONÓPOLIS', 'CURRALINHO', 'DOM ELISEU', 'ELDORADO DO CARAJÁS', 'FARO', 'FLORESTA DO ARAGUAIA', 'GARRAFÃO DO NORTE', 'GOIANÉSIA DO PARÁ', 'GURUPÁ', 'IGARAPÉ-MIRI', 'IPIXUNA DO PARÁ', 'IRITUIA', 'ITAITUBA', 'ITUPIRANGA', 'JACAREACANGA', 'JACUNDÁ', 'JURUTI', 'LIMOEIRO DO AJURU', 'MÃE DO RIO', 'MARABÁ', 'MEDICILÂNDIA', 'MELGAÇO', 'MOCAJUBA', 'MOJU', 'MONTE ALEGRE', 'MUANÁ', 'NOVA ESPERANÇA DO PIRIÁ', 'NOVA IPIXUNA', 'NOVA TIMBOTEUA', 'NOVO PROGRESSO', 'NOVO REPARTIMENTO', 'ÓBIDOS', 'OEIRAS DO PARÁ', 'ORIXIMINÁ', 'OURÉM', 'OURILÂNDIA DO NORTE', 'PACAJÁ', 'PALESTINA DO PARÁ', 'PARAGOMINAS', 'PARAUAPEBAS', 'PAU D’ARCO', 'PEIXE-BOI', 'PIÇARRA', 'PLACAS', 'PONTA DE PEDRAS', 'PORTEL', 'PORTO DE MOZ', 'PRAINHA', 'PRIMAVERA', 'REDENÇÃO', 'RIO MARIA', 'RONDON DO PARÁ', 'RURÓPOLIS', 'SALINÓPOLIS', 'SALVATERRA', 'SANTA CRUZ DO ARARI', 'SANTA LUZIA DO PARÁ', 'SANTA MARIA DAS BARREIRAS', 'SANTA MARIA DO PARÁ', 'SANTANA DO ARAGUAIA', 'SANTARÉM', 'SANTARÉM NOVO', 'SÃO CAETANO DE ODIVELAS', 'SÃO DOMINGOS DO ARAGUAIA', 'SÃO DOMINGOS DO CAPIM', 'SÃO FÉLIX DO XINGU', 'SÃO GERALDO DO ARAGUAIA', 'SÃO JOÃO DE PIRABAS', 'SÃO JOÃO DO ARAGUAIA', 'SÃO MIGUEL DO GUAMÁ', 'SÃO SEBASTIÃO DA BOA VISTA', 'SENADOR JOSÉ PORFÍRIO', 'SOURE', 'TAILÂNDIA', 'TERRA SANTA', 'TOMÉAÇU', 'TRAIRÃO', 'TUCUMÃ', 'TUCURUÍ', 'ULIANÓPOLIS', 'URUARÁ', 'VISEU', 'VITÓRIA DO XINGU', 'XINGUARA'];
      default:
        return [];
        case 'C':
            return ['ACRE', 'ALAGOAS', 'AMAZONAS', 'AMAPÁ', 'BAHIA', 'CEARÁ', 'DISTRITO FEDERAL', 'ESPÍRITO SANTO', 'FERNANDO DE NORONHA', 'GOIÁS', 'MARANHÃO', 'MATO GROSSO', 'MATO GROSSO DO SUL', 'MINAS GERAIS', 'PARÁ', 'PARAÍBA', 'PARANÁ', 'PERNAMBUCO', 'PIAUÍ', 'RONDÔNIA', 'RORAIMA', 'RIO DE JANEIRO', 'RIO GRANDE DO NORTE', 'RIO GRANDE DO SUL', 'SANTA CATARINA', 'SÃO PAULO', 'SERGIPE', 'TOCANTINS'];
    }
  };

  const handleNumeroDiariasChange = (e) => {
    const newNumeroDiarias = parseFloat(e.target.value);
    setNumeroDiarias(newNumeroDiarias);

    const totalDiarias = calcularDiaria();
    setTotalDiarias(totalDiarias);
  };

  const handleCalcularDiaria = () => {
    const totalDiarias = calcularDiaria();
    setTotalDiarias(totalDiarias);

    const input = contentRef.current;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        pdf.save('relatorio_diarias.pdf');
      });
  };

  return (
    <div>
      <label htmlFor="tipoCargo">Tipo de Cargo:</label>
      <select id="tipoCargo" onChange={(e) => setTipoCargo(e.target.value)}>
        <option value="1">Servidor</option>
        <option value="2">Diretor</option>
      </select>

      <br />

      <label htmlFor="tipoViagem">Tipo de Viagem:</label>
      <select id="tipoViagem" onChange={(e) => setTipoViagem(e.target.value)}>
        <option value="1">Intermunicipal</option>
        <option value="2">Interestadual</option>
      </select>

      <br />

      <label htmlFor="grupoViagem">Grupo de Municípios:</label>
      <select id="grupoViagem" onChange={handleGrupoChange}>
      <option value="" disabled selected hidden>Selecione uma opção</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <br />

      {/* Novo seletor para os municípios */}
      {municipios.length > 0 && (
        <div>
          <label htmlFor="municipio">Município:</label>
          <select id="municipio">
            {municipios.map((municipio, index) => (
              <option key={index} value={municipio}>
                {municipio}
              </option>
            ))}
          </select>
        </div>
      )}

      <br />

      <label htmlFor="numeroDiarias">Número de Diárias:</label>
      <input
        type="number"
        id="numeroDiarias"
        min="1"
        value={numeroDiarias}
        onChange={handleNumeroDiariasChange}
      />

      <br />
      <p>Total: R${totalDiarias.toFixed(2)}</p>

      {/* Botão para calcular diárias e gerar PDF */}
      <button onClick={handleCalcularDiaria}>
        Calcular Total de Diárias e Gerar PDF
      </button>

      <br />

      {/* Elemento para exibir o resultado */}
      <div ref={contentRef}>
        <p>Resumo do Relatório:</p>
        <p>Tipo de Cargo: {tipoCargo === '1' ? 'Servidor' : 'Diretor'}</p>
        <p>Tipo de Viagem: {tipoViagem === '1' ? 'Intermunicipal' : 'Interestadual'}</p>
        <p>Grupo de Municípios: {grupoViagem}</p>
        <p>Município Selecionado: {/* Adicione aqui o código para obter o município selecionado */}</p>
        <p>Número de Diárias: {numeroDiarias || ''}</p>
        
      </div>
    </div>
  );
};

export default Diarias;
