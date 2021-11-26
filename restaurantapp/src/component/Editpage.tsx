import React from "react";
import useParams from "react-router-dom"
import Service from "../service/Service";
import {Menu} from "../model/Menu";
import CreateOwlCarousels from "../scripts/owlcarousel";
import {DishType, dishTypeFromString, emptyMenuItem} from "../util/util";
import ItemList from "./admin/ItemList";
import DisplaySelect from "./admin/DisplaySelect";
import AddItem from "./admin/AddItem";
import {FoodItem} from "../model/FoodItem";
import { RouteComponentProps } from 'react-router';
import EditItem from "./admin/EditItem";


interface EditpageProps{
    id?: string;
}

type State = {
    loading: boolean;
    sending: boolean;
    fields: {
        id: number;
        name: string;
        description: string;
        price: number;
    }
}
export default class Editpage extends React.Component<EditpageProps,State>{
    constructor(props:any){
        super(props);
        this.state = {
            loading: true,
            sending: false,
            fields: {
                id: 0,
                name: '',
                description: '',
                price: 0,
            }
        }
        this.goBack = this.goBack.bind(this);
    }


    componentDidMount() {
        let id = +(this.props.id || '0');
        Service.getMenuItem(id).then((menuItem: FoodItem) => {
            this.setState({...this.state, fields: menuItem, loading: false});
            CreateOwlCarousels();
        }).catch((error:any) => {
            alert(error);
        });
    }
    goBack(){
        window.location.href = '/admin'
    }
    render(){
        return (
            <EditItem id={this.state.fields.id}
                      name={this.state.fields.name}
                      description={this.state.fields.description}
                      price={this.state.fields.price}
                      updateCallback={this.goBack}

            />
        )
    }
}
