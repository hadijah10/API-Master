import { AbstractControl } from "@angular/forms";

export function ValidationSentence(control: AbstractControl){
    const abusiveWords = ['fool','idiot','damn','bloody','bitch','jerk','narcissist'];
    const sentence = control.value.toLowerCase();
    const wordsArr = sentence.split(' ');
    let isClean = true;
    for (let word of wordsArr){
        if(abusiveWords.includes(word)){
            isClean = false;
        }
    }
    if (isClean){
        return null;
    }
    else{
        return {isAbusive: true}
    }
}