import PropTypes from 'prop-types';
import { Component } from 'react';



class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      console.error('Error caught by Error Boundary:', error);
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.log("Error: ", error);
      console.log("Error Info: ", errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong. Please try again later.</h1>;
      }
  
      return this.props.children; 
    }
  }
  
  // PropTypes validation for the children prop
  ErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export default ErrorBoundary;
  