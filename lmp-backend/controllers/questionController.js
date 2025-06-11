const Question = require("../models/Question");
const Session = require("../models/Session");
 

// @desc    Add additional questions to an existing session
// @route   POST /api/questions/add
// @access  Private
const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    if(!sessionId || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid request" });
    }

    const session = await Session.findById(sessionId);
    if(!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }
    const createdQuestions = await Question.insertMany(questions.map(question => ({ question: question.question, answer: question.answer, session: session._id })));

    session.questions.push(...createdQuestions.map(question => question._id));
    await session.save();

    res.status(201).json(createdQuestions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Pin or unpin a question
// @route   POST /api/questions/:id/pin
// @access  Private
const togglePinQuestion = async (req, res) => {
  try{
    const question=await Question.findById(req.params.id);
    if(!question){
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({success: true,question});
  }
  catch(error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update a note for a question
// @route   POST /api/questions/:id/note
// @access  Private
const updateQuestionNote = async (req, res) => {
  try{
    const { note } = req.body;
    const question=await Question.findById(req.params.id);
    if(!question){
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    question.note = note || "";
    await question.save();
    res.status(200).json({success: true,question});
  }
  catch(error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports= { addQuestionsToSession, togglePinQuestion, updateQuestionNote };