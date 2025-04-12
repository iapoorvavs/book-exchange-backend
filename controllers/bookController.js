const Book = require('../models/Book');

// @desc    Upload a new book
exports.uploadBook = async (req, res) => {
    const { title, author, description } = req.body;

    try {
        const book = await Book.create({
            title,
            author,
            description,
            owner: req.user.id,
        });

        res.status(201).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get all books (excluding own)
exports.getAvailableBooks = async (req, res) => {
    try {
        const books = await Book.find({ owner: { $ne: req.user.id } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Request a book exchange
exports.requestExchange = async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        if (book.owner.toString() === req.user.id) {
            return res.status(400).json({ message: 'You cannot request your own book' });
        }

        book.exchangeRequests.push(req.user.id);
        await book.save();

        res.status(200).json({ message: 'Exchange request sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
