const http = require("http");
const axios = require("axios");
const qs = require("querystring");

// Function to delete user feedback
async function deleteUser(id) {
  try {
    const response = await axios.delete(
      `https://retoolapi.dev/97vuJG/emailComment/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user feedback:", error.message);
    throw error;
  }
}

async function fetchData() {
  try {
    const response = await axios.get(
      "https://retoolapi.dev/97vuJG/emailComment"
    );
    const userData = response.data;
    return userData;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/deleteUser") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const parsedBody = qs.parse(body);
      const id = parsedBody.id;
      try {
        await deleteUser(id);
        res.writeHead(302, { Location: "/" });
        res.end();
      } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    try {
      const userData = await fetchData();
      let html = `
                <html>
                    <head>
                        <title>User Data</title>
                        <style>
                            /* CSS styles */
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                min-height: 100vh;
                                margin: 0;
                                background-color: #f4f4f4;
                                font-family: Arial, sans-serif;
                            }
                            .container {
                                max-width: 1000px;
                                margin: 20px auto 0; 
                                padding: 20px;
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                                gap: 20px;
                                position: relative; 
                            }
                            h1 {
                                text-align: center; 
                                position: absolute;
                                top: -65; 
                                left: 50%;
                                transform: translateX(-50%); 
                                z-index: 1;
                            }
                            .user-box {
                                background-color: #ffffff;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                                padding: 30px;
                                text-align: left;
                            }
                            .user-box ul {
                                list-style-type: none;
                                padding: 0;
                            }
                            .user-box li {
                                margin-bottom: 10px;
                            }
                            .user-box strong {
                                font-weight: bold;
                            }
                            .delete-btn {
                                background-color: #ff5252;
                                color: #ffffff;
                                border: none;
                                border-radius: 5px;
                                padding: 10px 20px;
                                cursor: pointer;
                                transition: background-color 0.3s;
                            }
                            .delete-btn:hover {
                                background-color: #ff0000;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>User Data</h1>
            `;
      userData.forEach((user) => {
        html += `
                    <div class="user-box">
                        <ul>
                            <li><strong>Email:</strong> ${user.email}</li>
                            <li><strong>Feedback:</strong> ${user.feedback}</li>
                            <li><strong>ID:</strong> ${user.id}</li>
                        </ul>
                        <!-- Button for delete action -->
                        <form action="/deleteUser" method="post">
                            <input type="hidden" name="id" value="${user.id}">
                            <button class="delete-btn" type="submit">Delete</button>
                        </form>
                    </div>
                `;
      });
      html += `
                        </div>
                    </body>
                </html>
            `;
      res.end(html);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

server.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
