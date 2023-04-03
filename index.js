// import * as dotenv from 'dotenv';
// dotenv.config();

const express = require ('express')
const app = express()
const port = 5000



var cors = require('cors')
//const SpotifyWebApi = require('spotify-web-api-node')
app.use(cors())

const CLIENT_ID = "d9f307b6668446e78096051746b9ff21"
const SECRET_ID = "980b6d0c977a40f4a77ccb4535d602b0"
const REDIRECT_URI = "http://localhost:3000/callback"
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`

var SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: SECRET_ID,
  redirectUri: REDIRECT_URI
})

var accessToken

spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    //console.log(data.body)
    spotifyApi.setAccessToken(data.body["access_token"]);
    accessToken = data.body.access_token
    console.log(data.body.access_token)
  })
  .catch(error => {
    console.log("Something went wrong when retrieving an access token", error);
  });

console.log("server connected");

// const getTopTracks = async () => {

//   console.log("getting")
        
// //  console.log(localStorage.getItem('accessToken'))
//   var list = fetch(TOP_TRACKS_ENDPOINT, {
//     headers: {
//       Authorization: `Bearer BQCpyu1J47vzAC796xKlaPSa3s2XUOmmxYJDrGRLIwxT4at8irUv_2oSjykrIXfNisGQfcQjw8ojyBaeyBupm-mTMrPM3AX-jjY71og0Z9AedzTqgQhHp05Xgswfr5JGPLddayow9SfHN55RNVFVSNdc56lgsEMWDiU8L9XIpmoTQuyiFfeJCA3a5uJNSCEIsMRBgWda3ctNRmRdBPv32ke8Iisz`,
//     },
//   })
  
//   console.log(list.data)

//   // console.log(list)
//   console.log("done")
//   console.log("farts")
//   return list
//   //return list;
//   //return list;

// }

app.get('/tracks', (req, res) => {

  // spotifyApi.getMyTopTracks()
  // .then(function(data) {
  //   let topTracks = data.body.items;
  //   console.log(topTracks);

  // }, function(err) {
  //   console.log('fart', err);
  // })

  console.log("got here")
  res.send('we are here\n');
})

// app.get('/tracks:id', (req, res, next) => {

// })

app.post('/getAccessToken', async(req, res) => {
  console.log(accessToken)
  res.send(accessToken)

})

app.post('/tracks', async(req, res) => {

  console.log("we are here\n")


  // spotifyApi.getMyTopTracks()
  // .then(function(data) {
  //   let topTracks = data.body.items;
  //   console.log(topTracks);
  // }, function(err) {
  //   console.log('fart\n', err);
  // })
  console.log("hello\n");


//  const response = await getTopTracks()

//  const { items } = await response.json()

 // console.log(response.data)

  // console.log(itme)

  // const tracks = items.slice(0, 10).map((track) => ({
  //   artist: track.artists.map((_artist) => _artist.name).join(', '),
  //   songUrl: track.external_urls.spotify,
  //   title: track.name,
  // }))

  // res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')

  // return res.status(200).json({ tracks })
  

  res.send("gold")

})

app.listen(port, () => {
  console.log(`connected and listening at port ${port}`)
})


