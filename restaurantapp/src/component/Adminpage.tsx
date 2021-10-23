import React from "react";
import Service from "../service/Service";

export default class Adminpage extends React.Component<{},{sending: boolean}>{
    constructor(props:any){
        super(props);

        this.state = {
            sending: false
        }
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(event: any){
        this.setState({sending: true});
        Service.logout()
            .then((success) => {
                window.location.href = '';
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.setState({sending: false});
            });

    }

    render(){
        return (
            <div style={{display: "flex", alignItems: "center", justifyContent: 'center'}}>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <button disabled={this.state.sending} className="btn" onClick={this.onLogout}>Logout</button>
                </div>
            </div>
        )
    }
}