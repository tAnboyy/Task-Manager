const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // res.status(200).json({ tasks, amount: tasks.length });
    // res.status(200).json({ success: true, data: {tasks, nbHits: tasks.length}});
    // res.status(200).json({ status: 'success', data: {tasks, nbHits: tasks.length}});
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const createTask = async (req, res) => {
  // res.send('create task');
  // console.log(req.body); //JS object
  // res.json(req.body);
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
    // console.log(task); //JS object
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  // res.send('get single task');
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const deleteTask = async (req, res) => {
  // res.send("delete task");
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
    // res.status(200).send();
    // res.status(200).json({ task: null, status: 'success' });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};

const updateTask = async (req, res) => {
  // res.send("update task");
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ id: taskID, data: req.body });
  } catch (err) {}
};

// PUT
// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true //by default, mongoose updates ie PATCH.. overwrite replaces ie PUT
//     });

//     res.status(200).json({ id: taskID, data: req.body });
//   } catch (err) {}
// };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
