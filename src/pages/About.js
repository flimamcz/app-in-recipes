import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Paper, Typography } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const teams = [
  {
    name: 'Cristiane Kizelevicius',
    linkedin: 'cristiane-kizelevicius-samaan-7a2208239',
    github: 'Cristks',
  },
  {
    name: 'Filipe Lima',
    linkedin: 'filipe-lima-dev',
    github: 'flimamcz',
  },
  {
    name: 'Júlio Silveira',
    linkedin: 'juliosilveiradev',
    github: 'julio-silveira',
  },
  {
    name: 'Vitor Teixeira',
    linkedin: 'vitor-barrioni',
    github: 'VitorBarrioni',
  },
];
function About() {
  return (
    <div className="pb-50">
      <Header />
      <Typography
        variant="h5"
        className="text-center pb-3"
        color="secondary"
        sx={ { fontWeight: 700 } }
      >
        Feito por:
      </Typography>
      <Grid container spacing={ 2 } sx={ { paddingBottom: '80px' } }>
        {teams.map(({ name, linkedin, github }) => (
          <Grid
            sx={ { display: 'flex', justifyContent: 'center' } }
            item
            xs={ 12 }
            md={ 6 }
            xl={ 3 }
            key={ name }
          >
            <Paper
              levation={ 10 }
              sx={ {
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
              } }
            >
              <img width={ 100 } src={ `https://avatars.githubusercontent.com/${github}?size=100` } alt="logo1" />

              <h6>{name}</h6>
              <div>
                <a id={ github } href={ `https://github.com/${github}` } target="blank">
                  <GitHubIcon color="primary" />
                </a>

                <a href={ `https://www.linkedin.com/in/${linkedin}` } target="blank">
                  <LinkedInIcon color="primary" />
                </a>
              </div>
            </Paper>
          </Grid>))}
      </Grid>
      <Footer />
    </div>
  );
}

export default About;
