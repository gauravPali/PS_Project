import React, { Component } from "react";
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table'
import './collection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Pagination, PageItem, Toast } from 'react-bootstrap';
import AppModal from '../utility/modal';
import ToastMsg from '../utility/toast';
import { getQuestions, toggleQuestion, clearToggleData } from '../../actions/questionActions';

class QuestionBank extends Component {
    state = {
        isModal: false,
        currPage: 1
    }

    componentDidMount() {
        this.props.getQuestions(this.state.currPage);
    }

    handleModal = () => {
        this.setState({ isModal: !this.state.isModal })
    }

    changePage = (e, nextPage) => {
        this.setState({ currPage: nextPage })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.currPage !== this.state.currPage) {
            this.props.getQuestions(this.state.currPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.toggle !== null) {
            setTimeout(() => {
                this.props.clearToggleData();
            }, 5000);
        }
    }

    componentWillUnmount() {
        if (this.props.toggle !== null) {
            this.props.clearToggleData();
        }
    }

    render() {
        const { loader, count, questions, fetchStatus, toggle, toggleId, toggleStatus, toggleMessage } = this.props;
        const getPages = (count, currPage) => {
            const offSet = 3;
            const pageMaxVal = Math.floor(count / offSet) + (count % offSet ? 1 : 0);
            return Array(pageMaxVal).fill(1).map((val, index) => (
                <Pagination.Item key={1 + index} active={(1 + index) === currPage && true} onClick={(e) => this.changePage(e, (1 + index))}>
                    {1 + index}
                </Pagination.Item>
            ))
        }

        if (loader) {
            return <p>Loading Data</p>
        }

        if (!count) {
            return <p>No Questions Found</p>
        }

        return (
            <>
                {(toggle === false && toggleStatus !== null) && <ToastMsg body={toggleMessage} toastClass={`toggle-error app-bg-primary`} />}
                <Table bordered className="mt-3">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Question</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questions.map((question, i) => (
                                <tr key={question._id}>
                                    <td>{1 + i}</td>
                                    <td>{question.body}</td>
                                    <td>
                                        <FontAwesomeIcon className="cursor-pointer text-secondary" title="Update Question" icon={faEdit} onClick={this.handleModal} />
                                        <FontAwesomeIcon className={`cursor-pointer ${question.isActive ? 'text-primary' : 'text-danger'}`} title={question.isActive ? 'Disable Question' : 'Enable Question'}
                                            icon={(toggle && toggleId === question._id) ? faSpinner : faMinusCircle}
                                            onClick={(e) => this.props.toggleQuestion({ id: question._id, isActive: question.isActive })} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination className="mb-0 d-flex justify-content-end">
                    {getPages(count, this.state.currPage)}
                </Pagination>
                <AppModal showModal={this.state.isModal} hideModal={this.handleModal} />
            </>
        )
    }
}

const mapStateToProps = state => {
    const { loader, count, questions, fetchStatus, toggle, toggleId, toggleStatus, toggleMessage } = state.question;
    return { loader, count, questions, fetchStatus, toggle, toggleId, toggleStatus, toggleMessage };
}

export default connect(mapStateToProps, { getQuestions, toggleQuestion, clearToggleData })(QuestionBank);
