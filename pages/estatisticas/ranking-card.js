function rankingCardComponent(props) {
  if (
    !props ||
    !props.avatarUrl ||
    !props.username ||
    props.points === undefined ||
    props.position === undefined
  ) {
    console.error("Props inválidas:", props);
    return;
  }

  const rankingContent = document.querySelector(".ranking-display .content");

  const card = document.createElement("div");
  card.classList.add("ranking-card");
  card.innerHTML = `
    <div class="avatar">
        <img class="avatar-img" src="${props.avatarUrl}" alt="imagem genérica de avatar">
    </div>
    <div class="info">
        <p class="username">${props.username}</p>
        <p class="points"><span>${props.points}</span>pts</p>
    </div>
    <div class="position">
        #${props.position}
    </div>
    `;

  rankingContent.appendChild(card);
}
