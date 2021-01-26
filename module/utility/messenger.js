export class Messenger {

    static createChatMessage(tooltip, data, template, tooltip2) {

      
        data.tooltip = new Handlebars.SafeString(tooltip);
        if(tooltip2 !== undefined) {
            data.tooltip2 = new Handlebars.SafeString(tooltip2);
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