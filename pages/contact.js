import { Grid, Paper } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Contact() {
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
            <p> </p>
            <p> </p>
            <p> </p>
            <p>carloscrespo148@gmail.com </p>
            <h1> </h1>
            <h2 stype={{ marginTop: '0px' }}>703-910-1601</h2>
          </Paper>
        </div>
      </Grid>
    </Layout>
  );
}
