import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';

interface Question {
  id: number;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public answerList: any = [];
  public currentquestion: number = 0;
  progress: string = '0';
  getans: any;
  interval$: any;
  points: number = 0;
  counter = 60;
  isquizecompleted: boolean = false;
  constructor(private questionservice: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuestion();
    this.getAllAnswer();
  }
  getAllQuestion() {
    this.questionservice.getQuestionJson().subscribe((res) => {
      this.questionList = res.questions;
    });
  }
  nextQuestion() {
    this.currentquestion++;
    this.getProgresssPercent();
    if (this.currentquestion === this.questionList.length) {
            this.isquizecompleted = true;
    }
    

  }
  previousQuestion() {
    this.currentquestion--;
    this.getProgresssPercent();
  }
  resetQuize() {
    this.currentquestion = 0;
    this.getAllQuestion();
  }
  getProgresssPercent() {
    this.progress = (
      (this.currentquestion / this.questionList.length) *
      100
    ).toString();
  }
  getAllAnswer() {
    this.questionservice.getAnswerJson().subscribe((res) => {
      this.answerList = res.answers;
      // console.log(this.answerList,"answerList check");
    });
  }
  answer(currentquestion: number, opt: string) {

    if (currentquestion === this.questionList.length) {
        this.points = this.points + 5;
        this.isquizecompleted = true;
       }
    //console.log(currentquestion, opt, this.answerList);
   // console.log(opt, 'opt');
    // console.log(this.answerList.id,"actual ans");
    //console.log(this.answerList[this.currentquestion].ans, 'check now');
    else{
      if (opt === this.answerList[this.currentquestion].ans) {
        this.points = this.points + 5;
        console.log(this.points);
        this.currentquestion++;
      }
      else{
        this.points=this.points;
        this.currentquestion++;
      }
    }

    }
   
}
