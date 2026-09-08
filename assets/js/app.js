const cl=console.log;

const todoForm = document.getElementById("todoForm")
const todoList = document.getElementById("todoList")
const todoInput = document.getElementById("todoInput")
const addbtn = document.getElementById("addbtn")
const updatebtn = document.getElementById("updatebtn")

// let todoArr=[
//     {
//         todoItem:"JavaScript",
//         todoId:"111"
//     },
//     {
//         todoItem:"DSA",
//         todoId:"112"
//     },
//     {
//         todoItem:"CSS",
//         todoId:"113"
//     },
//     {
//         todoItem:"HTML5",
//         todoId:"114"
//     },
//     {
//         todoItem:"Angular",
//         todoId:"115"
//     }
// ];

// localStorage.setItem("todoArr", JSON.stringify(todoArr))
let todoArr = JSON.parse(localStorage.getItem('todoArr'))||[]
//read

function oncreatetodoList(arr){
    let result =``;
    arr.forEach((ele)=>{
        result +=`<li class="list-group-item d-flex justify-content-between align-items-center bg-info" id=${ele.todoId}>
                            <strong>${ele.todoItem}</strong>
                            <div>
                                <i onClick="edittodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                <i onClick="deletetodo(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                            </div>
                        </li>`
    })
    todoList.innerHTML = result
}
oncreatetodoList(todoArr)

//create 

function addtodo(eve){
     eve.preventDefault()
     let todoObj={
        todoItem:todoInput.value,
        todoId:Date.now().toString()
     }
     todoArr.push(todoObj)
     localStorage.setItem("todoArr", JSON.stringify(todoArr))
     todoForm.reset()
    //  cl(todoObj.todoItem)
     let li = document.createElement('li')
     li.className = 'list-group-item d-flex justify-content-between align-items-center bg-info'
     li.id = todoObj.todoId
     li.innerHTML = `<strong>${todoObj.todoItem}</strong>
                            <div>
                                <i onClick="edittodo(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                <i onClick="deletetodo(this)" class="fa-solid fa-trash fa-2x text-danger"></i>
                            </div>`

    todoList.append(li)

    Swal .fire({
        title:'Data added successfully !!!',
        icon:'success',
        timer:3000
    });
}

//delete 

function deletetodo(ele){
    let removeId = ele.closest('li').id;
    let getconfirmation = confirm(`Are you sure, you want to remove id ${removeId}`)
    if(getconfirmation){
        let getIndex = todoArr.findIndex(t=>t.todoId === removeId)
        todoArr.splice(getIndex, 1)
        localStorage.setItem('todoArr', JSON.stringify(todoArr))
        ele.closest('li').remove()
    }

    Swal .fire({
        title:'Data deleted successfully !!!',
        icon:'success',
        timer:3000
    });
}

//edit 

function edittodo(ele){
    let editId = ele.closest('li').id;
    localStorage.setItem('editId', editId)
    let editObj = todoArr.find(t=>t.todoId === editId)
    todoInput.value = editObj.todoItem;
    addbtn.classList.add('d-none')
    updatebtn.classList.remove('d-none')
}

//update

function updatetodo(){
    let updateId = localStorage.getItem('editId')
    localStorage.removeItem('editId')
    let updateObj={
        todoItem:todoInput.value,
        todoId:updateId
    }
    let getInd = todoArr.findIndex(t=>t.todoId === updateId)
    todoArr[getInd] = updateObj
    localStorage.setItem('todoArr', JSON.stringify(todoArr))
    cl(todoArr[getInd])
    document.getElementById(updateId).querySelector('strong').innerHTML = updateObj.todoItem
    todoForm.reset()
    addbtn.classList.remove('d-none')
    updatebtn.classList.add('d-none')

    Swal .fire({
        title:'Data updated successfully !!!',
        icon:'success',
        timer:3000
    });
}

todoForm.addEventListener("submit", addtodo)
updatebtn.addEventListener("click", updatetodo)