import React from "react";
import Service from "../service/Service";
import TextField from '@mui/material/TextField';


type State = {
    fields: {
        day: string;
        dayAndTime: Date;
        hour: string;
        name: string;
        phone: string;
        persons: number;
    }
    error: string;
    success: string;
    sending: boolean;
}

export default class BookTable extends React.Component<{}, State>{
    constructor(props:any){
        super(props);
        this.state = {
            fields: {
                day: '',
                dayAndTime: new Date() || null,
                hour: '',
                name: '',
                phone: '',
                persons: 0
            },
            error: '',
            success: '',
            sending: false
        };
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    setValue(event:any){
        const inputName = event.target.name;
        const value = event.target.value;
        let fields = this.state.fields;

        //if("day" === inputName) fields.day = String(value);
        //if("hour" === inputName) fields.hour = String(value);
        if("dayAndTime" === inputName) fields.dayAndTime = value;
        if("name" === inputName) fields.name = String(value);
        if("phone" === inputName) fields.phone = String(value);
        if("persons" === inputName) fields.persons = Number(value);
        this.setState({fields: fields});
    }

    validateForm(){
        const fields = this.state.fields;
        if (fields.day === '') return "Te rog alege ziua!";
        if (fields.hour === '') return "Te rog alege ora!";
        if (fields.name === '') return "Te rog completează numele!";
        if (fields.phone === '') return "Te rog adaugă număr de telefon!";
        if (fields.persons === 0) return "Te rog selectează numărul de persoane!";
        return "";

    }

    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();

        let error = this.validateForm();
        this.setState({error: error, success: ''});

        if (error === ''){
            this.setState({sending: true});
            Service.reserveTable(this.state.fields)
                .then((success) => {
                    this.setState({sending: false, success: 'Cererea ta a fost trimisa cu success!'});
                    event.target.form?.reset();
                })
                .catch((error) => {
                    this.setState({sending: false, error: String(error)});
                });
        }
    }


    render(){
        let date = new Date();
        return (
            <section id="book-table">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading">
                                <h2>Rezervă o masă acum</h2>
                            </div>
                        </div>
                        <div className="col-md-4 col-md-offset-2">
                            <div className="left-image">
                                <img src="img/book_left_image.jpg" alt=""/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="right-info">
                                <h4>Rezervare</h4>
                                <span style={{color: "red"}}>{this.state.error}</span>
                                <span style={{color: "green"}}>{this.state.success}</span>

                                <div className="row">
                                    <form>
                                        <div className="form-group">


                                                    <TextField
                                                        variant="standard"
                                                        InputProps={{
                                                            disableUnderline: true,
                                                        }}
                                                        id="dateAndTime"
                                                        type="datetime-local"
                                                        name="dateAndTime"
                                                        className={"form-control"}
                                                        defaultValue={
                                                            date.getFullYear() + "-" +
                                                            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
                                                            ("00" + date.getDate()).slice(-2) + "T" +

                                                            ("00" + date.getHours()).slice(-2) + ":" +
                                                            ("00" + date.getMinutes()).slice(-2)
                                                        }
                                                        required
                                                        onChange={this.setValue}
                                                    />


                                        </div>
                                        <div className="form-group">


                                                    <input name="name" type="name" className="form-control" id="name"
                                                           placeholder="Numele tău" onChange={this.setValue} required/>




                                                    <input name="phone" type="phone" className="form-control" id="phone"
                                                           placeholder="Număr de telefon" onChange={this.setValue}
                                                           required/>


                                        </div>
                                        <div className="form-group">


                                                    <select required className="person form-control" name='persons'
                                                            onChange={this.setValue} >
                                                        <option value="">Câte persoane?</option>
                                                        <option value="1">1 Persoană</option>
                                                        <option value="2">2 Persoane</option>
                                                        <option value="3">3 Persoane</option>
                                                        <option value="4">4 Persoane</option>
                                                        <option value="5">5 Persoane</option>
                                                        <option value="6">6 Persoane</option>
                                                    </select>


                                        </div>
                                        <div className="form-group">

                                                <button disabled={this.state.sending} type="submit" id="form-submit"
                                                        className="btn form-control" onClick={this.onSubmit}>Rezervă masă
                                                </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
