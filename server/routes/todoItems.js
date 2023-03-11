const router = require('express').Router();

const TodoItems = require('../models/TodoItems');


//post route for adding items
router.post('/api/item', async (req,res) => {
    try {
        const newItem = new TodoItems({
            item: req.body.item
        })
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (err) {
        res.status(400).json(err);
    }
})

//get route to get all data from database
router.get('/api/items', async (req,res) => {
    try {
        const allTodoItems = await TodoItems.find();
        res.status(200).json(allTodoItems);
    } catch (err) {
        res.status(400).json(err);
    }
})


//update an item 
router.put('/api/item/:id', async (req,res) => {
    try {
        const updateItem = await TodoItems.findByIdAndUpdate(req.params.id, {$set: req.body});
        res.status(200).json('Item Updated');
    } catch (err) {
        res.status(400).json(err);
    }
})


//delete an item
router.delete('/api/item/:id', async (req,res) => {
    try {
        const deleteTodoItem = await TodoItems.findByIdAndDelete(req.params.id);
        res.status(200).json('Item Deleted Successfully');
    } catch (err) {
        res.status(200).json(err);
    }
})





module.exports = router