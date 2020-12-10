import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ImageUploader from "react-images-upload";
import api from '~/services/api';

import { Container, Content } from './styles';

function Cadastrar(props) {

  const [funcionarios, setFuncionarios] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [exames, setExames] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [medicos, setMedicos]  = useState([]);
  const [valorSelecionado, setValorSelecionado] = useState(null);
  const { register, handleSubmit } = useForm({});
  

  useEffect(() => {
    api.get('funcionarios').then((response) => {
      setFuncionarios(response.data);
    });
    api.get('exames').then((response) => {
      setExames(response.data);
    });
    api.get('agentes').then((response) => {
      setAgentes(response.data);
    });
  
    api.get('medicos').then((response) => {
      setMedicos(response.data);
  });

  }, []);

  const handleSelected = useCallback(async (e) => {
    setValorSelecionado(e.target.value);
    console.log(valorSelecionado)
  }, [valorSelecionado]);

  /*
  useEffect(() => {
    api.get(`funcionarios/${valorSelecionado}`).then((response) => {
      const fotoSelecionado = response.data.foto;
      setFotos(fotoSelecionado)
    })
  }, [valorSelecionado])
  */
const onDrop = (fotos) => {
  setFotos ([...fotos, fotos]);
}

/*
async function handleRegister(e) {
  e.preventDefault();
  let formData = new FormData();
}

formData.append("foto", foto[0]);

try {
  const foto = await api.post("funcionario/foto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

*/
  const onSubmit = async (data, e) => {
    const formData = new FormData ();
    formData.append("foto", foto[0]);
    const { data_entrega, funcionario_id, foto, exame_id, agente_id, medico_id, descricaoPPP } = data;

   await api.post("funcionario/foto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }});
  

    await api.post('entregas', {
      data_entrega, funcionario_id, foto: foto.data.path, exame_id, agente_id, medico_id, descricaoPPP
    });
    e.target.reset();
  };


  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="datetime-local" name="data_emissao" placeholder="Título do conteúdo" ref={register} />

          <select name="funcionario_id" onChange={handleSelected} ref={register}>
            <option value="" disabled selected>
              Informe o funcionario
          </option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {`${funcionario.nome}`}
              </option>
            ))}
          </select>

          <select name="foto"  ref={register}>
            <option value=""disabled selected>
              Adicionar foto
              </option>
              <ImageUploader
            {...props}
            singleImage={true}
            withIcon={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
          />

            
          </select>
            
          
          <input type="textarea" name="descricaoPPP" placeholder="Informe a descricao" ref={register}/>

          <select name="exame_id" ref={register}>
            <option value="" disabled selected>
              Informe o exame
          </option>
            {exames.map((exame) => (
              <option key={exame.id} value={exame.id}>
                {`${exame.nome}`}
              </option>
            ))}
          </select>

          <select name="agente_id" ref={register}>
            <option value="" disabled selected>
              Informe o agente de risco
          </option>
            {agentes.map((agente) => (
              <option key={agente.id} value={agente.id}>
                {`${agente.nome}`}
              </option>
            ))}
          </select>

          <select name="medico_id" ref={register}>
            <option value="" disabled selected>
              Informe o medico
          </option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {`${medico.nome}`}
              </option>
            ))}
          </select>


          <button type="submit">Cadastrar</button>
          <Link to="/">
            Voltar
          </Link>
        </form>
      </Content>
    </Container>
  );
}

export default Cadastrar;
