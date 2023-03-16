const express=require('express');
const app=express();
const port=3000;
const database=require('mysql')
const bodyParser=require('body-parser');
const { render } = require('ejs');
const { urlencoded } = require('body-parser');



let db=database.createConnection({
    host:'localhost',
    user:'root',
    password:"",
    database:'MyNotes'
})



app.use(express.static('public'));
app.set("view engine","ejs");
var urlencode=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());

let EMAIL="";
let ID="";




app.get('/login',(req,res)=>{
    res.render('login')
})


app.get('/book',(req,res)=>{
    res.render('book')
})



//NEW USER LOGIN,GET USERDEATAILS VALUE AND  CHECK EMAIL AND PASS AND NAME 
app.get('/getUserDetailToSignup',(req,res)=>{
    let sql=`select * from userDetails`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('sucessfull')
           res.json(result);
        }
    })
})

//NEW USER LOGIN FETCH METHOD
app.post('/newUserSignUp',urlencode,(req,res)=>{
   let sql=`insert into userDetails (name,email,password) values ('${req.body.name}','${req.body.email}','${req.body.pass}')`;
   db.query(sql,(err,result)=>{
    if(err){
        console.log(err)
    }else{
        console.log('sucessfull')
    }
   })
})

//Save email and password on variable
app.post('/savevariable',urlencode,(req,res)=>{
   EMAIL=req.body.email;
   ID=req.body.id;
   console.log(req.body)

})



//app get home 
app.get('/home',(req,res)=>{

    let sql=`select * from NootBookTable WHERE uniqueId=${ID}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log("err")
        }else{ 

            res.render('home',{ID,result});
        }
    })  
})


//Add notebook
app.post('/addnoteBook',urlencode,(req,res)=>{
    console.log(req.body);
    let sql=`insert into NootBookTable (title,email,uniqueid,image) values ('${req.body.title}','${EMAIL}',${req.body.id},'${req.body.img}')`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log("err")
        }else{
            console.log("sucessfull")
        }
    })
})


//go to notes from notebook
app.post('/gotoNotes',urlencode,(req,res)=>{
    let val=req.body.id.split(" ");
    let color="#fff"

  let bookid=val[0]

  let userid=val[1];
  let sql=`select * from noteTable WHERE userid=${userid} AND bookId=${bookid}`;
  db.query(sql,(err,result)=>{
    if(err){
        console.log("err")
    }else{
      res.render('book',{result,bookid,userid,color})
    }
  })
})

//Add notes 

app.post('/saveNotes',urlencode,(req,res)=>{
    let bookid=req.body.bookid;
    let userid=req.body.userid;
    let content=req.body.content;

    let sql=`insert into noteTable (notes,bookId,userId) values ('${content}','${bookid}','${userid}')`;
    db.query(sql,(err,result)=>{
        if(err){

        }else{
            console.log('sucessfull')
        }
    })

})

//get notes 

app.post('/getNote',urlencode,(req,res)=>{
    let id=req.body.id;
    let sql=`select * from noteTable WHERE id=${id}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})

//UPDATE NOTES
app.post('/UpdateNote',urlencode,(req,res)=>{
    let content=req.body.notes;
    let id=req.body.id;
    let sql=`UPDATE noteTable SET notes ='${content}' WHERE id=${id}`;
    db.query(sql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log('sucessfull')
        }
    })
})


//DELETE NOTE

app.post('/deletNote',urlencode,(req,res)=>{
    console.log(req.body.id);
    let sql=`DELETE  FROM noteTable WHERE id=${req.body.id}`;
    db.query(sql,(err,res)=>{
        if(err){console.log(err)}
        else{console.log('sucessful')}
    })
})


//DELETE BOOK
app.post('/deleteBook',urlencode,(req,res)=>{
    let id=req.body.id.split(" ")[0]
    
   
    let sql=`DELETE FROM NootBookTable WHERE id=${id}`;
    db.query(sql,(err,res)=>{
        if(err){
            console.log(err)
        }
        else{

            let sql=`DELETE FROM noteTable WHERE bookId=${id}`;
            db.query(sql,(err,res)=>{
                if(err){
                    console.log('err')}
                else{
                    console.log('sucessfull')
                }
            })
        }
    })
})
app.listen(port, () => console.log("listening :",port));