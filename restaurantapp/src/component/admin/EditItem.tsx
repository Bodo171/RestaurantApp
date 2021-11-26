import React from "react";
import {DishType, dishTypeFromString, emptyMenu} from "../../util/util";
import {FoodItem} from "../../model/FoodItem";
import Item from "./Item";
import Service from "../../service/Service";
import DisplaySelect from "./DisplaySelect";

type Props = {
    updateCallback: () => void;
    id: number;
    name: string;
    description: string;
    price: number;
}
type State = {
    sending: boolean,
    error: string,
    fields: FoodItem
}
export default class EditItem extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        console.log(props);
        this.state = {
            sending: false,
            error: '',
            fields: {
                id: props.id,
                name: props.name,
                description: props.default,
                price: props.price,
                //image: null,
            }
        }
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();

        this.setState({sending: true, error: ''});
        Service.updateMenuItem(this.state.fields)
            .catch((error) => {
                this.setState({error: String(error)});
            })
            .finally(() => {
                this.setState({sending: false});
                this.props.updateCallback();
            });
    }
    setValue(event:any){
        const inputName = event.target.name;
        const value = event.target.value;
        let fields = this.state.fields;

        if("name" === inputName) fields.name = String(value);
        if("description" === inputName) fields.description = String(value);
        if("price" === inputName) fields.price = Number(value);
        //this.setState(...this.state,{fields: fields});
    }
    render(){
        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                    <div>Update item</div>
                    <div>
                        <fieldset>
                            <input name="name" type="text" className="form-control" id="update-name" placeholder="Name" onChange={this.setValue} defaultValue={this.props.name} required />
                        </fieldset>
                    </div>
                    <div >
                        <fieldset>
                            <input name="description" type="text" className="form-control" id="update-description" placeholder="Description" onChange={this.setValue} defaultValue={this.props.description} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="price" type="text" className="form-control" id="update-price" placeholder="Price" onChange={this.setValue} defaultValue={this.props.price} required />
                        </fieldset>
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Update dish</button>
                    </div>

                </div>
            </div>
        );
    }
}
