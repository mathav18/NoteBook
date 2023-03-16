$(document).ready(function(){
    $("#signUp").click(function(){
      $(".parent2").show("fast");
      
      });
  });

  $(document).ready(function(){
    $("#login").click(function(){
      $(".parent2").hide("fast");
      
      });
  });


function AddNoteBook(){
    $(".hideDiv").show("fast");
   
}

$(document).ready(function(){
    $("#can").click(function(){
      $(".hideDiv4").hide("fast");
      
      });
  });



let imgArr=['assets/1.jpeg','assets/2.jpeg','assets/3.jpeg','assets/4.jpeg','assets/5.jpeg','assets/6.jpeg','assets/7.jpeg','assets/8.jpeg','assets/9.jpeg','assets/10.jpeg','assets/11.jpeg']
function addNooteBook(e){
    let random=Math.floor(Math.random()*imgArr.length)
    let image=imgArr[random];
   let id=e.value;
   let book="";
   let title=document.querySelector('.bookTitle').value;
   let ele=document.querySelector('.bookTitle')
   if(title==''){
   book="Untitle"
   }else{
        book=title;
   }
   let obj={
    'id':id,
    'title':book,
    'img':image
    
}
$(".hideDiv").hide("fast");

fetch('/addnoteBook',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(obj)
})

.then((res)=>{return res.json()});

// let child=`<button class="notebook">
// <div class="book"></div>
// <span> ${book} </span>
// </button>`

location.reload();


}



function userdata(){
let obj=JSON.parse(localStorage.getItem('user'))
console.log(obj)
fetch('/savevariable',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    body:JSON.stringify(obj)
})

.then((res)=>{return res.json()});
  }





  //DELETE BOOK
  function delteBook(e){
    let id=e.parentNode.nextElementSibling.value;
     


$('.hideDiv4').show('fast');
let btn=document.querySelector('.hideDiv4');


let dltbtn=btn.childNodes[1].childNodes[1].childNodes[3].childNodes[3];
dltbtn.value=id;


  }


  function removeNote(e){
      let obj={
          'id':e.value
    }

    fetch('/deleteBook',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    
    .then((res)=>{return res.json()});
    location.reload();
  }


  //SEARCH BAR

function filter(e){
    let eleArr=document.querySelectorAll('#moon')

let query=e.value.toUpperCase();
    for(let i of eleArr){
        
        let baby=i.children[0].childNodes[3].innerText.toUpperCase();
        if(baby.includes(query)){
            i.style.display='block'
          
        }else{
            i.style.display='none'

        }
        
       
    }
        
}