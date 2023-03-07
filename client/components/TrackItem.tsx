import React from 'react'
import { ITrack } from '../types/track';
import Card from '@mui/material/Card';
import styles from '../styles/TrackItem.module.scss'
import IconButton from '@mui/material/IconButton';
import { PlayArrow, Pause, Delete } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

export const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack } = useActions();
  
  const play = (e) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }

  return (
    <Card className={styles.track} onClick={() => router.push(`/tracks/` + track?._id)} >
        <IconButton onClick={play} >
            {!active ? <PlayArrow /> : <Pause />} 
        </IconButton>
        <img width={70} height={70} src={'http://localhost:5000/' + track?.picture} />
        <Grid container direction={'column'} style={{ width: 200, margin: '0 20px'}} >
            <div>{track?.name}</div>
            <div style={{ fontSize: 12, color: 'gray'}}>{track?.artist}</div>
        </Grid>
        <IconButton style={{ marginLeft: 'auto' }} onClick={e => e.stopPropagation()} >
           <Delete /> 
        </IconButton>
    </Card>
  )
}
