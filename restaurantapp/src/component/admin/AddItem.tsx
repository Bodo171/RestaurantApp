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
    }
}
export default class AddItem extends React.Component<Props, State>{
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
            }
        }
        this.setValue = this.setValue.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();

        this.setState({sending: true, error: ''});
        if (this.state.fields.image.name === 'undefined'){
            alert("Please select image!");
        }else{
            Service.addMenuItem(this.state.fields)
                .catch((error) => {
                    this.setState({error: String(error)});
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
        if("image" === inputName) fields.image = event.target.files[0];
        //this.setState(...this.state,{fields: fields});
    }

    handleFileInput(event: any){
        
    }
    /*uploadImage(event:any){
        this.setState({...this.state,
            fields{...this.state.fields, image: event.files[0]});
    }*/
    render(){
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                    <div>Add {this.props.type} item</div>
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
                            <input name="price" type="text" className="form-control" id="add-price" placeholder="Price" onChange={this.setValue} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="image" type="file" className="form-control" id="add-image" onChange={this.setValue} required/>
                        </fieldset>
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Add dish</button>
                    </div>
                </div>
            </div>
        );
    }
}
