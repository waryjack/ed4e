import StepUtil from "./steps.js";

export class ActionRoll {

    static roll(actor, actionId) {

        let action = actor.getOwnedItem(actionId);
      //  let dialog = CONFIG.dialog.actionRoll;

        let dialogData = {
            dlgTitle: "Action Roll",
            name: action.name,
            testStep: action.data.step,
            testDice: action.data.dice,
            testExpr: action.data.expr,
            effStep: action.data.dmg_step,
            effDice: action.data.dmg_dice,
            effExpr: action.data.dmg_expr,
            desc: action.data.description,
            karma: true,
        }


       // this._processRoll(template, dialogData);


    }


    _processRoll(template, dialogData) {

        renderTemplate(template, dialogData).then((dlg) => {
            new Dialog({
                title:dialogData.dlgTitle,
                content:dlg,
                buttons:{
                    roll: {
                        icon: "<i class='fa fa-check'></i>",
                        label: "Roll",
                        callback: (html) => {
                            
                            let karmaDie = "";
                            let karmaDieText = "";
                            let adjustedExpr = dialogData.testExpr;
                            let adjustedDice = dialogData.testDice;
                            let adjustedStep = dialogData.testStep;

                            let effectStep = dialogData.effStep;
                            let effectDice = dialogData.effDice;
                            let effectExpr = dialogData.effExpr;

                            let miscMod = "+" + html.find("#rollmod").val();
                            let stepMod = Number(html.find("#stepmod").val());
                            let effMod = Number(html.find("#effmod").val());
                            let effResultMod = "+" + html.find("#effresultmod").val();
                            let myKarmaDie = html.find("#karmadie").val();
                            
                            
                            
                            if(dialogData.karma && myKarmaDie != "") {
                                let karmaDieType = myKarmaDie.substring(myKarmaDie.indexOf("d")+1);
                                karmaDie = "+"+myKarmaDie+"x"+karmaDieType;
                                karmaDieText = "+"+myKarmaDie;
                            }

                            if(stepMod != 0) {
                                adjustedStep = Math.max(1, adjustedStep + stepMod);
                                adjustedDice = StepUtil.getDiceText(adjustedStep);
                                adjustedExpr = StepUtil.getDiceExpr(adjustedStep);
                            }

                            if(effMod != 0) {
                                effectStep = Math.max(1, effectStep + effMod);
                                effectDice = StepUtil.getDiceText(effectStep);
                                effectExpr = StepUtil.getDiceExpr(effectStep);
                            }

                            
                            let finalExpr = adjustedExpr + karmaDie + miscMod;
                            let finalDiceText = adjustedDice + karmaDieText + miscMod;
                            let finalEffExpr = effectExpr + effMod;
                            let finalEffDice = effectDice + effMod;
                            let msgTemplate = "systems/ed4e/templates/chat/rollmessage.hbs";
                            let testRoll = new Roll(finalExpr).evaluate();
                            let testResult = testRoll.total;
                            let effRoll = new Roll(finalEffExpr).evaluate();
                            let effResult = effRoll.total;

                            let msgData = {
                                testRoll:testRoll,
                                testResult:testResult,
                                effRoll:effRoll,
                                effResult:effResult,
                                name: dialogData.name,
                                mods: miscMod,
                                karmadie: karmaDie,
                                dice: finalDiceText,
                                step: adjustedStep,
                                effDice: finalEffDice,
                                effStep: finalEffStep
                            }

                            testRoll.getTooltip().then(tt => Messenger.createChatMessage(tt, msgData, msgTemplate));

                        }
                    },
                    close: {
                        icon: "<i class='fa fa-times'></i>",
                        label: "Cancel",
                        callback: () => { return; }
                    }
                },
                default:"close",

            },{width:300}).render(true);
        });
    }
}