const { News } = require('../models');

// Controller actions
const createNews = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create news in the database
    const news = await News.create({ title, content });

    // Return the created news as a response
    res.status(201).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllNews = async (req, res) => {
  try {
    // Retrieve all news from the database
    const news = await News.findAll();

    // Return the news as a response
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the news entry by ID
    const news = await News.findByPk(id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Delete the news entry
    await news.destroy();

    // Return success message as a response
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateNewsById = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
  
      // Find the news entry by ID
      const news = await News.findByPk(id);
  
      if (!news) {
        return res.status(404).json({ message: 'News not found' });
      }
  
      // Update the news entry
      if (title) {
        news.title = title;
      }
  
      if (content) {
        news.content = content;
      }
  
      await news.save();
  
      // Return the updated news entry as a response
      res.status(200).json(news);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Export controller actions
module.exports = {
  createNews,
  getAllNews,
  deleteNewsById,
  updateNewsById,
};
