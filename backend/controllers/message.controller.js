import {Conversation} from "../models/conversation.model.js"
import { Message } from "../models/message.model.js";

//for chats
export const sendMessage = async (req,res) =>{
    try {
       const senderId = req.id;
       const reciverId = req.params.id;
       const {message}= req.body;
       
       let conversation = await Conversation.findOne({
        participants:{$all: [senderId, reciverId]}
       });
       // establish the conversation if not started yet.
       if(!conversation){
        conversation = await Conversation.create({
            participants:[senderId, reciverId]
        })
       };
       const newMessage = await Message.create({
        senderId,
        reciverId,
        message
       });
       if(newMessage) conversation.messages.push(newMessage._id);

       await Promise.all([conversation.save(), newMessage.save()])

       //implement socketh io for real time data transfer



       return res.status(201).json({
        success:true,
        newMessage
       })
    } catch (error) {
        console.log(error)
    }
}

export const getMessage = async (req,res) =>{
    try {
        const senderId = req.id;
        const reciverId = req.params.id;
        const conversation = await Conversation.find({
            participants:{$all: [senderId, reciverId]}
        });
        if(!conversation) return res.status(200).json({ success:true, messages:[]})

        return res.status(200).json({success:true, messages:conversation?.messages})
        } catch (error) {
        console.log(error);
    }
}
