const typingform = document.querySelector(".typing");
const chatlist = document.querySelector(".chatlist");
 const del = document.getElementById("del");
 let usermessage =null; 
const apikey="AIzaSyC8ghdSR5WOnoJsvNChV2rt8A8rEOZDJjs";
 const APIurl =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apikey}`;  

//  curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent" \
//   -H 'Content-Type: application/json' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'


const CreateMessageElement = (content, className) => {
    const div = document.createElement("div");
    div.classList.add("message", className) ;
    div.innerHTML = content;
    return div;
} 

const generateapiresponse = async(incomingdiv) =>{ 
const textelement = incomingdiv.querySelector(".text");
try { 
const response = await fetch(APIurl,{
    method :"Post", 
    headers :{ "Content-Type" : "application/json"},
    body :JSON.stringify({ 
        contents: [{ 
            role :"user", 
            parts:[{text : "Reply in plain text without markdown formatting.\n\n" + usermessage 
}]
        }]
    })
});
const data = await response.json();
const apiresponse = data?.candidates[0].content.parts[0].text;
textelement.innerHTML =apiresponse;
console.log(apiresponse);
} 
catch(error){ 
    console.log(error);
}
 finally {
           
        const loadingBars = incomingdiv.querySelectorAll(".loading-bar");
        loadingBars.forEach(bar => {
            bar.style.display = "none";
        });
        
    }
 
    const copybutton = incomingdiv.querySelector(".copybtn");
         const ogicon = copybutton.textContent; 
        copybutton.addEventListener("click", () => {
        copybutton.textContent ="check";  
         setTimeout (()=>{ 
             copybutton.textContent =ogicon;
                },1000);
            copymssge = textelement.innerText;
            navigator.clipboard.writeText(copymssge);
                });
   
}


showloadingAnimation = () => {
    const html = `<div class="incoming">
            <img src="logo.png" alt="Gemini logo" class="icon">
            <div class="content">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <p class="text"></p>
               <span class="material-symbols-outlined copybtn">content_copy</span>
            </div>

        </div>`;
    const incomingdiv = CreateMessageElement(html, "incoming" , "loading-bar");
    chatlist.appendChild(incomingdiv);
    generateapiresponse(incomingdiv);
}; 

 const handleOutgoingChat = () => {
    usermessage = typingform.querySelector(".typing-input").value.trim();
    if (!usermessage) return;
     console.log(usermessage);
    const html = `<div class="message outgoing">
            <img src="user1.png" class="icon">
            <p class="text"></p>
        </div>`;
    const outgoingdiv = CreateMessageElement(html, "outgoing");
    outgoingdiv.querySelector(".text").innerText = usermessage;
    chatlist.appendChild(outgoingdiv);
    typingform.reset();
   hideExamples();
    setTimeout(showloadingAnimation,500);
}
typingform.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
}); 




del.addEventListener("click", () => {
    if (confirm("Do you want to delete the conversation?")) {
        chatlist.innerHTML = "";
        conversationHistory = []; 
        document.querySelector("header").style.display = "block";
    }
});



const eg1 = document.querySelector("#eg1");
const eg2 = document.querySelector("#eg2");
const eg3 = document.querySelector("#eg3");
const eg4 = document.querySelector("#eg4");

function hideExamples() {
    document.querySelector("header").style.display = "none";
}

eg1.addEventListener("click", () => {
    hideExamples();
    typingform.querySelector(".typing-input").value = "Give me a quick tour of your features";
    handleOutgoingChat();
});
eg2.addEventListener("click", () => {
    hideExamples();
    typingform.querySelector(".typing-input").value = "Help me plan my day";
    handleOutgoingChat();
});
eg3.addEventListener("click", () => {
    hideExamples();
    typingform.querySelector(".typing-input").value = "What's a one-minute mood booster?";
    handleOutgoingChat();
});
eg4.addEventListener("click", () => {
    hideExamples();
    typingform.querySelector(".typing-input").value = "Write a short poem about coffee";
    handleOutgoingChat();
});


const sendd = document.getElementById("sendd");

sendd.addEventListener("click", () => {
    handleOutgoingChat();
});




