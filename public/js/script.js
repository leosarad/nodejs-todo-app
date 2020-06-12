setTimeout(()=>{
    let msg = document.querySelector(".msg");
    msg.style.maxHeight = "0";
},2000)

function edit(target){
    let noteElement = target.parentElement;
    let id = noteElement.getAttribute("data-id");
    let title = noteElement.getAttribute("data-title");
    let description = noteElement.getAttribute("data-body");

    let note = {
        id,
        title,
        description
    }

    editUI(note)
}

let editUI = (note)=>{
    let editor = document.querySelector(".note-editor");
    editor.style.display="block";
    
    let title = document.querySelector(".note-editor .note-title");
    let description = document.querySelector(".note-editor .note-description");

    title.innerText = note.title;
    description.innerText = note.description;

    let update = document.querySelector(".note-editor .update");
    let cancel = document.querySelector(".note-editor .cancel");

    update.onclick = async ()=>{
        
    let title = document.querySelector(".note-editor .note-title").innerText;
    let description = document.querySelector(".note-editor .note-description").innerText;

    let newNote = {
        "id": note.id,
        "title" : title,
        "description": description
    }
        let response = await fetch('/edit', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
          });
          
        let result = await response.json();
        
        if(response.status == 200){
            editor.style.display="none"
            let msg = document.querySelector(".msg");
            msg.innerText = "Note Edited";
            msg.style.maxHeight="25px";
            setTimeout(()=>{
                msg.style.maxHeight = "0";
            },2000)
        }
    }

    cancel.onclick = ()=>{
        editor.style.display = "none";
    }

}