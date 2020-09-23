import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';


class Cards extends Component {
    render() {
        const cardTitle = `card-title ${this.props.bg}`
        return (
            <>
            <Link to="/categories/1" target="_blank" className="col-lg-3">

                <ul className="c-card-item list-unstyled border">
                    <li className={cardTitle}>
                        {this.props.name}
                    </li>
                    <li className="card-info">
                        <span>
                            <span>Quizzes</span>
                            <span>5</span>
                        </span>
                        <span>
                            <span>Total Questions</span>

                            <span>12</span>
                        </span>
                    </li>
                </ul>
            </Link>
            {/* <Route path={`${this.props.match.path}/:cardID`}></Route> */}
            </>
        )
    }
}

export default Cards;