import { Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import Example from '../components/example';
export default function Home() {
  return (
    <Layout>
      {/* MIDDLE */}
      <Grid
        item
        container
        direction="column"
        md={12}
        xs={12}
        sx={{ maxHeight: '80%', display: 'flex', justifyContent: 'center' }}
      >
        <Example />
      </Grid>
      {/* RIGHT COLUMN */}
    </Layout>
  );
}
