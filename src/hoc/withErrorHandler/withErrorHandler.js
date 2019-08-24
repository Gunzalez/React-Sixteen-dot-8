import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use((request) => {
                this.setState({ error: null })
                return request
            })
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({ error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        cancelModalHandler = () => {
            this.setState({ error: null })
        }

        render(){

            const { error } = this.state;

            return (
                <Aux>
                    <Modal show={error} cancelModal={this.cancelModalHandler}>
                        { error ? error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            )
        } 
    }
};

export default withErrorHandler;