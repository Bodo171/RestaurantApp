

export default function Contact(){
    return (
        <>
            <section className="contact-us">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="section-heading">
                                <h2>Mesaj</h2>
                            </div>
                            <form id="contact" action="" method="post">
                                <div className="row">
                                    <div className="col-md-6">
                                        <fieldset>
                                            <input name="name" type="text" className="form-control" id="name" placeholder="Numele tău..." required />
                                        </fieldset>
                                        <fieldset>
                                            <input name="email" type="text" className="form-control" id="email" placeholder="Adresa de email..." required />
                                        </fieldset>
                                        <fieldset>
                                            <input name="phone" type="text" className="form-control" id="phone" placeholder="Număr de telefon..." required />
                                        </fieldset>
                                    </div>
                                    <div className="col-md-6">
                                        <fieldset>
                                            <textarea name="message" rows={6} className="form-control" id="message" placeholder="Mesajul tău..." required></textarea>
                                        </fieldset>
                                        <fieldset>
                                            <button type="submit" id="form-submit" className="btn">Trimite mesaj</button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <div className="section-heading contact-info">
                                <h2>Contact</h2>
                                <p>Ne poți contacta și la numărul de telefon 074 XXX XXXXX în intervalul orar 08.00-22.00, sau direct în mod fizic la adresa noastră de mai jos.<br/><br/><em>Strada Mihail Kogălniceanu 1,<br/> Cluj-Napoca 40000030</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="map">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="map">
                                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5465.5786125102495!2d23.591915398459673!3d46.76904932274457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490c262f3726c3%3A0xf81e049e69dfa995!2sBabes-Bolyai%20University!5e0!3m2!1sen!2sro!4v1634489220866!5m2!1sen!2sro" width="100%" height={500} style={{border:0}}></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}