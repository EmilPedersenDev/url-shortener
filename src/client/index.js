import axios from "axios";
import "./main.css"
const form = document.getElementById("create-url-form");
const shortUrlResult = document.getElementById('short-url-result');

const createShortUrl = async (urlInputValue) => {
  const {data} = await axios.post("http://localhost:3000/v1", {
    originalUrl: urlInputValue,
  }, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  });

  return data?.shortUrl;
}

const displayShortUrl = (shortUrl) => {
  const shortUrlParagraph = document.createElement('p');
  shortUrlParagraph.textContent = shortUrl;
  shortUrlResult.appendChild(shortUrlParagraph);
}

form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    shortUrlResult.replaceChildren();

    const urlInput = form.querySelector('input');
    const urlInputValue = urlInput.value;

    if(!urlInputValue) {
      throw new Error("No url provided")
    }

    const shortUrl = await createShortUrl(urlInputValue);

    if(!shortUrl) {
      throw new Error('Error when creating short url')
    }

    return displayShortUrl(shortUrl);
  } catch (e) {
    console.error(e)
  }
})
