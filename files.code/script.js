const typingform = document.querySelector(".typing");
const chatlist = document.querySelector(".chatlist");

let usermessage = null;
const apikey = "AIzaSyAjNeDaNioLrJR316Jl1_9wy5SN0JCyinQ";
const APIurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apikey}`;
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: AIzaSyAjNeDaNioLrJR316Jl1_9wy5SN0JCyinQ' \
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
//   '" ;

function hideExamples() {
    document.querySelector("header").style.display = "none";
}
const CreateMessageElement = (content, className) => {
    const div = document.createElement("div");
    div.classList.add("message", className);
    div.innerHTML = content;
    return div;
}

generateapiresponse = async(incomingdiv ,usermessage) => {
    const textelement = incomingdiv.querySelector(".text");

    try {
        const response = await fetch(APIurl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                     role: "user",
                    parts: [{ text: usermessage }]
                }]
            })
        });

        let data;
        try {
            data = await response.json();
        } catch {
            textelement.innerText = "Error parsing response";
            return;
        }

        let apiresponse = "";
        try {
            apiresponse = data.candidates?.[0].content.parts[0].text;
        } catch {
            apiresponse = "No response received";
        }
        textelement.innerText = apiresponse;
        console.log(apiresponse);

        const copybutton = incomingdiv.querySelector(".copybtn");
         const ogicon = copybutton.textContent; 
        copybutton.addEventListener("click", () => {
        copybutton.textContent ="check";  
         setTimeout (()=>{ 
             copybutton.textContent =ogicon;
                },1000);
            copymssge = apiresponse;
            navigator.clipboard.writeText(apiresponse)
                .then(() => {
                    console.log("message copied");
                })
                .catch(() => {
                    console.log("error in copying mssge");
                });
        });
    } catch {
        textelement.innerText = "Error fetching response";
    } finally {

        const loadingBars = incomingdiv.querySelectorAll(".loading-bar");
        loadingBars.forEach(bar => {
            bar.style.display = "none";
        });
    }
};

 // 1. Use the stable 1.5 Flash model name
// const APIurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apikey}`;

// generateapiresponse = async (incomingdiv, usermessage) => {
//     const textelement = incomingdiv.querySelector(".text");

//     try {
//         const response = await fetch(APIurl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{
//                     parts: [{ text: usermessage }] // Simplified structure
//                 }]
//             })
//         });

//         const data = await response.json();

//         // Check if the API returned an error object
//         if (!response.ok) {
//             console.error("API Error:", data);
//             textelement.innerText = `Error ${response.status}: ${data.error.message}`;
//             return;
//         }

//         // Extract the text safely
//         const apiresponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
//         if (apiresponse) {
//             textelement.innerText = apiresponse;
//         } else {
//             textelement.innerText = "The model returned an empty response.";
//         }

//     } catch (error) {
//         console.error("Fetch Error:", error);
//         textelement.innerText = "Connection failed. Check your internet or API key.";
//     } finally {
//         // Hide loading bars
//         incomingdiv.querySelectorAll(".loading-bar").forEach(bar => bar.style.display = "none");
//     }
// };




showloadingAnimation = (usermessage) => {
    const html = `<div class="incoming">
            <img src="logo.png" alt="Gemini logo" class="icon">
            <div class="content">
                <div class="loading-bar"></div>
                <div class="loading-bar"></div>
                <p class="text"></p>
               <span class="material-symbols-outlined copybtn">content_copy</span>
            </div>

        </div>`;
    const incomingdiv = CreateMessageElement(html, "incoming");
    chatlist.appendChild(incomingdiv);
    generateapiresponse(incomingdiv,usermessage);
}

const handleOutgoingChat = () => {
    usermessage = typingform.querySelector(".typing-input").value.trim();
    console.log(usermessage);
    if (!usermessage) return;
    const html = `<div class="outgoing">
            <img src="user1.png" class="icon">
            <p class="text"></p>
        </div>`;
    const outgoingdiv = CreateMessageElement(html, "outgoing");
    outgoingdiv.querySelector(".text").innerText = usermessage;
    chatlist.appendChild(outgoingdiv);
    typingform.reset();
    hideExamples();
    setTimeout(() =>{ 
        showloadingAnimation(usermessage); 
    },500);
}


typingform.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
}); 

const eg1 = document.querySelector("#eg1");
const eg2 = document.querySelector("#eg2");
const eg3 = document.querySelector("#eg3");
const eg4 = document.querySelector("#eg4");


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
const del = document.getElementById("del");
const sendd = document.getElementById("sendd");

del.addEventListener("click", () => {
    if (confirm("Do you want to delete the conversation ?") == true) {
        chatlist.innerHTML = "";
        document.querySelector("header").style.display = "block";
    } else {
        console.log("deletion action was cancelled!");
    }

});
sendd.addEventListener("click", () => {
    handleOutgoingChat();
});


