const express=require('express');

exports.getEmployeeProfile=async (req,res)=>{

try{
    const employee = req.user;
    res.json(employee);
}
catch(err){
    res.status(500).json({ error: 'Server error' });
}
    

}