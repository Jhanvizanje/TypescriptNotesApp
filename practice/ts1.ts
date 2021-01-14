// let str : string;
// str = "Jhanvi Zanje";

// console.log(str);

// let num : number;
// num = 10^2;
// console.log(num);

// let bool : boolean;
// bool = true;
// console.log(bool);

// let anyType : any;
// anyType = "Jhnavi"
// console.log(anyType);
// anyType = 2;
// console.log(anyType);
// anyType=false;
// console.log(anyType);

// let arr : Array<string>;
// arr = ["Jhanvi","Zanje"];
// console.log(arr);

// let tuple1 : [string,number];
// tuple1 = ["Jhanvi",1];
// console.log(tuple1);

// // Functions

// function sum(num1 : number,num2 : any) : number{
//     try
//     {
//         if(typeof num1 === 'string')
//         num1 = parseInt(num1);
//         console.log(num1);

//         if(typeof num2 === 'string')
//         num2 = parseInt(num2);
//         console.log(num2);
//     }
//     catch(e){
//         console.log(e);
//     }
//     return (num1)+ (num2);
// }
// console.log(sum(3,2));

// function getFullName(name1: string , name2?: string) :string{
//     if(name2 == undefined){
//         return name1+" "+name2;
//     }
//     return name1;
// }
// console.log(getFullName("Jhanvi"));

// // Interfaces


// interface todo{
//     title: string;
//     content: string;
// }
// let todo1 = {
//     title: "Task",
//     content: "Complete typescript"
// };
// console.log(todo1);
// function todoList(todo : todo){
//     return todo.title+" : "+todo.content;
// }
// console.log(todoList(todo1));

// // -----------------------2 with (class+interface)
// interface greet{
//     Gname: string;
//     time: string;
//     greetE(): void;
// }

// class greetable implements greet{
//     constructor(public Gname: string,public time: string,public date: string){};
//     greetE(){
//         console.log("Good "+this.time+" "+this.Gname+" ."+this.date);
//     }
// }

// let greetableObj : greet;
// greetableObj = new greetable("Jhanvi","Afternoon","11/01/2021");
// console.log(greetableObj+"\n"+greetableObj.greetE());

// // Classes
// class cls1{
//     // name : string;
//     // age : number;
//     // msg : string;
//     constructor(public name: string, public age: number, public msg: string){
//         // this.name = name;
//         // this.age = age;
//         // this.msg = msg;
//     }

//     protected register(){
//         console.log(this.name +" is registered!");
//     }
// }

// class cls2 extends cls1{
//     id: number;
//     constructor(id:number ,name: string, age: number, msg: string){
//         super(name,age,msg);
//         this.id = id;
//     }

//     payment(){
//         this.register();
//         console.log(this.id +" : "+this.name+" has payed.");
//     }
// }

// let cls1Var1 = new cls2(1,"Jhanvi",21,"Hello! \n Jhanvi here!");
// console.log(cls1Var1);
// //cls1Var1.register();
// cls1Var1.payment();

// // --------------------------Objects-----------------------

// let obj1:{
//     name:string;
//     age:number;
// } = {
//     name :"Jhanvi",
//     age:21
// };

// // --------------enum----------------------------------------------
// enum Enum1 {admin,user,developer};
// console.log(Enum1);
// switch(Enum1.admin)
// {
//     case 0: console.log("admin");
//     break;
// }

// console.log("11111");
// console.log("111123");


// // rest parameters
// const add = ( ...numbers:number[]) => {
//     return numbers.reduce((res,val) => {
//         console.log(res+"***********8");
//         return res+val;
//     },0);
// };

// console.log(add(1,2,3));

// // 
// type a= number | boolean;
// type b=number|string;
// type c=a&b;
// let numC : c;
// numC = 0;
// console.log(typeof numC);

// // checking in class
// class car{
//     constructor(private carName: string){}
//     info(){
//         console.log(this.carName);
//     }
// }

// class truck{
//     constructor(private carName: string){}
//     info(): void{
//         console.log(this.carName);
//     }
//     truckInfo(milage: string): void{
//         console.log("Milage: "+milage);
//     }
// }

// let car1 = new car("Bugati");
// let truck1 = new truck("Mahindra");
// type vehicle =  car | truck;

// function vehicleInfo(veh: vehicle) : void{
//     if(veh instanceof car){
//         console.log(veh.info());
//     }
//     else{
//         console.log(veh.truckInfo("1000"));
//     }
// }

// vehicleInfo(car1);
// vehicleInfo(truck1);

// // Descriminated Unions
// interface bird{
//     type: "bird";
//     flySpeed: number;
// }

// interface horse{
//     type:"horse";
//     runSpeed: number;
// }

// type animal = bird | horse;
// function animalInfo(animal1: animal): void{
//     switch(animal1.type){
//         case "bird": console.log(animal1.flySpeed);
//                         break;
//         case "horse": console.log(animal1.runSpeed);
//                         break;
//         default: console.log("No such animal here!");
//     }
// }
// animalInfo({type:"bird",flySpeed:1000});
// console.log("done");

// // Type Casting
// // let userInput = <HTMLInputElement>document.getElementById("userInput")!;
// let userInput = document.getElementById("userInput")! as HTMLInputElement;
// userInput.value= "Hi there!";


// // Index properties
// interface index{
//     [prop: string]: string;
// }

// let obj: index =  {
//     name:"Jhanvi",
//     id:"101"
// }
// console.log(obj);

// // function overloads

// type combine = string | number;

// function addTwo(num1: number, num2: number): number;
// function addTwo(num1: string, num2:string) :string;
// function addTwo(num1: combine, num2: combine): combine{
//     if(typeof(num1) === "string" || typeof(num2) === "string")
//     {
//         return num1.toString()+num2.toString();
//     }
//     else
//     return num1+num2;
// }

// let ans = addTwo("Jhanvi", "Zanje");
// let ansArr = ans.split("");
// console.log(ans);

// // optional chaining
// let optChain = {
//     name: "Jhanvi",
//     role: "ASE",
//     //about: {name: "Simform", CTC: 400000}
// }

// console.log(optChain?.about?.name);


// // nullish coalescing
// let val="";
// let nm = val ?? "Default"
// console.log(nm);



// let m;
// m="Jhanbi";
// console.log(typeof(m));
// m=1;
// console.log(typeof(m));

// // generics
// let genArr : Array<number> ;
// genArr = [1,2,3]

// let promise = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve("Done");
//     },2000);
// });

// promise.then(data => console.log(data));

// function genFun<T extends object, U extends object>(a: T, b: U){
//     return Object.assign(a,b);
// }
// let genObj = genFun({name:"Jhanvi"},{age:21});
// console.log(genObj.name)
// console.log("END");

// // generic functions 2
// interface lengthy{
//     length:number;
// }
// function lengthShow<T extends lengthy>(a: T) : [T,string]{
//     let msg = "No values";
//     if(a.length === 1) msg = "1 element";
//     else if(a.length>1) msg = a.length+" elements";
    
//     return [a,msg];
// }
// console.log(lengthShow("Jhanvi Zanje"));

// // generic functions 3
// function fun3<T extends object, U extends keyof T>(obj: T,key: U){
//     return obj[key];
// }
// console.log(fun3({name:"Jhanvi"},"name"));

// // generic classes
// class genericCls<T1 extends string | number | boolean>{
//     private clsArr: T1[] = [];
//     create(item: T1){
//         this.clsArr.push(item);
//     }
//     remove(item: T1){
//         this.clsArr.splice(this.clsArr.indexOf(item),1);
//     }
//     show(): T1[]{
//         return [...this.clsArr];
//     }
// }

// // let genNum = new genericCls<number>();
// // genNum.create(1);
// // genNum.create(10);
// // let _ansArr = genNum.show();
// // console.log(_ansArr)

// let genNum = new genericCls<string>();
// genNum.create("1");
// genNum.create("10");
// let _ansArr = genNum.show();
// console.log(_ansArr)

// decorators
// function decorate(name: string){
//     console.log("decorate factory");
//     return function(constructor: Function) {
//         console.log("Hi "+name);
//         // console.log(constructor);
//     }
// }


// @decorate("Accepted!")
// class decoreCls{
//     constructor(){
//         console.log("made a class!");
//     }

// }
// let objDec = new decoreCls();

// // using decorator for a magic
// function magic(msg: string){
//     console.log("magic factory");
//     return (constructor: any) => 
//     {
//         let p = document.getElementById("para")!;
//         let obj = new constructor();
//         p.innerHTML = msg+" "+obj.name;
//     }
// }

// @decorate("Most Welcome!!")
// @magic("<h1>Welcome!</h1>")
// class magicCls{
//     public name="XYZ";
//     constructor(){
//         console.log("Magic class!");
//     }
// }

// Property decorators

function cls1Decore(str: string){
    return <T extends {new(..._: any[]): {title: string}}> (originalConstructor: T) => {
        return class extends originalConstructor{
            constructor(..._: any[]){
                super("Jhanvi");
                console.log("New Replaced class");
            }
        }
    };
}

function propDecore(target:any , title: string | symbol){
    // if(target.value === "Jhanvi")
    console.log(target.title," ------------------------------------2------------------- " , title);
    // else
    // alert("!!!"+" "+target);
}

function setDecore(target: any, title: string | symbol, desc: PropertyDescriptor)
{
    console.log("--------------------------3--------------------------");
    console.log(target);
    console.log(title);
    console.log(desc);
    console.log("----------------------------------------------------");
}

// @cls1Decore("START")
class propDecoreCls{
    @propDecore
    private title: "Jhanvi";
    _about="";
    constructor(xyz: string){
        this.title = xyz;
        console.log("con called!");
    }
    @setDecore
    set about(str: string){
        this._about = str;
    }
}

let decoreObj = new propDecoreCls("Jhanvi");
decoreObj.about = "Nice work! Keep it up.";

// ---------------------------------------------------------
// function Autobind(target: any, title: string | symbol, description: PropertyDescriptor){
//     const originalMethod = description.value;
//     const newDescription : PropertyDescriptor = {
//         configurable : true,
//         enumerable: false,
//         get() {
//             let ans = originalMethod.bind(this);
//             return ans;
//         }
//     }
//     return newDescription; 
// }
// class btn{
//     private msg: string="Clicked";

//     @Autobind
//     showmsg(){
//         console.log(this.msg);
//     }
// }

// let b1 = new btn();
// let btn1 = document.querySelector("button")!;
// btn1.addEventListener("click",b1.showmsg);






