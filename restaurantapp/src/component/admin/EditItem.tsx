import React from "react";
<<<<<<< HEAD
import {DishType, dishTypeFromString, emptyMenu} from "../../util/util";
import {FoodItem} from "../../model/FoodItem";
import Item from "./Item";
import Service from "../../service/Service";
import DisplaySelect from "./DisplaySelect";
=======
import {FoodItem} from "../../model/FoodItem";
import Service from "../../service/Service";
import CreateOwlCarousels from "../../scripts/owlcarousel";
import {DishType, emptyMenuItem} from "../../util/util";
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c

type Props = {
    updateCallback: () => void;
    id: number;
<<<<<<< HEAD
    name: string;
    description: string;
    price: number;
=======
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
}
type State = {
    sending: boolean,
    error: string,
<<<<<<< HEAD
    fields: FoodItem
=======
    fields?: {
        id: number,
        name: string;
        description: string;
        price: number;
    };
    loading: boolean;
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
}
export default class EditItem extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
<<<<<<< HEAD
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
=======
        console.log("props", props);
        this.state = {
            sending: false,
            loading: true,
            error: '',
        }
        console.log("rendered", this.state.fields)
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        let id = +(this.props.id || '0');
        Service.getMenuItem(id).then((menuItem: FoodItem) => {
            this.setState({...this.state, fields: {id: menuItem.id,
                    name: menuItem.name,
                    description: menuItem.description,
                    price: menuItem.price
                },
                    loading: false});
            CreateOwlCarousels();
        }).catch((error:any) => {
            alert(error);
        });
    }

    onSubmit(event: any){
        event.preventDefault();
        event.stopPropagation();
        this.setState({sending: true, error: ''});
        console.log(this.state.fields);
        if(this.state.fields) {
            Service.updateMenuItem(this.state.fields)
                .catch((error) => {
                    this.setState({error: String(error)});
                })
                .finally(() => {
                    this.setState({sending: false});
                    if (this.state.error == '')
                        this.props.updateCallback();
                });
        }
    }
    setValue(event:any){
        console.log(this.state);
        if(!this.state.fields){
            return;
        }
        const inputName = event.target.name;
        const value = event.target.value;
        let fields = this.state.fields;
        if("name" === inputName) fields.name = String(value);
        if("description" === inputName) fields.description = String(value);
        if("price" === inputName) fields.price = Number(value);
        this.setState({...this.state,fields: fields});
    }
    render(){
        console.log("price", this.props, this.state.fields);
        return (
            <div>
                {this.state.fields && (
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                    <div>Update item</div>
                    <div>
                        <fieldset>
<<<<<<< HEAD
                            <input name="name" type="text" className="form-control" id="update-name" placeholder="Name" onChange={this.setValue} required />
                        </fieldset>
                    </div>
                    <div >
                        <fieldset>
                            <input name="description" type="text" className="form-control" id="update-description" placeholder="Description" onChange={this.setValue} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="price" type="text" className="form-control" id="update-price" placeholder="Price" onChange={this.setValue} required />
=======
                            <input name="name" type="text" className="form-control" id="update-name" placeholder="Name" onChange={this.setValue} defaultValue={this.state.fields.name} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="price" type="text" className="form-control" id="update-price" placeholder="Price" onChange={this.setValue} defaultValue={this.state.fields.price} required/>
                        </fieldset>
                    </div>
                    <div >
                        <fieldset>
                            <input name="description" type="text" className="form-control" id="update-description" placeholder="Description" onChange={this.setValue} defaultValue={this.state.fields.description} required />
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
                        </fieldset>
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Update dish</button>
                    </div>

<<<<<<< HEAD
                </div>
            </div>
        );
    }
=======
                </div>)}
            </div>
        );
    };
>>>>>>> a0b7519262afd9739e135e451c489d74b6693a0c
}
