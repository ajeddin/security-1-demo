const bycrypt =  require('bcryptjs')
const chats = []



module.exports={
  createMessages: (req,res) => {
    console.log(req.body);
    const {pin , message}=req.body
    for (let i=0;i<chats.length;i++){
      const existing = bycrypt.compareSync(pin,chats[i].pinHash)
      if (existing){
        chats[i].messages.push(message)
        let messageToReturn = {...chats[i]}
        delete messageToReturn.pinHash
        res.status(200).send(messageToReturn)
      }
    }
    const salt = bycrypt.genSaltSync(5)
    const pinHash = bycrypt.hashSync(pin, salt)
    console.log(pinHash);
    let msjObj = {
      pinHash,
      messages:[message]
    }
    chats.push(msjObj)
    let messageToReturn = {...msjObj}
    delete messageToReturn.pinHash
    res.status(200).send(messageToReturn)
  }
}