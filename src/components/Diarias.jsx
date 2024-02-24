import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Diarias = () => {
  const [tipoCargo, setTipoCargo] = useState('1');
  const [tipoViagem, setTipoViagem] = useState('1');
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [numeroDiarias, setNumeroDiarias] = useState('');
  const [totalDiarias, setTotalDiarias] = useState(0);
  const [destinosSelecionados, setDestinosSelecionados] = useState([]);

  const destinos = [
    { value: 'ANANINDEUA', label: 'ANANINDEUA', grupo: 'A' },
    { value: 'MARITUBA', label: 'MARITUBA', grupo: 'A' },
    // ... (adicionar outros municípios do grupo A)
    { value: 'ABAETETUBA', label: 'ABAETETUBA', grupo: 'B' },
    { value: 'ABEL FIGUEIREDO', label: 'ABEL FIGUEIREDO', grupo: 'B' },
    // ... (adicionar outros municípios do grupo B)
    { value: 'ACRE', label: 'ACRE', grupo: 'C' },
    { value: 'ALAGOAS', label: 'ALAGOAS', grupo: 'C' },
    // ... (adicionar outros estados do grupo C)
  ];

  useEffect(() => {
    calcularDiaria();
  }, [numeroDiarias, tipoCargo, tipoViagem, municipioSelecionado]);

  const calcularDiaria = () => {
    const valorDiaria = municipioSelecionado ? calcularValorDiaria(municipioSelecionado) : 0;

    const numeroDiariasFloat = parseFloat(numeroDiarias);
    setTotalDiarias(numeroDiariasFloat ? valorDiaria * numeroDiariasFloat : 0);
  };

  const calcularValorDiaria = (municipio) => {
    switch (tipoCargo) {
      case '1': // Servidor
        return tipoViagem === '1' ? calcularValorDiariaIntermunicipal(municipio) : calcularValorDiariaInterestadual(municipio);
      case '2': // Diretor
        return tipoViagem === '1' ? calcularValorDiariaIntermunicipal(municipio) : calcularValorDiariaInterestadual(municipio);
      default:
        return 0;
    }
  };

  const calcularValorDiariaIntermunicipal = (municipio) => {
    return municipio.grupo === 'A' ? 167.05 : (municipio.grupo === 'B' ? 237.38 : 0);
  };

  const calcularValorDiariaInterestadual = (municipio) => {
    return municipio.grupo === 'C' ? 422.02 : 0;
  };

  const handleTipoCargoChange = (event) => {
    setTipoCargo(event.target.value);
  };

  const handleTipoViagemChange = (event) => {
    setTipoViagem(event.target.value);
    setMunicipioSelecionado(null);
  };

  const handleNumeroDiariasChange = (event) => {
    setNumeroDiarias(event.target.value);
  };

  const handleMunicipioChange = (selectedOption) => {
    setMunicipioSelecionado(selectedOption);
  };

  const adicionarDestino = () => {
    if (municipioSelecionado) {
      const novoDestino = {
        municipio: municipioSelecionado.value,
        grupo: municipioSelecionado.grupo,
        numeroDiarias: numeroDiarias,
        totalDiarias: calcularValorDiaria(municipioSelecionado) * parseFloat(numeroDiarias),
      };

      setDestinosSelecionados([...destinosSelecionados, novoDestino]);
      setMunicipioSelecionado(null);
    }
  };

  const calcularTotalTodasDiarias = () => {
    return destinosSelecionados.reduce((total, destino) => total + destino.totalDiarias, 0);
  };

  return (
    <div>
      <div>
        <label htmlFor="tipoCargo">Cargo Beneficiário:</label>
        <select id="tipoCargo" value={tipoCargo} onChange={handleTipoCargoChange}>
          <option value="1">Servidores</option>
          <option value="2">DG</option>
        </select>
      </div>
      <div>
        <label htmlFor="tipoViagem">Tipo de Viagem:</label>
        <select id="tipoViagem" value={tipoViagem} onChange={handleTipoViagemChange}>
          <option value="1">Intermunicipal</option>
          <option value="2">Interestadual</option>
        </select>
      </div>
      <div>
        <label htmlFor="municipios">Destinos:</label>
        <Select
          isMulti={false}
          options={destinos.filter(destino => {
            if (tipoViagem === '1') {
              return destino.grupo === 'A' || destino.grupo === 'B';
            } else {
              return destino.grupo === 'C';
            }
          })}
          onChange={handleMunicipioChange}
          value={municipioSelecionado}
        />
      </div>
      <div>
        <label htmlFor="numeroDiarias">Número de Diárias:</label>
        <input
          type="number"
          id="numeroDiarias"
          value={numeroDiarias}
          onChange={handleNumeroDiariasChange}
        />
      </div>
      <button onClick={adicionarDestino}>Adicionar Destino</button>
      <p id="resultado">O valor total das diárias é: R${totalDiarias.toFixed(2)}</p>
      <div>
        <h4>Destinos Selecionados</h4>
        {destinosSelecionados.map((destino, index) => (
          <div key={index}>
            <p>Município: {destino.municipio}</p>
            <p>Número de Diárias: {destino.numeroDiarias}</p>
            <p>Total Diárias: R${destino.totalDiarias.toFixed(2)}</p>
          </div>
        ))}
        <h4>Total de Todas as Diárias</h4>
        <p>R${calcularTotalTodasDiarias().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Diarias;
