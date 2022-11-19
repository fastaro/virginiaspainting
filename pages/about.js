import { Grid, Paper } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function About() {
  return (
    <Layout>
      <Grid
        item
        container
        direction="column"
        md={12}
        xs={12}
        sx={{ maxHeight: '80%', display: 'flex', justifyContent: 'center' }}
      >
        <div
          style={{
            height: '50vh',
            display: 'flex',
            objectFit: 'contain',
            marginTop: '150px',
            borderRadius: '5px',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Paper
            sx={{
              width: '100%',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {' '}
            <p>Intererior / Exterior</p>
            <p>Drywall - Drywall Repair</p>
            <p>Carpentry - Framing - Wood - Metal</p>
            <p>Kitchen - Bathrooms</p>
            <h1>Carlos Rojas Crespo</h1>
            <p stype={{ marginTop: '0px' }}>Owner</p>
          </Paper>
        </div>
      </Grid>
    </Layout>
  );
}
