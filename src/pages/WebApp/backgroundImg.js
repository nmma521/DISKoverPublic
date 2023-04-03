import segg from './img/segg.jpg'
import goku from './img/goku.jpg'
import dark from './img/africa.jpg'
import light from './img/light.jpeg'
import kanye from './img/dark.jpeg'
import dank from './img/dank.jpg'
import dunes from './img/darkdunes.jpg'
import river from './img/lightmode.jpg'
import forest from './img/forest.jpg'
import space from './img/space.png'
import lightmusic from './img/lightmusic.jpeg'
import music from './img/musicbackground.jpeg'

var imageBackground = lightmusic


if (localStorage.getItem('imageType') == 0) {
    imageBackground = lightmusic
}
else {
    imageBackground = music
}

export default imageBackground