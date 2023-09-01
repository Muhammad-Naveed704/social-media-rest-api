// import User from '../models/registerSchema.js'

// export const getUsers = async (req, res) => {
//     const users = await User.find()

//     console.log(users)
//     console.log("get users");
//     res.status(200).send({
//         status: "success",
//         message: "data found",
//         data: users
//     })
// }


// export const getUser = async (req, res) => {
//     console.log(req.params)
//     const user = await User.findById(req.params.id)

//     console.log(user)

//     res.status(200).send({
//         status: "success",
//         message: "data not found  ",
//         data: user
//     })
// }