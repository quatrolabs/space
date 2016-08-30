import React from 'react'

import Row from '../../core/components/row.jsx'
import Columns from '../../core/components/columns.jsx'

import UserStore from '../stores/users'
import UsersActions from '../actions/users'

export default class Applications extends React.Component {
    constructor() {
        super()
        this.state = {loading: true}
        this._updateFromStore = this._updateFromStore.bind(this)
        this._applications = this._applications.bind(this)
    }

    componentDidMount() {
        UserStore.addChangeListener(this._updateFromStore)
        UsersActions.fetchActiveClients()
    }

    render() {
        if (this.state.loading) {
            return (
                <Row>
                    <Columns className="large-offset-1 large-10 end">
                        <p className="text-center">Loading...</p>
                    </Columns>
                </Row>
            )
        }
        return (
            <Row>
                <Columns className="large-offset-1 large-10 end">
                    <Row className="applications">
                        {this._applications()}
                    </Row>
                </Columns>
            </Row>
        )
    }

    _applications() {
        if (this.state.loading) {
            return []
        }

        let applications = []
        for (var i = 0; i < this.state.clients.length; i++) {
            let client = this.state.clients[i]
            applications.push(
                <Columns className="medium-12" key={i}>
                    <div className="application-card">
                        <p className="title">{client.name} <small>(<a href={client.uri} target="_blank">{client.uri.split(/:\/\//)[1]}</a>)</small></p>
                        {/* <p className="action"><button className="button" onClick={this._revokeAccess.bind(client)}>Revoke Access</button></p> */}
                        <p className="scope">{client.description}</p>
                        <p className="last-access"><em>Last access:</em> ?</p>
                    </div>
                </Columns>
            );
        }
        return applications;
    }

    _revokeAccess(e) {
        e.preventDefault()
        UsersActions.revokeActiveClient(this.id)
    }

    _updateFromStore() {
        if (UserStore.success()) {
            let state = Object.assign({}, UserStore.getState().payload || {}, {loading: false})
            this.setState(state)
        }
    }
}
