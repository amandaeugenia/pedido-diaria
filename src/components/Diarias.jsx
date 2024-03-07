import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaTrashAlt } from 'react-icons/fa';

const Diarias = ({
  tipoCargo,
  setTipoCargo,
  tipoViagem,
  setTipoViagem,
  numeroDiarias,
  setNumeroDiarias,
  totalDiarias,
  setTotalDiarias,
  destinosSelecionados,
  setDestinosSelecionados,
  somaDiarias,
  setSomaDiarias,
  somaQntDeDiarias,
  setSomaQntDeDiarias,
}) => {
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [municipioSelecionado, setMunicipioSelecionado] = useState(null);
  const [showMunicipiosSelect, setShowMunicipiosSelect] = useState(false);

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


  useEffect(() => {
    if (estadoSelecionado && estadoSelecionado.value === 'PA') {
      setShowMunicipiosSelect(true);
    } else {
      setShowMunicipiosSelect(false);
      setMunicipioSelecionado(null);
    }
  }, [estadoSelecionado]);

  useEffect(() => {
    calcularDiaria();
  }, [numeroDiarias, tipoCargo, tipoViagem, estadoSelecionado, municipioSelecionado]);


  const calcularDiaria = () => {
    let valorDiaria = 0;

    if (municipioSelecionado) {
      valorDiaria = tipoCargo === '1' ? municipioSelecionado.servidor : municipioSelecionado.diretor;
    } else if (estadoSelecionado) {
      const estado = estados.find(estado => estado.value === estadoSelecionado.value);
      if (estado) {
        valorDiaria = tipoCargo === '1' ? estado.servidor : estado.diretor;
      }
    }

    const numeroDiariasFloat = parseFloat(numeroDiarias);
    setTotalDiarias(numeroDiariasFloat ? valorDiaria * numeroDiariasFloat : 0);
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

  const adicionarDestino = () => {
    if (estadoSelecionado) {
      let valorDiaria = 0;
  
      if (municipioSelecionado) {
        valorDiaria = tipoCargo === '1' ? municipioSelecionado.servidor : municipioSelecionado.diretor;
      } else {
        const estado = estados.find(estado => estado.value === estadoSelecionado.value);
        if (estado) {
          valorDiaria = tipoCargo === '1' ? estado.servidor : estado.diretor;
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
  
  const calcularTotalTodasDiarias = () => {
    const total = destinosSelecionados.reduce((total, destino) => total + destino.totalDiarias, 0);
    setSomaDiarias(total);
    console.log("somaDiarias:", total); 
    console.log("somaDiarias:", somaDiarias); 
    return total
};

  const calcularQntDeDiarias = () => {
    const total = destinosSelecionados.reduce((total, destino) => total + parseFloat(destino.numeroDiarias), 0);
    setSomaQntDeDiarias(total);
    return total
  };
  
  useEffect(() => {
    calcularTotalTodasDiarias();
    calcularQntDeDiarias();
  }, [destinosSelecionados]);

  const removerDestino = (index) => {
    const novosDestinos = [...destinosSelecionados];
    novosDestinos.splice(index, 1);
    setDestinosSelecionados(novosDestinos);
  };

  return (
    <div>
      <div className='form_table'>
        <div>
          <label htmlFor="tipoCargo">Cargo Beneficiário:</label>
          <div>
            <select id="tipoCargo" value={tipoCargo} onChange={handleTipoCargoChange}>
              <option value="1">Demais Servidores</option>
              <option value="2">DG</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="estado">Estado:</label>
          <Select
            id="estado"
            value={estadoSelecionado}
            onChange={handleEstadoChange}
            options={estados}
          />
        </div>

        {showMunicipiosSelect && (
          <div>
            <label htmlFor="municipios">Municípios:</label>
            <Select
            className='selectMunicipios'
              id="municipios"
              value={municipioSelecionado}
              onChange={handleMunicipioChange}
              options={municipios}
              
            />
          </div>
        )}

        <div>
          <label htmlFor="numeroDiarias">Número de Diárias:</label>
          <div>
            <input
              type="number"
              id="numeroDiarias"
              value={numeroDiarias}
              onChange={handleNumeroDiariasChange}
              style={{ width: '100px' }}
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
    <div key={index} style={{ backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff', padding: '12px' }}>
      <p>Município: {destino.municipio}</p>
      <p>Número de Diárias: {destino.numeroDiarias}</p>
      <p>Total Diárias: R${destino.totalDiarias.toFixed(2)}</p>
      <button onClick={() => removerDestino(index)}>
      <FaTrashAlt className='trashIcon'/></button>
    </div>
  ))}
    <h4>Total de diárias:</h4>
  <p>{calcularQntDeDiarias()}</p>
  <h4>Total:</h4>
  <p>R${calcularTotalTodasDiarias().toFixed(2) || 0}</p>
</div>
    </div>
  );
};

export default Diarias;
