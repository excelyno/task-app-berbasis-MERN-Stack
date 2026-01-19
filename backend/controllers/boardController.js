import Board from "../models/Board.js";

// @desc    Get all boards milik user yang login
// @route   GET /api/boards
// @access  Private
export const getBoards = async (req, res) => {
  try {
    // req.user.id didapat dari middleware 'protect' tadi
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new board
// @route   POST /api/boards
// @access  Private
export const createBoard = async (req, res) => {
  const { title, background } = req.body;

  try {
    const board = await Board.create({
      user: req.user.id, // Set pemilik board otomatis
      title,
      background: background || "#ffffff",
    });

    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBoardById = async (req, res) =>{
    try {
        const board = await Board.findById(req.params.id)
        //ambil data list berdasarkan id yang ada di array 'lists'
        .populate({
            path: "lists",
            //didalam setiap list ambil juga data cardnya
            populate: {
                path: "cards",
                model: "Card"
            }
        })
        if (!board){
            return res.status(404).json({message: "board not found "})
        }
        res.json(board)
    }catch (error) {
        res.status(500).json({message: error.message})
    }
}