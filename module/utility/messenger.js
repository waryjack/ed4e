export class Messenger {

    static createChatMessage(tooltip, data, template) {

        console.warn("Requested Message Template: ", template);
        console.warn("Data: ", data);

        if(typeof tooltip == "string") {
            data.tooltip = new Handlebars.SafeString(tooltip);
        }

        if(typeof tooltip == "object") {

        }
        

        renderTemplate(template, data).then((msg)=>{
            ChatMessage.create({
                user: game.user._id,
                roll: data.roll,
                type:CHAT_MESSAGE_TYPES.ROLL,
                speaker: ChatMessage.getSpeaker(),
                content: msg
            });
            
        });
    }


}