const addBtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")


// function for savings notes on localstorage
const saveNotes = () =>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
            (note) =>{
                data.push(note.value)
            }
    )
    if (data === 0) {
        localStorage.removeItem("notes")
    }else{
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

// Button for add notes

addBtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

// Add note function

const addNote = (text = "")=>{
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `<div class="tool">
    <i class="save ri-save-3-line"></i>
    <i class="trash ri-delete-bin-6-line "></i> 
    </div>
    <textarea>${text}</textarea>`;

    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )
    main.appendChild(note);
    saveNotes()
}


// Self calling function for remove notes and add notes

(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"))
        lsNotes.forEach(
            (lsNotes) =>{
                addNote(lsNotes)
            }
        )
        if (lsNotes.length === 0) {
            localStorage.removeItem("notes")
        } else{
            addNote()
        }
    }
)()