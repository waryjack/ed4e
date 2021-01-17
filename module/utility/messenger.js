export class Messenger {

    static createChatMessage(tooltip, data, template) {

        console.warn("Requested Message Template: ", template);
        console.warn("Data: ", data);

        data.tooltip = new Handlebars.SafeString(tooltip);

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