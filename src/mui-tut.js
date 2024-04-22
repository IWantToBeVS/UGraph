import Button from '@mui/material/Button'
import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Homepage = () => {
    return(
        <>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
          <PhotoCamera style={{marginRight: '20px'}}/>
          <Typography variant='h6'>
            Photo Album
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container maxWidth="sm">
            <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
              Photo Album
            </Typography>
            <Typography variant='h5' align='center' color='textSecondary' paragraph>
              This is a long sentence.
            </Typography>
            <div className={{marginTop: '40px'}}>
              <Grid container spacing={2} justifyContent = 'center'>
                <Grid item>
                  <Button variant='contained' color='primary'>
                    See my photos
                  </Button>
                </Grid>
                <Grid item>
                <Button variant='contained' color='primary'>
                    See my photos
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>

        </div>
        <Container style={{padding: '20px 0'}} maxWidth='md'>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card style={{height: '100%',
    display: 'flex',
    flexDirection: 'column',}}>
                <CardMedia 
                  style={{paddingTop: '56.25%'}}
                  image='https://source.unsplash.com/random'
                  title = 'image title'
                  >
                    </CardMedia>
                    <CardContent style={{flexGrow: 1}}>
                      <Typography gutterBottom variant='h5'>
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' color='primary'>View</Button>
                      <Button size='small' color='primary'>Edit</Button>
                    </CardActions>
              </Card>
            </Grid>
          ))}
          </Grid>
        </Container>
      </main>
    </>
    )
};

export default Homepage;