const express=require("express");
const app=express();
const port=8080;
const path=require("path");

const{v4:uuidv4}=require('uuid');
const methodOverride=require("method-override");


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"Arundhati_ROY",
        content:" Arundhati Roy is an acclaimed Indian author, best known for her debut novel *The God of Small Things*, which won the **Booker Prize** in 1997. Beyond fiction, she is a prominent activist and essayist, known for her outspoken views on social justice, environmental issues, and politics. Her powerful writing blends lyrical prose with strong political commentary, making her a significant voice in contemporary literature and activism",

    },
    {
        id:uuidv4(),
        username:"Khaled_Hosseini",
        content:" Khaled Hosseini is an Afghan-American author best known for his novel *The Kite Runner*, which became a global bestseller. Born in Kabul in 1965, he moved to the U.S. in 1980. A former doctor, he later became a full-time writer. His other famous works include *A Thousand Splendid Suns* and *And the Mountains Echoed*. Hosseini is also a humanitarian and UNHCR Goodwill Ambassador, supporting refugees and Afghan communities through his foundation",

    },
    {
        id:"uuidv4()",
        username:"Paulo_Coelho",
        content:" Paulo Coelho is a Brazilian author best known for his internationally acclaimed novel *The Alchemist*. Born in 1947 in Rio de Janeiro, he is known for writing deeply spiritual and philosophical stories that inspire self-discovery and following one’s dreams. *The Alchemist* has been translated into over 80 languages and remains one of the best-selling books in history. Coelho’s works often explore destiny, faith, and the human journey.",

    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
   
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
   let post=posts.find((p)=>id===p.id);
  
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
   let post=posts.find((p) =>id === p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p) =>id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening to port:8080");
});