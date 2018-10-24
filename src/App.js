import React from 'react';
import './App.css';
import Button from './Button.js';
import Display from './CalcDisplay';

class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      display: '0',   // represents the state of the display of the calculator
      value: 0,       // contains any value stored in memory for pending operation
      operation: '',  // contains the pending operation
      hasEnteredValue: false  // logs whether the user has entered a numeric value or not for the pending operation
    }
  }

  // handles click of any button on calculator
  handleClick(button){
    
  /************** HANDLE DIGIT AND DECIMAL PLACE INPUT  ******************************/

    if(parseFloat(button) || button === '0' || button === '.'){   // only acceptable values are integers and decimal points
      if(parseFloat(button) || button === '0'){   // handle integers
        this.display(button);
      } else{
        if(this.state.display.indexOf('.') === -1)  // if decimal point has not been entered previously
          this.display(button);
      }
    }

  /*********************** HANDLE OPERATOR INPUT **************************************/
    switch(button){
      case 'x':
      case '/':
      case '+':
      case '-':
      case '=':
        this.operation(button);
        this.setState({
          hasEnteredValue: false
        });
        break;
      case '+/-':
        this.negate();
        break;
      case '%':
        this.percentage();
        break;
      default: 
        break;
    }
  }

  // handles operator input
  operation(operator){
    


    // object containing all operations
    const operations = {
      '/' : (x,y) =>{return x/y;}, // division operation
      'x' : (x,y) =>{return x*y;}, // multiplication operation
      '+' : (x,y) =>{return x+y;}, // addition operation
      '-' : (x,y) =>{return x-y;}, // subtraction operation
      '=' : () => {return this.state.value}
    }

    if(this.state.hasEnteredValue && this.state.operation !== ''){ // if a value has been entered by the user and operation has been set
      const x = this.state.value; // stored value
      const y = parseFloat(this.state.display); // second value input for operation
      let z = operations[this.state.operation](x,y);
      if(z.toString().length > 9){
        z = 1*z.toExponential();
      }
        
      this.setState({   // display result on screen and store new value
        display: z.toPrecision(5).toString(),
        value: z,
        operation: operator
      })
    } else {
      this.store();
      this.setState({
        operation: operator,
      });
    }
  }

  display(newDisplay) { // handles display of user input   
    
    if(this.state.display.length < 9){
      if(!this.state.hasEnteredValue){  // if the user has not entered a value yet
        this.setState({display: newDisplay});
        this.setState({
          hasEnteredValue: true
        });
      } else  { // if a value has been entered
        this.setState({display: this.state.display + newDisplay});  // append to display
      }
    } else if(this.state.display.length >= 9 && this.state.hasEnteredValue) {
      let tmp = this.state.display;
      this.setState({
        display: "too many"
      });
      setTimeout(() => {
        this.setState({
          display: tmp
        });
      }, 700);
    } else if (this.state.display.length >= 9 && !this.state.hasEnteredValue){
      this.setState({display: newDisplay});
        this.setState({
          hasEnteredValue: true
      });
    }
     
  }

  store(){  // parses user input (string) and stores it as floating point number 
    const x = parseFloat(this.state.display);
    this.setState({
      value: x
    });
  }

  clear(){      // clears the screen
    this.setState({
      display: '0', 
      value: 0,    
      operation: '', 
      hasEnteredValue: false  
    })
  }

  negate(){
    let display = '';
    if(this.state.display.indexOf('-') === -1){
      display = '-' + this.state.display;
      this.setState({
        display: display
      });
    } else {
      display = this.state.display.slice(1);
      this.setState({
        display: display
      })      
    }
      
    
    this.setState()
  }

  percentage() {
    let temp =  parseFloat(this.state.display) / 100;
        temp = temp.toString();
        this.setState({
          display: temp
        });
  }


  render() {

    return (
      <div className="calculator">
        <div className="display">
          <Display className="display-text" value ={this.state.display}/>
        </div>
        <div className = "row">
          <Button operation={this.handleClick.bind(this, '7')} value={'7'}/>
          <Button operation={this.handleClick.bind(this, '8')} value={'8'}/>
          <Button operation={this.handleClick.bind(this, '9')} value={'9'}/>
          <Button className="operator" operation={this.handleClick.bind(this, 'x')} value={'x'}/>
        </div>
        <div className = "row">
          <Button operation={this.handleClick.bind(this, '4')} value={'4'}/>
          <Button operation={this.handleClick.bind(this, '5')} value={'5'}/>
          <Button operation={this.handleClick.bind(this, '6')} value={'6'}/>
          <Button className="operator" operation={this.handleClick.bind(this, '/')} value={'/'}/>
        </div>  
        <div className = "row">
          <Button operation={this.handleClick.bind(this, '1')} value={'1'}/>
          <Button operation={this.handleClick.bind(this, '2')} value={'2'}/>
          <Button operation={this.handleClick.bind(this, '3')} value={'3'}/>
          <Button className="operator" operation={this.handleClick.bind(this, '+')} value={'+'}/>
        </div>
        <div className = "row">
          <Button operation={this.handleClick.bind(this, '0')} value={'0'}/>
          <Button operation={this.handleClick.bind(this, '.')} value={'.'}/>
          <Button operation={this.handleClick.bind(this, '+/-')} value={'+/-'}/>
          <Button className="operator" operation={this.handleClick.bind(this, '-')} value={'-'}/>
        </div>
        <div className="row bottom-row">
          <Button className="AC" operation={this.clear.bind(this)} value={'AC'}/>
          <Button className="operator" operation={this.handleClick.bind(this, '%')} value={'%'}/>
          <Button className="operator" operation={this.handleClick.bind(this, '=')} value={'='}/>
        </div>
      </div>
    );
  }
}

export default Calculator;