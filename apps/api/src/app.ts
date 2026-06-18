import express from "express";
const app=express();

app.get('/health', (_req,res)=>{
    res.json({status: "OK"});
})

export default app;