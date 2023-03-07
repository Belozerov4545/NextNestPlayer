import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface StepWrapperProps {
    activeStep: number;
    children: any;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
const steps: string[] = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек'];
  return (
    <Container>
        <Stepper activeStep={activeStep}>
            {steps.map((step, index) => {
                return (
                <Step key={index} completed={activeStep > index}>
                    <StepLabel>{step}</StepLabel>
                </Step>
                )
            })}
        </Stepper>
        <Grid container justifyContent={'center'} style={{margin: '70px 0', height: '270px'}} >
            <Card style={{width: '600px'}}>
                {children}
            </Card>
        </Grid>
    </Container>
  )
}

export default StepWrapper;
