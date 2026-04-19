import Program from '../models/programs.js'
import Users from '../models/users.js'

const fetchprograms= async (req, res) => {

    try {
        const programs= await Program.find().populate('donatedUsers', 'username email'); // populate donor usernames and emails only
        res.status(201).json(programs);
    } catch (error) {
        console.error("Mongoose fetch error:", error.message);
        res.status(409).json({ message: error.message });
    }
}

const fetchSingleProgram= async (req, res) => {

    try {
        const {id}= req.params
        const singleProgram= await Program.findById(id)
        res.status(201).json(singleProgram);
    } catch (error) {
        console.error("Mongoose fetch error:", error.message);
        res.status(409).json({ message: error.message });
    }
}

const addprogram= async (req, res) => {

//    console.log("Received body:", req.body); 
    const {title, description}= req.body
    // console.log(title)
    // console.log(description)

    
    const newProgram = new Program({
        title, 
        description
    });

    try {
        const savedProgram =  await newProgram.save();
        res.status(201).json(savedProgram);
    } catch (error) {
        console.error("Mongoose save error:", error.message);
        res.status(409).json({ message: error.message });
    }
}



const addProgramIdToUser= async (req,res)=> {

    try{
        //console.log(req.body)

        const {userId, programId}= req.body        
         // Add the programId to donatedPrograms array if not already present
    await Users.findByIdAndUpdate(
      userId,
      { $addToSet: { donatedPrograms: programId } },
      { new: true }
    );

    await Program.findByIdAndUpdate(programId, {
        $addToSet: { donatedUsers: userId }
        });

    // Respond success or continue with other payment handling
    res.status(200).json({ message: 'Donation recorded successfully' });
  } catch (error) {
    console.error('Error recording donation:', error);
    res.status(500).json({ message: 'Server error while recording donation' });
  }
    
}

const getUser= async (req, res) => {

    try {
        const {id}= req.params
        const user = await Users.findById(id).populate('donatedPrograms');
        res.status(201).json(user);
    } catch (error) {
        console.error("Mongoose fetch error:", error.message);
        res.status(409).json({ message: error.message });
    }
}
export {addprogram,getUser, fetchprograms, fetchSingleProgram, addProgramIdToUser}