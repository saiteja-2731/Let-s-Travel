let express = require('express');
let app = express();
let mongoose = require('mongoose'); // connecting mongoose
let postsRouter = require('./routes/posts');
let cookieParser = require('cookie-parser');
let callbackRequestsRouter = require('./routes/callback-requests'); // connecting route for call back request
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let auth= require('./controllers/auth');

let Post = require('./models/posts').Post;  // connected schema for posts to app.js and assigned it to Post object

app.set('view engine','ejs');

mongoose.connect('mongodb+srv://Saiteja:sAITEJA123@mycluster.jnqqb.mongodb.net/travels',{useNewUrlParser:true } ); //connecting to database

app.use(express.json());  // Converting data to json format


app.use(express.static('public'));   // To display static content when website is opened

app.use(cookieParser());
app.use('/posts',postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails',emailsRouter);
app.use('/users',usersRouter);


app.get('/sight', async (req,resp)=>{
    let id = req.query.id;
    let post = await Post.findOne({id:id});
    resp.render('sight', {
        title : post.title,
        imageURL : post.imageURL,
        date: post.date,
        cost:post.cost,
        text: post.text
    })
})


app.get('/admin',  (req,resp)=>{
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }
    else{
        resp.redirect('/login');
    }
})

app.get('/login',(req,resp)=>{
    resp.render('login');
})

let port = process.env.PORT || 3000; //if herokus port fails then we can open page using 3000
app.listen(port,()=>{
    console.log(`listening ${port}....`);
})