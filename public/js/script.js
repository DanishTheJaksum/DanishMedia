function makeImage(text, imgURL, link, title) {
  const htmlCard = `
  <div class="card">
  <img src="${imgURL}" class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${text}</p>
  </div>
  <div class="card-body">
    <form action="/article" method="post">
      <input type="text" hidden value="${link}" name="url">
      <input type="text" hidden value="${imgURL}" name="image_url">
      <button
        type="submit"
        class="btn btn-primary"
      >
        Read Full Article
      </button>
    </form>
  </div>
</div>
    `;

  return htmlCard;
}

export default makeImage;
