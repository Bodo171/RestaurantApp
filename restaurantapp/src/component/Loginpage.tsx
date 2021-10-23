import React from "react";
import Service from "../service/Service";

type Props = {

};

type State = {
    fields: {
        email: string,
        password: string
    };
    error: string;
    sending: boolean;
};

export default class Loginpage extends React.Component<Props, State>{

    constructor(props: any){
        super(props);
        this.state = {
            fields: {
                email: '',
                password: ''
            },
            error: '',
            sending: false
        }

        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setValue(event:any){
        const inputName = event.target.name;
        const value = event.target.value;
        let fields = this.state.fields;

        if("email" === inputName) fields.email = String(value);
        if("password" === inputName) fields.password = String(value);
        this.setState({fields: fields});
    }

    validateForm(){
        // const fields = this.state.fields;
        // if (fields.day === '') return "Te rog alege ziua!";
        // if (fields.hour === '') return "Te rog alege ora!";
        // if (fields.name === '') return "Te rog completează numele!";
        // if (fields.phone === '') return "Te rog adaugă număr de telefon!";
        // if (fields.persons === 0) return "Te rog selectează numărul de persoane!";
        // return "";

    }

    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();

        this.setState({sending: true, error: ''});
        Service.login(this.state.fields)
            .then((success) => {
                window.location.href = '/admin'
            })
            .catch((error) => {
                this.setState({error: String(error)});
            })
            .finally(() => {this.setState({sending: false})});
    }

    

    render(){
        return (
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                <div>
                    <fieldset>
                        <input name="email" type="email" className="form-control" id="email" placeholder="Email" onChange={this.setValue} required />
                    </fieldset> 
                </div>
                <div >
                    <fieldset>
                        <input name="password" type="password" className="form-control" id="password" placeholder="Parola" onChange={this.setValue} required />
                    </fieldset>
                </div>
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Login</button>
                </div>
                
            </div>
        );
    }
    
}