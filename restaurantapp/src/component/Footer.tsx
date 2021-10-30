import React from "react";

export default class Footer extends React.Component {
    render(){
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <p>Copyright &copy; 2017 Victory Template</p>
                        </div>
                        <div className="col-md-4">
                            <ul className="social-icons">
                                <li><a href="/"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="/"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="/"><i className="fas fa-rss"></i></a></li>
                                <li><a href="/"><i className="fab fa-dribbble"></i></a></li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <p>Designed by <em>templatemo</em></p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
