import { StepUtil } from "./steps.js";
import { Messenger } from "./messenger.js";

export class ActionRoll {

    static roll(actor, actionId) {

        let action = actor.getOwnedItem(actionId);
        let template = "systems/ed4e/templates/roll/actionrolldialog.hbs";

        let dialogData = {
            dlgTitle: "Action Roll",
            name: action.name,
            testStep: action.data.data.step,
            testDice: action.data.data.dice,
            testExpr: action.data.data.expr,
            effStep: action.data.data.dmg_step,
            effDice: action.data.data.dmg_dice,
            effExpr: action.data.data.dmg_expr,
            desc: action.data.data.common.description,
            karma: true,
        }

        console.warn("dialogData actionroll: ",dialogData);

        renderTemplate(template, dialogData).then((dlg) => {
            new Dialog({
                title:dialogData.dlgTitle,
                content:dlg,
                buttons:{
                    roll: {
                        icon: "<i class='fa fa-check'></i>",
                        label: "Action Roll",
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
                            
                            console.warn("Action-step,eff: ", adjustedStep, effectStep);
                            console.warn("Action-stepMod, effMod: ", stepMod, effMod);
                            console.warn("Action-rollmod, effresultmod: ", miscMod, effResultMod);
                            
                            
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
                            let finalEffExpr = effectExpr + effResultMod;
                            let finalEffDice = effectDice + effResultMod;
                            let msgTemplate = "systems/ed4e/templates/chat/actionrollmessage.hbs";
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
                                effStep: effectStep
                            }

                            testRoll.getTooltip().then((tt) =>
                                {   
                                    effRoll.getTooltip().then((ett) =>
                                    {
                                        Messenger.createChatMessage(tt, msgData, msgTemplate, ett);
                                    });
                                });
    

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