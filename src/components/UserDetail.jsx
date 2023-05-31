import React, { Component } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UsersService from "../services/UsersService";

const propertiesArray = ['email', 'nom', 'prenom', 'adresseLigne1', 'adresseLigne2', 'codePostal', 'ville', 'roles']

class UserDetail extends Component {

constructor(props) {
    super(props)
    this.state = {
        email: '',
        nom: '',
        prenom: '',
        adresseLigne1: '',
        adresseLigne2: null,
        codePostal:'',
        ville:''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
}

componentDidMount() {
    const { email } = this.props.match.params;
    UsersService.retrieveUser(email)
        .then(response => {
            console.log(response.data);
            this.setState({
                email: response.data.email,
                nom: response.data.nom,
                prenom: response.data.prenom,
                adresseLigne1: response.data.adresseLigne1,
                adresseLigne2: response.data.adresseLigne2,
                codePostal: response.data.codePostal,
                ville: response.data.ville,
                password: response.data.password,
            })
        })
}

validate(values) {
    let errors = {}
    propertiesArray.map(elt => {
        if(!values[elt]) {
            errors[elt] = "Entrez une valeur"
        }
    })
    return errors
}

onSubmit(values) {
    console.log(values);
    let user = {
        email: values.email,
        nom: values.nom,
        prenom: values.prenom,
        adresseLigne1: values.adresseLigne1,
        adresseLigne2: values.adresseLigne2,
        codePostal: values.codePostal,
        ville: values.ville,
    }
    UsersService.updateUser(this.state.id, user)
        .then(()=> this.props.history.push('/user'))
}

    render() {
        let { email, nom, prenom, adresseLigne1, adresseLigne2, codePostal, ville } = this.state
        return(
            <div className="container">
                <Formik
                    initialValues={{ email, nom, prenom, adresseLigne1, adresseLigne2, codePostal, ville}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                {propertiesArray.map(elt => {
                                    return(
                                        <fieldset className="form-group" key={elt}>
                                            <label>{elt.charAt(0).toUpperCase() + elt.slice(1)}</label>
                                            <Field className="form-control" type="text" name={elt} value={this.state[elt]} onChange={(e) => this.setState({ [elt]: e.target.value })} />
                                        </fieldset>
                                    )
                                })}
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        )
    }
}

export default UserDetail