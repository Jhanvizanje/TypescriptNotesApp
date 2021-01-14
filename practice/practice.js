var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// AutoBind handler decorator
function autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// Class to append list in Unordered list
var instance;
var appendList = /** @class */ (function () {
    function appendList(project) {
        this.project = project;
        this.template = document.querySelector("#project-list");
        var importedNode = document.importNode(this.template.content, true);
        this.section = importedNode.firstElementChild;
        // this.section.querySelector("ul").addEventListener("dragstart",this.dragStartHandler.bind(this));
        // this.section.querySelector("ul").addEventListener("dragend",this.dragEndHandler.bind(this));
    }
    appendList.prototype.showLists = function (prjArr) {
        var _this = this;
        document.querySelector("#Finished-projects").querySelector("ul").innerHTML = "";
        document.querySelector("#Active-projects").querySelector("ul").innerHTML = "";
        prjArr.forEach(function (prj) {
            var listId = prj.type + "-projects-list";
            var ul = document.getElementById(listId);
            var h3 = document.createElement("h3");
            var li = document.createElement("li");
            _this.project = prj;
            h3.innerText = prj.title;
            li.innerHTML = prj.description + " assigned to " + prj.people + " people.";
            // ul.appendChild(h3);
            li.insertAdjacentElement("afterbegin", h3);
            li.id = prj.id;
            li.addEventListener("dragstart", function (event) {
                console.log("start: ");
                event.dataTransfer.setData("text/plain", prj.id);
                event.dataTransfer.effectAllowed = "move";
            });
            li.addEventListener("dragend", _this.dragEndHandler.bind(li));
            ul.insertAdjacentElement("beforeend", li);
        });
    };
    appendList.prototype.dragEndHandler = function (event) {
        console.log("end");
    };
    return appendList;
}());
// Class containing all basic info of projects -- submithandler, attach, gatherInfo, validateInfo
var Project = /** @class */ (function () {
    function Project() {
        this.template = document.querySelector("#project-input");
        this.div = document.getElementById("app");
        var importedNode = document.importNode(this.template.content, true);
        this.section = importedNode.firstElementChild;
        this.section.id = "user-input";
        this.title = this.section.querySelector("#title");
        this.description = this.section.querySelector("#description");
        this.people = this.section.querySelector("#people");
        this.content = [];
        this.attach();
        this.configure();
    }
    Project.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            var title = userInput[0], desc = userInput[1], people = userInput[2];
            var ans = { id: Math.random().toString(), title: title, description: desc, people: (+people), type: "Active" };
            this.content.push(ans);
            instance = new appendList(ans);
            instance.showLists(this.content);
            console.log(title, desc, people);
            this.clearInput();
        }
    };
    Project.prototype.configure = function () {
        this.section.addEventListener("submit", this.submitHandler.bind(this));
    };
    Project.prototype.attach = function () {
        this.div.insertAdjacentElement("afterbegin", this.section);
    };
    Project.prototype.clearInput = function () {
        this.title.value = "";
        this.people.value = "";
        this.description.value = "";
    };
    Project.prototype.gatherUserInput = function () {
        var enteredTitle = this.title.value;
        var enteredDescription = this.description.value;
        var enteredPeople = this.people.value;
        var titleValidatable = {
            value: enteredTitle,
            required: true
        };
        var descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        var peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
        };
        if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    };
    Project.prototype.moveProject = function (id, type) {
        var prj = this.content.find(function (x) {
            return x.id === id;
        });
        //this.content = this.content.filter((x,ind,arr) =>  x.id !== id);
        // console.log(this.content);
        this.content.forEach(function (x) { return console.log(x); });
        // console.log(prj.type+":"+type);
        if (prj && prj.type !== type) {
            prj.type = type;
            instance.showLists(this.content);
        }
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], Project.prototype, "submitHandler", null);
    return Project;
}());
//  Class to render two diff sections of Projects
var renderList = /** @class */ (function () {
    function renderList(type) {
        this.type = type;
        this.template = document.querySelector("#project-list");
        this.div = document.querySelector("#app");
        var importedNode = document.importNode(this.template.content, true);
        this.section = importedNode.firstElementChild;
        this.section.id = type + "-projects";
        this.attach();
        this.renderContent();
    }
    renderList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.section.querySelector("ul").id = listId;
        this.section.querySelector("h2").innerText = (this.type).toUpperCase() + " - PROJECTS";
        this.section.querySelector("ul").addEventListener("drop", this.dropHandler.bind(this));
        this.section.querySelector("ul").addEventListener("dragover", this.dragOverHandler.bind(this));
        this.section.querySelector("ul").addEventListener("dragleave", this.dragLeaveHandler.bind(this));
    };
    renderList.prototype.attach = function () {
        this.div.insertAdjacentElement("beforeend", this.section);
    };
    // @autobind
    renderList.prototype.dragLeaveHandler = function (event) {
        console.log("dragLeave");
        var listEl = this.section.querySelector("ul");
        listEl.classList.remove("droppable");
    };
    ;
    // @autobind
    renderList.prototype.dragOverHandler = function (event) {
        console.log("dragOver");
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            var listEl = this.section.querySelector("ul");
            listEl.classList.add("droppable");
        }
    };
    ;
    // @autobind
    renderList.prototype.dropHandler = function (event) {
        var prjId = event.dataTransfer.getData('text/plain');
        console.log("drop" + prjId);
        pro1.moveProject(prjId, this.type === "Active" ? "Active" : "Finished");
    };
    return renderList;
}());
function validate(validatableInput) {
    var isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === 'string') {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
var pro1 = new Project();
var rend1 = new renderList("Active");
var rend2 = new renderList("Finished");
