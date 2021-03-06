import send from '../messenger-api-helpers/send';

const determineNLP = (message, senderId) =>{
    if (message.nlp.entities){
        const nlp = message.nlp.entities;
        determineIntent(nlp,senderId);
    }else {
        send.sendHelpMessage(senderId);
    }
    

}
const determineIntent = (nlpInfo,senderId) => {
    const intent = nlpInfo["intent"][0]["value"];
    switch (intent) {
    case 'send':
        if (nlpInfo["number"] && nlpInfo["contact"]){
            send.sendTransactionConfirmation(senderId, nlpInfo["number"][0]["value"], nlpInfo["contact"][0]["value"]);
        } else {
            //Send please include all information message.
            send.sendMoreInfoMessage(senderId);
        }

        break;

    case 'request':
        if (nlpInfo["number"] && nlpInfo["contact"]){ // TODO: REQUEST PAYMENT

        } else {
            //Send please include all information message.
            send.sendMoreInfoMessage(senderId);
        }
        break;
    case 'login':
        send.sendWelcomeMessage(senderId);
        break;

    case 'logout':
        send.sendSignOutPrompt(senderId);
        break;
        
    default:
    // HELP RESPONSE
        send.sendHelpMessage(senderId);
        break;
    }
}

export default {
determineNLP,
determineIntent,
};