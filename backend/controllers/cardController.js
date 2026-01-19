import Card from "../models/Card.js";
import List from "../models/List.js";

export const createCard = async (req, res) => { 
    const {title, listId, boardId} = req.body
    try {
        //buat card baru
        const newCard = await Card.create({
            title,
            list: listId,
            board: boardId //disimpan juga biar gampang query stats
        })
        //update list = memasukkan id card ke array cards di list 
        const list = await List.findById(listId)
        if(list){
            list.cards.push(newCard._id)
            await list.save()
        }
        res.status(201).json(newCard)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}