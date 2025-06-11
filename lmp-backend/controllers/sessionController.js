const Session = require("../models/Session");
const Question= require("../models/Question");

// @desc    Create a new session and linked questions
// @route   POST /api/sessions/create
// @access  Private
const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;
    const userId= req.user.id;

    const session = await Session.create({ role, experience, topicsToFocus, description, user: userId });
    
    const questionDocs = await Promise.all(
      questions.map(async (question) => {
        const questionObj = await Question.create({session: session._id, question: question.question, answer: question.answer,});
        return questionObj.save();
      })
    );
    session.questions= questionDocs;

    await session.save();
    res.status(201).json({success: true, session});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Failed to create session" });
  }
};

// @desc    Get all sessions for the logged-in user
// @route   GET /api/sessions/my-sessions
// @access  Private
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
   .sort({ createdAt: -1 })
   .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch sessions" });
  }   
};

// @desc    Get a session by ID with populated questions
// @route   GET /api/sessions/:id
// @access  Private
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
    .populate({
      path: "questions",
      options: { sort: {isPinned: -1, createdAt: 1 } },
    })
    .exec();
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    res.status(200).json({success: true, session});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Failed to fetch session" });
  }
};

// @desc    Delete a session and its questions
// @route   DELETE /api/sessions/:id
// @access  Private
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if(session.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Question.deleteMany({ session: session._id });

    await session.deleteOne();
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: "Failed to delete session" });
  }
};

module.exports = { createSession, getMySessions, getSessionById, deleteSession };

