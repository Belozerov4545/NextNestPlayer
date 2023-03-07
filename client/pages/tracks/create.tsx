import { Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload'
import StepWrapper from '../../components/StepWrapper'
import { useInput } from '../../hooks/useInput'
import MainLayout from '../../layouts/MainLayout'
import axios from 'axios';
import { useRouter } from 'next/router'

const create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);

  const router = useRouter();

  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep( prev => prev + 1 )    
    } else {
      const formData = new FormData();
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post('http://localhost:5000/tracks', formData)
        .then(response => router.push('/tracks'))
        .catch(error => console.log(error.message))
    }
  };
  const back = () => {
    setActiveStep( prev => prev - 1 )
  };
  return (
    <MainLayout>
        <StepWrapper activeStep={activeStep}>
          <h1>Загрузка</h1>
          {activeStep === 0 &&
            <Grid container direction={'column'} style={{padding: '20px'}} >
              <TextField {...name} style={{ marginTop: '10px'}} label={'Название трека'}></TextField>
              <TextField {...artist} style={{ marginTop: '10px'}} label={'Исполнитель трека'}></TextField>
              <TextField {...text} style={{ marginTop: '10px'}} label={'Текст трека'} multiline rows={3}></TextField>
            </Grid>
          }
          {activeStep === 1 && 
          <FileUpload setFile={setPicture} accept={'*'}>
            <Button>Загрузите изображение</Button>
          </FileUpload>}
          {activeStep === 2 && 
          <FileUpload setFile={setAudio} accept={'*'}>
            <Button>Загрузите аудио</Button>
          </FileUpload>}
        </StepWrapper>
        <Grid container justifyContent={'space-between'}>
          <Button disabled={activeStep === 0} onClick={back} >Назад</Button>
          <Button onClick={next} >Далее</Button>
        </Grid>
    </MainLayout>
  )
}

export default create