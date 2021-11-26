import React from "react";
import {FoodItem} from "../../model/FoodItem";
import Service from "../../service/Service";
import CreateOwlCarousels from "../../scripts/owlcarousel";
import {DishType, emptyMenuItem} from "../../util/util";

type Props = {
    updateCallback: () => void;
    id: number;
}
type State = {
    sending: boolean,
    error: string,
    fields?: {
        id: number,
        name: string;
        description: string;
        price: number;
        image: File;
    };
    loading: boolean;
    inputImage: string;
}
export default class EditItem extends React.Component<Props, State>{
    constructor(props:any){
        super(props);
        console.log("props", props);
        this.state = {
            sending: false,
            loading: true,
            error: '',
            inputImage: '/img/placeholder.jpg'
        }
        console.log("rendered", this.state.fields)
        this.setValue = this.setValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        let id = +(this.props.id || '0');
        Service.getMenuItem(id).then((menuItem: FoodItem) => {
            console.log(menuItem);
            this.setState({...this.state, fields: {id: menuItem.id,
                    name: menuItem.name,
                    description: menuItem.description,
                    price: menuItem.price,
                    image: new File([], 'undefined')
                },
                    loading: false,
                    inputImage: menuItem.image || '/img/placeholder.jpg'});
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
                    if (this.state.error === '')
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
        if("image" === inputName) {
            fields.image = event.target.files[0];
            let reader = new FileReader();
            reader.onload = (ev: ProgressEvent<FileReader>) => {
                if (ev.target) this.setState({inputImage: String(ev.target.result)});
            }
            reader.readAsDataURL(fields.image);
        }
        this.setState({...this.state,fields: fields});
    }
    render(){
        console.log("price", this.props, this.state.fields);
        return (
            <div>
                {this.state.fields && (
                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                    <span style={{marginTop: '10px', color: "red" }}>{this.state.error}</span>
                    <div>Update item</div>
                    <div>
                        <fieldset>
                            <input name="name" type="text" className="form-control" id="update-name" placeholder="Name" onChange={this.setValue} defaultValue={this.state.fields.name} required />
                        </fieldset>
                    </div>
                    <div >
                        <fieldset>
                            <input name="description" type="text" className="form-control" id="update-description" placeholder="Description" onChange={this.setValue} defaultValue={this.state.fields.description} required />
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="price" type="text" className="form-control" id="update-price" placeholder="Price" onChange={this.setValue} defaultValue={this.state.fields.price} required/>
                        </fieldset>
                    </div>
                    <div>
                        <fieldset>
                            <input name="image" type="file" accept="image/*" className="form-control" id="add-image" onChange={this.setValue} required/> 
                        </fieldset>
                    </div>
                    <div>
                        <img src={this.state.inputImage} alt="bad" style={{maxWidth: '400px', maxHeight: '400px'}}/>
                    </div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <button disabled={this.state.sending} type="submit" id="form-submit" className="btn" onClick={this.onSubmit}>Update dish</button>
                    </div>

                </div>)}
            </div>
        );
    };
}
