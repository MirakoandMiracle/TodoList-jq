import $ from 'jquery';

$(document).ready(function () {
    const getID = () => Math.round(Math.random()*10000000000);

    let toDoTasks =[];
    const LS_Set = () => localStorage.setItem("todo_tasks" , JSON.stringify(toDoTasks)) 

    const createTask =(task) =>{
       
        const actionDiv = $("<div></div>");
       
        const btnEdit = $(`<button class="me-7"></button>`).html(` <i class="fa-solid fa-pencil  text-purple-900 text-[14px] md:text-[18px]"></i>`);
      
        const btnDelete = $(`<button class="me-5"></button>`).html(` <i class="fa-solid fa-trash-can  text-purple-900 text-[14px] md:text-[18px]"></i>`);
       
        btnDelete.click(function(){
            const {id} =task;
            $(this).parents("li").remove();
            const filterTodo = toDoTasks.filter((todo)=>todo.id !== id);
            toDoTasks = [...filterTodo];
            LS_Set();
        });

        btnEdit.click(function(){
            const btnSaveChange = $(`<button class="me-7" id="savechangebtn"></button>`).html(`<i class="fa-solid fa-check  text-purple-900 text-[14px] md:text-[18px]"></i>`);

            const btnCancel = $(`<button class="me-5" id="cancelbtn"></button>`).html(`<i class="fa-solid fa-xmark text-purple-900 text-[14px] md:text-[18px]"></i>`);
                    
            const {text, id} =task;
             const inp_edit = $("<input/>").val(text).addClass("bg-purple-400 outline-none  text-purple-900");
            $(this).parent().prev().children("p").replaceWith(inp_edit);
            inp_edit.focus();

        btnSaveChange.click(function () {  
         $(this).parent().children().toggleClass("hidden");
      
                });
                   
                $(this).parent().children().toggleClass("hidden");
$("#savechangebtn , #cancelbtn").remove();
                $(this).parent().append(btnSaveChange, btnCancel);
                
        });
actionDiv.append(btnEdit,btnDelete);
        const liContent = $(`<div class="flex items-center gap-3 "></div>`).html(` <input type="radio" class="border-none" name="rdo-completed" id="rd0-completed"/>
        <p class="text-purple-900 text-[14px] md:text-[18px]">${task.text}</p>`)
   
      const li = $(` <li class="flex p-3 md:p-4 bg-purple-400 justify-between w-full "></li>`);
      li.append(liContent, actionDiv);
      $("#task-list").append(li);
    };

    $("#form-todo").submit((e)=>{
        e.preventDefault();
        const inpTask = $("#task");
        const newTask = {id: getID() , text: inpTask.val(), completed : false};
        if(inpTask.val()){
            createTask(newTask);
            toDoTasks.push(newTask);
            inpTask.val("");
            LS_Set();
        } else{
            
            inpTask.addClass("border-2 border-red-400 transform scale-105 ease-transition");
            inpTask.focus();
            const error_el = $(`<span id="error_sm"></span>`).addClass("text-red-400 text-sm").text("Please add a task");
$("#error_sm").remove();
inpTask.parent().after(error_el);
        }
    }) ;
    
    $("#task").keyup(function (e) {
        if($("#task").val()){
            $(this).removeClass("border-2 border-red-400 transform scale-105 ease-transition");
$("#error_sm").remove();


        }
    })
    const onLoad =()=>{
const LS_Data = JSON.parse(localStorage.todo_tasks);
LS_Data.map(task =>{
    createTask(task);
    toDoTasks.push(task);
})
    }
    onLoad();

});