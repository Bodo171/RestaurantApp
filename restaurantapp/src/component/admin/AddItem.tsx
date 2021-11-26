import React from "react";
import {DishType, emptyMenu} from "../../util/util";
import {FoodItem} from "../../model/FoodItem";
import Item from "./Item";
import Service from "../../service/Service";

type Props = {
    type: DishType;
    updateCallback: () => void;
}
type State = {
    sending: boolean,
    error: string,
    fields: {
        name: string;
        description: string;
        price: number;
        category: string;
        image: File;
    },
    inputImage: string
}
export default class AddItem extends React.Component<Props, State>{
    fileInput: HTMLInputElement|null = null;

    constructor(props:any){
        super(props);
        this.state = {
            sending: false,
            error: '',
            fields: {
                name: '',
                description: '',
                price: 0,
                category: props.type,
                image: new File([], 'undefined'),
            },
            inputImage: '/img/placeholder.jpg'
        }
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();

        this.setState({sending: true, error: ''});
        if (this.state.fields.image.name === 'undefined'){
            this.setState({sending: false, error: 'Please select an image'});
        }else{
            Service.addMenuItem(this.state.fields)
                .catch((error) => {
                    this.setState({error: String(error), sending: false});
                })
                .finally(() => {
                    this.setState({sending: false});
                    this.props.updateCallback()
                });
        }
    }

    setValue(event:any){
        const inputName = event.target.name;
        const value = event.target.value;
        let fields = this.state.fields;

        if("name" === inputName) fields.name = String(value);
        if("description" === inputName) fields.description = String(value);
        if("price" === inputName) fields.price = Number(value);
        if("image" === inputName){
            fields.image = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                if (ev.target) this.setState({inputImage: String(ev.target.result)});
            }
            if (fields.image.name !== 'undefined') reader.readAsDataURL(fields.image);
            
        }
        
        //this.setState(...this.state,{fields: fields});
    }
    render(){
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                    <label>Add {this.props.type} item</label>
                    <div>
                        <fieldset>
                            <input name="name" type="text" className="form-control" id="add-name" placeholder="Name" onChange={this.setValue} required />
                        </fieldset>
                    </div>
                    <div >
                        <fieldset>
                            <input name="description" type="text" className="form-control" id="add-description" placeholder="Description" onChange={this.setValue} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="price" type="text" className="form-control" id="add-price" placeholder="Price" onChange={this.setValue} required /> <br/>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            {this.state.fields.image.name === 'undefined' &&
                                <span>Click pe imagine pentru a adauga</span>
                            }
                            <input ref={input => this.fileInput = input} name="image" type="file" accept="image/*" className="form-control" style={{display: 'none'}} id="add-image" onChange={this.setValue} required/> 
                        </fieldset>
                    </div>
                    <div>
                        <img src={this.state.inputImage} className="img-btn" alt="bad" onClick={() => {if (this.fileInput) this.fileInput.click()}}></img>
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <button disabled={this.state.sending} type="submit" id="form-submit" className="btn btn-success" onClick={this.onSubmit}>Add dish</button>
                    </div>
                </div>
            </div>
        );
    }
}
