import React from "react";
import { Redirect } from 'react-router';
import EditItem from "./admin/EditItem";


interface EditpageProps{
    id?: string;
}

type State = {
    redirect: boolean;
}
export default class Editpage extends React.Component<EditpageProps,State>{
    constructor(props:any){
        super(props);
        this.state = {
            redirect: false
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack(){
        this.setState({redirect: true});
    }
    render(){
        if (this.state.redirect){
            return <Redirect to='/admin'/>
        }
        return (
            <EditItem id={+(this.props.id||'0')}
                      updateCallback={this.goBack}

            />
        )
    }
}
