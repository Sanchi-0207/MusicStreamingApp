const express=require('express');
const router=express.Router();
const control=require('../controller/userController');
router.post('/submit-query',control.submitQuery);
router.post('/submit-path/:id',control.submitPath);
router.post('/submit-body',control.submitBody);
router.get('/name',control.getName);

module.exports=router;