//USER SIGN UP FUNCTION
function signUp(){
    let elementarr=document.querySelectorAll('.userinput');
    let display=document.getElementById('display');
    let username=elementarr[0].value;
    let email=elementarr[1].value;
    let password=elementarr[2].value;

    if(username!=" "){
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        if(password.length>7){
            
                   display.innerText='';
                   elementarr[0].value="";
                   elementarr[1].value="";
                   elementarr[2].value="";
                   alreadyEmail(username,email,password)
         
          }else{
            display.innerText="password length must longerthen 7 "
            return '';
          }
       }else{
         display.innerText='You have entered an invalid email address!';
         return '';
     }
    }else{
        display.innerText='please Enter your Name';
    }
}

function alreadyEmail(username,email,password){
    console.log(true)
    fetch('/getUserDetailToSignup',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
        gotoCheck(username,email,password,data);
    })
}

function gotoCheck(name,email,pass,data){
    let display=document.getElementById('display');
      if(data==[]){
        saveEmailAndPass(name,email,pass);
      }else{
           for(let i of data){
            if(name==i.name||email==i.email||pass==i.password){
                    display.innerText='This Email Already Excited!'
                    return "";
            }
           }

           saveEmailAndPass(name,email,pass);
      }
}

function saveEmailAndPass(name,email,pass){
    console.log(false)
    let obj={
        'name':name,
        'email':email,
        'pass':pass
    }

    fetch('/newUserSignUp',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })
    .then((res)=>{return res.json()});
    getUserTableValue(email,pass);
}


//USER LOGIN FUNCTION
function userlogin(){
 
    let ele=document.querySelectorAll('.userData');
    let dis=document.getElementById('display2');
    
    let email=ele[0].value;
    let pass=ele[1].value;
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        if(pass.length>7){
                   display.innerText='';
                   ele[0].value="";
                   ele[1].value="";
                   getUserTableValue(email,pass);
         
          }else{
            dis.innerText="password length must longerthen 7 "
           
          }
        }
          else{
               dis.innerText='Invaild Email!'
          }
 }
     
 //GET USERTABLE VALUE
 function getUserTableValue(email,pass){

    fetch('/getUserDetailToSignup',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    .then((res)=>{return res.json()})
    .then((data)=>{
        gotocheckEmailAndPass(email,pass,data);
    })
 }



 function gotocheckEmailAndPass(email,pass,data){
    let dis=document.getElementById('display2');
    for(let i of data){
        if(email==i.email&&pass==i.password){
            let id=i.id;
           enteruser(email,pass,id);
           dis.innerText="Sucessfull Logined!"
           return"";
        }
    }
   
      dis.innerText='Email or Password Incorrect!'

 }
//GET DIFFERENT USER VALUE
 function enteruser(email,pass,id){
    let obj={
        'id':id,
        'email':email,
        'pass':pass
    }

    fetch('/savevariable',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json;charset=utf-8'
        },
        body:JSON.stringify(obj)
    })

    .then((res)=>{return res.json()});
  let data=JSON.stringify(obj)
    localStorage.setItem('user',data)
    window.location='/home'
    
 }

 