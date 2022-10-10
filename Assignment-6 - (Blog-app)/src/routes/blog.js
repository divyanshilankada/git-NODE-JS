const router = require('express').Router();
const Blog = require('../models/Blog');


// Your routing code goes here

router.get("/blog", async (req, res)=> {

    if(Object.keys(req.query).length !== 0)
    {
        const blogs = await Blog.find({
            topic:req.query.search
        }).limit(req.query.page * 5);

        try{
            // res.render("blog", {blogs});
            res.json({
                status:"success",
                result:blogs
            })
        }catch(e) {
            console.log(e.message);
        }
    }
    else
    {
        const blogs = await Blog.find();

        try{
            // res.render("blog", {blogs});
            res.json({
                status:"success",
                result:blogs
            })
        }catch(e) {
            console.log(e.message);
        }
    }
   
})

// router.get('/blog',(req,res)=>{

//     res.render("form.ejs");   
// })

router.post('/blog', async(req,res)=>{

    try{
        
        const blog = await Blog.create({
            topic:req.body.topic,
            description:req.body.description,
            posted_at:new Date(),
            posted_by:req.body.posted_by
        });
        
        res.json({
            status:"success",
            result:blog
        })
        res.redirect('/')
    }
    catch(e){
        console.log(e.message);
    }
    
   
})


router.put('/blog/:id', async(req,res)=>{

    try{       
        const blog = await Blog.update({_id:req.params.id},req.body);
        const updateBlog = await Blog.find({_id:req.params.id});

        res.json({
            status:"success",
            result:updateBlog
        })

        res.redirect('/')
    }
    catch(e){
        console.log(e.message);
    }
    
   
})

router.delete('/blog/:id', async(req,res)=>{

    try{       
        const blog = await Blog.deleteOne({_id:req.params.id});

        res.json({
            status:"success",
            result:blog
        })
        res.redirect('/')
    }
    catch(e){
        console.log(e.message);
    }
    
   
})


module.exports = router;