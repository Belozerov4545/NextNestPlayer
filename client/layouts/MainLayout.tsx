import { Container } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import Navbar from '../components/Navbar';
import Player from '../components/Player';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactElement |  React.ReactElement[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
    <Head>
      <title>{title || 'Музыкальная площадка'}</title>
      <meta name='description' content={'Музыкальная площадка. Здесь каждый может оставить свой трек и получшать то, что ему по душе!' + description}/>
      <meta name='robots' content='index, follow'/>
      <meta name='keywords' content={keywords || 'Музыка, треки, артисты, исполнители'}/>
      <meta name='viewport' content='widht=device-width, initial-scale=1'/>
    </Head>
    <Navbar />
      <Container style={{margin: "90px 0"}}>
        {children}
      </Container>
      <Player />
    </> 
    )
}

export default MainLayout;
