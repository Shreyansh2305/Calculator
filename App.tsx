import * as React from 'react';
import './style.css';
<link href="https://allfont.net/allfont.css?fonts=digital-7" rel="stylesheet" type="text/css" />

const btn=[{key: 'AC',value:{
  key:'AC',
  class: 'jumbo',
  id: 'clear'
}},
{key: '/',value:{
  key:'/',
  class: '',
  id: 'divide'
}},
{key: 'x',value:{
  key:'x',
  class: '',
  id: 'multiply'
}},
{key: '7',value:{
  key:'7',
  class: '',
  id: 'seven'
}},
{key: '8',value:{
  key:'8',
  class: '',
  id: 'eight'
}},
{key: '9',value:{
  key:'9',
  class: '',
  id: 'nine'
}},
{key: '-',value:{
  key:'-',
  class: '',
  id: 'substract'
}},
{key: '4',value:{
  key:'4',
  class: '',
  id: 'four'
}},
{key: '5',value:{
  key:'5',
  class: '',
  id: 'five'
}},
{key: '6',value:{
  key:'6',
  class: '',
  id: 'six'
}},
{key: '+',value:{
  key:'+',
  class: '',
  id: 'addition'
}},
{key: '1',value:{
  key:'1',
  class: '',
  id: 'one'
}},
{key: '2',value:{
  key:'2',
  class: '',
  id: 'two'
}},
{key: '3',value:{
  key:'3',
  class: '',
  id: 'three'
}},
{key: '0',value:{
  key:'0',
  class: 'jumbo',
  id: 'zero'
}},
{key: '.',value:{
  key:'.',
  class: '',
  id: 'decimal'
}},
{key: '=',value:{
  key:'=',
  class: '',
  id: 'equals'
}}]


function Buttons(props) {
  return(
    <button className={props.class} id={props.id} value={props.value} onClick={props.onClick}>{props.value}</button>
  )
}

export default function App() {

  const [display,setDisplay] = React.useState('');
  const [res,setRes] = React.useState(0);
  const [arg , setArg] = React.useState('');
  const [operator, setOpt] = React.useState('');

  // const handleKeyPress = React.useCallback((event) => {
  //   let value=event.target.value;
  //   console.log(display);
  //   // console.log('valv'+value);
  //   // console.log(display+value);
  //   setDisplay(display+value);
  // }, []);

  // React.useEffect(() => {
  //   document.addEventListener('click', handleKeyPress);

  //   return () => {
  //     document.removeEventListener('click', handleKeyPress);
  //   };
  // }, [handleKeyPress]);

  React.useEffect(() => {
    console.log('Result', res);
  }, [res])

  function calculate(display){

  }

  let priority = function(operator) {
    switch(operator)
    {
        case '+':
        case '-':
            return(1);
        case 'x':
        case '/':
            return(2);
        case '^':
            return(3);
        default:
            return(-1);
    }
  }
  let calculateValue = function(num1, operator, num2) {
    switch(operator)
    {
        case '+':
            return(num1+num2);
        case '-':
            return(num1-num2);
        case 'x':
            return(num1*num2);
        case '/':
            return(num1/num2);
    }
  }
  let convertToPostfix = function(infix){
    let operators = [];
    let postfix = '';
    for(let i = 0; i < infix.length; i++) {
        if((infix[i] >= '0' && infix[i] <= '9') || infix[i] == '.' ){
            postfix += infix[i];
        }
        else {
            postfix += ' ';
            if(operators.length === 0) {
                operators.push(infix[i]);
            } 
            else {
                if(priority(infix[i]) > priority(operators[operators.length - 1])) {
                    operators.push(infix[i]);
                }
                else {
                    while(!(operators.length === 0) && priority(infix[i]) <= priority(operators[operators.length - 1])) {
                        let ch = operators[operators.length - 1];
                        operators.pop();
                        postfix += ch;
                    }
                    operators.push(infix[i]);
                }
            }
        }
    }
    postfix += ' ';
    while(!(operators.length === 0)) {
        let ch = operators[operators.length - 1];
        postfix += ch;
        operators.pop();
    }
    return(postfix);
  }

  let postfix_evaluation = function(postfix) {
    let answer = [], n, result;
    for(let i = 0; i < postfix.length; i++) {
        if((postfix[i] >= '0' && postfix[i] <= '9') || postfix[i] == '.') {
          let number = '';
            while(postfix[i] != ' ') {
                number += postfix[i];
                i++;
            }
            n = parseFloat(number);
            answer.push(n);    
        }
        else {
            if(answer.length < 2) {
                result = 'NAN';
                return(result);
            } else {
                let num2 = answer[answer.length - 1];
                answer.pop();
                let num1 = answer[answer.length - 1];
                answer.pop();
                result = calculateValue(num1, postfix[i], num2);
                answer.push(result);
            }
        }
    }
    let finalAns = answer[answer.length - 1];
    answer.pop();
    if(answer.length === 0) {
        return(finalAns);
    } else {
        return('NAN');
    }
  }

  function handleCLick(event){
    let input=event.target.value;
    let regex= new RegExp(/^[0-9]*$/);
  //  if(regex.test(input)||input=='.'){
  //   setDisplay(display+input);
  //   setArg(arg+input);console.log(arg);
  //  }
  // //  else if(input=='.')
  // //   display.substring(display.length-1)!='.'?setArg(arg+input):console.log('hi');
  //  else if(input=='AC'){
  //   setDisplay('');
  //   setRes(0);setArg('');setOpt('');
  //  } 
  //  else if(arg==''&&operator!=''){
  //   setDisplay(display.substring(0,display.length-1)+input);
  //   setOpt(input);
  //  }
  //  else if(arg=='')setDisplay(display+input);
   if(input=='AC'){
     setDisplay('');
     setRes(0);
   }
   else if(input ==='='){
    var postfix = convertToPostfix(display);
    var answer = postfix_evaluation(postfix);console.log(answer);
    setRes(answer);setDisplay(display+'='+answer);
   }
   else if(!regex.test(input)&&input==display.substring(display.length-1));
   else if(input!='.'&&!regex.test(input)&&!regex.test(display.substring(display.length-1))){
    setDisplay(display.substring(0,display.length-1)+input);
    setRes(input);
   }
   else{
    setDisplay(display+input);
    setRes(input);
   }
  //  else{
  //    if(operator==''){
  //     setRes(parseFloat(arg)+res);
  //     setOpt(input);
  //    }
  //   //  else{
  //   //    switch(operator){
  //   //    case '/':
  //   //      setRes(res/parseFloat(arg));
  //   //      setArg('');
  //   //      break;
  //   //     case 'X':
  //   //       setRes(res*parseFloat(arg));
  //   //       setArg('');
  //   //       break;
  //   //     case '+':
  //   //       setRes(res+parseFloat(arg));
  //   //       setArg('');
  //   //       break;
  //   //     case '-':
  //   //       setRes(res-parseFloat(arg));
  //   //       setArg('');
  //   //       break;
  //   //    }
  //   //  };
  //    if(input=='=') setDisplay(display+'='+res);
  //    else setDisplay(display+input);
  //    setArg('');
     
  //  }
  }

  const button =btn.map(num=>(
    <Buttons class={num.value.class} id={num.value.id} value={num.value.key} onClick={handleCLick} />
  ));

  return (
    <div id="container">

      <div className="wrapper">

        <div className="calculator">

          <div className="formulaScreen" >{display}</div>

          <div className="outputScreen">{res}</div>

          <div className="btn">
            {button}
          </div>

        </div>

        <div id="author">
          <p>Designed and coded by<br/>Shreyansh Kaushik</p>
        </div>

      </div>
    </div>
  );
}
