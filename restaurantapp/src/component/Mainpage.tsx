import React from "react";
import { Link } from "react-router-dom";
import bgimg from "../../public/img/mainpage_bg.jpg";
import '../index.css'

type Props = {

};

type State = {

};

export default class Mainpage extends React.Component<Props, State>{

    render(){
        return (
            <div style={{flex: 1, backgroundImage: 'url("/img/mainpage_bg2.jpg")', backgroundColor: '#1c1c1b', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
                <div style={{height: '100%', color: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{fontFamily: 'AlexBrush-Regular', fontSize: '100px', color: 'darkorange', textShadow: '3px 3px 3px black', userSelect: 'none'}}>Restaurant App</span>
                    <span style={{fontFamily: 'Forum-Regular', fontSize: '40px', color: '#ffffff', userSelect: 'none'}}>Deliciuri pe alese</span>
                    <div style={{display: "flex", flexDirection: 'row'}}>
                        <Link to="/menu"><button className="btnPrimary" style={{marginRight: '30px'}} >MENIU</button></Link>
                        <button className="btnSecondary" >REZERVA</button>
                    </div>
                </div>
                
            </div>
            
        );
    }
    
}