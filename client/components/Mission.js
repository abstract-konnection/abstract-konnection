import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * COMPONENT
 */
// export const Home = (props) => {
//   const { username } = props;

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   );
// };

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default class Mission extends React.Component {
  render() {
    return (
      <div id="home-component">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
          )`,
          }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Our Mission
            </Typography>
            <Typography variant="h5" component="div">
              Abstract{bull}Konnection{bull}(c)
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              verb
            </Typography>
            <Typography variant="body2">
              Here at Abstract Konnection, we believe that artists have the
              ability to influence social change.
              <br />
              Artists come in every shape and size regardless of age, ethnicity,
              race, socioeconomic status, gender, sexual orientation and
              religion.
              <br />
              That being said, we hope you enjoy perusing through our art
              collection where we have intentionally left out the artist's
              <br />
              name as well as title of the piece. Please feel free to click on
              an image to see more details on the artwork.
              {/* <br />
              {'"a benevolent smile"'} */}
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      </div>
    );
  }
}
