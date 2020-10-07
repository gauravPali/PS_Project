import React, { Component } from "react";
import { connect } from 'react-redux';
import './add.css';
import { validateQuesData } from '../../actions/questionActions';
import AlertMessage from '../utility/alert';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            options: ['', '', '', ''],
            answers: []
        }
    }

    handleFormControlChange = (e) => {
        const type = e.target.type;
        if (type === 'textarea') {
            this.setState({ [e.target.name]: e.target.value });
        } else if (type === 'text') {
            let options = this.state.options;
            options[e.target.id] = e.target.value;
            this.setState({ options })
        } else {
            let answers = this.state.answers;
            e.target.checked ? answers.push(e.target.id) : answers.pop(e.target.id);
            this.setState({ answers })
        }
    }

    saveQuestion = (e) => {
        e.preventDefault();
        const data = Object.assign({}, this.state);
        this.props.validateQuesData(data);
    }

    componentDidUpdate(prevProps, prevState) {
        debugger
        if (this.props.status === true && prevProps.id !== this.props.id) {
            this.setState({
                body: '',
                options: ['', '', '', ''],
                answers: [],
            })
        }
    }

    render() {
        const { body, options, answers } = this.state;
        console.log(this.state.alertState);
        const { loader, errors, message, status } = this.props;
        return (
            <>
                {status !== null && <AlertMessage status={status} message={message} errors={errors} changeState={this.handleAlertState} classProp={'mt-2 p-2 validation-error'} />}
                <form id="add-question" className="form-horizontal add-question overflow-auto pt-3" onSubmit={(e) => this.saveQuestion(e)}>
                    <div className="d-flex">
                        <label>Body</label>
                        <textarea className="form-control app-form-control" name="body" id="body" placeholder="Enter question" value={body} onChange={(e) => this.handleFormControlChange(e)} />
                    </div>
                    <div className="d-flex">
                        <label>Options</label>
                        <div>
                            <input type="text" name="options" id="0" className="form-control app-form-control mb-2" placeholder="Option A" value={options[0]} onChange={(e) => this.handleFormControlChange(e)} />
                            <input type="text" name="options" id="1" className="form-control app-form-control mb-2" placeholder="Option B" value={options[1]} onChange={(e) => this.handleFormControlChange(e)} />
                            <input type="text" name="options" id="2" className="form-control app-form-control mb-2" placeholder="Option C" value={options[2]} onChange={(e) => this.handleFormControlChange(e)} />
                            <input type="text" name="options" id="3" className="form-control app-form-control mb-2" placeholder="Option D" value={options[3]} onChange={(e) => this.handleFormControlChange(e)} />
                        </div>
                    </div>
                    <div className="d-flex">
                        <label>Answer(s)</label>
                        <div>
                            <label className="mr-2 mb-0">
                                <input type="checkbox" name="answers" id="0" checked={(answers.length && answers.includes('0')) && true} onChange={(e) => this.handleFormControlChange(e)} />
                                    &nbsp;A
                                </label>
                            <label className="mr-2 mb-0">
                                <input type="checkbox" name="answers" id="1" checked={(answers.length && answers.includes('1')) && true} onChange={(e) => this.handleFormControlChange(e)} />
                                    &nbsp;B
                                </label>
                            <label className="mr-2 mb-0">
                                <input type="checkbox" name="answers" id="2" checked={(answers.length && answers.includes('2')) && true} onChange={(e) => this.handleFormControlChange(e)} />
                                    &nbsp;C
                                </label>
                            <label className="mb-0">
                                <input type="checkbox" name="answers" id="3" checked={(answers.length && answers.includes('3')) && true} onChange={(e) => this.handleFormControlChange(e)} />
                                    &nbsp;D
                                </label>
                        </div>
                    </div>
                    <button type="submit" className="btn app-btn-primary float-right" disabled={loader}>Add</button>
                </form>
            </>
        )
    }
}

const mapStateToProps = state => {
    const { loader, errors, message, status, id } = state.question;
    return { loader, errors, message, status, id }
}

export default connect(mapStateToProps, { validateQuesData })(AddQuestion);
