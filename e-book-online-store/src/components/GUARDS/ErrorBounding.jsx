/* eslint-disable react/prop-types */
import { Component } from 'react';
import styles from "../GUARDS/ErrorBounding.module.css"


export default class ErrorBoundary extends Component {
    
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {

        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('React info for crash: ', info);
        console.error('React ErrorBoundary message: ', error);
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                <section className={styles.boundingErr}>
                    <div >
                        <h2>ГРЕШКА</h2>
                   <a href="/"><button >Върни се обратно</button></a>
                </div>
                </section>
                </>
            );
        }
     
        return this.props.children;
    }
}



