// AutoBind handler decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) : any {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      }
    };
    return adjDescriptor;
}

// Class to append list in Unordered list
let instance:appendList;

interface draggable{
    dragEndHandler(event: DragEvent): void;
}

interface dragTarget{
    dragOverHandler(event: Event): void;
    dragLeaveHandler(event: Event): void;
    dropHandler(event: Event): void;
}

class declaration<T extends HTMLElement, U extends HTMLElement> {
    protected section: T;
    protected template: HTMLTemplateElement;
    protected div?: U;

    constructor(Tempid: string, secId?: string, divId?:string){
        this.template = document.querySelector("#"+Tempid)! as HTMLTemplateElement;
        const importedNode = document.importNode(
            this.template.content,
            true
        );

        this.section = importedNode.firstElementChild as T;
        if(secId)
        this.section.id = secId;

        if(divId)
        this.div = document.querySelector("#"+divId)! as U;
    }
}

class appendList extends declaration<HTMLElement, HTMLElement> implements draggable{

    constructor(private project: projectInterface){
        super("project-list");
    }

    showLists(prjArr: Array<projectInterface>){
        document.querySelector("#Finished-projects")!.querySelector("ul")!.innerHTML = "";
        
        document.querySelector("#Active-projects")!.querySelector("ul")!.innerHTML = "";
        prjArr.forEach((prj) => {
            const listId = `${prj.type}-projects-list`;
            const ul = document.getElementById(listId)!;
            const h3 = document.createElement("h3")!;
            const li = document.createElement("li")!;
            this.project = prj;

            h3.innerText = prj.title;
            li.innerHTML = `${prj.description} assigned to ${prj.people} people.`;

            // ul.appendChild(h3);
            li.insertAdjacentElement("afterbegin",h3);
            li.id = prj.id;
            li.addEventListener("dragstart",(event) => {
                console.log("start: ");
                event.dataTransfer!.setData("text/plain",prj.id);
                event.dataTransfer!.effectAllowed = "move";
            });
            li.addEventListener("dragend",this.dragEndHandler.bind(li));
            ul.insertAdjacentElement("beforeend",li);
        });
        
    }

    dragEndHandler(event: DragEvent){
        console.log("end");
    }

}

// Class containing all basic info of projects -- submithandler, attach, gatherInfo, validateInfo
class Project extends declaration <HTMLFormElement, HTMLDivElement>{

    private title: HTMLInputElement;
    private people: HTMLInputElement;
    private description: HTMLInputElement;
    content: Array<projectInterface>;

    constructor(){
        super("project-input","user-input","app");

        this.title = this.section.querySelector("#title")! as HTMLInputElement;
        this.description = this.section.querySelector("#description")! as HTMLInputElement;
        this.people = this.section.querySelector("#people")! as HTMLInputElement;
        this.content = [];

        this.attach();
        this.configure();
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            const ans = {id: Math.random().toString(), title: title, description: desc, people: (+people), type: "Active"};
            this.content.push(ans);
            instance = new appendList(ans);
            instance.showLists(this.content);
            console.log(title, desc, people);
            this.clearInput();
        }
    }


    private configure(){
        this.section.addEventListener("submit", this.submitHandler.bind(this));
    }

    private attach(){
        this.div!.insertAdjacentElement("afterbegin", this.section);
    }

    private clearInput() {
        this.title.value = "";
        this.people.value = "";
        this.description.value = "";
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.title.value;
        const enteredDescription = this.description.value;
        const enteredPeople = this.people.value;
    
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
        };
    
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) 
        {
            alert('Invalid input, please try again!');
            return;
        } 
        else 
        {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    public moveProject(id: string, type: string){
        const prj = this.content.find((x) => {
            return x.id === id;
        });
        console.log(prj);
        this.content.forEach((x) => console.log(x));
        if(prj && prj.type !== type){
            prj.type = type;
            instance.showLists(this.content);
        }
        
    }

}

//  Class to render two diff sections of Projects
class renderList extends declaration<HTMLElement, HTMLDivElement> implements dragTarget{

    constructor(private type: "Finished" | "Active"){
        super("project-list",`${type}-projects`,"app");
        
        this.attach();
        this.renderContent();
    }

    private renderContent(){
        const listId = `${this.type}-projects-list`; 
        this.section.querySelector("ul")!.id = listId;
        this.section.querySelector("h2")!.innerText = `${(this.type).toUpperCase()} - PROJECTS`;

        this.section.querySelector("ul")!.addEventListener("drop",this.dropHandler.bind(this));
        this.section.querySelector("ul")!.addEventListener("dragover",this.dragOverHandler.bind(this));
        this.section.querySelector("ul")!.addEventListener("dragleave",this.dragLeaveHandler.bind(this));
    }

    private attach(){
        this.div!.insertAdjacentElement("beforeend", this.section);
    }
    
    // @autobind
    dragLeaveHandler(event: DragEvent){
        console.log("dragLeave");
        const listEl = this.section.querySelector("ul")!;
        listEl.classList.remove("droppable");
    };
    // @autobind
    dragOverHandler(event: DragEvent){
        console.log("dragOver");
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.section.querySelector("ul")!;
            listEl.classList.add("droppable");
        }
    };
    // @autobind
    dropHandler(event: DragEvent) {
        
        const prjId = event.dataTransfer!.getData('text/plain');
        console.log("drop"+prjId);
        pro1.moveProject(
          prjId,
          this.type === "Active" ? "Active" : "Finished"
        );
    }
}


interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}

interface projectInterface{
    id: string;
    title: string;
    description: string;
    people: number;
    type: string;
}




const pro1 = new Project();
const rend1 = new renderList("Active");
const rend2 = new renderList("Finished");

// --target ES5 --emitDecoratorMetadata --experimentalDecorators
// https://github.com/Jhanvizanje/typescriptNotesApp.git