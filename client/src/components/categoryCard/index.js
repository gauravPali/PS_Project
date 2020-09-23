import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cards from './cards';
import './index.css';


class CategoryCards extends Component {
    render() {
        return (
            <>
            <Cards bg="" name="C++"/>
            <Cards bg="" name="Javascript"/>
            <Cards bg="" name="Mathematics" />
            <Cards bg="" name="Chemistry" />
            <Cards bg="" name="Operating System" />
            <Cards bg="" name="Physics" />
            <Cards bg="" name="Programming" />
            <Cards bg="" name="Astrology" />
            <Cards bg="" name="Biology" />
            </>
        )
    }
}

export default CategoryCards;