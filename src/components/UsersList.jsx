import React, { Component } from "react"
import UsersService from "../services/UsersService";

class UsersList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            message: null,
            error: false,
        }
        this.refreshUsers = this.refreshUsers.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.addUserClicked = this.addUserClicked.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UsersService.retrieveAllUsers()
            .then(
                response => {
                    this.setState({ users: response.data})
                }
            )
            .catch(error => {
                this.setState({ error: true })
            })
    }

    deleteUserClicked(email) {
        UsersService.deleteUser(email)
            .then(
                response => {
                    this.setState({ message: `Delete of user ${email} successful` })
                    this.refreshUsers()
                }
            )
            .catch(error => {
                this.setState({ error: true })
            })
    }

    updateUserClicked(email) {
        console.log('update : '+ email)
        this.props.history.push(`/user/${email}`)
    }

    addUserClicked() {
        this.props.history.push(`/user/-1`)
    }

    render() {
        if(this.state.error) {
            this.props.history.push(`/access-denied`)
        }
        return (
            <div className="container">
                <h3>All users</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Adresse ligne 1</th>
                                <th>Adresse ligne 2</th>
                                <th>CP</th>
                                <th>Ville</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.users.map(
                                    user =>
                                    <tr key={user.email}>
                                        <td>{user.email}</td>
                                        <td>{user.nom}</td>
                                        <td>{user.prenom}</td>
                                        <td>{user.adresseLigne1}</td>
                                        <td>{user.adresseLigne2 ? user.adresseLigne2 : null}</td>
                                        <td>{user.cp}</td>
                                        <td>{user.ville}</td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.email)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.updateUserClicked(user.email)}>Update</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addUserClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default UsersList