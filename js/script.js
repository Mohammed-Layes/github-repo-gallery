// Create and name a global variable to select the div with a class of “overview”. This div is where your profile information will appear. Hint: Add a comment above the element you selected to help you remember what you’re targeting!
const overview = document.querySelector(".overview");

// Create a global variable called username. In the value, add your GitHub username.
const username = "Mohammed-Layes";

// Create and name an async function to fetch information from your GitHub profile using the GitHub API address: https://api.github.com. Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}. Notice that you’ll add a “$” character in front of the variable name to create a placeholder. Because you’re using a template literal, surround the URL in backticks instead of quotation marks.
// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results. 
// In the response, look carefully at the properties. You’ll need some of those properties to complete the next function!
const githubProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
};

githubProfile();

// Below the async function to fetch your GitHub user data, create and name a new function to display the fetched user information on the page. This function should accept the JSON data as a parameter.
// Inside the function, create a new div and give it a class of “user-info”. 
// Using innerHTML, populate the div, with the following elements for figure, image, and paragraphs:
const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add(".user-info");
    div.innerHTML = `<figure>
                        <img alt="user avatar" src=${data.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Bio:</strong> ${data.bio}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                    </div>`
    overview.append(div);
};