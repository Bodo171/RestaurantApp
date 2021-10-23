import React from "react";

type Props = {
    title: string;
    body: string;
};

type State = {

};

export default class HeaderBar extends React.Component<Props, State>{

    render(){
        return (
            <section className="page-heading">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        <h1>{this.props.title}</h1>
                        <p>{this.props.body}</p>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
    
}