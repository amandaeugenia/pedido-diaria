import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Diarias = () => {
  const [tipoCargo, setTipoCargo] = useState('1');
  const [tipoViagem, setTipoViagem] = useState('1');
  const [municipiosSelecionados, setMunicipiosSelecionados] = useState([]);
  const [numeroDiarias, setNumeroDiarias] = useState('');
  const [totalDiarias, setTotalDiarias] = useState(0);

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
  }, [numeroDiarias, tipoCargo, tipoViagem, municipiosSelecionados]);

  const calcularDiaria = () => {
    let valorDiaria = 0;

    if (tipoCargo === '1') { // Servidor
      if (tipoViagem === '1') { // Intermunicipal
        valorDiaria = municipiosSelecionados.reduce((acc, municipio) => {
          const valorMunicipio = municipio.grupo === 'A' ? 167.05 : (municipio.grupo === 'B' ? 237.38 : 0);
          return acc + valorMunicipio;
        }, 0);
      } else if (tipoViagem === '2') { // Interestadual
        valorDiaria = municipiosSelecionados.reduce((acc, municipio) => {
          const valorMunicipio = municipio.grupo === 'C' ? 422.02 : 0;
          return acc + valorMunicipio;
        }, 0);
      }
    } else if (tipoCargo === '2') { // Diretor
      if (tipoViagem === '1') { // Intermunicipal
        valorDiaria = municipiosSelecionados.reduce((acc, municipio) => {
          const valorMunicipio = municipio.grupo === 'A' ? 211.01 : (municipio.grupo === 'B' ? 276.07 : 0);
          return acc + valorMunicipio;
        }, 0);
      } else if (tipoViagem === '2') { // Interestadual
        valorDiaria = municipiosSelecionados.reduce((acc, municipio) => {
          const valorMunicipio = municipio.grupo === 'C' ? 474.77 : 0;
          return acc + valorMunicipio;
        }, 0);
      }
    }

    const numeroDiariasFloat = parseFloat(numeroDiarias);

    setTotalDiarias(numeroDiariasFloat ? valorDiaria * numeroDiariasFloat : 0);
  };

  const handleTipoCargoChange = (event) => {
    setTipoCargo(event.target.value);
  };

  const handleTipoViagemChange = (event) => {
    setTipoViagem(event.target.value);
  };

  const handleNumeroDiariasChange = (event) => {
    setNumeroDiarias(event.target.value);
  };

  const handleMunicipiosChange = (selectedOptions) => {
    setMunicipiosSelecionados(selectedOptions);
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
          isMulti
          options={destinos.filter(destino => {
            if (tipoViagem === '1') {
              return destino.grupo === 'A' || destino.grupo === 'B';
            } else {
              return destino.grupo === 'C';
            }
          })}
          onChange={handleMunicipiosChange}
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
      <div>
        <p id="resultado">O valor total das diárias é: R${totalDiarias.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Diarias;
