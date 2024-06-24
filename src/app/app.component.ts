import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  languages = ['Javascript', 'Java', 'C#', 'PHP']
  years = ['Year 1', 'Year 2', 'Year 3', 'Year 4']
  unallowedNames=["test", 'Hacker','john Doe','Jane doe']
  // @ViewChild('form') form!:NgForm
  form!: FormGroup
  onSubmit() {
    console.log(this.form.value);
   this.form.reset()

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      personalData: new FormGroup({
        name: new FormControl(null, [Validators.required], [<AsyncValidatorFn>this.unallowedNamesasyncValidator.bind(this)]),
        email: new FormControl(null, [Validators.email, Validators.required]),
        year: new FormControl(null, Validators.required),
      }),
      language: new FormControl(null, Validators.required),
      skills:new FormArray([])
    })
  }

  prepopulate() {
    // setValues-- you want to update ALL the inputs
    // this.form.setValue({
    //   personalData:{
    //     name:'John Doe',
    //     email:'john@gmail.com',
    //     year:this.years[2]
    //   },
    //   language:this.languages[3],
    //   skills:['Html']
    // })
    this.form.patchValue({
      personalData:{
         name:'Just name',
      }
    })
  }

  addControl(){
    ///add controlls into the form array
    const control= new FormControl(null, Validators.required);
    (this.form.get('skills') as FormArray).push(control) 
  }

  getControl(){
    return (<FormArray>this.form.get('skills')).controls
  }

  delete(i:number){
    (<FormArray>this.form.get('skills')).removeAt(i)
  }


  // unallowedNamesValidator(control:FormControl):{[x:string]:boolean}|null{
  //   if(this.unallowedNames.includes(control.value)){
  //     return {unallowedName:true}
  //   }
  //   return null
  // }


  unallowedNamesasyncValidator(control:FormControl){
    const promise = new Promise((resolve,reject)=>{
     setTimeout(()=>{
      if(this.unallowedNames.includes(control.value)){
        resolve({unallowedName:true})
      }
     }, 15000)
    })
   return promise
  }
}
