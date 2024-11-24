var express=require("express");
var fileuploader=require("express-fileupload");

let mysql2=require("mysql2");


var cloudinary=require("cloudinary").v2;

let app=express();

app.listen(2020,function(req,resp){
    console.log("server started");
 })

let config="mysql://avnadmin:AVNS_hJuGCr4k63mAPbnT45P@mysql-277f798a-akshita234-fa1b.c.aivencloud.com:25811/mywork?";

app.use(express.static("public"));


 (async function() {
 
     // Configuration
     cloudinary.config({ 
         cloud_name: 'dwe0uyb2w', 
         api_key: '581972815178837', 
         api_secret: 'NtiLLOovcbyl8RFVRVJSw80Uofk' // Click 'View API Keys' above to copy your API secret
     });
    })();



    var mysql=mysql2.createConnection(config);
    mysql.connect(function(err){
        if(err==null){
            console.log("Connected to Database Sucessfully");
        }
        else
        console.log(err.message);
    })

   

    app.get("/",function(req,resp){
        let path=__dirname+"/public/index.html";
        resp.sendFile(path);

    }
)


app.get("/profile",function(req,resp){
    let path=__dirname+"/public/organizer.html";
    resp.sendFile(path);

}
)

app.get("/dashboard",function(req,resp){
    let path=__dirname+"/public/dashboard.html";
    resp.sendFile(path);

}
)


app.get("/publish",function(req,resp){
    let path=__dirname+"/public/publish.html";
    resp.sendFile(path);

}
)

app.get("/angular",function(req,resp){
    let path=__dirname+"/public/angular-jsg.html";
    resp.sendFile(path);

}
)

app.get("/modal.html",function(req,resp){
    let path=__dirname+"/public/modal.html";
    resp.sendFile(path);

}
)

app.get("/player",function(req,resp){
    let path=__dirname+"/public/player.html";
    resp.sendFile(path);

}
)

app.get("/")


app.get("/signup-process",function(req,resp){
   // console.log("Api")
    // let all=req.query.txtMail+"," +req.query.txtPwd+","+req.query.txtPwdR+","+req.query.utype;
    console.log(req.query);
    //let email=req.query.txtMail;
   // let Pwd=req.query.txtPwd;

    //let PwdR=req.query.txtPwdR;
   // let utype=req.query.utype;
//    let dos=currentDate();
//    console.log(dos)
   


    
 mysql.query("insert into users values(?,?,?,?,?)",[req.query.txtMail,req.query.txtPwd,req.query.txtPwdR,req.query.utype,1],function(err){
    if(err==null)
    {
        console.log("signed up")
        resp.send("signup successfully")
    }
    else
    resp.send(err.message)
    })
})







app.get("/login",function(req,resp){
   // console.log("Api")
    console.log(req.query);

    mysql.query("select * from  users where email=? and Pwd=?",[req.query.email,req.query.password],function(err,jsonArray){
       
        if(err!=null)
            {resp.send(err.message);
     
            }
            else
           
                if(jsonArray.length==1)
                    {console.log(jsonArray[0].status);
                        resp.send(jsonArray[0].utype);
                        
                    }
                    else
             resp.send("incorrect")
             })  
        })

app.get("/check user",function(req,resp){
let email=req.query.txtMail;
mysql.query("select * from users where email=?",[email],function(err,jsonArray)
{
    
    if(err!=null)
    {
        resp.send(err.message);
    }
    else
    if(jsonArray.length==1)
            resp.send("Already Taken");
        else
            resp.send("Its Available")
})

})

app.get("/fetch-user",function(req,resp){
    let email=req.query.txtMail;
    mysql.query("select * from users where email=?",[email],function(err,jsonArray)
{ resp.send(jsonArray);
if(err!=null)
{
    resp.send(err.message);
}
else
resp.send(jsonArray);
})
})



//app.get("/signup-update",async function(req,resp){
   /// mysql.query("update users set pwd=?,pwdr=?,utype=?,where email=?",[req.body.txtPwd,req.body.PwdR,req.body.utype,req.body.txtMail],function(err)
  //  {
     //   if(err==null)
        //       resp.send("Record Updated Successfully");
     //   else
             //   resp.send(err.message); 

 //   })

   
//})


app.get("/profile",function(req,resp){
   // console.log("Api")
  
    console.log(req.query);

    mysql.query("insert into prof values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[null,req.query.mail,req.query.org,req.query.contact,req.query.Address,req.query.City,req.query.State,req.query.pin,req.query.Id,req.query.prev,req.query.area,req.query.web,req.query.insta,1],function(err){
        if(err==null)
        {
           
            resp.send("record saved successfully")
        }
        else
        resp.send(err.message)
        })
    })



        
    
     app.use(fileuploader());
     app.use(express.urlencoded(true));//binary to json conversion
     app.get("/tournament",async function(req,resp)
     {
         //console.log(req.files.profilepic.name);
     
         let filename="";
         if(req.files==null)//pic did't uploaded
             {
                 filename="nopic.jpg";
             }
             else
             {
                 filename=req.files.prev.name;
                 let path=__dirname+"/public/pics/"+filename;
                 console.log(path);
                 req.files.prev.mv(path);
     
                
                await cloudinary.uploader.upload(path).then(function(result){
                      filename=result.url;   //will give u the url of ur pic on cloudinary server
                      console.log(filename);
                });
             }
         req.body.prev=filename;
 
          
            mysql.query("insert into tour values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[null,req.query.mail,req.query.game,req.query.title,req.query.City,req.query.State,req.query.location,req.query.fees,req.query.prev,req.query.date,req.query.prizes,req.query.area,1],function(err){
                if(err==null)
                {
                    console.log("data saved")
                    resp.send("record saved successfully")
                }
                else
                resp.send(err.message)
                })
     }) 


     app.get("/fetch-tour",function(req,resp)
    { 
        mysql.query("select * from tour",function(err,jsonArray)
    {
        if(err!=null)
        {
            resp.send(err.message);
            
        }
        else
          resp.send(jsonArray);
         console.log(jsonArray)
    })
    })



    app.get("/modal.html",function(req,resp)
    { 
        mysql.query("select * from tour",function(err,jsonArray)
    {
        if(err!=null)
        {
            resp.send(err.message);
            
        }
        else
          resp.send(jsonArray);
         console.log(jsonArray)
    })
    })




    app.get("/save-player",function(req,resp){
        // console.log("Api")
       
         console.log(req.query);
     
         mysql.query("insert into play values(?,?,?,?,?,?,?,?,?,?,?,?)",[null,req.query.mail,req.query.name,req.query.contact,req.query.Address,req.query.City,req.query.State,req.query.gender,req.query.Id,req.query.prev,req.query.area,1],function(err){
             if(err==null)
             {
                console.log("record saved successfully")
                 resp.send("record saved successfully")
             }
             else
             resp.send(err.message)
             })
         })



         app.get("/update-password",function(req,resp)
        {
            txtEmail=req.query.txtEmail;
            curPwd=req.query.curPwd;
            newPwd=req.query.newPwd;
            mysql.query("update users set Pwd=?  where email=? and Pwd=?",[newPwd,txtEmail,curPwd],function(err,result)
                {
                   
                     if(result.affectedRows==1)
                    { console.log("pass updated")
                        resp.send("password updated")
                    }
                   else if(err!=null){
                        resp.send(err.message)
                    }
                    else{
                        resp.send("invalid current password")
                    }
                }
            )
        })


        
        app.get("/update-pass",function(req,resp)
        {
            Mail=req.query.Mail;
            Pass=req.query.Pass;
            New=req.query.New;
            mysql.query("update users set Pwd=? where email=? and Pwd=?",[New,Mail,Pass],function(err,result)
                {
                    if(err!=null){
                        resp.send(err.message)
                    }
                    else if(result.affectedRows==1)
                    {
                        resp.send("password updated")
                    }
                    else{
                        resp.send("invalid current password")
                    }
                }
            )
        })
