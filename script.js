function handleKeyDown(event) {
if (event.keyCode === 13) {
document.getElementById('chatLog').innerHTML ="";
talk();
}
}
function action(){
document.getElementById('chatLog').innerHTML ="";
document.getElementById('userBox').value ="";
}    
function talk(){
  var know = {
    "who are you" : ["Hello, Vedanta Chatbot here"],
    "how are you" : ["I am good.Hope you also good"],
    "what can you do for me" :["I am happy to help you"],
    "emergency":["s","l","m","emergency"],
    };
    var question = document.getElementById('userBox').value;
    const filtered = question.replace(/[^\w\s]/gi, '');
    const user=filtered.toLowerCase();
    if (user in know) {     
        var array=know[user];
        const l=array.length;
        if(l==1){
        document.getElementById('chatLog').innerHTML = array + "<br>";
        }
        else{
          for (const key in array) 
          document.getElementById('chatLog').innerHTML += array[key] + "<br>";
        }   
    }
   else{
   var present=-2;
   var sol;
   for (const key in know) {
     const similarity = compareSentences(user,key);
     if(similarity>0.75 && similarity>present){
      present=similarity;
      sol=key;
    }
   }
  if (present > -1) {
    document.getElementById('chatLog').innerHTML += know[sol] + "<br>";
  } 
  else {
    document.getElementById('chatLog').innerHTML += 'Sorry, I am not sure how to answer that.'+ "<br>";
  }
}
}
function compareSentences(sentence1, sentence2) {
  const tokenizer = new natural.WordTokenizer();
  const tokens1 = tokenizer.tokenize(sentence1);
  const tokens2 = tokenizer.tokenize(sentence2);
  
  const jaccardSimilarity = natural.JaroWinklerDistance(tokens1.join(' '), tokens2.join(' '), { ignoreCase: true });
  return jaccardSimilarity;
}