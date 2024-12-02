import anewhope from '../../assets/Images/anewhope.jpeg'
import attackoftheclones from '../../assets/Images/attackoftheclones.jpeg'
import theempirestrikesback from '../../assets/Images/theempirestrikesback.jpg'
import thephantommenace from '../../assets/Images/thephantommenace.jpeg'
import returnofthejedi from '../../assets/Images/returnofthejedi.jpeg'
import revengeofthesith from '../../assets/Images/revengeofthesith.jpeg'


export const ImageArray = [
    anewhope,
    attackoftheclones,
    theempirestrikesback, 
    thephantommenace,
    returnofthejedi,
    revengeofthesith   
]

// we dont have images so we map images based on the show name
export const imageMap = ImageArray.reduce((map, path) => {
    const fileName = path.split("/").pop().split(".")[0].toLowerCase();
    map[fileName] = path;
    return map;
}, {});
