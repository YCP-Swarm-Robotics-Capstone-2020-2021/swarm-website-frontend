import {cookies} from '../utils/Cookies'

export default function BackgroundImageStyling() {
    let bgNum = cookies.get('bgNum');

    if(!bgNum){
        bgNum = 1;
    }

    const backgroundImageStyling = {
        backgroundImage: "url(" + require('../images/loginbgs/bg'+bgNum+'.jpg') + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        overflow: "hidden"
    };
    return(backgroundImageStyling);
}