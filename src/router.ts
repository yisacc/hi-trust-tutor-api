import { Router } from "express";

const router=Router()
/** 
* Users
*/
router.get('/users',(req,res)=>{
res.json({message:"users"})
})
router.get('/user/:id',()=>{})
router.put('user/:id',()=>{})
router.post('user',()=>{})
router.delete('user/:id',()=>{})

/** 
* Roles
*/
router.get('/roles',()=>{})
router.get('/role/:id',()=>{})
router.put('role/:id',()=>{})
router.post('role',()=>{})
router.delete('role/:id',()=>{})

/** 
* Permissions
*/
router.get('/permissions',()=>{})
router.get('/permission/:id',()=>{})
router.put('permission/:id',()=>{})
router.post('permission',()=>{})
router.delete('permission/:id',()=>{})

export default router