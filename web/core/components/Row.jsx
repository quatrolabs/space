import React from 'react'
import PropTypes from 'prop-types'

export default class Row extends React.Component {
    static get propTypes() {
        return {
            className: PropTypes.string,
            children: PropTypes.node
        }
    }

    static get defaultProps() {
        return {
            className: ''
        }
    }

    render() {
        let className = `row ${this.props.className}`
        return (
            <div className={className}>{this.props.children}</div>
        )
    }
}
