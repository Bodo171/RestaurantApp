import React from "react";
import { LocalReservationType } from "../model/LocalReservation";
import Reservations from "../service/Reservations";
import Service from "../service/Service";
import {getDates, getStr} from "../util/dateUtil"

type State = {
    fields: {
        day: string;
        hour: string;
        name: string;
        phone: string;
        table_size: number;
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
                hour: '',
                name: '',
                phone: '',
                table_size: 0
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

        if("day" === inputName) fields.day = String(value);
        if("hour" === inputName) fields.hour = String(value);
        if("name" === inputName) fields.name = String(value);
        if("phone" === inputName) fields.phone = String(value);
        if("tableSize" === inputName) fields.table_size = Number(value);
        this.setState({fields: fields});
    }

    validateForm(){
        const fields = this.state.fields;
        if (fields.day === '') return "Te rog alege ziua!";
        if (fields.hour === '') return "Te rog alege ora!";
        if (fields.name === '') return "Te rog completează numele!";
        if (fields.phone === '') return "Te rog adaugă număr de telefon!";
        if (fields.table_size === 0) return "Te rog selectează numărul de persoane!";
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
        const dates = getDates()
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
                                <img src="img/book_left_image.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="right-info">
                                <h4>Rezervare</h4>
                                <span style={{ color: "red" }}>{this.state.error}</span>
                                <span style={{ color: "green" }}>{this.state.success}</span>
                                <div className="row">
                                    <form>
                                        <div className="col-md-6">
                                            <fieldset>
                                                <select required name='day' onChange={this.setValue}>
                                                    <option value="">Alege ziua</option>
                                                    {dates.map(
                                                        date => <option value={getStr(date)}>{getStr(date)}</option>
                                                    )}
                                                </select>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-6">
                                            <fieldset>
                                                <select required name='hour' onChange={this.setValue} >
                                                    <option value="">Alege ora</option>
                                                    <option value="10:00">10:00</option>
                                                    <option value="12:00">12:00</option>
                                                    <option value="14:00">14:00</option>
                                                    <option value="16:00">16:00</option>
                                                    <option value="18:00">18:00</option>
                                                    <option value="20:00">20:00</option>
                                                    <option value="22:00">22:00</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-6">
                                            <fieldset>
                                                <input name="name" type="name" className="form-control" id="name" placeholder="Numele tău" onChange={this.setValue} required />
                                            </fieldset> 
                                        </div>
                                        <div className="col-md-6">
                                            <fieldset>
                                                <input name="phone" type="phone" className="form-control" id="phone" placeholder="Număr de telefon" onChange={this.setValue} required />
                                            </fieldset>
                                        </div>
                                        <div className="col-md-6">
                                            <fieldset>
                                                <select required className="person" name='tableSize' onChange={this.setValue}>
                                                    <option value="">Câte persoane?</option>
                                                    <option value="1">1 Persoană</option>
                                                    <option value="2">2 Persoane</option>
                                                    <option value="3">3 Persoane</option>
                                                    <option value="4">4 Persoane</option>
                                                    <option value="5">5 Persoane</option>
                                                    <option value="6">6 Persoane</option>
                                                </select>
                                            </fieldset>
                                        </div>
                                        <div className="col-md-6">
                                            <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Rezervă masă</button>
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
