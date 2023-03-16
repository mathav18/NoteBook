





$(document).ready(function(){
    $("#add").click(function(){
      $(".hideDiv").toggle("fast");
     });
  });

  $(document).ready(function(){
    $("#xmark").click(function(){
      $(".hideDiv").toggle("fast");
     });
  });



  $(document).ready(function(){
    $(".right").click(function(){
      $(".hideDiv").toggle("fast");
     });
  });
  $(document).ready(function(){
    $(".left").click(function(){
      $(".hideDiv3").toggle("fast");
     });
  });
  $(document).ready(function(){
    $(".west").click(function(){
      $(".hideDiv2").toggle("fast");
     });
  });

  $(document).ready(function(){
    $("#delete").click(function(){
        console.log(true)
      $(".hideDiv4").show("fast");
     });
  });

  $(document).ready(function(){
    $("#can").click(function(){
        console.log(true)
      $(".hideDiv4").hide("fast");
     });
  });


//ADD NOTE
function addNote(e){
    let val=e.value.split(" ");
    let bookid=val[0];
    let userid=val[1];
     let content=document.querySelector('#content').value;
    let obj={
        'bookid':bookid,
        'userid':userid,
        'content':content
    }

    fetch('/saveNotes',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })

    .then((res)=>{return res.json()});
    location.reload();

}


function showNote(e){
   let obj={
    'id':e.parentNode.parentNode.value
   }
   fetch('/getNote',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(obj)
})

.then((res)=>{return res.json()})
.then((data)=>{
   seeNote(data);
})
}

// PRINT NOTE
function seeNote(data){
    $(".hideDiv2").toggle("fast");
    let textArea=document.querySelector('.area2');
    textArea.value=data[0].notes;
    textArea.setAttribute("readonly","readonly")
}

$(document).ready(function(){
    $("#xmark2").click(function(){
      $(".hideDiv2").toggle("fast");
     });
  });
  //Edit notes




  function editnotes(e){
  
    let id=e.parentNode.parentNode.parentNode.parentNode.value;
    console.log(id)
    let obj={
        'id':id
       }
       fetch('/getNote',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()})
.then((data)=>{
   editNote(data,id);
})
   
   
  }
//SET ID ON BUTTON
  
  function editNote(data,id){
   console.log(id)
    $(".hideDiv3").toggle("fast");
    let textArea=document.querySelector('.area3');
    textArea.value=data[0].notes;
    let btn=document.querySelector('#btn')
    btn.value=id;
  }


// UPDATAE VALUE
function UpdateNotes(e){

    let content=document.querySelector('.area3').value;
    let obj={
        'id':e.value,
        'notes':content
    }
    fetch('/UpdateNote',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()})
    location.reload();

}


  $(document).ready(function(){
    $("#xmark3").click(function(){
      $(".hideDiv3").toggle("fast");
     });
  });


  //DELETE NOTES METHOD

  function deleteNotes(e){
    let id=e.parentNode.parentNode.parentNode.parentNode.value;
  let ele=document.querySelectorAll('.hideDiv4')
  $(ele).show('fast');
   let dltbtn=document.querySelector('.dlt');
   dltbtn.value=id;
  
  }

  function removeNote(e){
    let obj=
    {
        'id':e.value
    }
    fetch('/deletNote',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()})
    location.reload();

  }

//FILTER

function filter(e){
    let eleArr=document.querySelectorAll('.notebook')

let query=e.value.toUpperCase();
eleArr[0]

    for(let i of eleArr){
        
        let baby=i.childNodes[1].childNodes[3].innerText.toUpperCase();
        if(baby.includes(query)){
            i.style.display='block'
            i.style.display="flex"
        }else{
            i.style.display='none'
        } 
       
    }
        
}