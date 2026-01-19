import List from "../models/List.js";
import Board from "../models/Board.js";

export const createList = async (req, res) => {
    const { title, boardId } = req.body;

    try{
        //buat list baru di database
        const newList = await List.create({
            title,
            board: boardId,
        });

        //cari baord terkait 
        const board = await Board.findById(boardId);
        if(!board){
            return res.status(404).json({message: "Board not found"})
        }
        //masukkan id list baru ke dalam array lists milik board ini penting agar board tahu urutan list-nya nanti
        board.lists.push(newList._id)
        await board.save();

        res.status(201).json(newList)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const deleteList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        if(!list) return res.status(404).json({message: "List not found"})
        // hapus referensi list ini dari boardnya
        await Board.findByIdAndUpdate(list.board,{
            $pull: {lists: list._id}
        })

        //hapus list itu sendiri
        //di projecr real, kita juga harus menghapus card didalamnya - cascade delete
        await list.deleteOne()
        res.json({message: "list removed"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}