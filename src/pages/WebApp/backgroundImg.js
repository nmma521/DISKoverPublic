import segg from './img/segg.jpg'
import goku from './img/goku.jpg'
import dark from './img/africa.jpg'
import light from './img/drake.jpg'
import kanye from './img/kayne.jpeg'
import dank from './img/dank.jpg'

var imageBackground = segg


if (localStorage.getItem('imageType') == 0) {
    imageBackground = light
}
else {
    imageBackground = kanye
}

export default imageBackground