import React,{Component} from 'react';
import SimpleBarChart from './barChart';
import NavBar from './nav';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {Questions_List} from '../questions';

class Questionarre extends Component {
    constructor(props){
        super(props);

        this.state = {
            questionsList : Questions_List,
            status :  [
                        {'value' : 0, label: 'Correct Answers' , color : 'green'},
                        {'value' : 0, label: 'Wrong Answers' , color : ' red'}
                      ],
            _isButtonsDisabled : true
        }
    }
   
    submitHandler = () => {
        let questionsList = [...this.state.questionsList];
        let hasAllQuestionsAttempted = true;

        questionsList.forEach(question => {
            if(!question.attempted){
                hasAllQuestionsAttempted = false;
                question['shouldAttempt'] = true;
            }
        });

        if(hasAllQuestionsAttempted){
            alert('sa')
        }

        this.setState({
            questionsList
        });
    }

    clearHandler = () => {
        let questionsList = [...this.state.questionsList];
        let status = [...this.state.status];

        questionsList.forEach(question => {
            question['answeredCorrect'] = false;
            question['attempted'] = false;
            question['shouldAttempt'] = false;
            question['selectedOption'] = 'Choose from the options';
        });

                    
            status[0].value = 0;
            status[1].value = 0;

            this.setState({
                status,
                questionsList,
                _isButtonsDisabled : true
            });
    }

    checkAnswer = (e , id) => {
         let questionsList = [...this.state.questionsList];
         let status = [...this.state.status];
         let correct = 0;
         let wrong = 0;

        questionsList.forEach(questionsObj => {
            if(questionsObj.id === id){
                questionsObj['attempted'] = true;
                questionsObj['shouldAttempt'] = false;
                questionsObj['selectedOption'] = e.target.value;
               if(questionsObj.correctAnswer === e.target.value){
            questionsObj['answeredCorrect'] = true;
        } else {
            questionsObj['answeredCorrect'] = false;
        }
            }
        })

        this.setState({
            questionsList,
            _isButtonsDisabled : false
        }, () => {
            this.state.questionsList.forEach(questionsObj => {
                if(questionsObj['answeredCorrect'] ){
                    correct++
                } else if(questionsObj['attempted']){
                    wrong++
                }
            });

            status[0].value = correct;
            status[1].value = wrong;

            this.setState({
                status
            });
        });
    }

    render(){
        return (
    <div>
           <NavBar></NavBar>
               <Paper>
                <Grid container style={{margin : 0 , width : '95%'}}>
                    <Grid item xs={12} sm={6}>
                    <br></br>
                    <p>Try to answer the below questions</p>
                            {
                            this.state.questionsList.map(question => {
                                return (
                                    <div key={question.id} className='questions-wrapper'>
                                        <Card>
                                            <CardContent>
                                                <div className='question'>
                                                <p className={question.shouldAttempt === true ? 'err' : 'suc'}>{question.question}</p>
                                                </div>
                                                <div className='answer'>
                                                    <Select className={question.shouldAttempt === true ? 'err' : 'suc'} onChange = {e => this.checkAnswer(e , question.id)} value = {question.selectedOption}>
                                                        {
                                                            question.options.map(option => {
                                                                return <MenuItem key={option} value={option}>{option}</MenuItem>
                                                            })
                                                        }
                                                    </Select>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <br></br>
                                    </div>
                                )
                            })
                        }
                    <Button variant="outlined" disabled={this.state._isButtonsDisabled} component="span" onClick={this.submitHandler}>Submit</Button>&nbsp;&nbsp;&nbsp;
                    <Button variant="outlined" disabled={this.state._isButtonsDisabled} color="secondary" onClick={this.clearHandler}>Clear</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <br></br>
                        <p>Status of correct and wrong answers </p>
                        <div className='bar-chart-wrapper'>
                            <br></br>
                            <article>
                                <SimpleBarChart width={300} height={100} axisValueColor = 'green' data={this.state.status}/>
                            </article>
                        </div>
                    </Grid>
                </Grid>
                </Paper>     
            </div>
        )
    }
}

export default Questionarre;