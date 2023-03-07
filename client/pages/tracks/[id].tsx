import { Button, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const text = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id,
            })
            setTrack({...track, comments: [...track.comments, response.data]})     
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <MainLayout 
            title={'Музыкальная площадка - ' + track?.name + ' - ' + track?.artist }
            keywords={'Vузыка, артисты, стреки,' + track?.name + ', ' + track?.artist }
            >
            <Button 
            variant='outlined'
            style={{fontSize: 20}}
            onClick={() => router.push('/tracks')}>К cписку
            </Button>
            <Grid container style={{ margin: '20px 0'}}>
                <img src={`http://localhost:5000/` + track?.picture} width={200} height={200} alt="track logo" />
                <div style={{ margin: '20px 0'}}>
                    <h1>Название трека - {track?.name}</h1>
                    <h1>Исполнитель - {track?.artist}</h1>
                    <h1>Количество прослушиваний - {track?.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track?.text}</p>
            <h1>Комментарии</h1>
            <Grid container>
                <TextField {...username} label='Ваше имя' fullWidth></TextField>
                <TextField {...text} label='Ваш комментарий' fullWidth multiline rows={4}></TextField>
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {track?.comments?.map((comment) => {
                return (
                    <div>
                        <div>Автор - {comment?.username}</div>
                        <div>Комментарий - {comment?.text}</div>
                    </div>
                    )
                })}
            </div>
        </MainLayout>
    )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get(`http://localhost:5000/tracks/` + params?.id)
    return {
        props: {
           serverTrack: response?.data
        }
    }
}