// Create and name a global variable to select the div with a class of “overview”. This div is where your profile information will appear. Hint: Add a comment above the element you selected to help you remember what you’re targeting!
const overview = document.querySelector(".overview");

// At the top of your file, create and name another global variable to select the unordered list to display the repos list.
const repoList= document.querySelector(".repo-list");

// Create a global variable called username. In the value, add your GitHub username.
const username = "Mohammed-Layes";

// Create and name two new global variables at the top of your script. The first variable selects the section with a class of “repos” where all your repo information appears. 
// The second variable selects the section with a class of “repo-data” where the individual repo data will appear.
const repos = document.querySelector(".repos");

const repoData = document.querySelector(".repo-data");

// At the top of your file, add two new global variables. The first variable should select the Back to Repo Gallery button. 
// Create a second global variable called filterInput to select the input with the “Search by name” placeholder.
const viewReposBtn = document.querySelector(".view-repos");

// const filterInput = document.querySelector("input[placeholder='Search by name']");
const filterInput = document.querySelector(".filter-repos")

// Create and name an async function to fetch information from your GitHub profile using the GitHub API address: https://api.github.com. Target the “users” endpoint and use a template literal to add the global username variable to the endpoint: users/${username}. Notice that you’ll add a “$” character in front of the variable name to create a placeholder. Because you’re using a template literal, surround the URL in backticks instead of quotation marks.
// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results. 
// In the response, look carefully at the properties. You’ll need some of those properties to complete the next function!
const fetchGithubProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    displayUserInfo(data);
};

fetchGithubProfile();

// Below the async function to fetch your GitHub user data, create and name a new function to display the fetched user information on the page. This function should accept the JSON data as a parameter.
// Inside the function, create a new div and give it a class of “user-info”. 
// Using innerHTML, populate the div, with the following elements for figure, image, and paragraphs:
const displayUserInfo = function (data) {

    const div = document.createElement("div");
    div.classList.add("user-info");
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

    fetchRepos();

};

// At the bottom of your code, create and name a new async function to fetch your repos. Use the List Repositories of User section of the documentation to find the endpoints for your API URL to fetch the list of repos.
// Keep the documentation open to find parameters to:
// Sort repos by the most recently updated to last updated. 
// Show up to 100 repos per page at a time. 
// Add the parameters to the API call. For a reminder on adding parameters to a URL, see the Parameters section in a previous lesson.
// Your second await statement should return the JSON response. Log out the response and call the function. In the response, look through the properties because you’ll need one of the properties to complete the next function!
const fetchRepos = async function () {

    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&sort=desc&per_page=100`);
    const data = await res.json();
    // console.log(data)

    displayRepoInfo(data);

};

// fetchRepos();

// Below the async function fetching the repos, create and name a function to display information about each repo. Use repos as a parameter so that the function accepts the data returned from your last API call. Inside the function, loop and create a list item for each repo and give each item:
// A class of “repo”.
// An <h3> element with the repo name. 
// Append the list item to the global variable that selects the unordered repos list.
// At the top of the function that displays all your repos, show the filterInput element. 
// Save and view your site. You should now see an input box (AKA search box) show up on the page after your profile information.
const displayRepoInfo = function (repos) {

    filterInput.classList.remove("hide");

    for (const repo of repos) {
        const listItem = document.createElement("li")
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }

};

// At the bottom of your code, create an event listener called repoList for a click event on the unordered list with a class of “repo-list.” Pass the event (e) in the callback function. 
// Add a conditional statement to check if the event target (i.e., the element that was clicked on) matches the <h3> element (i.e., the name of the repo): if (e.target.matches("h3")).
// In the body of the conditional statement, create a variable called repoName to target the innerText where the event happens. Log out the variable to the console. Try clicking on a few repo names to see if your event listener is working as expected.
repoList.addEventListener("click", function(e) {

    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoDetail(repoName);
    }

});

// Below the event listener, create and name an async function to get specific repo information that accepts repoName as a parameter. 
// In the function, make a fetch request to grab information about the specific repository. To discover the endpoints, take a look at the Get a Repository(opens in a new tab) section of the repository. Hint: In the documentation, “owner” is the same as “username.”
// Declare a variable called repoInfo to resolve and save the JSON response.
// Log out repoInfo. Return to repoList click event listener. Inside the if statement, replace the console.log() with a call to this async function, passing repoName as an argument.
// Click on the title of one or two repos and have a look at the objects in the console. Take note of the language_url property; you’ll use that property next!
// Still inside the async function to get specific repo information, create a variable called fetchLanguages to fetch data from language_url property of your repoInfo.
// Create a variable called languageData to save the JSON response.
// Log out languageData and click on a couple of repo names. You should see one or more coding languages in the object. Note: If you click on a repo name and see an empty object, don’t fret! Try a few more repos to see if the languages appear. If you’re still not returning any coding languages, check that you’re fetching the property correctly.
// Now that you have the languages for your repo, add each language to an empty array called languages. Hint: The languageData is an object. Remember how to loop through an object? You’ll want to add the languages to the end of the array.
// Log out your languages array and click on a repo or two. You should see your array show up on the page!
const repoDetail = async function (repoName) {

    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo  = await res.json();
    // console.log(repoInfo);

    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    // console.log(languageData); 

    const languages = [];

    for (let language in languageData) {
        languages.push(language);
    }
    // console.log(languages);

    displayRepoDetail(repoInfo, languages);

};

// Below the async function to get specific repo information, create and name a new function to display the specific repo information. The function should accept two parameters:  repoInfo and languages.
// Inside the function, empty the HTML of the section with a class of “repo-data” where the individual repo data will appear.
// Create a new div element and add the selected repository’s name, description, default branch, and link to its code on GitHub. The div structure will look like this:
// <h3>Name: ${}</h3>
//     <p>Description: ${}</p>
//     <p>Default Branch: ${}</p>
//     <p>Languages: ${languages.join(", ")}</p>
//     <a class="visit" href="${}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
// Inside the 5 placeholders, use the JSON data to grab the relevant properties to display on the page. Use the properties from the object you retrieved when you fetched the specific repos. Hint: You want the URL to the repo on GitHub, not the repo’s API address.
// Append the new div element to the section with a class of “repo-data”. Unhide (show) the “repo-data” element. Hide the element with the class of “repos”.
const displayRepoDetail = function (repoInfo, languages) {

    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
                     <p>Description: ${repoInfo.description}</p>
                     <p>Default Branch: ${repoInfo.default_branch}</p>
                     <p>Languages: ${languages.join(", ")}</p>
                     <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
    viewReposBtn.classList.remove("hide");

};

// At the bottom of your code, create a click event listener attached to your variable that points to the Back to Repo Gallery button. 
// In the body of the callback function, unhide (display) the section with the class of “repos”, the location where all the repo information appears. Add the “hide” class to the section where the individual repo data will appear. Also, add the “hide” class to the Back to Repo Gallery button itself. 
// In the function responsible for displaying the individual repo information, remove the class of “hide” from the Back to Repo Gallery button. Now the user will see the Back to Repo Gallery button when they click on a repo name. When they click on the back button, they’ll return to the complete list of repos. The individual repo information and the back button will then disappear.
viewReposBtn.addEventListener("click", function () {

    repos.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposBtn.classList.add("hide");
    filterInput.value = "";
    
});

// At the bottom of your code, attach an "input" event listener to filterInput. Pass the event (e) the callback function
// Inside the callback function, create a variable to capture the value of the search text. Log out the variable and enter some text in the input to ensure that you’ve successfully captured it.
// Create a variable called repos to select ALL elements on the page with a class of “repo”.
// Create a variable and assign it to the lowercase value of the search text. Loop through each repo inside your repos element. Inside the loop, create a variable and assign it to the lowercase value of the innerText. of each repo.
// Check to see if the lowercase repo text includes the lowercase search text. If the repo contains the text, show it. If it doesn’t contain the text, hide the repo.
// Test out your input! The repo list should dynamically change when you add or remove letters in the search box (see gif above).
filterInput.addEventListener("input", function (e) {

    const searchText = e.target.value;
    const searchTextLoweredCase = searchText.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    
    for (const repo of repos) {
        const repoNameLowerCased = repo.innerText.toLowerCase();
        console.log(repoNameLowerCased);

        if (repoNameLowerCased.includes(searchTextLoweredCase)) {
            repo.classList.remove("hide")
        } else {
            repo.classList.add("hide");
        }
    }

});

// filterInput.addEventListener("input", function (e) {
//     const searchText = e.target.value;
//     const repos = document.querySelectorAll(".repo");
//     const searchLowerText = searchText.toLowerCase();
  
//     for (const repo of repos) {
//       const repoLowerText = repo.innerText.toLowerCase();
//       if (repoLowerText.includes(searchLowerText)) {
//         repo.classList.remove("hide");
//       } else {
//         repo.classList.add("hide");
//       }
//     }
// });
