import React, { Component } from "react";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import './collection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Pagination, PageItem } from 'react-bootstrap';
import AppModal from '../utility/modal';